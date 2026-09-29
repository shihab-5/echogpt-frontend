import type { Message, ModelId, ToolId } from "@/types/chat";
import { buildAssistantMessage } from "@/data/messages";

/**
 * Mock AI response generator.
 *
 * - Single function, no I/O, no real AI API. Frontend prototype only.
 * - 400–900 ms artificial latency so the UI feels real.
 * - Honors AbortSignal so navigation cancels the timer.
 * - EchoGPT-voiced responses: precise, technical, no marketing fluff.
 * - Optional simulateFailure flag (~3%) when enabled — used by error states.
 */

export class MockAiError extends Error {
  constructor(message: string = "The response failed. Try again.") {
    super(message);
    this.name = "MockAiError";
  }
}

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const id = setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(id);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function detectIntent(prompt: string): string {
  const p = prompt.toLowerCase();
  if (/^(hi|hello|hey|hola|howdy)\b/.test(p)) return "greeting";
  if (/\b(summari[sz]e|tl;?dr|brief)\b/.test(p)) return "summarize";
  if (/\b(explain|walk through|how does|what is)\b/.test(p)) return "explain";
  if (/\b(rewrite|rephrase|clarif)\b/.test(p)) return "rewrite";
  if (/\b(translate)\b/.test(p)) return "translate";
  if (/(```|<code>|function |class |const |let |var )/.test(p) || /\bdebug\b/.test(p)) {
    return "debug";
  }
  return "default";
}

function replyFor(prompt: string, model: ModelId): string {
  const intent = detectIntent(prompt);
  const firstLine = prompt.trim().split("\n")[0] ?? "";
  void model; // Reserved: model-specific tone adjustments can plug in here.
  switch (intent) {
    case "greeting":
      return "Hi. Tell me what you're working on and I'll keep it focused.";
    case "summarize":
      return [
        "Three points:",
        "- The core argument is that the prompt is the unit of work, not the dashboard.",
        "- Switching models is meant to be cheap, so the thread stays intact.",
        "- Anything that gets in the way of writing is removed.",
      ].join("\n");
    case "explain":
      return [
        `Step by step:`,
        `1. The composer captures the prompt. The model selector captures the context.`,
        `2. The mock AI returns a response after a short, realistic delay.`,
        `3. The response is rendered, with code blocks and copy/regenerate actions.`,
        `If anything is unclear, ask a follow-up and I'll narrow the scope.`,
      ].join("\n");
    case "rewrite":
      return [
        `Rewritten for clarity and a direct, neutral tone:`,
        ``,
        `EchoGPT is a focused multi-model workspace. Switch models mid-thread, run quick actions, and continue across the web app and the extension. The product is frontend-only: AI responses are local mock data.`,
      ].join("\n");
    case "translate":
      return [
        `Spanish (Latin American), keeping technical terms intact:`,
        ``,
        `EchoGPT es un espacio de trabajo enfocado y multimodelo. Cambia de modelo a mitad de una conversación, ejecuta acciones rápidas y continúa entre la aplicación web y la extensión.`,
      ].join("\n");
    case "debug":
      return [
        `Looking at the snippet, the most likely cause is a stale closure in the effect that captures the initial value once and never re-reads it.`,
        ``,
        `Minimal fix: move the read inside the effect (or use a ref) so it runs on every change.`,
        ``,
        `If the issue persists, paste the failing test or the exact error and I'll narrow it.`,
      ].join("\n");
    default:
      return [
        `Working on: \u201C${firstLine.slice(0, 60)}\u2026\u201D`,
        ``,
        `Here's a focused take: start by separating intent from execution. State the goal in one sentence, list the constraints, then propose the smallest version that satisfies both. The mock AI here returns canned responses for the prototype — there's no real model behind it, so treat the answer as a placeholder, not a fact.`,
        ``,
        `If you want a specific shape (bullets, code, a checklist), say so and I'll narrow the response.`,
      ].join("\n");
  }
}

/**
 * Compose the final reply text with optional tool acknowledgment.
 *
 * - When any tool is active, prepend a `[Tools active: …]` line so the
 *   user can see the toggle state persisted into the response.
 * - When the calculator tool is active AND the prompt contains a digit,
 *   append a placeholder line that explicitly states the math is not
 *   performed in this prototype. This avoids pretending the calculator
 *   is a real backend (see `project_rules.md` §25).
 */
function withTools(
  prompt: string,
  base: string,
  tools: ReadonlyArray<ToolId>,
): string {
  if (tools.length === 0) return base;
  const head = `[Tools active: ${tools.join(", ")}]\n\n`;
  if (tools.includes("calculator") && /\d/.test(prompt)) {
    return `${head}${base}\n\nCalculator: mocked — exact math not performed in this prototype.`;
  }
  return `${head}${base}`;
}

export interface GenerateOptions {
  signal?: AbortSignal;
  /** When true, ~3% of calls throw a MockAiError. */
  simulateFailure?: boolean;
  /**
   * Per-conversation tool toggles. When non-empty, the canned reply
   * is prefixed with `[Tools active: …]` (and the calculator appends a
   * placeholder line for numeric prompts).
   */
  tools?: ReadonlyArray<ToolId>;
}

export async function generateMockResponse(
  prompt: string,
  model: ModelId,
  options: GenerateOptions = {},
): Promise<Message> {
  const { signal, simulateFailure = false, tools = [] } = options;
  await sleep(rand(400, 900), signal);
  if (simulateFailure && Math.random() < 0.03) {
    throw new MockAiError();
  }
  const composed = withTools(prompt, replyFor(prompt, model), tools);
  return buildAssistantMessage(composed, model);
}

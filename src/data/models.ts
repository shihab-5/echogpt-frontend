import type { Model, ModelId } from "@/types/chat";

/**
 * Models available in the workspace.
 *
 * 18 named models across 12 providers. The lineup is split 6 available /
 * 12 preview — the available tier covers the flagship + precise lines,
 * and the preview tier covers the long tail of specialized models.
 *
 * Every model carries a unique `iconKey` mapped to a lucide-react glyph
 * in <ModelIcon />. The provider identity is conveyed by the icon tile,
 * not by per-provider dot color (the design system reserves brand red
 * for accent dots only).
 *
 * Update this list without churn anywhere else: every consumer reads
 * through `MODELS`, `MODEL_MAP`, and `getModel`.
 */
export const MODELS: ReadonlyArray<Model> = [
  {
    id: "echo-gpt",
    name: "EchoGPT",
    provider: "EchoGPT",
    description: "Our flagship composer.",
    capabilities: ["reasoning", "code", "long-context", "tools", "vision"],
    status: "available",
    iconKey: "sparkles",
  },
  {
    id: "gpt-5-6-sol",
    name: "GPT-5.6 Sol",
    provider: "OpenAI",
    description: "Precise, balanced prose.",
    capabilities: ["reasoning", "code", "long-context", "tools"],
    status: "available",
    iconKey: "sun",
  },
  {
    id: "gpt-5-6-luna",
    name: "GPT-5.6 Luna",
    provider: "OpenAI",
    description: "Quiet, careful drafts.",
    capabilities: ["reasoning", "long-context", "tools"],
    status: "available",
    iconKey: "moon",
  },
  {
    id: "gpt-5-5",
    name: "GPT-5.5",
    provider: "OpenAI",
    description: "Precise, expansive answers.",
    capabilities: ["reasoning", "code", "long-context", "tools"],
    status: "available",
    iconKey: "compass",
  },
  {
    id: "gpt-5-4",
    name: "GPT-5.4",
    provider: "OpenAI",
    description: "Stable foundation model.",
    capabilities: ["reasoning", "code", "long-context"],
    status: "available",
    iconKey: "anchor",
  },
  {
    id: "gemini-3-8-flash",
    name: "Gemini 3.8 Flash",
    provider: "Google",
    description: "Fast multimodal answers.",
    capabilities: ["reasoning", "vision", "tools"],
    status: "available",
    iconKey: "zap",
  },
  {
    id: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    provider: "DeepSeek",
    description: "Deep search reasoning.",
    capabilities: ["reasoning", "code", "long-context"],
    status: "preview",
    iconKey: "search",
  },
  {
    id: "deepseek-v4-flash",
    name: "DeepSeek V4 Flash",
    provider: "DeepSeek",
    description: "Quick code retrieval.",
    capabilities: ["reasoning", "code"],
    status: "preview",
    iconKey: "rocket",
  },
  {
    id: "qwen-3-8-max",
    name: "Qwen 3.8 Max",
    provider: "Qwen",
    description: "Massive context window.",
    capabilities: ["reasoning", "code", "long-context"],
    status: "preview",
    iconKey: "layers",
  },
  {
    id: "qwen-3-7-max",
    name: "Qwen 3.7 Max",
    provider: "Qwen",
    description: "Broad knowledge base.",
    capabilities: ["reasoning", "long-context"],
    status: "preview",
    iconKey: "library",
  },
  {
    id: "kimi-k3",
    name: "Kimi K3",
    provider: "Moonshot",
    description: "Long-document reasoning.",
    capabilities: ["reasoning", "long-context"],
    status: "preview",
    iconKey: "file-text",
  },
  {
    id: "kimi-k2-7-code",
    name: "Kimi K2.7 Code",
    provider: "Moonshot",
    description: "Code-specialized drafting.",
    capabilities: ["reasoning", "code"],
    status: "preview",
    iconKey: "terminal",
  },
  {
    id: "glm-5-3",
    name: "GLM-5.3",
    provider: "Zhipu",
    description: "Multilingual reasoning.",
    capabilities: ["reasoning", "code", "tools"],
    status: "preview",
    iconKey: "languages",
  },
  {
    id: "m3",
    name: "MiniMax M3",
    provider: "MiniMax",
    description: "Open long-context chat.",
    capabilities: ["reasoning", "long-context", "tools"],
    status: "preview",
    iconKey: "message-square",
  },
  {
    id: "grok-4-6",
    name: "Grok 4.6",
    provider: "xAI",
    description: "Experimental real-time.",
    capabilities: ["reasoning", "tools"],
    status: "preview",
    iconKey: "flask-conical",
  },
  {
    id: "hy4-preview",
    name: "Tencent Hy4 Preview",
    provider: "Tencent",
    description: "Long-document Chinese.",
    capabilities: ["reasoning", "long-context"],
    status: "preview",
    iconKey: "scroll",
  },
  {
    id: "mimo-v2-5-pro",
    name: "MiMo V2.5 Pro",
    provider: "Xiaomi",
    description: "Lightweight fast drafts.",
    capabilities: ["reasoning", "code"],
    status: "preview",
    iconKey: "lightbulb",
  },
  {
    id: "nemotron-3-ultra",
    name: "Nemotron 3 Ultra",
    provider: "NVIDIA",
    description: "Hardware-tuned inference.",
    capabilities: ["reasoning", "code", "tools"],
    status: "preview",
    iconKey: "cpu",
  },
];

export const MODEL_MAP: Readonly<Record<ModelId, Model>> = MODELS.reduce(
  (acc, m) => {
    acc[m.id] = m;
    return acc;
  },
  {} as Record<ModelId, Model>,
);

export const DEFAULT_MODEL_ID: ModelId = "echo-gpt";

export function getModel(id: ModelId): Model {
  return MODEL_MAP[id] ?? MODELS[0]!;
}
import type { ComponentType } from "react";
import {
  Eye,
  FileText,
  Mic,
  Search,
  TerminalSquare,
  GitBranch,
} from "lucide-react";

/**
 * Showcase capabilities surfaced from the app header.
 *
 * These are NOT wired to real functionality. They exist as a visual
 * preview of what the product could do when connected to external
 * services (image models, web search, code interpreters, etc.). Per the
 * locked project rules, this is a frontend prototype — no real
 * connectors land here.
 *
 * Every item maps to one of the existing capability tokens in
 * `data/models.ts` (`reasoning`, `code`, `long-context`, `tools`,
 * `vision`) plus `audio`, which is reserved for future model
 * capability expansion.
 *
 * The `concept` flag is true for every item because none of these are
 * real yet — the UI labels them "Concept".
 */

export type CapabilityToken =
  | "reasoning"
  | "code"
  | "long-context"
  | "tools"
  | "vision"
  | "audio";

export interface Capability {
  id: string;
  label: string;
  description: string;
  icon: ComponentType<{ size?: number; "aria-hidden"?: boolean | "true" }>;
  /** Capability token(s) the underlying model would need. */
  requires: CapabilityToken[];
}

export const CAPABILITIES: ReadonlyArray<Capability> = [
  {
    id: "image-analysis",
    label: "Image analysis",
    description: "Describe, OCR, and reason over images.",
    icon: Eye,
    requires: ["vision"],
  },
  {
    id: "document-reading",
    label: "Document reading",
    description: "Pull answers from long PDFs and reports.",
    icon: FileText,
    requires: ["long-context"],
  },
  {
    id: "voice-input",
    label: "Voice input",
    description: "Speak prompts instead of typing.",
    icon: Mic,
    requires: ["audio"],
  },
  {
    id: "web-search",
    label: "Web search",
    description: "Pull fresh sources from the open web.",
    icon: Search,
    requires: ["tools"],
  },
  {
    id: "code-execution",
    label: "Code execution",
    description: "Run snippets in a sandboxed interpreter.",
    icon: TerminalSquare,
    requires: ["code", "tools"],
  },
  {
    id: "reasoning-chains",
    label: "Reasoning chains",
    description: "Step-by-step traces for hard problems.",
    icon: GitBranch,
    requires: ["reasoning"],
  },
];
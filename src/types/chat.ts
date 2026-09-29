/**
 * Type contracts for chat surfaces. Strict TS — no `any`.
 */

export type ModelId = string;

export type ModelProvider =
  | "EchoGPT"
  | "OpenAI"
  | "Google"
  | "DeepSeek"
  | "Qwen"
  | "Moonshot"
  | "Zhipu"
  | "MiniMax"
  | "xAI"
  | "Tencent"
  | "Xiaomi"
  | "NVIDIA";

export type ModelCapability =
  | "reasoning"
  | "code"
  | "long-context"
  | "vision"
  | "tools";

export type ModelStatus = "available" | "preview";

/**
 * String key into the lucide-react icon registry used by <ModelIcon />.
 * One per model — see ModelIcon.tsx for the glyph mapping.
 */
export type ModelIconKey =
  | "sparkles"
  | "sun"
  | "moon"
  | "compass"
  | "anchor"
  | "zap"
  | "search"
  | "rocket"
  | "layers"
  | "library"
  | "file-text"
  | "terminal"
  | "languages"
  | "message-square"
  | "flask-conical"
  | "scroll"
  | "lightbulb"
  | "cpu";

export interface Model {
  id: ModelId;
  name: string;
  provider: ModelProvider;
  description: string;
  capabilities: ReadonlyArray<ModelCapability>;
  status: ModelStatus;
  iconKey: ModelIconKey;
}

export type MessageRole = "user" | "assistant" | "system";
export type MessageStatus = "streaming" | "complete" | "error";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  model?: ModelId;
  createdAt: number;
  status: MessageStatus;
}

export interface Conversation {
  id: string;
  title: string;
  model: ModelId;
  createdAt: number;
  updatedAt: number;
  preview: string;
  /**
   * Per-conversation tool toggles. Empty array means "no tools active".
   * Toggles are bound to a single conversation so different threads
   * can run with different capabilities without leaking state.
   */
  tools?: ReadonlyArray<ToolId>;
}

export type Density = "comfortable" | "compact";

export interface Preferences {
  defaultModel: ModelId;
  density: Density;
  showModelBadge: boolean;
  sendOnEnter: boolean;
  streamReplies: boolean;
}

/**
 * Mock-only tool identifiers attached to a conversation. There is no
 * real tool execution — when a tool is "active" the canned reply simply
 * acknowledges it via a `[Tools active: …]` prefix line. See
 * `src/lib/mock-ai.ts`.
 */
export type ToolId =
  | "web-search"
  | "code-interpreter"
  | "image-generation"
  | "calculator";

/**
 * Mock user object for the local-only sign-in flow. There is no real
 * auth: credentials are stored verbatim in `localStorage` and never
 * leave the browser. The shape is intentionally tiny — just enough to
 * drive an avatar + a dropdown menu.
 */
export interface User {
  id: string;
  email: string;
  name: string;
  /** 1-2 initials derived from `name`. Stored so the avatar never recomputes. */
  initials: string;
  createdAt: number;
}

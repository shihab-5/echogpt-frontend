export interface FeatureItem {
  id: string;
  title: string;
  body: string;
}

export const FEATURES: ReadonlyArray<FeatureItem> = [
  {
    id: "feat_focus",
    title: "A workspace built around the prompt",
    body: "Composer first, history on the side. No marketing splash, no widgets to dismiss.",
  },
  {
    id: "feat_multi_model",
    title: "Switch models mid-thread",
    body: "Eighteen named models across twelve providers — EchoGPT, OpenAI, Google, DeepSeek, Qwen, Moonshot, Zhipu, MiniMax, xAI, Tencent, Xiaomi, and NVIDIA. The conversation stays, the model changes.",
  },
  {
    id: "feat_quick_actions",
    title: "Five quick actions that mean something",
    body: "Summarize, Explain, Rewrite, Translate, Debug code. Each one injects a careful prefix and gets out of the way.",
  },
  {
    id: "feat_extension",
    title: "A real extension concept",
    body: "A 380 px popup with the same composer, the same history, and the same quick actions. Shared storage with the web app.",
  },
  {
    id: "feat_responsive",
    title: "Responsive on every surface",
    body: "Desktop sidebar, tablet icons, mobile drawer. The extension viewport is its own thing — designed for narrow space, not shrunk.",
  },
];

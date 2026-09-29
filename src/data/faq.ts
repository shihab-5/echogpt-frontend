export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ: ReadonlyArray<FAQItem> = [
  {
    id: "faq_real_ai",
    question: "Does EchoGPT talk to a real AI backend?",
    answer:
      "No. This is a frontend prototype. Responses are produced locally with realistic mock data so the interface behaves like a real product without claiming capabilities we can't verify.",
  },
  {
    id: "faq_models",
    question: "Which models are supported?",
    answer:
      "Eighteen named models across twelve providers — EchoGPT, OpenAI, Google, DeepSeek, Qwen, Moonshot, Zhipu, MiniMax, xAI, Tencent, Xiaomi, and NVIDIA. Six are available today; the other twelve are marked Preview while we finalize the lineup. Switch any time without losing the thread.",
  },
  {
    id: "faq_extension",
    question: "Is there a real Chrome extension?",
    answer:
      "Not yet. The /extension page is a frontend concept that demonstrates the popup experience at 380 \u00d7 560. There is no manifest, service worker, or content script.",
  },
  {
    id: "faq_storage",
    question: "Where is my data stored?",
    answer:
      "Only in your browser's local storage. There is no account, no server, and no sync. Clearing site data removes everything.",
  },
  {
    id: "faq_themes",
    question: "Can I use it in light mode?",
    answer:
      "Yes. Theme follows system by default and can be pinned to light or dark from the navbar.",
  },
  {
    id: "faq_compare",
    question: "Will there be a compare-models view?",
    answer:
      "It is planned. Compare Mode is deferred until the core experience is stable and polished.",
  },
];

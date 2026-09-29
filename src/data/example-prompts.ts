/**
 * Three prompts shown in the empty workspace to help users get started.
 */

export interface ExamplePrompt {
  id: string;
  title: string;
  body: string;
}

export const EXAMPLE_PROMPTS: ReadonlyArray<ExamplePrompt> = [
  {
    id: "ex_summarize",
    title: "Summarize a long article",
    body: "Summarize the attached article in three bullet points, each under 18 words.",
  },
  {
    id: "ex_refactor",
    title: "Refactor a React component",
    body: "Convert this class component to hooks. Preserve behaviour and add a small unit-test idea at the end.",
  },
  {
    id: "ex_compare",
    title: "Compare two models",
    body: "What would you say if asked to compare a flagship model to an open-weights one for code review?",
  },
];

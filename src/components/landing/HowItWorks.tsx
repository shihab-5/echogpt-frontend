import { Container } from "@/components/shared/Container";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { MotionFadeIn } from "@/components/shared/MotionFadeIn";

const STEPS = [
  {
    n: "01",
    title: "Pick a model from the composer",
    body: "Open the workspace, choose one of five models, and start typing. No setup, no onboarding wizard.",
  },
  {
    n: "02",
    title: "Write, refine, switch mid-thread",
    body: "Run quick actions like Summarize, Explain, or Translate. Swap models without losing your place.",
  },
  {
    n: "03",
    title: "Continue from the extension",
    body: "Pick up the same thread from the Chrome extension popup. Shared local storage, no round trip.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border py-16 md:py-24">
      <Container>
        <header className="max-w-2xl">
          <SectionEyebrow>How it works</SectionEyebrow>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.025em] text-fg-primary md:text-4xl">
            Three steps. No setup.
          </h2>
        </header>

        <ol className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <MotionFadeIn
              key={s.n}
              as="li"
              delay={i * 0.05}
              className="flex flex-col gap-3"
            >
              <span className="font-mono text-xs text-fg-muted">{s.n}</span>
              <span
                aria-hidden="true"
                className="h-px w-12 bg-border-strong"
              />
              <h3 className="text-base font-semibold text-fg-primary">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-fg-secondary">
                {s.body}
              </p>
            </MotionFadeIn>
          ))}
        </ol>
      </Container>
    </section>
  );
}

import { Check, Minus } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { MotionFadeIn } from "@/components/shared/MotionFadeIn";

const DOES = [
  "Switch models mid-thread without losing context",
  "Reuse the same composer across the web app and the extension",
  "Run quick actions that actually do something useful",
  "Persist conversations in local storage \u2014 no account needed",
  "Render code, copy responses, regenerate \u2014 the basics done well",
];

const DOESNT = [
  "Pretend to call a real AI backend (it doesn\u2019t)",
  "Push a carousel of CTAs in your face",
  "Hide anything behind a paywall or sign-up",
  "Ship a real Chrome extension manifest (it\u2019s a concept)",
  "Make unsupported claims about specific model capabilities",
];

export function WhyEchoGPT() {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <Container>
        <header className="max-w-2xl">
          <SectionEyebrow>Why EchoGPT</SectionEyebrow>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.025em] text-fg-primary md:text-4xl">
            What it does, and what it doesn&apos;t do.
          </h2>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <MotionFadeIn className="rounded-card border border-border bg-bg-card p-6">
            <h3 className="flex items-center gap-2 text-base font-semibold text-fg-primary">
              <span
                aria-hidden="true"
                className="inline-flex h-6 w-6 items-center justify-center rounded-sm bg-brand-subtle text-[var(--brand)]"
              >
                <Check size={14} aria-hidden="true" />
              </span>
              Does
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-fg-secondary">
              {DOES.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg-muted"
                  />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </MotionFadeIn>

          <MotionFadeIn
            delay={0.05}
            className="rounded-card border border-border bg-bg-card p-6"
          >
            <h3 className="flex items-center gap-2 text-base font-semibold text-fg-primary">
              <span
                aria-hidden="true"
                className="inline-flex h-6 w-6 items-center justify-center rounded-sm bg-bg-hover text-fg-secondary"
              >
                <Minus size={14} aria-hidden="true" />
              </span>
              Doesn&apos;t
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-fg-secondary">
              {DOESNT.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg-muted"
                  />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </MotionFadeIn>
        </div>
      </Container>
    </section>
  );
}

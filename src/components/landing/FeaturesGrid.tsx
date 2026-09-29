import { Container } from "@/components/shared/Container";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { MotionFadeIn } from "@/components/shared/MotionFadeIn";
import { FEATURES } from "@/data/features";

export function FeaturesGrid() {
  return (
    <section id="features" className="border-t border-border py-16 md:py-24">
      <Container>
        <header className="max-w-2xl">
          <SectionEyebrow>Features</SectionEyebrow>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.025em] text-fg-primary md:text-4xl">
            A workspace built around the prompt, not the dashboard.
          </h2>
          <p className="mt-3 text-base text-fg-secondary md:text-lg">
            Five things that earn their place. No carousel of CTAs, no widget
            you have to dismiss.
          </p>
        </header>

        <ul
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {FEATURES.map((f, i) => (
            <MotionFadeIn
              as="li"
              key={f.id}
              className="rounded-card border border-border bg-bg-card p-5 md:p-6"
              delay={i * 0.04}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-muted">
                0{i + 1}
              </p>
              <h3 className="mt-2 text-base font-semibold text-fg-primary">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
                {f.body}
              </p>
            </MotionFadeIn>
          ))}
        </ul>
      </Container>
    </section>
  );
}

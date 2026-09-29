import { Container } from "@/components/shared/Container";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { MotionFadeIn } from "@/components/shared/MotionFadeIn";
import { ModelIcon } from "@/components/shared/ModelIcon";
import { Badge } from "@/components/ui/Badge";
import { MODELS } from "@/data/models";

const FEATURED_ID = "echo-gpt";
const featured = MODELS.find((m) => m.id === FEATURED_ID)!;
const others = MODELS.filter((m) => m.id !== FEATURED_ID);

export function ModelsStrip() {
  return (
    <section id="models" className="border-t border-border py-16 md:py-24">
      <Container>
        <header className="max-w-2xl">
          <SectionEyebrow>AI Models</SectionEyebrow>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.025em] text-fg-primary md:text-4xl">
            Eighteen models. One composer. Switch mid-thread.
          </h2>
          <p className="mt-3 text-base text-fg-secondary md:text-lg">
            Six are available today. Twelve are marked Preview while we finalize
            the lineup.
          </p>
        </header>

        {/* Featured — EchoGPT */}
        <MotionFadeIn
          as="article"
          className="mt-10 flex flex-col gap-4 rounded-card border border-border-strong bg-bg-card p-6 md:p-8"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <ModelIcon
                iconKey={featured.iconKey}
                size="lg"
                ariaLabel={featured.name}
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold text-fg-primary md:text-2xl">
                  {featured.name}
                </h3>
                <p className="text-sm text-fg-secondary md:text-base">
                  {featured.description}
                </p>
              </div>
            </div>
            <Badge variant="neutral">Available</Badge>
          </div>
          <ul
            className="flex flex-wrap gap-1.5 pt-1"
            aria-label="Capabilities"
          >
            {featured.capabilities.map((c) => (
              <li
                key={c}
                className="inline-flex items-center rounded-sm border border-border bg-bg-elevated px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.05em] text-fg-muted"
              >
                {c}
              </li>
            ))}
          </ul>
        </MotionFadeIn>

        {/* The other 17 */}
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((m, i) => (
            <MotionFadeIn
              key={m.id}
              as="li"
              delay={(i + 1) * 0.03}
              className="flex flex-col gap-3 rounded-card border border-border bg-bg-card p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <ModelIcon
                    iconKey={m.iconKey}
                    size="sm"
                    ariaLabel={m.name}
                  />
                  <span className="truncate text-sm font-semibold text-fg-primary">
                    {m.name}
                  </span>
                </div>
                {m.status === "preview" && (
                  <Badge variant="outline">Preview</Badge>
                )}
              </div>
              <p className="text-sm leading-relaxed text-fg-secondary">
                {m.description}
              </p>
            </MotionFadeIn>
          ))}
        </ul>
      </Container>
    </section>
  );
}
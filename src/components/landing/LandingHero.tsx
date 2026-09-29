import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { MotionFadeIn } from "@/components/shared/MotionFadeIn";
import { ArrowRight } from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-12 md:pb-24 md:pt-20">
      <Container>
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-12">
          <MotionFadeIn className="lg:col-span-7">
            <SectionEyebrow>Multi-model AI workspace</SectionEyebrow>
            <h1 className="mt-4 text-[44px] font-semibold leading-[1.05] tracking-[-0.035em] text-fg-primary md:text-[60px] md:leading-[1.05]">
              One workspace. Every AI perspective.
            </h1>
            <p className="mt-5 max-w-prose text-base text-fg-secondary md:text-lg">
              Chat with multiple AI models, compare responses, and get
              instant help with the content you&apos;re already working with.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/app"
                className="inline-flex h-11 items-center gap-2 rounded-control bg-brand px-5 text-sm font-medium text-white transition-colors duration-fast hover:bg-brand-hover"
              >
                Open the workspace
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/extension"
                className="inline-flex h-11 items-center gap-2 rounded-control border border-border-strong px-5 text-sm text-fg-secondary transition-colors duration-fast hover:border-fg-muted hover:text-fg-primary"
              >
                Try the extension
              </Link>
            </div>
            <p className="mt-4 text-xs text-fg-muted">
              Multiple AI models · Browser assistance · Focused workspace
            </p>
          </MotionFadeIn>

          <MotionFadeIn className="lg:col-span-5" delay={0.08}>
            <div className="hidden lg:block">
              <HeroStats />
            </div>
          </MotionFadeIn>
        </div>

        <div className="mt-8 lg:hidden">
          <HeroStats />
        </div>
      </Container>
    </section>
  );
}

function HeroStats() {
  return (
    <dl className="grid grid-cols-3 gap-4 border-t border-border pt-6 text-left">
      {[
        { k: "Models", v: "5" },
        { k: "Quick actions", v: "5" },
        { k: "Surfaces", v: "3" },
      ].map((it) => (
        <div key={it.k}>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-muted">
            {it.k}
          </dt>
          <dd className="mt-1 text-2xl font-semibold tracking-tight text-fg-primary">
            {it.v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

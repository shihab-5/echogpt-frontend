import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { MotionFadeIn } from "@/components/shared/MotionFadeIn";

export function FinalCTA() {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <Container>
        <MotionFadeIn className="rounded-card border border-border bg-bg-card p-8 md:p-12">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.025em] text-fg-primary md:text-4xl">
                Open the workspace.
              </h2>
              <p className="mt-3 text-base text-fg-secondary md:text-lg">
                Pick a model. Type a prompt. Switch when you want. Everything
                you write stays in your browser.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
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
          </div>
        </MotionFadeIn>
      </Container>
    </section>
  );
}

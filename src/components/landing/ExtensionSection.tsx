"use client";

import dynamic from "next/dynamic";
import { Container } from "@/components/shared/Container";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { MotionFadeIn } from "@/components/shared/MotionFadeIn";
import { ExtensionFrame } from "@/components/shared/ExtensionFrame";

// SSR off: the popup is a client component that uses localStorage / hooks.
const ExtensionPromptView = dynamic(
  () =>
    import("@/components/extension/ExtensionPromptView").then(
      (m) => m.ExtensionPromptView,
    ),
  { ssr: false, loading: () => <div className="h-[460px] w-[380px] bg-bg-card" /> },
);

export function ExtensionSection() {
  return (
    <section id="extension" className="border-t border-border py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <MotionFadeIn>
            <SectionEyebrow>Chrome extension</SectionEyebrow>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.025em] text-fg-primary md:text-4xl">
              Ask from any tab. Read in this tab. Skip the round trip.
            </h2>
            <p className="mt-4 max-w-prose text-base text-fg-secondary md:text-lg">
              A 380 × 560 popup that mirrors the workspace&apos;s composer,
              history, and quick actions. Shared local storage means the same
              threads appear in the web app.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-fg-secondary">
              <li className="flex items-start gap-2">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg-muted"
                />
                Compact composer with auto-grow and Send in thumb reach.
              </li>
              <li className="flex items-start gap-2">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg-muted"
                />
                Recent list caps at five; tap to resume a thread.
              </li>
              <li className="flex items-start gap-2">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg-muted"
                />
                Same theme, default model, and stream setting as the web app.
              </li>
            </ul>
          </MotionFadeIn>

          <MotionFadeIn
            delay={0.08}
            className="flex items-center justify-center"
          >
            <ExtensionFrame>
              <ExtensionPromptView />
            </ExtensionFrame>
          </MotionFadeIn>
        </div>
      </Container>
    </section>
  );
}

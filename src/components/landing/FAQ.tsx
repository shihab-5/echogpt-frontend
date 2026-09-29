"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { MotionFadeIn } from "@/components/shared/MotionFadeIn";
import { FAQ as FAQ_DATA } from "@/data/faq";
import { cn } from "@/lib/cn";

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0]?.id ?? null);

  return (
    <section id="faq" className="border-t border-border py-16 md:py-24">
      <Container>
        <header className="max-w-2xl">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.025em] text-fg-primary md:text-4xl">
            Questions, answered directly.
          </h2>
        </header>

        <MotionFadeIn className="mt-10 max-w-3xl">
          <ul className="divide-y divide-border border-y border-border">
            {FAQ_DATA.map((it) => {
              const open = openId === it.id;
              return (
                <li key={it.id}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? null : it.id)}
                      aria-expanded={open}
                      aria-controls={`faq-${it.id}`}
                      className={cn(
                        "flex w-full items-center justify-between gap-4 py-5 text-left",
                        "transition-colors duration-fast hover:text-fg-primary",
                        "focus-visible:outline-none",
                        open ? "text-fg-primary" : "text-fg-primary",
                      )}
                    >
                      <span className="text-base font-medium">{it.question}</span>
                      <ChevronDown
                        size={18}
                        aria-hidden="true"
                        className={cn(
                          "shrink-0 text-fg-muted transition-transform duration-fast",
                          open && "rotate-180 text-fg-primary",
                        )}
                      />
                    </button>
                  </h3>
                  <div
                    id={`faq-${it.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${it.id}`}
                    hidden={!open}
                    className="pb-5 pr-10 text-sm leading-relaxed text-fg-secondary"
                  >
                    {it.answer}
                  </div>
                </li>
              );
            })}
          </ul>
        </MotionFadeIn>
      </Container>
    </section>
  );
}

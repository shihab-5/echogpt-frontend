import Link from "next/link";
import { Container } from "@/components/shared/Container";

export const metadata = {
  title: "Terms \u00b7 EchoGPT",
};

export default function TermsPage() {
  return (
    <Container className="py-16 md:py-24">
      <div className="mx-auto max-w-prose">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-muted">
          Terms
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          This is a prototype.
        </h1>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-fg-secondary">
          <p>
            EchoGPT is provided as-is, for evaluation and learning. It is not
            a production product. There is no SLA, no warranty, and no
            guarantee of availability.
          </p>
          <p>
            Do not enter personal, financial, or otherwise sensitive
            information. AI responses are produced locally and are not
            suitable for any consequential decision.
          </p>
          <p className="text-sm">
            The project ships with a frontend-only mock layer. There is no
            real AI backend, no account system, and no payment processing.
          </p>
        </div>
        <div className="mt-10 flex gap-3">
          <Link
            href="/"
            className="inline-flex h-9 items-center rounded-control border border-border-strong px-4 text-sm hover:bg-bg-hover"
          >
            Back to home
          </Link>
          <Link
            href="/privacy"
            className="inline-flex h-9 items-center rounded-control border border-border-strong px-4 text-sm hover:bg-bg-hover"
          >
            Privacy
          </Link>
        </div>
      </div>
    </Container>
  );
}

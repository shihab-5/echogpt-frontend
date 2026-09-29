import Link from "next/link";
import { Container } from "@/components/shared/Container";

export const metadata = {
  title: "Privacy \u00b7 EchoGPT",
};

export default function PrivacyPage() {
  return (
    <Container className="py-16 md:py-24">
      <div className="mx-auto max-w-prose">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-muted">
          Privacy
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          What we (don&apos;t) collect.
        </h1>
        <div className="prose-invert mt-6 space-y-4 text-base leading-relaxed text-fg-secondary">
          <p>
            EchoGPT is a frontend prototype. There is no server, no
            analytics, no telemetry, and no third-party scripts beyond the
            fonts loaded by Next.js.
          </p>
          <p>
            Conversations, preferences, and theme live in your browser&apos;s
            local storage. They stay on your device and are removed when you
            clear site data.
          </p>
          <p>
            AI responses are produced locally using mock data. No request
            leaves your browser.
          </p>
          <p className="text-sm">
            Questions? Open an issue on the project repository.
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
            href="/terms"
            className="inline-flex h-9 items-center rounded-control border border-border-strong px-4 text-sm hover:bg-bg-hover"
          >
            Terms
          </Link>
        </div>
      </div>
    </Container>
  );
}

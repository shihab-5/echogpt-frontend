import Link from "next/link";
import { Container } from "@/components/shared/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start gap-4 py-24">
      <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-muted">404</span>
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
        That route doesn&apos;t exist.
      </h1>
      <p className="max-w-prose text-base text-fg-secondary">
        The page you&apos;re looking for isn&apos;t here. Head back to the
        workspace or the marketing landing.
      </p>
      <div className="mt-2 flex gap-3">
        <Link
          href="/"
          className="inline-flex h-9 items-center rounded-control border border-border-strong px-4 text-sm hover:bg-bg-hover"
        >
          Landing
        </Link>
        <Link
          href="/app"
          className="inline-flex h-9 items-center rounded-control bg-brand px-4 text-sm font-medium text-white hover:bg-brand-hover"
        >
          Open the workspace
        </Link>
      </div>
    </Container>
  );
}

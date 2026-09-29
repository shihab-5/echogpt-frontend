import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { SignInForm } from "@/components/auth/SignInForm";

export const metadata = {
  title: "Sign in \u00b7 EchoGPT",
};

export default function SignInPage() {
  return (
    <Container className="py-16 md:py-24">
      <div className="mx-auto max-w-md">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-muted">
          Sign in
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          Pick up where you left off.
        </h1>
        <p className="mt-2 text-sm text-fg-secondary">
          Sign in to keep your workspace settings attached to this device.
          This is a prototype — your credentials are stored locally and
          never leave the browser.
        </p>

        <div className="mt-8 rounded-lg border border-border-strong bg-bg-elevated p-5">
          <SignInForm />
        </div>

        <p className="mt-6 text-center text-xs text-fg-muted">
          Looking for the legal copy?{" "}
          <Link href="/privacy" className="text-fg-primary underline-offset-2 hover:underline">
            Privacy
          </Link>
          {" · "}
          <Link href="/terms" className="text-fg-primary underline-offset-2 hover:underline">
            Terms
          </Link>
        </p>
      </div>
    </Container>
  );
}
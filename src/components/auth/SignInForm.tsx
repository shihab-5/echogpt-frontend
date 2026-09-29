"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { useUser } from "@/hooks/use-user";
import { useToast } from "@/components/shared/ToastProvider";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Mock sign-in form. Lives at `/signin` and is purely visual:
 *
 * - Email format is the only validation. Password accepts any value.
 * - "Sign in" persists the user in `localStorage` and routes to `/app`.
 * - "Continue without signing in" is the no-account escape hatch.
 *
 * There is no real auth (no fetch, no cookie, no JWT). The visible
 * "Mock sign-in" disclaimer is intentional — see `project_rules.md` §25.
 */
export function SignInForm() {
  const router = useRouter();
  const { signIn } = useUser();
  const { pushToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setEmailError("Enter a valid email address.");
      return;
    }
    setEmailError(null);
    const local = email.split("@")[0]?.replace(/[._-]+/g, " ").trim() || email;
    signIn(email.trim(), local);
    pushToast({
      message: `Signed in as ${email.trim()}`,
      variant: "success",
    });
    router.push("/app");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <Field
        id="email"
        label="Email"
        hint={
          emailError ??
          "Stored only in your browser — never sent anywhere."
        }
        error={emailError ?? undefined}
      >
        <Input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError(null);
          }}
          invalid={!!emailError}
          placeholder="you@example.com"
        />
      </Field>

      <Field
        id="password"
        label="Password"
        hint="Mock auth — any value is accepted."
      >
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </Field>

      <div className="flex flex-col gap-2 pt-1">
        <Button type="submit" variant="primary" size="lg" fullWidth>
          Sign in
          <ArrowRight size={14} aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="md"
          fullWidth
          onClick={() => router.push("/app")}
        >
          Continue without signing in
        </Button>
      </div>

      <p className="pt-2 text-xs text-fg-muted">
        Mock sign-in for prototype purposes — credentials are stored
        locally and never sent anywhere.
      </p>
    </form>
  );
}
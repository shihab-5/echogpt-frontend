"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ConversationNotFoundPanelProps {
  /** The bogus id the user landed on, shown verbatim for context. */
  conversationId: string;
}

/**
 * Recovery panel for /app/chat/<bogus-id>.
 *
 * Rendered inline (not as a Next.js 404) so the user keeps the
 * workspace chrome — the AppShell + sidebar remain usable.
 */
export function ConversationNotFoundPanel({
  conversationId,
}: ConversationNotFoundPanelProps) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <p className="text-xs font-medium uppercase tracking-[0.08em] text-fg-muted">
          404 · Conversation
        </p>
        <h1 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-fg-primary">
          We couldn&rsquo;t find that conversation
        </h1>
        <p className="mt-2 text-sm text-fg-secondary">
          The id{" "}
          <span className="font-mono text-fg-primary">{conversationId}</span>{" "}
          doesn&rsquo;t match any conversation in your local workspace.
        </p>
        <div className="mt-6">
          <Link href="/app">
            <Button variant="secondary" size="md">
              <ArrowLeft size={14} aria-hidden="true" />
              Back to workspace
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
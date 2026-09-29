"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { useConversations } from "@/hooks/use-conversations";
import { useActiveModel } from "@/hooks/use-active-model";

interface NewChatButtonProps {
  /**
   * When true, render a square icon-only button (used by the
   * 64 px collapsed sidebar and the mobile drawer header).
   */
  iconOnly?: boolean;
  className?: string;
}

/**
 * Primary "New chat" action at the top of the sidebar.
 *
 * Creates a new conversation using the currently-active model
 * (read from the URL ?model= query) and navigates to its chat
 * route. The created conversation is pre-seeded with the
 * active model so subsequent <ModelSelector /> interactions
 * in P5 stay consistent.
 */
export function NewChatButton({ iconOnly = false, className }: NewChatButtonProps) {
  const router = useRouter();
  const { create } = useConversations();
  const { model } = useActiveModel();

  const onClick = useCallback(() => {
    const conv = create(undefined, model);
    router.push(`/app/chat/${conv.id}`);
  }, [create, router, model]);

  if (iconOnly) {
    return (
      <button
        type="button"
        aria-label="New chat"
        onClick={onClick}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-control bg-brand text-white",
          "transition-colors duration-fast hover:bg-brand-hover active:bg-brand-active",
          "focus-visible:outline-none",
          className,
        )}
      >
        <Plus size={18} aria-hidden="true" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-10 w-full items-center justify-center gap-2 rounded-control bg-brand px-3 text-sm font-medium text-white",
        "transition-colors duration-fast hover:bg-brand-hover active:bg-brand-active",
        "focus-visible:outline-none",
        className,
      )}
    >
      <Plus size={16} aria-hidden="true" />
      <span>New chat</span>
    </button>
  );
}

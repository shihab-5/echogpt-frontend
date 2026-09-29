"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/cn";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Max auto-grow rows. After this, internal scroll. */
  maxRows?: number;
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { className, maxRows = 6, value, invalid, onInput, ...rest },
    ref,
  ) {
    const innerRef = useRef<HTMLTextAreaElement | null>(null);

    useImperativeHandle(ref, () => innerRef.current as HTMLTextAreaElement);

    useEffect(() => {
      const el = innerRef.current;
      if (!el) return;
      el.style.height = "auto";
      const lineHeight = 22;
      const next = Math.min(el.scrollHeight, lineHeight * maxRows);
      el.style.height = `${next}px`;
    }, [value, maxRows]);

    return (
      <textarea
        ref={innerRef}
        value={value}
        rows={1}
        onInput={onInput}
        className={cn(
          "w-full resize-none rounded-control bg-transparent text-sm text-fg-primary",
          "placeholder:text-fg-muted",
          "focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          invalid && "text-danger",
          className,
        )}
        {...rest}
      />
    );
  },
);

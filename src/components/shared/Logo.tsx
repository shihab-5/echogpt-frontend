import Image from "next/image";
import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** When true, render only the mark (square icon). Used by the 64 px sidebar. */
  hideWordmark?: boolean;
}

export function Logo({ className, size = "md", hideWordmark = false }: LogoProps) {
  const dim = size === "sm" ? 48 : size === "lg" ? 78 : 68;
  const text =
    size === "sm"
      ? "text-2xl"
      : size === "lg"
        ? "text-[36px] leading-[40px]"
        : "text-[30px] leading-[34px]";

  return (
    <span className={cn("inline-flex items-center gap-2.5 font-semibold tracking-tight text-brand", className)}>
      <Image
        src="/favicon.png"
        alt="EchoGPT logo"
        width={dim}
        height={dim}
        className="rounded-[7px]"
      />
      {!hideWordmark && (
        <span className={cn(text, "text-fg-primary")}>
          <span className="text-brand">Echo</span>GPT
        </span>
      )}
    </span>
  );
}
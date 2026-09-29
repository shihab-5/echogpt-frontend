"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { MotionProps } from "framer-motion";

type ElementTag = "div" | "li" | "section" | "article";

interface MotionFadeInProps extends Omit<MotionProps, "initial" | "whileInView" | "viewport"> {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds. */
  delay?: number;
  /** Y offset in px. Default 12. */
  y?: number;
  /** Render as a different element. Default `div`. */
  as?: ElementTag;
}

export function MotionFadeIn({
  children,
  className,
  delay = 0,
  y = 12,
  as = "div",
  ...rest
}: MotionFadeInProps) {
  const reduce = useReducedMotion();

  const props = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y },
    whileInView: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: reduce ? 0.08 : 0.36, ease: "easeOut", delay },
    className,
    ...rest,
  } as const;

  if (as === "li") return <motion.li {...props}>{children}</motion.li>;
  if (as === "section") return <motion.section {...props}>{children}</motion.section>;
  if (as === "article") return <motion.article {...props}>{children}</motion.article>;
  return <motion.div {...props}>{children}</motion.div>;
}

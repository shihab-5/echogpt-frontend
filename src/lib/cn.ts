import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Compose className strings safely:
 * - clsx handles conditional / array / object inputs
 * - twMerge resolves Tailwind conflicts so the later class wins
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

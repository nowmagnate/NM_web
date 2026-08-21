import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names, with later Tailwind utilities winning over
 * earlier conflicting ones. Lets a component ship sensible defaults that a
 * caller can override via `className` without specificity fights.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

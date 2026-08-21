import { cn } from "@/lib/cn";

/**
 * Horizontal page gutter. Every section's content sits inside one of these so
 * the left edge is identical down the whole page.
 *
 * `wide` is for full-bleed treatments that still need a max width;
 * `narrow` is for prose, which should not run wider than ~65 characters.
 */
export function Container({
  children,
  size = "default",
  className,
}: {
  children: React.ReactNode;
  size?: "default" | "wide" | "narrow";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 md:px-8",
        size === "default" && "max-w-[1400px]",
        size === "wide" && "max-w-[1600px]",
        size === "narrow" && "max-w-[760px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

import { cn } from "@/lib/cn";
import { Container } from "./Container";

/**
 * Vertical rhythm on one continuous white sheet.
 *
 * `tone` is deliberately narrow. The page does not alternate pale background
 * bands; a section either sits on white, sits on the one soft off-white band
 * ("soft"), or is the one dark field a page is allowed ("deep"). Depth in this
 * system comes from rules and whitespace, not from shadow.
 *
 * More space above a heading than below it is handled at the section level:
 * `pt` always exceeds the internal gap to the first heading.
 */
export function Section({
  children,
  id,
  tone = "bg",
  spacing = "default",
  container = "default",
  className,
  as: Tag = "section",
}: {
  children: React.ReactNode;
  id?: string;
  tone?: "bg" | "soft" | "deep" | "none";
  spacing?: "default" | "large" | "compact" | "none";
  container?: "default" | "wide" | "narrow" | false;
  className?: string;
  as?: "section" | "div" | "footer" | "header";
}) {
  const body = container ? <Container size={container}>{children}</Container> : children;

  return (
    <Tag
      id={id}
      className={cn(
        tone === "soft" && "bg-bg-soft",
        tone === "deep" && "bg-bg-deep text-bg-deep-ink",
        spacing === "default" && "py-24 md:py-32",
        spacing === "large" && "py-32 md:py-44",
        spacing === "compact" && "py-16 md:py-20",
        className,
      )}
    >
      {body}
    </Tag>
  );
}

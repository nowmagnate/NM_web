import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * A mark from the logo system, rendered from the identity's own export.
 *
 * THIS USED TO SET THE MARK AS TYPE, and the reason it no longer does is
 * worth recording, because the type version was in most respects the better
 * engineering.
 *
 * The marks looked like a rule: the product's initial locked up with a shared
 * M, set in the display face at its heaviest weight and kerned until the two
 * letters interlocked. That reproduced the first two marks exactly, and it
 * meant a new product needed no artwork at all, only an initial and a kern.
 *
 * Then the third mark arrived and it is not that at all: its initial sits
 * INSIDE the M, its arms doing the work of the M's inner diagonals, in a
 * colour that is nowhere in the family. So the rule was never a rule. It was
 * two marks that happened to agree, and a system inferred from two examples
 * is a guess with a sample size.
 *
 * Rendering the exports costs the scalability and the free-mark-per-product,
 * and it is still right: the artwork is authored in the design system and
 * exported, so pointing at the export makes the design system the source of
 * truth. Re-exporting over the same filename updates the site with no code
 * change, which also matches how these actually get iterated.
 *
 * The tile, its radius and its hairline are all inside the artwork. Nothing
 * here draws chrome around it, so a future mark that is not a tile at all
 * will render correctly without touching this file.
 */
export function Monogram({
  src,
  size = 36,
  className,
}: {
  /** Path under /public. The export is square. */
  src: string;
  /** Rendered edge length in px. Sources are 512, so any size downsamples. */
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={src}
      // Decorative in every current use: the name is always set beside it, and
      // the accessible name is carried by the wrapper.
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
    />
  );
}

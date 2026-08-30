import Image from "next/image";
import type { TplImage } from "../schema";

/**
 * The hero photograph, as the GROUND.
 *
 * This replaces the earlier treatment where the hero image was an object with
 * softened edges placed inside a tinted field. That reads as a picture stuck
 * into the middle of the copy however carefully its edges are handled, because
 * it is one: an object in a layout is a thing the type sits NEXT TO. A hero
 * photograph has to be the surface the type is printed ON.
 *
 * Everything about legibility lives in the scrim, not here. See `tokens.css`:
 * any region carrying text is covered by at least 72% ink, which clears 7:1
 * for `--tpl-on-ink` even composited over a pure white photograph. That is the
 * point of doing it with arithmetic rather than by eye. A client will swap this
 * image for a bright kitchen or a snow scene without asking anybody, and the
 * headline has to survive it.
 *
 * `fill` rather than width and height, because the frame is the band and the
 * photograph covers it. CLS is still zero: the band's height is set in CSS
 * before the image loads, so nothing reflows when it arrives.
 */
export function Backdrop({
  image,
  scrim,
  priority = true,
  sizes = "100vw",
}: {
  image: TplImage;
  /** Which region the type occupies, and therefore where the ink is heaviest. */
  scrim: "left" | "right" | "full" | "bottom" | "top";
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className="tpl-media" data-scrim={scrim} aria-hidden={image.alt ? undefined : true}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}

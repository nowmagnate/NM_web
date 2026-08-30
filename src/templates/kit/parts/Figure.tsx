import Image from "next/image";
import { cn } from "@/lib/cn";
import type { TplImage } from "../schema";

/**
 * Every image in a template goes through here.
 *
 * Image optimization is off across this project (`next.config.ts`: there is no
 * server to do it), so width and height are mandatory in the schema and are
 * passed through verbatim. That is what holds CLS at zero, which matters more
 * on a template than on the studio's own site: these pages are opened once,
 * on a phone, by somebody deciding whether to bother.
 *
 * `ratio` crops rather than distorts. A client swapping in their own
 * photography will not match the demo's aspect ratio and should not have to:
 * the frame is fixed, the photograph is covered into it, and nothing in the
 * layout moves.
 */
export function Figure({
  image,
  ratio,
  priority,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  caption,
}: {
  image: TplImage;
  /** CSS aspect ratio, e.g. "4 / 5". Omit to use the image's own. */
  ratio?: string;
  /** True for the hero image only. Everything else stays lazy. */
  priority?: boolean;
  className?: string;
  sizes?: string;
  caption?: string;
}) {
  const img = (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      sizes={sizes}
      className={cn("h-full w-full object-cover", !ratio && "h-auto")}
    />
  );

  const frame = (
    <div
      className={cn("rounded-tpl bg-tpl-surface overflow-hidden", className)}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {img}
    </div>
  );

  if (!caption) return frame;

  return (
    <figure className="flex flex-col gap-3">
      {frame}
      <figcaption className="text-tpl-muted text-[13px] leading-[1.5]">
        {caption}
      </figcaption>
    </figure>
  );
}

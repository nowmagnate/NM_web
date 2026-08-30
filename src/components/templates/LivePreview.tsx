import { previewPath } from "@/templates/registry";
import { Button } from "@/components/ui/Button";

/**
 * The real template, embedded.
 *
 * WHY AN IFRAME RATHER THAN A SCREENSHOT. A capture is a second artefact that
 * goes stale the moment the template changes, and this catalog has already
 * shipped seven ground corrections and a complete hero rework, every one of
 * which would have invalidated a set of screenshots nobody remembered to
 * retake. The embed cannot go stale, because it is the template.
 *
 * It is same-origin, statically exported, and carries no third-party script,
 * so it costs one extra document request and nothing else. `loading="lazy"`
 * keeps that request off the critical path.
 *
 * The frame renders at desktop width and scales down (see `.preview-frame` in
 * globals.css) because the desktop composition is the thing a buyer is
 * choosing between. The link out is the one that matters though: a scaled
 * embed shows what a template looks like, and only the full page shows what it
 * is like to use.
 */
export function LivePreview({
  slug,
  name,
  practiceType,
}: {
  slug: string;
  name: string;
  practiceType: string;
}) {
  const href = previewPath(slug);

  return (
    <div className="flex flex-col gap-4">
      <div className="border-rule bg-bg-mute preview-frame aspect-[3/2] border">
        <iframe
          src={href}
          title={`Live preview of ${name}, a template for a ${practiceType.toLowerCase()}`}
          loading="lazy"
          // The embed is a picture of the template, not a thing to interact
          // with at 46%. Scrolling it inside the card would fight the page.
          scrolling="no"
          tabIndex={-1}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-ink-muted text-sm">
          A live page, not a screenshot. Open it full size to scroll it.
        </p>
        <Button href={href} variant="solid" size="sm" external>
          Open full preview
        </Button>
      </div>
    </div>
  );
}

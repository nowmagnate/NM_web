import Link from "next/link";
import Image from "next/image";
import type { Template } from "@/data/templates";
import { placeholderImage } from "@/lib/placeholder";

/**
 * Catalog card. Shared between /templates and the home page's featured rail
 * would be tempting to unify, but the rail's card is intentionally simpler
 * (no category label, fixed width for the scroll-snap track) so they stay
 * separate rather than forcing one component to serve two layouts.
 */
export function TemplateCard({ template }: { template: Template }) {
  return (
    <Link
      href={`/templates/${template.slug}`}
      className="group border-rule bg-bg flex flex-col overflow-hidden border transition-shadow duration-[--t-base] ease-(--ease-settle) hover:shadow-[var(--lift)]"
    >
      <div className="relative overflow-hidden">
        {/* TODO(asset): see design/ASSET-MANIFEST.md for the full slug list. */}
        <Image
          src={placeholderImage(`template-${template.slug}`, 800, 600)}
          alt={`${template.name}, a template for a ${template.practiceType.toLowerCase()}`}
          width={800}
          height={600}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="aspect-4/3 w-full object-cover transition-transform duration-[--t-slow] ease-(--ease-settle) group-hover:scale-[1.03]"
        />
        {template.previewStatus === "comp" ? (
          <span className="ui-label border-ink bg-bg/90 text-ink absolute top-3 left-3 border px-2.5 py-1.5 text-[10px] backdrop-blur-sm">
            Design concept
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="ui-label text-ink-faint text-[10px]">{template.practiceType}</p>
        <h3 className="font-display mt-2 text-lg">{template.name}</h3>
        <p className="text-ink-muted mt-2 line-clamp-2 flex-1 text-sm leading-relaxed">
          {template.blurb}
        </p>

        <div className="mt-4 flex items-center gap-1.5">
          {template.palette.swatches.map((swatch) => (
            <span
              key={swatch}
              aria-hidden="true"
              className="border-rule h-3 w-3 border"
              style={{ backgroundColor: swatch }}
            />
          ))}
          <span className="sr-only">Palette: {template.palette.name}</span>
        </div>
      </div>
    </Link>
  );
}

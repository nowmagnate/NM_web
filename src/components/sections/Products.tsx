import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProductMark } from "@/components/brand/ProductMark";
import { products } from "@/data/products";
import { brand } from "@/config/brand";
import { cn } from "@/lib/cn";

/**
 * The products the parent company ships under its own name.
 *
 * WHY IT IS A LEDGER AND NOT A GRID OF CARDS. Two products in two equal tiles
 * is the arrangement this system refuses by name: same-size boxes of
 * icon-plus-heading-plus-text, sitting on a page that already spends its one
 * card grid on the three engagement models four sections earlier. Repeating
 * that shape here would make the products read as a third pricing option.
 *
 * So it is a ruled ledger instead: full-width rows divided by hairlines, the
 * lockup in the left column at a size where the mark is actually legible, the
 * argument in the middle, the status struck out on the right where a reader
 * scanning down the column can compare the two without reading either. The
 * row is the widest element in the section on purpose. These are the company's
 * own bets, and a bet does not go in a tile.
 *
 * THE SECTION'S ONLY ACCENT IS THE LIVE PRODUCT'S MARK. No gradient heading
 * here, although the pattern is available and used elsewhere: the point of
 * this section is the sub-brand marks, and a ramp on the h2 would put the
 * section's loudest colour somewhere other than the thing being introduced.
 * The ramp appears exactly twice, on the shipped product's glyph and on its
 * status square, and both times it means the same thing.
 *
 * A hairline across the top rather than a background band. The page does not
 * alternate pale sections, and the two sections either side of this one are
 * both on the white sheet.
 */
export function Products() {
  return (
    <Section id="products" spacing="large" className="border-rule border-t">
      <div className="max-w-[46rem]">
        <p className="eyebrow">Products</p>
        <h2 className="font-display mt-5 max-w-[16ch] text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.05] font-semibold">
          Built under our own name.
        </h2>
        <p className="text-ink-muted mt-6 max-w-[58ch] text-[16px] leading-[1.65]">
          Client projects and the template catalog are built to someone else&rsquo;s brief.
          These are not. They are funded by the studio, they carry the {brand.shortName}{" "}
          name, and they are where an idea gets tested on us before it is ever quoted to
          anyone else.
        </p>
      </div>

      <ul className="border-rule mt-16 border-t md:mt-20">
        {products.map((product, i) => {
          const live = product.status === "live";

          return (
            <Reveal key={product.slug} as="li" delay={i * 0.06}>
              <div
                className={cn(
                  "border-rule grid gap-x-12 gap-y-7 border-b py-12",
                  "lg:grid-cols-12 lg:items-start lg:py-16",
                )}
              >
                {/* The lockup: the product's own mark next to its own
                    name, at the proportions the identity uses. An unshipped
                    product's mark is held back a little rather than greyed
                    out, so the row reads as pending and not as disabled. */}
                <div className="flex items-center gap-4 lg:col-span-4">
                  <ProductMark
                    product={product}
                    size={46}
                    className={cn(!live && "opacity-70")}
                  />
                  <div>
                    <h3
                      className={cn(
                        "font-display text-[24px] leading-[1.1] font-semibold tracking-[-0.01em]",
                        !live && "text-ink-soft",
                      )}
                    >
                      {product.name}
                    </h3>
                    <p className="text-ink-faint mt-1.5 text-[13px]">{product.tagline}</p>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <p className="text-ink-muted max-w-[58ch] text-[16px] leading-[1.65]">
                    {product.description}
                  </p>

                  {/* Rendered only when there is something real behind it. A
                      disabled "coming soon" control would be a link that
                      teaches the reader the row is not clickable, which the
                      status square already says more quietly. */}
                  {product.link ? (
                    <a
                      href={product.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "underline-draw font-display text-ink mt-6 inline-flex items-center gap-2",
                        "text-[16px] font-medium",
                      )}
                    >
                      {product.link.label}
                      <span aria-hidden="true" className="text-ink-faint">
                        &#8599;
                      </span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : null}
                </div>

                {/* Status. Reads as a column of its own down the ledger, which
                    is the comparison the section is actually for. */}
                <div className="lg:col-span-2 lg:justify-self-end">
                  <span
                    className={cn(
                      "ui-label inline-flex items-center gap-2.5 text-[10px]",
                      live ? "text-ink" : "text-ink-faint",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-[7px] w-[7px] shrink-0",
                        live
                          ? "bg-[image:var(--spectrum)]"
                          : "border-rule-strong border",
                      )}
                    />
                    {product.statusLabel}
                  </span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

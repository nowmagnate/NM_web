/**
 * The honesty bar.
 *
 * `PRODUCT.md` principle 1 is that this studio never fabricates proof: no
 * invented clients, no invented testimonials, no invented results. A template
 * demo, though, is worthless without reviews, prices and named practitioners,
 * because those are the parts a buyer is trying to see working.
 *
 * This bar is what reconciles the two. Every practice in every preview is
 * openly fictional and the page says so before anything else, in the studio's
 * own visual language rather than the template's, so it reads as a label
 * attached to the demo and never as part of the design being sold.
 *
 * It is not dismissible. A bar that can be closed is a bar that is closed in
 * the screenshot somebody forwards.
 *
 * IT SHARES THE TEMPLATE'S MEASURE. The bar is the studio's own chrome, but it
 * still sits directly above the template's nav, and for a while it padded at a
 * flat 20px while the nav padded at the template gutter, which reaches 48px on
 * a wide screen. Two bars stacked with their first characters 28px apart is
 * the kind of misalignment that makes a page look assembled, so it uses
 * `--tpl-gutter` and the same max width as `Wrap`.
 */
export function DemoBar({
  practice,
  templateName,
}: {
  practice: string;
  templateName: string;
}) {
  return (
    <div className="bg-ink text-bg font-body">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-3 gap-y-1 px-[var(--tpl-gutter)] py-2.5 text-[12px] leading-[1.4]">
        <span className="ui-label text-[10px]">Demo</span>
        <p className="text-bg/75">
          <span className="text-bg font-medium">{practice}</span> is a fictional
          practice, written to show the {templateName} template. The reviews, prices
          and people on this page are demo content.
        </p>
      </div>
    </div>
  );
}

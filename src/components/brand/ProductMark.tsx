import { Monogram } from "@/components/brand/Monogram";
import type { Product } from "@/data/products";

/**
 * A product's mark, taken from the logo system's own export.
 *
 * The asset path lives on the product's record in `data/products.ts`, so
 * adding a product is still a data edit. What changed is that the edit now
 * includes artwork: the marks do not share a construction, and `Monogram.tsx`
 * records how that was discovered.
 */
export function ProductMark({
  product,
  size = 44,
  className,
}: {
  product: Product;
  size?: number;
  className?: string;
}) {
  return <Monogram src={product.mark} size={size} className={className} />;
}

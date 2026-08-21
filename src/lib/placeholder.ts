/**
 * Placeholder photography.
 *
 * Real assets do not exist yet (see `design/ASSET-MANIFEST.md`). Rather than
 * fill hero slots with gradient blobs or div-based fake screenshots, every
 * image slot points at a real photograph from picsum with a stable,
 * descriptive seed.
 *
 * Why a seed and not a random URL: the same seed always returns the same
 * photograph, so the site does not reshuffle its imagery on every deploy and
 * layout stays predictable while reviewing.
 *
 * TO REPLACE: swap the `src` for the real path listed in the asset manifest.
 * Search the codebase for `TODO(asset)` to find every remaining slot.
 */
export function placeholderImage(seed: string, width: number, height: number): string {
  return `https://picsum.photos/seed/nm-${seed}/${width}/${height}`;
}

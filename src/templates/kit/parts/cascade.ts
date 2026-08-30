/**
 * The cascade delay for a grid or an index.
 *
 * It lives in its own module, and not beside TplReveal, because TplReveal is a
 * client component: everything exported from a "use client" module becomes a
 * client reference, so a server section calling this from there fails at
 * prerender with "attempted to call revealDelay() from the server". A plain
 * function shared by both sides has to sit outside the client boundary.
 *
 * The cap is the point. A list of twenty at 60ms apart would still be arriving
 * more than a second after the first item, by which time the reader has
 * started reading and the motion has become an interruption.
 */
export function revealDelay(index: number, step = 60, max = 480): number {
  return Math.min(index * step, max);
}

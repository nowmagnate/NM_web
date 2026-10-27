import localFont from "next/font/local";

/**
 * SPROUT — Familjen Grotesk over Figtree.
 *
 * Friendly without being childish, and the distinction is the whole brief. The
 * reader is the parent, not the child: a paediatric site set in a rounded
 * cartoon face is talking to the wrong person, and it reads as unserious to
 * somebody deciding who looks after their two year old.
 *
 * Familjen Grotesk has slightly soft joins and a wide, open lowercase, which is
 * warm at display size without being cute. Figtree underneath is a plain
 * humanist sans with a tall x-height, so a vaccination schedule stays legible
 * at 15px on a phone held in one hand.
 *
 * Neither face appears anywhere else in Medical & Dental, which is the rule
 * that matters: see `kit/typography.ts`.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const pediatricClinicDisplay = localFont({
  src: "../kit/fonts/FamiljenGrotesk-Variable.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "400 700",
  adjustFontFallback: "Arial",
});

const pediatricClinicBody = localFont({
  src: "../kit/fonts/Figtree-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "300 900",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${pediatricClinicDisplay.variable} ${pediatricClinicBody.variable}`;

import { Familjen_Grotesk, Figtree } from "next/font/google";

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

const display = Familjen_Grotesk({
  subsets: ["latin"],
  variable: "--tpl-font-display",
  display: "swap",
});

const body = Figtree({
  subsets: ["latin"],
  variable: "--tpl-font-body",
  display: "swap",
});

export const fontClassName = `${display.variable} ${body.variable}`;

import { Epilogue, IBM_Plex_Sans } from "next/font/google";

/**
 * BALANCE — Epilogue over IBM Plex Sans.
 *
 * The one authority template with a sans display face, and the reason is
 * commercial rather than aesthetic: packaged monthly pricing is a product, not
 * a practice. A serif would make this page look like a profession being
 * consulted; a grotesque makes it look like a service being bought, which is
 * exactly what a bookkeeping subscription is.
 *
 * IBM Plex Sans carries the tables. It was drawn for technical documentation
 * and has proper tabular figures, which matters more here than on any other
 * template in the catalog.
 */

const display = Epilogue({
  subsets: ["latin"],
  variable: "--tpl-font-display",
  display: "swap",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--tpl-font-body",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const fontClassName = `${display.variable} ${body.variable}`;

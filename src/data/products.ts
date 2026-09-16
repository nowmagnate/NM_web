/**
 * The studio's own products.
 *
 * COPY RULE: each entry describes WHAT THE PRODUCT DOES, for the person who
 * would use it. It is not the place to argue that the studio is good at
 * building things. A reader who lands on this section is asking "what is
 * this?" and an answer framed as "proof of our capability" answers a question
 * they did not ask, which is how a product section turns into a brochure.
 *
 * The rest of the site's rules still hold: no invented feature claims, no
 * metrics, and shipped before unshipped, because a list that leads with the
 * unbuilt thing reads as a pitch deck.
 *
 * Adding a third product is an entry in this array. The section and the marks
 * are both driven from here.
 */

/**
 * `live` earns the spectrum on its mark; `development` does not. The accent in
 * this system marks things that carry meaning, and "this one actually exists"
 * is the only distinction the section has to make.
 */
export type ProductStatus = "live" | "development";

export type Product = {
  slug: string;
  name: string;
  /**
   * The mark, as exported from the logo system. Artwork rather than a rule:
   * the marks do not share a construction, so each product carries its own.
   */
  mark: string;
  /** One line under the name. Not a sentence, not a slogan. */
  tagline: string;
  description: string;
  status: ProductStatus;
  statusLabel: string;
  /** Present only when there is something real to open. */
  link?: { label: string; href: string };
};

export const products: Product[] = [
  {
    slug: "jobmagnate",
    name: "JobMagnate",
    mark: "/brand/JobMagnate-icon-512.png",
    tagline: "AI-matched jobs for candidates",
    description:
      "A job search that reads a role the way a person would. Instead of matching on keywords and throwing back everything that contains them, it works from what the job actually asks for and what a candidate has actually done, so the shortlist is short and the roles on it are ones worth applying to.",
    status: "live",
    statusLabel: "Live",
    link: { label: "jobmagnate.com", href: "https://jobmagnate.com" },
  },
  {
    slug: "youmagnate",
    name: "YouMagnate",
    mark: "/brand/YouMagnate-icon-system-light-512.png",
    tagline: "The solo unicorn OS",
    description:
      "A desktop workspace where a dedicated AI agent runs each part of a business: sales, support, finance, operations, the lot. The agents carry the work end to end and coordinate with each other rather than waiting to be prompted, and they escalate only the calls that genuinely need a person, so one owner can run what used to need a team.",
    status: "development",
    statusLabel: "Coming soon",
  },
];

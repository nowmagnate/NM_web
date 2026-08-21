import { brand } from "@/config/brand";

/**
 * The company narrative. Written from what is actually true: a practice that
 * started as freelance work in 2017, grew on referrals with Indian startups,
 * and is now formalizing and opening to international clients.
 *
 * No invented milestones, no fabricated metrics. Where a specific detail would
 * strengthen the story but is not known, it is marked TODO rather than filled
 * with something plausible. A services business that pads its own history is
 * one screenshot away from a credibility problem.
 */

export const positioning = {
  /**
   * The core argument. Nine years of delivery is the strongest genuine asset
   * here, and it happens to be the exact objection an international buyer has
   * about an Indian studio, so the site leads with it rather than hiding it.
   */
  headline: "Shipping software since 2017. Now for the world.",

  subhead:
    "A small studio that has spent years building products for founders. We are opening that work to clients abroad.",

  /** Used on /about and in the home page's differentiator section. */
  paragraphs: [
    `This started in 2017 as freelance work: one developer, a handful of founders who needed something built properly, and no marketing budget. Every project after the first came from someone who had worked with us before or was told to.`,

    `That is a slow way to grow a company. It is also why we still have the habits that came with it. We scope work we can actually deliver, we say no to projects that need a bigger team than we have, and we write code the next person can read, because for years that next person was us.`,

    `We are now taking that work international. Not because the referral model stopped working, but because the products worth building stopped being local.`,
  ],

  /**
   * The offshore objection, answered directly. Every buyer has this list in
   * their head; naming it is more convincing than performing confidence.
   */
  objections: [
    {
      concern: "You get an account manager, not the people building it.",
      answer:
        "You talk to whoever is writing the code. There is no delivery-manager layer, because there is no team large enough to need one.",
    },
    {
      concern: "The timezone gap means a day lost on every question.",
      answer:
        "We hold a fixed overlap window with European and US mornings. Questions asked in your working day get answered in it, not the next one.",
    },
    {
      concern: "Who owns the code when it is finished?",
      answer:
        "You do, in full, from the first commit. Ownership transfers on payment and it is written into the contract, not assumed.",
    },
    {
      concern: "The estimate will double halfway through.",
      answer:
        "Fixed-scope work is quoted after a paid discovery, not before. If we cannot scope it confidently, we say so rather than guessing and repricing later.",
    },
  ],

  /**
   * Milestones for the /about timeline.
   *
   * TODO(content): these are the shape, not the substance. Replace the
   * `detail` strings with real turning points, and add or remove entries so
   * the timeline reflects what actually happened. Anything still marked
   * `placeholder: true` is hidden from the rendered timeline.
   */
  milestones: [
    {
      year: 2017,
      title: "First client project",
      detail:
        "The practice starts as freelance work for founders who needed a build partner.",
      placeholder: false,
    },
    {
      year: 2019,
      title: "TODO(content): first repeat engagement or first startup client",
      detail: "",
      placeholder: true,
    },
    {
      year: 2022,
      title:
        "TODO(content): a notable project, a team addition, or a shift in the kind of work",
      detail: "",
      placeholder: true,
    },
    {
      year: brand.foundedYear + 9,
      title: "Opening to international clients",
      detail:
        "The practice formalizes as a studio and starts taking work from the US, Canada and Europe.",
      placeholder: false,
    },
  ],
} as const;

/** Only the milestones with real content. The timeline renders from this. */
export const realMilestones = positioning.milestones.filter((m) => !m.placeholder);

/**
 * How engagements actually run. Four stages, deliberately not five, because
 * the fifth stage on every agency site is filler.
 */
export const processStages = [
  {
    number: "01",
    title: "Discovery",
    duration: "1 to 2 weeks, paid",
    detail:
      "We work out what you are actually building and what it will cost. You leave with a written scope and a fixed quote, whether or not you continue with us.",
  },
  {
    number: "02",
    title: "Build",
    duration: "Two-week cycles",
    detail:
      "Working software at the end of every cycle, in an environment you can open. No status decks, no percentage-complete estimates.",
  },
  {
    number: "03",
    title: "Hardening",
    duration: "Before every launch",
    detail:
      "Load, security and edge cases. The unglamorous pass that decides whether launch week is quiet or not.",
  },
  {
    number: "04",
    title: "Handover",
    duration: "On delivery",
    detail:
      "Repository, infrastructure, documentation and a walkthrough with whoever inherits it. You should be able to leave us and keep running.",
  },
] as const;

/**
 * The three ways to work with the studio. Deliberately not a pricing matrix:
 * a marketing page is the wrong place for a feature comparison table.
 */
export const engagementModels = [
  {
    name: "Fixed scope",
    bestFor: "A defined product with a clear finish line",
    detail:
      "Quoted after discovery, delivered against a written scope. You know the number before we start.",
    priceNote: "Quoted per project",
    href: "/contact",
  },
  {
    name: "Dedicated squad",
    bestFor: "Ongoing product work without hiring in-house",
    detail:
      "A small team working only on your product, month to month. Scales with what you need rather than what we want to bill.",
    priceNote: "Monthly retainer",
    href: "/contact",
  },
  {
    name: "Template site",
    bestFor: "An established local business that needs a good site quickly",
    detail:
      "Pick a template, we customize it to your practice and launch it. One price, no meetings required.",
    priceNote: "One-time",
    href: "/templates",
    highlight: true,
  },
] as const;

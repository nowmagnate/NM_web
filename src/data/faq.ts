import { offer } from "./offer";

/**
 * The FAQ exists to answer the questions that decide the sale, not to pad the
 * page. Every entry below is a real objection an international buyer has about
 * hiring an Indian studio, or a real question a $499 template buyer asks.
 *
 * Answers are direct. Hedging here reads as evasion, which is the exact
 * impression this section exists to remove.
 */

export type FaqItem = { question: string; answer: string };

/** Shown on the home page and /contact. Aimed at custom software buyers. */
export const generalFaq: FaqItem[] = [
  {
    question: "Who owns the code you write?",
    answer:
      "You do, in full. Copyright transfers to you on payment and it is written into the contract rather than assumed. You get the repository, the infrastructure and the documentation. Nothing is held back as leverage.",
  },
  {
    question: "How much timezone overlap do we actually get?",
    answer:
      "We hold a fixed overlap window with European mornings and US mornings. It is a scheduled commitment, not best effort. Questions you ask during your working day get answered in it.",
  },
  {
    question: "Will we sign an NDA?",
    answer:
      "Yes, before any detail is shared. We will sign yours rather than insisting on our own. Same for data processing agreements if you are handling personal data under GDPR.",
  },
  {
    question: "Which jurisdiction does the contract fall under?",
    answer:
      "We are flexible, and for international clients we usually contract under the client's jurisdiction. If that matters to your legal team, raise it early and we will work to what they need.",
  },
  {
    question: "How do payments work across borders?",
    answer:
      "Invoiced in USD, EUR or GBP by bank transfer, on milestones rather than a single upfront lump. For longer engagements it is typically monthly in arrears.",
  },
  {
    question: "What happens if the project goes badly?",
    answer:
      "You can stop at the end of any two-week cycle and keep everything built to that point, including the code and the environments. We do not hold work hostage against a disputed invoice.",
  },
  {
    question: "How big is the team?",
    answer:
      "Small, deliberately. That means you talk to the people writing the code rather than an account manager, and it also means we turn down work we cannot staff properly. If a project needs more people than we have, we will tell you rather than stretching.",
  },
  {
    question: "Can you take over a project someone else started?",
    answer:
      "Often, yes. It starts with a paid audit of what exists, because inheriting a codebase without reading it first is how bad estimates happen. You get the audit findings whether or not you continue with us.",
  },
];

/** Shown on /templates, template detail pages and /brief. */
export const templateFaq: FaqItem[] = [
  {
    question: `Is ${offer.price} really the full price?`,
    answer: `Yes, one time, for everything on the included list. ${offer.billing} The exclusions are listed openly on this page because an unhappy customer is almost always someone who assumed one of them was part of the deal.`,
  },
  {
    question: "How long does it take?",
    answer: `${offer.turnaround}. ${offer.turnaroundNote}`,
  },
  {
    question: "What if I do not have photos or written content?",
    answer:
      "Copywriting and photography are not included, but we will tell you exactly what is missing and what it would cost to sort out. Plenty of practices start with the text from their existing site.",
  },
  {
    question: "Can I change the design after seeing it?",
    answer:
      "One round of revisions is included, which covers content, colours, images and section order. Redesigning the template from scratch is a different job and we would quote it separately.",
  },
  {
    question: "Do I need to buy hosting and a domain?",
    answer:
      "You need a domain. Hosting for a site this size is usually free or a few dollars a month, and we will point you at a sensible option. Ongoing hosting and maintenance are not part of the one-time fee.",
  },
  {
    question: "Can you add online booking or payments?",
    answer:
      "Not at this price. Booking systems, patient intake and payments are real integrations with real ongoing costs. Ask in the brief and we will quote them properly.",
  },
  {
    question: "My practice is regulated. Does this cover compliance?",
    answer: offer.complianceNote,
  },
  {
    question: "What if I want changes a year from now?",
    answer:
      "You own the site and can hand it to anyone. If you would rather we did it, we will quote the work. There is no lock-in and no mandatory retainer.",
  },
];

/** Shown on /pricing. Billing and contract mechanics across both offerings. */
export const pricingFaq: FaqItem[] = [
  {
    question: "How does billing work for a fixed-scope project?",
    answer:
      "Milestone-based, tied to what's actually delivered, not a calendar. A typical project is three to four milestones, invoiced as each one is signed off.",
  },
  {
    question: "What about a dedicated squad?",
    answer:
      "Monthly, in arrears, based on the team size agreed for that month. You can scale the team up or down between months with notice.",
  },
  {
    question: "Are there fees beyond the quote?",
    answer: `No. The number in your quote or your ${offer.price} template is the number you pay, unless the scope itself changes and we agree that in writing first.`,
  },
  {
    question: "Do you require a deposit?",
    answer:
      "For fixed-scope work, the first milestone is invoiced at kickoff rather than a separate deposit. For the template offer, payment is due before customization starts.",
  },
  {
    question: "What's your refund position?",
    answer:
      "Full refund before work starts. Once customization or development has begun, the fee covers work already completed. If we can't deliver what was agreed, you get a full refund regardless.",
  },
];

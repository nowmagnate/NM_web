import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * THRESHOLD, as a working stager.
 *
 * NORTHFIELD & MAY DOES NOT EXIST. Fictional, and labelled as such in a bar
 * above the design that cannot be dismissed.
 *
 * NO BEFORE-AND-AFTER PAIRS, AND THIS IS A CORRECTION.
 *
 * When the `gallery` component's `pairs` layout was built, the note said it
 * was being kept for Threshold and Verge, "where the before and after is a
 * room rather than a person". That reasoning was wrong. The problem with a
 * fabricated pair was never that the subject is a body; it is that the two
 * photographs have to be THE SAME SUBJECT, and stock photography cannot
 * provide the same room shot twice.
 *
 * So this template argues the same point without faking the evidence. The
 * empty room appears once, on its own, honestly captioned as an empty room,
 * because that is exactly what it is. The staged rooms appear in the index.
 * The comparison is made in words and in the price of the packages, which is
 * where a stager's argument actually lives anyway.
 *
 * `pairs` stays in the kit. It is the right component for a client who has
 * photographed their own room twice, which is every real staging company.
 */

const PHONE = "(612) 555 0147";

export const config = defineTemplate({
  brand: {
    name: "Northfield & May",
    mark: "Northfield",
    tagline: "Home staging for listings in the Twin Cities.",
    contact: {
      phone: PHONE,
      email: "hello@northfieldmay.example",
      address: ["2210 Kellogg Avenue", "Minneapolis, MN 55404"],
      hours: "Monday to Saturday",
    },
    social: [],
  },

  theme,

  seo: {
    title: "Northfield & May",
    description:
      "Home staging for Twin Cities listings. Published package prices, a two-week turnaround, and a realtor programme with no referral fees.",
  },

  settings: {
    stickyAction: { label: "Request a quote", href: "#quote", style: "primary" },
  },

  sections: [
    {
      type: "nav",
      links: [
        { label: "Recent work", href: "#work" },
        { label: "Packages", href: "#packages" },
        { label: "How it works", href: "#how" },
        { label: "For realtors", href: "#realtors" },
      ],
      action: { label: "Get a quote", href: "#quote", style: "primary" },
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      // `banner`. Atelier holds `editorial` and Datum holds `split` in this
      // same category.
      layout: "banner",
      ghost: ["Sold faster"],
      eyebrow: "Twin Cities",
      headline: { lead: "An empty room", main: "is a discount." },
      sub: "Staging for listings across Minneapolis and Saint Paul. Published package prices, a two-week turnaround from walkthrough to photography, and no referral fees to anybody.",
      actions: [
        { label: "Request a quote", href: "#quote", style: "primary" },
        { label: "See the packages", href: "#packages", style: "secondary" },
      ],
      chips: ["Two-week turnaround", "Prices published"],
      subject: {
        src: "/templates/home-staging/hero.jpg",
        alt: "A staged living room with a neutral sectional, styled side tables and fresh flowers.",
        width: 1600,
        height: 900,
      },
      facts: [
        { label: "Turnaround", value: "Two weeks, walkthrough to photos" },
        { label: "Occupied homes", value: "Staged around what you own" },
        { label: "Rental term", value: "Sixty days, extendable monthly" },
        { label: "Coverage", value: "Minneapolis, Saint Paul, first ring" },
      ],
    },

    {
      type: "assurance",
      tone: "surface",
      title: "What staging is actually buying you",
      items: [
        {
          title: "A photograph that stops the scroll",
          body: "Almost every buyer sees the listing photos before they see the house. An empty room photographs as a floor plan, and a floor plan does not book a viewing.",
        },
        {
          title: "A room somebody can stand in",
          body: "Furniture gives scale. Without it a buyer cannot tell whether their sofa fits, and a buyer who cannot tell assumes it does not.",
        },
        {
          title: "A price you can defend",
          body: "Staging is the cheapest thing on the list of ways to defend an asking price, and the only one that comes back out of the house afterwards.",
        },
        {
          title: "One decision, not forty",
          body: "You are not choosing cushions. You approve a direction at the walkthrough and we do the rest.",
        },
      ],
    },

    {
      type: "projectIndex",
      id: "work",
      eyebrow: "Recent work",
      title: "Rooms we staged this season",
      intro: "Photographed on handover day, before the listing went live.",
      layout: "asymmetric",
      projects: [
        {
          title: "Kenwood, four bedroom",
          meta: "Full stage · Listed in nine days",
          body: "Vacant, on the market unstaged for eleven weeks before we were called. Whole ground floor plus the primary bedroom.",
          image: {
            src: "/templates/home-staging/staging-1.jpg",
            alt: "A staged dining room with an upholstered set, a chandelier and a patterned rug.",
            width: 1400,
            height: 934,
          },
        },
        {
          title: "Highland Park, three bedroom",
          meta: "Primary bedroom and living",
          body: "Occupied. Staged around the owners' own furniture, which is most of what we do.",
          image: {
            src: "/templates/home-staging/staging-2.jpg",
            alt: "A staged bedroom in neutral tones with layered bedding and matching lamps.",
            width: 1400,
            height: 933,
          },
        },
        {
          title: "Como, bungalow",
          meta: "Kitchen and living · Sold at asking",
          body: "A dated kitchen nobody was going to replace before selling. Styled rather than argued with.",
          image: {
            src: "/templates/home-staging/staging-3.jpg",
            alt: "A staged kitchen with a granite island, styled counters and grey cabinetry.",
            width: 1400,
            height: 933,
          },
        },
      ],
    },

    {
      type: "feature",
      id: "empty",
      media: "right",
      eyebrow: "The starting point",
      title: "This is what an empty room does",
      intro: "Not a before-and-after pair. Just an empty room, which is the condition most of our calls arrive in.",
      body: [
        "A vacant room photographs as an inventory of its own faults. The eye has nothing to land on, so it finds the scuffed skirting, the dated curtain track and the outlet halfway up the wall. Buyers scrolling a listing feed spend well under two seconds on a photograph like this one, and almost none of them can tell you afterwards how big the room was.",
        "The furniture is not the point. Scale is the point. A sofa of a known size tells somebody instantly whether their life fits in the room, and that is a question no floor plan has ever answered persuasively.",
        "We stage occupied homes as often as vacant ones, working around what you already own and removing about as much as we bring.",
      ],
      facts: [
        { label: "Vacant homes", value: "Full furniture package" },
        { label: "Occupied homes", value: "Edit, restyle, supplement" },
        { label: "Typical install", value: "One day, two stagers" },
        { label: "Photography", value: "Booked for the following morning" },
      ],
      image: {
        src: "/templates/home-staging/before.jpg",
        alt: "An empty living room with bare hardwood floors and dated curtains.",
        width: 1400,
        height: 1050,
      },
      action: { label: "Request a quote", href: "#quote", style: "primary" },
    },

    {
      type: "pricing",
      id: "packages",
      tone: "surface",
      eyebrow: "Packages",
      title: "What it costs",
      intro: "Published, because a stager who will not quote until they have seen the house is a stager who is pricing your postcode.",
      nameLabel: "Package",
      priceLabel: "First 60 days",
      rows: [
        {
          name: "Consultation only",
          detail: "Two hours, a written room-by-room list, and you do the work yourself.",
          price: "$325",
        },
        {
          name: "Occupied restyle",
          detail: "We edit and restyle what you own and bring in what is missing. Usually three to four rooms.",
          price: "From $1,400",
        },
        {
          name: "Vacant, main rooms",
          detail: "Living, dining and primary bedroom furnished throughout.",
          price: "From $2,800",
        },
        {
          name: "Vacant, whole house",
          detail: "Every room a buyer walks through, including the awkward one nobody knows what to do with.",
          price: "From $4,600",
        },
        { name: "Extension after 60 days", detail: "Monthly, no new install fee.", price: "20% of package" },
      ],
      note: "Prices include delivery, installation, styling, removal at the end of the term and the consultation. Nothing on this page is a deposit against a later quote. Homes over four thousand square feet and anything outside the first ring suburbs are quoted individually.",
      action: { label: "Request a quote", href: "#quote", style: "primary" },
    },

    {
      type: "steps",
      id: "how",
      eyebrow: "How it works",
      title: "Walkthrough to photographs in two weeks",
      steps: [
        {
          title: "Walkthrough",
          body: "Ninety minutes at the house. We photograph every room, measure what matters, and tell you which rooms are worth staging and which are not. Charged only if you do not go ahead.",
        },
        {
          title: "Proposal and price",
          body: "Within two working days. Room by room, with the package price and what is in it. No allowances, no line saying to be confirmed.",
        },
        {
          title: "Install day",
          body: "One day, two stagers, everything delivered in a single van. You do not need to be there and most people are not.",
        },
        {
          title: "Photography the next morning",
          body: "We hold the styling overnight so your photographer shoots it fresh. If you do not have one, we will give you three names and take no fee from any of them.",
        },
      ],
      aside: {
        title: "When we say no",
        body: "If the house needs a deep clean, a repaint or a repair before it needs furniture, we will say so at the walkthrough and tell you to spend the money there first. Staging a house that is not ready wastes your rental term and makes our work look worse than it is. Roughly one walkthrough in six ends with us recommending nothing at all, and those are not charged for.",
      },
    },

    {
      type: "credits",
      id: "realtors",
      eyebrow: "For realtors",
      title: "The agent programme",
      intro: "Straightforward terms, and the last line is the one that matters.",
      items: [
        { name: "Priority scheduling", detail: "Walkthrough within 48 hours for listing agents on the programme" },
        { name: "Direct billing", detail: "Invoice at closing rather than at install, on request" },
        { name: "Consultation credit", detail: "The consultation fee is waived on your third listing and after" },
        { name: "Shared photography", detail: "Full-resolution install-day photographs, licensed for your marketing" },
        { name: "No referral fees, in either direction", detail: "We do not pay for listings and we do not accept payment for recommending anybody" },
      ],
      note: "That last line is a policy rather than a boast. A stager paying for referrals has to recover the money somewhere, and it is always in the package price your seller pays.",
    },

    {
      type: "reviews",
      tone: "surface",
      eyebrow: "Sellers and agents",
      title: "What people say",
      items: [
        {
          quote:
            "Eleven weeks empty, no offers. Staged on a Tuesday, photographed Wednesday, three showings that weekend and an offer the following Monday.",
          name: "Danielle O.",
          meta: "Seller, Kenwood",
        },
        {
          quote:
            "They told me not to stage the basement and to spend the money on the carpet instead. Cost them about six hundred dollars of work and bought them every listing I have had since.",
          name: "Marcus R.",
          meta: "Listing agent",
        },
        {
          quote:
            "We were still living there with two kids. They worked around us, took away half our furniture for eight weeks, and the house looked like a magazine.",
          name: "The Halvorsens",
          meta: "Sellers, Highland Park",
        },
      ],
      sourceNote:
        "These reviews are demo content written for this template. On a live site this line names the platform the reviews were collected on and links to the profile they came from.",
    },

    {
      type: "faq",
      eyebrow: "Questions",
      title: "Before the walkthrough",
      items: [
        {
          q: "Does staging actually work?",
          a: "We are not going to quote you an industry statistic, because the ones that circulate are produced by the industry that benefits from them. What we will do at the walkthrough is show you the last four comparable listings in your neighbourhood and how long each took.",
        },
        {
          q: "Can you stage while we are living there?",
          a: "Yes, and it is more than half of what we do. We work around what you own, put some of it into storage for the term, and bring in what is missing.",
        },
        {
          q: "What if it does not sell in sixty days?",
          a: "The term extends monthly at twenty per cent of the package price, with no new install fee. Most extensions run one month.",
        },
        {
          q: "Do you charge for the walkthrough?",
          a: "Only if you decide not to go ahead. It is credited in full against any package.",
        },
        {
          q: "Who owns the furniture?",
          a: "We do. It is rented for the term and removed at the end. Nothing in a staged house is for sale, including the thing your buyer will ask about.",
        },
      ],
    },

    {
      type: "booking",
      id: "quote",
      tone: "ink",
      ghost: ["Two weeks"],
      eyebrow: "Quote",
      title: "Book a walkthrough",
      intro: "Tell us about the house. We reply within one working day with a time and, if we already know the neighbourhood, a rough range.",
      fields: [
        { name: "name", label: "Your name", type: "text", required: true, half: true },
        { name: "phone", label: "Phone", type: "tel", required: true, half: true },
        { name: "email", label: "Email", type: "email", required: true, half: true },
        {
          name: "role",
          label: "You are",
          type: "select",
          required: true,
          half: true,
          placeholder: "Please choose",
          options: ["The seller", "The listing agent", "Both"],
        },
        {
          name: "address",
          label: "Neighbourhood",
          type: "text",
          required: true,
          half: true,
          placeholder: "Kenwood, Highland Park, and so on",
        },
        {
          name: "status",
          label: "Is the house occupied",
          type: "select",
          half: true,
          placeholder: "Please choose",
          options: ["Vacant", "Occupied", "Vacant in a few weeks"],
        },
        {
          name: "notes",
          label: "Anything we should know",
          type: "textarea",
          placeholder: "Size, how long it has been listed, when photography is booked, and which rooms are worrying you.",
        },
      ],
      submitLabel: "Request a walkthrough",
      note: "The walkthrough is charged only if you decide not to go ahead, and credited in full if you do. Your details are used to arrange it and nothing else.",
      aside: {
        title: "Call instead if",
        items: [
          "Photography is booked for this week",
          "The house is already listed and not moving",
          "You are an agent wanting to talk about the programme",
        ],
        phone: PHONE,
      },
    },

    {
      type: "footer",
      columns: [
        {
          title: "Staging",
          links: [
            { label: "Recent work", href: "#work" },
            { label: "Packages and prices", href: "#packages" },
            { label: "How it works", href: "#how" },
            { label: "For realtors", href: "#realtors" },
          ],
        },
        {
          title: "Getting started",
          links: [{ label: "Request a quote", href: "#quote" }],
        },
      ],
      note: "Furniture is rented for the term and removed at the end. Nothing in a staged house is included in the sale.",
      legal: [
        "Northfield & May is a fictional company created to demonstrate this template.",
        "On a live site this line carries the business registration and the insurance covering furniture in a client's home.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = { practice: "Northfield & May", templateName: "Threshold" };

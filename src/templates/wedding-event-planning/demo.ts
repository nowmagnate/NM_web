import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * BLOOM, as a working planner.
 *
 * MARCHMONT & FEN DOES NOT EXIST. Fictional, and labelled as such in a bar
 * above the design that cannot be dismissed.
 *
 * THE VENDOR NETWORK NAMES NOBODY REAL. A planner's supplier list is genuine
 * third-party validation and is exactly the band a demo is most tempted to
 * fill with recognisable names. Every florist, band and caterer below is
 * invented, and the note says so. Naming real suppliers on a fictional planner
 * would be the same problem as a real company's logo in the photography, with
 * the added unpleasantness of implying a commercial relationship that does not
 * exist.
 */

const PHONE = "020 7946 0316";

export const config = defineTemplate({
  brand: {
    name: "Marchmont & Fen",
    mark: "Marchmont",
    tagline: "Wedding and event planning across London and the south coast.",
    contact: {
      phone: PHONE,
      email: "hello@marchmontfen.example",
      address: ["Studio 3, Rye Wharf", "London SE16 4TU"],
      hours: "Monday to Friday, and most Saturdays",
    },
    social: [{ label: "Instagram", href: "https://instagram.com" }],
  },

  theme,

  seo: {
    title: "Marchmont & Fen",
    description:
      "Wedding and event planning across London and the south coast. Three service tiers with published fees, twelve weddings a year, and availability answered in two days.",
  },

  settings: {
    stickyAction: { label: "Check availability", href: "#availability", style: "primary" },
  },

  sections: [
    {
      type: "nav",
      links: [
        { label: "Recent events", href: "#events" },
        { label: "Service tiers", href: "#tiers" },
        { label: "How it works", href: "#process" },
        { label: "Suppliers", href: "#suppliers" },
      ],
      action: { label: "Check a date", href: "#availability", style: "primary" },
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      layout: "centred",
      ghost: ["Twelve a year"],
      eyebrow: "London and the south coast",
      headline: { lead: "Someone whose", main: "whole job is the day." },
      sub: "Twelve weddings a year, which is as many as two planners can be properly present for. Fees are published, suppliers are chosen for you rather than sold to you, and we take no commission from any of them.",
      actions: [
        { label: "Check availability", href: "#availability", style: "primary" },
        { label: "See the tiers", href: "#tiers", style: "secondary" },
      ],
      chips: ["No supplier commission", "Twelve weddings a year"],
      subject: {
        src: "/templates/wedding-event-planning/hero.jpg",
        alt: "An outdoor wedding reception laid under a canopy, with white florals and green glassware.",
        width: 1400,
        height: 2100,
      },
      facts: [
        { label: "Capacity", value: "Twelve weddings a year" },
        { label: "Availability", value: "Answered within two days" },
        { label: "Commission", value: "None taken, from anybody" },
        { label: "Where", value: "London, Sussex, Kent, Hampshire" },
      ],
    },

    {
      type: "assurance",
      tone: "surface",
      title: "What a planner is actually for",
      items: [
        {
          title: "Somebody is not a guest",
          body: "On the day, every person you love is a guest. A planner is the one person in the room whose entire job is the day itself.",
        },
        {
          title: "Suppliers who owe us nothing",
          body: "We take no commission and no referral fee, from anybody, ever. That is why the florist we suggest is the right florist rather than the one that pays.",
        },
        {
          title: "A budget that survives contact",
          body: "Built in the first month, in a spreadsheet you own, with the things that always get forgotten already in it.",
        },
        {
          title: "Twelve, not forty",
          body: "The cap is the product. A planner running forty weddings is a planner sending an assistant to yours.",
        },
      ],
    },

    {
      type: "projectIndex",
      id: "events",
      eyebrow: "Recent events",
      title: "A few from this year",
      layout: "asymmetric",
      projects: [
        {
          title: "A loft in Bermondsey",
          meta: "110 guests · September",
          body: "A long single table for everybody, which sounds simple and is the hardest layout there is. Six months of negotiation with a venue that had never done it.",
          image: {
            src: "/templates/wedding-event-planning/event-1.jpg",
            alt: "A long banqueting table dressed with candles and greenery in a brick loft.",
            width: 1400,
            height: 933,
          },
        },
        {
          title: "A garden in West Sussex",
          meta: "80 guests · July",
          body: "At home, in a marquee, with a kitchen built in a barn. Everything you see arrived on a lorry and left on one.",
          image: {
            src: "/templates/wedding-event-planning/event-2.jpg",
            alt: "Round tables laid with navy linen and white florals in a glazed reception room.",
            width: 1400,
            height: 935,
          },
        },
        {
          title: "A barn in Kent",
          meta: "60 guests · May",
          body: "Dried flowers, mismatched glass and a two-hour lunch that ran to five. Our favourite kind of brief.",
          image: {
            src: "/templates/wedding-event-planning/event-3.jpg",
            alt: "A long table in a timber barn dressed with dried florals and mixed glassware.",
            width: 1400,
            height: 933,
          },
        },
      ],
    },

    {
      type: "pricing",
      id: "tiers",
      tone: "surface",
      eyebrow: "Service tiers",
      title: "Three ways to work with us",
      intro: "Published fees. A planner who quotes as a percentage of your budget is a planner with an incentive to grow it.",
      nameLabel: "Tier",
      priceLabel: "Fee",
      rows: [
        {
          name: "On the day",
          detail: "We take over six weeks out, run the rehearsal and run the day. For couples who have planned it themselves.",
          price: "£2,400",
        },
        {
          name: "Partial planning",
          detail: "From nine months out. Venue and supplier selection, budget, timeline, and the day itself.",
          price: "£5,800",
        },
        {
          name: "Full planning",
          detail: "From the engagement. Everything, including the parts nobody warns you about.",
          price: "£11,500",
        },
        {
          name: "Non-wedding events",
          detail: "Launches, anniversaries and corporate dinners, quoted per event.",
          price: "From £3,200",
        },
      ],
      note: "Fees are fixed at the point of booking and do not move with your budget. We take no commission from any supplier, which usually means the total spend comes in lower than it would have with a planner who does.",
      action: { label: "Check availability", href: "#availability", style: "primary" },
    },

    {
      type: "steps",
      id: "process",
      eyebrow: "How it works",
      title: "From the first call to the last dance",
      steps: [
        {
          title: "A conversation, free",
          body: "An hour, in person or on a call. What you want the day to feel like, roughly what you can spend, and whether we are the right people. Nothing is signed.",
        },
        {
          title: "Budget and shape, month one",
          body: "A real budget in a spreadsheet you own, and a shape for the day. The unglamorous month, and the one that decides whether the rest works.",
        },
        {
          title: "Suppliers, months two to six",
          body: "We shortlist three of everything, tell you which we would choose and why, and you decide. Every contract is in your name, not ours.",
        },
        {
          title: "The last six weeks, and the day",
          body: "Final numbers, a timeline every supplier has, a rehearsal, and then a day where nobody asks you a single logistical question.",
        },
      ],
      aside: {
        title: "The thing nobody tells you",
        body: "About seventy per cent of what we do happens in the last six weeks, and almost none of it is visible. Final headcounts, dietary requirements, seating that changes four times, a supplier who goes quiet, the weather. Couples who plan it themselves usually enjoy the process right up until that point, which is exactly why the on-the-day tier exists and why it is the one we recommend most often.",
      },
    },

    {
      type: "credits",
      id: "suppliers",
      eyebrow: "Suppliers",
      title: "People we work with",
      intro: "A short list, used often, and none of them pay us anything.",
      items: [
        { name: "Wildhouse Flowers", detail: "Florals, London and Sussex" },
        { name: "The Ninth Table", detail: "Catering, up to 200 covers" },
        { name: "Ardith Stationery", detail: "Invitations and on-the-day print" },
        { name: "Copperline", detail: "Six-piece band and DJ" },
        { name: "Marram Hire", detail: "Furniture, glass and marquees" },
        { name: "Two Rivers Cars", detail: "Transport and guest logistics" },
      ],
      note: "Every supplier named here is invented for this demo. A planner's supplier list is real third-party validation and is exactly the band a demo is most tempted to fill with recognisable names, which would imply commercial relationships that do not exist. On a live site this band names people the planner actually works with, and the line about commission is the one worth keeping.",
    },

    {
      type: "reviews",
      tone: "surface",
      eyebrow: "Couples",
      title: "What people say afterwards",
      items: [
        {
          quote:
            "We planned it ourselves and hired them for the last six weeks. I did not understand what that was worth until the marquee company changed the delivery slot and I found out about it three days later, as a solved problem.",
          name: "Anwen and Joss",
          meta: "On the day, Kent",
        },
        {
          quote:
            "They talked us out of two suppliers we had already half committed to and both would have been a mistake. Nobody with commission on the line does that.",
          name: "Fela and Marcus",
          meta: "Full planning, London",
        },
        {
          quote:
            "The budget spreadsheet had things in it I would never have thought of. Corkage. Overnight supplier accommodation. A contingency we actually used.",
          name: "Sofia and Ted",
          meta: "Partial planning, West Sussex",
        },
      ],
      sourceNote:
        "These are demo testimonials written for this template. On a live site this line names the platform the reviews were collected on and links to the profile they came from.",
    },

    {
      type: "faq",
      eyebrow: "Questions",
      title: "Before you write",
      items: [
        {
          q: "Are you free on our date?",
          a: "Send it below and you will know within two working days. We take twelve weddings a year and Saturdays in June and September go about eighteen months out.",
        },
        {
          q: "Do you take commission from suppliers?",
          a: "No, from anybody, ever. It is the single most important line on this page and the one we would want you to ask every planner you speak to.",
        },
        {
          q: "Can you work with a venue's in-house coordinator?",
          a: "Yes, and it is a different job from ours. They run the building. We run your day, and the two of us being in the room together is usually a very good sign.",
        },
        {
          q: "What if we only need help at the end?",
          a: "That is the on-the-day tier, and it is the one we recommend most often. We take over six weeks out.",
        },
        {
          q: "Do you do non-wedding events?",
          a: "Yes, a handful a year. Launches, significant birthdays and corporate dinners, quoted per event.",
        },
      ],
    },

    {
      type: "booking",
      id: "availability",
      tone: "ink",
      ghost: ["The day"],
      eyebrow: "Availability",
      title: "Check your date",
      intro: "Two working days for an answer, including the dates we cannot do. Nothing is committed by asking.",
      fields: [
        { name: "names", label: "Your names", type: "text", required: true, half: true },
        { name: "email", label: "Email", type: "email", required: true, half: true },
        { name: "date", label: "The date", type: "date", required: true, half: true },
        {
          name: "tier",
          label: "Which tier",
          type: "select",
          half: true,
          placeholder: "Not sure yet",
          options: [
            "Not sure yet",
            "On the day",
            "Partial planning",
            "Full planning",
            "A non-wedding event",
          ],
        },
        {
          name: "where",
          label: "Where",
          type: "text",
          half: true,
          placeholder: "A venue, a postcode, or at home",
        },
        {
          name: "guests",
          label: "Roughly how many guests",
          type: "text",
          half: true,
          placeholder: "An estimate is fine",
        },
        {
          name: "notes",
          label: "Tell us about the day",
          type: "textarea",
          placeholder: "What you want it to feel like, what you have already booked, and anything you are dreading.",
        },
      ],
      submitLabel: "Check availability",
      note: "We answer every enquiry within two working days. Your details are used to answer it and are never added to a mailing list.",
      aside: {
        title: "Worth knowing",
        items: [
          "Saturdays in June and September book about eighteen months out",
          "The first conversation is an hour, in person or on a call, and free",
          "Fees are fixed at booking and do not move with your budget",
        ],
        phone: PHONE,
      },
    },

    {
      type: "footer",
      columns: [
        {
          title: "Planning",
          links: [
            { label: "Recent events", href: "#events" },
            { label: "Service tiers", href: "#tiers" },
            { label: "How it works", href: "#process" },
            { label: "Suppliers", href: "#suppliers" },
          ],
        },
        { title: "Getting started", links: [{ label: "Check availability", href: "#availability" }] },
      ],
      note: "Every supplier contract is in your name rather than ours. If you ever stop working with us, you keep your suppliers, your budget and your timeline.",
      legal: [
        "Marchmont & Fen is a fictional company created to demonstrate this template.",
        "On a live site this line carries the company registration and the public liability cover.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = { practice: "Marchmont & Fen", templateName: "Bloom" };

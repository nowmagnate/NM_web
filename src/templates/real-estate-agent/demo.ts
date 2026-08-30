import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * MERIDIAN, as a working agent.
 *
 * DELIA OKAFOR REAL ESTATE DOES NOT EXIST. Fictional, and labelled as such in
 * a bar above the design that cannot be dismissed.
 *
 * THE SEARCH IS REAL, and that is the point of this template. The obvious
 * build for "hero with search" on a statically exported page is a search box
 * that goes nowhere, and it is a lie told in the first viewport of a page
 * whose entire job is finding a property. A buyer demoing this template would
 * discover it in about four seconds.
 *
 * So the filtering happens in the browser over the listings already in the
 * page: no server, no index, no API. It works on a static export, it works
 * offline, and it is genuinely useful at the size of list a single agent
 * publishes. The hero points at it rather than pretending to be it.
 *
 * NO SALES STATISTICS ANYWHERE. Days-on-market, list-to-sale ratios and
 * volume figures are the standard furniture of an agent's site and they are
 * unverifiable by the reader, jurisdiction-dependent, and in several markets
 * regulated. The template argues from what the agent will DO instead, which is
 * checkable at the first meeting.
 */

const PHONE = "(919) 555 0142";

export const config = defineTemplate({
  brand: {
    name: "Delia Okafor Real Estate",
    mark: "Okafor",
    tagline: "A single agent covering inner-ring Raleigh and Durham.",
    contact: {
      phone: PHONE,
      email: "delia@okaforrealestate.example",
      address: ["612 Glenwood Avenue, Suite 4", "Raleigh, NC 27603"],
      hours: "Seven days, by appointment",
    },
    social: [{ label: "Instagram", href: "https://instagram.com" }],
  },

  theme,

  seo: {
    title: "Delia Okafor Real Estate",
    description:
      "A single agent covering inner-ring Raleigh and Durham. Current listings, neighbourhood guides, and a valuation that comes with the comparables attached.",
  },

  settings: {
    stickyAction: { label: "Request a valuation", href: "#valuation", style: "primary" },
  },

  sections: [
    {
      type: "nav",
      links: [
        { label: "Listings", href: "#listings" },
        { label: "About Delia", href: "#agent" },
        { label: "Neighbourhoods", href: "#neighbourhoods" },
        { label: "Valuation", href: "#valuation" },
      ],
      action: { label: "Valuation", href: "#valuation", style: "primary" },
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      // `offset`. Property & Design is now full: Atelier editorial, Datum
      // split, Threshold banner, Ledger centred.
      layout: "offset",
      ghost: ["Inner ring"],
      eyebrow: "Raleigh and Durham",
      headline: { lead: "One agent,", main: "one market." },
      sub: "I work inner-ring Raleigh and Durham and nowhere else, which is why I can tell you what a street sold for last spring without looking it up. Current listings below, searchable.",
      actions: [
        { label: "See current listings", href: "#listings", style: "primary" },
        { label: "Request a valuation", href: "#valuation", style: "secondary" },
      ],
      chips: ["Single agent, not a team", "Valuations with comparables attached"],
      subject: {
        src: "/templates/real-estate-agent/hero.jpg",
        alt: "A two-storey suburban house with a double garage under a clear sky.",
        width: 1600,
        height: 1067,
      },
      facts: [
        { label: "Coverage", value: "Inner-ring Raleigh and Durham" },
        { label: "Who you get", value: "Me, at every showing" },
        { label: "Valuation", value: "Free, with the comparables" },
        { label: "Listings", value: "Searchable below" },
      ],
    },

    {
      type: "listings",
      id: "listings",
      eyebrow: "Current listings",
      title: "What I have on now",
      intro: "Search by street, area or size. The filter works on this page without loading anything.",
      filters: true,
      items: [
        {
          title: "Five bed on Ashcroft Lane",
          address: "Ashcroft Lane, North Raleigh",
          price: "$618,000",
          status: "For sale",
          meta: ["5 bed", "3 bath", "2,940 sq ft", "Built 2016"],
          image: {
            src: "/templates/real-estate-agent/listing-1.jpg",
            alt: "A two-storey house with beige siding, a double garage and a mature front tree.",
            width: 1200,
            height: 800,
          },
        },
        {
          title: "Brick colonial on Wendover",
          address: "Wendover Drive, Durham",
          price: "$742,500",
          status: "For sale",
          meta: ["4 bed", "3.5 bath", "3,310 sq ft", "Half acre"],
          image: {
            src: "/templates/real-estate-agent/listing-2.jpg",
            alt: "A red brick colonial house set back behind a wide lawn.",
            width: 1200,
            height: 800,
          },
        },
        {
          title: "New build on Fenner Court",
          address: "Fenner Court, Cary",
          price: "$489,000",
          status: "Under contract",
          meta: ["4 bed", "2.5 bath", "2,180 sq ft", "Built 2023"],
          image: {
            src: "/templates/real-estate-agent/listing-3.jpg",
            alt: "A newly built house with a two-car garage on a young street.",
            width: 1200,
            height: 800,
          },
        },
      ],
      note: "Three listings is a small number and that is deliberate rather than a slow month. I take on what I can personally show, and I would rather turn a listing down than hand it to somebody you have not met.",
      action: { label: "Request a valuation", href: "#valuation", style: "primary" },
    },

    {
      type: "feature",
      id: "agent",
      tone: "surface",
      media: "right",
      eyebrow: "About Delia",
      title: "You get me, at every showing",
      intro: "Not a team, not an assistant, and not a lockbox and a text message.",
      body: [
        "Most agents at this level are running a team, which means the person who wins the listing is not the person who shows the house. I do not, and the trade is straightforward: I take fewer listings and you get the person you actually hired standing in the kitchen answering questions.",
        "I work inner-ring Raleigh and Durham and I decline everything outside it. An agent who covers the whole Triangle is an agent who is looking up your street on the drive over.",
        "On the buying side I will talk you out of houses. That is most of the value and it is the part nobody advertises.",
      ],
      facts: [
        { label: "Licensed since", value: "2013" },
        { label: "Coverage", value: "Inner-ring only, by choice" },
        { label: "Listings at a time", value: "Three to five" },
        { label: "Who shows the house", value: "Me" },
      ],
      image: {
        src: "/templates/real-estate-agent/agent.jpg",
        alt: "Two people going through paperwork across a table at a signing meeting.",
        width: 1400,
        height: 933,
      },
    },

    {
      type: "checklist",
      id: "neighbourhoods",
      eyebrow: "Neighbourhoods",
      title: "Where I work, and what each one is actually like",
      intro: "Written the way I would say it on the phone rather than the way a listing description says it.",
      columns: [
        {
          name: "Raleigh, inner ring",
          items: [
            "Five Points, walkable and priced accordingly",
            "Mordecai, quieter, mostly 1920s stock",
            "Oakwood, historic district rules, worth reading first",
            "Hayes Barton, large lots and large prices",
            "Boylan Heights, small, tight, rarely comes up",
          ],
        },
        {
          name: "Durham",
          items: [
            "Trinity Park, close to campus, mixed rentals",
            "Old West Durham, still moving quickly",
            "Watts-Hillandale, family-heavy, good stock",
            "Forest Hills, big lots, longer commute",
          ],
        },
        {
          name: "What I will tell you",
          items: [
            "Which streets flood, and which ones only look like they might",
            "Where the school assignment is about to be redrawn",
            "Which HOAs are worth reading the covenants on",
            "What the same house sold for in 2021, and why that matters",
          ],
        },
      ],
      note: "The third column is the reason to use a single-market agent at all. None of it is on a listing site, and all of it changes what a house is worth to you specifically.",
    },

    {
      type: "reviews",
      tone: "surface",
      eyebrow: "Clients",
      title: "What people say afterwards",
      items: [
        {
          quote:
            "She told us not to bid on the first house we loved, and explained why in about four sentences. The one we bought two months later was better and thirty thousand cheaper.",
          name: "The Ramirez family",
          meta: "Bought in Mordecai",
        },
        {
          quote:
            "Every showing was Delia. Not once did somebody I had never met open the door of my house to a stranger.",
          name: "Grant O.",
          meta: "Sold in Five Points",
        },
        {
          quote:
            "The valuation came with the actual comparables attached and an explanation of which ones she thought were misleading. Two other agents just gave me a number.",
          name: "Priya M.",
          meta: "Sold in Watts-Hillandale",
        },
      ],
      sourceNote:
        "These reviews are demo content written for this template. On a live site this line names the platform the reviews were collected on and links to the profile they came from.",
    },

    {
      type: "faq",
      eyebrow: "Questions",
      title: "Before you get in touch",
      items: [
        {
          q: "What do you charge?",
          a: "Commission is negotiable and always has been, whatever anybody tells you. I will give you my number at the valuation, in writing, along with exactly what it covers.",
        },
        {
          q: "Is the valuation really free?",
          a: "Yes, and it comes with the comparable sales attached and a note on which of them I think are misleading. You can take that to another agent and I would rather you did than felt trapped.",
        },
        {
          q: "Will I always deal with you?",
          a: "Yes. That is the entire proposition and it is why the listing count is small.",
        },
        {
          q: "Do you work outside these areas?",
          a: "No. I will refer you to somebody who works your area properly rather than learn it on your transaction.",
        },
        {
          q: "How long will it take to sell?",
          a: "I am not going to give you a number on a web page, because it depends on the house, the price and the month. At the valuation I will show you what comparable houses actually took.",
        },
      ],
    },

    {
      type: "booking",
      id: "valuation",
      tone: "ink",
      ghost: ["Comparables"],
      eyebrow: "Valuation",
      title: "Find out what it is worth",
      intro: "Free, in person, and you leave with the comparable sales attached rather than just a number.",
      fields: [
        { name: "name", label: "Your name", type: "text", required: true, half: true },
        { name: "phone", label: "Phone", type: "tel", required: true, half: true },
        { name: "email", label: "Email", type: "email", required: true, half: true },
        {
          name: "address",
          label: "Property address",
          type: "text",
          required: true,
          half: true,
          placeholder: "Street and neighbourhood",
        },
        {
          name: "intent",
          label: "What are you thinking",
          type: "select",
          required: true,
          half: true,
          placeholder: "Please choose",
          options: [
            "Selling within six months",
            "Selling, but not yet",
            "Buying",
            "Both, and they have to line up",
            "Just want to know the number",
          ],
        },
        {
          name: "timing",
          label: "Any timing pressure",
          type: "text",
          half: true,
          placeholder: "A job move, a school year, or none",
        },
        {
          name: "notes",
          label: "Anything I should know",
          type: "textarea",
          placeholder: "What you have done to the house, what you think it is worth, and what another agent has already told you.",
        },
      ],
      submitLabel: "Request a valuation",
      note: "I reply the same day, seven days a week. Your details are used to arrange the valuation and nothing else, and you will not be put on a mailing list or passed to a lender.",
      aside: {
        title: "Call instead if",
        items: [
          "You want to see something on the list this week",
          "You are already under contract and something has gone wrong",
          "You just want to ask what a street is like",
        ],
        phone: PHONE,
      },
    },

    {
      type: "footer",
      columns: [
        {
          title: "Buying and selling",
          links: [
            { label: "Current listings", href: "#listings" },
            { label: "About Delia", href: "#agent" },
            { label: "Neighbourhoods", href: "#neighbourhoods" },
            { label: "Valuation", href: "#valuation" },
          ],
        },
        { title: "Contact", links: [{ label: "Request a valuation", href: "#valuation" }] },
      ],
      note: "This page carries no days-on-market or list-to-sale statistics. They are unverifiable by you, they vary by market and month, and in several states they are regulated. Ask me for mine at the valuation and I will show you where the numbers came from.",
      legal: [
        "Delia Okafor Real Estate is a fictional practice created to demonstrate this template.",
        "On a live site this line carries the real estate licence number, the brokerage, and the fair housing statement required in the market.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = {
  practice: "Delia Okafor Real Estate",
  templateName: "Meridian",
};

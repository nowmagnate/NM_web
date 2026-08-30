import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * CRISP, as a working operator.
 *
 * TIDEMARK HOME CLEANING DOES NOT EXIST. Fictional, and labelled as such in a
 * bar above the design that cannot be dismissed.
 *
 * THE STRUCTURE IS THE ARGUMENT. Every other template in the booking-led group
 * earns the enquiry gradually. This one puts the price in the second band,
 * because the visitor is comparing three cleaners on a phone and the one who
 * makes them ask for a quote loses. Section order in a config is a commercial
 * decision, not a layout one, and this is the clearest example of it in the
 * catalog.
 */

const PHONE = "(206) 555 0164";

export const config = defineTemplate({
  brand: {
    name: "Tidemark Home Cleaning",
    mark: "Tidemark",
    tagline: "Insured, vetted home cleaners across north Seattle.",
    contact: {
      phone: PHONE,
      email: "book@tidemarkclean.example",
      address: ["1809 Ballard Avenue NW", "Seattle, WA 98107"],
      hours: "Monday to Saturday, 7am to 6pm",
    },
    social: [],
  },

  theme,

  seo: {
    title: "Tidemark Home Cleaning",
    description:
      "Insured, vetted home cleaners in north Seattle. Prices published by home size, the same cleaner every visit, and booking in under two minutes.",
  },

  settings: {
    stickyAction: { label: "Book a clean", href: "#book", style: "primary" },
  },

  sections: [
    {
      type: "nav",
      links: [
        { label: "Prices", href: "#prices" },
        { label: "Services", href: "#services" },
        { label: "What is included", href: "#included" },
        { label: "Areas", href: "#areas" },
        { label: "Contact", href: "#visit" },
      ],
      action: { label: "Book", href: "#book", style: "primary" },
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      layout: "split",
      ghost: ["Properly clean"],
      eyebrow: "Booking this week",
      headline: { lead: "The price is", main: "on the page." },
      sub: "Insured, background-checked cleaners across north Seattle. You get the same person every visit, a published rate for your home size, and a booking that takes under two minutes.",
      actions: [
        { label: "Book a clean", href: "#book", style: "primary" },
        { label: "See the prices", href: "#prices", style: "secondary" },
      ],
      chips: ["No quote needed", "Same cleaner every visit"],
      subject: {
        src: "/templates/cleaning-services/hero.jpg",
        alt: "A cleaner in red overalls washing a floor-to-ceiling window in a bright kitchen.",
        width: 1200,
        height: 1800,
      },
      facts: [
        { label: "One bed flat", value: "From $95 a visit" },
        { label: "Three bed house", value: "From $155 a visit" },
        { label: "Availability", value: "Usually within 4 days" },
        { label: "Cancellation", value: "Free up to 24 hours before" },
      ],
    },

    {
      type: "pricing",
      id: "prices",
      tone: "surface",
      eyebrow: "Prices",
      title: "By home size, not by quote",
      intro: "The rate for a standard visit, published. There is no estimator to fill in and nobody will call you to talk about it before you can see a number.",
      nameLabel: "Home size",
      priceLabel: "Per visit",
      rows: [
        {
          name: "Studio or one bedroom",
          detail: "One bathroom. Around two hours.",
          price: "$95",
        },
        {
          name: "Two bedroom",
          detail: "One or two bathrooms. Around two and a half hours.",
          price: "$125",
        },
        {
          name: "Three bedroom",
          detail: "Two bathrooms. Around three and a half hours.",
          price: "$155",
        },
        {
          name: "Four bedroom or larger",
          detail: "Priced on the first visit after we have seen it, and fixed from then on.",
          price: "From $195",
        },
        {
          name: "Deep clean, first visit",
          detail: "Added once, for a home that has not been cleaned professionally before.",
          price: "Plus $80",
        },
      ],
      note: "Fortnightly visits are the same rate. Weekly visits are ten dollars less per visit. Nothing is charged until after the clean, and there is no contract to cancel.",
      action: { label: "Book a clean", href: "#book", style: "primary" },
    },

    {
      type: "assurance",
      title: "The part people actually worry about",
      items: [
        {
          title: "The same cleaner, every time",
          body: "You meet them once and then they know your home. If they are ill we tell you before the day rather than sending a stranger.",
        },
        {
          title: "Background checked and insured",
          body: "Every cleaner is employed, not subcontracted, and we carry two million dollars of liability cover.",
        },
        {
          title: "Keys handled properly",
          body: "Held in a numbered safe with no address on the tag. Or use a lockbox and we will never hold one at all.",
        },
        {
          title: "If it is not right, we come back",
          body: "Tell us within 48 hours and we redo the room at no charge. Not a refund process, just somebody returning.",
        },
      ],
    },

    {
      type: "serviceMenu",
      id: "services",
      eyebrow: "Services",
      title: "What we do",
      intro: "Four things, done properly, rather than a list of twenty that all turn out to be extras.",
      layout: "cards",
      groups: [
        {
          items: [
            {
              name: "Regular home clean",
              body: "Weekly or fortnightly. The full checklist below, every visit, by the same cleaner.",
              price: "From $95",
            },
            {
              name: "One-off deep clean",
              body: "Inside the oven, inside the fridge, skirting boards, window tracks, behind what moves.",
              price: "From $240",
            },
            {
              name: "End of tenancy",
              body: "Done to the standard a letting agent inspects against, with a written checklist you can hand over.",
              price: "From $290",
            },
            {
              name: "Small office and studio",
              body: "Evenings and early mornings, for spaces under two thousand square feet.",
              price: "From $110",
            },
          ],
        },
      ],
      note: "Laundry, ironing, inside cupboards and balcony sweeping can be added to any visit. Ask when you book rather than on the day, so we can allow the time.",
    },

    {
      type: "checklist",
      id: "included",
      tone: "wash",
      eyebrow: "What is included",
      title: "Every room, every visit",
      intro: "The standard checklist. Not a sample of it, and not a version that gets shorter when the cleaner is running late.",
      columns: [
        {
          name: "Kitchen",
          items: [
            "All surfaces cleared, wiped and put back",
            "Outside of every appliance, including the extractor",
            "Sink descaled and taps polished",
            "Hob degreased, splashback cleaned",
            "Bin emptied and the bin itself washed",
            "Floor vacuumed and mopped",
          ],
        },
        {
          name: "Bathrooms",
          items: [
            "Shower, bath and screen descaled",
            "Toilet cleaned inside, outside and behind",
            "Basin, taps and mirror polished",
            "Tiles and grout wiped",
            "Towels folded or replaced with yours",
            "Floor vacuumed and mopped",
          ],
        },
        {
          name: "Everywhere else",
          items: [
            "All floors vacuumed, hard floors mopped",
            "Every surface dusted, including skirting boards",
            "Mirrors and interior glass polished",
            "Beds made, or changed if you leave linen out",
            "Light switches and door handles sanitised",
            "Cobwebs removed from corners and ceilings",
          ],
        },
      ],
      note: "Inside the oven, inside the fridge, inside cupboards and window exteriors are not part of a standard visit. They are on the deep clean list, or can be added to any visit for a fixed price.",
    },

    {
      type: "checklist",
      id: "areas",
      eyebrow: "Service areas",
      title: "Where we cover",
      intro: "North Seattle only. We would rather cover a small area properly than spend the day in traffic and arrive late.",
      columns: [
        {
          name: "Core area, no travel charge",
          items: ["Ballard", "Fremont", "Phinney Ridge", "Greenwood", "Wallingford"],
        },
        {
          name: "Covered, no travel charge",
          items: ["Green Lake", "Crown Hill", "Loyal Heights", "Sunset Hill", "Magnolia"],
        },
        {
          name: "By arrangement",
          items: [
            "Queen Anne, weekdays only",
            "Northgate, Tuesday and Thursday",
            "Shoreline, minimum three bedroom",
          ],
        },
      ],
      note: "If your neighbourhood is not listed, ask anyway. We will tell you honestly whether we can get there rather than take the booking and be late.",
      action: { label: "Check your address", href: "#book", style: "secondary" },
    },

    {
      type: "reviews",
      tone: "surface",
      eyebrow: "Customers",
      title: "What people say",
      items: [
        {
          quote:
            "Same cleaner for two years. She knows which cupboard the vase goes in. I did not know that was something I wanted until I had it.",
          name: "Alina K.",
          meta: "Fortnightly, Ballard",
        },
        {
          quote:
            "The price on the website was the price. No home visit, no estimator, no follow-up call trying to upsell me a deep clean.",
          name: "Jonah P.",
          meta: "Weekly, Fremont",
        },
        {
          quote:
            "End of tenancy done on a Friday, deposit back in full on the Monday. The agent said it was the cleanest handover she had seen that month.",
          name: "Sadie R.",
          meta: "End of tenancy, Wallingford",
        },
      ],
      sourceNote:
        "These reviews are demo content written for this template. On a live site this line names the platform the reviews were collected on and links to the profile they came from.",
    },

    {
      type: "faq",
      eyebrow: "Questions",
      title: "Before you book",
      items: [
        {
          q: "Do I need to be home?",
          a: "No, and most people are not. Leave a key in the lockbox or hand one over at the first visit. We will text when the cleaner arrives and again when they leave.",
        },
        {
          q: "Do you bring your own products?",
          a: "Yes, everything including the vacuum. If you would rather we used your products because of an allergy or a surface, leave them out and say so in the notes.",
        },
        {
          q: "What about pets?",
          a: "Fine, and tell us in advance. Say if they need to stay shut in a particular room and the cleaner will work around it.",
        },
        {
          q: "Can I skip a week?",
          a: "Yes, up to 24 hours before with no charge. There is no contract and no minimum number of visits.",
        },
        {
          q: "What if something gets broken?",
          a: "It is covered by our liability insurance and we will tell you it happened rather than hoping you do not notice. That has always been the policy and it is why we employ our cleaners rather than subcontract.",
        },
        {
          q: "Is the first clean different?",
          a: "Usually, yes. A home that has not been cleaned professionally before takes longer the first time, so there is an $80 deep clean charge added once. We will tell you before we book, not after we finish.",
        },
      ],
    },

    {
      type: "location",
      id: "visit",
      eyebrow: "Contact",
      title: "How to reach us",
      address: ["Tidemark Home Cleaning", "1809 Ballard Avenue NW", "Seattle, WA 98107"],
      hours: [
        { days: "Monday to Friday", time: "7am to 6pm" },
        { days: "Saturday", time: "8am to 4pm" },
        { days: "Sunday", time: "Closed" },
        { days: "Office phone", time: "7am to 7pm, Mon to Sat" },
      ],
      phone: PHONE,
      email: "book@tidemarkclean.example",
      mapsQuery: "1809 Ballard Avenue NW, Seattle, WA 98107",
      travel: [
        "The office is not a shop. Please book by phone or through this page rather than calling in.",
        "Cleans start from 8am and the last of the day starts at 3pm.",
        "We text when your cleaner is on the way, with an arrival window of thirty minutes.",
      ],
      image: {
        src: "/templates/cleaning-services/detail.jpg",
        alt: "Two cleaners in uniform making a bed in a bright bedroom.",
        width: 1400,
        height: 933,
      },
    },

    {
      type: "booking",
      id: "book",
      tone: "ink",
      ghost: ["Two minutes"],
      eyebrow: "Book",
      title: "Book a clean",
      intro: "Six fields. We confirm by text within an hour during working hours, with a named cleaner and a time.",
      fields: [
        { name: "name", label: "Your name", type: "text", required: true, half: true },
        { name: "phone", label: "Phone", type: "tel", required: true, half: true },
        { name: "email", label: "Email", type: "email", required: true, half: true },
        {
          name: "address",
          label: "Neighbourhood",
          type: "text",
          required: true,
          half: true,
          placeholder: "Ballard, Fremont, and so on",
        },
        {
          name: "size",
          label: "Home size",
          type: "select",
          required: true,
          half: true,
          placeholder: "Please choose",
          options: [
            "Studio or one bedroom",
            "Two bedroom",
            "Three bedroom",
            "Four bedroom or larger",
            "Office or studio space",
          ],
        },
        {
          name: "frequency",
          label: "How often",
          type: "select",
          required: true,
          half: true,
          placeholder: "Please choose",
          options: ["Weekly", "Fortnightly", "One-off deep clean", "End of tenancy"],
        },
        {
          name: "notes",
          label: "Anything we should know",
          type: "textarea",
          placeholder: "Pets, allergies, parking, a room to leave alone, or a day that suits.",
        },
      ],
      submitLabel: "Book a clean",
      note: "Nothing is charged now. You pay after the first clean, and you can cancel any visit up to 24 hours before at no cost.",
      aside: {
        title: "Call instead if",
        items: [
          "You need somebody this week",
          "Your address is outside the listed areas",
          "It is an end of tenancy with a deadline",
        ],
        phone: PHONE,
      },
    },

    {
      type: "footer",
      columns: [
        {
          title: "Service",
          links: [
            { label: "Prices", href: "#prices" },
            { label: "What we do", href: "#services" },
            { label: "What is included", href: "#included" },
            { label: "Service areas", href: "#areas" },
          ],
        },
        {
          title: "Booking",
          links: [
            { label: "Contact", href: "#visit" },
            { label: "Book a clean", href: "#book" },
          ],
        },
      ],
      note: "Cleaners are employed by Tidemark, not subcontracted. That is why the same person comes back and why the insurance covers what happens in your home.",
      legal: [
        "Tidemark Home Cleaning is a fictional company created to demonstrate this template.",
        "On a live site this line carries the business registration and the liability insurance details.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = {
  practice: "Tidemark Home Cleaning",
  templateName: "Crisp",
};

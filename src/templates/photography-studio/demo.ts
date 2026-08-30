import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * APERTURE, as a working studio.
 *
 * SALT & SILVER DOES NOT EXIST. Fictional, and labelled as such in a bar above
 * the design that cannot be dismissed.
 *
 * THE PORTFOLIO IS STOCK, AND THE PAGE SAYS SO. This is the sharpest version
 * of a problem every demo in this catalog has: a photographer's portfolio is
 * photographs, so any image used here is pretending to be the studio's own
 * work in a way a room or a building does not. The index note states plainly
 * that the images are licensed stock standing in for the photographer's
 * portfolio, which is the only honest way to demo this particular template.
 *
 * `layout: "grid"` rather than the asymmetric default, because a photographer's
 * genres genuinely are a set of equals. Weighting one of them larger would be
 * making an argument the studio has not made.
 */

const PHONE = "(415) 555 0173";

export const config = defineTemplate({
  brand: {
    name: "Salt & Silver",
    mark: "Salt & Silver",
    tagline: "A photography studio in the Mission, shooting portraits, editorial and events.",
    contact: {
      phone: PHONE,
      email: "studio@saltandsilver.example",
      address: ["2841 Alabama Street", "San Francisco, CA 94110"],
      hours: "Studio by appointment",
    },
    social: [{ label: "Instagram", href: "https://instagram.com" }],
  },

  theme,

  seo: {
    title: "Salt & Silver",
    description:
      "A photography studio in the Mission. Portraits, editorial and events, with package prices published and a date-check form that gets answered the same day.",
  },

  settings: {},

  sections: [
    {
      type: "nav",
      links: [
        { label: "Work", href: "#work" },
        { label: "Packages", href: "#packages" },
        { label: "Studio", href: "#studio" },
        { label: "Words", href: "#words" },
      ],
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      // `offset`. Creative & Events holds three templates; Bloom takes
      // `centred` and Studio takes `editorial`.
      layout: "offset",
      ghost: ["Salt", "and Silver"],
      eyebrow: "San Francisco",
      headline: { lead: "Photographs that", main: "still work in a year." },
      sub: "A two-room studio in the Mission shooting portraits, editorial and events. Packages are published, dates are answered the same day, and every shoot is delivered inside a fortnight.",
      actions: [{ label: "See the work", href: "#work", style: "secondary" }],
      chips: [],
      subject: {
        src: "/templates/photography-studio/hero.jpg",
        alt: "A photographer reviewing a shot beside a softbox in a daylit studio.",
        width: 1600,
        height: 900,
      },
      facts: [
        { label: "Studio", value: "Two rooms, daylight and strobe" },
        { label: "Delivery", value: "Fourteen days, every shoot" },
        { label: "Booking", value: "Dates answered same day" },
        { label: "Travel", value: "Bay Area included, further quoted" },
      ],
    },

    {
      type: "projectIndex",
      id: "work",
      eyebrow: "Work",
      title: "Three things, done often",
      intro: "Rather than a long list of genres, most of which any studio would take on and few of which it is actually good at.",
      layout: "grid",
      projects: [
        {
          title: "Portraits",
          meta: "Studio and location",
          body: "Actors, founders, authors and anybody who has been putting off a decent headshot for four years. Two hours, two looks, twenty edited frames.",
          image: {
            src: "/templates/photography-studio/work-1.jpg",
            alt: "A studio portrait lit with coloured gels against a graduated background.",
            width: 1200,
            height: 1800,
          },
        },
        {
          title: "Editorial and campaign",
          meta: "Half and full day",
          body: "Commissioned work for magazines and brands, usually with a stylist and an art director in the room.",
          image: {
            src: "/templates/photography-studio/work-2.jpg",
            alt: "A photographer positioning a boom light in the studio.",
            width: 1200,
            height: 1799,
          },
        },
        {
          title: "Events",
          meta: "Two hours to full day",
          body: "Launches, conferences and the occasional wedding. Two shooters as standard, because one photographer at an event is a photographer missing half of it.",
          image: {
            src: "/templates/photography-studio/work-3.jpg",
            alt: "A crew of three working a shoot with a camera and a video rig.",
            width: 1200,
            height: 1800,
          },
        },
      ],
      note: "The photographs in this index are licensed stock standing in for a portfolio, because this is a template demo and the studio is fictional. On a live site every frame in this band is the photographer's own work, and it is the only band on the page that genuinely cannot be filled with anything else.",
    },

    {
      type: "pricing",
      id: "packages",
      tone: "surface",
      eyebrow: "Packages",
      title: "What a shoot costs",
      intro: "Published. If a studio will not tell you a number before a call, the number depends on the call.",
      nameLabel: "Shoot",
      priceLabel: "From",
      rows: [
        {
          name: "Portrait session",
          detail: "Two hours in studio, two looks, twenty edited frames delivered.",
          price: "$650",
        },
        {
          name: "Extended portrait",
          detail: "Half a day, location or studio, forty edited frames.",
          price: "$1,200",
        },
        {
          name: "Editorial half day",
          detail: "Four hours, one assistant, usage for twelve months.",
          price: "$1,900",
        },
        {
          name: "Editorial full day",
          detail: "Eight hours, one assistant, usage for twelve months.",
          price: "$3,200",
        },
        {
          name: "Event coverage",
          detail: "Two shooters, priced per hour with a three hour minimum.",
          price: "$450 an hour",
        },
      ],
      note: "Every price includes editing and delivery inside fourteen days. Extended usage, print licences and rush delivery are quoted separately and always in writing before the shoot rather than invoiced after it.",
      action: { label: "Check a date", href: "#date", style: "primary" },
    },

    {
      type: "feature",
      id: "studio",
      media: "left",
      eyebrow: "The studio",
      title: "Two rooms and a lot of daylight",
      intro: "Alabama Street, in the Mission, since 2016.",
      body: [
        "The main room takes a full-length backdrop and holds daylight until about four in the afternoon, which is why most portrait sessions are booked in the morning. The second room is smaller, blacked out, and used for anything that needs to be lit rather than found.",
        "Everything is available to hire when it is not in use, which is roughly two days a week, and the rate is on the packages list rather than on request.",
        "One photographer, one assistant who has been here since the beginning, and no interns being paid in exposure.",
      ],
      facts: [
        { label: "Main room", value: "40ft, north light" },
        { label: "Second room", value: "Blacked out, strobe" },
        { label: "Hire rate", value: "$95 an hour when free" },
        { label: "Parking", value: "Loading on Alabama, permit on request" },
      ],
      image: {
        src: "/templates/photography-studio/about.jpg",
        alt: "The main studio room with a boom-mounted light and a black backdrop.",
        width: 1200,
        height: 1799,
      },
    },

    {
      type: "reviews",
      id: "words",
      tone: "surface",
      eyebrow: "Words",
      title: "What clients say",
      items: [
        {
          quote:
            "I have had headshots done four times and hated all of them. These I have actually used. He spent the first twenty minutes just talking, which turned out to be the whole trick.",
          name: "Ingrid V.",
          meta: "Portrait session",
        },
        {
          quote:
            "Delivered in nine days against a fourteen day promise, with the usage terms written out plainly enough that our legal team had no questions.",
          name: "Marcus D.",
          meta: "Editorial full day",
        },
        {
          quote:
            "Two shooters at a launch is the difference between a gallery and a handful of pictures of the back of people's heads.",
          name: "Priya L.",
          meta: "Event coverage",
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
          q: "How far ahead do you book?",
          a: "Portraits usually two to three weeks. Editorial and events depend entirely on the date, which is why the form below asks for it first.",
        },
        {
          q: "What do I get, and when?",
          a: "Edited, colour-graded frames in high resolution and web-sized versions, inside fourteen days. Raw files are not delivered, and that is a policy rather than an upsell.",
        },
        {
          q: "Can we shoot at our own location?",
          a: "Yes. Anywhere in the Bay Area is included in the package price. Beyond that, travel is quoted before you commit to anything.",
        },
        {
          q: "What about usage rights?",
          a: "Twelve months, all media, included in editorial and campaign packages. Longer or exclusive usage is priced in writing before the shoot.",
        },
        {
          q: "Do you shoot weddings?",
          a: "A few each year, under event coverage. If you want a specialist wedding photographer we will happily give you three names.",
        },
      ],
    },

    {
      type: "booking",
      id: "date",
      tone: "ink",
      ghost: ["Same day"],
      eyebrow: "Check a date",
      title: "Is the date free",
      intro: "The most useful thing this page can do is answer that quickly. Send the date and you will hear the same working day.",
      fields: [
        { name: "name", label: "Your name", type: "text", required: true, half: true },
        { name: "email", label: "Email", type: "email", required: true, half: true },
        { name: "date", label: "The date", type: "date", required: true, half: true },
        {
          name: "kind",
          label: "What kind of shoot",
          type: "select",
          required: true,
          half: true,
          placeholder: "Please choose",
          options: [
            "Portrait session",
            "Editorial or campaign",
            "Event coverage",
            "Studio hire only",
            "Not sure yet",
          ],
        },
        {
          name: "notes",
          label: "Anything we should know",
          type: "textarea",
          placeholder: "Where it is, roughly how long, who else is involved, and what the pictures are for.",
        },
      ],
      submitLabel: "Check the date",
      note: "Every enquiry is answered the same working day, including the dates that are already taken. Your details are used to answer it and nothing else.",
      aside: {
        title: "Worth knowing",
        items: [
          "Portrait sessions are usually booked two to three weeks out",
          "Bay Area travel is included in every package price",
          "The studio is available to hire when it is not in use",
        ],
        phone: PHONE,
      },
    },

    {
      type: "footer",
      columns: [
        {
          title: "Studio",
          links: [
            { label: "Work", href: "#work" },
            { label: "Packages", href: "#packages" },
            { label: "The studio", href: "#studio" },
            { label: "Words", href: "#words" },
          ],
        },
        { title: "Booking", links: [{ label: "Check a date", href: "#date" }] },
      ],
      note: "Delivery is fourteen days from the shoot, every time. If that is going to slip you will hear it from us before the deadline rather than after it.",
      legal: [
        "Salt & Silver is a fictional studio created to demonstrate this template.",
        "On a live site this line carries the business registration and the standard usage terms.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = { practice: "Salt & Silver", templateName: "Aperture" };

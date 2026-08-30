import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * LEDGER, as a working agency.
 *
 * HOLLOWDALE PROPERTY DOES NOT EXIST. Fictional, and labelled as such in a bar
 * above the design that cannot be dismissed.
 *
 * THE TWENTY-FOURTH AND LAST TEMPLATE, and the only one that has to serve two
 * audiences who want opposite things on the same page. A landlord is choosing
 * a manager and reading about fees. A tenant is trying to report a broken
 * boiler at nine at night and does not care about any of it.
 *
 * The reflexive build is a tab control or a toggle. Both are wrong: a tab
 * hides one audience from the other so half your visitors land on a page that
 * appears to be addressed to somebody else, and a toggle asks a person to
 * classify themselves before they have read anything. `audienceSplit` shows
 * both doors, complete, side by side.
 *
 * SET IN THE UK, and the compliance list is the reason. Lettings is the most
 * heavily regulated template in this catalog and the obligations are entirely
 * jurisdictional: deposit protection deadlines, gas safety certification,
 * right-to-rent checks and prescribed information have no American equivalent.
 * A demo pinned to one real regime, with that regime's actual obligations, is
 * a far better proof that the template survives localisation than a vague one
 * belonging nowhere.
 */

const PHONE = "0113 496 0184";

export const config = defineTemplate({
  brand: {
    name: "Hollowdale Property",
    mark: "Hollowdale",
    tagline: "Residential lettings and management across north Leeds.",
    contact: {
      phone: PHONE,
      email: "office@hollowdaleproperty.example",
      address: ["41 Otley Road", "Leeds LS6 4DB"],
      hours: "Monday to Friday, 9am to 5.30pm",
    },
    social: [],
  },

  theme,

  seo: {
    title: "Hollowdale Property",
    description:
      "Residential lettings and management across north Leeds. Published management fees, a repairs line that a person answers, and compliance handled rather than invoiced.",
  },

  settings: {},

  sections: [
    {
      type: "nav",
      links: [
        { label: "Owners and tenants", href: "#doors" },
        { label: "Properties", href: "#properties" },
        { label: "Fees", href: "#fees" },
        { label: "Compliance", href: "#compliance" },
      ],
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      // `centred`. The last slot in Property & Design: Atelier editorial,
      // Datum split, Threshold banner, Meridian offset.
      layout: "centred",
      ghost: ["North Leeds"],
      eyebrow: "Leeds",
      headline: { lead: "Two doors,", main: "one agency." },
      sub: "Residential lettings and management across north Leeds. Landlords get published fees and compliance handled rather than invoiced. Tenants get a repairs line that a person answers.",
      actions: [{ label: "Owners and tenants", href: "#doors", style: "primary" }],
      chips: [],
      subject: {
        src: "/templates/property-management/hero.jpg",
        alt: "White apartment blocks with glass balconies against a clear sky.",
        width: 1400,
        height: 1750,
      },
      facts: [
        { label: "Under management", value: "Around 180 homes" },
        { label: "Repairs line", value: "Answered by a person, not a portal" },
        { label: "Management fee", value: "Published, below" },
        { label: "Area", value: "North Leeds only" },
      ],
    },

    {
      type: "audienceSplit",
      id: "doors",
      tone: "surface",
      eyebrow: "Which are you",
      title: "Both doors are on this page",
      intro: "No tabs and no toggle. You should be able to see immediately which half is yours and that the other one exists.",
      panels: [
        {
          eyebrow: "For owners",
          title: "Letting and managing your property",
          body: "Full management or let-only, priced on this page rather than after a valuation. We manage around 180 homes in north Leeds and we do not take instructions outside it.",
          items: [
            "Tenant find, referencing and right-to-rent checks",
            "Deposit protected within the statutory deadline, every time",
            "Rent collected, chased, and paid on a fixed date",
            "Compliance certificates tracked and renewed before they lapse",
            "Repairs approved up to an agreed limit without a phone call",
            "A statement each month you can hand straight to an accountant",
          ],
          action: { label: "See management fees", href: "#fees", style: "primary" },
        },
        {
          eyebrow: "For tenants",
          title: "Reporting something, or looking for a home",
          body: "You are not a customer of ours in the legal sense and you are still the person we speak to most. Repairs are reported to a human, and out of hours there is a real emergency number rather than a form.",
          items: [
            "Report a repair by phone, email or in person",
            "Emergencies answered out of hours, all year",
            "Your deposit is protected and you get the scheme details in writing",
            "A copy of the How to Rent guide at the start of every tenancy",
            "Renewals discussed six weeks before they are due, not on the day",
            "Available properties listed below",
          ],
          action: { label: "Report a repair", href: "#contact", style: "secondary" },
        },
      ],
    },

    {
      type: "listings",
      id: "properties",
      eyebrow: "Properties",
      title: "Available now",
      intro: "Search by street, area or size. Updated the day something comes on or goes off.",
      filters: true,
      items: [
        {
          title: "Two bed apartment, Chapel Allerton",
          address: "Regent Terrace, Chapel Allerton, LS7",
          price: "£1,150 pcm",
          status: "Available",
          meta: ["2 bed", "1 bath", "Balcony", "EPC C"],
          image: {
            src: "/templates/property-management/listing-1.jpg",
            alt: "A red brick apartment building with stepped terraces and railings.",
            width: 1200,
            height: 686,
          },
        },
        {
          title: "One bed apartment, Headingley",
          address: "Cardigan Road, Headingley, LS6",
          price: "£895 pcm",
          status: "Available",
          meta: ["1 bed", "1 bath", "Third floor", "EPC B"],
          image: {
            src: "/templates/property-management/listing-2.jpg",
            alt: "A modern apartment building with concrete facade and glass balconies.",
            width: 1200,
            height: 800,
          },
        },
        {
          title: "Three bed apartment, Meanwood",
          address: "Stonegate Road, Meanwood, LS6",
          price: "£1,425 pcm",
          status: "Let agreed",
          meta: ["3 bed", "2 bath", "Parking", "EPC C"],
          image: {
            src: "/templates/property-management/listing-3.jpg",
            alt: "A pale apartment block with balconies at dusk.",
            width: 1200,
            height: 1800,
          },
        },
      ],
      note: "Let agreed properties stay on the list for a fortnight rather than disappearing, so you can see what actually goes and at what rent. Nothing here is a holding deposit trap: you do not pay anything to view.",
    },

    {
      type: "pricing",
      id: "fees",
      eyebrow: "Fees",
      title: "What we charge owners",
      intro: "Published. An agency that will not quote a management fee before a valuation is an agency pricing your property rather than its own service.",
      nameLabel: "Service",
      priceLabel: "Fee",
      rows: [
        {
          name: "Full management",
          detail: "Everything: tenant find, rent collection, repairs, compliance and statements.",
          price: "9% of rent",
        },
        {
          name: "Let only",
          detail: "Marketing, viewings, referencing, tenancy agreement and deposit protection. You manage from there.",
          price: "£650 one-off",
        },
        {
          name: "Tenant find on a managed property",
          detail: "Charged once at the start of a new tenancy, not at every renewal.",
          price: "£250",
        },
        { name: "Renewal", detail: "Negotiated, documented and re-protected.", price: "No charge" },
        {
          name: "Inventory and check-in",
          detail: "Independently prepared, photographed and timestamped.",
          price: "From £120",
        },
      ],
      note: "Percentages are of rent actually collected, not of rent due, which means we are not paid for a month you were not. There is no charge for renewals, no annual administration fee, and no mark-up on contractor invoices: you see what the plumber charged.",
    },

    {
      type: "checklist",
      id: "compliance",
      tone: "wash",
      eyebrow: "Compliance",
      title: "What the law requires, and who does it",
      intro: "The obligations that fall on a landlord in England. On a full management instruction we track and renew all of them; on let-only they stay with you and we will tell you that plainly at the outset.",
      columns: [
        {
          name: "Before a tenancy starts",
          items: [
            "Right to rent checks on every adult occupier",
            "Valid gas safety record, if there is gas",
            "Electrical installation report, renewed at least every five years",
            "Energy performance certificate, rated E or above",
            "Working smoke alarms on every storey, carbon monoxide where required",
          ],
        },
        {
          name: "At the start",
          items: [
            "Deposit protected in an approved scheme within 30 days",
            "Prescribed information served on the tenant",
            "The current How to Rent guide provided",
            "Copies of the gas, electrical and energy certificates given",
            "A signed inventory both parties hold",
          ],
        },
        {
          name: "Ongoing",
          items: [
            "Gas safety record renewed annually",
            "Licensing checked where the property or area requires it",
            "Repairs carried out within statutory timescales",
            "Deposit re-protected and re-served on renewal",
          ],
        },
      ],
      note: "These are the recurring obligations for an assured shorthold tenancy in England and they are given here because a wrong compliance list on a letting agent's page can cost a landlord a penalty and a tenant their protection. They still must be checked against current legislation before this template is published: requirements change, and Wales, Scotland and Northern Ireland each differ.",
    },

    {
      type: "faq",
      eyebrow: "Questions",
      title: "For both sides",
      items: [
        {
          q: "I am a tenant. Who do I call about a repair?",
          a: "The number on this page, in working hours, and it is answered by somebody in the office rather than a queue. Out of hours the same number reaches an emergency line for anything involving water, heat, power or security.",
        },
        {
          q: "I am a landlord. How quickly do I get paid?",
          a: "On a fixed date each month, with a statement attached, whether or not everything on your portfolio has cleared. We do not hold rent to smooth our own cashflow.",
        },
        {
          q: "Do you mark up contractor invoices?",
          a: "No. You see what the contractor charged and you pay that. Mark-ups on repairs are the least visible fee in this industry and the reason some agencies are enthusiastic about small jobs.",
        },
        {
          q: "Do you charge tenants fees?",
          a: "Only what the law permits, which in England is a holding deposit, the tenancy deposit, and specified default fees. There is no charge for viewing, applying, referencing or renewing.",
        },
        {
          q: "Will you manage a property outside north Leeds?",
          a: "No. Response times are the whole product in management, and an agency an hour away is an agency that authorises a contractor rather than attending.",
        },
      ],
    },

    {
      type: "location",
      id: "contact",
      tone: "surface",
      eyebrow: "Contact",
      title: "The office, and the repairs line",
      address: ["Hollowdale Property", "41 Otley Road", "Leeds LS6 4DB"],
      hours: [
        { days: "Monday to Thursday", time: "9am to 5.30pm" },
        { days: "Friday", time: "9am to 5pm" },
        { days: "Saturday", time: "Viewings only, by arrangement" },
        { days: "Emergencies", time: "Same number, out of hours, all year" },
      ],
      phone: PHONE,
      email: "office@hollowdaleproperty.example",
      mapsQuery: "Otley Road, Headingley, Leeds LS6",
      travel: [
        "The office is above the shop, with the entrance on the side street.",
        "Tenants can walk in during working hours without an appointment.",
        "For an emergency out of hours, call rather than email. Email is not monitored overnight.",
        "An emergency means water, heat, power or security. Anything else is dealt with the next working day.",
      ],
    },

    {
      type: "booking",
      id: "enquiry",
      tone: "ink",
      ghost: ["Hollowdale"],
      eyebrow: "Enquiries",
      title: "Get in touch",
      intro: "One form for both sides. Tell us which you are and it reaches the right desk.",
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
          options: [
            "A landlord looking for an agent",
            "An existing landlord client",
            "A tenant reporting something",
            "Looking for a property to rent",
          ],
        },
        {
          name: "property",
          label: "Which property",
          type: "text",
          half: true,
          placeholder: "An address, or the area you are looking in",
        },
        {
          name: "notes",
          label: "What do you need",
          type: "textarea",
          placeholder: "For a repair, tell us what is wrong and whether it is affecting water, heat, power or security.",
        },
      ],
      submitLabel: "Send enquiry",
      note: "Answered within one working day. If you are reporting an emergency, please call rather than using this form: it is not monitored overnight.",
      aside: {
        title: "Call instead if",
        items: [
          "It involves water, heat, power or security",
          "You are locked out",
          "You have a deadline on a tenancy or a notice",
        ],
        phone: PHONE,
      },
    },

    {
      type: "footer",
      columns: [
        {
          title: "Owners",
          links: [
            { label: "Owners and tenants", href: "#doors" },
            { label: "Management fees", href: "#fees" },
            { label: "Compliance", href: "#compliance" },
          ],
        },
        {
          title: "Tenants",
          links: [
            { label: "Available properties", href: "#properties" },
            { label: "Report a repair", href: "#contact" },
          ],
        },
      ],
      note: "The compliance list on this page describes obligations for an assured shorthold tenancy in England and is not legal advice. Requirements change, and Wales, Scotland and Northern Ireland each differ. Check your own position with us before relying on it.",
      legal: [
        "Hollowdale Property is a fictional agency created to demonstrate this template.",
        "On a live site this line carries the client money protection scheme, the redress scheme membership, and the deposit protection scheme used.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = {
  practice: "Hollowdale Property",
  templateName: "Ledger",
};

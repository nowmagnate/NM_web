import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * QUIET, as a working practice.
 *
 * ELEANOR VASS DOES NOT EXIST. Fictional, and labelled as such in a bar above
 * the design that cannot be dismissed.
 *
 * NO TESTIMONIALS ON THIS TEMPLATE, AT ALL, and that is the most important
 * decision in it.
 *
 * Every other template in the catalog carries a reviews band. This one does
 * not, because a therapy client giving a public testimonial has disclosed that
 * they were in therapy, and a therapist soliciting one has asked a person in
 * an unequal relationship for a favour. Most professional bodies discourage or
 * prohibit it outright.
 *
 * The kit has the component. The catalog's own section list for this template
 * does not include reviews, and the template does not add one. That restraint
 * is the whole product here: this is the template whose buyer is judged on
 * tone before anything else, and a page that behaves correctly is worth more
 * to them than a page that converts hard.
 *
 * Everything else follows from the same principle. No sticky booking bar. No
 * chips. One action, at the bottom, described as an enquiry rather than a
 * booking.
 */

const PHONE = "0117 496 0227";

export const config = defineTemplate({
  brand: {
    name: "Eleanor Vass",
    mark: "Eleanor Vass",
    tagline: "Psychotherapy and counselling in Bristol, in person and online.",
    contact: {
      phone: PHONE,
      email: "hello@eleanorvass.example",
      address: ["Consulting rooms, Cotham Hill", "Bristol BS6 6LF"],
      hours: "Tuesday to Friday",
    },
    social: [],
  },

  theme,

  seo: {
    title: "Eleanor Vass",
    description:
      "Psychotherapy and counselling in Bristol, in person and online. Fees and availability published, and a first conversation that costs nothing.",
  },

  settings: {},

  sections: [
    {
      type: "nav",
      links: [
        { label: "How I work", href: "#how" },
        { label: "Areas of focus", href: "#focus" },
        { label: "Fees", href: "#fees" },
        { label: "What to expect", href: "#expect" },
      ],
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      // `split`. Asana holds `banner` and Tempo `centred` in Wellness &
      // Therapy, so this takes the third.
      layout: "split",
      ghost: ["No hurry"],
      eyebrow: "Bristol, and online",
      headline: { lead: "Somewhere to", main: "think out loud." },
      sub: "Individual psychotherapy, weekly, for adults. I have space for a small number of clients and I would rather you found the right therapist than the available one.",
      actions: [{ label: "Make an enquiry", href: "#enquiry", style: "primary" }],
      chips: [],
      subject: {
        src: "/templates/therapy-counseling/hero.jpg",
        alt: "Two people in conversation in armchairs in a softly lit room.",
        width: 1600,
        height: 900,
      },
      facts: [
        { label: "Sessions", value: "Weekly, fifty minutes" },
        { label: "Where", value: "Cotham Hill, or online" },
        { label: "First conversation", value: "Twenty minutes, no charge" },
        { label: "Availability", value: "Stated below, kept current" },
      ],
    },

    {
      type: "feature",
      id: "how",
      media: "left",
      eyebrow: "How I work",
      title: "Weekly, open-ended, and led by you",
      intro: "Integrative, which in practice means the approach follows the person rather than the other way round.",
      body: [
        "Most of what happens is talking, and most of the talking is yours. I am not going to hand you a worksheet or set you homework unless we have agreed together that it would help. Sessions are fifty minutes, at the same time each week, and they continue for as long as they are useful to you.",
        "Some people come for a few months with something specific. Others stay for years. Neither is the correct answer, and I will not encourage you to continue past the point where you are getting something out of it. Reviewing that openly, every few months, is part of the work.",
        "I am not the right therapist for everyone. If what you need is specialist trauma work, addiction support, or a psychiatric assessment, I will say so early and help you find the right person rather than keeping the appointment.",
      ],
      facts: [
        { label: "Approach", value: "Integrative, relational" },
        { label: "Session length", value: "Fifty minutes, weekly" },
        { label: "Duration", value: "Open-ended, reviewed together" },
        { label: "Registered with", value: "The relevant national body" },
      ],
      image: {
        src: "/templates/therapy-counseling/room.jpg",
        alt: "A therapist sitting with a notebook in an armchair in a calm room.",
        width: 1400,
        height: 933,
      },
    },

    {
      type: "checklist",
      id: "focus",
      tone: "surface",
      eyebrow: "Areas of focus",
      title: "What people bring",
      intro: "Not a list of conditions. These are the shapes conversations tend to take, and most people arrive with several at once.",
      columns: [
        {
          name: "Often",
          items: [
            "Anxiety that has stopped being situational",
            "Low mood that has lasted longer than it should",
            "Work that has taken over, or ended",
            "A relationship, ongoing or finished",
            "Grief, including the kind that arrives late",
          ],
        },
        {
          name: "Also",
          items: [
            "Patterns you can see and cannot interrupt",
            "Family, and what got carried out of it",
            "Identity, and the parts that were set aside",
            "A decision that will not resolve",
            "Feeling fine, and not knowing why that is a problem",
          ],
        },
        {
          name: "Where I would refer on",
          items: [
            "Active addiction needing specialist support",
            "An eating disorder requiring a medical team",
            "Anything needing a psychiatric assessment",
            "Court-directed or assessment-led work",
            "Under eighteens",
          ],
        },
      ],
      note: "The third column is the honest one and the reason it is on the page rather than in a policy document. Being told in the first conversation that somebody else is better placed is a much better outcome than finding out four months in.",
    },

    {
      type: "steps",
      id: "expect",
      eyebrow: "What to expect",
      title: "From first contact to the first session",
      intro: "Written out because not knowing is a genuine obstacle for a lot of people, and it is an easy one to remove.",
      steps: [
        {
          title: "You send a short message",
          body: "The form below asks very little on purpose. A sentence is enough. You do not have to explain yourself in writing to somebody you have not met.",
        },
        {
          title: "We speak for twenty minutes",
          body: "By phone, at no charge. Roughly what has brought you, whether I am the right person, and any practical questions. Nobody is committed to anything at the end of it.",
        },
        {
          title: "A first session, if it feels right",
          body: "Fifty minutes, at a regular weekly time. It is a session rather than an assessment: you can talk about whatever you want to talk about.",
        },
        {
          title: "We review it, together, out loud",
          body: "After six sessions and every few months after that. Whether it is helping, whether the frequency is right, and whether to continue. Stopping is a normal outcome and not a failure of anything.",
        },
      ],
      aside: {
        title: "If you are not sure this is for you",
        body: "A great many people put this off for years and then say the first conversation was easier than they expected. You do not need to have a diagnosis, a crisis, or a clear account of what is wrong. Not being able to explain why you are getting in touch is itself a perfectly ordinary reason to get in touch. If you would rather ask a question before anything else, phone rather than write.",
      },
    },

    {
      type: "pricing",
      id: "fees",
      eyebrow: "Fees and availability",
      title: "What it costs, and whether I have space",
      intro: "Published and kept current. A therapist whose availability page is out of date is asking anxious people to send an enquiry into silence.",
      nameLabel: "Session",
      priceLabel: "Fee",
      rows: [
        {
          name: "First conversation",
          detail: "Twenty minutes by phone. Not a session and not an assessment.",
          price: "No charge",
        },
        {
          name: "Individual session, in person",
          detail: "Fifty minutes, weekly, Cotham Hill.",
          price: "£70",
        },
        {
          name: "Individual session, online",
          detail: "Fifty minutes, weekly, by video.",
          price: "£65",
        },
        {
          name: "Reduced-fee places",
          detail: "Two held at any time for people who could not otherwise attend. Ask, and no explanation is required.",
          price: "£40",
        },
      ],
      note: "Current availability: two weekday morning slots and one early evening, in person or online. Reduced-fee places are both taken at the moment and there is a short waiting list for them. This line is updated every Monday, so if it says a slot is free, it is.",
      action: { label: "Make an enquiry", href: "#enquiry", style: "primary" },
    },

    {
      type: "faq",
      tone: "surface",
      eyebrow: "Questions",
      title: "Practical things",
      items: [
        {
          q: "How long does therapy take?",
          a: "There is no standard answer and anybody giving you one should be treated with suspicion. Some people come for three months, some for three years. We review it openly every few months and stopping is a normal outcome.",
        },
        {
          q: "Is it confidential?",
          a: "Yes, with the usual narrow exceptions around risk to life, which I will explain in full in the first session. I have clinical supervision, as all therapists must, where cases are discussed without identifying details.",
        },
        {
          q: "What if I need to cancel?",
          a: "Forty-eight hours notice and there is no charge. Less than that and the session is charged, because the time was held for you and cannot be given to anybody else at short notice.",
        },
        {
          q: "Do you take insurance?",
          a: "Some health insurers cover this work. I am happy to provide invoices with the details they require, but I do not bill insurers directly.",
        },
        {
          q: "Can I do it online?",
          a: "Yes, and for some people it works better. It is five pounds less and the work itself is no different once you are past the first session or two.",
        },
        {
          q: "What if I need help urgently?",
          a: "This is not a crisis service and I cannot respond quickly to urgent messages. If you are in crisis, contact your GP, call 111, or go to an emergency department. If life is at risk, call 999.",
        },
      ],
    },

    {
      type: "location",
      id: "visit",
      eyebrow: "Where",
      title: "The consulting room",
      address: ["Eleanor Vass", "Consulting rooms, Cotham Hill", "Bristol BS6 6LF"],
      hours: [
        { days: "Tuesday and Wednesday", time: "9am to 5pm" },
        { days: "Thursday", time: "9am to 7pm" },
        { days: "Friday", time: "9am to 2pm" },
        { days: "Monday and weekends", time: "Not available" },
      ],
      phone: PHONE,
      email: "hello@eleanorvass.example",
      travel: [
        "The entrance is the plain black door beside the shop, with no sign on it. That is deliberate.",
        "There is a waiting area, and you will not meet anybody else coming or going.",
        "Ten minutes on foot from Whiteladies Road, and buses stop at the top of the hill.",
        "The room is on the ground floor and step-free from the street.",
      ],
    },

    {
      type: "booking",
      id: "enquiry",
      tone: "ink",
      ghost: ["Take your time"],
      eyebrow: "Enquiries",
      title: "Get in touch",
      intro: "A sentence is enough. I reply within two working days, from a personal address, with nothing in the subject line that identifies what it is about.",
      fields: [
        { name: "name", label: "Your name", type: "text", required: true, half: true },
        {
          name: "contact",
          label: "How to reach you",
          type: "email",
          required: true,
          half: true,
        },
        {
          name: "format",
          label: "In person or online",
          type: "select",
          half: true,
          placeholder: "Either is fine",
          options: ["Either is fine", "In person, Bristol", "Online"],
        },
        {
          name: "when",
          label: "Times that could work",
          type: "text",
          half: true,
          placeholder: "Mornings, after work, or not sure yet",
        },
        {
          name: "notes",
          label: "Anything you want to say",
          type: "textarea",
          placeholder: "As little as you like. You do not have to explain it in writing.",
        },
      ],
      submitLabel: "Send an enquiry",
      note: "Replies come from a personal email address with a neutral subject line. Your message is not stored anywhere beyond my own inbox, is never used for marketing, and this page carries no advertising or analytics tracking of any kind.",
      aside: {
        title: "Rather phone",
        items: [
          "Some people find writing it down harder than saying it",
          "There is an answerphone and I return calls the same day I work",
          "You can ask a practical question without it being an enquiry",
        ],
        phone: PHONE,
      },
    },

    {
      type: "footer",
      columns: [
        {
          title: "Practice",
          links: [
            { label: "How I work", href: "#how" },
            { label: "Areas of focus", href: "#focus" },
            { label: "Fees and availability", href: "#fees" },
            { label: "What to expect", href: "#expect" },
          ],
        },
        {
          title: "Contact",
          links: [
            { label: "Where", href: "#visit" },
            { label: "Enquiries", href: "#enquiry" },
          ],
        },
      ],
      note: "This is not a crisis service. If you need help urgently, contact your GP, call 111, or go to an emergency department. If life is at risk, call 999.",
      legal: [
        "Eleanor Vass is a fictional practitioner created to demonstrate this template.",
        "This template carries no testimonials, deliberately. A therapy client giving a public one has disclosed that they were in therapy, and being asked for one puts them in an unequal position. Most professional bodies discourage the practice.",
        "On a live site this line carries the practitioner's registration number and the body that holds it.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = { practice: "Eleanor Vass", templateName: "Quiet" };

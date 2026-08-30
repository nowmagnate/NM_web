import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * TEMPO, as a working trainer.
 *
 * BRACKEN STRENGTH DOES NOT EXIST. Fictional, and labelled as such in a bar
 * above the design that cannot be dismissed.
 *
 * NO BEFORE-AND-AFTER PHOTOGRAPHY, AND THAT IS A DESIGN DECISION.
 * The catalog lists "Client results" as a section of this template, and the
 * reflexive way to build it is a grid of body transformation pairs. This does
 * not, for two reasons. The first is that stock photographs cannot honestly be
 * a before and after pair, so any such grid here would be fabricated proof and
 * the studio does not ship that even behind a demo label. The second matters
 * more commercially: transformation grids are the most abused device in
 * fitness marketing and a buyer who wants one already has a thousand templates
 * to choose from. So the results band is written testimony with specific,
 * checkable outcomes, and the gallery component stays available in the kit for
 * Threshold and Verge, where the before and after is a room rather than a
 * person.
 */

const PHONE = "(720) 555 0192";

export const config = defineTemplate({
  brand: {
    name: "Bracken Strength",
    mark: "Bracken",
    tagline: "Twelve-week strength programmes in north Denver.",
    contact: {
      phone: PHONE,
      email: "train@brackenstrength.example",
      address: ["3320 Larimer Street, Unit B", "Denver, CO 80205"],
      hours: "Monday to Saturday, 6am to 8pm",
    },
    social: [{ label: "Instagram", href: "https://instagram.com" }],
  },

  theme,

  seo: {
    title: "Bracken Strength",
    description:
      "Twelve-week one-to-one strength programmes in north Denver. Two sessions a week, a written plan, and a free consultation before you commit to anything.",
  },

  settings: {
    stickyAction: { label: "Book a consultation", href: "#book", style: "primary" },
  },

  sections: [
    {
      type: "nav",
      links: [
        { label: "Programmes", href: "#programmes" },
        { label: "How it works", href: "#how" },
        { label: "Results", href: "#results" },
        { label: "Pricing", href: "#pricing" },
        { label: "Find us", href: "#visit" },
      ],
      action: { label: "Consultation", href: "#book", style: "primary" },
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      layout: "centred",
      ghost: ["Twelve weeks"],
      eyebrow: "Free consultation, no pitch",
      headline: { lead: "Not a workout.", main: "A programme." },
      sub: "Twelve weeks, two sessions a week, one coach who writes the plan and then holds you to it. If you want somebody to count your reps at you, this is the wrong gym.",
      actions: [
        { label: "Book a consultation", href: "#book", style: "primary" },
        { label: "See the programmes", href: "#programmes", style: "secondary" },
      ],
      chips: ["No lock-in contract", "Six clients per coach"],
      subject: {
        src: "/templates/personal-training/hero.jpg",
        alt: "A coach watching a lifter press a barbell overhead in the gym.",
        width: 1600,
        height: 1188,
      },
      facts: [
        { label: "Programme length", value: "Twelve weeks, reviewed at six" },
        { label: "Sessions", value: "Two a week, an hour each" },
        { label: "Caseload", value: "Six clients per coach, capped" },
        { label: "First step", value: "A 45 minute consultation, free" },
      ],
    },

    {
      type: "assurance",
      tone: "surface",
      title: "What you are actually buying",
      items: [
        {
          title: "A written programme",
          body: "Sets, reps, loads and progressions for twelve weeks, sent before session one. Not made up on the gym floor while you wait.",
        },
        {
          title: "The same coach throughout",
          body: "Six clients each, capped. Nobody is handing you to a junior in week four because the diary got busy.",
        },
        {
          title: "Numbers, reviewed at six weeks",
          body: "We test at the start, retest at six, and if it is not moving we change the programme rather than telling you to try harder.",
        },
        {
          title: "No contract",
          body: "Pay by the block. If it is not working, stop, and we will send you the programme so somebody else can carry it on.",
        },
      ],
    },

    {
      type: "serviceMenu",
      id: "programmes",
      eyebrow: "Programmes",
      title: "Four ways in",
      intro: "All of them are twelve weeks. What changes is how much of it happens in this room and how much happens on your own.",
      layout: "cards",
      groups: [
        {
          items: [
            {
              name: "Strength, one to one",
              body: "Two sessions a week with your coach, plus a programme for anything you do between them. The one most people start with.",
              price: "$780",
              meta: "per 12 weeks",
            },
            {
              name: "Strength, paired",
              body: "The same programme trained alongside somebody at a similar level. Cheaper, and considerably harder to skip.",
              price: "$520",
              meta: "each, per 12 weeks",
            },
            {
              name: "Return to lifting",
              body: "For people coming back from injury or a long gap. Slower loading, more assessment, and we will talk to your physio.",
              price: "$840",
              meta: "per 12 weeks",
            },
            {
              name: "Programme only",
              body: "Written plan, video review of your lifts every fortnight, no in-person sessions. For people who train elsewhere.",
              price: "$260",
              meta: "per 12 weeks",
            },
          ],
        },
      ],
      note: "Every programme starts with the same free consultation. Nothing is booked or paid for at that appointment, and you will get a written recommendation whether or not you sign up.",
      action: { label: "Book a consultation", href: "#book", style: "primary" },
    },

    {
      type: "steps",
      id: "how",
      eyebrow: "How it works",
      title: "Twelve weeks, in order",
      intro: "Written out because most people arrive having been sold a package and never told what actually happens inside it.",
      steps: [
        {
          title: "Consultation and assessment",
          body: "Forty-five minutes. What you want, what you have done before, what hurts, and a movement screen. Free, and there is nothing to sign at the end of it.",
        },
        {
          title: "You get the programme in writing",
          body: "Before session one, so you can read it, question it, and see exactly what the twelve weeks is going to ask of you.",
        },
        {
          title: "Two sessions a week",
          body: "An hour each, at fixed times you keep for the whole block. Everything is logged, so week eleven can be compared with week one rather than remembered.",
        },
        {
          title: "Retest at six weeks",
          body: "The same tests as day one. If the numbers have not moved, the programme changes. That is our problem to solve, not yours.",
        },
      ],
      aside: {
        title: "If you have never lifted",
        body: "About half the people who start here have not. The first three weeks are almost entirely technique at loads that feel too light, which is deliberate and which everybody finds frustrating. It is also the reason people are still training at week fifty rather than nursing a back at week five. Say at the consultation that you are starting from nothing and nobody will make you feel odd about it.",
        image: {
          src: "/templates/personal-training/session.jpg",
          alt: "A coach watching a client work through a set in the gym.",
          width: 1400,
          height: 933,
        },
      },
    },

    {
      type: "reviews",
      id: "results",
      tone: "ink",
      ghost: ["Week twelve"],
      eyebrow: "Results",
      title: "What twelve weeks actually did",
      intro: "Written by the people who did it, with the numbers they came in with and the ones they left with.",
      items: [
        {
          quote:
            "Deadlift went from 60 to 105 kilos in twelve weeks and my back stopped hurting at work, which was the entire reason I came in. I did not care about the deadlift.",
          name: "Marcus O.",
          meta: "Strength, one to one",
        },
        {
          quote:
            "I have started and quit four gyms. The difference here was having the plan written down in advance. I knew what Thursday was going to be on the Monday.",
          name: "Renee T.",
          meta: "Strength, paired",
        },
        {
          quote:
            "Came back after a shoulder reconstruction. They spoke to my physio in week one and again at the retest. First place that has not just told me to listen to my body.",
          name: "Dev A.",
          meta: "Return to lifting",
        },
      ],
      sourceNote:
        "These are demo testimonials written for this template, and this band deliberately carries no before-and-after photography. A live site should put its own consented client photographs here, or keep it as written testimony. Fabricated transformation grids are the most abused device in this industry and are worth nothing to a reader who has seen a hundred of them.",
    },

    {
      type: "people",
      id: "coach",
      eyebrow: "The coach",
      title: "Who you will actually train with",
      people: [
        {
          name: "Wren Bracken",
          role: "Founder and coach",
          bio: "Wren spent six years in commercial gyms watching people get sold packages nobody could follow, and opened this one to do the opposite. She writes every programme herself and caps the caseload at six so that stays possible.",
          image: {
            src: "/templates/personal-training/trainer.jpg",
            alt: "Portrait of Wren Bracken in training clothes.",
            width: 900,
            height: 1350,
          },
          credentials: [
            "NSCA Certified Strength and Conditioning Specialist",
            "Precision Nutrition Level 1",
            "Coaching since 2015",
          ],
        },
      ],
    },

    {
      type: "pricing",
      id: "pricing",
      tone: "surface",
      eyebrow: "Pricing",
      title: "Per block, not per month",
      intro: "There is no membership, no joining fee and nothing that renews on its own. You pay for a twelve week block and then decide whether to do another.",
      nameLabel: "Programme",
      priceLabel: "Per block",
      rows: [
        { name: "Consultation and assessment", detail: "Forty-five minutes. Written recommendation either way.", price: "Free" },
        { name: "Strength, one to one", detail: "24 sessions over twelve weeks.", price: "$780" },
        { name: "Strength, paired", detail: "24 sessions, priced per person.", price: "$520" },
        { name: "Return to lifting", detail: "24 sessions, with physio liaison.", price: "$840" },
        { name: "Programme only", detail: "Written plan and fortnightly video review.", price: "$260" },
        { name: "Single session", detail: "For existing clients topping up, or a one-off technique check.", price: "$55" },
      ],
      note: "Blocks can be paid in three instalments at no extra cost. If you have to stop part way through for a medical reason, the unused sessions are refunded rather than credited.",
      action: { label: "Book a consultation", href: "#book", style: "primary" },
    },

    {
      type: "faq",
      eyebrow: "Questions",
      title: "Before the consultation",
      items: [
        {
          q: "I am very unfit. Is this for me?",
          a: "Yes, and about half the people starting here are in the same position. The first three weeks are technique at light loads regardless of where you are starting from.",
        },
        {
          q: "What if I cannot make two sessions a week?",
          a: "Then this is the wrong programme and we will say so at the consultation rather than sell it to you anyway. Programme-only might suit you better.",
        },
        {
          q: "Do you do nutrition?",
          a: "Basic guidance, yes, included. Anything clinical or complicated gets referred to a dietitian we work with, because it is outside what a strength coach should be doing.",
        },
        {
          q: "Is there a contract?",
          a: "No. You buy a twelve week block. Nothing renews automatically and nobody will make you phone up to stop.",
        },
        {
          q: "What do I wear and bring?",
          a: "Anything you can move in and flat shoes. There are showers and lockers. Do not buy lifting gear before the consultation.",
        },
        {
          q: "I have an injury.",
          a: "Bring the details and any physio notes to the consultation. We will either build around it, work with your physio, or tell you honestly that you should finish rehab first.",
        },
      ],
    },

    {
      type: "location",
      id: "visit",
      eyebrow: "Find us",
      title: "Where and when",
      address: ["Bracken Strength", "3320 Larimer Street, Unit B", "Denver, CO 80205"],
      hours: [
        { days: "Monday to Thursday", time: "6am to 8pm" },
        { days: "Friday", time: "6am to 6pm" },
        { days: "Saturday", time: "8am to 1pm" },
        { days: "Sunday", time: "Closed" },
      ],
      phone: PHONE,
      email: "train@brackenstrength.example",
      mapsQuery: "3320 Larimer Street, Denver, CO 80205",
      travel: [
        "Street parking on Larimer, free after 6pm and on Saturdays.",
        "Ten minutes on foot from the 38th and Blake station.",
        "Sessions are by appointment only. This is not a drop-in gym.",
        "Showers, lockers and a changing room. Bring a padlock or borrow one.",
      ],
    },

    {
      type: "booking",
      id: "book",
      tone: "ink",
      eyebrow: "Consultation",
      title: "Start with a conversation",
      intro: "Forty-five minutes, free, and nothing is sold in the room. You leave with a written recommendation whether or not you train here.",
      fields: [
        { name: "name", label: "Your name", type: "text", required: true, half: true },
        { name: "phone", label: "Phone", type: "tel", required: true, half: true },
        { name: "email", label: "Email", type: "email", required: true, half: true },
        {
          name: "goal",
          label: "What are you after",
          type: "select",
          required: true,
          half: true,
          placeholder: "Please choose",
          options: [
            "Get stronger",
            "Come back from an injury",
            "Start from nothing",
            "Train for a specific event",
            "Not sure yet",
          ],
        },
        {
          name: "notes",
          label: "Anything we should know",
          type: "textarea",
          placeholder: "Training history, injuries, which days and times work, or what has gone wrong at other gyms.",
        },
      ],
      submitLabel: "Book the consultation",
      note: "We reply by phone within one working day. Your details are used to arrange the consultation and for nothing else.",
      aside: {
        title: "Call instead if",
        items: [
          "You are coming back from a serious injury",
          "You want to train with somebody else as a pair",
          "You would rather ask a question before booking anything",
        ],
        phone: PHONE,
      },
    },

    {
      type: "footer",
      columns: [
        {
          title: "Training",
          links: [
            { label: "Programmes", href: "#programmes" },
            { label: "How it works", href: "#how" },
            { label: "Results", href: "#results" },
            { label: "Pricing", href: "#pricing" },
          ],
        },
        {
          title: "Getting started",
          links: [
            { label: "Find us", href: "#visit" },
            { label: "Book a consultation", href: "#book" },
          ],
        },
      ],
      note: "Strength coaching is not medical treatment. If something hurts in a way that worries you, see a physiotherapist or a doctor first and we will work alongside them.",
      legal: [
        "Bracken Strength is a fictional gym created to demonstrate this template.",
        "On a live site this line carries the business registration and the coach's certification bodies.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = { practice: "Bracken Strength", templateName: "Tempo" };

import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * ENAMEL, as a working practice.
 *
 * ALDERWAY DENTAL DOES NOT EXIST. It is written for this demo, and the page
 * says so in a bar above the design that cannot be dismissed. The reviews, the
 * prices and the two dentists are all demo content. That is the arrangement
 * that lets a preview show the parts a buyer actually needs to see working
 * without breaking the studio's standing rule that no proof is ever invented:
 * fictional and labelled is honest, plausible and unlabelled is not.
 *
 * Everything below is data. Reordering the `sections` array reorders the page,
 * deleting an entry removes that band, and customizing this template for a
 * real practice is copying this file and replacing the strings. No component
 * is touched. If a change a client wants cannot be made here, that is a gap in
 * the schema and the schema is what gets fixed.
 *
 * Phone numbers use the 555 range and the email uses the reserved `.example`
 * domain, both so that nothing here can ever reach a real person.
 */

const PHONE = "(503) 555 0142";

export const config = defineTemplate({
  brand: {
    name: "Alderway Dental",
    mark: "Alderway",
    tagline: "A calm dental practice in the Pearl District, taking new patients.",
    contact: {
      phone: PHONE,
      email: "hello@alderway.example",
      address: ["218 Kestrel Street, Suite 210", "Portland, OR 97209"],
      hours: "Monday to Friday, 8am to 6pm",
    },
    social: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Google reviews", href: "https://google.com" },
    ],
  },

  theme,

  seo: {
    title: "Alderway Dental",
    description:
      "A calm dental practice in Portland taking new patients. Published prices, sedation options and appointments outside working hours.",
  },

  settings: {
    stickyAction: { label: "Book an appointment", href: "#book", style: "primary" },
  },

  sections: [
    {
      type: "nav",
      links: [
        { label: "Treatments", href: "#treatments" },
        { label: "Your first visit", href: "#first-visit" },
        { label: "Our dentists", href: "#team" },
        { label: "Fees", href: "#fees" },
        { label: "Find us", href: "#visit" },
      ],
      action: { label: "Book", href: "#book", style: "primary" },
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      // Atmosphere, not a heading. Cropped by the band on both sides, and
      // aria-hidden, so nothing here is read out or lost to a reader who
      // cannot see it.
      ghost: ["Gentle", "Modern", "Dentistry"],
      eyebrow: "Now taking new patients",
      headline: { lead: "Dentistry", main: "without the dread." },
      sub: "A small practice in the Pearl District where appointments run to time, prices are published, and nobody is made to feel bad about how long it has been.",
      actions: [
        { label: "Book an appointment", href: "#book", style: "primary" },
        { label: "See our fees", href: "#fees", style: "secondary" },
      ],
      chips: ["No referral needed", "Evening appointments on Thursdays"],
      subject: {
        src: "/templates/dental-practice/hero.jpg",
        alt: "A dental treatment room, the chair and overhead light beside a shaded window.",
        width: 1400,
        height: 2100,
      },
      seal: { ring: "Same day emergencies · Held daily", center: "New patients" },
      facts: [
        { label: "Opening hours", value: "Mon to Fri, 8am to 6pm" },
        { label: "Thursday evenings", value: "Until 8pm, by arrangement" },
        { label: "Getting here", value: "Streetcar to NW 11th, parking on Kestrel" },
        { label: "Emergencies", value: "Same-day slots held back daily" },
      ],
    },

    {
      type: "assurance",
      tone: "surface",
      title: "The things people ask before they call",
      items: [
        {
          title: "You will know the cost first",
          body: "Every treatment plan is written down and priced before anything starts. Nothing is added at the chair.",
        },
        {
          title: "Nervous is normal here",
          body: "Roughly half our patients tell us they have put this off. Say so when you book and we plan the appointment around it.",
        },
        {
          title: "Appointments run to time",
          body: "We book longer slots than most practices do, which is why we are rarely running late by the afternoon.",
        },
        {
          title: "One dentist, start to finish",
          body: "You see the same person each visit. Your notes are not handed between four people in a year.",
        },
      ],
    },

    {
      type: "serviceMenu",
      id: "treatments",
      eyebrow: "Treatments",
      title: "What we do, and what it costs",
      intro: "Prices are the starting point for a straightforward case. If yours is not straightforward we will say so, in writing, before you agree to anything.",
      layout: "menu",
      groups: [
        {
          name: "Routine care",
          items: [
            {
              name: "New patient examination",
              body: "Forty minutes. A full assessment, x-rays if they are needed, and a written plan you take away.",
              price: "$95",
            },
            {
              name: "Check-up and hygiene visit",
              body: "The standard six-month appointment, with the hygienist in the same visit where possible.",
              price: "$140",
            },
            {
              name: "Emergency appointment",
              body: "Held back daily. Pain assessed and settled the same day, with the fix planned separately.",
              price: "$110",
            },
          ],
        },
        {
          name: "Restorative",
          items: [
            {
              name: "White filling",
              body: "Composite, colour matched. Most take under an hour.",
              price: "$185",
              meta: "per filling",
            },
            {
              name: "Crown",
              body: "Two visits, with a temporary crown in between. Porcelain or zirconia.",
              price: "$980",
            },
            {
              name: "Root canal treatment",
              body: "Usually one long appointment rather than three short ones.",
              price: "$720",
              meta: "front teeth from",
            },
          ],
        },
        {
          name: "Cosmetic",
          items: [
            {
              name: "Take-home whitening",
              body: "Custom trays and a fortnight of gel. Reviewed at the end.",
              price: "$390",
            },
            {
              name: "Clear aligners",
              body: "Assessment, scan and a printed simulation before you commit to anything.",
              price: "$2,900",
              meta: "full course from",
            },
          ],
        },
      ],
      note: "Fees are reviewed each January and the current list is always the one on this page. Payment plans are available over six or twelve months at no extra cost.",
      action: { label: "Book an examination", href: "#book", style: "primary" },
    },

    {
      type: "steps",
      id: "first-visit",
      tone: "surface",
      eyebrow: "Your first visit",
      title: "What actually happens",
      intro: "Written out in full, because not knowing is most of what makes people put this off.",
      steps: [
        {
          title: "You tell us what you are worried about",
          body: "Before anything else, sitting up, in a normal chair, in a normal room. If you would rather write it down beforehand, the booking form has a space for that.",
        },
        {
          title: "We look, and we explain what we see",
          body: "The examination takes about forty minutes. We show you the x-rays on the screen and describe what is there in plain words rather than in tooth numbers.",
        },
        {
          title: "You get a written plan and a price",
          body: "Every option, what each one costs, and what happens if you do nothing for now. You take it home. Nothing is booked at that appointment unless you ask.",
        },
        {
          title: "You decide what happens next",
          body: "If you want to think about it, that is a normal outcome and nobody will chase you. If you want to start, we will book the time that suits the treatment rather than the diary.",
        },
      ],
      aside: {
        title: "If you are dreading it",
        body: "Tell us when you book and we will give you a longer, quieter appointment, usually first thing. We can stop at any point, we will explain before we do anything, and sedation is available for treatment if you would prefer it. Coming in just to look at the room and meet the dentist is a normal thing to book, and there is no charge for it.",
        image: {
          src: "/templates/dental-practice/interior.jpg",
          alt: "The practice interior, with an open shelf of framed photographs beside the treatment chair.",
          width: 1400,
          height: 2100,
        },
      },
    },

    {
      type: "people",
      id: "team",
      eyebrow: "Our dentists",
      title: "You will see the same person each time",
      people: [
        {
          name: "Dr Nadia Okonjo",
          role: "Principal dentist",
          bio: "Nadia opened Alderway after eleven years in a large group practice, mostly because she wanted to book appointments that were long enough. She takes most of the restorative work.",
          image: {
            src: "/templates/dental-practice/team-nadia.jpg",
            alt: "Dr Nadia Okonjo, in her white coat in the practice.",
            width: 900,
            height: 1349,
          },
          credentials: [
            "DMD, Oregon Health and Science University",
            "Member, Academy of General Dentistry",
          ],
        },
        {
          name: "Dr Marcus Feltrin",
          role: "Dentist",
          bio: "Marcus does the practice's aligner and whitening work and looks after most of the nervous patients, which he says is the part of the job he is best at.",
          image: {
            src: "/templates/dental-practice/team-marcus.jpg",
            alt: "Dr Marcus Feltrin, seated beside the chair in his treatment room.",
            width: 1100,
            height: 733,
          },
          credentials: ["DDS, University of Washington", "Certified in conscious sedation"],
        },
        {
          name: "Priya Raman",
          role: "Hygienist",
          bio: "Priya runs the hygiene appointments and the gum health programme, and is the person most patients end up seeing the most.",
          image: {
            src: "/templates/dental-practice/team-priya.jpg",
            alt: "Priya Raman, in scrubs in the practice corridor.",
            width: 900,
            height: 1350,
          },
          credentials: ["RDH, Portland Community College"],
        },
        {
          name: "Tom Vasquez",
          role: "Practice manager",
          bio: "Tom answers the phone, handles the insurance paperwork and sorts out payment plans. If you have a question about money, he is the one to ask.",
          image: {
            src: "/templates/dental-practice/team-tom.jpg",
            alt: "Tom Vasquez, the practice manager, holding a folder.",
            width: 900,
            height: 1350,
          },
          credentials: [],
        },
      ],
    },

    {
      type: "pricing",
      id: "fees",
      tone: "surface",
      eyebrow: "Fees",
      title: "Published, not quoted",
      intro: "The most common appointments and what they cost. Anything more involved is priced in writing after an examination.",
      nameLabel: "Appointment",
      priceLabel: "From",
      rows: [
        {
          name: "New patient examination",
          detail: "Forty minutes, including x-rays where they are needed and a written plan.",
          price: "$95",
        },
        {
          name: "Check-up and hygiene visit",
          detail: "The routine six-month appointment.",
          price: "$140",
        },
        {
          name: "Emergency appointment",
          detail: "Same day. Pain assessed and settled.",
          price: "$110",
        },
        { name: "White filling", detail: "Composite, colour matched.", price: "$185" },
        { name: "Crown", detail: "Two visits, temporary crown in between.", price: "$980" },
        {
          name: "Take-home whitening",
          detail: "Custom trays, gel, and a review at the end.",
          price: "$390",
        },
      ],
      note: "We are in network with most major plans and will check yours before your first appointment rather than after it. Payment plans over six or twelve months carry no interest and no fee.",
      action: { label: "Ask about a specific treatment", href: "#book", style: "secondary" },
    },

    {
      type: "reviews",
      eyebrow: "Patients",
      title: "What people say afterwards",
      items: [
        {
          quote:
            "I had not been to a dentist in nine years and I was fully expecting a lecture. I got a cup of tea and a plan instead.",
          name: "Rebecca H.",
          meta: "Patient since 2023",
        },
        {
          quote:
            "The price they wrote down at the start was the price on the invoice at the end. That has not been my experience anywhere else.",
          name: "Daniel O.",
          meta: "Crown and two fillings",
        },
        {
          quote:
            "My daughter is autistic and sound sensitive. They let us come in twice just to sit in the room before anything happened.",
          name: "Sam T.",
          meta: "Parent of a patient",
        },
      ],
      sourceNote:
        "These reviews are demo content written for this template. On a live site this line names the platform the reviews were collected on and links to the profile they came from.",
    },

    {
      type: "faq",
      tone: "surface",
      eyebrow: "Questions",
      title: "Things worth knowing before you book",
      items: [
        {
          q: "Are you taking new patients?",
          a: "Yes, for both routine care and emergencies. There is no waiting list at the moment and the first available examination is usually within two weeks.",
        },
        {
          q: "Do you take my insurance?",
          a: "We are in network with most major plans. Tell us which one you are on when you book and we will confirm your cover before the appointment rather than surprise you afterwards.",
        },
        {
          q: "What if I am in pain right now?",
          a: "Call rather than use the form. We hold emergency slots back every day and the aim is to see you the same day and settle the pain, with the longer term fix planned separately.",
        },
        {
          q: "Can I be sedated?",
          a: "Yes, for treatment. Conscious sedation is available and one of our dentists is certified in it. You will need somebody to take you home afterwards.",
        },
        {
          q: "Do you see children?",
          a: "Yes, from their first tooth onwards. First visits for young children are short, free of charge, and mostly about them meeting us.",
        },
        {
          q: "What happens if I need to cancel?",
          a: "Let us know a full working day ahead and there is no charge. Anything shorter than that and we ask for half the appointment fee, because that time is now unused.",
        },
      ],
    },

    {
      type: "location",
      id: "visit",
      eyebrow: "Find us",
      title: "Where and when",
      address: ["Alderway Dental", "218 Kestrel Street, Suite 210", "Portland, OR 97209"],
      hours: [
        { days: "Monday to Wednesday", time: "8am to 6pm" },
        { days: "Thursday", time: "8am to 8pm" },
        { days: "Friday", time: "8am to 4pm" },
        { days: "Saturday and Sunday", time: "Closed" },
      ],
      phone: PHONE,
      email: "hello@alderway.example",
      mapsQuery: "218 Kestrel Street, Portland, OR 97209",
      travel: [
        "Streetcar to NW 11th and Kestrel, one block east.",
        "Metered parking on Kestrel Street, free after 6pm.",
        "Step-free from the street, with a lift to the second floor.",
        "Bike parking in the courtyard behind the building.",
      ],
      image: {
        src: "/templates/dental-practice/reception.jpg",
        alt: "The reception desk at the practice, looking through to the treatment rooms.",
        width: 1400,
        height: 933,
      },
    },

    {
      type: "booking",
      id: "book",
      tone: "ink",
      ghost: ["A calmer visit"],
      eyebrow: "Book",
      title: "Ask for an appointment",
      intro: "Tell us roughly what you need and when suits, and we will come back with two or three times to choose from. Usually the same working day.",
      fields: [
        { name: "name", label: "Your name", type: "text", required: true, half: true },
        { name: "phone", label: "Phone", type: "tel", required: true, half: true },
        { name: "email", label: "Email", type: "email", required: true, half: true },
        {
          name: "reason",
          label: "What do you need",
          type: "select",
          required: true,
          half: true,
          placeholder: "Please choose",
          options: [
            "New patient examination",
            "Check-up and hygiene",
            "I am in pain",
            "Whitening or aligners",
            "Something else",
          ],
        },
        {
          name: "notes",
          label: "Anything we should know",
          type: "textarea",
          placeholder: "Times that suit, insurance plan, or anything you are worried about.",
        },
      ],
      submitLabel: "Request an appointment",
      note: "We reply by phone unless you tell us otherwise. Your details are used to arrange the appointment and nothing else.",
      aside: {
        title: "Or just call us",
        items: [
          "In pain today, or not sure this is urgent",
          "Booking for somebody who would rather not fill in a form",
          "Checking whether your insurance is in network",
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
            { label: "Treatments", href: "#treatments" },
            { label: "Your first visit", href: "#first-visit" },
            { label: "Our dentists", href: "#team" },
            { label: "Fees", href: "#fees" },
          ],
        },
        {
          title: "Visiting",
          links: [
            { label: "Find us", href: "#visit" },
            { label: "Book an appointment", href: "#book" },
          ],
        },
      ],
      note: "If you are in pain outside our opening hours, call the practice number and the answerphone will give you the out-of-hours service.",
      legal: [
        "Alderway Dental is a fictional practice created to demonstrate this template.",
        "On a live site this line carries the practice registration and the regulator it answers to.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = { practice: "Alderway Dental", templateName: "Enamel" };

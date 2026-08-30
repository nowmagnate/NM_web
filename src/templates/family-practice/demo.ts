import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * ELM, as a working practice.
 *
 * MARLOW FAMILY PRACTICE DOES NOT EXIST. Same arrangement as every other
 * preview in this catalog: openly fictional, labelled as such in a bar above
 * the design that cannot be dismissed, so the demo can show the reviews and
 * the named doctors a real buyer needs to see working without the studio
 * inventing proof.
 *
 * Phone numbers are in the 555 range and the email uses the reserved
 * `.example` domain, so nothing here can reach a real person. No real insurer
 * is named anywhere: putting a live company's brand on a fictional practice is
 * the same problem as putting a real practice's logo in the photography, and
 * it is why the insurance band lists plan TYPES instead.
 */

const PHONE = "(608) 555 0173";

export const config = defineTemplate({
  brand: {
    name: "Marlow Family Practice",
    mark: "Marlow",
    tagline: "A family practice on the near west side, taking new patients.",
    contact: {
      phone: PHONE,
      email: "reception@marlowpractice.example",
      address: ["1140 Chandler Street", "Madison, WI 53715"],
      hours: "Monday to Friday, 8am to 5.30pm",
    },
    social: [],
  },

  theme,

  seo: {
    title: "Marlow Family Practice",
    description:
      "A family practice in Madison taking new patients. Same-day sick visits, four doctors, and registration you can finish in one sitting.",
  },

  settings: {
    stickyAction: { label: "Register as a patient", href: "#register", style: "primary" },
  },

  sections: [
    {
      type: "nav",
      links: [
        { label: "Services", href: "#services" },
        { label: "Our doctors", href: "#doctors" },
        { label: "New patients", href: "#new-patients" },
        { label: "Insurance", href: "#insurance" },
        { label: "Find us", href: "#visit" },
      ],
      action: { label: "Register", href: "#register", style: "primary" },
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      // Centred, not offset. Enamel uses the offset composition and sits in
      // the same catalog category; sharing the arrangement as well as the
      // section order is what makes two templates read as one.
      layout: "centred",
      // One line rather than a stack, so it crops symmetrically either side.
      ghost: ["Family Medicine"],
      eyebrow: "Accepting new patients",
      headline: { lead: "The same doctor,", main: "year after year." },
      sub: "A four-doctor practice on the near west side. You are assigned one of us and you keep them, which is the whole reason people move here from the big groups.",
      actions: [
        { label: "Register as a patient", href: "#register", style: "primary" },
        { label: "See our services", href: "#services", style: "secondary" },
      ],
      chips: ["Same-day sick visits", "Most PPO plans accepted"],
      subject: {
        src: "/templates/family-practice/hero.jpg",
        alt: "A consulting room at Marlow, with an examination couch, a desk and daylight through a blind.",
        width: 1400,
        height: 1902,
      },
      // No seal. Enamel carries one, and a rotating stamp in both heroes is a
      // shared signature detail rather than a distinguishing one.
      facts: [
        { label: "Opening hours", value: "Mon to Fri, 8am to 5.30pm" },
        { label: "Same-day visits", value: "Call before 10am for a slot that day" },
        { label: "Getting here", value: "Parking behind the building on Ash Lane" },
        { label: "Out of hours", value: "Answerphone gives the on-call number" },
      ],
    },

    {
      type: "assurance",
      tone: "surface",
      title: "What is different about a practice this size",
      items: [
        {
          title: "You are assigned one doctor",
          body: "Not a pool. The person who saw you last year has your notes in their head as well as on the screen.",
        },
        {
          title: "Same-day slots are real",
          body: "We hold a block back every morning. If you call before ten and you are sick, you are seen that day.",
        },
        {
          title: "Registration takes one sitting",
          body: "One form, no in-person appointment to be added to the list, and we confirm within two working days.",
        },
        {
          title: "We tell you what it costs",
          body: "Self-pay rates are published on this page. If you are insured we check your plan before your first visit.",
        },
      ],
    },

    {
      type: "serviceMenu",
      id: "services",
      eyebrow: "Services",
      title: "What we look after",
      intro: "General family medicine for every age, plus the routine things people otherwise end up at urgent care for.",
      layout: "menu",
      groups: [
        {
          name: "Everyday care",
          items: [
            {
              name: "Annual wellness visit",
              body: "A long appointment once a year. Bloods beforehand where they are useful, so the results are in front of us on the day.",
              meta: "Covered by most plans",
            },
            {
              name: "Same-day sick visit",
              body: "Coughs, infections, rashes, sprains, anything that has come on this week.",
              meta: "Call before 10am",
            },
            {
              name: "Chronic condition reviews",
              body: "Blood pressure, diabetes, thyroid, asthma. Booked as a series so you are not chasing the next appointment.",
              meta: "Every three or six months",
            },
          ],
        },
        {
          name: "Children and families",
          items: [
            {
              name: "Well-child visits",
              body: "From the first weeks through to school age, on the standard schedule.",
              meta: "Covered by most plans",
            },
            {
              name: "Immunisations",
              body: "Routine childhood schedule, plus flu and travel vaccines for adults.",
            },
            {
              name: "School and sports physicals",
              body: "Booked in August and September without taking a wellness slot.",
              meta: "Self-pay $60",
            },
          ],
        },
        {
          name: "In the office",
          items: [
            {
              name: "Bloods and lab work",
              body: "Drawn here rather than sent across town. Most results back within two days.",
            },
            {
              name: "Minor procedures",
              body: "Skin lesions, ingrown nails, joint injections, stitches.",
            },
            {
              name: "Referrals",
              body: "We write to a named person rather than a department, and we tell you who and why.",
            },
          ],
        },
      ],
      note: "If you are unwell today and not yet registered with us, call rather than use the form. We will see you and sort the paperwork afterwards.",
      action: { label: "Register as a patient", href: "#register", style: "primary" },
    },

    {
      type: "people",
      id: "doctors",
      tone: "surface",
      eyebrow: "Our doctors",
      title: "Three doctors and a nurse practitioner",
      intro: "You are assigned one of us when you register, and you can ask for a different one at any point without explaining why.",
      people: [
        {
          name: "Dr Amara Sedillo",
          role: "Family physician",
          bio: "Amara founded the practice in 2009 after eleven years in a hospital group. She takes most of the chronic condition work and all of the joint injections.",
          image: {
            src: "/templates/family-practice/doctor-1.jpg",
            alt: "Portrait of Dr Amara Sedillo in a white coat.",
            width: 900,
            height: 1350,
          },
          credentials: ["MD, University of Wisconsin", "Board certified in Family Medicine"],
        },
        {
          name: "Dr Wren Halloway",
          role: "Family physician",
          bio: "Wren looks after most of the practice's children and runs the immunisation clinics. He is the one to ask for if somebody in the house is anxious about needles.",
          image: {
            src: "/templates/family-practice/doctor-2.jpg",
            alt: "Portrait of Dr Wren Halloway in a white coat.",
            width: 900,
            height: 1350,
          },
          credentials: ["MD, Rush Medical College", "Board certified in Family Medicine"],
        },
        {
          name: "Dr Ines Karabo",
          role: "Family physician",
          bio: "Ines joined in 2019 and holds the majority of the same-day list, which means she is the doctor most people meet first.",
          image: {
            src: "/templates/family-practice/doctor-3.jpg",
            alt: "Portrait of Dr Ines Karabo in a white coat.",
            width: 900,
            height: 1350,
          },
          credentials: ["MD, Michigan State University", "Certificate in Womens Health"],
        },
      ],
    },

    {
      type: "steps",
      id: "new-patients",
      eyebrow: "New patients",
      title: "Registering, start to finish",
      intro: "Four steps and no appointment needed to complete any of them. Most people are done in a single sitting.",
      steps: [
        {
          title: "Send the form on this page",
          body: "Name, date of birth, your insurance plan if you have one, and which doctor you would prefer. That is all we need to start.",
        },
        {
          title: "We confirm within two working days",
          body: "By phone unless you ask otherwise. If we cannot take you for any reason you will hear that in the same call rather than by silence.",
        },
        {
          title: "We request your records",
          body: "You sign one release and we chase your previous practice. You do not need to collect anything yourself.",
        },
        {
          title: "You book your first visit",
          body: "A long appointment, so there is time to go through your history properly rather than starting from a blank screen.",
        },
      ],
      aside: {
        title: "If you are unwell right now",
        body: "Call the practice rather than filling in the form. We keep same-day slots for people who are not yet registered as well as for people who are, and we will do the paperwork after you have been seen. If it is outside opening hours the answerphone gives you the on-call number, and if it is an emergency call 911.",
        image: {
          src: "/templates/family-practice/registering.jpg",
          alt: "A doctor at a desk in a consulting room at Marlow.",
          width: 1400,
          height: 788,
        },
      },
    },

    {
      type: "checklist",
      id: "insurance",
      tone: "wash",
      eyebrow: "Insurance and fees",
      title: "What we take, and what it costs without it",
      intro: "We check your plan before your first visit rather than after it, so a surprise bill is not the way you find out we are out of network.",
      columns: [
        {
          name: "Plans we accept",
          items: [
            "Most PPO plans",
            "Most HMO plans where we are listed as a primary care provider",
            "Medicare Part B",
            "State Medicaid",
            "Employer plans through the state exchange",
          ],
        },
        {
          name: "Self-pay rates",
          items: [
            "New patient visit, $150",
            "Established patient visit, $95",
            "Annual wellness visit, $210",
            "School or sports physical, $60",
            "Lab work billed at cost, itemised",
          ],
        },
        {
          name: "Bring to your first visit",
          items: [
            "Photo identification",
            "Your insurance card, if you have one",
            "A list of everything you currently take, including supplements",
            "The name and address of your previous practice",
          ],
        },
      ],
      note: "We do not name individual insurers on this page because plan networks change every year and a list that is out of date is worse than no list. Call with your plan name and we will tell you the same day.",
      action: { label: "Ask about your plan", href: "#register", style: "secondary" },
    },

    {
      type: "reviews",
      eyebrow: "Patients",
      title: "What people say",
      items: [
        {
          quote:
            "I called at half past eight with a chest infection and I was seen at eleven. That has not been my experience of primary care in fifteen years.",
          name: "Marisol V.",
          meta: "Patient since 2021",
        },
        {
          quote:
            "They moved my mother across from her old practice and chased every record themselves. She did not have to make a single phone call.",
          name: "Peter L.",
          meta: "Family of a patient",
        },
        {
          quote:
            "Same doctor for six years. She remembers my kids' names. I did not realise how much I missed that until I had it back.",
          name: "Danielle R.",
          meta: "Patient since 2019",
        },
      ],
      sourceNote:
        "These reviews are demo content written for this template. On a live site this line names the platform the reviews were collected on and links to the profile they came from.",
    },

    {
      type: "faq",
      tone: "surface",
      eyebrow: "Questions",
      title: "Before you register",
      items: [
        {
          q: "Are you actually taking new patients?",
          a: "Yes, all four of us, and there is no waiting list at the moment. If that changes this page changes with it rather than leaving you to find out after you have sent a form.",
        },
        {
          q: "Can I choose which doctor I see?",
          a: "Yes. Tell us who you would prefer when you register. You can change later without giving a reason, and it will not be treated as a complaint.",
        },
        {
          q: "How quickly can I be seen if I am sick?",
          a: "Same day, if you call before ten in the morning. We hold a block of appointments back for exactly this and we do not release them for routine bookings.",
        },
        {
          q: "Do you see children?",
          a: "Yes, from the first weeks onwards. Well-child visits, immunisations and school physicals are all done here.",
        },
        {
          q: "What happens outside opening hours?",
          a: "The practice answerphone gives you the on-call number. For anything life threatening call 911 rather than the practice.",
        },
        {
          q: "Can you take over my prescriptions?",
          a: "Yes, once your records arrive. Bring a full list of what you take to your first visit, including anything you buy over the counter, and we will move them across.",
        },
      ],
    },

    {
      type: "location",
      id: "visit",
      eyebrow: "Find us",
      title: "Where and when",
      address: ["Marlow Family Practice", "1140 Chandler Street", "Madison, WI 53715"],
      hours: [
        { days: "Monday to Thursday", time: "8am to 5.30pm" },
        { days: "Friday", time: "8am to 4pm" },
        { days: "Saturday", time: "Closed" },
        { days: "Sunday", time: "Closed" },
      ],
      phone: PHONE,
      email: "reception@marlowpractice.example",
      mapsQuery: "1140 Chandler Street, Madison, WI 53715",
      travel: [
        "Patient parking behind the building, entrance on Ash Lane.",
        "Two blocks from the Chandler Street bus stop.",
        "Step-free throughout, with an accessible restroom on the ground floor.",
        "Bike racks under cover by the rear door.",
      ],
      image: {
        src: "/templates/family-practice/rooms.jpg",
        alt: "A consulting room at Marlow with a desk and two chairs.",
        width: 1400,
        height: 933,
      },
    },

    {
      type: "booking",
      id: "register",
      tone: "ink",
      ghost: ["One sitting"],
      eyebrow: "Register",
      title: "Join the practice",
      intro: "Send this and we will come back within two working days to confirm, request your records and book your first visit.",
      fields: [
        { name: "name", label: "Your name", type: "text", required: true, half: true },
        { name: "dob", label: "Date of birth", type: "date", required: true, half: true },
        { name: "phone", label: "Phone", type: "tel", required: true, half: true },
        { name: "email", label: "Email", type: "email", required: true, half: true },
        {
          name: "doctor",
          label: "Preferred doctor",
          type: "select",
          half: true,
          placeholder: "No preference",
          options: [
            "No preference",
            "Dr Amara Sedillo",
            "Dr Wren Halloway",
            "Dr Ines Karabo",
          ],
        },
        {
          name: "insurance",
          label: "Insurance plan",
          type: "text",
          half: true,
          placeholder: "Plan name, or self-pay",
        },
        {
          name: "notes",
          label: "Anything we should know",
          type: "textarea",
          placeholder: "Ongoing conditions, your previous practice, or anything you would rather tell us before the first visit.",
        },
      ],
      submitLabel: "Send registration",
      note: "We reply by phone unless you ask otherwise. Your details are used to register you with the practice and for nothing else.",
      aside: {
        title: "Call instead if",
        items: [
          "You are unwell today and need to be seen",
          "You are registering somebody who would rather not use a form",
          "You want your plan checked before you commit to anything",
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
            { label: "Services", href: "#services" },
            { label: "Our doctors", href: "#doctors" },
            { label: "New patients", href: "#new-patients" },
            { label: "Insurance and fees", href: "#insurance" },
          ],
        },
        {
          title: "Visiting",
          links: [
            { label: "Find us", href: "#visit" },
            { label: "Register", href: "#register" },
          ],
        },
      ],
      note: "If you need medical help outside opening hours, call the practice number and the answerphone will give you the on-call service. For anything life threatening, call 911.",
      legal: [
        "Marlow Family Practice is a fictional practice created to demonstrate this template.",
        "On a live site this line carries the practice registration and the regulator it answers to.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = { practice: "Marlow Family Practice", templateName: "Elm" };

import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * ASANA, as a working studio.
 *
 * FIELDNOTE YOGA DOES NOT EXIST. Fictional, and labelled as such in a bar
 * above the design that cannot be dismissed.
 *
 * THE TIMETABLE IS THE SWAPPABLE SLOT DOING ITS JOB. `serviceMenu` renders a
 * dentist's treatment list on Enamel and a physiotherapist's condition index on
 * Fulcrum; here the same component with days as groups and times as prices is a
 * class timetable. That is the whole argument for grouping eight templates
 * under one archetype: they are not similar businesses, they are the same
 * SHAPE of decision, and the shape is what gets built once.
 *
 * TWO TEACHERS, NOT SIX. Same reason as Fulcrum: that is what the photography
 * honestly supported without assembling a row out of mismatched shoots. Two
 * named teachers is a normal size for a single-room studio, and a fictional
 * studio claiming a faculty of six it cannot show is exactly the kind of
 * padding this catalog is meant to avoid.
 */

const PHONE = "(512) 555 0136";

export const config = defineTemplate({
  brand: {
    name: "Fieldnote Yoga",
    mark: "Fieldnote",
    tagline: "A small yoga and pilates studio in east Austin.",
    contact: {
      phone: PHONE,
      email: "hello@fieldnoteyoga.example",
      address: ["914 Cedar Bend Road", "Austin, TX 78702"],
      hours: "Classes seven days a week",
    },
    social: [{ label: "Instagram", href: "https://instagram.com" }],
  },

  theme,

  seo: {
    title: "Fieldnote Yoga",
    description:
      "A small yoga and pilates studio in east Austin. Two weeks unlimited for $30, twelve people to a class, and no membership to cancel.",
  },

  settings: {
    stickyAction: { label: "Book a class", href: "#book", style: "primary" },
  },

  sections: [
    {
      type: "nav",
      links: [
        { label: "Timetable", href: "#timetable" },
        { label: "Classes", href: "#classes" },
        { label: "Teachers", href: "#teachers" },
        { label: "Pricing", href: "#pricing" },
        { label: "Find us", href: "#visit" },
      ],
      action: { label: "Book", href: "#book", style: "primary" },
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      layout: "banner",
      ghost: ["Begin again"],
      eyebrow: "Two weeks unlimited, $30",
      headline: { lead: "Twelve mats.", main: "One teacher watching." },
      sub: "A single-room studio in east Austin. Classes are capped at twelve so somebody actually corrects your shoulder, and there is no membership to cancel.",
      actions: [
        { label: "Start the intro offer", href: "#book", style: "primary" },
        { label: "See the timetable", href: "#timetable", style: "secondary" },
      ],
      chips: ["No membership", "Mats and props provided"],
      subject: {
        src: "/templates/yoga-pilates-studio/hero.jpg",
        alt: "A class standing in a backbend in a bright studio with a painted geometric wall.",
        width: 1600,
        height: 900,
      },
      seal: { ring: "Two weeks unlimited · Thirty dollars", center: "Intro offer" },
      facts: [
        { label: "Class size", value: "Capped at twelve" },
        { label: "First class", value: "Free, any weekday at noon" },
        { label: "What to bring", value: "Nothing, we have mats and props" },
        { label: "Parking", value: "Free lot behind the building" },
      ],
    },

    {
      type: "assurance",
      tone: "surface",
      title: "What a small studio can do that a big one cannot",
      items: [
        {
          title: "The teacher knows your name",
          body: "And your knee, and that you are working on a bind. Twelve people is small enough to teach rather than lead.",
        },
        {
          title: "Nothing to cancel",
          body: "Class packs and a monthly pass you can stop any time from your own account. Nobody has to phone anybody.",
        },
        {
          title: "Beginners are not an afterthought",
          body: "Four classes a week are genuinely for people who have never done this. Not gentle versions of hard classes.",
        },
        {
          title: "We tell you what the class actually is",
          body: "Heat, pace and level for every slot on the timetable, so you never walk into the wrong room.",
        },
      ],
    },

    {
      type: "serviceMenu",
      id: "timetable",
      eyebrow: "Timetable",
      title: "This week",
      intro: "Booking opens seven days ahead. Anything with space still on it can be booked up to fifteen minutes before it starts.",
      layout: "menu",
      groups: [
        {
          name: "Monday and Wednesday",
          items: [
            { name: "Slow Flow", body: "Level 1 to 2. Unheated.", price: "6.30am", meta: "60 min" },
            { name: "Beginners Yoga", body: "Level 1. Everything named and explained.", price: "12.00pm", meta: "45 min" },
            { name: "Mat Pilates", body: "All levels. Strong core focus.", price: "5.45pm", meta: "50 min" },
            { name: "Vinyasa", body: "Level 2 to 3. Warm room.", price: "7.00pm", meta: "75 min" },
          ],
        },
        {
          name: "Tuesday and Thursday",
          items: [
            { name: "Mat Pilates", body: "All levels.", price: "6.30am", meta: "50 min" },
            { name: "Beginners Yoga", body: "Level 1.", price: "12.00pm", meta: "45 min" },
            { name: "Restorative", body: "All levels. Props, bolsters, very slow.", price: "5.45pm", meta: "60 min" },
            { name: "Strength and Flow", body: "Level 2. Weights for part of the class.", price: "7.00pm", meta: "60 min" },
          ],
        },
        {
          name: "Friday",
          items: [
            { name: "Slow Flow", body: "Level 1 to 2. Unheated.", price: "7.00am", meta: "60 min" },
            { name: "Beginners Yoga", body: "Level 1.", price: "12.00pm", meta: "45 min" },
            { name: "Wind Down", body: "All levels. Lights low, no music after the first ten minutes.", price: "5.45pm", meta: "60 min" },
          ],
        },
        {
          name: "Saturday and Sunday",
          items: [
            { name: "Vinyasa", body: "Level 2 to 3. Warm room.", price: "8.30am", meta: "75 min" },
            { name: "Beginners Yoga", body: "Level 1. The busiest beginner slot of the week.", price: "10.00am", meta: "60 min" },
            { name: "Mat Pilates", body: "All levels.", price: "11.30am", meta: "50 min" },
            { name: "Restorative", body: "All levels. Sunday only.", price: "4.00pm", meta: "60 min" },
          ],
        },
      ],
      note: "Free cancellation up to two hours before. Later than that and the class comes off your pack, because somebody on the waiting list could have taken it.",
      action: { label: "Book a class", href: "#book", style: "primary" },
    },

    {
      type: "serviceMenu",
      id: "classes",
      eyebrow: "Classes",
      title: "What each one actually is",
      intro: "Written plainly rather than in Sanskrit, because the point of this page is that you can choose correctly the first time.",
      layout: "cards",
      groups: [
        {
          items: [
            {
              name: "Beginners Yoga",
              body: "Every pose named, shown and adjusted. Nobody is expected to know anything. If you have never done a class before, start here.",
              meta: "Level 1 · Unheated",
            },
            {
              name: "Slow Flow",
              body: "Linked movement at a pace you can breathe through. The most popular class for people coming back after a break.",
              meta: "Level 1 to 2 · Unheated",
            },
            {
              name: "Vinyasa",
              body: "Faster, warmer, and continuous. Inversions offered but never expected. Come to two Slow Flows first.",
              meta: "Level 2 to 3 · Warm room",
            },
            {
              name: "Mat Pilates",
              body: "Core, glutes and control. No machines, no reformer, and considerably harder than it looks written down.",
              meta: "All levels · Unheated",
            },
            {
              name: "Strength and Flow",
              body: "Yoga shapes with light weights for the middle third. Good for anybody who lifts and cannot touch their toes.",
              meta: "Level 2 · Unheated",
            },
            {
              name: "Restorative and Wind Down",
              body: "Four or five shapes held for minutes at a time with bolsters and blankets. Falling asleep is a normal outcome.",
              meta: "All levels · Warm room",
            },
          ],
        },
      ],
    },

    {
      type: "people",
      id: "teachers",
      tone: "surface",
      eyebrow: "Teachers",
      title: "Two of us, and we teach everything",
      intro: "Small enough that you will get to know both, and small enough that we know who is nursing a shoulder this month.",
      people: [
        {
          name: "Marit Halden",
          role: "Founder, yoga",
          bio: "Marit opened Fieldnote in 2018 after eight years teaching in larger studios and getting steadily more frustrated by classes of forty. She teaches most of the Slow Flow and Vinyasa slots.",
          image: {
            src: "/templates/yoga-pilates-studio/teacher-1.jpg",
            alt: "Portrait of Marit Halden standing beside a rolled yoga mat.",
            width: 900,
            height: 1350,
          },
          credentials: ["500 hour Yoga Alliance certified", "Teaching since 2010"],
        },
        {
          name: "Josefin Aro",
          role: "Pilates and strength",
          bio: "Josefin came to pilates through rehabilitation after a cycling injury and teaches it the way she was taught, which is slowly and with a great deal of attention to what your ribs are doing.",
          image: {
            src: "/templates/yoga-pilates-studio/teacher-2.jpg",
            alt: "Portrait of Josefin Aro in the studio.",
            width: 900,
            height: 1350,
          },
          credentials: ["Comprehensive mat pilates certification", "Teaching since 2016"],
        },
      ],
    },

    {
      type: "pricing",
      id: "pricing",
      eyebrow: "Pricing",
      title: "Packs and a pass, no contract",
      intro: "Nothing here auto-renews into something you have to phone up to escape.",
      nameLabel: "Option",
      priceLabel: "Price",
      rows: [
        {
          name: "First class",
          detail: "Any weekday noon class. No card required.",
          price: "Free",
        },
        {
          name: "Two weeks unlimited",
          detail: "The intro offer. Once per person, any class on the timetable.",
          price: "$30",
        },
        { name: "Single class", detail: "Drop in, book up to fifteen minutes before.", price: "$22" },
        { name: "Five class pack", detail: "Valid three months.", price: "$95" },
        { name: "Ten class pack", detail: "Valid six months.", price: "$170" },
        {
          name: "Monthly pass",
          detail: "Unlimited classes. Stop it yourself from your account, any time.",
          price: "$135",
        },
      ],
      note: "Packs are shareable with one other person at the same address, which nobody else in town does and which we keep being asked about. Concessions of twenty per cent for students, teachers and over sixty-fives.",
      action: { label: "Start the intro offer", href: "#book", style: "primary" },
    },

    {
      type: "reviews",
      eyebrow: "Students",
      title: "What people say",
      items: [
        {
          quote:
            "I had done exactly one yoga class in my life and hated it. The noon beginners class named every single pose and nobody looked at me. I have been twice a week since March.",
          name: "Devon R.",
          meta: "Beginners Yoga",
        },
        {
          quote:
            "Twelve mats means the teacher actually comes over. In my old studio I was one of forty and could have been doing it wrong for a year.",
          name: "Priya N.",
          meta: "Slow Flow and Pilates",
        },
        {
          quote:
            "I cancelled the monthly pass from my phone in about four seconds when work got busy, and restarted it two months later. That is the whole reason I came back.",
          name: "Tomas E.",
          meta: "Monthly pass",
        },
      ],
      sourceNote:
        "These reviews are demo content written for this template. On a live site this line names the platform the reviews were collected on and links to the profile they came from.",
    },

    {
      type: "faq",
      tone: "surface",
      eyebrow: "Questions",
      title: "If you have never been",
      items: [
        {
          q: "I have never done yoga. Which class?",
          a: "Beginners Yoga, at noon on a weekday if you can. It is the quietest slot, it is 45 minutes rather than an hour, and your first one is free.",
        },
        {
          q: "Do I need to bring anything?",
          a: "No. Mats, blocks, straps, bolsters and blankets are all here and all cleaned between classes. Bring water if you want it.",
        },
        {
          q: "What if I cannot touch my toes?",
          a: "Almost nobody in the beginners class can. Flexibility is what the class is for, not a requirement to attend it.",
        },
        {
          q: "Are the classes hot?",
          a: "Two are warm, at about 26 degrees. Nothing here is hot yoga. The timetable says which is which on every single slot.",
        },
        {
          q: "I am pregnant, or injured.",
          a: "Tell the teacher before the class rather than during it, and they will give you alternatives as it goes. Both of us have taught through pregnancies and neither of us will just say be careful.",
        },
        {
          q: "How late can I book?",
          a: "Fifteen minutes before the class starts, if there is a mat left. After that the door is locked so the class is not interrupted.",
        },
      ],
    },

    {
      type: "location",
      id: "visit",
      eyebrow: "Find us",
      title: "Where and when",
      address: ["Fieldnote Yoga", "914 Cedar Bend Road", "Austin, TX 78702"],
      hours: [
        { days: "Monday to Thursday", time: "6.15am to 8.15pm" },
        { days: "Friday", time: "6.45am to 6.45pm" },
        { days: "Saturday", time: "8.15am to 12.30pm" },
        { days: "Sunday", time: "8.15am to 5pm" },
      ],
      phone: PHONE,
      email: "hello@fieldnoteyoga.example",
      mapsQuery: "914 Cedar Bend Road, Austin, TX 78702",
      travel: [
        "Free parking in the lot behind the building, entrance off the alley.",
        "Doors open fifteen minutes before each class and lock when it starts.",
        "Changing room, showers and lockers. Bring your own padlock or borrow one.",
        "Step-free from the lot, and the studio itself is all on one level.",
      ],
      image: {
        src: "/templates/yoga-pilates-studio/studio.jpg",
        alt: "A class practising on mats in the Fieldnote studio.",
        width: 1400,
        height: 933,
      },
    },

    {
      type: "booking",
      id: "book",
      tone: "ink",
      ghost: ["Twelve mats"],
      eyebrow: "Book",
      title: "Take the first class",
      intro: "Tell us which class and we will hold a mat. Your first weekday noon class is free and there is nothing to pay now.",
      fields: [
        { name: "name", label: "Your name", type: "text", required: true, half: true },
        { name: "email", label: "Email", type: "email", required: true, half: true },
        { name: "phone", label: "Phone", type: "tel", half: true },
        {
          name: "class",
          label: "Which class",
          type: "select",
          required: true,
          half: true,
          placeholder: "Please choose",
          options: [
            "Beginners Yoga",
            "Slow Flow",
            "Vinyasa",
            "Mat Pilates",
            "Strength and Flow",
            "Restorative or Wind Down",
            "Not sure, please advise",
          ],
        },
        {
          name: "notes",
          label: "Anything we should know",
          type: "textarea",
          placeholder: "Injuries, pregnancy, whether you have done this before, or which days suit.",
        },
      ],
      submitLabel: "Hold me a mat",
      note: "We reply by email within a few hours. Your details are used to book the class and for nothing else, and we will not add you to a mailing list.",
      aside: {
        title: "Or just turn up",
        items: [
          "Beginners Yoga at noon, any weekday",
          "Arrive fifteen minutes early and say it is your first",
          "There is nothing to bring and nothing to pay",
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
            { label: "Timetable", href: "#timetable" },
            { label: "Classes explained", href: "#classes" },
            { label: "Teachers", href: "#teachers" },
            { label: "Pricing", href: "#pricing" },
          ],
        },
        {
          title: "Visiting",
          links: [
            { label: "Find us", href: "#visit" },
            { label: "Book a class", href: "#book" },
          ],
        },
      ],
      note: "Doors lock when a class starts so it is not interrupted. If you are running late, come to the next one rather than knocking.",
      legal: [
        "Fieldnote Yoga is a fictional studio created to demonstrate this template.",
        "On a live site this line carries the business registration and the teachers' certification bodies.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = { practice: "Fieldnote Yoga", templateName: "Asana" };

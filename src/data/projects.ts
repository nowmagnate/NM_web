/**
 * Anonymized project catalogue for the /work timeline.
 *
 * Deliberately separate from `case-studies.ts`: entries here carry no client,
 * no year and no brand name, and must never gain them. Position on the
 * timeline is the order of this array (earlier entries sit higher), and it is
 * unlabeled by design.
 *
 * TO LINK A REAL CASE STUDY LATER: set `caseStudySlug` on the matching entry
 * to a slug from `case-studies.ts`. Nothing reads it yet; the timeline entry
 * is where the link will render.
 *
 * SCREENSHOTS: each screen resolves to `public/projects/<id>/screen-<n>.webp`
 * (n starts at 1). When the file exists at build time it is shown, otherwise a
 * wireframe placeholder frame is shown. See `public/projects/README.md`.
 */

export type DeviceKind = "phone" | "phone-landscape" | "desktop";

/** Skeleton shown by the placeholder frame until a real screenshot exists. */
export type ScreenLayout = "feed" | "dashboard" | "chat" | "board" | "retro" | "video";

export type ProjectScreen = {
  device: DeviceKind;
  layout: ScreenLayout;
  /** Short generic UI text drawn inside the placeholder frame. */
  label: string;
  /** Alt text for the screenshot. Generic, no brand or client names. */
  alt: string;
};

export type Project = {
  /** Stable id. Also the folder name under `public/projects/`. */
  id: string;
  category: string;
  /** Delivery surfaces, e.g. "Web", "Android". */
  platforms: string[];
  utility: string;
  features: string[];
  stack: string[];
  /** Which side of the line the entry sits on at desktop widths. */
  side: "left" | "right";
  /** Space above the entry, so projects scatter rather than march evenly. */
  gap: "tight" | "normal" | "loose";
  screens: ProjectScreen[];
  /** Slug of a published case study in `case-studies.ts`, once one exists. */
  caseStudySlug?: string;
};

export const projects: Project[] = [
  {
    id: "ecommerce-general",
    category: "E-commerce Platform",
    platforms: ["Web", "Android"],
    utility:
      "Lets a merchant sell any kind of product online through a web storefront and an Android app on one shared backend.",
    features: [
      "Catalogue with search and filters",
      "Cart and checkout",
      "Online payments",
      "Order tracking",
      "Merchant and admin dashboard",
      "Push notifications",
      "Coupons and promotions",
    ],
    stack: [
      "React Native",
      "Node.js",
      "Express",
      "MongoDB",
      "MySQL",
      "Firebase hosting",
      "Firebase push notifications",
    ],
    side: "left",
    gap: "tight",
    screens: [
      {
        device: "desktop",
        layout: "feed",
        label: "Catalogue",
        alt: "Sample web storefront showing a product catalogue with search and filters",
      },
      {
        device: "phone",
        layout: "feed",
        label: "Cart",
        alt: "Sample Android app screen showing a shopping cart and checkout button",
      },
      {
        device: "desktop",
        layout: "dashboard",
        label: "Orders",
        alt: "Sample merchant dashboard listing recent orders and sales",
      },
    ],
  },
  {
    id: "fashion-ecommerce",
    category: "Fashion and Apparel E-commerce",
    platforms: ["Web"],
    utility: "Online store built specifically for selling fashion and clothing.",
    features: [
      "Collections and lookbook browsing",
      "Size and colour variants",
      "Size guide",
      "Wishlist",
      "Cart and checkout",
      "Online payments",
      "Order tracking",
      "Returns and exchanges",
      "Admin dashboard",
    ],
    stack: ["Next.js", "PostgreSQL", "AWS", "AWS SQS", "AWS SNS"],
    side: "right",
    gap: "loose",
    screens: [
      {
        device: "desktop",
        layout: "feed",
        label: "Lookbook",
        alt: "Sample fashion storefront showing a lookbook of clothing collections",
      },
      {
        device: "desktop",
        layout: "feed",
        label: "Product",
        alt: "Sample product page with size and colour options for a garment",
      },
      {
        device: "desktop",
        layout: "dashboard",
        label: "Returns",
        alt: "Sample admin dashboard showing orders and return requests",
      },
    ],
  },
  {
    id: "quiz-learning",
    category: "Quiz and Learning App",
    platforms: ["Android"],
    utility: "Helps students learn and revise through quizzes and questionnaires.",
    features: [
      "Quizzes and questionnaires by subject or topic",
      "Level progression",
      "Scoring with answer feedback",
      "Hints",
      "Daily challenges",
      "Progress tracking",
      "Leaderboards",
      "Offline play",
    ],
    stack: ["Native Android", "Java", "Firebase"],
    side: "left",
    gap: "normal",
    screens: [
      {
        device: "phone",
        layout: "feed",
        label: "Choose a topic",
        alt: "Sample quiz app screen listing subjects to choose from",
      },
      {
        device: "phone",
        layout: "board",
        label: "Question 4",
        alt: "Sample quiz question with four answer options and a hint button",
      },
      {
        device: "phone",
        layout: "dashboard",
        label: "Progress",
        alt: "Sample progress screen with scores and a leaderboard",
      },
    ],
  },
  {
    id: "puzzle-collection-classic",
    category: "Multi-Game Puzzle Collection",
    platforms: ["Android"],
    utility:
      "Casual puzzle entertainment for short, repeatable play sessions, with many games in one app. Bundles simple 2D games such as sudoku, arrows and crossword.",
    features: [
      "Level progression",
      "Hints and boosters",
      "Daily challenges",
      "Leaderboards",
      "Offline play",
      "Ad and in-app purchase hooks",
    ],
    stack: ["Native Android", "Java", "Firebase"],
    side: "right",
    gap: "tight",
    screens: [
      {
        device: "phone",
        layout: "feed",
        label: "All games",
        alt: "Sample puzzle app home screen with a grid of game tiles",
      },
      {
        device: "phone",
        layout: "board",
        label: "Sudoku",
        alt: "Sample number puzzle board with a hint booster",
      },
      {
        device: "phone",
        layout: "board",
        label: "Crossword",
        alt: "Sample crossword puzzle with a clue list",
      },
    ],
  },
  {
    id: "puzzle-collection-word",
    category: "Word and Picture Puzzle Collection",
    platforms: ["Android"],
    utility:
      "Casual puzzle entertainment for short, repeatable play sessions, with many games in one app. Bundles simple 2D games such as word search, jigsaw and memory match.",
    features: [
      "Level progression",
      "Hints and boosters",
      "Daily challenges",
      "Leaderboards",
      "Offline play",
      "Ad and in-app purchase hooks",
    ],
    stack: ["Native Android", "Java", "Firebase"],
    side: "left",
    gap: "loose",
    screens: [
      {
        device: "phone",
        layout: "feed",
        label: "Pick a puzzle",
        alt: "Sample word and picture puzzle app home screen with game tiles",
      },
      {
        device: "phone",
        layout: "board",
        label: "Word search",
        alt: "Sample word search grid with a list of words to find",
      },
      {
        device: "phone",
        layout: "board",
        label: "Jigsaw",
        alt: "Sample jigsaw puzzle with loose pieces to place",
      },
    ],
  },
  {
    id: "retro-bike-racing",
    category: "2D Retro Bike Racing Game",
    platforms: ["Android"],
    utility: "2D bike racing game with a legacy, retro video-game look and feel.",
    features: [
      "Sprite-based 2D gameplay",
      "Touch controls",
      "Stages and scoring",
      "Achievements",
      "Sound and music",
      "Saved progress",
      "Retro visual style throughout",
    ],
    stack: ["Native Android", "Java", "Firebase"],
    side: "right",
    gap: "normal",
    screens: [
      {
        device: "phone-landscape",
        layout: "retro",
        label: "Stage 1",
        alt: "Sample retro pixel-art bike racing stage with a rider on a hilly track",
      },
      {
        device: "phone-landscape",
        layout: "retro",
        label: "Stage select",
        alt: "Sample retro stage select screen with unlocked and locked stages",
      },
      {
        device: "phone-landscape",
        layout: "retro",
        label: "Results",
        alt: "Sample retro results screen with score and achievements",
      },
    ],
  },
  {
    id: "hyperlocal-marketplace",
    category: "Hyperlocal Marketplace Platform",
    platforms: ["Android", "iOS", "Web admin"],
    utility:
      "Connects nearby shops and local service providers with customers in the same neighbourhood. Vendors cover groceries, general retail, and local services such as salon, parlour, electrician, plumbing and carpentry. Includes a customer app and a vendor app, plus an admin panel on the web.",
    features: [
      "Location-based vendor discovery",
      "Multi-vendor product catalogues and service listings",
      "Cart and checkout for products",
      "Service booking",
      "Order and booking tracking",
      "Vendor dashboard",
      "Push notifications",
      "Real-time chat",
    ],
    stack: [
      "React Native",
      "Node.js",
      "Express",
      "MongoDB",
      "GCP",
      "Firebase auth",
      "Firebase push notifications",
      "Firebase chat",
    ],
    side: "left",
    gap: "tight",
    screens: [
      {
        device: "phone",
        layout: "feed",
        label: "Nearby",
        alt: "Sample customer app screen listing shops and services near the user",
      },
      {
        device: "phone",
        layout: "dashboard",
        label: "Vendor",
        alt: "Sample vendor app screen with incoming orders and bookings",
      },
      {
        device: "desktop",
        layout: "dashboard",
        label: "Admin",
        alt: "Sample admin panel with vendor approvals and order totals",
      },
    ],
  },
  {
    id: "dating-app",
    category: "Dating App",
    platforms: ["Android", "iOS"],
    utility: "Matches people by interests and preferences and lets mutual matches chat.",
    features: [
      "Profile creation with photos",
      "Left and right swipe behaviour",
      "Interest and preference matching to drive suggestions",
      "Mutual matching",
      "Real-time chat",
      "Push notifications",
    ],
    stack: [
      "React Native",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase auth",
      "Firebase push notifications",
      "Firebase chat",
      "AWS S3",
    ],
    side: "right",
    gap: "loose",
    screens: [
      {
        device: "phone",
        layout: "feed",
        label: "Profile",
        alt: "Sample profile screen with photo slots and an interests list",
      },
      {
        device: "phone",
        layout: "feed",
        label: "Discover",
        alt: "Sample discovery screen with a swipeable profile card",
      },
      {
        device: "phone",
        layout: "chat",
        label: "Matches",
        alt: "Sample chat screen between two matched people",
      },
    ],
  },
  {
    id: "crm-saas",
    category: "CRM SaaS Platform",
    platforms: ["Web"],
    utility:
      "Subscription-based customer relationship management software delivered through the browser to multiple customer organizations.",
    features: [
      "Contacts and customer records",
      "Leads and pipeline",
      "Notes and activity history",
      "Tasks and reminders",
      "Reporting dashboards",
      "Multi-tenant accounts",
      "Role-based access",
      "Subscription billing",
      "Admin console",
    ],
    stack: ["Next.js", "Nest.js", "PostgreSQL", "AWS"],
    side: "left",
    gap: "normal",
    screens: [
      {
        device: "desktop",
        layout: "dashboard",
        label: "Pipeline",
        alt: "Sample CRM pipeline board with leads grouped by stage",
      },
      {
        device: "desktop",
        layout: "feed",
        label: "Contact",
        alt: "Sample contact record with notes and activity history",
      },
      {
        device: "desktop",
        layout: "dashboard",
        label: "Reports",
        alt: "Sample reporting dashboard with charts and totals",
      },
    ],
  },
  {
    id: "corporate-cab-platform",
    category: "Corporate Cab Management Platform",
    platforms: ["Android", "Web"],
    utility:
      "Brings cab operators and drivers onto one platform so operators can plan and book corporate travel schedules, manage their fleets and dispatch, and admins oversee the whole network. Operators book rides on behalf of corporate customers; there is no customer booking app. Includes a driver mobile app, an operator web app and an admin web app.",
    features: [
      "Operator-led scheduled bookings for corporate needs",
      "Fleet and vehicle management",
      "Driver onboarding",
      "Dispatch",
      "Commissions",
      "Operator and vendor accounts",
      "Live location tracking",
      "Fare estimation",
      "Trip history",
      "Payments",
      "Ratings",
    ],
    stack: ["Nest.js", "PostgreSQL", "React Native", "WebSockets", "AWS"],
    side: "right",
    gap: "tight",
    screens: [
      {
        device: "phone",
        layout: "feed",
        label: "Driver trip",
        alt: "Sample driver app screen with the next assigned trip and a map",
      },
      {
        device: "desktop",
        layout: "dashboard",
        label: "Dispatch",
        alt: "Sample operator web app with a schedule of planned trips and fleet status",
      },
      {
        device: "desktop",
        layout: "dashboard",
        label: "Network",
        alt: "Sample admin web app with network-wide totals and operator list",
      },
    ],
  },
  {
    id: "furniture-interiors-aggregator",
    category: "Furniture and Interior Services Aggregator",
    platforms: ["Web"],
    utility:
      "A web marketplace where customers connect with vendors, who are furniture makers and interior designers, to buy furniture or commission custom work, with the platform mediating payment.",
    features: [
      "Choosing from an existing catalogue",
      "Quote requests",
      "Live chat between vendor and customer",
      "Inspection and negotiation",
      "Design and custom manufacturing",
      "Payment mediation by the platform",
      "Vendor listings and portfolio galleries",
      "Reviews",
      "Order and appointment management",
      "Admin panel",
    ],
    stack: ["Nest.js", "PostgreSQL", "AWS"],
    side: "left",
    gap: "loose",
    screens: [
      {
        device: "desktop",
        layout: "feed",
        label: "Vendor gallery",
        alt: "Sample vendor profile with a portfolio gallery of furniture work",
      },
      {
        device: "desktop",
        layout: "chat",
        label: "Quote",
        alt: "Sample quote request conversation between a customer and a vendor",
      },
      {
        device: "desktop",
        layout: "dashboard",
        label: "Admin",
        alt: "Sample admin panel with orders, appointments and payments held",
      },
    ],
  },
  {
    id: "live-courses-edtech",
    category: "EdTech Platform for Live Online Courses",
    platforms: ["Web"],
    utility:
      "Custom-built for one specific EdTech use case, not an off-the-shelf tool. Lets teachers run live classes with students, with real-time video and interaction between them.",
    features: [
      "Live video classes and real-time teacher-student interaction",
      "Course catalogue and enrolment",
      "Class scheduling",
      "Student and instructor dashboards",
    ],
    stack: ["React", "Nest.js", "MongoDB", "AWS", "WebRTC"],
    side: "right",
    gap: "normal",
    screens: [
      {
        device: "desktop",
        layout: "video",
        label: "Live class",
        alt: "Sample live class with a teacher video, student tiles and a chat panel",
      },
      {
        device: "desktop",
        layout: "feed",
        label: "Courses",
        alt: "Sample course catalogue with enrolment buttons",
      },
      {
        device: "desktop",
        layout: "dashboard",
        label: "Schedule",
        alt: "Sample instructor dashboard with a weekly class schedule",
      },
    ],
  },
];

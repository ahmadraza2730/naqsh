// ───────────────────────────────────────────────────────────────
// Naqsh — site content.
// Everything a client reads lives here: services, prices, packages,
// payment methods and contact links. Edit this file, push, and Vercel
// redeploys. Prices are starting points ("from"), not quotes.
// ───────────────────────────────────────────────────────────────

export const site = {
  name: "Naqsh",
  urdu: "نقش",
  tagline: "Every brand leaves a mark. We draw yours.",
  description:
    "Naqsh is a graphic design studio from Islamabad. Logos, brand identities, social media, packaging and print for businesses in Pakistan and around the world.",
  city: "Islamabad, Pakistan",
  url: "https://naqsh-rosy.vercel.app",
  contact: {
    // Leave a field empty ("") to hide it on the site.
    email: "",
    whatsapp: "", // international format, digits only, e.g. "923001234567"
    instagram: "",
    behance: "",
    fiverr: "",
    contra: "",
  },
  // Rough exchange rate used to show USD next to PKR for international clients.
  usdRate: 280,
};

export type Service = {
  id: string;
  name: string;
  summary: string;
  deliverables: string[];
  days: string;
  fromPkr: number;
};

export type ServiceGroup = {
  id: string;
  title: string;
  note: string;
  services: Service[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "identity",
    title: "Brand identity",
    note: "The marks people remember you by.",
    services: [
      {
        id: "logo",
        name: "Logo design",
        summary: "A distinctive mark and wordmark, drawn from a short brief about your business.",
        deliverables: ["3 initial concepts", "3 rounds of revisions", "Primary, secondary and icon versions", "SVG, PNG, PDF and AI files"],
        days: "4–6 days",
        fromPkr: 6500,
      },
      {
        id: "identity",
        name: "Full brand identity",
        summary: "Logo, colour, type and the rules that hold them together, ready for print and screen.",
        deliverables: ["Logo suite", "Colour palette and typography", "Brand guidelines PDF", "Business card and letterhead", "Social media kit"],
        days: "10–14 days",
        fromPkr: 24000,
      },
      {
        id: "rebrand",
        name: "Rebrand and logo refresh",
        summary: "Modernise an existing logo without losing the recognition you have built.",
        deliverables: ["Audit of the current brand", "2 refresh directions", "Updated logo suite", "Before and after rollout sheet"],
        days: "7–10 days",
        fromPkr: 14500,
      },
      {
        id: "stationery",
        name: "Business cards and stationery",
        summary: "Cards, letterheads, envelopes and email signatures that match your brand.",
        deliverables: ["Business card (both sides)", "Letterhead and envelope", "Email signature", "Print-ready files with bleed"],
        days: "2–3 days",
        fromPkr: 3000,
      },
    ],
  },
  {
    id: "digital",
    title: "Social and digital",
    note: "Design that has to stop a thumb mid-scroll.",
    services: [
      {
        id: "social",
        name: "Social media posts",
        summary: "Feed posts, carousels and stories for Instagram, Facebook and LinkedIn.",
        deliverables: ["Branded post templates", "Carousels and stories", "Captions-ready layouts", "Editable source files"],
        days: "2–4 days",
        fromPkr: 1000,
      },
      {
        id: "thumbnails",
        name: "YouTube thumbnails",
        summary: "High-contrast thumbnails built to be read at a glance on a phone.",
        deliverables: ["1280×720 thumbnail", "2 variations for testing", "Retouched cut-outs", "PSD source"],
        days: "1–2 days",
        fromPkr: 1000,
      },
      {
        id: "ads",
        name: "Ad creatives and banners",
        summary: "Meta, Google and web banners in every size your campaign needs.",
        deliverables: ["Master design", "Resized set for each platform", "Static and simple animated versions"],
        days: "2–3 days",
        fromPkr: 2500,
      },
      {
        id: "ui",
        name: "Website and app UI design",
        summary: "Landing pages and app screens designed in Figma, ready for a developer.",
        deliverables: ["Desktop and mobile layouts", "Clickable Figma prototype", "Component styles", "Developer handoff"],
        days: "7–12 days",
        fromPkr: 20000,
      },
      {
        id: "decks",
        name: "Pitch decks and presentations",
        summary: "Investor, sales and company decks that read clearly and look considered.",
        deliverables: ["Up to 15 designed slides", "Charts and diagrams", "PowerPoint, Google Slides or Keynote file"],
        days: "4–6 days",
        fromPkr: 9500,
      },
    ],
  },
  {
    id: "print",
    title: "Print and packaging",
    note: "Things people hold, open and keep.",
    services: [
      {
        id: "packaging",
        name: "Packaging and labels",
        summary: "Boxes, pouches, jars and labels designed to the printer's dieline.",
        deliverables: ["Design on your dieline", "3D mockup", "Print-ready files", "Printer coordination notes"],
        days: "6–10 days",
        fromPkr: 12000,
      },
      {
        id: "posters",
        name: "Posters and flyers",
        summary: "Event posters, flyers and leaflets for print or social.",
        deliverables: ["A4/A3 or custom size", "Social-friendly version", "Print-ready PDF"],
        days: "2–3 days",
        fromPkr: 2500,
      },
      {
        id: "menus",
        name: "Restaurant menus",
        summary: "Menus for tables, walls, takeaway and delivery apps.",
        deliverables: ["Menu layout", "Food photo retouching", "Print and digital versions"],
        days: "3–5 days",
        fromPkr: 5000,
      },
      {
        id: "invites",
        name: "Wedding and event cards",
        summary: "Invitations, mehndi and nikkah cards, from classic calligraphy to modern minimal.",
        deliverables: ["Card design (all events)", "Digital invite for WhatsApp", "Print-ready files"],
        days: "3–5 days",
        fromPkr: 4000,
      },
      {
        id: "editorial",
        name: "Book covers and magazines",
        summary: "Covers, brochures, catalogues and multi-page layouts.",
        deliverables: ["Front, spine and back cover", "Interior page templates", "Print-ready PDF"],
        days: "5–8 days",
        fromPkr: 6500,
      },
      {
        id: "merch",
        name: "T-shirts and merchandise",
        summary: "Apparel graphics, mugs, tote bags and giveaways.",
        deliverables: ["Print-ready artwork", "Colour separations", "Product mockups"],
        days: "2–4 days",
        fromPkr: 2500,
      },
    ],
  },
  {
    id: "craft",
    title: "Illustration and motion",
    note: "When a template will not do.",
    services: [
      {
        id: "illustration",
        name: "Custom illustration",
        summary: "Characters, icons, mascots and editorial illustrations in a style made for you.",
        deliverables: ["Sketch stage", "Final vector or raster artwork", "Commercial-use licence"],
        days: "4–8 days",
        fromPkr: 5500,
      },
      {
        id: "infographics",
        name: "Infographics",
        summary: "Turn reports, processes and numbers into one clear visual.",
        deliverables: ["Information layout", "Custom icons", "Print and web versions"],
        days: "3–5 days",
        fromPkr: 4000,
      },
      {
        id: "motion",
        name: "Logo animation and motion graphics",
        summary: "Animated logos, intros and short social videos.",
        deliverables: ["5–10s logo sting", "MP4 and transparent MOV", "Sound-on and silent versions"],
        days: "4–7 days",
        fromPkr: 8000,
      },
      {
        id: "retouch",
        name: "Photo editing and retouching",
        summary: "Product cut-outs, colour correction and clean-up for e-commerce and ads.",
        deliverables: ["Background removal", "Colour and skin retouching", "Web-optimised exports"],
        days: "1–2 days",
        fromPkr: 400,
      },
    ],
  },
];

export const allServices = serviceGroups.flatMap((g) => g.services);

export const packages = [
  {
    id: "mark",
    name: "The Mark",
    fit: "For new businesses that need to look established from day one.",
    pricePkr: 12000,
    items: ["Logo design with 3 concepts", "Business card", "Social media profile kit", "All source files"],
    featured: false,
  },
  {
    id: "identity",
    name: "The Identity",
    fit: "For brands launching properly, online and in print.",
    pricePkr: 36000,
    items: [
      "Everything in The Mark",
      "Brand guidelines",
      "Stationery set",
      "10 social media templates",
      "Packaging or menu design",
    ],
    featured: true,
  },
  {
    id: "retainer",
    name: "Monthly studio",
    fit: "For teams that need design every week without hiring.",
    pricePkr: 28000,
    per: "/ month",
    items: ["20 social posts or ad creatives", "2 print pieces", "Priority 48-hour turnaround", "Pause or cancel any month"],
    featured: false,
  },
];

export const process = [
  { title: "Brief", text: "You fill the brief below. We reply within 24 hours with questions, a quote and a timeline." },
  { title: "Deposit", text: "Pay 50% to book your slot. Local or international, see the options below." },
  { title: "Concepts", text: "We share first concepts with the thinking behind each one, then revise with you." },
  { title: "Delivery", text: "Pay the balance and receive every final file, organised and ready to use." },
];

export const payments = {
  local: [
    { name: "Bank transfer", detail: "IBFT or direct transfer to our business account. Account details are sent with your quote." },
    { name: "JazzCash", detail: "Send to our JazzCash mobile account. Number shared with your quote." },
    { name: "Easypaisa", detail: "Send to our Easypaisa mobile account. Number shared with your quote." },
  ],
  international: [
    { name: "Payoneer", detail: "We send a Payoneer payment request in USD. Pay by card or bank." },
    { name: "Fiverr", detail: "Order through our Fiverr gig for full buyer protection." },
  ],
};

export const faqs = [
  {
    q: "How many revisions do I get?",
    a: "Each service lists its revision rounds. Most include three. Extra rounds are billed at a small flat rate, agreed before we start.",
  },
  {
    q: "Do I own the final design?",
    a: "Yes. Once the balance is paid, full rights to the final files transfer to you. We may show the work in our portfolio unless you ask us not to.",
  },
  {
    q: "Can you work in Urdu as well as English?",
    a: "Yes. We design bilingual logos, menus, invites and social posts, including Nastaliq and Naskh lettering.",
  },
  {
    q: "What if I need it urgently?",
    a: "Rush delivery is often possible for an extra 30–50%. Mention your deadline in the brief and we will tell you honestly if it can be done.",
  },
];

export const pkr = (n: number) => "Rs " + n.toLocaleString("en-PK");
export const usd = (n: number) => "$" + Math.max(5, Math.round(n / site.usdRate / 5) * 5);

// ───────── Delivered work ─────────
// Add a project: drop images into public/work/ and add an entry here.
// The first image is the cover; the rest open in the viewer.
export type Project = {
  id: string;
  title: string;
  kind: string;
  summary: string;
  images: { src: string; alt: string; w: number; h: number }[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "carbar",
    title: "Carbar",
    kind: "Brand identity",
    summary:
      "A full identity for an automotive brand: a mark built from linked wheels, a rounded wordmark, and rollout across signage, merchandise and the app.",
    featured: true,
    images: [
      { src: "/work/carbar-logo.webp", alt: "Carbar logo in red and white on a dark background with a car behind it", w: 828, h: 835 },
      { src: "/work/carbar-storefront.webp", alt: "Carbar logo as illuminated signage above a storefront", w: 819, h: 796 },
      { src: "/work/carbar-tote.webp", alt: "Black Carbar tote bag hanging on a metal fence", w: 741, h: 808 },
      { src: "/work/carbar-app.webp", alt: "Carbar app icon on a phone screen", w: 679, h: 814 },
      { src: "/work/carbar-cap.webp", alt: "Black cap embroidered with the red Carbar mark", w: 757, h: 760 },
    ],
  },
  {
    id: "age-logistics",
    title: "AGE Logistics",
    kind: "Logo design",
    summary: "A logistics logo: a speeding red truck over a heavy italic wordmark that holds up on vehicles and paperwork.",
    images: [{ src: "/work/age-logistics.webp", alt: "AGE Logistics logo with a red truck above the name", w: 800, h: 640 }],
  },
  {
    id: "corolla",
    title: "Corolla Altis",
    kind: "Poster design",
    summary: "A spec-sheet poster for the Toyota Corolla Altis with condensed display type behind the car.",
    images: [{ src: "/work/corolla-poster.webp", alt: "Poster of a white Toyota Corolla Altis in front of large grey COROLLA lettering", w: 716, h: 851 }],
  },
  {
    id: "elsa",
    title: "Elsa 3.0",
    kind: "Poster design",
    summary: "A poster for a modified Corolla, with a glitter-wrap texture and gradient type.",
    images: [{ src: "/work/elsa-poster.webp", alt: "Poster of a modified Corolla named Elsa 3.0 with gradient COROLLA lettering", w: 706, h: 820 }],
  },
  {
    id: "slowest",
    title: "Slowest",
    kind: "Social media artwork",
    summary: "Photo manipulation with distressed lettering woven behind the car, made for social media.",
    images: [{ src: "/work/slowest-poster.webp", alt: "White Suzuki car under a gateway with red SLOWEST lettering behind it", w: 720, h: 847 }],
  },
  {
    id: "suzuki",
    title: "Suzuki Cultus",
    kind: "Banner design",
    summary: "A colour-blocked collage banner combining photos of one car into a single wide composition.",
    images: [{ src: "/work/suzuki-banner.webp", alt: "Collage banner of a white Suzuki on colour blocks with the word SUZUKI", w: 1600, h: 1131 }],
  },
];

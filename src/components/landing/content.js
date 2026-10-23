// Copy for /landing. Shipped features only; keep it in step with the app.

export const CONTACT_EMAIL = "contact@planyt.in";

/** Badge spotlight: each role's sign-in and reach, three things they see, and the badge design they wear. */
export const ROLE_CARDS = [
  { name: "Organizer", tpl: "academic", pass: [["Signs in", "Shared login"], ["Sees", "Whole event"], ["Kept out", "Nothing"]], desc: "The whole event in one dashboard, from first registration to certificates.", see: ["Registrations & revenue", "Papers & reviews", "Agenda & check-in"] },
  { name: "Volunteer", tpl: "photo-hero", pass: [["Signs in", "One-tap link"], ["Sees", "Desk & tasks"], ["Kept out", "Revenue, reviews"]], desc: "Their desk, their hall and the scanner, only for the hours you choose.", see: ["Desk scanner", "Walk-in registration", "Hall tasks"] },
  { name: "Reviewer", tpl: "signature", pass: [["Signs in", "Invite link"], ["Sees", "Assigned papers"], ["Kept out", "Author names"]], desc: "The papers assigned to them, a scoring form and room for comments.", see: ["Assigned papers", "Scores & comments", "Revision rounds"] },
  { name: "Sponsor", tpl: "corporate-split", pass: [["Signs in", "Sponsor portal"], ["Sees", "Team & stall"], ["Kept out", "Attendee data"]], desc: "A portal for their team, their stall and their brand material.", see: ["Team passes", "Stall on the floor plan", "Brochures & banners"] },
  { name: "Attendee & author", tpl: "diagonal", pass: [["Signs in", "At registration"], ["Sees", "Pass & agenda"], ["Kept out", "Others' details"]], desc: "Their pass, the agenda, their paper's progress and their certificate.", see: ["One QR pass", "Live Q&A & polls", "Paper status"] },
];

export const FAQS = [
  ["How do I get an organizer account?", "Write to us with your event details. Once the quote is agreed, Planyt sets up your account and shares the login."],
  ["How is pricing decided?", "By event size, the modules you need and how many events you run a year."],
  ["Where does the ticket money go?", "Straight to your own Razorpay account. Bank and UPI receipts are approved by you, and GST invoices go out on their own."],
  ["Do attendees or volunteers need to install an app?", "No. Passes, the agenda, Q&A, polls and the volunteer scanner all open in the browser."],
  ["What if the internet drops at the venue?", "Check-in keeps scanning offline, still catches duplicates, and syncs when the network is back."],
  ["Can the event website use our own domain?", "Yes. Every site gets its own planyt.in address, and you can connect your own domain."],
  ["Who sends the emails?", "Planyt sends them for your event, signed off with your event's name. Replies go to your contact email, and only people in your event receive them."],
  ["Can people check a certificate is genuine?", "Yes. Every certificate has its own ID and a verify link."],
  ["Can we export our data?", "Yes. Export the whole event any time. Attendees can download or delete their own data."],
  ["Can I run more than one event?", "Yes. Each event gets its own dashboard; ask us for a yearly quote."],
];

/** "Your event, your data" strip. Only what Planyt really does; keep it that way. */
export const TRUST = [
  ["credit-card", "0% cut", "Ticket money lands in your own Razorpay account."],
  ["shield", "Role-based access", "Volunteers, reviewers and sponsors see only their job."],
  ["file-check", "Audit log", "Every change: who did it, and when."],
  ["user-check", "DPDP ready", "Attendees can download or delete their data."],
  ["lock", "Hardened sign-in", "Hashed passwords, rate limits, one-tap links."],
  ["archive", "Full backup", "Export the whole event, any time."],
];

/** Website spotlight: the four steps beside the template mock-up. */
export const WEBSITE_STEPS = [
  ["Choose a template", "20 designs for conferences, summits, fests and hackathons."],
  ["Make it yours", "Click any text or image to change it. Move or hide sections."],
  ["Publish", "One click. Live on its own address, secure."],
  ["Update anytime", "Registration, speakers and agenda stay in sync with your event."],
];

/**
 * Every feature: [name, icon, one short line, screenshot key]. The story chapters pick theirs by key;
 * FEATURE_STAGE says how each screenshot is staged.
 */
export const FEATURES = [
  ["Registration & tickets", "clipboard-list", "Forms, tiers and coupons, live in minutes.", "registrations"],
  ["Payments", "credit-card", "Online or bank transfer, with every fee and GST shown up front.", "payments"],
  ["Event website", "globe", "Your event's own site, live on your domain.", "website"],
  ["Call for papers", "file-text", "Abstracts, full papers and blind review.", "submissions"],
  ["Agenda & sessions", "calendar-clock", "Halls, tracks and what's live right now.", "agenda"],
  ["Badge studio", "qr-code", "Design badges once, print for everyone at real size.", "badges"],
  ["Check-in, even offline", "scan-line", "A station for every gate, hall and meal, no double entries.", "checkin"],
  ["Live Q&A & polls", "message-square", "Questions linked to each session, and polls with live results.", "engagement"],
  ["Chat & meetings", "messages-square", "Attendees message each other and book one-to-one meetings.", "chat"],
  ["Volunteer tools", "user-check", "Each volunteer gets only the tools you pick, signed in with one tap.", "volunteers"],
  ["Forms & surveys", "list-checks", "Any form, shared by link, answers in a table.", "forms"],
  ["Sponsors", "store", "Tiers, stalls and a portal for every sponsor.", "sponsors"],
  ["Certificates", "award", "Verifiable certificates, sent to everyone at once.", "certificates"],
  ["Guests & stays", "bed-double", "VVIP guest lists with passes, and rooms with requests.", "vvip"],
  ["Analytics", "bar-chart-3", "Registrations, revenue and turnout at a glance.", "analytics"],
];

/** Organisations whose events Planyt has run. Logos live in public/images/partners/. */
export const PARTNERS = [
  { name: "Indian Space Research Organisation (ISRO)", logo: "/images/partners/isro.svg" },
  { name: "Astronautical Society of India", logo: "/images/partners/asi.png" },
  { name: "International Academy of Astronautics", logo: "/images/partners/iaa.png", light: true },
];

/** Past events run on Planyt, newest first. The first is featured; add more below it. */
export const PAST_EVENTS = [
  {
    name: "SMOPS-2026",
    full: "International Conference on Spacecraft Mission Operations",
    logo: "/images/partners/smops-2026.webp",
    when: "8–10 April 2026",
    where: "Taj Yeshwantpur, Bengaluru",
    hosts: "ISRO · Astronautical Society of India · IAA",
    note: "Run end to end on Planyt.",
    url: "https://smops.asindia.org/",
  },
];

/** Badge Studio templates (src/components/Dashboard/Organizer/badges/templates.js), as printed images in public/images/landing/badges. */
export const BADGE_TEMPLATES = [
  ["signature", "Planyt signature", "Conference"], ["swiss", "Swiss grid", "Minimal"], ["monogram", "Monogram", "VIP"], ["diagonal", "Diagonal", "Bold"], ["big-number", "Big number", "Bold"], ["sun-circle", "Sun circle", "Festival"], ["gold-vip", "Gold VIP", "VIP"], ["glass", "Glass", "Modern"], ["blocks", "Colour blocks", "Bold"], ["retro-sun", "Retro sun", "Festival"], ["neon-tech", "Neon tech", "Tech"], ["ticket", "Ticket stub", "Festival"], ["academic", "Academic classic", "Academic"], ["paper", "Paper", "Minimal"], ["photo-hero", "Photo hero", "Media & press"], ["outline-type", "Outline type", "Bold"], ["playful", "Playful shapes", "Playful"], ["hazard", "Hazard crew", "Crew & staff"], ["hex-tech", "Hex tech", "Tech"], ["editorial-arch", "Editorial arch", "Media & press"], ["comic", "Comic pop", "Playful"], ["duotone", "Duotone", "Media & press"], ["passport", "Passport", "Classic"], ["corporate-split", "Corporate split", "Corporate"], ["executive", "Executive", "Corporate"], ["bauhaus", "Bauhaus", "Bold"], ["medical", "Medical", "Medical"], ["summit-seal", "Summit seal", "Government"], ["ring", "Gradient ring", "Modern"], ["eco", "Eco kraft", "Eco"],
];


/**
 * How each feature's screenshot is staged in the feature pass: `crop` is the part to zoom into, as
 * fractions of the 1440×900 screenshot [x, y, w, h]; `points` are the three callouts shown around it.
 */
export const FEATURE_STAGE = {
  registrations: { crop: [0.2, 0.1, 0.78, 0.43], points: ["Passes with seat limits", "Early-bird pricing", "Coupons & combo deals"] },
  payments: { points: ["Online or bank transfer", "Fees & GST shown up front", "Paid to your own Razorpay"], split: [
    { shot: "payments_a", crop: [0.355, 0.17, 0.505, 0.66], label: "Attendee picks how to pay" },
    { shot: "payments_b", crop: [0.365, 0.16, 0.485, 0.67], label: "Every rupee, itemised" }] },
  website: { crop: [0, 0.042, 1, 0.958], points: ["20 designed templates", "Click any text to edit", "Your own domain"] },
  submissions: { crop: [0.2, 0.13, 0.79, 0.6], points: ["Every stage, clear to authors", "Deadlines up front", "Their presentation slot"] },
  agenda: { crop: [0.19, 0.03, 0.62, 0.94], points: ["Session types in a tap", "Halls, tracks & timing", "Draft until you publish"] },
  badges: { crop: [0.01, 0.01, 0.98, 0.98], points: ["Drag-and-drop studio", "Real size, ready to print", "Colours per badge type"] },
  checkin: { crop: [0.2, 0.17, 0.78, 0.82], points: ["Gates, halls, meals, kits", "Clusters share one rule", "Keeps scanning offline"] },
  engagement: { points: ["Q&A linked to each session", "Upvotes & on-screen questions", "Poll results, live"], split: [
    { shot: "qa", crop: [0.46, 0.19, 0.51, 0.8], label: "Live Q&A" },
    { shot: "polls", crop: [0.2, 0.25, 0.385, 0.44], label: "Live polls" }] },
  chat: { points: ["One-to-one & group chats", "Book meetings in free slots", "Stored encrypted"], split: [
    { shot: "chat", crop: [0.42, 0.23, 0.33, 0.72], label: "Chat" },
    { shot: "meetings", crop: [0.21, 0.27, 0.52, 0.48], label: "One-to-one meetings" }] },
  volunteers: { crop: [0.2, 0.03, 0.78, 0.85], points: ["Pick each volunteer's tools", "One-tap sign-in, no account", "Access ends on its own"] },
  forms: { crop: [0.25, 0.03, 0.5, 0.95], points: ["Any question type", "A public link", "Answers in one table"] },
  sponsors: { crop: [0.2, 0.22, 0.78, 0.45], points: ["Your own tiers", "Free passes per tier", "Exhibitor packages"] },
  certificates: { crop: [0.2, 0.29, 0.78, 0.7], points: ["Drag-and-drop designer", "Sent to everyone at once", "A verify link on each"] },
  vvip: { stack: true, points: ["Protocol guest list", "Passes in one click", "Room requests, accepted or waitlisted"], split: [
    { shot: "vvip", crop: [0.21, 0.6, 0.76, 0.31], label: "VVIP guests" },
    { shot: "stay", crop: [0.21, 0.435, 0.76, 0.32], label: "Rooms & requests" }] },
  analytics: { crop: [0.2, 0.1, 0.78, 0.9], points: ["Registrations over time", "Revenue & check-ins", "Download any report"] },
};

/** The story's opening: the tools an event usually juggles, and what each costs (no product names). */
export const MESS_TOOLS = [
  ["clipboard-list", "Form builder", "Exports to CSV"],
  ["credit-card", "Payment links", "Matched by hand"],
  ["globe", "Website tool", "Copied by hand"],
  ["file-text", "Paper review", "Another login"],
  ["qr-code", "Check-in app", "Re-imported list"],
  ["award", "Certificate tool", "Mail merge"],
  ["messages-square", "Chat groups", "Lost in threads"],
  ["archive", "Spreadsheets", "Five versions"],
];

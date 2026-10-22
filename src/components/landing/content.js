// Copy for /landing. Shipped features only; keep it in step with the app.

export const CONTACT_EMAIL = "contact@planyt.in";

export const ROLE_CARDS = [
  { name: "Organizer", pass: [["Signs in", "Shared login"], ["Sees", "Whole event"], ["Kept out", "Nothing"]], access: "Login shared by Planyt once your plan is agreed.", icon: "sliders-horizontal", who: "You and your committee", desc: "One dashboard per event with everything: registrations, money, papers, agenda, sponsors, volunteers and certificates.", see: ["Live registrations and revenue", "Payment approvals", "Papers, reviews and decisions", "Agenda, halls and live sessions", "Sponsors, volunteers and certificates"], kept: "Nothing. Organizers see the whole event." },
  { name: "Volunteer", pass: [["Signs in", "Access key"], ["Sees", "Desk & tasks"], ["Kept out", "Revenue, reviews"]], access: "Volunteer portal, with their email and the access key you give them.", icon: "user-check", who: "Desk and hall volunteers", desc: "Their tasks for the day, the hall they are assigned to, and the desk scanner.", see: ["Volunteer tasks per hall", "Desk scanner with duplicate alerts", "Walk-in registration on the spot", "Access windows for event staff"], kept: "Revenue, payments and paper reviews." },
  { name: "Reviewer", pass: [["Signs in", "Invite link"], ["Sees", "Assigned papers"], ["Kept out", "Author names"]], access: "An invite link from the organizer.", icon: "circle-check", who: "Your review committee", desc: "The papers assigned to them, a scoring form and a place to leave comments.", see: ["Assigned abstracts and full papers", "Scores and comments per paper", "Revision rounds"], kept: "Author names during blind review, and the registration list." },
  { name: "Sponsor", pass: [["Signs in", "Sponsor portal"], ["Sees", "Team & stall"], ["Kept out", "Attendee data"]], access: "Registers on the event page, then uses the sponsor portal once approved.", icon: "store", who: "Partners and exhibitors", desc: "A portal for their team, their stall and their brand material.", see: ["Team passes", "Stall on the floor plan", "Gallery and brochures", "Sponsored banners and announcements"], kept: "Attendee data, revenue and papers." },
  { name: "Attendee & author", pass: [["Signs in", "At registration"], ["Sees", "Pass & agenda"], ["Kept out", "Others' details"]], access: "Signs up while registering for the event.", icon: "users", who: "Everyone who registers", desc: "Their pass, the agenda, their paper status and their certificate.", see: ["One QR pass", "Agenda and live sessions", "Session Q&A and polls", "Paper status and certificates"], kept: "Other attendees' details and everything organizers manage." },
];

export const FAQS = [
  ["How do I get an organizer account?", "Write to us with your event details. Once the quote is agreed, Planyt sets up your account and shares the login."],
  ["How is pricing decided?", "By event size, the modules you need and how many events you run a year."],
  ["Where does the ticket money go?", "Straight to your own Razorpay account. Bank and UPI receipts are approved by you."],
  ["Do attendees need to install an app?", "No. Their pass, the agenda, Q&A and polls open in the browser."],
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

/**
 * Website builder (src/sites): the template shown beside each step. Bold templates in their real
 * colours, fonts and hero copy (src/sites/kit/templates.js).
 */
export const WEBSITE_LOOKS = [
  { name: "Signal", url: "devsummit.in", category: "Tech summit", bg: "#0B0C07", fg: "#F2F4F7", muted: "#9AA6B2", accent: "#C6F432", accent2: "#FF5C8A", onAccent: "#0B0C07", card: "#14161C", line: "#232C36", font: "'Space Grotesk', system-ui, sans-serif",
    short: "DEVSUMMIT", badge: "Developer summit", tag: "2027", title: "Build what ships", hl: "next.", intro: "Two days of deep technical talks, live coding and workshops for engineers who ship.", ctas: ["Get tickets", "See the agenda"], links: ["Speakers", "Agenda", "Workshops", "Venue", "Sponsors"], visual: "countdown", stats: [["Stages", "4"], ["Talks", "40+"], ["Hack night", "Day 1"]] },
  { name: "Carnival", url: "artsmela.in", category: "Festival", bg: "#FAF2F6", fg: "#1A1423", muted: "#6B5A70", accent: "#FF4F8B", accent2: "#FFD43B", onAccent: "#FFFFFF", card: "#FFFFFF", line: "#1A1423", font: "'Bricolage Grotesque', system-ui, sans-serif", offset: true,
    short: "ARTS MELA", badge: "3 days · 6 stages", tag: "2027", title: "City Arts", hl: "Mela", intro: "Music, food, theatre and craft across six stages in the old mill district.", ctas: ["Get tickets", "See the line-up"], links: ["Line-up", "Eat & do", "Tickets", "Map", "FAQ"], visual: "lineup", stats: [["Stages", "6"], ["Artists", "120"], ["Food stalls", "40"]] },
  { name: "Build", url: "build36.planyt.in", category: "Hackathon", bg: "#0E0C17", fg: "#F4F2FF", muted: "#A9A3C7", accent: "#7C5CFF", accent2: "#4ADE80", onAccent: "#FFFFFF", card: "#1E1B2E", line: "#2E2A45", font: "Unbounded, system-ui, sans-serif",
    short: "BUILD/36", badge: "$ register --team", tag: "Free", title: "36 hours. Real problems.", hl: "₹10 lakh in prizes.", intro: "Build with mentors from India's best product teams. Teams of 2–4.", ctas: ["Register your team", "Read the problems"], links: ["Problems", "Prizes", "Timeline", "Mentors", "Rules"], visual: "terminal", stats: [["Hours", "36"], ["Teams", "250"], ["Mentors", "60"]] },
  { name: "Pavilion", url: "mfgexpo.in", category: "Trade expo", bg: "#F2F3F5", fg: "#12161C", muted: "#596170", accent: "#FF8A1F", accent2: "#FFD000", onAccent: "#12161C", card: "#FFFFFF", line: "#D9DCE2", font: "Archivo, system-ui, sans-serif", upper: true, square: true,
    short: "MFG EXPO", badge: "3 days · 5 halls", tag: "Trade only", title: "Build. Source.", hl: "Scale.", intro: "India's manufacturing expo: 400 exhibitors, 30,000 trade visitors.", ctas: ["Register to visit", "Book a stand"], links: ["Exhibitors", "Floor plan", "Seminars", "Visit", "Contact"], visual: "halls", stats: [["Exhibitors", "400"], ["Halls", "5"], ["Visitors", "30k"]] },
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

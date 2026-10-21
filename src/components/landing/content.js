// Copy for /landing. Shipped features only; keep it in step with the app.

export const CONTACT_EMAIL = "contact@planyt.in";
export const STAGES = [
  { name: "Onboard", title: "Your workspace, ready in a day", items: ["Sign up free, or we set you up", "Add dates, venue and halls", "Switch on only the modules you need"] },
  { name: "Brand it", title: "Make the event unmistakably yours", items: ["Your logo, banner and colours", "Registration form with your own fields", "Passes, pricing, coupons and combos"] },
  { name: "Open doors", title: "Registrations and payments roll in", items: ["Online payments to your own account", "Bank transfers approved in one click", "Receipts and emails sent for you"] },
  { name: "Team up", title: "Bring in sponsors, volunteers and reviewers", items: ["Sponsor tiers, stalls and team passes", "Volunteers with their own access levels", "Reviewers and paper rounds, if you need them"] },
  { name: "Event day", title: "Doors open, nothing missed", items: ["QR scan and on-spot registration", "VVIP guests, badges and rooms", "Live agenda, Q&A and announcements"] },
  { name: "Wrap up", title: "Certificates out, next edition in", items: ["Certificates designed and sent in bulk", "Reports and audit logs", "Everything archived for next time"] },
];

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
  ["How does peer review work?", "Abstract and full-paper rounds, blind scores from your reviewers, then decisions and presentation slots."],
  ["Do attendees need to install an app?", "No. Their pass, the agenda, Q&A and polls open in the browser."],
  ["Can I run more than one event?", "Yes. Each event gets its own dashboard; ask us for a yearly quote."],
  ["Can the event have its own website?", "Yes. Build it in Planyt and publish it on yourevent.planyt.in or your own domain, with registration built in."],
];

/** "Your event, your data" strip. Only what Planyt really does; keep it that way. */
export const TRUST = [
  ["credit-card", "Your money, your account", "Ticket payments settle in your own Razorpay account. Planyt takes no cut of ticket sales."],
  ["shield", "Each role sees only its job", "Volunteers never see revenue, reviewers never see author names in blind review, sponsors never see attendee data."],
  ["file-check", "Every change on record", "Volunteer actions and admin changes are kept in audit logs: who did what, and when."],
  ["user-check", "Personal data handled properly", "Attendees can download their data or ask for it to be deleted, as the DPDP Act requires."],
  ["lock", "Sign-ins built for events", "Passwords are never stored in readable form, sign-in attempts are limited, and volunteers sign in with one-tap links."],
  ["archive", "Nothing lost after the event", "Export a full backup of an event, and keep it archived for the next edition."],
];

/** Website builder highlight: only what the builder really does (src/sites). */
export const WEBSITE_POINTS = [
  ["layout-template", "20 designed templates", "Academic, tech, medical, corporate, festival, hackathon and more. Each one a full multi-page site."],
  ["mouse-pointer-click", "Click to edit anything", "Change any text, button or card in place. Add, move or hide sections, and tune phone and tablet views."],
  ["globe", "Your address, secure", "Publish on yourevent.planyt.in or your own domain, with HTTPS set up for you."],
  ["calendar-clock", "Always up to date", "Registration, speakers and programme come live from your event. Nothing to copy twice."],
  ["search", "Found and shared", "Fast pages, search and share previews, a secret preview link, and page-view counts."],
  ["image", "Branded your way", "Your logo, partner logos, colours and fonts, with 8 themes to start from."],
];

/** Three real templates the mock-up cycles through (colours from src/sites/kit/templates.js looks). */
export const WEBSITE_LOOKS = [
  { name: "Scholar", category: "Academic", url: "icml2026.planyt.in", place: "Bengaluru", bg: "#F7F9FD", fg: "#0B1530", muted: "#5B6680", accent: "#0052C9", onAccent: "#FFFFFF", card: "#FFFFFF", line: "#E1E6EE", font: "Georgia, 'Times New Roman', serif",
    event: { short: "ICML 2026", when: "20–22 Nov 2026", title: "International Conference on Machine Learning", line: "Three days of keynotes, paper sessions and workshops. Call for papers open.", cards: [["Papers due", "15 Aug"], ["Tracks", "6"], ["Seats", "1,200"]] } },
  { name: "Signal", category: "Tech", url: "summit.yourcompany.com", place: "Hyderabad", bg: "#0B0F14", fg: "#F2F5F8", muted: "#9AA6B2", accent: "#C6F432", onAccent: "#0B0F14", card: "#141A21", line: "#232C36", font: "'JetBrains Mono', ui-monospace, monospace",
    event: { short: "DEVSUMMIT", when: "6–7 Feb 2027", title: "Build. Ship. Scale.", line: "Four stages, forty talks and a hack night for people who ship software.", cards: [["Stages", "4"], ["Talks", "40+"], ["Hack night", "Day 1"]] } },
  { name: "Clinic", category: "Medical", url: "congress.yoursociety.org", place: "Chennai", bg: "#F3FBF9", fg: "#0B2B26", muted: "#4E6B66", accent: "#0F766E", onAccent: "#FFFFFF", card: "#FFFFFF", line: "#CDE9E3", font: "Inter, system-ui, sans-serif",
    event: { short: "CardioCon", when: "12–14 Mar 2027", title: "Annual Cardiology Congress", line: "Live case sessions, faculty-led workshops and CME credits for every attendee.", cards: [["CME credits", "12"], ["Workshops", "8"], ["Faculty", "60+"]] } },
];

export const EVENT_TYPES = ["Conferences", "Symposiums", "Workshops", "Seminars", "Summits", "Congresses", "Calls for papers", "Universities"];

/**
 * Features as a pass: name, one short line, and three [label, value] fields (like Date / Doors / Hall
 * on an entry pass). Keep the line under ~60 characters and each value to two or three words.
 */
export const FEATURES = [
  ["Registration & tickets", "clipboard-list", "Forms, tiers and coupons, live in minutes.", [["Forms", "Custom fields"], ["Tickets", "Tiers & caps"], ["Offers", "Coupons"]]],
  ["Payments", "credit-card", "Ticket money lands in your own Razorpay account.", [["Paid to", "Your Razorpay"], ["Offline", "UPI & bank"], ["Failed", "Auto recovery"]]],
  ["Event website", "globe", "Your event's own site, live on your domain in minutes.", [["Address", "you.planyt.in"], ["Domain", "Your own"], ["Editor", "Drag & drop"]]],
  ["Call for papers & submissions", "file-text", "Papers, proposals or posters, with blind review.", [["Rounds", "Abstract + full"], ["Also", "Proposals & more"], ["Review", "Blind scores"]]],
  ["Agenda & sessions", "calendar-clock", "Halls, tracks and what's live right now.", [["Tracks", "Parallel"], ["Status", "Live now"], ["Export", "PDF / CSV"]]],
  ["Badges & check-in", "qr-code", "One QR pass, scanned in a second, even offline.", [["Pass", "One QR"], ["Badges", "Bulk print"], ["Desk", "Works offline"]]],
  ["Live engagement", "message-square", "Q&A, polls and alerts, right in the browser.", [["Q&A", "Upvotes"], ["Polls", "Live results"], ["Alerts", "Push"]]],
  ["Sponsors", "store", "Tiers, stalls and a portal for every sponsor.", [["Tiers", "Your own"], ["Stalls", "Floor plan"], ["Portal", "Team passes"]]],
  ["Certificates", "award", "Verifiable certificates, sent to everyone at once.", [["Design", "Templates"], ["Send", "In bulk"], ["Check", "Verify link"]]],
  ["Guests & logistics", "bed-double", "VVIPs, rooms and volunteers, all in one place.", [["VVIP", "Protocol list"], ["Rooms", "Inventory"], ["Volunteers", "Hall tasks"]]],
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

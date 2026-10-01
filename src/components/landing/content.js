// Copy for /landing. Shipped features only; keep it in step with the app.

export const CONTACT_EMAIL = "contact@planyt.in";

export const STAGES = [
  { name: "Set up", title: "Create the event in an afternoon", body: "Add dates, venue, halls and tracks. Build the registration form with exactly the fields you need, set ticket tiers, and connect your own Razorpay account.", items: ["Registration form builder", "Ticket tiers, add-ons and coupons", "Payments straight to your account"] },
  { name: "Open", title: "Open registration and the call for papers", body: "Publish the event, take registrations and payments, and collect abstracts in the same place.", items: ["Custom forms with file uploads", "Abstract and full-paper rounds", "Bank / UPI receipts approved in one click"] },
  { name: "Prepare", title: "Review papers and build the agenda", body: "Assign reviewers, collect blind scores, and turn accepted papers into sessions across halls and tracks.", items: ["Reviewer roster and assignments", "Tracks, halls and parallel sessions", "Badge designer and bulk printing"] },
  { name: "Event day", title: "Check people in and run the halls", body: "Every attendee carries one QR pass. Desks scan it, sessions go live, and questions come in from the audience.", items: ["Desk scanner with duplicate alerts", "Session Q&A with upvotes and moderation", "Volunteer tasks per hall"] },
  { name: "Wrap up", title: "Send certificates and close the books", body: "Certificates go out to each group with verifiable links, and the whole event is archived for next year.", items: ["Bulk send to any group", "Verifiable certificate links", "Event archive and backup export"] },
];

export const MODULES = [
  ["Registration & tickets", "clipboard-list", ["Custom forms with file uploads", "Tiers with dates, caps and tax", "Coupons, bundles and speaker waivers", "Searchable attendee list with exports"]],
  ["Payments", "credit-card", ["Connect your Razorpay, or use API keys", "Bank / UPI receipts approved in one click", "Rejections tell the attendee why", "Payment recovery for failed checkouts"]],
  ["Call for papers & review", "file-text", ["Abstract and full-paper rounds", "Reviewer roster and assignments", "Blind review with scores and comments", "Revisions, decisions and presentation slots"]],
  ["Agenda & sessions", "calendar-clock", ["Tracks, halls and parallel sessions", "Live-now status and delay updates", "Slides and papers linked to sessions", "PDF / CSV agenda export"]],
  ["Badges & check-in", "qr-code", ["One QR pass per attendee", "Badge designer and bulk printing", "Desk scanner with duplicate alerts", "Walk-in registration on the spot"]],
  ["Live engagement", "message-square", ["Session Q&A with upvotes and moderation", "Live polls and quizzes with leaderboard", "Attendee chat with moderation", "Push and in-app announcements"]],
  ["Sponsors & exhibition", "store", ["Sponsor tiers and deliverables", "Floor plan and stall allocation", "Sponsor portal: team passes, gallery, brochures", "Sponsored banners and announcements"]],
  ["Certificates & records", "award", ["Certificate designer with placeholders", "Bulk send to any group", "Verifiable certificate links", "Event archive and backup export"]],
  ["Guests & logistics", "bed-double", ["VVIP and dignitary protocol list", "Accommodation and room inventory", "Volunteer tasks per hall", "Access windows for event staff"]],
];

export const ROLE_CARDS = [
  { name: "Organizer", access: "Login shared by Planyt once your plan is agreed.", icon: "sliders-horizontal", who: "You and your committee", desc: "One dashboard per event with everything: registrations, money, papers, agenda, sponsors, volunteers and certificates.", see: ["Live registrations and revenue", "Payment approvals", "Papers, reviews and decisions", "Agenda, halls and live sessions", "Sponsors, volunteers and certificates"], kept: "Nothing. Organizers see the whole event." },
  { name: "Volunteer", access: "Volunteer portal, with their email and the access key you give them.", icon: "user-check", who: "Desk and hall volunteers", desc: "Their tasks for the day, the hall they are assigned to, and the desk scanner.", see: ["Volunteer tasks per hall", "Desk scanner with duplicate alerts", "Walk-in registration on the spot", "Access windows for event staff"], kept: "Revenue, payments and paper reviews." },
  { name: "Reviewer", access: "An invite link from the organizer.", icon: "circle-check", who: "Your review committee", desc: "The papers assigned to them, a scoring form and a place to leave comments.", see: ["Assigned abstracts and full papers", "Scores and comments per paper", "Revision rounds"], kept: "Author names during blind review, and the registration list." },
  { name: "Sponsor", access: "Registers on the event page, then uses the sponsor portal once approved.", icon: "store", who: "Partners and exhibitors", desc: "A portal for their team, their stall and their brand material.", see: ["Team passes", "Stall on the floor plan", "Gallery and brochures", "Sponsored banners and announcements"], kept: "Attendee data, revenue and papers." },
  { name: "Attendee & author", access: "Signs up while registering for the event.", icon: "users", who: "Everyone who registers", desc: "Their pass, the agenda, their paper status and their certificate.", see: ["One QR pass", "Agenda and live sessions", "Session Q&A and polls", "Paper status and certificates"], kept: "Other attendees' details and everything organizers manage." },
];

export const FAQS = [
  ["How do I get an organizer account?", "Write to us with your event details. Once the quote is agreed, Planyt sets up your account and shares the login."],
  ["How is pricing decided?", "By event size, the modules you need and how many events you run a year."],
  ["Where does the ticket money go?", "Straight to your own Razorpay account. Bank and UPI receipts are approved by you."],
  ["How does peer review work?", "Abstract and full-paper rounds, blind scores from your reviewers, then decisions and presentation slots."],
  ["Do attendees need to install an app?", "No. Their pass, the agenda, Q&A and polls open in the browser."],
  ["Can I run more than one event?", "Yes. Each event gets its own dashboard; ask us for a yearly quote."],
];

export const EVENT_TYPES = ["Conferences", "Symposiums", "Workshops", "Seminars", "Summits", "Congresses", "Calls for papers", "Universities"];

// Role dashboards shown on the hero laptop: a 1280×800 picture of each home page
// (attendee, organizer, volunteer, reviewer, sponsor) with sample data. Not interactive.
// Shell here; the home bodies are in ./dashHomes.js.
import React from "react";
import { Ico, FakeQr } from "./kit";
import { brandLogoSrc } from "./BrandLogo";

const h = React.createElement;

export const T = {
  paper: "#f9fafc", hairline: "#e3e6ed", sand: "#f1f3f8", ink: "#111826", ink2: "#4b5464", muted: "#6b7382", faint: "#9ba2ae",
  lilac: "#eef4fd", lilacInk: "#0052c9", sage: "#e4f0e8", sageInk: "#2f6b46", butter: "#fbf1d6", butterInk: "#8a5a00",
  blush: "#fbe7e4", blushInk: "#a33a2e", sky: "#e0f2fe", skyInk: "#245d8f",
  cat: { blue: ["#e4edfe", "#1565ff"], violet: ["#f1ebfe", "#6d28d9"], teal: ["#e6f7f5", "#0f766e"], pink: ["#fdebf4", "#be185d"], sky: ["#e0f2fe", "#0369a1"], amber: ["#fef5e7", "#b45309"] },
  disp: "'Plus Jakarta Sans',sans-serif",
};
export const ROLES = {
  attendee: { label: "Attendee", a: "#0052c9", a7: "#0043a6", a1: "#dce8fb" },
  organizer: { label: "Organizer", a: "#1565ff", a7: "#144bb7", a1: "#e4edfe" },
  volunteer: { label: "Volunteer", a: "#6d28d9", a7: "#5b21b6", a1: "#f1ebfe" },
  reviewer: { label: "Reviewer", a: "#0d9488", a7: "#0f766e", a1: "#ccfbf1" },
  sponsor: { label: "Sponsor", a: "#c026d3", a7: "#a21caf", a1: "#fae8ff" },
};
const NAV = {
  attendee: [
    ["Overview", "blue", [["home", "Home"], ["ticket", "My event"], ["calendar-days", "Agenda"]]],
    ["Participate", "violet", [["file-text", "Papers"], ["folder-open", "Materials"], ["messages-square", "Live"], ["trophy", "Leaderboard"], ["message-circle", "Chat"]]],
    ["Event", "teal", [["megaphone", "Announcements"], ["star", "Sponsors"], ["bed-double", "Accommodation"], ["award", "Certificates"]]],
  ],
  organizer: [
    ["Event", "blue", [["home", "Home"], ["users", "Registrations"], ["badge-check", "Payment approvals"], ["calendar-days", "Agenda"]]],
    ["Papers", "violet", [["file-text", "Submissions"], ["list-checks", "Assignments"], ["users-round", "Reviewers"]]],
    ["On the day", "teal", [["qr-code", "QR & badges"], ["messages-square", "Live Q&A"], ["star", "Sponsors"], ["award", "Certificates"]]],
  ],
  volunteer: [
    ["Today", "blue", [["home", "Home"]]],
    ["Desk", "teal", [["scan-line", "Check-in"], ["user-plus", "Registration desk"], ["ticket", "Badges"], ["crown", "VVIP guests"]]],
    ["Stage", "violet", [["message-square-text", "Q&A moderation"], ["bar-chart-3", "Polls"], ["monitor-play", "Presenter"], ["calendar-days", "Schedule"]]],
    ["You", "pink", [["shield", "My access"]]],
  ],
  reviewer: [
    ["Reviews", "teal", [["home", "Home"], ["file-text", "Abstracts"], ["file-check", "Full papers"], ["refresh-ccw", "Revisions"]]],
    ["You", "blue", [["clock", "History"], ["settings", "Settings"]]],
  ],
  sponsor: [
    ["Sponsorship", "pink", [["home", "Home"], ["building-2", "Company profile"], ["users", "Free passes"], ["store", "Exhibitor stall"]]],
    ["Engage", "violet", [["image", "Gallery"], ["megaphone", "Announcements"], ["calendar-check", "Meetings"], ["message-circle", "Chat"]]],
  ],
};
const USER = {
  attendee: ["Aisha Khan", "IIT Madras", "AK"], organizer: ["Ravi Menon", "Organizing committee", "RM"], volunteer: ["Sneha Rao", "Desk volunteer", "SR"],
  reviewer: ["Dr. Arjun Iyer", "Programme committee", "AI"], sponsor: ["Northwind Labs", "Gold sponsor", "NL"],
};
const TITLE = {
  attendee: ["Good morning, Aisha", "Conference on Applied AI · Chennai"],
  organizer: ["Conference on Applied AI", "12–14 Nov · Chennai Trade Centre"],
  volunteer: ["Hi Sneha, you’re on Gate 2", "Conference on Applied AI · Thursday, 12 November"],
  reviewer: ["Welcome back, Dr. Iyer", "Conference on Applied AI · Programme committee"],
  sponsor: ["Welcome back, Northwind Labs!", "Gold Sponsor at Conference on Applied AI"],
};

/** Small builders shared by the home bodies. */
export const kit = {
  ico: (n, c, s) => h(Ico, { n, c, s }),
  tile: (extra, ...ch) => h("section", { style: { borderRadius: 24, background: "#fff", border: "1px solid " + T.hairline, padding: 20, display: "flex", flexDirection: "column", gap: 12, minWidth: 0, ...extra } }, ...ch),
  h3: (t, right) => h("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, h("h3", { style: { margin: 0, flex: 1, fontFamily: T.disp, fontSize: 17, fontWeight: 700, color: T.ink } }, t), right || null),
  link: (t, c) => h("span", { style: { fontSize: 13, fontWeight: 600, color: c } }, t),
  chip: (t, bg, fg) => h("span", { style: { fontSize: 12, fontWeight: 600, padding: "4px 8px", borderRadius: 8, background: bg, color: fg, whiteSpace: "nowrap" } }, t),
  btn: (t, bg, fg, extra) => h("span", { style: { height: 44, padding: "0 16px", borderRadius: 12, background: bg, color: fg, fontSize: 14, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8, whiteSpace: "nowrap", ...extra } }, ...[].concat(t)),
  bar: (pct, c, bg, ht) => h("div", { style: { height: ht || 8, borderRadius: 99, background: bg || T.sand } }, h("div", { style: { height: "100%", width: pct + "%", borderRadius: 99, background: c } })),
  grid: (cols, ...ch) => h("div", { style: { display: "grid", gridTemplateColumns: cols, gap: 16, alignItems: "stretch" } }, ...ch),
  qr: (s) => h(FakeQr, { size: s, ink: T.ink }),
};

function sidebar(role, activeLabel) {
  const R = ROLES[role], u = USER[role];
  const groups = NAV[role].map(([label, tone, items], gi) => h("div", { key: label },
    h("p", { style: { margin: 0, padding: "14px 10px 6px", fontSize: 11, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: T.cat[tone][1] } }, label),
    items.map(([ic, l], ii) => {
      const on = activeLabel ? l === activeLabel : gi === 0 && ii === 0;
      return h("div", { key: l, style: { height: 42, padding: "0 8px", borderRadius: 12, display: "flex", alignItems: "center", gap: 12, fontSize: 14, fontWeight: on ? 600 : 500, color: on ? T.ink : T.ink2, background: on ? T.cat[tone][0] : "transparent" } },
        h("span", { style: { width: 30, height: 30, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: on ? "rgba(255,255,255,.8)" : T.cat[tone][0] } }, kit.ico(ic, T.cat[tone][1], 16)), l);
    })));
  return h("nav", { style: { width: 248, flex: "none", margin: "20px 0 20px 20px", borderRadius: 24, background: "#fff", border: "1px solid " + T.hairline, display: "flex", flexDirection: "column", padding: "18px 12px 14px" } },
    h("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "0 6px", marginBottom: 10 } }, h("img", { src: brandLogoSrc("horizontal", "light"), alt: "", style: { height: 26 } }), h("span", { style: { flex: 1 } }),
      h("span", { style: { fontSize: 11, fontWeight: 700, padding: "4px 8px", borderRadius: 8, background: R.a1, color: R.a7 } }, R.label)),
    h("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: 10, borderRadius: 16, background: T.paper, marginBottom: 2 } },
      h("span", { style: { width: 34, height: 34, borderRadius: 10, background: T.lilac, color: T.lilacInk, fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" } }, "CA"),
      h("span", null, h("span", { style: { display: "block", fontSize: 13, fontWeight: 700, color: T.ink } }, "Conference on Applied AI"), h("span", { style: { display: "block", fontSize: 12, color: T.muted } }, "12–14 Nov · Chennai"))),
    h("div", { style: { flex: 1, overflow: "hidden" } }, groups),
    h("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 8px 0", borderTop: "1px solid " + T.hairline } },
      h("span", { style: { width: 36, height: 36, borderRadius: "50%", background: R.a, color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" } }, u[2]),
      h("span", null, h("span", { style: { display: "block", fontSize: 13, fontWeight: 700, color: T.ink } }, u[0]), h("span", { style: { display: "block", fontSize: 12, color: T.muted } }, u[1]))));
}

function header(role, title) {
  const [t, s] = title || TITLE[role];
  return h("header", { style: { display: "flex", alignItems: "center", gap: 16, padding: "26px 4px 18px" } },
    h("div", { style: { flex: 1, minWidth: 0 } }, h("p", { style: { margin: 0, fontSize: 13, color: T.muted } }, s), h("h1", { style: { margin: "2px 0 0", fontFamily: T.disp, fontSize: 28, fontWeight: 700, letterSpacing: "-.02em", color: T.ink } }, t)),
    h("span", { style: { width: 260, height: 44, borderRadius: 99, background: "#fff", border: "1px solid " + T.hairline, display: "flex", alignItems: "center", gap: 10, padding: "0 16px", fontSize: 14, color: T.faint } }, kit.ico("search", T.faint, 16), "Search"),
    h("span", { style: { position: "relative", width: 44, height: 44, borderRadius: 99, background: "#fff", border: "1px solid " + T.hairline, display: "flex", alignItems: "center", justifyContent: "center" } }, kit.ico("bell", T.ink2, 18), h("span", { style: { position: "absolute", top: 10, right: 11, width: 8, height: 8, borderRadius: "50%", background: "#e0533f" } })));
}

/** Full dashboard at 1280×800; the caller scales it. */
export const renderDash = (role, body, opts = {}) => h("div", { style: { width: 1280, height: 800, display: "flex", background: T.paper, fontFamily: "'Inter',system-ui,sans-serif", color: T.ink, overflow: "hidden", textAlign: "left" } },
  sidebar(role, opts.active),
  h("main", { style: { flex: 1, minWidth: 0, padding: "0 24px 24px", overflow: "hidden" } }, header(role, opts.title), h("div", { key: opts.key || role, className: "pl-fade" }, body)));

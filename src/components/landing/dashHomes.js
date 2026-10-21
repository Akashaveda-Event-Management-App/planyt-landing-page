// Home-page bodies for the hero laptop (sample data). `t` ticks once a second so numbers move.
// Layouts follow Attendee/HomePage, Organizer/OrganizerHome, VolunteerDashboard, Reviewer and Sponsor homes.
import React from "react";
import { T, ROLES, kit } from "./dashShell";

const h = React.createElement;
const { ico, tile, h3, link, chip, btn, bar, grid, qr } = kit;
const blink = (s) => ({ animation: `pl-blink ${s}s infinite` });

const attendee = (t) => {
  const R = ROLES.attendee;
  const days = [["Thu", 12], ["Fri", 13], ["Sat", 14]];
  const steps = [["Abstract submitted", "done"], ["Abstract accepted", "done"], ["Full paper upload", "now"], ["Camera-ready", "todo"]];
  const agenda = [["09:30", "Opening keynote", "Hall A"], ["10:30", "Applied vision track", "Hall B"], ["11:30", "Paper session 3 · your talk", "Hall B"], ["12:30", "Panel: AI in health", "Hall A"]];
  const live = t % 8 < 4 ? 1 : 2;
  return h("div", { style: { display: "flex", flexDirection: "column", gap: 16 } },
    grid("6fr 3fr 3fr",
      h("section", { style: { borderRadius: 24, background: R.a, color: "#fff", padding: 24, display: "flex", flexDirection: "column", minHeight: 270 } },
        h("div", { style: { display: "flex", alignItems: "flex-start", gap: 8 } }, h("span", { style: { flex: 1, fontSize: 14, color: "rgba(255,255,255,.75)" } }, "Your next event"),
          days.map(([d, n], i) => h("span", { key: n, style: { width: 44, height: 48, borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", lineHeight: 1.1, background: i === 0 ? "#fff" : "rgba(255,255,255,.15)", color: i === 0 ? R.a7 : "#fff" } }, h("span", { style: { fontSize: 10, fontWeight: 600, opacity: 0.8 } }, d), h("span", { style: { fontFamily: T.disp, fontSize: 16, fontWeight: 700 } }, n)))),
        h("div", { style: { display: "flex", alignItems: "baseline", gap: 12, marginTop: 6 } }, h("span", { style: { fontFamily: T.disp, fontSize: 84, fontWeight: 700, lineHeight: 1, letterSpacing: "-.05em" } }, 12), h("span", { style: { fontSize: 20, color: "rgba(255,255,255,.75)" } }, "days to go")),
        h("div", { style: { flex: 1 } }),
        h("h2", { style: { margin: 0, fontFamily: T.disp, fontSize: 22, fontWeight: 700 } }, "Conference on Applied AI"),
        h("p", { style: { margin: "4px 0 0", fontSize: 14, color: "rgba(255,255,255,.75)", display: "flex", alignItems: "center", gap: 6 } }, ico("map-pin", "rgba(255,255,255,.75)", 14), "Chennai Trade Centre"),
        h("div", { style: { display: "flex", gap: 8, marginTop: 16 } }, btn("Plan my agenda", "#fff", R.a7), btn("Registration details", "rgba(255,255,255,.15)", "#fff"))),
      h("section", { style: { position: "relative", overflow: "hidden", borderRadius: 24, background: "#fff", border: "1px solid " + T.hairline, display: "flex", flexDirection: "column" } },
        h("div", { style: { padding: "20px 20px 16px" } }, h("p", { style: { margin: 0, fontSize: 12, fontWeight: 600, color: T.faint } }, "Professional pass"), h("p", { style: { margin: "4px 0 0", fontFamily: T.disp, fontSize: 18, fontWeight: 700, color: T.ink } }, "Aisha Khan"), h("p", { style: { margin: 0, fontSize: 14, color: T.muted } }, "Confirmed")),
        h("div", { style: { margin: "0 16px", borderTop: "2px dashed " + T.hairline } }),
        h("span", { style: { position: "absolute", left: -12, top: 96, width: 24, height: 24, borderRadius: "50%", background: T.paper, border: "1px solid " + T.hairline } }),
        h("span", { style: { position: "absolute", right: -12, top: 96, width: 24, height: 24, borderRadius: "50%", background: T.paper, border: "1px solid " + T.hairline } }),
        h("div", { style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: 16 } }, qr(104), link("Open entry pass", R.a))),
      tile({},
        h3("My paper", chip("6 days left", T.butter, T.butterInk)),
        h("p", { style: { margin: 0, fontSize: 14, fontWeight: 600, lineHeight: 1.35, color: T.ink } }, "Federated learning at the network edge"),
        h("ol", { style: { margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 9 } }, steps.map(([l, s]) => h("li", { key: l, style: { display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: s === "todo" ? T.faint : T.ink, fontWeight: s === "now" ? 700 : 400 } },
          h("span", { style: { width: 20, height: 20, borderRadius: "50%", flex: "none", display: "flex", alignItems: "center", justifyContent: "center", background: s === "done" ? T.sageInk : "transparent", border: s === "done" ? "none" : "2px solid " + (s === "now" ? T.butterInk : T.hairline) } }, s === "done" ? ico("check", "#fff", 12) : null), l))),
        h("div", { style: { flex: 1 } }), btn("Upload full paper", R.a, "#fff", { justifyContent: "center" }))),
    grid("5fr 3fr 2fr 2fr",
      tile({},
        h3("Today’s agenda", link("Full agenda", R.a)),
        agenda.map(([tm, n, hall], i) => {
          const on = i === live;
          return h("div", { key: i, style: { display: "flex", alignItems: "center", gap: 12, padding: "9px 12px", borderRadius: 14, background: on ? R.a1 : T.paper, opacity: i < live ? 0.55 : 1, transition: "all .5s" } },
            h("span", { style: { fontSize: 12, fontWeight: 700, color: T.muted, width: 40 } }, tm),
            h("span", { style: { flex: 1, minWidth: 0 } }, h("span", { style: { display: "block", fontSize: 13.5, fontWeight: 600, color: T.ink } }, n), h("span", { style: { fontSize: 12, color: T.muted } }, hall)),
            on ? h("span", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#c62828" } }, h("span", { style: { width: 6, height: 6, borderRadius: "50%", background: "#e53935", ...blink(1.2) } }), "Live") : null);
        })),
      h("section", { style: { borderRadius: 24, background: T.blush, padding: 20, display: "flex", flexDirection: "column" } },
        h("p", { style: { margin: 0, display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: T.blushInk } }, h("span", { style: { width: 8, height: 8, borderRadius: "50%", background: "#e0533f", ...blink(1.4) } }), "Live now"),
        h("p", { style: { margin: "8px 0 0", fontFamily: T.disp, fontSize: 18, fontWeight: 700, color: "#3b1510", lineHeight: 1.25 } }, "Keynote Q&A: Scaling AI in production"),
        h("p", { style: { margin: "4px 0 0", fontSize: 14, color: T.blushInk } }, (38 + (t % 9)) + " questions · 1 poll open"),
        h("div", { style: { flex: 1 } }), btn("Join", "#fff", T.blushInk, { alignSelf: "flex-start", height: 40 })),
      h("section", { style: { borderRadius: 24, background: T.sage, padding: 20, display: "flex", flexDirection: "column" } },
        h("span", { style: { fontSize: 14, fontWeight: 600, color: T.sageInk } }, "Certificates"), h("span", { style: { fontFamily: T.disp, fontSize: 48, fontWeight: 700, color: "#1d4a30", lineHeight: 1, marginTop: 8 } }, 2), h("div", { style: { flex: 1 } }), h("span", { style: { fontSize: 14, fontWeight: 600, color: T.sageInk } }, "Download")),
      tile({},
        h("p", { style: { margin: 0, display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: T.sageInk } }, ico("check", T.sageInk, 14), "Paid"),
        h("p", { style: { margin: 0, fontFamily: T.disp, fontSize: 28, fontWeight: 700, color: T.ink } }, "₹3,000"), h("div", { style: { flex: 1 } }), link("My registrations", R.a))));
};

const organizer = (t) => {
  const R = ROLES.organizer;
  const tones = [T.cat.blue, T.cat.violet, T.cat.teal, T.cat.pink];
  const reg = 412 + (t % 30);
  const kpis = [["Registrations", reg, (reg - 31) + " confirmed"], ["Revenue", "₹" + (11.8 + (t % 30) * 0.03).toFixed(2) + "L", "after ₹42,500 discounts"], ["Submissions", 214, "148 abstracts · 66 full papers"], ["Checked in", "—", "event starts in 12 days"]];
  const trend = [3, 5, 4, 8, 6, 9, 7, 11, 10, 8, 12, 9, 14, 11, 13, 10, 15, 12, 16, 14, 18, 13, 17, 20, 16, 22, 19, 24, 21, 26];
  const queue = [["badge-check", "7 offline payments to verify", "Payment approvals", T.cat.amber], ["file-text", "12 papers without reviewers", "Assignments", T.cat.pink], ["star", "2 sponsor changes to approve", "Sponsor approvals", T.cat.violet], ["calendar-check", "Agenda has unpublished changes", "Agenda", T.cat.sky]];
  return h("div", { style: { display: "flex", flexDirection: "column", gap: 16 } },
    grid("repeat(4,1fr)", ...kpis.map(([l, v, s], i) => h("section", { key: l, style: { position: "relative", overflow: "hidden", borderRadius: 22, padding: 18, display: "flex", flexDirection: "column", gap: 2, background: tones[i][0], color: tones[i][1] } },
      h("span", { style: { position: "absolute", right: -18, top: -18, width: 72, height: 72, borderRadius: "50%", background: "currentColor", opacity: 0.08 } }),
      h("span", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600 } }, h("span", { style: { width: 8, height: 8, borderRadius: "50%", background: "currentColor" } }), l),
      h("span", { style: { fontFamily: T.disp, fontSize: 30, fontWeight: 800, color: T.ink, lineHeight: 1.2, fontVariantNumeric: "tabular-nums" } }, v), h("span", { style: { fontSize: 12 } }, s)))),
    grid("5fr 7fr",
      tile({}, h3("Needs you", chip("4 open", T.cat.amber[0], T.cat.amber[1])),
        queue.map(([ic, tx, lb, c]) => h("div", { key: lb, style: { display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 14, background: c[0], color: c[1] } }, ico(ic, c[1], 18), h("span", { style: { flex: 1, fontSize: 14, fontWeight: 600, color: T.ink } }, tx), h("span", { style: { fontSize: 12, fontWeight: 600 } }, lb), ico("arrow-right", c[1], 15)))),
      tile({}, h3("Registrations, last 30 days", link("Analytics", R.a)),
        h("div", { style: { display: "flex", alignItems: "flex-end", gap: 6, height: 170 } }, trend.map((v, i) => h("span", { key: i, style: { flex: 1, borderRadius: "6px 6px 0 0", background: i >= trend.length - 5 ? R.a : "#cbddfe", height: Math.max(3, (v + (i === trend.length - 1 ? t % 6 : 0)) / 30 * 100) + "%", transition: "height .6s" } }))),
        h("div", { style: { display: "flex", fontSize: 12, color: T.muted } }, h("span", null, "13 Sep"), h("span", { style: { flex: 1 } }), h("span", null, "12 Oct")))),
    grid("1fr 1fr 1fr",
      tile({}, h3("Papers", link("Submissions", R.a)), ...[["Papers with reviewers", "202 / 214", 94, R.a], ["Reviews completed", "311 / 428", 73, "#6d28d9"], ["Decisions sent", "96 / 148", 65, "#16a34a"]].map(([l, tx, p, c]) => h("div", { key: l, style: { display: "flex", flexDirection: "column", gap: 6 } }, h("div", { style: { display: "flex", fontSize: 13 } }, h("span", { style: { flex: 1, fontWeight: 600, color: T.ink } }, l), h("span", { style: { color: T.muted } }, tx)), bar(p, c, "#eef1f6")))),
      tile({}, h3("Pass mix"), ...[["Early bird", 168, "₹2,52,000"], ["Student", 131, "₹1,04,800"], ["Professional", 113, "₹3,39,000"]].map(([p, n, r], i) => h("div", { key: p, style: { display: "grid", gridTemplateColumns: "2fr 1fr 1.4fr", gap: 12, padding: "9px 12px", borderRadius: 12, fontSize: 13, background: i % 2 === 0 ? T.paper : "transparent" } }, h("span", { style: { fontWeight: 600, color: T.ink } }, p), h("span", null, n), h("span", null, r)))),
      tile({}, h3("Event status"), ...[["Registration open", "Closes 10 Nov", 1], ["Abstract submissions", "Closed 20 Sep", 0], ["Full paper submissions", "Closes 18 Oct", 1]].map(([l, d, on]) => h("div", { key: l, style: { display: "flex", alignItems: "center", gap: 12, padding: "6px 0", borderBottom: "1px solid #eef1f6" } }, h("span", { style: { flex: 1 } }, h("span", { style: { display: "block", fontSize: 13, fontWeight: 600, color: T.ink } }, l), h("span", { style: { fontSize: 12, color: T.muted } }, d)), chip(on ? "Open" : "Closed", on ? "#dcfce7" : "#eef1f6", on ? "#15803d" : T.muted))))));
};

const volunteer = (t) => {
  const R = ROLES.volunteer;
  const tools = [["scan-line", "Check-in", "Scan passes at your gate", T.cat.teal], ["user-plus", "Registration desk", "Register walk-ins and take payment", T.cat.amber], ["ticket", "Badges", "Print and reprint badges", T.cat.sky], ["crown", "VVIP guests", "Import guests and issue passes", T.cat.pink], ["message-square-text", "Q&A moderation", "Approve and feature questions", T.cat.pink], ["bar-chart-3", "Polls", "Open and close live polls", T.cat.violet], ["monitor-play", "Presenter", "Run the hall’s paper queue", T.cat.violet], ["calendar-days", "Schedule", "Mark delays in your hall", T.cat.sky]];
  const alerts = [["URGENT", "Hall B starts 10 minutes late", "Tell attendees at Gate 2 to head to Hall A first.", T.blush, T.blushInk], ["ANNOUNCEMENT", "Lunch moved to the lawn", "Counters open at 12:45.", T.lilac, T.lilacInk]];
  return h("div", { style: { display: "flex", flexDirection: "column", gap: 16 } },
    grid("8fr 4fr",
      h("section", { style: { borderRadius: 24, background: R.a, color: "#fff", padding: 24, display: "flex", gap: 20, minHeight: 230 } },
        h("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 6, minWidth: 0 } },
          h("span", { style: { fontSize: 14, color: R.a1 } }, "Your station"), h("span", { style: { fontFamily: T.disp, fontSize: 36, fontWeight: 700, lineHeight: 1.1 } }, "Gate 2 · Main entrance"),
          h("span", { style: { fontSize: 14, color: R.a1 } }, "Desk lead · Conference on Applied AI"),
          h("div", { style: { display: "flex", gap: 24, marginTop: 10 } }, ...[["Scanned today", 186 + (t % 40)], ["Walk-ins", 14 + (t % 5)], ["Badges printed", 63]].map(([l, v]) => h("div", { key: l }, h("div", { style: { fontFamily: T.disp, fontSize: 26, fontWeight: 700, fontVariantNumeric: "tabular-nums" } }, v), h("div", { style: { fontSize: 12, color: R.a1 } }, l)))),
          h("div", { style: { flex: 1 } }),
          h("div", { style: { display: "flex", gap: 10, marginTop: 12 } }, btn([ico("scan-line", R.a7, 17), "Start scanning"], "#fff", R.a7), btn("My access", "rgba(255,255,255,.15)", "#fff"))),
        h("div", { style: { width: 190, flex: "none", borderRadius: 20, background: "#fff", color: T.ink, padding: 14, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 } }, qr(116), h("span", { style: { fontSize: 13, fontWeight: 700 } }, "Your volunteer pass"), link("Full screen", R.a))),
      tile({}, h3("From the organizers", link("All", R.a)), alerts.map(([ty, ti, m, bg, fg]) => h("div", { key: ti, style: { borderRadius: 16, padding: "12px 14px", background: bg } }, h("span", { style: { display: "block", fontSize: 11, fontWeight: 700, letterSpacing: ".04em", color: fg } }, ty), h("span", { style: { display: "block", fontSize: 14, fontWeight: 600, color: T.ink, marginTop: 2 } }, ti), h("span", { style: { display: "block", fontSize: 13, color: T.ink2, marginTop: 2 } }, m))))),
    h("div", { style: { display: "flex", alignItems: "baseline", gap: 10, marginTop: 2 } }, h("h3", { style: { margin: 0, fontFamily: T.disp, fontSize: 20, fontWeight: 700, color: T.ink } }, "Your tools"), h("span", { style: { fontSize: 13, color: T.muted } }, "The organizers chose these for your role")),
    grid("repeat(4,1fr)", ...tools.map(([ic, l, d, c]) => h("div", { key: l, style: { borderRadius: 22, background: "#fff", border: "1px solid " + T.hairline, padding: 16, display: "flex", flexDirection: "column", gap: 8 } },
      h("span", { style: { width: 40, height: 40, borderRadius: 12, background: c[0], display: "flex", alignItems: "center", justifyContent: "center" } }, ico(ic, c[1], 19)), h("strong", { style: { fontSize: 15, color: T.ink } }, l), h("span", { style: { fontSize: 12.5, color: T.muted, lineHeight: 1.4 } }, d)))));
};

const reviewer = (t) => {
  const R = ROLES.reviewer;
  const done = 14 + (t % 5 === 4 ? 1 : 0), all = 22, toGo = all - done, pct = Math.round(done / all * 100);
  const next = [["AB-031", "Federated learning at the network edge", "Abstract · Edge AI", "Due Fri"], ["FP-012", "Low-resource speech recognition for Tamil", "Full paper · Speech", "Due Mon"], ["AB-047", "Explainable triage models in emergency care", "Abstract · Health", "Due 22 Oct"]];
  return h("div", { style: { display: "grid", gridTemplateColumns: "7fr 5fr", gap: 16 } },
    h("section", { style: { borderRadius: 24, background: R.a7, color: "#fff", padding: 26, display: "flex", flexDirection: "column", gap: 6, minHeight: 240 } },
      h("span", { style: { fontSize: 14, color: "#b7e4dc" } }, "Your reviews for Conference on Applied AI"),
      h("span", { style: { fontFamily: T.disp, fontSize: 64, fontWeight: 800, lineHeight: 1, marginTop: 6 } }, toGo, " ", h("span", { style: { fontSize: 22, fontWeight: 700 } }, "to go")),
      h("span", { style: { fontSize: 15, color: "#d7f0eb" } }, "Next due ", h("strong", { style: { color: "#fff" } }, "Fri, 16 Oct"), " · " + done + " of " + all + " done"),
      h("div", { style: { flex: 1 } }),
      h("div", { style: { height: 10, borderRadius: 99, background: "rgba(255,255,255,.2)", marginTop: 16 } }, h("div", { style: { height: "100%", width: pct + "%", borderRadius: 99, background: "#fff", transition: "width .8s" } })),
      btn(["Continue reviewing", ico("arrow-right", "#134e4a", 16)], "#fff", "#134e4a", { alignSelf: "flex-start", marginTop: 16 })),
    tile({}, h3("Waiting for your OK", chip("2 new", T.butter, T.butterInk)),
      h("p", { style: { margin: 0, fontSize: 13, color: T.muted } }, "Accept a paper to get its files and the review form. Decline if you can’t review it or have a conflict."),
      ...[["Graph neural networks for crop yield", "Abstract · AB-052 · due 24 Oct"], ["Benchmarking small LLMs on Indic tasks", "Full paper · FP-019 · due 28 Oct"]].map(([ti, m]) => h("div", { key: ti, style: { borderRadius: 16, background: T.butter, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 } }, h("span", { style: { fontSize: 14, fontWeight: 600, color: T.ink } }, ti), h("span", { style: { display: "flex", alignItems: "center", gap: 8 } }, h("span", { style: { flex: 1, fontSize: 12, color: T.butterInk } }, m), btn("Respond", R.a, "#fff", { height: 36, fontSize: 13 }))))),
    tile({}, h3("Up next", link("All abstracts", R.a7)), next.map(([c, ti, m, due]) => h("div", { key: c, style: { display: "flex", alignItems: "center", gap: 14, padding: 14, borderRadius: 16, background: T.paper } },
      h("span", { style: { width: 56, flex: "none", fontSize: 12, fontWeight: 700, color: T.muted } }, c), h("span", { style: { flex: 1, minWidth: 0 } }, h("span", { style: { display: "block", fontSize: 14, fontWeight: 600, color: T.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, ti), h("span", { style: { fontSize: 12, color: T.muted } }, m)),
      chip(due, due === "Due Fri" ? T.butter : T.sand, due === "Due Fri" ? T.butterInk : T.ink2), ico("chevron-right", T.faint, 16)))),
    h("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignContent: "start" } },
      h("div", { style: { borderRadius: 24, background: T.sky, padding: 20, display: "flex", flexDirection: "column", gap: 4 } }, h("span", { style: { fontSize: 13, fontWeight: 600, color: T.skyInk } }, "Abstracts"), h("span", { style: { fontFamily: T.disp, fontSize: 34, fontWeight: 800, color: "#173a5c" } }, 10, h("span", { style: { fontSize: 16, fontWeight: 700 } }, " / 14 done")), bar(71, T.skyInk, "#fff")),
      h("div", { style: { borderRadius: 24, background: T.lilac, padding: 20, display: "flex", flexDirection: "column", gap: 4 } }, h("span", { style: { fontSize: 13, fontWeight: 600, color: T.lilacInk } }, "Full papers"), h("span", { style: { fontFamily: T.disp, fontSize: 34, fontWeight: 800, color: "#0043a6" } }, done - 10, h("span", { style: { fontSize: 16, fontWeight: 700 } }, " / 8 done")), bar((done - 10) / 8 * 100, T.lilacInk, "#fff")),
      h("section", { style: { gridColumn: "span 2", borderRadius: 24, background: "#fff", border: "1px solid " + T.hairline, padding: 20, display: "flex", flexDirection: "column", gap: 12 } }, h3("Your recommendations"),
        h("div", { style: { display: "flex", height: 12, borderRadius: 6, overflow: "hidden", gap: 3 } }, h("span", { style: { flex: 8, background: "#3f9d6b" } }), h("span", { style: { flex: 4, background: "#d99a1e" } }), h("span", { style: { flex: 2, background: "#e0533f" } })),
        h("div", { style: { display: "flex", gap: 16, fontSize: 13, color: T.ink2 } }, h("span", null, h("strong", { style: { color: T.ink } }, 8), " accept"), h("span", null, h("strong", { style: { color: T.ink } }, 4), " revise"), h("span", null, h("strong", { style: { color: T.ink } }, 2), " reject"), h("span", { style: { flex: 1, textAlign: "right", color: T.faint } }, "Organizers decide")))));
};

const sponsor = (t) => {
  const R = ROLES.sponsor;
  const used = 6 + (t % 7 === 6 ? 1 : 0);
  const stats = [["Sponsorship status", "Approved", "badge-check", "#16a34a", "#f0fdf4", "#bbf7d0"], ["Tier level", "Gold", "award", R.a, "#f3f7fe", "#cbddfe"], ["Free passes", (10 - used) + " Available", "users", R.a, "#f3f7fe", "#cbddfe"], ["Days until event", "12 Days", "calendar-days", R.a, "#f3f7fe", "#cbddfe"]];
  const actions = [["users", "Manage free passes"], ["building-2", "Update company info"], ["image", "Upload gallery content"], ["megaphone", "View announcements"]];
  return h("div", { style: { display: "flex", flexDirection: "column", gap: 16 } },
    h("section", { style: { borderRadius: 24, background: "#f3f7fe", border: "1px solid #e4edfe", padding: 26, display: "flex", alignItems: "center", gap: 16 } },
      h("div", { style: { flex: 1 } }, h("h2", { style: { margin: 0, fontFamily: T.disp, fontSize: 28, fontWeight: 700, color: T.ink } }, "Welcome back, Northwind Labs!"), h("p", { style: { margin: "6px 0 0", fontSize: 17, color: T.ink2 } }, "Gold Sponsor at Conference on Applied AI"), h("p", { style: { margin: "8px 0 0", fontSize: 14, color: T.muted, display: "flex", alignItems: "center", gap: 8 } }, ico("calendar-days", T.muted, 16), "Thursday, November 12, 2026")),
      h("span", { style: { width: 88, height: 88, borderRadius: 16, background: "#fff", boxShadow: "0 4px 12px rgba(17,24,38,.08)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.disp, fontSize: 26, fontWeight: 800, color: R.a } }, "NL")),
    grid("repeat(4,1fr)", ...stats.map(([l, v, ic, c, bg, bd]) => h("div", { key: l, style: { borderRadius: 16, background: bg, border: "1px solid " + bd, padding: 18 } },
      h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 } }, ico(ic, c, 28), h("span", { style: { fontSize: 11, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: T.muted } }, l)),
      h("p", { style: { margin: 0, fontSize: 22, fontWeight: 700, color: c } }, v)))),
    grid("2fr 1fr",
      tile({ padding: 24 }, h("h3", { style: { margin: 0, fontSize: 19, fontWeight: 700, color: T.ink, display: "flex", alignItems: "center", gap: 8 } }, ico("building-2", R.a, 20), "Event footprint"),
        h("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 } },
          ...[["Booked stalls", "S1 · S2 (Hall A foyer)"], ["Team passes used", used + " of 10"], ["Gallery views", (1240 + t * 7).toLocaleString("en-IN")], ["Brochure downloads", 312 + (t % 20)]].map(([l, v]) => h("div", { key: l }, h("span", { style: { fontSize: 11, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: T.muted } }, l), h("p", { style: { margin: "4px 0 0", fontSize: 17, fontWeight: 600, color: T.ink, fontVariantNumeric: "tabular-nums" } }, v)))),
        h("div", { style: { display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 6, marginTop: 4 } }, Array.from({ length: 12 }, (_, i) => h("span", { key: i, style: { height: 30, borderRadius: 8, background: i < 2 ? R.a : i < 7 ? "#cbddfe" : T.sand, color: i < 2 ? "#fff" : T.muted, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" } }, i < 2 ? "You" : "S" + (i + 1))))),
      tile({ padding: 24 }, h("h3", { style: { margin: 0, fontSize: 19, fontWeight: 700, color: T.ink } }, "Quick actions"), actions.map(([ic, l], i) => h("div", { key: l, style: { display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 14, background: T.paper } }, h("span", { style: { width: 34, height: 34, borderRadius: 10, background: i === 2 ? "#db2777" : i === 3 ? "#d97706" : R.a, display: "flex", alignItems: "center", justifyContent: "center" } }, ico(ic, "#fff", 16)), h("span", { style: { flex: 1, fontSize: 14, fontWeight: 600, color: T.ink } }, l), ico("chevron-right", T.faint, 16))))));
};

export const HOMES = { attendee, organizer, volunteer, reviewer, sponsor };

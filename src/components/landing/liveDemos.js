// Live mini-UIs inside each feature panel, one per module (same order as MODULES). Sample data;
// `t` ticks once a second while the panel is the active one.
import React from "react";
import { Ico, DISP, FakeQr } from "./kit";

const h = React.createElement;
const c = { c: "#0052C9", soft: "#E6EEFD", mid: "#5B8FE6" };
const ico = (n, col, s) => h(Ico, { n, c: col, s });
const lbl = (t) => h("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: ".1em", color: "#8A94AA", textTransform: "uppercase" } }, t);
const pill = (t, bg, fg, k) => h("span", { key: k, className: k !== undefined ? "pl-pop" : undefined, style: { display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 9px", borderRadius: 999, background: bg, color: fg, fontSize: 11.5, fontWeight: 700, whiteSpace: "nowrap" } }, t);
const head = (a, b) => h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" } }, a, b);
const big = (v, extra) => h("div", { style: { fontFamily: DISP, fontSize: 36, fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1, fontVariantNumeric: "tabular-nums", ...extra } }, v);
const tile = (i, ic, bg) => h("span", { style: { width: 30, height: 30, borderRadius: 9, background: bg || c.soft, display: "flex", alignItems: "center", justifyContent: "center", flex: "none", transition: "background .4s" } }, ico(ic, i, 15));

export const LIVE = [
  (t) => {
    const names = ["A. Khan", "R. Iyer", "M. Das", "S. Rao", "J. Paul"];
    const tiers = [["Early bird", "₹1,500", 0.82, 120], ["Student", "₹800", 0.64, 80], ["Professional", "₹3,000", 0.38, 60]];
    return h("div", null, head(lbl("Registrations"), pill("+1 · " + names[t % 5], c.soft, c.c, t)), big(412 + t),
      h("div", { style: { marginTop: 16, display: "flex", flexDirection: "column", gap: 10 } }, tiers.map(([n, p, b, cap], i) => {
        const pct = Math.min(0.99, b + ((t + i) % 12) * 0.012);
        return h("div", { key: n, style: { padding: "11px 12px", background: "#F6F8FC", borderRadius: 12 } },
          h("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600 } }, h("span", null, n), h("span", null, p)),
          h("div", { style: { marginTop: 8, height: 5, borderRadius: 5, background: "#E6ECF6", overflow: "hidden" } }, h("div", { style: { width: pct * 100 + "%", height: "100%", background: c.c, borderRadius: 5, transition: "width .8s cubic-bezier(.2,.8,.2,1)" } })),
          h("div", { style: { marginTop: 6, fontSize: 11.5, color: "#6B7690" } }, Math.round(cap * pct) + " of " + cap + " seats taken"));
      })),
      h("div", { style: { marginTop: 12, display: "flex", gap: 6, flexWrap: "wrap" } }, pill("SPEAKER100 · 100% off", "#F1F4FA", "#43506B"), pill("GROUP3 · 15% off", "#F1F4FA", "#43506B")));
  },
  (t) => {
    const rows = [["UPI receipt", "UTR 418…", 1500], ["Bank transfer", "NEFT 220…", 3000], ["Razorpay", "pay_93Q…", 800], ["UPI receipt", "UTR 771…", 1500]];
    const done = t % 7; let sum = 0; rows.forEach((r, i) => { if (i < done) sum += r[2]; });
    return h("div", null, head(lbl("Settled to your account"), pill("Razorpay connected", "#DCFCE7", "#15803D")), big("₹" + (184500 + sum).toLocaleString("en-IN")),
      h("div", { style: { marginTop: 16, display: "flex", flexDirection: "column", gap: 8 } }, rows.map((r, i) => h("div", { key: i, style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: "1px solid #EEF1F6", borderRadius: 12, fontSize: 13 } },
        tile(c.c, "credit-card"),
        h("div", { style: { minWidth: 0, flex: 1 } }, h("div", { style: { fontWeight: 600 } }, r[0]), h("div", { style: { fontSize: 11.5, color: "#6B7690" } }, r[1] + " · ₹" + r[2].toLocaleString("en-IN"))),
        i < done ? pill("Approved", "#DCFCE7", "#15803D", "a" + i + "-" + Math.floor(t / 7)) : h("span", { style: { padding: "5px 10px", borderRadius: 8, background: c.c, color: "#fff", fontSize: 11.5, fontWeight: 700 } }, "Approve")))));
  },
  (t) => {
    const k = t % 10, sc = [["Novelty", 4], ["Method", 5], ["Clarity", 3]];
    return h("div", null, head(lbl("Paper #48 · Blind review"), pill("3 reviewers", c.soft, c.c)),
      h("div", { style: { fontFamily: DISP, fontSize: 20, fontWeight: 700, letterSpacing: "-.02em", lineHeight: 1.25 } }, "Federated learning at the network edge"),
      h("div", { style: { marginTop: 18, display: "flex", flexDirection: "column", gap: 12 } }, sc.map(([n, v], i) => {
        const got = Math.min(v, Math.max(0, k - i));
        return h("div", { key: n, style: { display: "grid", gridTemplateColumns: "70px 1fr 28px", alignItems: "center", gap: 12, fontSize: 13 } },
          h("span", { style: { color: "#43506B" } }, n),
          h("div", { style: { display: "flex", gap: 4 } }, [0, 1, 2, 3, 4].map((j) => h("span", { key: j, style: { flex: 1, height: 10, borderRadius: 4, background: j < got ? c.c : "#EEF0F6", transition: "background .4s" } }))),
          h("span", { style: { fontWeight: 700, textAlign: "right" } }, got + "/5"));
      })),
      h("div", { style: { marginTop: 18, minHeight: 34 } }, k >= 7
        ? h("div", { key: "d" + Math.floor(t / 10), className: "pl-fade", style: { display: "flex", gap: 8, flexWrap: "wrap" } }, pill("Accepted", "#DCFCE7", "#15803D"), pill("Slot · Hall B, 11:30", c.soft, c.c))
        : h("div", { style: { fontSize: 12.5, color: "#8A94AA" } }, "Scores coming in…")));
  },
  (t) => {
    const ss = [["09:30", "Opening keynote", "Hall A"], ["10:30", "Applied vision track", "Hall B"], ["11:30", "Paper session 3", "Hall B"], ["12:30", "Panel: AI in health", "Hall A"]];
    const live = t % 8 < 4 ? 1 : 2;
    return h("div", null, head(lbl("Today · 2 halls"), pill("Delay +10 min · Hall B", "#FEF3C7", "#B45309")),
      h("div", { style: { position: "relative", display: "flex", flexDirection: "column", gap: 8, paddingLeft: 18 } },
        h("span", { style: { position: "absolute", left: 5, top: 8, bottom: 8, width: 2, background: "#EEF1F6" } }),
        ss.map(([tm, n, hall], i) => {
          const on = i === live, done = i < live;
          return h("div", { key: i, style: { position: "relative", display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 14, background: on ? c.soft : "#fff", border: "1px solid " + (on ? "transparent" : "#EEF1F6"), transition: "all .5s", opacity: done ? 0.55 : 1 } },
            h("span", { style: { position: "absolute", left: -18, width: 12, height: 12, borderRadius: 3, background: on ? c.c : done ? "#C6CEDC" : "#fff", border: "2px solid " + (on ? c.c : "#C6CEDC") } }),
            h("span", { style: { fontSize: 12, fontWeight: 700, color: "#6B7690", width: 40, fontVariantNumeric: "tabular-nums" } }, tm),
            h("div", { style: { flex: 1, minWidth: 0 } }, h("div", { style: { fontSize: 13.5, fontWeight: 600 } }, n), h("div", { style: { fontSize: 11.5, color: "#6B7690" } }, hall)),
            on ? h("span", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 700, color: "#C62828" } }, h("span", { style: { width: 6, height: 6, borderRadius: "50%", background: "#E53935", animation: "pl-blink 1.2s infinite" } }), "Live now") : null);
        })));
  },
  (t) => {
    const names = ["A. Khan · Attendee", "R. Iyer · Speaker", "M. Das · Attendee", "S. Rao · Volunteer"], dup = t % 6 === 5;
    return h("div", null, head(lbl("Desk 2 · Scanner"), pill("Checked in " + (323 + t), c.soft, c.c, "n" + t)),
      h("div", { style: { display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" } },
        h("div", { style: { position: "relative", width: 140, height: 140, padding: 12, borderRadius: 16, border: "2px solid " + c.c, flex: "none" } },
          h(FakeQr, { size: 112, n: 9, ink: "#0B1530" }),
          h("span", { className: "pl-scan", style: { position: "absolute", left: 6, right: 6, height: 2, background: c.c, boxShadow: "0 0 12px 2px " + c.c } })),
        h("div", { style: { flex: "1 1 160px", display: "flex", flexDirection: "column", gap: 8 } },
          h("div", { key: "s" + t, className: "pl-in", style: { padding: "10px 12px", borderRadius: 12, background: dup ? "#FEF2F2" : "#F0FDF4", color: dup ? "#B91C1C" : "#15803D", fontSize: 13, fontWeight: 600 } }, dup ? "Duplicate pass · already scanned" : "✓ " + names[t % 4]),
          h("div", { style: { fontSize: 12, color: "#6B7690", lineHeight: 1.5 } }, "One QR pass per attendee. Badge printed at the desk."))));
  },
  (t) => {
    const qs = [["How do you handle data drift in production?", 42, 3], ["Will the slides be shared after?", 31, 5], ["What hardware did you train on?", 28, 4]];
    const scored = qs.map(([q, b, r], i) => [q, b + Math.floor(((t + i) * r) / 3)]).sort((a, b) => b[1] - a[1]);
    return h("div", null, head(lbl("Hall A · Keynote Q&A"), pill("Poll open", c.soft, c.c)),
      h("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, scored.map(([q, v], i) => h("div", { key: q, style: { display: "flex", alignItems: "center", gap: 12, padding: "11px 12px", borderRadius: 12, background: i === 0 ? c.soft : "#F6F8FC", transition: "background .4s" } },
        h("div", { style: { width: 42, flex: "none", textAlign: "center", borderRadius: 10, padding: "5px 0", background: "#fff", border: "1px solid #EEF1F6" } }, h("div", { style: { fontSize: 10, color: c.c, lineHeight: 1 } }, "▲"), h("div", { key: v, className: "pl-pop", style: { fontSize: 14, fontWeight: 800 } }, v)),
        h("span", { style: { fontSize: 13, fontWeight: 600, lineHeight: 1.35 } }, q)))),
      h("div", { style: { marginTop: 14, fontSize: 12, color: "#6B7690" } }, "Upvoted live from the audience, moderated before it reaches the screen."));
  },
  (t) => {
    const n = 3 + (t % 10), tiers = ["Gold", "Gold", "Silver", "Silver", "Silver", "Silver", "Bronze", "Bronze", "Bronze", "Bronze", "Bronze", "Bronze"];
    return h("div", null, head(lbl("Exhibition floor"), pill(Math.min(n, 12) + " / 12 stalls booked", c.soft, c.c, "b" + n)),
      h("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 } }, tiers.map((tr, i) => {
        const on = i < n;
        return h("div", { key: i, className: on && i === n - 1 ? "pl-pop" : undefined, style: { aspectRatio: "1.3/1", borderRadius: 10, padding: 8, display: "flex", flexDirection: "column", justifyContent: "space-between", background: on ? (tr === "Gold" ? c.c : tr === "Silver" ? c.mid : c.soft) : "#fff", border: on ? "none" : "1.5px dashed #D5DBE6", color: on && tr !== "Bronze" ? "#fff" : "#43506B", transition: "all .5s" } },
          h("span", { style: { fontSize: 10, fontWeight: 700, opacity: 0.85 } }, "S" + (i + 1)), h("span", { style: { fontSize: 11, fontWeight: 700 } }, on ? tr : "Open"));
      })),
      h("div", { style: { marginTop: 14, display: "flex", gap: 14, fontSize: 11.5, color: "#6B7690" } }, ["Gold", "Silver", "Bronze"].map((x, i) => h("span", { key: x, style: { display: "flex", alignItems: "center", gap: 6 } }, h("span", { style: { width: 9, height: 9, borderRadius: 2, background: [c.c, c.mid, c.soft][i] } }), x))));
  },
  (t) => {
    const groups = [["Attendees", 412], ["Speakers", 38], ["Reviewers", 24]], sent = Math.min(474, (t % 9) * 68);
    let start = 0;
    return h("div", null, head(lbl("Certificates · Bulk send"), pill("Verifiable links", c.soft, c.c)),
      h("div", { style: { display: "flex", alignItems: "baseline", gap: 8 } }, big(sent), h("span", { style: { fontSize: 13, color: "#6B7690" } }, "of 474 sent")),
      h("div", { style: { marginTop: 12, height: 8, borderRadius: 8, background: "#EEF0F6", overflow: "hidden" } }, h("div", { style: { width: (sent / 474) * 100 + "%", height: "100%", background: c.c, borderRadius: 8, transition: "width .8s cubic-bezier(.2,.8,.2,1)" } })),
      h("div", { style: { marginTop: 16, display: "flex", flexDirection: "column", gap: 8 } }, groups.map(([g, n]) => {
        const from = start; start += n;
        const done = sent >= start, part = sent > from;
        return h("div", { key: g, style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: "1px solid #EEF1F6", borderRadius: 12, fontSize: 13 } },
          tile(done ? "#15803D" : c.c, done ? "check" : "award", done ? "#DCFCE7" : c.soft),
          h("span", { style: { flex: 1, fontWeight: 600 } }, g), h("span", { style: { color: done ? "#15803D" : part ? c.c : "#8A94AA", fontWeight: 600, fontSize: 12 } }, done ? "Sent" : part ? "Sending…" : n + " queued"));
      })));
  },
  (t) => {
    const occ = 5 + (t % 11);
    return h("div", null, head(lbl("Hotel block · 16 rooms"), pill(Math.min(occ, 16) + " assigned", c.soft, c.c, "o" + occ)),
      h("div", { style: { display: "grid", gridTemplateColumns: "repeat(8,1fr)", gap: 6 } }, Array.from({ length: 16 }, (_, i) => h("div", { key: i, style: { aspectRatio: "1/1", borderRadius: 8, background: i < occ ? (i < 2 ? "#0B1530" : c.c) : "#F1F4FA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9.5, fontWeight: 700, color: i < occ ? "#fff" : "#9AA3B5", transition: "background .5s" } }, 100 + i + 1))),
      h("div", { style: { marginTop: 16, display: "flex", flexDirection: "column", gap: 8 } },
        [["VVIP · Chief guest", "Arrival 09:15 · Gate 1 · Room 101"], ["Dignitary · Keynote", "Arrival 09:40 · Gate 1 · Room 102"]].map(([a, b]) => h("div", { key: a, style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 12, background: "#F6F8FC", fontSize: 13 } },
          h("span", { style: { width: 8, height: 8, background: "#0B1530", flex: "none" } }), h("div", null, h("div", { style: { fontWeight: 600 } }, a), h("div", { style: { fontSize: 11.5, color: "#6B7690" } }, b))))));
  },
];

// Extra demos for the How-it-works stages on the hero laptop.
const row = (k, style, ...ch) => h("div", { key: k, style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 12, fontSize: 13, ...style } }, ...ch);

/** Set up: fields drop into the registration form one by one. */
export const SETUP_FORM = (t) => {
  const fields = [["Full name", "Text · required"], ["Email", "Email · required"], ["Institution", "Text"], ["Paper track", "Dropdown · 4 options"], ["ID proof", "File upload · PDF/JPG"]];
  const n = 1 + (t % 7);
  return h("div", null, head(lbl("Registration form"), pill(Math.min(n, 5) + (Math.min(n, 5) === 1 ? " field" : " fields"), c.soft, c.c, "f" + Math.min(n, 5))),
    h("div", { style: { display: "flex", flexDirection: "column", gap: 8 } },
      fields.slice(0, Math.min(n, 5)).map(([f, d], i) => h("div", { key: f, className: i === n - 1 ? "pl-in" : undefined },
        row(f, { border: "1px solid #EEF1F6", background: "#fff" },
          h("span", { style: { width: 6, height: 18, borderRadius: 3, background: i === n - 1 ? c.c : "#D5DBE6" } }),
          h("div", { style: { flex: 1 } }, h("div", { style: { fontWeight: 600 } }, f), h("div", { style: { fontSize: 11.5, color: "#6B7690" } }, d)),
          ico("chevron-down", "#9AA3B5", 14)))),
      n <= 5 ? row("add", { border: "1.5px dashed #C9D6EE", color: c.c, fontWeight: 600, justifyContent: "center" }, "+ Add field") : row("pub", { background: "#DCFCE7", color: "#15803D", fontWeight: 700, justifyContent: "center" }, ico("check", "#15803D", 14), "Form published")));
};

/** Set up: ticket tiers and the payment account. */
export const SETUP_TIERS = (t) => {
  const tiers = [["Early bird", "₹1,500", "Till 15 Oct · 120 seats"], ["Student", "₹800", "ID proof required · 80 seats"], ["Professional", "₹3,000", "Includes workshop · 60 seats"]];
  const n = Math.min(3, 1 + Math.floor((t % 9) / 2)), linked = t % 9 >= 6;
  return h("div", null, head(lbl("Tickets & payments"), linked ? pill("Razorpay connected", "#DCFCE7", "#15803D", "rz") : pill("Connecting Razorpay…", "#FEF3C7", "#B45309")),
    h("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, tiers.slice(0, n).map(([nm, p, d], i) => h("div", { key: nm, className: i === n - 1 ? "pl-in" : undefined },
      row(nm, { background: "#F6F8FC" }, tile(c.c, "ticket"), h("div", { style: { flex: 1 } }, h("div", { style: { fontWeight: 600 } }, nm), h("div", { style: { fontSize: 11.5, color: "#6B7690" } }, d)), h("span", { style: { fontWeight: 800, fontFamily: DISP } }, p))))),
    h("div", { style: { marginTop: 12, display: "flex", gap: 6, flexWrap: "wrap" } }, pill("SPEAKER100 · 100% off", "#F1F4FA", "#43506B"), pill("GST 18% added", "#F1F4FA", "#43506B")));
};

/** Wrap up: the closing report and the archive export. */
export const WRAP_REPORT = (t) => {
  const k = t % 10, pct = Math.min(100, k * 14);
  const stats = [["Checked in", "412 / 436"], ["Papers presented", "96"], ["Feedback", "4.6 / 5"], ["Revenue settled", "₹12.4L"]];
  return h("div", null, head(lbl("Event report"), pill("Closed · 14 Nov", "#F1F4FA", "#43506B")),
    h("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, stats.map(([l, v]) => h("div", { key: l, style: { padding: "12px", borderRadius: 12, background: "#F6F8FC" } }, h("div", { style: { fontSize: 11.5, color: "#6B7690" } }, l), h("div", { style: { marginTop: 2, fontFamily: DISP, fontSize: 20, fontWeight: 800 } }, v)))),
    h("div", { style: { marginTop: 12, padding: "12px", borderRadius: 12, border: "1px solid #EEF1F6" } },
      h("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600 } }, h("span", null, "Archive & backup export"), h("span", { style: { color: pct >= 100 ? "#15803D" : c.c } }, pct >= 100 ? "Ready" : pct + "%")),
      h("div", { style: { marginTop: 8, height: 6, borderRadius: 6, background: "#EEF0F6", overflow: "hidden" } }, h("div", { style: { width: pct + "%", height: "100%", background: pct >= 100 ? "#16A34A" : c.c, transition: "width .8s cubic-bezier(.2,.8,.2,1)" } }))));
};

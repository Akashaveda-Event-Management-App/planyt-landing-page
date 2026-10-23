import React, { useEffect, useRef } from "react";
import { BLUE, NAVY, Pix, PixCorner, SKY } from "./pixels";

/**
 * Chapters 01 (before) and 03 (after), white ground: a sticky side with the pixel numeral and the
 * chapter links, and a grid sheet of features. Chapter 02 (OnTheDay.jsx) uses the same side.
 * `Cell` is shared with the day tools and the trust grid.
 */
const FONT = { "0": ["111", "101", "101", "101", "111"], "1": ["010", "110", "010", "010", "111"], "2": ["111", "001", "111", "100", "111"], "3": ["111", "001", "111", "001", "111"] };

const Numeral = ({ digits }) => {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, U = 16; cv.width = 7 * U; cv.height = 5 * U;
    const c = cv.getContext("2d"); let x0 = 0;
    [...digits].forEach((d, i) => {
      c.fillStyle = i ? BLUE : NAVY;
      FONT[d].forEach((row, r) => [...row].forEach((ch, k) => {
        if (ch !== "1") return;
        c.beginPath(); if (c.roundRect) c.roundRect((x0 + k) * U + 1.5, r * U + 1.5, U - 3, U - 3, 4); else c.rect((x0 + k) * U + 1.5, r * U + 1.5, U - 3, U - 3); c.fill();
      }));
      x0 += 4;
    });
  }, [digits]);
  return <canvas ref={ref} className="num" aria-hidden="true" />;
};

/** One cell of a grid sheet: pixel icon, title, line and chips; fills on hover. */
export const Cell = ({ icon, title, text, points, n, wide, dark, lead, as = "h3" }) => {
  const [hot, setHot] = React.useState(false);
  return (
    <article className={`cell${wide ? " wide" : ""}${lead ? " lead" : ""}`} onPointerEnter={() => setHot(true)} onPointerLeave={() => setHot(false)}>
      <PixCorner color={dark || lead ? SKY : BLUE} strength={0.85} />
      <div className="top"><span className="ib"><Pix icon={icon} color={hot || lead ? "#FFFFFF" : dark ? SKY : BLUE} /></span><small>{String(n + 1).padStart(2, "0")}</small></div>
      {React.createElement(as, { className: "ct" }, title)}
      {text && <p>{text}</p>}
      {points && <ul>{points.map((p) => <li key={p} className="tk">{p}</li>)}</ul>}
    </article>
  );
};

const CHAPTERS = {
  before: {
    num: "01", kick: "Before the event", title: "Get people in.", text: "A website, registration, payments and papers, all filling one list.",
    items: [
      ["globe", "Event website", "Your event's own site, live on your domain.", ["20 designed templates", "Click any text to edit", "Your own domain"]],
      ["list", "Registration & tickets", "Forms, tiers and coupons, live in minutes.", ["Passes with seat limits", "Early-bird pricing", "Coupons & combo deals"]],
      ["card", "Payments & GST", "Online or bank transfer, every fee and GST shown up front.", ["Paid to your own Razorpay", "GST invoices & credit notes", "Bank receipts approved by you"]],
      ["form", "Call for papers", "Abstracts, full papers and blind review.", ["Every stage, clear to authors", "Deadlines up front", "Their presentation slot"]],
      ["store", "Sponsors", "Tiers, stalls and a portal for every sponsor.", ["Your own tiers", "Free passes per tier", "Exhibitor packages"], true],
    ],
  },
  day: { num: "02", kick: "On the day", title: "Doors open. It all runs.", text: "Check-in, badges, sessions, Q&A and volunteers, live on one board." },
  after: {
    num: "03", kick: "After the event", title: "Close it out in an afternoon.", text: "Certificates out, feedback in, numbers ready, everything backed up.",
    items: [
      ["cert", "Certificate Studio", "Verifiable certificates, sent to everyone at once.", ["20 designs, or start blank", "Type right on the page", "A verify link on each"]],
      ["form", "Forms & surveys", "Any form, shared by link, answers in a table.", ["Any question type", "A public link", "Answers in one table"]],
      ["chart", "Analytics", "Registrations, revenue and turnout at a glance.", ["Registrations over time", "Revenue & check-ins", "Download any report"]],
      ["shield", "Full backup", "Export the whole event, any time.", ["Every list and file", "Audit log of every change", "Attendees can download their data"]],
    ],
  },
};
const LINKS = [["before", "01 · BEFORE"], ["day", "02 · ON THE DAY"], ["after", "03 · AFTER"]];

/** The chapter's sticky side: numeral, title, line and the links to all three chapters. */
export const ChapterAside = ({ id }) => {
  const c = CHAPTERS[id];
  return (
    <aside><div className="chap-sticky">
      <Numeral digits={c.num} />
      <span className="kick">{c.kick}</span><h2>{c.title}</h2><p className="d">{c.text}</p>
      <nav className="cnav" aria-label="Chapters">{LINKS.map(([to, l]) => <a key={to} href={`#${to}`} className={`tk${to === id ? " on" : ""}`}>{l}{to === id && <span>■</span>}</a>)}</nav>
    </div></aside>
  );
};

export const Chapter = ({ id }) => {
  const c = CHAPTERS[id];
  return (
    <section className="sec chap g-light g" id={id}>
      <div className="in">
        <ChapterAside id={id} />
        <div className="sheet">{c.items.map(([ic, t, d, pts, wide], n) => <Cell key={t} icon={ic} title={t} text={d} points={pts} n={n} wide={wide} />)}</div>
      </div>
    </section>
  );
};

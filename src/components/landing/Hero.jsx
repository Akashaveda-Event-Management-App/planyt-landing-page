import React, { useEffect, useRef, useState } from "react";
import { Link } from "./link";
import { BLUE, Pix, startField, still } from "./pixels";
import { START_FREE, useSignup } from "./signup";

/**
 * Hero (white ground): the headline, and the Planyt mark in live pixels straight on the page grid,
 * inside crop marks with two slow orbits behind it. The pixels rebuild into each feature in turn;
 * the pointer scatters them. Feature tickets underneath pick one.
 * Then the navy marquee of features as tickets.
 */
const SHAPES = [
  ["logo", "Planyt", "PLANYT", "One list of people behind every part of the event."],
  ["qr", "Check-in", "CHECK-IN", "Every gate, hall and meal. Keeps scanning offline."],
  ["badge", "Badges", "BADGES", "Design once, print at real size for everyone."],
  ["ticket", "Tickets", "TICKETS", "Passes, coupons and payments to your own account."],
  ["cert", "Certificates", "CERTIFICATES", "20 designs, sent to everyone at once."],
  ["globe", "Website", "WEBSITE", "Your event's own site, live on your domain."],
];

const Stat = ({ cls, label, value, note }) => (
  <div className={`stat tk ${cls}`}><small>{label}</small><b>{value}</b><span>{note}</span></div>
);

export const Hero = () => {
  const signup = useSignup();
  const cvRef = useRef(null), fieldRef = useRef(null);
  const [cur, setCur] = useState(0);
  const [nums, setNums] = useState({ reg: 412, inside: 814 });

  useEffect(() => {
    fieldRef.current = startField(cvRef.current, { shape: "logo", scale: 0.56, count: 230, on: "#0052C9", hot: BLUE, off: "#CBD5E3", idle: 0.22 });
    return () => fieldRef.current?.stop();
  }, []);
  useEffect(() => { fieldRef.current?.set(SHAPES[cur][0]); }, [cur]);
  // Next shape every few seconds, unless the pointer is playing with the pixels.
  useEffect(() => {
    if (still()) return undefined;
    const t = setInterval(() => { if (!fieldRef.current?.busy && !document.hidden) setCur((c) => (c + 1) % SHAPES.length); }, 4200);
    return () => clearInterval(t);
  }, [cur]);
  useEffect(() => {
    if (still()) return undefined;
    const t = setInterval(() => { if (!document.hidden) setNums((n) => ({ reg: n.reg + (Math.random() < 0.4 ? 1 : 0), inside: n.inside + 1 })); }, 1800);
    return () => clearInterval(t);
  }, []);

  const [, label, cap, desc] = SHAPES[cur];
  return (
    <>
      <section className="hero g-light g" id="top">
        <div className="in">
          <div>
            <a className="pill tk" href="#after"><b>NEW</b><span>GST invoices and Certificate Studio are live →</span></a>
            <h1>
              {"Run your whole event from".split(" ").map((w, i) => <React.Fragment key={w}><span className="w" style={{ animationDelay: `${i * 0.06}s` }}>{w}</span>{" "}</React.Fragment>)}
              <span className="w blue" style={{ animationDelay: "0.3s" }}>one place<span className="cursor" /></span>
            </h1>
            <p className="lead">Registration, payments, paper review, your event website, check-in, sponsors and certificates. One platform, with a workspace for every role.</p>
            <div className="acts">
              {signup
                ? <Link className="btn big tk" to={START_FREE}><span className="t">Start free</span><span className="s">→</span></Link>
                : <a className="btn big tk" href="#contact"><span className="t">Request access</span><span className="s">→</span></a>}
              <a className="btn big line tk" href="#why"><span className="t">See how it works</span><span className="s">↓</span></a>
            </div>
            <div className="ticks"><span>Payments settle in your own account</span><span>No app for attendees</span><span>Setup help from our team</span></div>
            <div className="trusted"><small>TRUSTED BY</small><b>ISRO</b><i>+</i><b>ASI</b><i>+</i><b>IAA</b></div>
          </div>
          <div className="stage">
            <div className="crop" aria-hidden="true"><i /><i /><i /><i /></div>
            <div className="orbits" aria-hidden="true"><i /><i /></div>
            <div className="hcap" aria-live="polite"><small>0{cur + 1} / 0{SHAPES.length}</small><b key={cap}>{cap}</b><em>{desc}</em></div>
            <canvas ref={cvRef} aria-label={`The Planyt mark in pixels, now showing ${label}`} />
            <Stat cls="s1" label="REGISTRATIONS" value={nums.reg} note="+18 today" />
            <Stat cls="s2" label="CHECKED IN" value={nums.inside} note="Gate 2 busiest" />
            <div className="picks" role="group" aria-label="Feature">
              {SHAPES.map(([k, l], i) => <button key={k} type="button" className="tk" aria-pressed={i === cur} onClick={() => setCur(i)}>{l}<i key={i === cur ? `on${cur}` : "off"} /></button>)}
            </div>
          </div>
        </div>
      </section>
      <Marquee />
    </>
  );
};

const MQ = [["list", "Registration & tickets"], ["card", "Payments to your own account"], ["form", "GST invoices"], ["globe", "Event website"], ["form", "Call for papers"], ["cal", "Agenda & sessions"], ["badge", "Badge Studio"], ["qr", "Check-in, even offline"], ["chat", "Live Q&A & polls"], ["people", "Volunteer tools"], ["store", "Sponsors"], ["cert", "Certificate Studio"], ["chart", "Analytics"]];

/** One navy band; features as bold tickets, solid and outlined in turn. Pauses on hover. */
const Marquee = () => (
  <div className="marq" aria-hidden="true">
    <div className="marq-track">
      {[...MQ, ...MQ].map(([ic, label], i) => (
        <React.Fragment key={i}>
          <div className={`mchip tk ${i % 2 ? "m-b" : "m-a"}`}><div className="t">{label}</div><div className="s"><Pix icon={ic} color="#FFFFFF" /></div></div>
          <span className="plus">+</span>
        </React.Fragment>
      ))}
    </div>
  </div>
);

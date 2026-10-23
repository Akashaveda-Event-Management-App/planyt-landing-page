import React, { useEffect, useRef, useState } from "react";
import { Link } from "./link";
import { BLUE, Logo, Pix, PixCorner, SKY, startField, still } from "./pixels";
import { CONTACT_EMAIL, FAQS } from "./content";
import { leadsUrl } from "./api";

/** The end of the page: FAQ (white), the contact ticket (navy) and the footer (navy). */

export const Faq = () => (
  <section className="sec g-light g faq" id="faq">
    <div className="in">
      <div className="sh"><div><span className="kick">FAQ</span><h2>Questions organizers ask.</h2></div><p>The short answers. For anything else, write to us.</p></div>
      <div className="qs">
        {FAQS.map(([q, a], i) => <details key={q} open={i === 0 || undefined}><summary><small className="tk">{String(i + 1).padStart(2, "0")}</small>{q}<i /></summary><p>{a}</p></details>)}
      </div>
      <aside className="still">
        <small>STILL DECIDING?</small><h3>Tell us about your event and we'll show you how it would run.</h3>
        <a className="btn white tk" href="#contact"><span className="t">Talk to us</span><span className="s">→</span></a>
      </aside>
    </div>
  </section>
);

const SIZES = ["Under 100", "100–200", "200–500", "500–1,000", "1,000+", "Not sure yet"];
const NEXT = [
  ["You get a reference", "Right away, by email."],
  ["We reply in a working day", "With questions about your event."],
  ["A quote and a setup plan", "Then your dashboard, set up with you."],
];

/**
 * Contact (navy ground) as a ticket: the details go on the main part, in bars; the stub keeps the
 * request number. Sending tears the main part off along the perforation and throws it off screen;
 * then pixels fly in and settle into a check, the stub is stamped RECEIVED and the reference types
 * itself out. Saved in Planyt (Admin → Setup requests, POST /v1/leads);
 * the team and the sender both get an email. If sending fails, the visitor can email us with the
 * details filled in.
 */
/** The check mark the confirmation opens with: pixels from all over settle into it. */
const DoneMark = () => {
  const ref = useRef(null);
  useEffect(() => {
    const f = startField(ref.current, { shape: "check", scale: 0.8, count: 150, on: BLUE, hot: SKY, off: "#D3DBE8", idle: 0.18, spread: 900 });
    return () => f.stop();
  }, []);
  return <canvas ref={ref} className="done-px" aria-hidden="true" />;
};

/** `text`, one more letter every few frames once `on`. */
const useTyped = (text, on) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on) { setN(0); return undefined; }
    if (still()) { setN(text.length); return undefined; }
    let i = 0;
    const t = setInterval(() => { i += 1; setN(i); if (i >= text.length) clearInterval(t); }, 70);
    return () => clearInterval(t);
  }, [text, on]);
  return text.slice(0, n);
};

/**
 * Sends a setup request. First to Planyt (saved under Admin → Setup requests, emails to the team and
 * the sender, returns the reference). If that fails, through FormSubmit straight to CONTACT_EMAIL,
 * with a reference made here. FormSubmit only delivers once its activation email to that inbox has
 * been confirmed.
 */
const sendLead = async (f) => {
  try {
    const res = await fetch(leadsUrl(), {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name: f.name, email: f.email, event: f.event, size: f.size, need: f.need, source: window.location.host }),
    });
    const j = await res.json().catch(() => ({}));
    if (res.ok && j?.data?.ref) return j.data.ref;
  } catch { /* fall through to FormSubmit */ }
  const ref = `PL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
    method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: `Setup request ${ref}: ${f.event || f.name}`, _template: "table", _captcha: "false", _replyto: f.email,
      Reference: ref, Name: f.name, Email: f.email, Event: f.event || "-", "Expected attendees": f.size, Needs: f.need || "-", Source: window.location.host,
    }),
  });
  const j = await res.json().catch(() => ({}));
  if (!res.ok || String(j.success) !== "true") throw new Error(j.message || "Not sent");
  return ref;
};

export const Contact = () => {
  const [status, setStatus] = useState("idle"); // idle | sending | tearing | sent | error
  const [sent, setSent] = useState(null);
  const [size, setSize] = useState("200–500");

  const mailto = (f) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Planyt setup: ${f.event || "new event"}`)}&body=${encodeURIComponent(`Name: ${f.name}
Email: ${f.email}
Event: ${f.event}
Expected attendees: ${f.size}

${f.need}`)}`;
  const send = async (e) => {
    e.preventDefault();
    const f = { ...Object.fromEntries(new FormData(e.target)), size };
    if (f._honey) return; // spam bots fill hidden fields
    setStatus("sending");
    try {
      const ref = await sendLead(f);
      setSent({ ...f, ref }); setStatus("tearing");
      setTimeout(() => setStatus("sent"), still() ? 0 : 1300);
    } catch {
      setSent(f); setStatus("error");
    }
  };
  const done = status === "sent";
  const typed = useTyped(sent?.ref || "", done);
  const when = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();

  return (
    <section className="sec g-dark g" id="contact">
      <div className="in">
        <span className="kick">Contact</span>
        <div className="sh"><div><h2>Plan your setup <em>with us.</em></h2></div><p>Fill in the ticket and tear it off to us. Or write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p></div>
        <div className={`ctk ${status}`}>
          <div className="crop" aria-hidden="true"><i /><i /><i /><i /></div>
          {done ? (
            <div className="ctk-main ctk-done" role="status">
              <DoneMark />
              <div className="done-txt">
                <small>TICKET RECEIVED · {when}</small>
                <h3>Thanks, {sent.name.split(" ")[0]}.<br /><em>It's with our team.</em></h3>
                <p>We've emailed <b>{sent.email}</b> your reference and will reply within one working day{sent.event ? ` about ${sent.event}` : ""}.</p>
                <button type="button" className="btn line tk" onClick={() => { setStatus("idle"); setSent(null); }}><span className="t">Send another request</span><span className="s">↻</span></button>
              </div>
            </div>
          ) : (
            <form className="ctk-main" onSubmit={send}>
              <PixCorner color={BLUE} strength={0.8} />
              <div className="ctk-head"><Logo tone="color" height={22} /><span>SETUP REQUEST · FREE QUOTE</span></div>
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="honey" />
              <div className="bars">
                <label className="fbar"><span>NAME</span><input name="name" required maxLength={120} autoComplete="name" placeholder="Aisha Khan" /></label>
                <label className="fbar"><span>EMAIL</span><input name="email" type="email" required maxLength={200} autoComplete="email" placeholder="you@institute.edu" /></label>
                <label className="fbar full"><span>EVENT</span><input name="event" maxLength={200} placeholder="International Conference on…" /></label>
                <div className="fbar full" role="group" aria-label="Expected attendees"><span>PEOPLE</span>
                  <div className="sizes">{SIZES.map((x) => <button key={x} type="button" className="tk" aria-pressed={size === x} onClick={() => setSize(x)}>{x}</button>)}</div>
                </div>
                <label className="fbar full tall"><span>NEEDS</span><textarea name="need" rows={2} maxLength={4000} placeholder="Dates and city, papers, sponsors, check-in desks…" /></label>
              </div>
              <div className="ctk-foot">
                <button className="btn tk" type="submit" disabled={status === "sending" || status === "tearing"}><span className="t">{status === "sending" ? "Sending…" : "Tear & send"}</span><span className="s">✂</span></button>
                {status === "error"
                  ? <span className="err">Couldn't send just now. <a href={mailto(sent || {})}>Email us instead</a>, the details are filled in.</span>
                  : <span>We reply within one working day.</span>}
              </div>
            </form>
          )}
          <aside className="ctk-stub">
            <small>ADMIT ONE</small>
            <b>SETUP<br />REQUEST</b>
            <span className="no">{done ? <>{typed}<i className="caret" /></> : sent?.ref && status !== "error" ? sent.ref : "NO. PENDING"}</span>
            <i className="code" aria-hidden="true" />
            <ol>{NEXT.map(([t, d], n) => <li key={t}><em>0{n + 1}</em><span><b>{t}</b>{d}</span></li>)}</ol>
            <Pix icon="logo" color="#FFFFFF" className="mark" />
            {done && <div className="stamp" aria-hidden="true">RECEIVED<small>{when}</small></div>}
          </aside>
        </div>
      </div>
    </section>
  );
};

const FOOT = [
  ["EXPLORE", [["Website builder", "#website"], ["Badge Studio", "#badges"], ["Certificates", "#certificates"], ["Pricing", "#pricing"]]],
  ["PORTALS", [["Sponsor portal", "/sponsor-login"], ["Volunteer portal", "/volunteer/login"], ["Sign in", "/login"]]],
  ["COMPANY", [["Security & data", "#proof"], ["Help", "#faq"], ["Request access", "#contact"]]],
  ["LEGAL", [["Terms", "/terms"], ["Privacy", "/privacy-policy"]]],
];

/** `base` as in Nav: "/" when the footer is shown away from the landing page. */
export const Footer = ({ base = "" }) => {
  const cv = useRef(null);
  useEffect(() => {
    const f = startField(cv.current, { shape: "logo", scale: 0.9, count: 320, on: "#3B5FA8", hot: BLUE, off: "#1A3570", idle: 0.4 });
    return () => f.stop();
  }, []);
  return (
    <footer className="foot g-dark g" data-public-footer>
      <div className="in">
        <div className="foot-word"><canvas ref={cv} aria-hidden="true" /></div>
        <div className="foot-top">
          <div><Link to="/" aria-label="Planyt home"><Logo tone="white" height={30} /></Link><p>Registration, papers, check-in and certificates for conferences, workshops and seminars.</p></div>
          {FOOT.map(([h, links]) => (
            <div key={h}><h4>{h}</h4><ul>{links.map(([l, to]) => <li key={l}>{to.startsWith("#") && !base ? <a href={to}>{l}</a> : <Link to={to.startsWith("#") ? `${base}${to}` : to}>{l}</Link>}</li>)}</ul></div>
          ))}
        </div>
        <div className="foot-bot"><span>© {new Date().getFullYear()} Planyt. All rights reserved.</span><span>+ Built for academic and professional events +</span></div>
      </div>
    </footer>
  );
};

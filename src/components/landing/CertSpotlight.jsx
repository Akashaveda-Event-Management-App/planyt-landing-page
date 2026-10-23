import React, { useEffect, useRef, useState } from "react";
import { still } from "./pixels";

/**
 * Spotlight 03, certificates and communication (navy ground). The real Certificate Studio
 * (public/images/landing/cert-studio.webp) with the 20 designs scrolling by underneath
 * (public/images/landing/certificates, in certTemplates.js order): hover or tap one and it goes on
 * the Studio's page. Then the organizer's email composer: pick who, pick a template, write, see what
 * one person gets, send.
 */
const CERT_POINTS = ["20 designs, or start blank", "Type right on the page", "Name, paper and dates filled per person", "Sent to everyone at once", "A verify link on each"];
const CERTS = [["Aurora", "Dark"], ["Swiss Grid", "Bold"], ["Diagonal", "Modern"], ["Editorial", "Academic"], ["Gradient Frame", "Modern"], ["Glass Card", "Modern"], ["Bauhaus", "Bold"], ["Ticket", "Modern"], ["Neon", "Dark"], ["Sunset Thanks", "Volunteers"], ["Watermark", "Modern"], ["Pastel Shapes", "Modern"], ["Gold Medal", "Awards"], ["Best Paper", "Awards"], ["Academic Seal", "Academic"], ["Spotlight", "Dark"], ["Presentation", "Academic"], ["Card Stack", "Reviewers"], ["Volunteer Pop", "Volunteers"], ["Photo Backdrop", "Bold"]]
  .map(([name, tag], i) => ({ name, tag, img: `/images/landing/certificates/c${String(i + 1).padStart(2, "0")}.webp` }));

const AUDIENCES = [["All attendees", 412], ["Abstract authors", 86], ["Full paper authors", 52], ["Reviewers", 24], ["Oral authors", 31], ["Custom list", 3]];
const TEMPLATES = [
  ["Custom", "Wi-Fi and lunch on Day 2", "Hi {{name}}, the Wi-Fi password is on the back of your badge. Lunch on Day 2 moves to the lawn next to Hall B."],
  ["Event reminder", "Applied AI 2026 starts in 3 days", "Hi {{name}}, we're ready for you. Doors open at 8:30 at Gate 1; keep your QR pass handy."],
  ["Event update", "The opening keynote moves to Hall A", "Hi {{name}}, the opening keynote is now in Hall A at 10:00. Everything else stays as planned."],
  ["Announcement", "Poster session sign-ups are open", "Hi {{name}}, poster sign-ups are open until 30 Nov. Add yours from your dashboard."],
];
const FACTS = ["Only people in your event", "{{name}} fills in each person", "Send yourself a test first", "Every send kept in History"];
const now = () => new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

/** Message text with {{name}} filled in as Aisha, marked so the personal part shows. */
const Body = ({ text }) => text.split(/(\{\{name\}\})/).map((part, i) => (part === "{{name}}" ? <mark key={i}>Aisha</mark> : part));

const Composer = () => {
  const [tab, setTab] = useState("email");
  const [aud, setAud] = useState(0);
  const [tpl, setTpl] = useState(0);
  const [subject, setSubject] = useState(TEMPLATES[0][1]);
  const [body, setBody] = useState(TEMPLATES[0][2]);
  const [inApp, setInApp] = useState(true);
  const [phase, setPhase] = useState("idle"); // idle | sending | sent
  const [note, setNote] = useState("");
  const [history, setHistory] = useState([["Yesterday", "Your pass and venue details", "All attendees", 409]]);
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const [who, count] = AUDIENCES[aud];

  const pick = (n) => { setTpl(n); setSubject(TEMPLATES[n][1]); setBody(TEMPLATES[n][2]); };
  const later = (fn, ms) => timers.current.push(setTimeout(fn, still() ? 0 : ms));
  const sendAll = () => {
    if (phase !== "idle" || !subject.trim()) return;
    setPhase("sending"); setNote("");
    later(() => { setPhase("sent"); setHistory((h) => [[now(), subject, who, count], ...h].slice(0, 4)); }, 1400);
    later(() => setPhase("idle"), 4200);
  };
  const test = () => { setNote("Test sent to you@institute.edu"); later(() => setNote(""), 2600); };

  return (
    <div className={`compose ${phase}`}>
      <div className="mwin">
        <div className="mwin-top">
          <b>Emails & notifications</b>
          <div className="mwin-tabs" role="tablist" aria-label="Composer">
            {[["email", "Email"], ["history", `History · ${history.length}`]].map(([k, l]) => <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>{l}</button>)}
          </div>
        </div>
        {tab === "email" ? (
          <div className="mwin-body">
            <div className="mrow"><span>TO</span><div className="chips">{AUDIENCES.map(([a, c], n) => <button key={a} type="button" className="tk" aria-pressed={n === aud} onClick={() => setAud(n)}>{a}<em>{c}</em></button>)}</div></div>
            <div className="mrow"><span>TEMPLATE</span><div className="chips">{TEMPLATES.map(([t], n) => <button key={t} type="button" className="tk" aria-pressed={n === tpl} onClick={() => pick(n)}>{t}</button>)}</div></div>
            <label className="mrow"><span>SUBJECT</span><input value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={120} /></label>
            <label className="mrow top"><span>MESSAGE</span><textarea value={body} onChange={(e) => setBody(e.target.value)} rows={3} maxLength={400} /></label>
            <div className="mfoot">
              <button type="button" className={`switch${inApp ? " on" : ""}`} aria-pressed={inApp} onClick={() => setInApp(!inApp)}><i />Also in-app</button>
              <span className="mnote" aria-live="polite">{note}</span>
              <button type="button" className="btn line tk" onClick={test}><span className="t">Send test</span><span className="s">✉</span></button>
              <button type="button" className="btn tk" onClick={sendAll} disabled={phase !== "idle"}><span className="t">{phase === "sending" ? "Sending…" : phase === "sent" ? `Sent to ${count}` : `Send to ${count}`}</span><span className="s">{phase === "sent" ? "✓" : "→"}</span></button>
            </div>
          </div>
        ) : (
          <div className="mwin-body">
            <div className="hist">{history.map(([t, s, a, c], n) => <div key={`${t}${s}${n}`}><time>{t}</time><b>{s}</b><span>{a}</span><span className="tag ok tk">Sent · {c}</span></div>)}</div>
          </div>
        )}
      </div>
      <div className="mprev">
        <small>WHAT AISHA GETS</small>
        <div className="mstack">
          {phase === "sending" && [0, 1, 2, 3, 4].map((g) => <span key={g} className="ghost" style={{ animationDelay: `${g * 0.14}s` }} />)}
          {inApp && <div className="push" key={`push${subject}`}><b>Applied AI 2026</b><span>{subject || "No subject yet"}</span></div>}
          <div className="mcard">
            <div className="mhead"><span className="av">AI</span><div><b>Applied AI 2026 <small>via Planyt</small></b><span>to aisha.khan@example.com</span></div></div>
            <h4>{subject || "No subject yet"}</h4>
            <p><Body text={body} /></p>
            <div className="msign">Organising committee, Applied AI 2026 · replies go to your contact email</div>
          </div>
        </div>
        {phase === "sent" && <div className="sentbar" role="status">✓ Sent to {count} · {who} · {now()}</div>}
      </div>
    </div>
  );
};

export const CertSpotlight = () => {
  const [cur, setCur] = useState(4);
  const c = CERTS[cur];
  return (
    <section className="sec g-dark g" id="certificates">
      <div className="in">
        <span className="kick">Spotlight 03 · Certificates & communication</span>
        <div className="sh"><div><h2>Certificates out. <em>Every email sent.</em></h2></div><p>Design a certificate once and Planyt fills it in for everyone. Write to any group in your event from the same dashboard.</p></div>

        <div className="cstudio">
          <ul className="cpoints">{CERT_POINTS.map((p) => <li key={p} className="tk">{p}</li>)}</ul>
          <figure className="cshot">
            <img src="/images/landing/cert-studio.webp" alt="Certificate Studio: the certificate on the page, elements on the left, colours on the right" loading="lazy" width="1440" height="900" />
            <img className="cpage" key={c.img} src={c.img} alt={`${c.name} certificate design`} width="800" height="566" />
            <span className="cname" key={c.name}>{c.name}</span>
            <figcaption className="chip c1 tk">Click any text to edit</figcaption>
            <figcaption className="chip c2 tk">Filled per person</figcaption>
          </figure>
        </div>

        <div className="ctpl-head"><b>{CERTS.length} certificate designs.</b><span>Hover any design to open it in the Studio.</span></div>
        <div className="ctpl">
          <div className="ctpl-track">
            {[...CERTS, ...CERTS].map((x, n) => {
              const i = n % CERTS.length, copy = n >= CERTS.length;
              return (
                <figure key={`${x.name}${n}`} className={`ct-wrap${i === cur ? " on" : ""}`} aria-hidden={copy || undefined} onPointerEnter={() => setCur(i)}>
                  <button type="button" onClick={() => setCur(i)} tabIndex={copy ? -1 : 0} aria-label={`Open ${x.name} in the Studio`}><img src={x.img} alt="" loading="lazy" width="800" height="566" /></button>
                  <figcaption>{x.name.toUpperCase()} · {x.tag.toUpperCase()}</figcaption>
                </figure>
              );
            })}
          </div>
        </div>

        <div className="comms">
          <div className="comms-head">
            <h3>And every email, <em>sent from one place.</em></h3>
            <p>Pick who gets it, start from a template or write your own, and see exactly what each person receives. Planyt also sends the emails at every step for you: confirmations, GST invoices, decisions, reminders and certificates.</p>
            <ul className="facts2">{FACTS.map((f) => <li key={f} className="tk">{f}</li>)}</ul>
          </div>
          <Composer />
        </div>
      </div>
    </section>
  );
};

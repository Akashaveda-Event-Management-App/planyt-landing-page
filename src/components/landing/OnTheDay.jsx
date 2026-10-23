import React, { useRef, useState } from "react";
import { Pix, INK, still } from "./pixels";
import { Cell, ChapterAside } from "./Chapters";

/**
 * Chapter 02, on the day (white ground), with the same side as chapters 01 and 03. A volunteer's
 * scanner (the pass shows up in the camera, the result slides up) beside the organizer's live board,
 * and three buttons that send a scan through: a valid pass, the same pass again, an unpaid pass.
 * Then every other day-of tool, three to a row.
 */
const PEOPLE = [["Priya Sharma", "Delegate", "ICAAI-0412"], ["Rahul Verma", "Speaker", "ICAAI-0007"], ["Ananya Iyer", "Delegate", "ICAAI-0388"], ["Arjun Reddy", "Sponsor", "ICAAI-0102"], ["Sneha Patil", "Volunteer", "ICAAI-0911"]];
const UNPAID = ["Karthik Nair", "Delegate", "ICAAI-0519"];
const GATES = [["GATE 1", 214], ["GATE 2", 188], ["HALL A", 126], ["LUNCH", 147]];
const TOOLS = [
  ["qr", "Check-in stations", "Every gate, hall, meal and kit counter scans the same pass."],
  ["form", "Desk & walk-ins", "Register people at the desk and hand over a pass on the spot."],
  ["cal", "Live agenda", "Attendees see what's on now, by hall and track."],
  ["chat", "Live Q&A & polls", "Questions tied to each session, polls with live results."],
  ["people", "Chat & meetings", "Attendees message each other and book one-to-one meetings."],
  ["shield", "Volunteers", "Each volunteer gets only the tools you pick."],
  ["lock", "Guests & stays", "VVIP guests with passes, and rooms with requests."],
  ["store", "Sponsors on the floor", "Stalls on the floor plan and passes for every sponsor's team."],
  ["list", "Announcements", "Post news and files to every attendee's dashboard."],
];
const now = () => new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
const IDLE = { tone: "", title: "Point at a pass", text: "Gate 2 · entry" };

export const OnTheDay = () => {
  const [pass, setPass] = useState(null);
  const [res, setRes] = useState(IDLE);
  const [inside, setInside] = useState(812);
  const [gates, setGates] = useState(GATES);
  const [hit, setHit] = useState(false);
  const [log, setLog] = useState([["09:41", "Neha Gupta", "Admitted", "ok"], ["09:40", "Aditya Kulkarni", "Admitted", "ok"]]);
  const [scanning, setScanning] = useState(false);
  const seen = useRef(new Map()), next = useRef(0), last = useRef(null), busy = useRef(false);

  const addLog = (who, what, tone) => setLog((l) => [[now(), who, what, tone], ...l].slice(0, 3));
  const scan = (p, kind) => {
    if (busy.current) return;
    busy.current = true; setPass(p); setScanning(true); setRes({ tone: "", title: "Reading pass…", text: p[2] });
    setTimeout(() => {
      busy.current = false; setScanning(false);
      if (kind === "bad") {
        setRes({ tone: "bad", title: "Stop · payment pending", text: `${p[0]}: bank transfer not approved yet. Send to the help desk.` });
        addLog(p[0], "Stopped", "bad"); return;
      }
      if (seen.current.has(p[2])) {
        setRes({ tone: "dup", title: "Already inside", text: `${p[0]} came in at Gate 2 at ${seen.current.get(p[2])}. Not admitted twice.` });
        addLog(p[0], "Duplicate", "wait"); return;
      }
      const t = now(); seen.current.set(p[2], t); last.current = p;
      setInside((n) => n + 1); setGates((g) => g.map((x, i) => (i === 1 ? [x[0], x[1] + 1] : x))); setHit(true); setTimeout(() => setHit(false), 800);
      setRes({ tone: "ok", title: `Admitted · ${p[0]}`, text: `${p[1]} · ${t} · lunch and kit counted separately` });
      addLog(p[0], "Admitted", "ok");
    }, still() ? 0 : 900);
  };
  const scanValid = () => {
    let p = null;
    for (let k = 0; k < PEOPLE.length && !p; k++) { const c = PEOPLE[(next.current + k) % PEOPLE.length]; if (!seen.current.has(c[2])) { p = c; next.current += k + 1; } }
    if (!p) { seen.current.clear(); p = PEOPLE[0]; next.current = 1; }
    scan(p, "ok");
  };
  const scanAgain = () => {
    if (!last.current) { setRes({ tone: "", title: "Scan a valid pass first", text: "Then scan the same one again." }); return; }
    scan(last.current, "dup");
  };

  return (
    <section className="sec chap g-light g" id="day">
      <div className="in">
        <ChapterAside id="day" />
        <div className="day">
          <div className="dstage">
            <div className="scanner">
              <div className="dev"><div className="dev-scr">
                <div className="dev-bar"><span>GATE 2 · ENTRY</span><span className="live">OFFLINE READY</span></div>
                <div className={`cam${scanning ? " on" : ""}`}>
                  {pass && <div className="mini" key={`${pass[2]}${scanning}`}><small>APPLIED AI 2026</small><b>{pass[0]}</b><span>{pass[1]} · {pass[2]}</span><Pix icon="qr" color={INK} /></div>}
                  <div className="aim"><i /><i /><i /><i /></div>
                  <div className="laser" />
                </div>
                <div className={`verdict ${res.tone}`} aria-live="polite" key={res.title}>
                  <span className="dot" /><div><b>{res.title}</b><span>{res.text}</span></div>
                </div>
              </div></div>
            </div>
            <div className="board">
              <div className="big"><b>{inside.toLocaleString("en-IN")}</b><small>PEOPLE INSIDE<br />APPLIED AI 2026 · DAY 2</small></div>
              <div className="gates">{gates.map(([n, v], i) => <div key={n} className={`gate${i === 1 && hit ? " hit" : ""}`}><span>{n}</span><span className="barx"><i style={{ width: `${v / 2.6}%` }} /></span><b>{v}</b></div>)}</div>
              <div className="log">{log.map(([t, who, what, tone], i) => <div key={`${t}${who}${what}${i}${log.length}`}><time>{t}</time><span>{who}</span><span className={`tag ${tone} tk`}>{what}</span></div>)}</div>
              <p className="offline">+ Keeps scanning when the network drops, and syncs when it's back.</p>
            </div>
            <div className="ctrl">
              <button className="btn tk" type="button" onClick={scanValid}><span className="t">Scan a valid pass</span><span className="s">→</span></button>
              <button className="btn line tk" type="button" onClick={scanAgain}><span className="t">Same pass again</span><span className="s">↻</span></button>
              <button className="btn line tk" type="button" onClick={() => scan(UNPAID, "bad")}><span className="t">An unpaid pass</span><span className="s">!</span></button>
            </div>
          </div>
          <div className="sheet tight">{TOOLS.map(([ic, t, d], n) => <Cell key={t} icon={ic} title={t} text={d} n={n} />)}</div>
        </div>
      </div>
    </section>
  );
};

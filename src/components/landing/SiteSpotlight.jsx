import React, { useEffect, useRef, useState } from "react";
import { WEBSITE_STEPS } from "./content";
import { still, watch } from "./pixels";

/**
 * Spotlight 01, the website builder (navy ground): a tilted wall of real templates (full-page captures
 * in public/images/landing/sites) scrolling up and down forever, four columns at different speeds,
 * and the four steps in a row under it. The glass card on the wall follows the active step.
 */
const COLUMNS = [
  [["signal", "Signal", "Tech summit"], ["scholar", "Scholar", "Academic"], ["gala", "Gala", "Awards night"]],
  [["carnival", "Carnival", "Festival"], ["build", "Build", "Hackathon"], ["clinic", "Clinic", "Medical"]],
  [["run", "Run", "Marathon"], ["summit", "Summit", "Leadership"], ["pavilion", "Pavilion", "Trade expo"]],
  [["sprint", "Sprint", "Innovation week"], ["campus", "Campus", "College fest"], ["studio", "Studio", "Workshop"]],
];
const STATE = [
  ["Template picked", "Signal · Tech summit", "blue"],
  ["Editing", "Hero title changed · saved", "blue"],
  ["Published", "devsummit.planyt.in is live", "ok"],
  ["Synced", "2 speakers added from your agenda", "ok"],
];

export const SiteSpotlight = () => {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const seen = useRef(false);

  useEffect(() => watch(ref.current, (v) => { seen.current = v; }), []);
  useEffect(() => {
    if (paused || still()) return undefined;
    const t = setInterval(() => seen.current && setStep((s) => (s + 1) % STATE.length), 3800);
    return () => clearInterval(t);
  }, [paused]);

  const [label, detail, tone] = STATE[step];
  return (
    <section className="sec g-dark g" id="website" ref={ref}>
      <div className="in">
        <span className="kick">Spotlight 01 · Website builder</span>
        <div className="sh"><div><h2>Your event website, <em>live in minutes.</em></h2></div><p>20 designed templates for conferences, summits, fests and hackathons. Every one of them is below, live.</p></div>
        <div className="wall" aria-label="Website templates">
          <div className="wall-tilt">
            {COLUMNS.map((col, c) => (
              <div key={c} className={`wall-col c${c}`}>
                <div className="wall-track">
                  {[...col, ...col].map(([key, name, cat], n) => (
                    <figure key={`${key}${n}`} className="wcard" aria-hidden={n >= col.length || undefined}>
                      <div className="wcard-top"><i /><i /><i /><span>{key}.planyt.in</span></div>
                      <img src={`/images/landing/sites/${key}.webp`} alt={n < col.length ? `${name} template, ${cat}` : ""} loading="lazy" width="560" height="1000" />
                      <figcaption>{name} · {cat}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="wall-card" aria-live="polite">
            <span className={`tag ${tone} tk`}>{label}</span>
            <b>{detail}</b>
            <span className="bar"><i style={{ width: `${(step + 1) * 25}%` }} /></span>
          </div>
        </div>
        <ol className="steps" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
          {WEBSITE_STEPS.map(([t, d], i) => (
            <li key={t}><button type="button" className="tk" aria-pressed={i === step} onClick={() => setStep(i)}><b>0{i + 1}</b><span>{t}</span><em>{d}</em></button></li>
          ))}
        </ol>
      </div>
    </section>
  );
};

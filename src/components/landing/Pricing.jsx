import React, { useEffect, useRef, useState } from "react";
import { Link } from "./link";
import { Check } from "lucide-react";
import { SKY } from "./pixels";
import { START_FREE, planSummary, useSignup } from "./signup";

/**
 * Pricing (white ground): the free offer as a long ticket; a plan finder (attendees and what the
 * event needs) that lights up the plan that fits; then the three plans as equal admission tickets,
 * the best fit in navy. Prices are quoted, so the finder only recommends. When organizer self
 * sign-up is open the offer becomes "Start free" with the plan's limits.
 */
const PLANS = [
  { no: "01", name: "Starter", for: "Seminars and workshops", note: "Quoted per event", cta: "Request a quote", points: ["Registration & tickets", "Online payments", "QR check-in", "Certificates"] },
  { no: "02", name: "Professional", for: "Events and conferences", note: "Per event or yearly", cta: "Request a quote", points: ["Everything in Starter", "Your own event website", "Call for papers & review", "Agenda, Q&A & polls", "Sponsors & stalls", "VVIP & on-site desk"] },
  { no: "03", name: "Custom", for: "Many events, bigger needs", note: "Built around you", cta: "Talk to us", points: ["Everything in Professional", "Many events a year", "Extra modules & integrations", "Setup help from our team"] },
];
const NEEDS = [["papers", "Call for papers"], ["site", "Event website"], ["many", "Several events a year"]];
const STEPS = ["Tell us about your event", "Get a quote", "Get your login"];
const FREE_STEPS = ["Sign up free", "Set up your event", "Upgrade when you grow"];
const SIZES = [50, 100, 200, 300, 500, 1000, 2000, 5000];

/** Which plan fits: many events or a very large event → Custom; papers, a website or 300+ people → Professional. */
const fit = (people, needs) => (needs.many || people >= 2000 ? 2 : needs.papers || needs.site || people >= 300 ? 1 : 0);

const Barcode = ({ seed }) => {
  let s = seed; const bars = [];
  for (let i = 0; i < 40; i++) { s = (s * 9301 + 49297) % 233280; bars.push(<i key={i} style={{ width: 1 + (s % 3) }} />); }
  return <div className="barcode" aria-hidden="true">{bars}</div>;
};

export const Pricing = () => {
  const signup = useSignup();
  const pixRef = useRef(null);
  const [size, setSize] = useState(3);
  const [needs, setNeeds] = useState({ papers: true, site: false, many: false });
  const best = fit(SIZES[size], needs);
  useEffect(() => {
    const c = pixRef.current; if (!c) return;
    const x = c.getContext("2d"); x.fillStyle = SKY; let s = 5;
    for (let i = 0; i < 320; i++) { s = (s * 9301 + 49297) % 233280; if (s / 233280 < (i % 32) / 46) x.fillRect(i % 32, (i / 32) | 0, 1, 1); }
  }, []);
  return (
    <section className="sec g-light g" id="pricing">
      <div className="in">
        <div className="sh"><div><span className="kick">Pricing</span><h2>A plan for every <em>size of event.</em></h2></div><p>Quoted for your event. No cut of ticket sales, and payments go to your own account.</p></div>
        <div className="free tk">
          <canvas ref={pixRef} width="32" height="10" aria-hidden="true" />
          <div><small>{signup ? `${signup.plan?.name || "Free"} plan · no card needed` : "THE NEW ERA OF CONFERENCE MANAGEMENT"}</small><h3>{signup ? `Start free: ${planSummary(signup.plan)}.` : "Your first conference is on us."}</h3></div>
          <div className="stub">
            <b>FREE</b><span>{signup ? "SIGN UP IN A MINUTE" : "ON ANY PLAN · ADMIT ONE"}</span>
            {signup && <Link className="btn white tk" to={START_FREE}><span className="t">Start free</span><span className="s">→</span></Link>}
          </div>
        </div>

        <div className="finder">
          <div className="f-size">
            <label htmlFor="pl-size">Expected attendees <b>{SIZES[size].toLocaleString("en-IN")}{size === SIZES.length - 1 ? "+" : ""}</b></label>
            <input id="pl-size" type="range" min="0" max={SIZES.length - 1} step="1" value={size} onChange={(e) => setSize(+e.target.value)} style={{ "--v": `${(size / (SIZES.length - 1)) * 100}%` }} />
            <div className="f-ticks" aria-hidden="true">{SIZES.map((n, i) => <span key={n} className={i === size ? "on" : ""}>{n >= 1000 ? `${n / 1000}k` : n}</span>)}</div>
          </div>
          <div className="f-needs" role="group" aria-label="What your event needs">
            {NEEDS.map(([k, l]) => <button key={k} type="button" className="tk" aria-pressed={needs[k]} onClick={() => setNeeds((n) => ({ ...n, [k]: !n[k] }))}><i aria-hidden="true">{needs[k] && <Check size={13} strokeWidth={3} />}</i>{l}</button>)}
          </div>
          <p className="f-out" aria-live="polite"><span>Best fit</span><b>{PLANS[best].name}</b></p>
        </div>

        <div className="plans">
          {PLANS.map((p, i) => (
            <article key={p.no} className={`plan${i === best ? " best" : ""}`}>
              <div className="p-top">
                <div className="p-row"><small>PLAN {p.no}</small>{i === best && <span className="bestfit tk">Best fit for you</span>}</div>
                <h3>{p.name}</h3>
                <p className="p-note">{p.for} · {p.note}</p>
                <a className={`btn${i === best ? " white" : ""} tk`} href="#contact"><span className="t">{p.cta}</span><span className="s">→</span></a>
              </div>
              <div className="p-perf" aria-hidden="true" />
              <ul>{p.points.map((x) => <li key={x}><Check size={15} strokeWidth={2.6} />{x}</li>)}</ul>
              <div className="p-foot"><span>NO. 2026-{p.no}</span><Barcode seed={+p.no * 7} /></div>
            </article>
          ))}
        </div>
        <ol className="how">{(signup ? FREE_STEPS : STEPS).map((t, i) => <li key={t}><b className="tk">0{i + 1}</b>{t}</li>)}</ol>
      </div>
    </section>
  );
};

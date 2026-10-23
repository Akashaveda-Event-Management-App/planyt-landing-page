import React, { useEffect, useRef } from "react";
import { PARTNERS, PAST_EVENTS, TRUST } from "./content";
import { Cell } from "./Chapters";
import { paintPix, SKY } from "./pixels";

/**
 * Proof (navy ground): the featured past event beside its hosts' logos, then "safe by design" as a
 * grid sheet. Data in content.js (PAST_EVENTS, PARTNERS, TRUST).
 */
const PIX = { "credit-card": "card", shield: "shield", "file-check": "list", "user-check": "people", lock: "lock", archive: "form" };

export const Proof = () => {
  const ev = PAST_EVENTS[0];
  const mark = useRef(null);
  useEffect(() => { if (mark.current) paintPix(mark.current, "logo", SKY); }, []);
  return (
    <section className="sec g-dark g" id="proof">
      <div className="in">
        <div className="sh"><div><span className="kick">Proof</span><h2>Trusted to run ISRO's <em>international space conference.</em></h2></div><p>Organisers we have run events with, and the events themselves.</p></div>
        <div className="proof">
          <div className="smops">
            <canvas ref={mark} className="bgmark" aria-hidden="true" />
            <div className="smops-top"><small>FEATURED EVENT</small><h3>{ev.name}</h3><p>{ev.full}. Hosted by {ev.hosts.replace(/ · /g, ", ")}. {ev.note}</p></div>
            <dl>
              <div><dt>WHEN</dt><dd>{ev.when}</dd></div>
              <div><dt>WHERE</dt><dd>{ev.where}</dd></div>
              <div><dt>SITE</dt><dd><a href={ev.url} target="_blank" rel="noopener noreferrer">{ev.url.replace(/^https?:\/\/|\/$/g, "")} ↗</a></dd></div>
            </dl>
          </div>
          <div className="hosts">
            {PARTNERS.map((p) => (
              <div key={p.name}><span className="mk"><img src={p.logo} alt="" loading="lazy" className={p.light ? "inv" : ""} /></span><div><b>{p.name}</b><span>Host</span></div></div>
            ))}
          </div>
        </div>
        <div className="sheet trust">
          {TRUST.map(([ic, t, d], n) => <Cell key={t} icon={PIX[ic] || "shield"} title={t} text={d} n={n} dark lead={n === 0} as="b" />)}
        </div>
      </div>
    </section>
  );
};

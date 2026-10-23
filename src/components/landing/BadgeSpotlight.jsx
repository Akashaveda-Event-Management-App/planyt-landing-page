import React, { useState } from "react";
import { BADGE_TEMPLATES, ROLE_CARDS } from "./content";

/**
 * Spotlight 02, Badge Studio (navy ground): pick a role to see how it signs in, how far it reaches
 * and three things it sees (content.js ROLE_CARDS), with that role's badge on the lanyard. The lanyard
 * wears real Badge Studio designs (public/images/landing/badges): hover or tap any of the 30 in the
 * strip below to put it on.
 */
const BY_KEY = Object.fromEntries(BADGE_TEMPLATES.map((t) => [t[0], t]));

export const BadgeSpotlight = () => {
  const [i, setI] = useState(0);
  const [worn, setWorn] = useState(ROLE_CARDS[0].tpl);
  const r = ROLE_CARDS[i];
  const [key, name, cat] = BY_KEY[worn];
  const pickRole = (n) => { setI(n); setWorn(ROLE_CARDS[n].tpl); };
  return (
    <section className="sec g-dark g" id="badges">
      <div className="in">
        <div className="bspot">
          <div>
            <span className="kick">Spotlight 02 · Badge Studio</span>
            <div className="sh sh-solo"><h2>A badge, and a screen, <em>for every role.</em></h2></div>
            <div className="rtabs" role="tablist" aria-label="Role">
              {ROLE_CARDS.map((x, n) => <button key={x.name} type="button" role="tab" className="tk" aria-selected={n === i} onClick={() => pickRole(n)}>{x.name}</button>)}
            </div>
            <div className="rinfo" role="tabpanel" key={r.name}>
              <p>{r.desc}</p>
              <div className="facts">{r.pass.map(([k, v]) => <div key={k}><span>{k.toUpperCase()}</span><b>{v}</b></div>)}</div>
              <ul className="sees">{r.see.map((s) => <li key={s} className="tk">{s}</li>)}</ul>
            </div>
          </div>
          <div className="lanyard">
            <div className="strap" aria-hidden="true" /><div className="clip" aria-hidden="true" />
            <div className="rbadge" key={key}>
              <div className="hole" aria-hidden="true" />
              <img src={`/images/landing/badges/${key}.webp`} alt={`${name} badge design`} width="600" height="900" />
            </div>
            <p className="worn"><b>{name.toUpperCase()} · {cat.toUpperCase()}</b>Hover any design below to wear it</p>
          </div>
        </div>
        <div className="btpl-head"><b>{BADGE_TEMPLATES.length} badge designs, printed from the registration list.</b><span>Pick one, change anything, print in bulk or at the desk.</span></div>
        <div className="btpl">
          <div className="btpl-track">
            {[...BADGE_TEMPLATES, ...BADGE_TEMPLATES].map(([k, nm, c], n) => (
              <figure key={`${k}${n}`} className={`bt-wrap${k === key ? " on" : ""}`} aria-hidden={n >= BADGE_TEMPLATES.length || undefined} onPointerEnter={() => setWorn(k)}>
                <button type="button" className="bt" onClick={() => setWorn(k)} tabIndex={n >= BADGE_TEMPLATES.length ? -1 : 0} aria-label={`Wear the ${nm} badge`}>
                  <img src={`/images/landing/badges/${k}.webp`} alt="" loading="lazy" width="600" height="900" />
                </button>
                <figcaption>{nm.toUpperCase()} · {c.toUpperCase()}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

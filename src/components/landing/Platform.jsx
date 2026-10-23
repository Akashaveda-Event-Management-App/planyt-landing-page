import React, { useEffect, useRef, useState } from "react";
import { renderDash } from "./dashShell";
import { HOMES } from "./dashHomes";
import { useTick } from "./kit";
import { Pix, SKY, still, useFit, watch } from "./pixels";

/**
 * One platform (navy ground): the five workspaces on the left, the real home screen of the chosen
 * one on the right, drawn at 1280×800 (dashShell.js / dashHomes.js) and scaled to fit, so the
 * window never changes size. Moves to the next role every few seconds while on screen.
 */
const ROLES = [
  ["organizer", "Organizer", "Runs the whole event", "home"],
  ["volunteer", "Volunteer", "Desk, tasks and scanner", "qr"],
  ["reviewer", "Reviewer", "Only the papers assigned", "form"],
  ["sponsor", "Sponsor", "Team, stall and brand", "store"],
  ["attendee", "Attendee", "Pass, agenda, paper", "badge"],
];

const Screen = ({ role }) => {
  const ref = useRef(null);
  const t = useTick(true, 1500, ref); // numbers move only while the window is on screen
  return <div ref={ref} key={role} className="dash-swap">{renderDash(role, HOMES[role](t))}</div>;
};

export const Platform = () => {
  const [i, setI] = useState(0);
  const [seen, setSeen] = useState(false);
  const fit = useFit(1280, 800);
  useEffect(() => watch(fit.current, setSeen), [fit]);
  useEffect(() => {
    if (!seen || still()) return undefined;
    const t = setTimeout(() => setI((x) => (x + 1) % ROLES.length), 6500);
    return () => clearTimeout(t);
  }, [i, seen]);

  return (
    <section className="sec g-dark g" id="platform">
      <div className="in">
        <div className="sh"><div><span className="kick">One platform</span><h2>Five workspaces.<br /><em>One event.</em></h2></div><p>Everyone signs in to a screen built for their job, and nothing more. The organizer sees it all.</p></div>
        <div className="plat">
          <div className="roles" role="tablist" aria-label="Workspace">
            {ROLES.map(([k, name, sub, ic], n) => (
              <button key={k} type="button" role="tab" className="tk" aria-selected={n === i} onClick={() => setI(n)}>
                <span className="ib"><Pix icon={ic} color={n === i ? "#FFFFFF" : SKY} /></span><b>{name}</b><span>{sub}</span>
                <i key={n === i ? `on${i}` : "off"} />
              </button>
            ))}
          </div>
          <div className="fit" ref={fit} style={{ aspectRatio: "1280 / 800" }}>
            <div className="fit-in"><div className="dash-frame" role="img" aria-label={`The ${ROLES[i][1]} home screen`}><Screen role={ROLES[i][0]} /></div></div>
          </div>
        </div>
      </div>
    </section>
  );
};

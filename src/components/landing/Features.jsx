import React, { useEffect, useRef, useState } from "react";
import { Checker, Ico, useTick } from "./kit";
import { Band, SectionHead } from "./Band";
import { EventTiles } from "./EventTiles";
import { LIVE } from "./liveDemos";
import { MODULES } from "./content";

/**
 * Features (dark band).
 * Left: the nine modules; the active one opens to show its points and a progress line,
 * and the list moves on by itself every 6.5 s while the block is on screen and not hovered.
 * Right: the active module's colour panel with its live mini-UI.
 */
const BP = [
  { bg: "#0052C9", fg: "#fff", sub: "rgba(255,255,255,.8)", chip: "rgba(255,255,255,.16)", chipFg: "#fff", ck: "rgba(255,255,255,.16)" },
  { bg: "#A2C3FF", fg: "#071B43", sub: "#14306E", chip: "rgba(255,255,255,.6)", chipFg: "#0052C9", ck: "rgba(255,255,255,.4)" },
  { bg: "#FFFFFF", fg: "#071B43", sub: "#43506B", chip: "#E6EEFD", chipFg: "#0052C9", ck: "rgba(0,82,201,.12)" },
  { bg: "#1A3B82", fg: "#fff", sub: "#C9D6EE", chip: "rgba(255,255,255,.12)", chipFg: "#A2C3FF", ck: "rgba(255,255,255,.1)" },
];
const STEP = 6500;

const Live = ({ i }) => {
  const t = useTick(true);
  return <div className="pl-fade">{LIVE[i](t)}</div>;
};

export const Features = () => {
  const [feat, setFeat] = useState(0);
  const [hover, setHover] = useState(false);
  const [inView, setInView] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    if (boxRef.current) io.observe(boxRef.current);
    return () => io.disconnect();
  }, []);

  const auto = inView && !hover && !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  useEffect(() => {
    if (!auto) return undefined;
    const t = setTimeout(() => setFeat((f) => (f + 1) % MODULES.length), STEP);
    return () => clearTimeout(t);
  }, [auto, feat]);

  const [name, icon, items] = MODULES[feat];
  const p = BP[feat % 4];

  return (
    <Band id="features" dark innerRef={boxRef}>
          <SectionHead dark kicker="FEATURES" title="Everything an event needs, already connected." text="No separate form tool, review system, badge software or Q&A app. These nine modules come with every Planyt event." />

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-start" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div role="tablist" aria-label="Modules" className="flex flex-col">
              {MODULES.map(([n, ic, pts], i) => {
                const on = i === feat;
                return (
                  <div key={n} className="border-t border-white/[0.08] first:border-t-0">
                    <button type="button" role="tab" aria-selected={on} onClick={() => setFeat(i)}
                      className={`w-full flex items-center gap-3 py-2 px-2 rounded-xl text-left text-[15px] font-semibold transition-colors ${on ? "pl-ticket [--n:5px] bg-white/[0.07] text-white" : "text-[#8FA2C8] hover:text-white"}`}>
                      <span className={`w-7 h-7 rounded-[9px] flex items-center justify-center flex-none transition-colors ${on ? "bg-[#0052C9]" : "bg-white/[0.06]"}`}><Ico n={ic} c={on ? "#fff" : "#8FA2C8"} s={15} /></span>
                      <span className="flex-1">{n}</span>
                      <span className="text-xs tabular-nums" style={{ color: on ? "#A2C3FF" : "#5F729C" }}>0{i + 1}</span>
                    </button>
                    <div className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.2,.8,.2,1)]" style={{ gridTemplateRows: on ? "1fr" : "0fr" }}>
                      <div className="overflow-hidden">
                        <ul className="pl-11 pb-3 grid gap-1.5 text-[13.5px] text-[#C9D6EE]">
                          {pts.map((t) => <li key={t} className="flex gap-2 items-start"><Ico n="check" c="#7FA6FF" s={13} style={{ marginTop: 3 }} />{t}</li>)}
                        </ul>
                        <span className="block ml-11 mb-3 h-0.5 rounded bg-white/10 overflow-hidden">
                          {on && <span key={`${feat}${auto}`} className={`block h-full bg-[#A2C3FF] origin-left ${auto ? "pl-run" : ""}`} style={{ "--t": `${STEP}ms` }} />}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <article key={feat} className="pl-fade relative overflow-hidden rounded-[20px] p-5 sm:p-7 flex flex-col gap-5 order-first lg:order-none lg:sticky lg:top-24" style={{ background: p.bg, color: p.fg }}>
              <div className="absolute top-0 right-0 pointer-events-none"><Checker cols={9} rows={6} size={14} colors={[p.ck]} corner="tr" reach={0.85} /></div>
              <div className="relative flex items-center gap-3">
                <span className="w-11 h-11 rounded-[13px] flex items-center justify-center" style={{ background: p.chip }}><Ico n={icon} c={p.chipFg} s={20} /></span>
                <div>
                  <div className="text-[11.5px] font-bold tracking-[0.1em]" style={{ color: p.sub }}>MODULE 0{feat + 1} / 09</div>
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold tracking-[-0.03em] leading-tight">{name}</h3>
                </div>
                <span className="ml-auto hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold" style={{ background: p.chip }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" style={{ animation: "pl-blink 1.4s infinite" }} />Live preview
                </span>
              </div>
              <div className="relative bg-white text-[#0B1530] rounded-[20px] p-5 min-h-[260px] border border-[rgba(7,27,67,0.06)] shadow-[0_30px_60px_-30px_rgba(7,27,67,0.55)]">
                <Live i={feat} />
              </div>
              <div className="relative flex gap-1.5" aria-hidden="true">
                {MODULES.map((m, i) => <span key={m[0]} className="h-1.5 rounded-full transition-all duration-500" style={{ flex: i === feat ? "0 0 28px" : "0 0 6px", background: i === feat ? p.fg : p.bg === "#FFFFFF" ? "rgba(7,27,67,.2)" : "rgba(255,255,255,.35)" }} />)}
              </div>
              <span className="sr-only">{items.join(", ")}</span>
            </article>
          </div>
      <EventTiles />
    </Band>
  );
};

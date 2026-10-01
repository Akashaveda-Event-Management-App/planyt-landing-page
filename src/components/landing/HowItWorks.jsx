import React, { useEffect, useRef, useState } from "react";
import { Checker, CK, Ico, useTick } from "./kit";
import { Band, SectionHead } from "./Band";
import { STAGES } from "./content";
import { LIVE, SETUP_FORM, SETUP_TIERS, WRAP_REPORT } from "./liveDemos";

/**
 * How it works (light band, after the marquee): the five stages of an event.
 * A stage rail on top moves on by itself every 7 s while on screen and not hovered;
 * each stage shows what happens (its checklist ticks through) and two live views of it.
 */
const DEMOS = [[SETUP_FORM, SETUP_TIERS], [LIVE[0], LIVE[1]], [LIVE[2], LIVE[3]], [LIVE[4], LIVE[5]], [LIVE[7], WRAP_REPORT]];
const STEP = 7000;

const Stage = ({ i }) => {
  const t = useTick(true);
  const cs = STAGES[i];
  const done = Math.min(cs.items.length, Math.floor(t / 1.2) + 1);
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)_minmax(0,1fr)]">
      <div className="pl-fade relative overflow-hidden rounded-[20px] bg-[#0052C9] p-6 flex flex-col gap-3.5">
        <div className="absolute top-0 right-0 pointer-events-none"><Checker {...CK.navy} colors={["#2D74E0", "#1A66DB", "#4A88E8"]} corner="tr" /></div>
        <span className="relative text-[13px] font-semibold text-[#DCE7FD]">Stage {i + 1} of 5 · {cs.name}</span>
        <h3 className="relative font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-white">{cs.title}</h3>
        <p className="relative text-[15px] leading-relaxed text-[#E9F0FF]">{cs.body}</p>
        <div className="relative mt-auto grid gap-2 pt-2">
          {cs.items.map((it, j) => (
            <div key={it} className={`flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold transition-all duration-500 ${j < done ? "bg-white text-[#0B1530]" : "bg-white/[0.12] text-white/70"}`}>
              <span className={`w-6 h-6 rounded-lg flex-none flex items-center justify-center transition-colors duration-500 ${j < done ? "bg-[#0052C9]" : "border border-white/30"}`}>{j < done && <Ico n="check" c="#fff" s={13} />}</span>{it}
            </div>
          ))}
        </div>
      </div>
      {DEMOS[i].map((demo, j) => (
        <div key={j} className="pl-fade relative overflow-hidden rounded-[20px] bg-white border border-[#E4E8F0] text-[#0B1530] p-5 sm:p-6 min-h-[300px]" style={{ animationDelay: `${0.08 + j * 0.08}s` }}>
          <div className="absolute top-0 right-0 pointer-events-none"><Checker {...CK.blue} corner="tr" /></div>
          <div className="relative">{demo(t)}</div>
        </div>
      ))}
    </div>
  );
};

export const HowItWorks = () => {
  const [stage, setStage] = useState(0);
  const [hover, setHover] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const auto = inView && !hover && !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  useEffect(() => {
    if (!auto) return undefined;
    const t = setTimeout(() => setStage((s) => (s + 1) % STAGES.length), STEP);
    return () => clearTimeout(t);
  }, [auto, stage]);

  return (
    <Band id="how" tight innerRef={ref}>
      <SectionHead kicker="HOW IT WORKS" title="From first announcement to the last certificate." text="Five stages, one place. Here is what happens in each, as it looks in Planyt." />

        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <div role="tablist" aria-label="Stages" className="pl-reveal mt-8 grid grid-cols-5 gap-2 sm:gap-3">
            {STAGES.map((d, i) => {
              const on = i === stage, past = i < stage;
              return (
                <button key={d.name} type="button" role="tab" aria-selected={on} onClick={() => setStage(i)} className="group text-left">
                  <span className="block h-1 rounded-full bg-[#E4E8F0] overflow-hidden">
                    {past && <span className="block h-full bg-[#0052C9]" />}
                    {on && <span key={`${stage}${auto}`} className={`block h-full bg-[#0052C9] origin-left ${auto ? "pl-run" : ""}`} style={{ "--t": `${STEP}ms` }} />}
                  </span>
                  <span className="mt-3 flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-[9px] flex-none flex items-center justify-center text-xs font-bold transition-colors ${on ? "bg-[#071B43] text-white" : past ? "bg-[#0052C9] text-white" : "bg-white border border-[#E4E8F0] text-[#6B7690]"}`}>{past ? <Ico n="check" c="#fff" s={13} /> : i + 1}</span>
                    <span className={`hidden sm:block text-sm font-semibold transition-colors ${on ? "text-[#0B1530]" : "text-[#6B7690] group-hover:text-[#0B1530]"}`}>{d.name}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <div key={stage} className="mt-6"><Stage i={stage} /></div>
        </div>
    </Band>
  );
};

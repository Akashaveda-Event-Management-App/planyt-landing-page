import React from "react";
import { Checker, Ico } from "./kit";
import { Band, SectionHead } from "./Band";
import { STAGES } from "./content";
import { motion as Motion } from "motion/react";
import { RISE, STAGGER } from "./motion";

/**
 * How it works (light band, after the partners): the six stages of an event as one strip of
 * tickets. Dashed tear lines with punched notches separate the stages; the pixel corner grows
 * stage by stage, and the last stage is the blue stub. The stages rise in one after another as the strip scrolls into view.
 * One horizontal ticket at every width; on narrower screens it scrolls sideways (swipe), so phones
 * don't scroll through six stacked stages. Copy in content.js (STAGES).
 */
const ICONS = ["sliders-horizontal", "globe", "credit-card", "users-round", "scan-line", "award"];
// Tear line between stages (dashed); the notches are real cuts in the stages (.pl-seg-* in index.css).
const Tear = () => (
  <div aria-hidden="true" className="relative z-10 flex-none w-0">
    <span className="absolute left-0 top-5 bottom-5 border-l-2 border-dashed border-[#CBDDFE]" />
  </div>
);

export const HowItWorks = () => (
  <Band id="how" tight>
    <SectionHead kicker="HOW IT WORKS" title="From first announcement to the last certificate." text="Six stages for any kind of event. Use only what you need." />

    <Motion.ol {...STAGGER} aria-label="Six stages" className="mt-10 flex overflow-x-auto lg:overflow-visible snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-4 lg:pb-0 [scrollbar-width:thin] [filter:drop-shadow(0_0_0.5px_#C9D2E3)_drop-shadow(0_18px_28px_rgba(7,27,67,0.08))]">
      {STAGES.map((s, i) => {
        const last = i === STAGES.length - 1;
        return (
          <React.Fragment key={s.name}>
            {i > 0 && <Tear />}
            <Motion.li {...RISE} className={`${i === 0 ? "pl-seg-first" : last ? "pl-seg-last" : "pl-seg-mid"} relative flex-1 min-w-[78%] sm:min-w-[44%] lg:min-w-0 snap-start overflow-hidden p-6 lg:p-5 xl:p-6 flex flex-col ${last ? "bg-[#0052C9] text-white rounded-r-[22px]" : "bg-white text-[#0B1530]"} ${i === 0 ? "rounded-l-[22px]" : ""}`}>
              <div aria-hidden="true" className="absolute top-0 right-0 pointer-events-none">
                <Checker cols={6} rows={4} size={11} corner="tr" reach={0.35 + i * 0.12}
                  colors={last ? ["rgba(255,255,255,.22)", "rgba(255,255,255,.12)"] : ["#CBDDFE", "#DCE7FD", "#B8CEF8"]} />
              </div>
              <div className="relative flex items-center justify-between">
                <span className={`font-display font-extrabold text-[34px] leading-none tracking-[-0.04em] tabular-nums ${last ? "text-white" : "text-[#0052C9]"}`}>{String(i + 1).padStart(2, "0")}</span>
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${last ? "bg-white/15" : "bg-[#E6EEFD]"}`}><Ico n={ICONS[i]} c={last ? "#fff" : "#0052C9"} s={17} /></span>
              </div>
              <p className={`relative mt-6 text-[11.5px] font-bold tracking-[0.16em] uppercase ${last ? "text-[#DCE7FD]" : "text-[#6B7690]"}`}>{s.name}</p>
              <h3 className="relative mt-1.5 font-display font-bold text-[18px] lg:text-[16.5px] leading-snug tracking-[-0.02em] [text-wrap:balance]">{s.title}</h3>
              <ul className={`relative mt-4 grid gap-2 text-[13.5px] lg:text-[13px] ${last ? "text-[#E9F0FF]" : "text-[#43506B]"}`}>
                {s.items.map((it) => (
                  <li key={it} className="flex gap-2 items-start">
                    <span className={`mt-[7px] w-1.5 h-1.5 flex-none ${last ? "bg-white/70" : "bg-[#0052C9]"}`} />{it}
                  </li>
                ))}
              </ul>
            </Motion.li>
          </React.Fragment>
        );
      })}
    </Motion.ol>
  </Band>
);

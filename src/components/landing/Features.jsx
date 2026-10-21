import React, { useEffect, useRef, useState } from "react";
import { Checker, Ico } from "./kit";
import { Band, SectionHead } from "./Band";
import { Barcode, EventTiles } from "./EventTiles";
import { FEATURES } from "./content";
import { brandLogoSrc } from "./BrandLogo";

/**
 * Features (dark band) as one big pass, styled like the entry pass in EventTiles.
 * Main part: logo + "FEATURE PASS", kicker, the active feature's name, three labelled fields and
 * an "In short" line with a barcode. Past the tear line, the blue stub lists every feature: click
 * one, or let it move on every 6.5 s while on screen and not hovered. On phones the stub sits on
 * top as a scrollable row. Copy in content.js (FEATURES).
 */
const NOTCH = "#071B43"; // band colour: the punched notches at the tear line
const STEP = 6500;
const pad = (n) => String(n).padStart(2, "0");

export const Features = () => {
  const [cur, setCur] = useState(0);
  const [hover, setHover] = useState(false);
  const [inView, setInView] = useState(false);
  const boxRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    if (boxRef.current) io.observe(boxRef.current);
    return () => io.disconnect();
  }, []);

  const auto = inView && !hover && !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  useEffect(() => {
    if (!auto) return undefined;
    const t = setTimeout(() => setCur((c) => (c + 1) % FEATURES.length), STEP);
    return () => clearTimeout(t);
  }, [auto, cur]);

  // phones: keep the active item centred in the sideways row. Scroll the row itself only:
  // scrollIntoView also scrolled the whole page down to here on load and on every rotation.
  useEffect(() => {
    const row = listRef.current, el = row?.children[cur];
    if (!el || window.innerWidth >= 1024) return;
    row.scrollTo({ left: el.offsetLeft - (row.clientWidth - el.clientWidth) / 2, behavior: "smooth" });
  }, [cur]);

  return (
    <Band id="features" dark>
      <SectionHead dark kicker="FEATURES" title="Everything an event needs, already connected." text="Ten modules in every Planyt event. Nothing to stitch together." />

      <div ref={boxRef} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        className="pl-reveal mt-10 flex flex-col-reverse lg:flex-row rounded-[24px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">

        {/* main part of the pass: the active feature */}
        <article className="relative flex-1 min-w-0 bg-white text-[#0B1530] rounded-b-[24px] lg:rounded-r-none lg:rounded-l-[24px] p-6 sm:p-9 flex flex-col">
          <div className="flex items-center gap-2">
            <img src={brandLogoSrc("horizontal", "light")} alt="Planyt" className="h-6 w-auto" />
            <span className="ml-auto text-[12px] font-bold tracking-[0.16em] text-[#0052C9]">FEATURE PASS</span>
          </div>

          {/* Every module sits in the same grid cell; only the current one shows. The card keeps the
              tallest module's height, so the page doesn't jump each time it rotates (layout shift). */}
          <div className="flex-1 grid">
            {FEATURES.map(([name, icon, line, fields], i) => {
              const on = i === cur;
              return (
                <div key={on ? `on${cur}` : i} aria-hidden={!on} className={`[grid-area:1/1] flex flex-col ${on ? "pl-fade" : "invisible"}`}>
                  <p className="mt-7 sm:mt-8 flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] text-[#6B7690]">
                    <span className="w-7 h-7 rounded-[9px] bg-[#E6EEFD] flex items-center justify-center"><Ico n={icon} c="#0052C9" s={15} /></span>
                    MODULE {pad(i + 1)} / {pad(FEATURES.length)} · INCLUDED
                  </p>
                  <h3 className="mt-3 font-display font-extrabold tracking-[-0.03em] leading-[1.05] text-[clamp(30px,3.6vw,46px)] [text-wrap:balance]">{name}</h3>

                  <dl className="mt-7 sm:mt-8 grid grid-cols-3 gap-4 max-w-[560px]">
                    {fields.map(([k, v]) => (
                      <div key={k}><dt className="text-[12px] text-[#6B7690]">{k}</dt><dd className="mt-0.5 text-[15px] sm:text-[17px] font-bold leading-tight">{v}</dd></div>
                    ))}
                  </dl>

                  <div className="mt-auto pt-8 flex items-end justify-between gap-6">
                    <div className="min-w-0"><p className="text-[12px] text-[#6B7690]">In short</p><p className="mt-0.5 text-[15px] sm:text-[16px] font-semibold leading-snug [text-wrap:pretty]">{line}</p></div>
                    {on ? <Barcode /> : <div className="hidden sm:block flex-none w-[166px] h-8" />}
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        {/* tear line with punched notches (vertical on desktop, horizontal on phones) */}
        <div aria-hidden="true" className="relative z-10 flex-none h-0 lg:h-auto lg:w-0">
          <span className="absolute -top-3 -left-3 w-6 h-6 rounded-full" style={{ background: NOTCH }} />
          <span className="absolute -top-3 -right-3 lg:right-auto lg:top-auto lg:-bottom-3 lg:-left-3 w-6 h-6 rounded-full" style={{ background: NOTCH }} />
          <span className="absolute left-5 right-5 top-0 border-t-2 lg:border-t-0 lg:left-0 lg:right-auto lg:top-5 lg:bottom-5 lg:border-l-2 border-dashed border-[#C9D6EE]" />
        </div>

        {/* stub: every feature */}
        <div className="relative lg:w-[290px] flex-none bg-[#0052C9] text-white rounded-t-[24px] lg:rounded-tl-none lg:rounded-r-[24px] p-4 sm:p-5 flex flex-col overflow-hidden">
          <div className="absolute top-0 right-0 pointer-events-none"><Checker cols={8} rows={5} size={12} colors={["#1565FF", "#2D74E0"]} corner="tr" /></div>
          <p className="relative text-center text-[12px] font-bold tracking-[0.16em] text-[#DCE7FD]">ALL FEATURES</p>
          <div ref={listRef} role="tablist" aria-label="Features"
            className="relative mt-3 flex lg:flex-col gap-0.5 overflow-x-auto lg:overflow-visible -mx-1 px-1 pb-1 [scrollbar-width:none]">
            {FEATURES.map(([n, ic], i) => {
              const on = i === cur;
              return (
                <button key={n} type="button" role="tab" aria-selected={on} onClick={() => setCur(i)}
                  className={`relative flex-none lg:w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-left text-[13.5px] font-semibold transition-colors overflow-hidden ${on ? "bg-white text-[#071B43]" : "text-[#DCE7FD] hover:bg-white/10"}`}>
                  <span className={`w-6 h-6 rounded-[8px] flex items-center justify-center flex-none ${on ? "bg-[#0052C9]" : "bg-white/15"}`}><Ico n={ic} c="#fff" s={13} /></span>
                  <span className="whitespace-nowrap lg:whitespace-normal lg:flex-1">{n}</span>
                  <span className={`hidden lg:inline text-xs tabular-nums ${on ? "text-[#0052C9]" : "text-[#A2C3FF]"}`}>{pad(i + 1)}</span>
                  {on && <span key={`${cur}${auto}`} aria-hidden="true" className={`absolute left-0 bottom-0 h-0.5 w-full bg-[#0052C9] origin-left ${auto ? "pl-run" : "scale-x-0"}`} style={{ "--t": `${STEP}ms` }} />}
                </button>
              );
            })}
          </div>
          <p className="relative hidden lg:block mt-auto pt-3 text-center text-[12px] font-semibold text-[#DCE7FD] tabular-nums">No. {pad(cur + 1)} of {pad(FEATURES.length)}</p>
        </div>
      </div>

      <EventTiles />
    </Band>
  );
};

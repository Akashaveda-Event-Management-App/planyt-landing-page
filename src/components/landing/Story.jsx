import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Checker, Ico } from "./kit";
import { MESS_TOOLS } from "./content";
import { brandLogoSrc } from "./BrandLogo";

/**
 * The story's opening (dark band, after the hero): "the mess" turning into "one system".
 * The section is tall and its stage sticks while you scroll: eight scattered tools, each with its pain,
 * fly into one Planyt card, and the headline changes from the problem to the fix. Phones get the same
 * motion, smaller. Reduced motion shows the finished state. Copy in content.js (MESS_TOOLS).
 */

// Where each tool card starts (scattered, % of the stage) and its tilt.
const SCATTER = [[8, 14, -8], [70, 8, 6], [40, 4, -3], [84, 46, 9], [4, 56, -5], [64, 78, -7], [22, 84, 5], [46, 52, 3]];
// Phones: a narrower spread, so the cards (≈ 45% of the screen wide) stay inside it.
const SCATTER_SM = [[28, 8, -8], [72, 18, 6], [30, 36, -3], [72, 46, 9], [28, 64, -5], [72, 74, -7], [30, 92, 5], [70, 100, 3]];
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (v) => Math.min(1, Math.max(0, v));

export const Problem = () => {
  const ref = useRef(null);
  const stageRef = useRef(null);
  const cardRef = useRef(null);
  const slotRefs = useRef([]);
  const [p, setP] = useState(0);
  const [slots, setSlots] = useState(null); // where each tool lands: centre of its square in the card, % of the stage
  useLayoutEffect(() => {
    const measure = () => {
      const st = stageRef.current, c = cardRef.current;
      if (!st || !c) return;
      // offsets ignore transforms: the card's box before its translate(-50%, -50%)
      const cx = c.offsetLeft - c.offsetWidth / 2, cy = c.offsetTop - c.offsetHeight / 2;
      setSlots(slotRefs.current.map((sq) => [((cx + sq.offsetLeft + sq.offsetWidth / 2) / st.offsetWidth) * 100, ((cy + sq.offsetTop + sq.offsetHeight / 2) / st.offsetHeight) * 100]));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setP(1); return undefined; }
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = ref.current.getBoundingClientRect();
        setP(clamp(-r.top / (r.height - window.innerHeight)));
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);

  const m = ease(clamp((p - 0.25) / 0.5)); // 0 = scattered, 1 = together
  const narrow = typeof window !== "undefined" && window.innerWidth < 640;
  const fixed = m > 0.55;
  return (
    <section id="why" ref={ref} data-dark="1" className="relative bg-[#071B43] text-white h-[260vh] scroll-mt-16">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute top-0 right-0 pointer-events-none"><Checker cols={10} rows={7} size={34} colors={["#14306E", "#0F2860", "#1A3B82"]} corner="tr" reach={0.85} /></div>
        <div className="relative h-full max-w-[1200px] mx-auto px-4 sm:px-8 pt-24 pb-10 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center content-start lg:content-center">
          {/* the words: problem, then the fix */}
          <div className="relative min-h-[150px] sm:min-h-[200px]">
            {[
              ["THE PROBLEM", "Eight tools. One event.", "Forms here, payments there, a spreadsheet in the middle. The same names typed again and again.", !fixed],
              ["THE FIX", "One login. One list of people.", "Planyt runs the whole event in one place. Change something once and it changes everywhere.", fixed],
            ].map(([k, t, line, show]) => (
              <div key={k} aria-hidden={!show} className={`absolute inset-x-0 top-0 transition-all duration-500 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
                <p className={`text-xs font-semibold tracking-[0.16em] ${k === "THE FIX" ? "text-[#7FD9A8]" : "text-[#FF9AA5]"}`}>{k}</p>
                <h2 className="mt-3 font-display font-bold leading-[1.06] tracking-[-0.035em] [text-wrap:balance]" style={{ fontSize: "clamp(32px,4.4vw,56px)" }}>{t}</h2>
                <p className="mt-4 text-[15.5px] sm:text-[17px] leading-relaxed text-[#AFBEDB] max-w-[460px]">{line}</p>
              </div>
            ))}
          </div>

          {/* the tools, flying together into one Planyt card */}
          <div ref={stageRef} className="relative w-full aspect-[4/3] sm:aspect-[16/11] max-h-[62vh] mx-auto">
            <div ref={cardRef} className="absolute left-1/2 top-1/2 w-[64%] sm:w-[58%] rounded-[22px] bg-white text-[#0B1530] p-4 sm:p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]"
              style={{ opacity: m, transform: `translate(-50%, -50%) scale(${0.85 + 0.15 * m})` }}>
              <div className="flex items-center gap-2">
                <img src={brandLogoSrc("horizontal", "light")} alt="Planyt" className="h-5 sm:h-6 w-auto" />
                <span className="ml-auto text-[10px] sm:text-[11px] font-bold tracking-[0.16em] text-[#0052C9]">ONE SYSTEM</span>
              </div>
              <div className="mt-4 sm:mt-5 grid grid-cols-4 gap-2 sm:gap-3">
                {MESS_TOOLS.map(([icon], i) => <span key={icon} ref={(el) => { slotRefs.current[i] = el; }} className="aspect-square rounded-xl sm:rounded-2xl bg-[#E6EEFD]" />)}
              </div>
              <p className="mt-4 text-[12px] sm:text-[13px] font-semibold text-[#43506B] flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#16A34A]" />One list of people, shared by every part</p>
            </div>
            {MESS_TOOLS.map(([icon, name, pain], i) => {
              const [sx, sy, rot] = (narrow ? SCATTER_SM : SCATTER)[i];
              const [ex, ey] = slots?.[i] || [50, 50];
              const x = sx + (ex - sx) * m, y = sy + (ey - sy) * m;
              return (
                <div key={name} className="absolute z-10" style={{ left: `${x}%`, top: `${y}%`, transform: `translate(-50%, -50%) rotate(${rot * (1 - m)}deg)` }}>
                  <div className="flex items-center gap-2 rounded-2xl bg-white text-[#0B1530] shadow-[0_18px_34px_-16px_rgba(0,0,0,0.6)] transition-[padding] duration-300"
                    style={{ padding: m > 0.9 ? 8 : "8px 12px 8px 8px" }}>
                    <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#0052C9] inline-flex items-center justify-center flex-none"><Ico n={icon} c="#fff" s={16} /></span>
                    <span className="overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-300" style={{ maxWidth: m > 0.9 ? 0 : 180, opacity: m > 0.9 ? 0 : 1 }}>
                      <span className="block text-[12px] sm:text-[13px] font-bold leading-tight">{name}</span>
                      <span className="block text-[11px] sm:text-[12px] font-semibold text-[#DC2626] leading-tight" style={{ opacity: 1 - m * 1.6 }}>{pain}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* scroll hint */}
        <div aria-hidden="true" className="absolute bottom-5 left-1/2 -translate-x-1/2 h-1 w-28 rounded-full bg-white/15 overflow-hidden">
          <span className="block h-full bg-[#7FA6FF]" style={{ width: `${p * 100}%` }} />
        </div>
      </div>
    </section>
  );
};

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Checker, CK, useTick } from "./kit";
import { renderDash, ROLES } from "./dashShell";
import { HOMES } from "./dashHomes";
import { ScreenFrame, frameSize } from "./ScreenFrame";
import { HeroIntro } from "./HeroIntro";

/**
 * Scroll story on a tall navy band with a sticky viewport: a full-screen intro, then a tablet rises
 * from below and powers on (0.01–0.2),
 * then shows each role's dashboard (0.2–0.97). How it works is its own section (HowItWorks.jsx).
 * Scroll position drives everything; chips jump to a point.
 */
const DR = ["attendee", "organizer", "volunteer", "reviewer", "sponsor"];
const seg = (x, a, b) => Math.max(0, Math.min(1, (x - a) / (b - a)));
const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

const DashScreen = ({ role }) => {
  const t = useTick(true, 1500);
  return renderDash(role, HOMES[role](t));
};

const Chips = ({ items }) => (
  <div className="mt-3 flex items-center gap-1 p-[5px] bg-white/[0.07] border border-white/10 rounded-xl max-w-full overflow-x-auto [scrollbar-width:none] pointer-events-auto">
    {items.map((c) => (
      <button key={c.label} type="button" onClick={c.pick} className={`shrink-0 text-[13px] font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${c.on ? "pl-ticket [--n:5px] bg-white text-[#071B43]" : "text-[#C9D6EE] hover:text-white"}`}>
        {c.dot && <span className="w-2 h-2 rounded-[3px]" style={{ background: c.dot }} />}{c.label}
      </button>
    ))}
  </div>
);

export const HeroLaptop = () => {
  const heroRef = useRef(null), frameRef = useRef(null), bootRef = useRef(null), screenRef = useRef(null), frameHRef = useRef(600);
  const lapBottomRef = useRef(32);
  const introRef = useRef(null), dashRef = useRef(null);
  // Fixed first render (server and client agree); real size is read after mount.
  const [vp, setVp] = useState({ w: 1280, h: 800 });
  const [st, setSt] = useState({ role: 0, phase: 0 });

  useEffect(() => {
    let raf = 0;
    const run = () => {
      const hero = heroRef.current, frame = frameRef.current;
      if (!hero || !frame) return;
      const vh = window.innerHeight, r = hero.getBoundingClientRect();
      const p = seg(-r.top / Math.max(1, r.height - vh), 0, 1);
      // Hero fills the screen first. Then the tablet rises from below the fold and grows into
      // place, the logo fades, and the picture opens from a line across the middle.
      const rise = ease(seg(p, 0.01, 0.13)), grow = ease(seg(p, 0.05, 0.16)), on = ease(seg(p, 0.13, 0.2));
      const k = 0.72 + 0.28 * grow, fh = frameHRef.current;
      const below = lapBottomRef.current + fh * k + 24;
      frame.style.transform = `translateY(${((1 - rise) * below).toFixed(1)}px) scale(${k.toFixed(4)})`;
      if (bootRef.current) bootRef.current.style.opacity = (1 - seg(p, 0.11, 0.15)).toFixed(3);
      if (screenRef.current) screenRef.current.style.clipPath = `inset(${((1 - on) * 50).toFixed(2)}% 0 ${((1 - on) * 50).toFixed(2)}% 0)`;
      const show = (el, v, dy = 16) => {
        if (!el) return;
        el.style.opacity = v.toFixed(3);
        el.style.transform = `translateY(${((1 - v) * dy).toFixed(1)}px)`;
        el.style.pointerEvents = v > 0.5 ? "auto" : "none";
        el.style.visibility = v < 0.01 ? "hidden" : "visible";
      };
      show(introRef.current, 1 - seg(p, 0.01, 0.09), -40);
      show(dashRef.current, seg(p, 0.14, 0.2));
      const next = { role: Math.min(4, Math.floor(seg(p, 0.2, 0.97) * 5)), phase: p < 0.17 ? 0 : 1 };
      setSt((o) => (o.role === next.role && o.phase === next.phase ? o : next));
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(run); };
    const onResize = () => { setVp({ w: window.innerWidth, h: window.innerHeight }); onScroll(); };
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  const jump = useCallback((frac) => {
    const hero = heroRef.current;
    if (!hero) return;
    const top = hero.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (hero.offsetHeight - window.innerHeight) * frac + 2, behavior: "smooth" });
  }, []);

  const wide = vp.w > 1040;
  // Open laptop gets ~80% of the width, capped by the height left under the one-line captions.
  const capTop = vp.w < 640 ? 210 : vp.h < 700 ? 160 : 184;
  const fitW = (vp.h - capTop - 48) / 0.66;
  const lapW = Math.round(Math.max(280, Math.min(vp.w * (vp.w < 640 ? 0.92 : 0.8), 1280, fitW)));
  const { h: frameH } = frameSize(lapW);
  const lapBottom = Math.round(Math.max(32, (vp.h - capTop - frameH) / 2));
  frameHRef.current = frameH;
  lapBottomRef.current = lapBottom;

  const roleChips = DR.map((k, i) => ({ label: ROLES[k].label, dot: ROLES[k].a, on: i === st.role, pick: () => jump(0.2 + (i + 0.5) * 0.154) }));

  return (
    <header id="top" data-dark="1" ref={heroRef} className="relative bg-[#071B43] text-white" style={{ height: wide ? "440vh" : "380vh" }}>
            <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(1000px 560px at 50% 82%,rgba(0,82,201,.5),transparent 70%)" }} />
        <div className="absolute top-0 right-0 pointer-events-none"><Checker {...CK.hero} corner="tr" /></div>
        <div className="absolute top-0 left-0 pointer-events-none -scale-x-100"><Checker {...CK.hero} corner="tr" /></div>

        {/* captions */}
        <div className="absolute inset-x-0 top-0 z-[4] px-6 flex justify-center pointer-events-none" style={{ paddingTop: "clamp(80px,10vh,96px)" }}>
          <div ref={introRef} className="absolute inset-x-0 top-0 h-screen px-6 pt-16 flex flex-col items-center justify-center text-center pointer-events-auto">
            <HeroIntro />
          </div>

          <div ref={dashRef} className="absolute inset-x-6 flex flex-col items-center text-center opacity-0 invisible">
            <h2 className="font-display font-extrabold leading-tight tracking-[-0.03em] text-[clamp(20px,2vw,28px)]"><span className="text-[#7FA6FF]">One platform, five workspaces.</span> A place for every role.</h2>
            <Chips items={roleChips} />
          </div>

        </div>

        <ScreenFrame w={lapW} bottom={lapBottom} frameRef={frameRef} bootRef={bootRef} screenRef={screenRef}>
          <DashScreen role={DR[st.role]} />
        </ScreenFrame>

        {/* progress rail */}
        <div aria-hidden="true" className="absolute right-5 top-1/2 -translate-y-1/2 z-[5] flex flex-col gap-1.5 pointer-events-none">
          {[0, 1].map((i) => <span key={i} className="w-1 rounded transition-all duration-[400ms]" style={{ height: i === st.phase ? 28 : 8, background: i === st.phase ? "#A2C3FF" : "rgba(255,255,255,.2)" }} />)}
        </div>
      </div>
    </header>
  );
};

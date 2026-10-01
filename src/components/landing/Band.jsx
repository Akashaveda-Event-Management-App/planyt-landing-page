import React from "react";
import { Checker, CK } from "./kit";

/**
 * Page rhythm for /landing: full-width bands that alternate dark (navy) and light, with the same
 * padding, width, heading and card style everywhere. Every band carries the pixel corner in its
 * own colours; `dark` bands also set `data-dark` (the nav reads it). Cards: 20px radius; white on light bands, white/4% on dark.
 */
export const THEME = {
  dark: { band: "bg-[#071B43] text-white", eyebrow: "text-[#7FA6FF]", title: "text-white", text: "text-[#AFBEDB]", card: "bg-white/[0.04] border border-white/10", line: "border-white/10" },
  light: { band: "bg-[#F7F8FB] text-[#0B1530]", eyebrow: "text-[#0052C9]", title: "text-[#0B1530]", text: "text-[#5B6680]", card: "bg-white border border-[#E4E8F0]", line: "border-[#EEF1F6]" },
};

export const Band = ({ id, dark = false, tight = false, children, onMouseEnter, onMouseLeave, innerRef }) => (
  <section id={id} ref={innerRef} data-dark={dark ? "1" : undefined} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
    className={`relative overflow-hidden scroll-mt-16 ${THEME[dark ? "dark" : "light"].band}`}>
    <div className="absolute top-0 right-0 pointer-events-none"><Checker {...CK[dark ? "hero" : "heroLight"]} corner="tr" /></div>
    <div className={`relative max-w-[1200px] mx-auto px-4 sm:px-8 ${tight ? "pt-10 sm:pt-12" : "pt-16 sm:pt-20"} pb-16 sm:pb-20`}>{children}</div>
  </section>
);

export const SectionHead = ({ dark = false, kicker, title, text }) => {
  const t = THEME[dark ? "dark" : "light"];
  return (
    <div className="pl-reveal grid gap-x-12 gap-y-4 items-end" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))" }}>
      <div>
        <div className={`text-xs font-semibold tracking-[0.16em] ${t.eyebrow}`}>{kicker}</div>
        <h2 className={`mt-3 font-display font-bold leading-[1.12] tracking-[-0.03em] [text-wrap:balance] ${t.title}`} style={{ fontSize: "clamp(28px,3.2vw,40px)" }}>{title}</h2>
      </div>
      {text && <p className={`text-base leading-[1.65] max-w-[440px] md:justify-self-end [text-wrap:pretty] ${t.text}`}>{text}</p>}
    </div>
  );
};

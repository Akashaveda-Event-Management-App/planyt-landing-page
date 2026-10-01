import React from "react";
import { brandLogoSrc } from "./BrandLogo";

/**
 * A straight, front-on tablet frame for the hero. No 3D: the parent lifts/scales it through
 * `frameRef`, fades the logo cover through `bootRef` and opens the picture through `screenRef`.
 * `children` render at 1280×800 and are scaled into the glass.
 */
export const frameSize = (w) => {
  const b = Math.max(8, Math.round(w * 0.018));
  const scrW = w - 2 * b, scrH = Math.round(scrW * 0.625);
  return { b, scrW, scrH, h: scrH + 2 * b };
};

export const ScreenFrame = ({ w, bottom, frameRef, bootRef, screenRef, children }) => {
  const { b, scrW, scrH } = frameSize(w);
  const r = Math.round(b * 2.2);
  return (
    <div aria-hidden="true" className="absolute inset-x-0 z-[3] flex justify-center pointer-events-none" style={{ bottom }}>
      <div ref={frameRef} className="relative will-change-transform" style={{ width: w, padding: b, borderRadius: r, transformOrigin: "50% 100%", background: "linear-gradient(180deg,#1c2029,#0b0d12)", boxShadow: "0 0 0 1.5px #3a404c, inset 0 0 0 1px rgba(255,255,255,.08), 0 50px 100px -30px rgba(0,0,0,.75), 0 0 120px -20px rgba(0,82,201,.45)" }}>
        <span className="absolute left-1/2 -translate-x-1/2 rounded-full" style={{ top: Math.round(b / 2 - 3), width: 6, height: 6, background: "radial-gradient(circle at 35% 35%,#3b4456,#11141a)" }} />
        <div className="relative overflow-hidden bg-[#071B43]" style={{ height: scrH, borderRadius: Math.max(4, Math.round(r - b)) }}>
          {/* off screen: logo on navy; the parent fades it out */}
          <div ref={bootRef} className="absolute inset-0 flex items-center justify-center">
            <img src={brandLogoSrc("symbol", "dark")} alt="" style={{ width: "8%", maxWidth: 64 }} />
          </div>
          {/* the picture opens from a line across the middle (parent sets clip-path) */}
          <div ref={screenRef} className="absolute inset-0 bg-[#f9fafc]" style={{ clipPath: "inset(50% 0 50% 0)" }}>
            <div style={{ width: 1280, height: 800, transform: `scale(${(scrW / 1280).toFixed(4)})`, transformOrigin: "0 0" }}>{children}</div>
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(118deg,rgba(255,255,255,.08) 0%,rgba(255,255,255,.02) 30%,transparent 46%)" }} />
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useRef } from "react";
import { BLUE, Pix, paintPix, still, watch } from "./pixels";

/**
 * The problem → fix (white ground). A tall section with a sticky stage: eight scattered tools, each
 * with its pain, orbit in around the Planyt mark as you scroll, turn into Planyt modules ("Synced")
 * and wire themselves to the middle; once all are connected, data pixels run along the wires.
 * Phones play it as the stage scrolls past; reduced motion shows the finished state.
 */
const TOOLS = [
  ["list", "Form builder", "Exports to CSV", "Registration", "Synced · one form"],
  ["card", "Payment links", "Matched by hand", "Payments", "Synced · auto-matched"],
  ["globe", "Website tool", "Copied by hand", "Event website", "Synced · live"],
  ["form", "Paper review", "Another login", "Call for papers", "Synced · same login"],
  ["qr", "Check-in app", "Re-imported list", "Check-in", "Synced · offline-ready"],
  ["cert", "Certificate tool", "Mail merge", "Certificates", "Synced · one click"],
  ["chat", "Chat groups", "Lost in threads", "Q&A & chat", "Synced · per session"],
  ["chart", "Spreadsheets", "Five versions", "Analytics", "Synced · always current"],
];
const SPOT = [[4, 4, -7], [58, 2, 5], [30, 22, -3], [74, 26, 8], [0, 52, -5], [52, 58, -8], [16, 82, 4], [68, 86, 3]];
const clamp = (v) => Math.min(1, Math.max(0, v));

export const Hub = () => {
  const secRef = useRef(null), hubRef = useRef(null), svgRef = useRef(null), coreRef = useRef(null), t1 = useRef(null), t2 = useRef(null), meter = useRef(null);
  const cards = useRef([]), lines = useRef([]), packets = useRef([]), ring = useRef(null);

  useEffect(() => {
    const hub = hubRef.current, reduce = still();
    let p = 0, ends = [], raf = 0, pk = false;
    const state = TOOLS.map(() => null);
    const at = (v) => {
      p = v;
      const W = hub.clientWidth, H = hub.clientHeight, cx = W / 2, cy = H / 2, rx = W * 0.4, ry = H * 0.38, e = v * v * (3 - 2 * v);
      const r = ring.current; r.setAttribute("cx", cx); r.setAttribute("cy", cy); r.setAttribute("rx", rx); r.setAttribute("ry", ry); r.style.opacity = String(clamp((v - 0.4) / 0.3));
      ends = [];
      cards.current.forEach((c, i) => {
        const [x, y, rot] = SPOT[i], cw = c.offsetWidth, ch = c.offsetHeight, sx = x / 100 * (W - cw), sy = y / 100 * (H - ch);
        const ang = (-90 + i * 45) * Math.PI / 180, tx = cx + rx * Math.cos(ang) - cw / 2, ty = cy + ry * Math.sin(ang) - ch / 2;
        const X = sx + (tx - sx) * e, Y = sy + (ty - sy) * e;
        c.style.transform = `translate(${X}px, ${Y}px) rotate(${rot * (1 - e)}deg)`;
        const on = v > 0.62;
        if (state[i] !== on) {
          state[i] = on; c.classList.toggle("on", on);
          c.querySelector("b").textContent = on ? TOOLS[i][3] : TOOLS[i][1];
          c.querySelector("small").textContent = on ? TOOLS[i][4] : TOOLS[i][2];
          paintPix(c.querySelector("canvas"), TOOLS[i][0], on ? "#FFFFFF" : BLUE);
        }
        const k = clamp((v - 0.6) / 0.25), ex = X + cw / 2, ey = Y + ch / 2;
        ends.push([ex, ey]);
        const l = lines.current[i];
        l.setAttribute("x1", cx); l.setAttribute("y1", cy); l.setAttribute("x2", cx + (ex - cx) * k); l.setAttribute("y2", cy + (ey - cy) * k); l.style.opacity = String(k);
      });
      const kc = clamp((v - 0.45) / 0.25);
      coreRef.current.style.opacity = String(kc); coreRef.current.style.transform = `scale(${0.7 + 0.3 * kc})`;
      t1.current.style.opacity = String(1 - clamp((v - 0.4) / 0.18)); t2.current.style.opacity = String(clamp((v - 0.55) / 0.18));
      meter.current.style.width = `${v * 100}%`;
    };
    const onScroll = () => {
      if (reduce) return at(1);
      if (window.matchMedia("(max-width: 900px)").matches) { const r = hub.getBoundingClientRect(); return at(clamp((window.innerHeight * 0.85 - r.top) / (r.height + window.innerHeight * 0.3))); }
      const r = secRef.current.getBoundingClientRect(); return at(clamp(-r.top / (r.height - window.innerHeight)));
    };
    // data packets run along the wires once everything is connected
    const tick = (t) => {
      if (!pk) return;
      const W = hub.clientWidth, H = hub.clientHeight;
      packets.current.forEach((r, i) => {
        if (p < 0.88 || !ends[i]) { r.style.opacity = "0"; return; }
        const ph = ((t / 1600) + i * 0.37) % 1, f = i % 2 ? ph : 1 - ph;
        r.setAttribute("x", W / 2 + (ends[i][0] - W / 2) * f - 4); r.setAttribute("y", H / 2 + (ends[i][1] - H / 2) * f - 4); r.style.opacity = String(Math.sin(ph * Math.PI));
      });
      raf = requestAnimationFrame(tick);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("resize", onScroll);
    const unwatch = watch(hub, (v) => { if (reduce) return; if (v && !pk) { pk = true; raf = requestAnimationFrame(tick); } else if (!v) { pk = false; cancelAnimationFrame(raf); } });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); unwatch(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="hubsec g-light g" id="why" ref={secRef}>
      <div className="hub-sticky">
        <div className="hub-copy">
          <div className="t t1" ref={t1}><span className="kick">The problem</span><h2>Eight tools.<br />One event.</h2><p>Forms here, payments there, a spreadsheet in the middle. The same names typed again and again.</p></div>
          <div className="t t2" ref={t2}><span className="kick">The fix</span><h2>Everything<br />wired to<br /><em>one list.</em></h2><p>Planyt sits in the middle. Change something once and every part of the event knows.</p></div>
          <div className="hub-meter" aria-hidden="true"><div className="bar"><i ref={meter} /></div><span><em>8 TOOLS</em><em>SCROLL</em><em>ONE LIST</em></span></div>
        </div>
        <div className="hub" ref={hubRef}>
          <svg ref={svgRef} aria-hidden="true">
            <ellipse ref={ring} fill="none" stroke="#D3DBE8" strokeDasharray="2 6" />
            {TOOLS.map((_, i) => <line key={i} ref={(el) => { lines.current[i] = el; }} stroke={BLUE} strokeWidth="1.5" strokeDasharray="3 5" style={{ opacity: 0 }} />)}
            {TOOLS.map((_, i) => <rect key={i} ref={(el) => { packets.current[i] = el; }} width="8" height="8" rx="2" fill={BLUE} style={{ opacity: 0 }} />)}
          </svg>
          <div className="core" ref={coreRef}><Pix icon="logo" color="#FFFFFF" /><b>One list</b><small>PEOPLE · PASSES · PAPERS</small></div>
          {TOOLS.map(([ic, name, pain], i) => (
            <div key={name} className="hcard tk" ref={(el) => { cards.current[i] = el; }}>
              <span className="ib"><Pix icon={ic} color={BLUE} /></span>
              <div><b>{name}</b><small>{pain}</small></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

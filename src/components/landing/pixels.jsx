import React, { useEffect, useRef } from "react";

/**
 * The landing page's pixel kit: 17×17 pixel icons, the Planyt mark (from the logo pack) as an
 * inline SVG and as a pixel bitmap, the particle field that rebuilds into a shape (hero, footer)
 * and the checker that fades from a card's corner. Canvases draw in effects only, so the server
 * render (planyt.in) stays plain markup.
 */

export const BLUE = "#1565FF", NAVY = "#071B43", SKY = "#8FB3FF", INK = "#0A1430";
export const still = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* The mark and the wordmark, traced 1:1 in public/planyt-logo-pack (horizontal, no tagline). */
export const MARK = "M80 203V123A107 107 0 0 1 187 16H271.5A107 107 0 0 1 378.5 123V208A107 107 0 0 1 271.5 315H192V259H271.5A51 51 0 0 0 322.5 208V123A51 51 0 0 0 271.5 72H187A51 51 0 0 0 136 123V203ZM24 203H80V259H24Z M80 259H136V315H80Z M136 315H192V371H136ZM192 128H252A15 15 0 0 1 267 143V189A15 15 0 0 1 252 204H192V143A15 15 0 0 1 207 128ZM204 142h12v12h-12z M240 142h12v12h-12z M216 154h24v12h-24z M204 166h12v12h-12z M240 166h12v12h-12z M216 178h36v14h-36z";
const WORD = "M529.63 214.53H507.12V268.05H470.80V118.95H529.63Q547.47 118.95 559.79 125.11Q572.11 131.27 578.27 142.10Q584.43 152.93 584.43 166.95Q584.43 179.91 578.48 190.63Q572.54 201.36 560.22 207.94Q547.90 214.53 529.63 214.53ZM547.47 166.95Q547.47 158.03 542.38 153.15Q537.28 148.26 526.87 148.26H507.12V185.64H526.87Q537.28 185.64 542.38 180.76Q547.47 175.87 547.47 166.95ZM673.64 240.01H721.21V268.05H637.32V118.95H673.64ZM865.43 241.71H809.78L800.86 268.05H762.84L816.79 118.95H858.84L912.79 268.05H874.35ZM856.08 213.68 837.60 159.09 819.34 213.68ZM1096.51 268.05H1060.19L999.45 176.08V268.05H963.13V118.95H999.45L1060.19 211.34V118.95H1096.51ZM1284.69 118.95 1233.08 218.77V268.05H1196.76V218.77L1145.15 118.95H1186.35L1215.24 181.39L1243.91 118.95ZM1440.59 118.95V148.05H1401.08V268.05H1364.76V148.05H1325.26V118.95Z";

/** The horizontal logo. tone "white" for navy grounds. */
export const Logo = ({ tone = "color", height = 26, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="24 16 1416.59 355" role="img" aria-label="Planyt" className={className} style={{ height, width: "auto", display: "block" }}>
    <path fill={tone === "white" ? "#FFFFFF" : "#0052C9"} fillRule="evenodd" d={MARK} />
    <path fill={tone === "white" ? "#FFFFFF" : "#111826"} d={WORD} />
  </svg>
);

/* 17×17 icons ("1" = lit). The mark is added at runtime from the real path. */
export const ICON = {
  check: [".................", ".................", ".................", "..............11.", ".............111.", "............111..", "...........111...", "..........111....", ".11......111.....", ".111....111......", "..111..111.......", "...111111........", "....1111.........", ".....11..........", ".................", ".................", "................."],
  qr: ["1111111.1.1111111", "1.....1..11.....1", "1.111.1.1.1.111.1", "1.111.1..11.111.1", "1.111.1.111.111.1", "1.....1.1.1.....1", "1111111.1.1111111", "........11.......", "11.1.111.1.11.1.1", ".1..11..111.1..11", "1.11.1.1.1.111.1.", "........1.1.1..1.", "1111111..11.1.11.", "1.....1.1..111..1", "1.111.1..1.1.1.11", "1.....1.11..1.1..", "1111111.1.111.1.1"],
  badge: [".......111.......", ".......1.1.......", "....111111111....", "...1.........1...", "...11111111111...", "...11111111111...", "...1.........1...", "...1...111...1...", "...1..11111..1...", "...1...111...1...", "...1.........1...", "...1.1111111.1...", "...1.........1...", "...1.11111...1...", "...1.........1...", "...11111111111...", "................."],
  ticket: [".................", ".................", "1111111111.111111", "1.........1.....1", "1.11111...1.111.1", "1.........1.1.1.1", ".1.1111...1.111..", "1.........1.....1", ".1.111....1.1.1..", "1.........1.....1", "1.11111...1.111.1", "1.........1.....1", "1111111111.111111", ".................", ".................", ".................", "................."],
  cert: ["11111111111111111", "1...............1", "1.1111111111111.1", "1.1...........1.1", "1.1..1111111..1.1", "1.1...........1.1", "1.1.111111111.1.1", "1.1...........1.1", "1.1..11111....1.1", "1.1.......111.1.1", "1.1......11111..1", "1.1.111..11111..1", "1.1.......111.1.1", "1.1......1...1..1", "1.1111111.....111", "1...............1", "11111111111111111"],
  globe: [".....1111111.....", "...11..1.1..11...", "..1...1...1...1..", ".1...1.....1...1.", ".1...1.....1...1.", "11111111111111111", "1...1.......1...1", "1...1.......1...1", "1...1.......1...1", "1...1.......1...1", "11111111111111111", ".1...1.....1...1.", ".1...1.....1...1.", "..1...1...1...1..", "...11..1.1..11...", ".....1111111.....", "................."],
  list: [".................", "1.1111111111111..", ".................", "1.1111111111.....", ".................", "1.11111111111111.", ".................", "1.111111111......", ".................", "1.1111111111111..", ".................", "1.11111111.......", ".................", "1.111111111111...", ".................", ".................", "................."],
  card: [".................", "11111111111111111", "1...............1", "1.1111111.......1", "1...............1", "1.1111..1111....1", "1...............1", "11111111111111111", "1...............1", "1.111.111.111...1", "1...............1", "11111111111111111", ".................", ".................", ".................", ".................", "................."],
  chart: [".................", "1................", "1.............11.", "1............1.1.", "1...........1....", "1......11..1.....", "1.....1..11......", "1....1...........", "1...1............", "1..1.............", "1.1..............", "11...............", "1................", "11111111111111111", ".................", ".................", "................."],
  chat: [".................", "..1111111111111..", ".1.............1.", ".1.111111111...1.", ".1.............1.", ".1.1111111.....1.", ".1.............1.", "..1111111111111..", "...11............", "...1.............", ".................", ".................", ".................", ".................", ".................", ".................", "................."],
  people: [".................", "...111.....111...", "..11111...11111..", "..11111...11111..", "...111.....111...", ".................", ".1111111.1111111.", ".1111111.1111111.", ".1111111.1111111.", ".................", ".................", ".................", ".................", ".................", ".................", ".................", "................."],
  shield: ["......11111......", "...111.....111...", "..1...........1..", "..1...........1..", "..1......1....1..", "..1.....11....1..", "..1.1..11.....1..", "..1..111......1..", "..1...1.......1..", "...1.........1...", "....1.......1....", ".....11...11.....", ".......111.......", ".................", ".................", ".................", "................."],
  form: ["11111111111111...", "1............11..", "1.1111111.....11.", "1...............1", "1.11111111111...1", "1...............1", "1.111111111111..1", "1...............1", "1.111.......11..1", "1..........1..1.1", "1.11111.....11..1", "1...............1", "11111111111111111", ".................", ".................", ".................", "................."],
  store: [".................", "11111111111111111", "1.1.1.1.1.1.1.1.1", "11111111111111111", "1...............1", "1..111.....111..1", "1..1.1.....1.1..1", "1..111.....111..1", "1...............1", "1.......111.....1", "1.......1.1.....1", "11111111111111111", ".................", ".................", ".................", ".................", "................."],
  home: [".................", "........1........", ".......111.......", "......11.11......", ".....11...11.....", "....11.....11....", "...11.......11...", "..111111111111...", "...1.........1...", "...1..111....1...", "...1..1.1....1...", "...1..1.1....1...", "...11111111111...", ".................", ".................", ".................", "................."],
  cal: [".................", "..1.........1....", "11111111111111111", "1...............1", "11111111111111111", "1...............1", "1.11.11.11.11...1", "1...............1", "1.11.11.11.11...1", "1...............1", "1.11.11.........1", "1...............1", "11111111111111111", ".................", ".................", ".................", "................."],
  lock: [".................", "......11111......", ".....1.....1.....", ".....1.....1.....", ".....1.....1.....", "...11111111111...", "...1.........1...", "...1....1....1...", "...1...111...1...", "...1....1....1...", "...1.........1...", "...11111111111...", ".................", ".................", ".................", ".................", "................."],
};

/** The mark rasterised from its real path into an n×n grid (client only). */
const markBitmap = (n) => {
  const c = document.createElement("canvas"); c.width = c.height = n * 4;
  const x = c.getContext("2d"), s = (n * 4) / 360;
  x.scale(s, s); x.translate(-21, -14); x.fill(new Path2D(MARK), "evenodd");
  const d = x.getImageData(0, 0, n * 4, n * 4).data, rows = [];
  for (let r = 0; r < n; r++) {
    let row = "";
    for (let k = 0; k < n; k++) {
      let a = 0;
      for (let yy = 0; yy < 4; yy++) for (let xx = 0; xx < 4; xx++) a += d[(((r * 4 + yy) * n * 4) + (k * 4 + xx)) * 4 + 3];
      row += a / 16 > 110 ? "1" : ".";
    }
    rows.push(row);
  }
  return rows;
};
export const rows = (key) => {
  if (key === "logo") ICON.logo = ICON.logo || markBitmap(19);
  return ICON[key] || ICON.list;
};

/** Paints a pixel icon onto a canvas (one canvas pixel per icon pixel; CSS scales it up). */
export const paintPix = (canvas, key, color) => {
  const r = rows(key), n = r.length;
  canvas.width = n; canvas.height = n;
  const x = canvas.getContext("2d"); x.clearRect(0, 0, n, n); x.fillStyle = color;
  r.forEach((row, y) => [...row].forEach((ch, k) => { if (ch === "1") x.fillRect(k, y, 1, 1); }));
};

/** <Pix icon="qr" color="#1565FF" /> */
export const Pix = ({ icon, color = INK, className = "", style }) => {
  const ref = useRef(null);
  useEffect(() => { if (ref.current) paintPix(ref.current, icon, color); }, [icon, color]);
  return <canvas ref={ref} aria-hidden="true" className={className} style={{ imageRendering: "pixelated", ...style }} />;
};

/** A checker fading from the parent's top-right corner; reshuffles while the parent is hovered. */
export const PixCorner = ({ color = BLUE, strength = 1 }) => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return undefined;
    const N = 8; c.width = c.height = N; const x = c.getContext("2d");
    const paint = (seed) => {
      x.clearRect(0, 0, N, N); let s = seed;
      for (let r = 0; r < N; r++) for (let k = 0; k < N; k++) {
        s = (s * 9301 + 49297) % 233280;
        const d = Math.hypot(N - 1 - k, r) / (N * 1.05), p = (1 - d) * 0.9;
        if (s / 233280 < p * p) { x.globalAlpha = Math.min(1, (0.25 + (1 - d) * 0.75) * strength); x.fillStyle = color; x.fillRect(k, r, 1, 1); }
      }
    };
    let seed = (Math.random() * 1e5) | 0, t;
    paint(seed);
    const host = c.parentElement;
    if (still() || !host) return undefined;
    const on = () => { t = setInterval(() => paint(++seed * 7), 160); };
    const off = () => clearInterval(t);
    host.addEventListener("pointerenter", on); host.addEventListener("pointerleave", off);
    return () => { off(); host.removeEventListener("pointerenter", on); host.removeEventListener("pointerleave", off); };
  }, [color, strength]);
  return <canvas ref={ref} className="pxc" aria-hidden="true" />;
};

/** Runs `cb(visible)` as the element enters and leaves the screen. */
export const watch = (el, cb, margin = "0px") => {
  if (!el || !("IntersectionObserver" in window)) { cb(true); return () => {}; }
  const io = new IntersectionObserver((es) => es.forEach((e) => cb(e.isIntersecting)), { rootMargin: margin });
  io.observe(el); return () => io.disconnect();
};

/**
 * Particles that settle into a pixel shape and scatter from the pointer. Returns a controller:
 * set(shape), busy (pointer over it), stop(). Animates only while on screen.
 */
export const startField = (cv, o) => {
  const cx = cv.getContext("2d"), reduce = still();
  let W = 0, H = 0, cell = 0, ox = 0, oy = 0, parts = [], mouse = { x: -1e4, y: -1e4 }, run = false, shape = o.shape, frame = 0, raf = 0;
  const layout = () => { const N = rows(shape).length; cell = Math.max(7, Math.floor(Math.min(W, H) * o.scale / N)); ox = Math.round((W - cell * N) / 2); oy = Math.round((H - cell * N) / 2); };
  const size = () => { const r = cv.getBoundingClientRect(), d = window.devicePixelRatio || 1; W = r.width; H = r.height; cv.width = W * d; cv.height = H * d; cx.setTransform(d, 0, 0, d, 0, 0); layout(); };
  const build = () => {
    layout();
    const pts = []; rows(shape).forEach((row, r) => [...row].forEach((ch, c) => { if (ch === "1") pts.push([c, r]); }));
    while (parts.length < o.count) parts.push({ x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0, tx: 0, ty: 0, on: false, a: 0, k: Math.random() });
    let s = 11;
    parts.forEach((p, i) => {
      if (i < pts.length) { p.tx = ox + pts[i][0] * cell; p.ty = oy + pts[i][1] * cell; p.on = true; return; }
      s = (s * 9301 + 49297) % 233280; const a = s / 233280; s = (s * 9301 + 49297) % 233280;
      p.tx = ox + Math.round((a * W - ox) / cell) * cell; p.ty = oy + Math.round((s / 233280 * H - oy) / cell) * cell; p.on = false;
    });
  };
  const draw = () => {
    cx.clearRect(0, 0, W, H); frame++;
    if (o.cross) { // crosshair and circle through the mark, like a print proof
      cx.strokeStyle = o.cross; cx.lineWidth = 1; cx.setLineDash([4, 6]); cx.beginPath();
      cx.moveTo(0, H / 2 + 0.5); cx.lineTo(W, H / 2 + 0.5); cx.moveTo(W / 2 + 0.5, 0); cx.lineTo(W / 2 + 0.5, H); cx.stroke(); cx.setLineDash([]);
      cx.beginPath(); cx.arc(W / 2, H / 2, Math.min(W, H) * 0.42, 0, Math.PI * 2); cx.stroke();
    }
    for (const p of parts) {
      const dx = p.x + cell / 2 - mouse.x, dy = p.y + cell / 2 - mouse.y, d2 = dx * dx + dy * dy, R = 110 * 110;
      if (d2 < R) { const f = (R - d2) / R * 3.2, d = Math.sqrt(d2) + 0.01; p.vx += dx / d * f; p.vy += dy / d * f; }
      p.vx += (p.tx - p.x) * 0.065; p.vy += (p.ty - p.y) * 0.065; p.vx *= 0.76; p.vy *= 0.76; p.x += p.vx; p.y += p.vy;
      p.a += ((p.on ? 1 : o.idle + 0.07 * Math.sin(frame / 30 + p.k * 6)) - p.a) * 0.08;
      const moving = Math.abs(p.vx) + Math.abs(p.vy) > 1.2;
      cx.globalAlpha = Math.max(0, p.a); cx.fillStyle = p.on ? (moving ? o.hot : o.on) : o.off;
      const px = Math.round(p.x) + 1, py = Math.round(p.y) + 1, sz = cell - 2;
      cx.beginPath(); if (cx.roundRect) cx.roundRect(px, py, sz, sz, Math.max(1, cell * 0.22)); else cx.rect(px, py, sz, sz); cx.fill();
    }
    cx.globalAlpha = 1;
  };
  const loop = () => { if (!run) return; draw(); raf = requestAnimationFrame(loop); };
  const settle = () => { parts.forEach((p) => { p.x = p.tx; p.y = p.ty; p.a = p.on ? 1 : o.idle; }); draw(); };
  const onMove = (e) => { const r = cv.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; };
  const onLeave = () => { mouse = { x: -1e4, y: -1e4 }; };
  const onResize = () => { size(); build(); if (reduce) settle(); };
  // The canvas can change size without the window resizing (its section stretching as fonts load).
  const ro = "ResizeObserver" in window ? new ResizeObserver(onResize) : null;
  cv.addEventListener("pointermove", onMove); cv.addEventListener("pointerleave", onLeave);
  if (ro) ro.observe(cv); else window.addEventListener("resize", onResize);
  size(); build();
  const sp = o.spread || 60; // how far the pixels start from their places
  if (reduce) settle(); else { parts.forEach((p) => { p.x = p.tx + (Math.random() - 0.5) * sp; p.y = p.ty + (Math.random() - 0.5) * sp; }); draw(); }
  const unwatch = watch(cv, (v) => { if (reduce) return; if (v && !run) { run = true; loop(); } else if (!v) { run = false; cancelAnimationFrame(raf); } });
  return {
    set(k) { shape = k; build(); if (reduce) settle(); },
    get busy() { return mouse.x > -1e4; },
    stop() { run = false; cancelAnimationFrame(raf); unwatch(); cv.removeEventListener("pointermove", onMove); cv.removeEventListener("pointerleave", onLeave); ro?.disconnect(); window.removeEventListener("resize", onResize); },
  };
};

/** Scales a fixed-size picture (a product window) to the width of its wrapper. */
export const useFit = (w, h) => {
  const ref = useRef(null);
  useEffect(() => {
    const wrap = ref.current; if (!wrap) return undefined;
    const go = () => { const s = wrap.clientWidth / w; wrap.firstElementChild.style.transform = `scale(${s})`; wrap.style.height = `${h * s}px`; };
    go();
    const ro = new ResizeObserver(go); ro.observe(wrap);
    return () => ro.disconnect();
  }, [w, h]);
  return ref;
};

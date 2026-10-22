import React, { useEffect, useRef, useState } from "react";
import { Checker, Ico } from "./kit";
import { Band } from "./Band";
import { FEATURES, FEATURE_STAGE } from "./content";
import { brandLogoSrc } from "./BrandLogo";

/**
 * The story's chapters (Before / On the day / After), each a dark band with one big pass, styled like
 * an entry pass. Main part: logo + "FEATURE PASS", the active feature's name and one
 * line, then a staged screenshot of the real app (public/images/landing/features/<key>.webp, demo
 * data). Past the tear line, the blue stub lists the chapter's features: click one, or let it move on
 * every 6.5 s while on screen and not hovered. On phones the stub sits on top as a scrollable row.
 * Copy in content.js (FEATURES, FEATURE_STAGE).
 */
const NOTCH = "#071B43"; // band colour: the punched notches at the tear line
const STEP = 6500;
const pad = (n) => String(n).padStart(2, "0");

/**
 * The feature's screenshot, staged: the whole screen faded behind, the part that matters zoomed in
 * front (slightly tilted, settling as it arrives) and three callouts popping in around it.
 * Crops and callouts in content.js (FEATURE_STAGE).
 */
const STAGE_CSS = `
@keyframes pl-lens { from { opacity: 0; transform: translate(-50%, -46%) perspective(1600px) rotateX(10deg) rotateY(calc(var(--ry) * 2.4)) scale(0.92); } to { opacity: 1; transform: translate(-50%, -50%) perspective(1600px) rotateX(3deg) rotateY(var(--ry)); } }
@keyframes pl-pin { from { opacity: 0; transform: translateY(10px) scale(0.9); } to { opacity: 1; transform: none; } }
.pl-lens { transform: translate(-50%, -50%) perspective(1600px) rotateX(3deg) rotateY(var(--ry, -5deg)); transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1); }
.pl-lens.in { animation: pl-lens 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
.pl-stage:hover .pl-lens { transform: translate(-50%, -50%) perspective(1600px) rotateX(0deg) rotateY(0deg) scale(1.02); }
.pl-pin { animation: pl-pin 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
@media (prefers-reduced-motion: reduce) { .pl-lens.in, .pl-pin { animation: none; } .pl-lens, .pl-stage:hover .pl-lens { transition: none; } }
`;
// In the stage's top and bottom margins, so the callouts sit on the frame's edge, not over its content.
const PIN_SPOTS = [
  { left: "3%", top: "2.5%" },
  { right: "3%", bottom: "2.5%" },
  { left: "3%", bottom: "2.5%" },
];

/** One zoomed part of a screenshot: `crop` is [x, y, w, h] as fractions of the 1440×900 shot. */
const lensStyle = (src, crop, show, maxW, maxH) => {
  const [x, y, w, h] = crop;
  const ar = (w * 1440) / (h * 900); // the crop's shape
  const wide = ar > (1.6 * maxW) / maxH; // the stage is 16:10
  return {
    aspectRatio: String(ar),
    ...(wide ? { width: `${maxW * 100}%` } : { height: `${maxH * 100}%` }),
    backgroundImage: show ? `url(${src})` : "none",
    backgroundSize: `${100 / w}% ${100 / h}%`,
    backgroundPosition: `${w < 1 ? (x / (1 - w)) * 100 : 0}% ${h < 1 ? (y / (1 - h)) * 100 : 0}%`,
  };
};
const shotSrc = (shot) => `/images/landing/features/${shot}.webp`;

const Stage = ({ shot, name, on, near }) => {
  const st = FEATURE_STAGE[shot] || { crop: [0, 0, 1, 1], points: [] };
  // One close-up in the middle, two side by side (st.split) turned slightly towards each other,
  // or two wide strips stacked (st.split + st.stack).
  const parts = st.split || [{ shot, crop: st.crop }];
  const two = parts.length > 1;
  const show = on || near;
  return (
    <div className="pl-stage relative mt-5 rounded-[18px] overflow-hidden aspect-[16/10] bg-[#0B1530]" role={on ? "img" : undefined} aria-label={on ? `${name} in Planyt` : undefined}>
      {show && <img src={shotSrc(parts[0].shot)} alt="" aria-hidden="true" loading={on ? "eager" : "lazy"} decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-25 scale-110 blur-[2px]" />}
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(21,101,255,0.35),transparent_65%)]" />
      <div aria-hidden="true" className="absolute top-0 right-0 pointer-events-none opacity-60"><Checker cols={8} rows={5} size={14} colors={["#14306E", "#1A3B82"]} corner="tr" /></div>
      {parts.map((pt, k) => (
        <div key={k} className={`pl-lens absolute top-1/2 rounded-[14px] bg-white bg-no-repeat ring-1 ring-white/20 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.75)] ${on ? "in" : ""}`}
          style={{ ...(st.stack
            // wide strips, one above the other
            ? { ...lensStyle(shotSrc(pt.shot), pt.crop, show, 0.84, 0.35), left: "50%", top: k ? "71%" : "31%", "--ry": k ? "3deg" : "-3deg" }
            : { ...lensStyle(shotSrc(pt.shot), pt.crop, show, two ? 0.45 : 0.84, 0.76), left: two ? (k ? "74.5%" : "25.5%") : "50%", "--ry": two ? (k ? "-6deg" : "6deg") : "-5deg" }),
            animationDelay: `${k * 0.12}s` }}>
          {pt.label && on && <span className="pl-pin absolute -top-3 left-3 rounded-full bg-[#0052C9] text-white text-[11.5px] font-bold px-2.5 py-1 shadow-md" style={{ animationDelay: `${0.4 + k * 0.12}s` }}>{pt.label}</span>}
        </div>
      ))}
      {on && st.points.map((p, k) => (
        <span key={p} className="pl-pin absolute z-10 inline-flex items-center gap-2 rounded-full bg-white/95 pl-1.5 pr-3.5 py-1.5 text-[12.5px] sm:text-[13.5px] font-semibold text-[#0B1530] shadow-[0_14px_30px_-12px_rgba(0,0,0,0.6)]"
          style={{ ...PIN_SPOTS[k], animationDelay: `${0.55 + k * 0.15}s` }}>
          <span className="w-6 h-6 rounded-full bg-[#0052C9] text-white text-[11px] font-bold inline-flex items-center justify-center">{k + 1}</span>{p}
        </span>
      ))}
    </div>
  );
};

/** The feature pass for one chapter: `items` are rows of FEATURES ([name, icon, line, shot]). */
export const FeaturePass = ({ items, label }) => {
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
    const t = setTimeout(() => setCur((c) => (c + 1) % items.length), STEP);
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
    <>
      <style>{STAGE_CSS}</style>
      <div ref={boxRef} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        className="pl-reveal mt-10 flex flex-col-reverse lg:flex-row rounded-[24px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">

        {/* main part of the pass: the active feature */}
        <article className="relative flex-1 min-w-0 bg-white text-[#0B1530] rounded-b-[24px] lg:rounded-r-none lg:rounded-l-[24px] p-6 sm:p-9 flex flex-col">
          <div className="flex items-center gap-2">
            <img src={brandLogoSrc("horizontal", "light")} alt="Planyt" className="h-6 w-auto" />
            <span className="ml-auto text-[12px] font-bold tracking-[0.16em] text-[#0052C9]">FEATURE PASS</span>
          </div>

          {/* Every module sits in the same grid cell; only the current one shows, so the card keeps one
              height and the page doesn't jump when it rotates (layout shift). */}
          <div className="flex-1 grid">
            {items.map(([name, icon, line, shot], i) => {
              const on = i === cur;
              return (
                <div key={on ? `on${cur}` : i} aria-hidden={!on} className={`[grid-area:1/1] flex flex-col ${on ? "pl-fade" : "invisible"}`}>
                  <div className="mt-6 flex flex-wrap items-end gap-x-6 gap-y-2">
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] text-[#6B7690]">
                        <span className="w-7 h-7 rounded-[9px] bg-[#E6EEFD] flex items-center justify-center"><Ico n={icon} c="#0052C9" s={15} /></span>
                        MODULE {pad(i + 1)} / {pad(items.length)}
                      </p>
                      <h3 className="mt-2.5 font-display font-extrabold tracking-[-0.03em] leading-[1.05] text-[clamp(26px,3vw,38px)] [text-wrap:balance]">{name}</h3>
                    </div>
                    <p className="text-[15px] sm:text-[16px] text-[#43506B] max-w-[340px] [text-wrap:pretty]">{line}</p>
                  </div>
                  <Stage shot={shot} name={name} on={on} near={Math.abs(i - cur) === 1} />
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
          <p className="relative text-center text-[12px] font-bold tracking-[0.16em] text-[#DCE7FD]">{label || "IN THIS CHAPTER"}</p>
          <div ref={listRef} role="tablist" aria-label="Features"
            className="relative mt-3 flex lg:flex-col gap-0.5 overflow-x-auto lg:overflow-visible -mx-1 px-1 pb-1 [scrollbar-width:none]">
            {items.map(([n, ic], i) => {
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
          <p className="relative hidden lg:block mt-auto pt-3 text-center text-[12px] font-semibold text-[#DCE7FD] tabular-nums">No. {pad(cur + 1)} of {pad(items.length)}</p>
        </div>
      </div>

    </>
  );
};

/**
 * One chapter of the story (dark band): a big chapter number and line, then that chapter's pass.
 * `keys` pick rows of FEATURES by their screenshot key; `children` go under the pass.
 */
export const Chapter = ({ id, num, kicker, title, text, keys, children }) => {
  const items = keys.map((k) => FEATURES.find((f) => f[3] === k)).filter(Boolean);
  return (
    <Band id={id} dark>
      <div className="pl-reveal flex items-end gap-5 sm:gap-8">
        <span aria-hidden="true" className="font-display font-extrabold leading-[0.8] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_rgba(127,166,255,0.55)] text-[72px] sm:text-[112px]">{num}</span>
        <div className="pb-1 min-w-0">
          <p className="text-xs font-semibold tracking-[0.16em] text-[#7FA6FF]">{kicker}</p>
          <h2 className="mt-2 font-display font-bold leading-[1.1] tracking-[-0.03em] text-white [text-wrap:balance]" style={{ fontSize: "clamp(28px,3.2vw,40px)" }}>{title}</h2>
          {text && <p className="mt-2 text-[15.5px] text-[#AFBEDB] max-w-[560px]">{text}</p>}
        </div>
      </div>
      <FeaturePass items={items} />
      {children}
    </Band>
  );
};

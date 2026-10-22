import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Ico, TicketCta } from "./kit";
import { Band, SectionHead } from "./Band";
import { WEBSITE_STEPS, WEBSITE_LOOKS } from "./content";

/**
 * Website spotlight (dark band, in the "Before the event" chapter): four steps scroll past a template
 * that stays in place; the step in view picks the template. Each template is a full 16:9 home page
 * (nav, hero, highlights) drawn at 1280×720 and scaled to fit. Copy and template colours in
 * content.js (WEBSITE_STEPS, WEBSITE_LOOKS).
 */

const FONTS = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Bricolage+Grotesque:wght@500;800&family=Unbounded:wght@500;700&family=Archivo:wght@500;800&display=swap";
const SWAP_CSS = `
@keyframes pl-site-in { from { clip-path: inset(100% 0 0 0); } to { clip-path: inset(0 0 0 0); } }
@keyframes pl-pop-in { from { opacity: 0; transform: translateY(16px) scale(0.96); } to { opacity: 1; transform: none; } }
@keyframes pl-live { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
.pl-pop { animation: pl-pop-in 0.55s cubic-bezier(0.2, 0.7, 0.2, 1) 0.9s both; }
.pl-live { animation: pl-live 1.6s ease-in-out infinite; }
@keyframes pl-site-rise { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: none; } }
.pl-site-in { animation: pl-site-in 0.8s cubic-bezier(0.7, 0, 0.2, 1) both; }
.pl-site-in .pl-r { animation: pl-site-rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
@media (prefers-reduced-motion: reduce) { .pl-site-in, .pl-site-in .pl-r, .pl-pop, .pl-live { animation: none; } }
`;
const rise = (i, style = {}) => ({ style: { animationDelay: `${0.3 + i * 0.08}s`, ...style } });

/** The right-hand side of each hero, in the template's own idiom. */
const Visual = ({ look }) => {
  const { fg, muted, accent, accent2, onAccent, card, line, square, offset } = look;
  const box = { background: card, border: `1px solid ${line}`, borderRadius: square ? 4 : 24, boxShadow: offset ? `8px 8px 0 ${fg}` : "none" };
  if (look.visual === "countdown") return (
    <div className="p-8" style={box}>
      <div className="text-[15px] font-semibold" style={{ color: muted }}>Early bird closes in</div>
      <div className="mt-5 grid grid-cols-4 gap-3">
        {[["12", "days"], ["08", "hrs"], ["41", "min"], ["09", "sec"]].map(([v, k]) => (
          <div key={k} className="rounded-2xl py-5 text-center" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${line}` }}>
            <div className="text-[46px] font-bold leading-none" style={{ color: accent }}>{v}</div>
            <div className="mt-2 text-[13px] uppercase tracking-[0.14em]" style={{ color: muted }}>{k}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-3 text-[15px]" style={{ color: muted }}><span className="w-2.5 h-2.5 rounded-full" style={{ background: accent2 }} />Stage 1 · Keynote: shipping AI to production</div>
    </div>
  );
  if (look.visual === "lineup") return (
    <div className="grid grid-cols-2 gap-4">
      {[["Main stage", "The Local Train", accent, onAccent], ["Food court", "40 stalls", accent2, "#1A1423"], ["Theatre", "Midnight's Children", card, fg], ["Craft lane", "Block printing", card, fg]].map(([k, v, bg, c], i) => (
        <div key={k} className="p-6 flex flex-col justify-end h-[170px]" style={{ ...box, background: bg, color: c, transform: `rotate(${[-2, 1.5, 1, -1.5][i]}deg)` }}>
          <div className="text-[13px] font-bold uppercase tracking-[0.12em] opacity-75">{k}</div>
          <div className="mt-1 text-[26px] font-extrabold leading-tight">{v}</div>
        </div>
      ))}
    </div>
  );
  if (look.visual === "terminal") return (
    <div className="overflow-hidden" style={box}>
      <div className="flex gap-2 px-5 py-4" style={{ borderBottom: `1px solid ${line}` }}>{[accent2, "#FFB000", "#FF5C8A"].map((c) => <span key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />)}</div>
      <pre className="m-0 p-6 text-[17px] leading-[1.75] whitespace-pre-wrap" style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", color: muted }}>
        <span style={{ color: accent2 }}>$</span> build36 register --team rocket{"\n"}
        <span style={{ color: fg }}>✓ Team created · 4 members</span>{"\n"}
        <span style={{ color: accent2 }}>$</span> build36 problems --track fintech{"\n"}
        <span style={{ color: fg }}>→ 12 problem statements</span>{"\n"}
        <span style={{ color: accent }}>Hacking starts in 3d 04h ▍</span>
      </pre>
    </div>
  );
  return (
    <div className="grid grid-cols-5 gap-2.5">
      {["A", "B", "C", "D", "E"].map((h, i) => (
        <div key={h} className="flex flex-col justify-between p-4 h-[290px]" style={{ ...box, background: i === 2 ? accent : card, color: i === 2 ? onAccent : fg }}>
          <div className="text-[13px] font-bold uppercase tracking-[0.1em] opacity-70">Hall</div>
          <div className="text-[64px] font-extrabold leading-none">{h}</div>
          <div className="text-[13px] font-semibold">{["Machines", "Automation", "Materials", "Electronics", "Logistics"][i]}</div>
        </div>
      ))}
    </div>
  );
};

/** Step 2: the title as the editor shows it while you change it. */
const EditBox = () => (
  <div className="pl-pop pointer-events-none absolute -inset-3 rounded-lg border-2 border-dashed border-[#1565FF]">
    <div className="absolute -top-14 left-0 flex items-center gap-1 h-11 px-2 rounded-xl bg-[#0B1530] text-white text-[15px] font-semibold shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)]" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      {["Aa", "B", "I", "Link"].map((t) => <span key={t} className={`px-3 py-1.5 rounded-lg ${t === "B" ? "bg-white/15" : ""}`}>{t}</span>)}
      <span className="w-px h-5 bg-white/20 mx-1" /><span className="w-5 h-5 rounded-full bg-[#1565FF] ring-2 ring-white/40 mx-1.5" />
    </div>
    <svg width="34" height="34" viewBox="0 0 24 24" className="absolute -right-6 -bottom-7 drop-shadow"><path d="M4 2l16 9-7 2-3 7z" fill="#0B1530" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  </div>
);

/** Steps 1, 3 and 4: a notice over the page, the way the builder reports it. */
const Toast = ({ tone, icon, title, text }) => (
  <div className="pl-pop absolute right-10 bottom-[118px] z-10 flex items-center gap-4 pl-4 pr-6 py-4 rounded-2xl bg-white text-[#0B1530] shadow-[0_24px_50px_-16px_rgba(0,0,0,0.45)] ring-1 ring-black/5" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
    <span className="w-12 h-12 rounded-xl inline-flex items-center justify-center" style={{ background: `${tone}1A` }}><Ico n={icon} c={tone} s={24} /></span>
    <span><span className="block text-[18px] font-bold">{title}</span><span className="block text-[15px] text-[#5B6680]">{text}</span></span>
  </div>
);

/** One template's home page at 1280×720: nav, hero, highlights. */
const Site = ({ look, animate, step = -1 }) => {
  const { bg, fg, muted, accent, accent2, onAccent, card, line, font, upper, square, offset } = look;
  const r = square ? 4 : 999;
  const shadow = offset ? `4px 4px 0 ${fg}` : "none";
  return (
    <div className={`absolute inset-0 flex flex-col ${animate ? "pl-site-in" : ""}`} style={{ background: bg, color: fg, fontFamily: font }}>
      {look.visual === "halls" && <div className="h-9 flex items-center justify-center text-[13px] font-bold" style={{ background: accent, color: onAccent }}>Visitor registration is open · Free for trade visitors</div>}
      <nav className="pl-r h-[76px] px-14 flex items-center gap-8" {...rise(0, { borderBottom: `1px solid ${line}` })}>
        <span className="text-[19px] font-extrabold tracking-[0.04em]">{look.short}</span>
        {step === 3 && <span className="pl-pop inline-flex items-center gap-2 h-8 px-3 rounded-full text-[13px] font-bold bg-[#16A34A] text-white"><span className="pl-live w-2 h-2 rounded-full bg-white" />Live</span>}
        <span className="flex-1 flex justify-center gap-8 text-[15px] font-medium" style={{ color: muted }}>{look.links.map((l) => <span key={l}>{l}</span>)}</span>
        <span className="h-11 px-6 inline-flex items-center text-[15px] font-bold" style={{ background: accent, color: onAccent, borderRadius: r, boxShadow: shadow }}>{look.ctas[0]}</span>
      </nav>
      <div className="flex-1 px-14 grid grid-cols-[1.05fr_1fr] gap-12 items-center">
        <div>
          <span className="pl-r inline-flex items-center gap-2 text-[14px] font-semibold p-1 pr-4" {...rise(1, { background: card, border: `1px solid ${line}`, borderRadius: r, boxShadow: shadow })}>
            <span className="px-3 py-1" style={{ background: accent, color: onAccent, borderRadius: r }}>{look.tag}</span>{look.badge}
          </span>
          <div className="relative mt-6">
            <h3 className={`pl-r font-extrabold leading-[0.98] tracking-[-0.035em] text-[72px] ${upper ? "uppercase" : ""}`} {...rise(2)}>
              {look.title} <span style={{ color: accent }}>{look.hl}</span>
            </h3>
            {step === 1 && <EditBox />}
          </div>
          <p className="pl-r mt-5 text-[19px] leading-relaxed max-w-[520px]" {...rise(3, { color: muted })}>{look.intro}</p>
          <div className="pl-r mt-8 flex gap-3" {...rise(4)}>
            <span className="h-14 px-7 inline-flex items-center text-[17px] font-bold" style={{ background: accent, color: onAccent, borderRadius: r, boxShadow: shadow }}>{look.ctas[0]} →</span>
            <span className="h-14 px-7 inline-flex items-center text-[17px] font-bold" style={{ border: `2px solid ${fg}`, borderRadius: r }}>{look.ctas[1]}</span>
          </div>
        </div>
        <div className="pl-r" {...rise(3)}><Visual look={look} /></div>
      </div>
      {step === 0 && <Toast tone="#0052C9" icon="layout-template" title="Template 1 of 20" text={`${look.name} · ${look.category}`} />}
      {step === 2 && <Toast tone="#16A34A" icon="lock" title="Published" text={`${look.url} · HTTPS on`} />}
      {step === 3 && <Toast tone="#16A34A" icon="calendar-check" title="Agenda synced just now" text="2 sessions added from your event" />}
      <div className="pl-r px-14 h-[92px] grid grid-cols-3 items-center" {...rise(5, { borderTop: `1px solid ${line}` })}>
        {look.stats.map(([k, v], i) => (
          <div key={k} className="flex items-baseline gap-3">
            <span className="text-[36px] font-extrabold" style={{ color: i === 1 ? accent2 : fg }}>{v}</span>
            <span className="text-[14px] font-semibold uppercase tracking-[0.12em]" style={{ color: muted }}>{k}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/** A 16:9 frame: the 1280×720 page scaled to the frame's width. The previous template stays under the next. */
const SiteStage = ({ n, prev, step }) => {
  const ref = useRef(null);
  const [k, setK] = useState(0.5);
  useLayoutEffect(() => {
    const ro = new ResizeObserver(([e]) => setK(e.contentRect.width / 1280));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="relative w-full aspect-video rounded-[18px] overflow-hidden shadow-[0_30px_70px_-24px_rgba(0,0,0,0.65)] ring-1 ring-white/10">
      <div className="absolute left-0 top-0 w-[1280px] h-[720px] origin-top-left" style={{ transform: `scale(${k})` }}>
        {prev !== null && prev !== n && <Site look={WEBSITE_LOOKS[prev]} />}
        <Site key={n} look={WEBSITE_LOOKS[n]} animate={prev !== null} step={step} />
      </div>
    </div>
  );
};

const lookFor = (i) => Math.min(i, WEBSITE_LOOKS.length - 1);

/** Steps scroll past the template, which stays put; the step crossing the reading line picks the template. */
const StepsAndSite = () => {
  const [step, setStep] = useState(0);
  const [prev, setPrev] = useState(null);
  const shown = useRef(0);
  const refs = useRef([]);
  const go = (i) => {
    const look = lookFor(i);
    setStep(i);
    if (look !== shown.current) { setPrev(shown.current); shown.current = look; }
  };

  useEffect(() => {
    // Phones: the template sits at the top, so the reading line is lower down the screen.
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) go(Number(e.target.dataset.step)); });
    }, { rootMargin: wide ? "-45% 0px -45% 0px" : "-62% 0px -30% 0px" });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const n = lookFor(step);
  const look = WEBSITE_LOOKS[n];
  return (
    <div className="mt-10 grid gap-6 lg:gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
      <style>{SWAP_CSS}</style>
      <link rel="stylesheet" href={FONTS} />
      <div className="order-2 lg:order-1">
        <ol className="relative m-0 p-0 list-none">
          <span className="absolute left-[19px] top-5 bottom-5 w-px bg-white/15" aria-hidden="true" />
          <span className="absolute left-[19px] top-5 w-px bg-[#7FA6FF] transition-[height] duration-500" style={{ height: `calc((100% - 40px) * ${step / (WEBSITE_STEPS.length - 1)})` }} aria-hidden="true" />
          {WEBSITE_STEPS.map(([title, text], i) => (
            <li key={title} ref={(el) => { refs.current[i] = el; }} data-step={i} className="relative flex gap-4 py-4 min-h-[30vh] lg:min-h-[36vh] items-center">
              <button type="button" onClick={() => go(i)} aria-current={i === step ? "step" : undefined} aria-label={`Step ${i + 1}: ${title}`}
                className={`flex-none w-10 h-10 rounded-full inline-flex items-center justify-center font-display text-[14px] font-bold transition-all duration-300 ${i === step ? "bg-white text-[#071B43] scale-110" : i < step ? "bg-[#1A3B82] text-white" : "bg-[#0E2C67] border border-white/15 text-[#A2C3FF]"}`}>{i + 1}</button>
              <span className={`transition-all duration-500 ${i === step ? "opacity-100 translate-x-0" : "opacity-40 translate-x-1"}`}>
                <span className="block font-display text-[22px] font-bold text-white leading-snug">{title}</span>
                <span className="block mt-1.5 text-[15px] leading-relaxed text-[#AFBEDB]">{text}</span>
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-2"><TicketCta href="#contact" tone="light">Get your event website</TicketCta></div>
      </div>
      <div className="order-1 lg:order-2 sticky top-16 lg:top-[calc(50vh-min(26vw,330px))] z-10 self-start -mx-4 px-4 py-3 lg:m-0 lg:p-0 bg-[#071B43] lg:bg-transparent">
        <SiteStage n={n} prev={prev} step={step} />
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12.5px] text-[#AFBEDB]">
          <span className="flex gap-1.5" aria-hidden="true">
            {WEBSITE_LOOKS.map((l, i) => <span key={l.name} className={`h-1.5 rounded-full transition-all duration-300 ${i === n ? "w-6 bg-white" : "w-1.5 bg-white/30"}`} />)}
          </span>
          <span key={n} className="pl-fade"><strong className="text-white font-semibold">{look.name}</strong> · {look.category} template</span>
          <span className="text-white/40">·</span>
          <span className="tabular-nums">{String(step + 1).padStart(2, "0")} / {String(WEBSITE_STEPS.length).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
};

export const WebsiteBuilder = () => (
  <Band id="website" dark>
    <SectionHead dark kicker="SPOTLIGHT · YOUR EVENT WEBSITE" title="Your event website, live in minutes." />
    <StepsAndSite />
  </Band>
);

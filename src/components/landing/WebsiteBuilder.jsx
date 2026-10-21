import React, { useEffect, useState } from "react";
import { Ico, TicketCta } from "./kit";
import { Band, SectionHead } from "./Band";
import { WEBSITE_POINTS, WEBSITE_LOOKS } from "./content";

/**
 * Website builder highlight (dark band, right after partners): what organizers get, next to a browser
 * mock-up of an event site that cycles through three real templates (src/sites/kit/templates.js).
 * Copy in content.js (WEBSITE_POINTS, WEBSITE_LOOKS).
 */

const SiteMock = ({ look }) => {
  const { bg, fg, muted, accent, card, line, font, event, url, place } = look;
  return (
    <div className="rounded-[20px] overflow-hidden border border-white/10 bg-[#0E2C67] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
      {/* browser chrome with the site's own address */}
      <div className="flex items-center gap-3 px-4 h-11 bg-[#0A2457]">
        <span className="flex gap-1.5" aria-hidden="true">{[0, 1, 2].map((i) => <span key={i} className="w-2.5 h-2.5 rounded-full bg-white/25" />)}</span>
        <span className="flex-1 min-w-0 h-7 rounded-lg bg-white/10 px-3 inline-flex items-center gap-2 text-[12.5px] text-[#DCE7FD]">
          <Ico n="shield" c="#7FD9A8" s={12} /><span className="truncate">{url}</span>
        </span>
      </div>
      {/* the event site itself */}
      <div key={look.name} className="pl-fade p-5 sm:p-6" style={{ background: bg, color: fg, fontFamily: font }}>
        <div className="flex items-center justify-between gap-3">
          <span className="font-bold text-[15px]">{event.short}</span>
          <span className="hidden sm:flex gap-4 text-[12px]" style={{ color: muted }}>{["About", "Programme", "Speakers", "Venue"].map((n) => <span key={n}>{n}</span>)}</span>
          <span className="h-8 px-3 rounded-full text-[12px] font-bold inline-flex items-center" style={{ background: accent, color: look.onAccent }}>Register</span>
        </div>
        <p className="mt-7 text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: accent }}>{event.when} · {place}</p>
        <h3 className="mt-2 font-extrabold leading-[1.05] tracking-[-0.03em] text-[28px] sm:text-[34px]">{event.title}</h3>
        <p className="mt-3 text-[13.5px] leading-relaxed max-w-[420px]" style={{ color: muted }}>{event.line}</p>
        <div className="mt-6 grid grid-cols-3 gap-2.5">
          {event.cards.map(([k, v]) => (
            <div key={k} className="rounded-xl p-3" style={{ background: card, border: `1px solid ${line}` }}>
              <div className="text-[10.5px] uppercase tracking-[0.12em]" style={{ color: muted }}>{k}</div>
              <div className="mt-1 text-[13.5px] font-bold">{v}</div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-2" aria-hidden="true">
          {["AR", "MK", "SI", "PN"].map((s, i) => (
            <span key={s} className="w-8 h-8 rounded-full text-[10px] font-bold inline-flex items-center justify-center" style={{ background: i % 2 ? card : accent, color: i % 2 ? fg : look.onAccent, border: `1px solid ${line}` }}>{s}</span>
          ))}
          <span className="text-[12px]" style={{ color: muted }}>Speakers, live from your event</span>
        </div>
      </div>
    </div>
  );
};

export const WebsiteBuilder = () => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    const t = setInterval(() => setN((i) => (i + 1) % WEBSITE_LOOKS.length), 4000);
    return () => clearInterval(t);
  }, []);
  const look = WEBSITE_LOOKS[n];

  return (
    <Band id="website" dark>
      <SectionHead dark kicker="EVENT WEBSITE BUILDER" title="Your event website, live in minutes." text="Pick a designed template, click any text to change it, and publish on your own address. No developer needed." />
      <div className="pl-reveal mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-center">
        <div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {WEBSITE_POINTS.map(([icon, title, text]) => (
              <li key={title} className="flex gap-3.5">
                <span className="flex-none w-10 h-10 rounded-xl bg-white/10 inline-flex items-center justify-center"><Ico n={icon} c="#A2C3FF" s={18} /></span>
                <span>
                  <span className="block font-display text-[16px] font-bold text-white leading-snug">{title}</span>
                  <span className="block mt-1 text-[14px] leading-relaxed text-[#AFBEDB]">{text}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <TicketCta href="#contact" tone="light">Get your event website</TicketCta>
          </div>
        </div>
        <div>
          <SiteMock look={look} />
          {/* which template is showing; click to switch */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Templates">
            {WEBSITE_LOOKS.map((l, i) => (
              <button key={l.name} type="button" role="tab" aria-selected={i === n} onClick={() => setN(i)}
                className={`h-8 px-3 rounded-full text-[12.5px] font-semibold transition-colors ${i === n ? "bg-white text-[#0B1530]" : "bg-white/10 text-[#DCE6FA] hover:bg-white/15"}`}>
                {l.name} · {l.category}
              </button>
            ))}
            <span className="text-[12.5px] text-[#AFBEDB]">+ 17 more templates</span>
          </div>
        </div>
      </div>
    </Band>
  );
};

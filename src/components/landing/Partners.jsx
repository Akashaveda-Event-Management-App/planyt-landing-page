import React from "react";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { Checker, CK } from "./kit";
import { Band, SectionHead } from "./Band";
import { PARTNERS, PAST_EVENTS } from "./content";

/**
 * Partners & past events (light band): a row of organiser logos, then the featured past event as a
 * large card and any others as small cards. Data in content.js (PARTNERS, PAST_EVENTS).
 * Logos show in their own colours; a `light` logo (made for dark backgrounds) is shown as a dark
 * silhouette so it reads on white.
 */
const Logo = ({ p }) => (
  <li className="group h-28 rounded-[20px] bg-white border border-[#E4E8F0] flex items-center justify-center px-6">
    <img src={p.logo} alt={p.name} loading="lazy" className={`max-h-16 max-w-[80%] object-contain transition-transform duration-300 group-hover:scale-105 ${p.light ? "[filter:brightness(0)] opacity-80" : ""}`} />
  </li>
);

const Meta = ({ e, dark }) => (
  <div className={`flex flex-wrap gap-x-5 gap-y-1.5 text-sm ${dark ? "text-[#C9D6EE]" : "text-[#5B6680]"}`}>
    <span className="inline-flex items-center gap-1.5"><CalendarDays size={15} />{e.when}</span>
    <span className="inline-flex items-center gap-1.5"><MapPin size={15} />{e.where}</span>
  </div>
);

export const Partners = () => {
  const [featured, ...rest] = PAST_EVENTS;
  return (
    <Band id="partners">
      <SectionHead kicker="PARTNERS & PAST EVENTS" title="Trusted to run ISRO's international space conference." text="Organisers we have run events with, and the events themselves." />

      <ul aria-label="Organisers" className="pl-reveal mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {PARTNERS.map((p) => <Logo key={p.name} p={p} />)}
      </ul>

      {featured && (
        <article className="pl-reveal mt-4 relative overflow-hidden rounded-[20px] bg-[#071B43] text-white p-6 sm:p-8 grid gap-6 sm:grid-cols-[auto_1fr] items-center">
          <div className="absolute top-0 right-0 pointer-events-none"><Checker {...CK.hero} corner="tr" /></div>
          <img src={featured.logo} alt={`${featured.name} logo`} loading="lazy" className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/5 object-contain" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 h-7 px-3 rounded-full bg-white/10 text-xs font-semibold text-[#A2C3FF]">Featured event</span>
            <h3 className="mt-3 font-display font-extrabold tracking-[-0.03em] text-2xl sm:text-3xl">{featured.name}</h3>
            <p className="mt-1 text-[#C9D6EE]">{featured.full}</p>
            <div className="mt-4"><Meta e={featured} dark /></div>
            <p className="mt-3 text-sm text-[#AFBEDB]">Hosted by {featured.hosts}. <span className="text-white font-semibold">{featured.note}</span></p>
            {featured.url && (
              <a href={featured.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[#A2C3FF]">
                Visit the event site <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </article>
      )}

      {rest.length > 0 && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((e) => (
            <article key={e.name} className="pl-reveal rounded-[20px] bg-white border border-[#E4E8F0] p-5 flex gap-4 items-start">
              {e.logo && <img src={e.logo} alt="" loading="lazy" className="w-14 h-14 rounded-xl object-contain flex-none" />}
              <div className="min-w-0">
                <h3 className="font-display font-bold text-lg text-[#0B1530]">{e.name}</h3>
                {e.full && <p className="text-sm text-[#5B6680]">{e.full}</p>}
                <div className="mt-2"><Meta e={e} /></div>
              </div>
            </article>
          ))}
        </div>
      )}
    </Band>
  );
};

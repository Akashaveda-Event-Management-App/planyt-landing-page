import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Checker, CK, Ico, TicketCta, useTick } from "./kit";

/**
 * First screen of /landing: headline, two calls to action, a row of plain facts, and (on wide
 * screens) four small live cards around the copy showing what happens inside Planyt.
 * Sits inside the hero's intro layer, which HeroLaptop fades out on scroll.
 */
const FACTS = ["Payments settle in your own account", "No app for attendees", "A workspace for every role", "Setup help from our team"];

const Float = ({ className, delay = 0, children }) => (
  <div aria-hidden="true" className={`hidden xl:block absolute w-[248px] pl-fade ${className}`} style={{ animationDelay: `${0.5 + delay}s` }}>
    <div className="pl-float relative overflow-hidden rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-md p-4 text-left shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]" style={{ animationDelay: `${delay * 2}s` }}>
      <div className="absolute top-0 right-0 pointer-events-none"><Checker {...CK.navy} corner="tr" /></div>
      <div className="relative">{children}</div>
    </div>
  </div>
);
const Tile = ({ icon, bg = "bg-[#0052C9]" }) => <span className={`w-9 h-9 rounded-xl flex-none flex items-center justify-center ${bg}`}><Ico n={icon} c="#fff" s={17} /></span>;

export const HeroIntro = () => {
  const t = useTick(true, 1800);
  const names = ["A. Khan", "R. Iyer", "M. Das", "S. Rao"];
  const checked = 323 + (t % 40);
  return (
    <>
      {/* faint grid behind the copy */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none opacity-[0.07]"
        style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "64px 64px", maskImage: "radial-gradient(ellipse 60% 55% at 50% 50%,#000 30%,transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse 60% 55% at 50% 50%,#000 30%,transparent 75%)" }} />

      <Float className="left-[3%] top-[26%]">
        <div className="flex items-center gap-3">
          <Tile icon="user-plus" />
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-white">New registration</p>
            <p key={t} className="pl-in text-xs text-[#AFBEDB]">{names[t % 4]} · Early bird</p>
          </div>
        </div>
      </Float>
      <Float className="left-[6%] bottom-[20%]" delay={0.4}>
        <div className="flex items-center gap-3">
          <Tile icon="scan-line" bg="bg-[#1A3B82]" />
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-white">Checked in at Desk 2</p>
            <p className="text-xs text-[#AFBEDB] tabular-nums">{checked} of 412</p>
          </div>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-[#7FA6FF] transition-[width] duration-700" style={{ width: `${(checked / 412) * 100}%` }} /></div>
      </Float>
      <Float className="right-[3%] top-[24%]" delay={0.2}>
        <div className="flex items-center gap-3">
          <Tile icon="file-check" bg="bg-[#1A3B82]" />
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-white">Paper #48 accepted</p>
            <p className="text-xs text-[#AFBEDB]">Slot · Hall B, 11:30</p>
          </div>
        </div>
      </Float>
      <Float className="right-[6%] bottom-[22%]" delay={0.6}>
        <div className="flex items-center gap-3">
          <Tile icon="award" />
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-white">Certificates sent</p>
            <p className="text-xs text-[#AFBEDB]">474 attendees · verifiable links</p>
          </div>
        </div>
      </Float>

      <a href="#contact" className="pl-fade group inline-flex items-center gap-2 h-9 pl-1.5 pr-3.5 rounded-full bg-white/[0.06] border border-white/10 text-[13px] font-medium text-[#DCE6FA] hover:bg-white/10">
        <span className="h-6 px-2.5 inline-flex items-center rounded-full bg-[#0052C9] text-white text-xs font-semibold whitespace-nowrap">For organizers</span>
        <span className="hidden sm:inline">Conferences, symposiums and workshops</span><span className="sm:hidden whitespace-nowrap">Conferences &amp; workshops</span> <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      </a>
      <h1 className="pl-fade mt-6 max-w-[920px] font-display font-extrabold leading-[1.02] tracking-[-0.045em] [text-wrap:balance]" style={{ fontSize: "clamp(40px,min(5.8vw,8.6vh),80px)", animationDelay: ".08s" }}>
        Run your whole conference <span className="text-[#7FA6FF]">from one place.</span>
      </h1>
      <p className="pl-fade mt-5 max-w-[600px] text-[17px] sm:text-lg leading-relaxed text-[#C9D6EE] [text-wrap:pretty]" style={{ animationDelay: ".16s" }}>
        Registration, payments, peer review, agenda, check-in, live Q&amp;A, sponsors and certificates. One platform, with a screen for every role at your event.
      </p>
      <div className="pl-fade mt-8 flex gap-3 flex-wrap justify-center" style={{ animationDelay: ".24s" }}>
        <TicketCta href="#contact" tone="light">Request access</TicketCta>
        <TicketCta href="#how" tone="ghost" icon="chevron-down">See how it works</TicketCta>
      </div>
      <ul className="pl-fade mt-8 sm:mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2.5 text-[13px] sm:text-sm text-[#AFBEDB]" style={{ animationDelay: ".32s" }}>
        {FACTS.map((f) => <li key={f} className="inline-flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-[#0052C9]/40 flex items-center justify-center"><Check size={11} className="text-[#A2C3FF]" strokeWidth={3} /></span>{f}</li>)}
      </ul>
      <div aria-hidden="true" className="pl-fade hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-10 rounded-full border-2 border-white/25 justify-center pt-2" style={{ animationDelay: ".6s" }}>
        <span className="w-1 h-2 rounded-full bg-white/60 pl-float" />
      </div>
    </>
  );
};

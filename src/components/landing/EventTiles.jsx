import React from "react";
import { FakeQr, Ico } from "./kit";
import { brandLogoSrc } from "./BrandLogo";

/**
 * Event-day artefacts under the feature explorer (dark band): an entry ticket with a tear-off
 * stub, a lanyard badge and a certificate. Sample content; shapes echo what Planyt generates.
 */
const NOTCH = "#071B43"; // band colour, used for the ticket's punched notches

export const Barcode = () => (
  <div aria-hidden="true" className="hidden sm:flex items-end gap-[2px] h-8">
    {Array.from({ length: 42 }, (_, i) => <span key={i} className="bg-[#0B1530]" style={{ width: (i * 7) % 3 === 0 ? 3 : 1.5, height: i % 9 === 0 ? "100%" : "82%" }} />)}
  </div>
);

const Ticket = () => (
  <div className="group relative flex h-full min-h-[230px] rounded-[20px] transition-transform duration-500 hover:-rotate-1 hover:-translate-y-1">
    {/* main */}
    <div className="relative flex-1 min-w-0 rounded-l-[20px] bg-white text-[#0B1530] p-5 sm:p-6 flex flex-col">
      <div className="flex items-center gap-2">
        <img src={brandLogoSrc("horizontal", "light")} alt="" className="h-5 w-auto" />
        <span className="ml-auto text-[11px] font-bold tracking-[0.16em] text-[#0052C9]">ENTRY PASS</span>
      </div>
      <p className="mt-4 text-[11px] font-semibold tracking-[0.14em] text-[#6B7690]">PROFESSIONAL · ADMIT ONE</p>
      <h4 className="mt-1 font-display text-xl sm:text-2xl font-extrabold leading-tight tracking-[-0.02em]">Conference on Applied AI</h4>
      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
        {[["Date", "12 Nov"], ["Doors", "09:00"], ["Hall", "A"]].map(([k, v]) => (
          <div key={k}><p className="text-[11px] text-[#6B7690]">{k}</p><p className="font-bold">{v}</p></div>
        ))}
      </div>
      <div className="mt-auto pt-4 flex items-end justify-between gap-3">
        <div><p className="text-[11px] text-[#6B7690]">Attendee</p><p className="font-semibold">Aisha Khan</p></div>
        <Barcode />
      </div>
    </div>
    {/* perforation */}
    <div aria-hidden="true" className="relative w-0 z-10">
      <span className="absolute -left-3 -top-3 w-6 h-6 rounded-full" style={{ background: NOTCH }} />
      <span className="absolute -left-3 -bottom-3 w-6 h-6 rounded-full" style={{ background: NOTCH }} />
      <span className="absolute left-0 top-4 bottom-4 border-l-2 border-dashed border-[#C9D6EE]" />
    </div>
    {/* stub */}
    <div className="relative w-[104px] sm:w-[148px] shrink-0 rounded-r-[20px] bg-[#0052C9] text-white p-4 flex flex-col items-center justify-between transition-transform duration-500 group-hover:translate-x-1.5 group-hover:rotate-2">
      <p className="text-[11px] font-bold tracking-[0.16em] text-[#DCE7FD]">GATE 2</p>
      <span className="rounded-xl bg-white p-2"><FakeQr size={72} ink="#0B1530" /></span>
      <p className="text-[11px] font-semibold text-[#DCE7FD] tabular-nums">No. 0412</p>
    </div>
  </div>
);

const Badge = () => (
  <div className="relative h-full min-h-[230px] flex flex-col items-center">
    <span aria-hidden="true" className="w-3 h-10 rounded-b bg-[#7FA6FF]" />
    <div className="-mt-1 w-full max-w-[220px] origin-top" style={{ transform: "rotate(-3deg)" }}>
    <div className="pl-float rounded-[18px] bg-white text-[#0B1530] overflow-hidden shadow-[0_24px_50px_-20px_rgba(0,0,0,0.6)]">
      <div className="relative bg-[#0B1530] text-white px-4 pt-4 pb-3 text-center">
        <span aria-hidden="true" className="absolute left-1/2 top-2 -translate-x-1/2 w-10 h-2 rounded-full bg-white/20" />
        <p className="mt-2 text-[11px] font-bold tracking-[0.2em] text-[#7FA6FF]">SPEAKER</p>
      </div>
      <div className="px-4 pt-4 pb-4 flex flex-col items-center text-center">
        <span className="w-14 h-14 rounded-full bg-[#E6EEFD] text-[#0052C9] font-display font-extrabold text-lg flex items-center justify-center">AI</span>
        <p className="mt-2 font-display font-bold leading-tight">Dr. Arjun Iyer</p>
        <p className="text-xs text-[#6B7690]">IIT Madras</p>
        <div className="mt-3 flex items-center gap-2">
          <FakeQr size={40} ink="#0B1530" />
          <span className="text-left text-[11px] leading-tight text-[#43506B]">Hall B<br />11:30 talk</span>
        </div>
      </div>
    </div>
    </div>
  </div>
);

const Certificate = () => (
  <div className="relative h-full min-h-[230px] rounded-[20px] bg-[#FBFAF7] text-[#0B1530] p-2 transition-transform duration-500 hover:rotate-1 hover:-translate-y-1">
    <div className="h-full rounded-[14px] border-2 border-double border-[#C9D6EE] px-4 py-4 flex flex-col items-center text-center">
      <p className="text-[10px] font-bold tracking-[0.22em] text-[#6B7690]">CERTIFICATE OF PARTICIPATION</p>
      <p className="mt-3 text-[11px] text-[#6B7690]">awarded to</p>
      <p className="font-display text-xl font-bold italic tracking-[-0.01em] text-[#071B43]">Meera Iyer</p>
      <p className="mt-1 text-[11px] leading-snug text-[#43506B]">for presenting at the Conference on Applied AI</p>
      <div className="mt-auto pt-3 w-full flex items-end justify-between">
        <span className="text-left"><span className="block w-16 border-t border-[#0B1530]/40" /><span className="text-[10px] text-[#6B7690]">Organizer</span></span>
        <span className="w-12 h-12 rounded-full bg-[#0052C9] flex items-center justify-center ring-4 ring-[#DCE7FD]"><Ico n="award" c="#fff" s={22} /></span>
      </div>
      <p className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-[#0052C9]"><Ico n="check" c="#0052C9" s={11} />Verifiable link</p>
    </div>
  </div>
);

export const EventTiles = () => (
  <div className="mt-14">
    <div className="pl-reveal flex flex-wrap items-end justify-between gap-3">
      <div>
        <div className="text-xs font-semibold tracking-[0.16em] text-[#7FA6FF]">ON THE DAY</div>
        <h3 className="mt-2 font-display text-2xl sm:text-[28px] font-bold tracking-[-0.03em] text-white">Passes, badges and certificates that look the part.</h3>
      </div>
      <p className="text-[15px] text-[#AFBEDB] max-w-[380px]">Generated from the registration form. Nobody types a name twice.</p>
    </div>
    <div className="pl-reveal mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4 items-stretch">
      <div className="md:col-span-2"><Ticket /></div>
      <Badge />
      <Certificate />
    </div>
  </div>
);

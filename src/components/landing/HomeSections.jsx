import React, { useEffect, useState } from "react";
import { Link } from "./link";
import { BadgeCheck, Mail, Plus, Users } from "lucide-react";
import { Checker, CK, Dither, FakeQr, Ico, TicketCta } from "./kit";
import { Band, SectionHead, THEME } from "./Band";
import { CONTACT_EMAIL, EVENT_TYPES, FAQS, ROLE_CARDS, TRUST } from "./content";
import { leadsUrl } from "./api";
import { START_FREE, planSummary, useSignup } from "./signup";
import { brandLogoSrc } from "./BrandLogo";
import { Barcode } from "./EventTiles";
import { Magnetic, Rise, Stagger } from "./motion";

/**
 * /landing sections after the hero. Bands alternate: marquee + How it works (light, HowItWorks.jsx),
 * Features (dark, Features.jsx), Roles (light), Pricing (dark), FAQ (light), Contact (dark),
 * closing call to action (light), footer (dark).
 */
const L = THEME.light, D = THEME.dark;
const Corner = ({ k }) => <div className="absolute top-0 right-0 pointer-events-none"><Checker {...CK[k]} corner="tr" /></div>;

export const DitherMarquee = () => {
  const pix = (
    <span className="inline-grid grid-cols-[repeat(2,7px)] flex-none">
      {[1, 0, 0, 1].map((v, i) => <span key={i} className="w-[7px] h-[7px]" style={{ background: v ? "#0052C9" : "transparent" }} />)}
    </span>
  );
  const run = EVENT_TYPES.map((t) => <span key={t} className="inline-flex items-center gap-10 pr-10"><span>{t}</span>{pix}</span>);
  const fade = "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)";
  return (
    <div className="bg-[#F7F8FB]">
      <div aria-hidden="true" className="relative h-[72px] -mt-px overflow-hidden pointer-events-none">
        <div className="absolute inset-0 flex justify-center"><Dither /></div>
      </div>
      <div aria-label={EVENT_TYPES.join(", ")} className="relative overflow-hidden pt-9 pb-2" style={{ maskImage: fade, WebkitMaskImage: fade }}>
        <div aria-hidden="true" className="pl-marquee flex w-max whitespace-nowrap font-display font-bold tracking-[-0.03em] text-[#0B1530]" style={{ fontSize: "clamp(28px,3.2vw,44px)" }}>
          <div className="flex">{run}</div><div className="flex">{run}</div>
        </div>
      </div>
    </div>
  );
};

/* ── Roles (light) ─────────────────────────────────────────────────────── */

/**
 * Each role as its own colour-coded event badge on a lanyard (how real conferences mark roles).
 * The chosen badge hangs straight; the others tilt and fade. Click one, or it moves on every 7 s
 * (paused on hover). The card below says what that role sees, what is kept from them and how
 * they sign in. Copy in content.js (ROLE_CARDS); colours are the brand category tints.
 */
const BADGE = [
  { c: "#071B43", soft: "#E4EDFE", fg: "#0E2C67", label: "ORGANIZER", person: ["Meera Nair", "Organising committee"] },
  { c: "#0F766E", soft: "#E6F7F5", fg: "#0F766E", label: "VOLUNTEER", person: ["Rahul Das", "Desk 2 · Hall A"] },
  { c: "#6D28D9", soft: "#F1EBFE", fg: "#6D28D9", label: "REVIEWER", person: ["Dr. S. Iyer", "Review committee"] },
  { c: "#BE185D", soft: "#FDEBF4", fg: "#BE185D", label: "SPONSOR", person: ["Kavya Rao", "Booth B12"] },
  { c: "#0052C9", soft: "#E4EDFE", fg: "#0052C9", label: "DELEGATE", person: ["Aisha Khan", "Author · Paper #48"] },
];
const initials = (n) => n.replace(/^Dr\.\s*/, "").split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
const TILT = [-3, 2, -2, 3, -2];

const RoleBadge = ({ r, b, i, on, onPick }) => (
  <button type="button" role="tab" aria-selected={on} aria-label={r.name} onClick={onPick}
    className={`group relative flex-none snap-center w-[168px] sm:w-[184px] flex flex-col items-center transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${on ? "scale-[1.04]" : "opacity-70 hover:opacity-95"}`}>
    <span aria-hidden="true" className={`w-3.5 rounded-b-sm transition-[height] duration-500 ${on ? "h-10" : "h-14 group-hover:h-12"}`} style={{ background: b.c }} />
    <span aria-hidden="true" className="relative z-[1] -mt-1 w-9 h-3 rounded-full bg-[#C9D2E3]" />
    <div className="-mt-1.5 w-full origin-top transition-transform duration-500" style={{ transform: on ? "rotate(0deg)" : `rotate(${TILT[i]}deg)` }}>
      <div className={`rounded-[18px] bg-white overflow-hidden text-left transition-shadow duration-500 ${on ? "shadow-[0_30px_60px_-24px_rgba(7,27,67,0.55)]" : "shadow-[0_14px_30px_-20px_rgba(7,27,67,0.5)]"}`}>
        <div className="relative px-4 pt-4 pb-3 text-white overflow-hidden" style={{ background: b.c }}>
          <span aria-hidden="true" className="absolute left-1/2 top-2 -translate-x-1/2 w-9 h-1.5 rounded-full bg-white/25" />
          <div className="absolute top-0 right-0 pointer-events-none"><Checker cols={5} rows={3} size={9} colors={["rgba(255,255,255,.18)", "rgba(255,255,255,.1)"]} corner="tr" /></div>
          <p className="relative mt-1.5 text-center text-[11px] font-bold tracking-[0.22em]">{b.label}</p>
        </div>
        <div className="px-4 pt-4 pb-4 flex flex-col items-center text-center">
          <span className="w-14 h-14 rounded-full flex items-center justify-center font-display font-extrabold text-lg" style={{ background: b.soft, color: b.fg }}>{initials(b.person[0])}</span>
          <p className="mt-2 font-display font-bold leading-tight text-[#0B1530]">{b.person[0]}</p>
          <p className="text-[11.5px] text-[#6B7690]">{b.person[1]}</p>
          <div className="mt-3 w-full flex items-center gap-2.5 pt-3 border-t border-dashed border-[#E4E8F0]">
            <FakeQr size={34} ink="#0B1530" />
            <span className="text-left text-[11px] leading-tight text-[#43506B]"><span className="font-semibold text-[#0B1530]">{r.name}</span><br />ICAAI 2026</span>
          </div>
        </div>
      </div>
    </div>
  </button>
);

export const Roles = () => {
  const [role, setRole] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    const t = setTimeout(() => setRole((r) => (r + 1) % ROLE_CARDS.length), 7000);
    return () => clearTimeout(t);
  }, [role, paused]);
  const rd = ROLE_CARDS[role], b = BADGE[role];
  return (
    <Band id="roles">
      <SectionHead kicker="EVERYONE AT THE EVENT" title="A badge, and a screen, for every role." text="Volunteers don't need revenue and reviewers don't need the registration list. Each role signs in to a screen built for its job." />
      <div className="pl-reveal" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div role="tablist" aria-label="Roles" className="mt-6 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-3 sm:gap-5 justify-start lg:justify-center overflow-x-auto snap-x snap-mandatory pb-6 min-h-[340px] [scrollbar-width:none]">
          {ROLE_CARDS.map((r, i) => <RoleBadge key={r.name} r={r} b={BADGE[i]} i={i} on={i === role} onPick={() => setRole(i)} />)}
        </div>

        {/* role pass, laid out like the entry pass: main part | tear line | stub in the role colour.
            It stays mounted at a fixed height; only the text fades when the role changes. */}
        <div className="mt-2 flex flex-col lg:flex-row lg:h-[352px] rounded-[22px] drop-shadow-[0_26px_40px_rgba(7,27,67,0.18)]">
          <div className="pl-cut-main relative flex-1 min-w-0 overflow-hidden bg-white rounded-t-[22px] lg:rounded-tr-none lg:rounded-l-[22px] p-6 sm:p-8 flex flex-col min-h-[470px] sm:min-h-[360px] lg:min-h-0">
            <div aria-hidden="true" className="absolute bottom-0 left-0 pointer-events-none"><Checker cols={10} rows={5} size={14} colors={["#CBDDFE", "#B8CEF8", "#DCE7FD"]} corner="bl" reach={0.85} /></div>
            <div className="relative flex items-center gap-2">
              <img src={brandLogoSrc("horizontal", "light")} alt="Planyt" className="h-5 w-auto" />
              <span className="ml-auto text-[11.5px] font-bold tracking-[0.16em] transition-colors duration-500" style={{ color: b.fg }}>ROLE PASS</span>
            </div>
            <div key={role} className="pl-fade relative flex-1 flex flex-col">
              <p className="mt-5 text-[11.5px] font-semibold tracking-[0.14em] text-[#6B7690] uppercase">{rd.who} · Admit one</p>
              <h3 className="mt-1 font-display font-extrabold tracking-[-0.03em] leading-[1.05] text-[clamp(26px,2.8vw,34px)] text-[#0B1530]">{rd.name}</h3>
              <dl className="mt-5 grid grid-cols-3 gap-4 max-w-[520px]">
                {rd.pass.map(([k, v]) => (
                  <div key={k}><dt className="text-[11.5px] text-[#6B7690]">{k}</dt><dd className="mt-0.5 text-[15px] font-bold leading-tight text-[#0B1530]">{v}</dd></div>
                ))}
              </dl>
              <div className="mt-auto pt-5 flex items-end justify-between gap-5">
                <div className="min-w-0">
                  <p className="text-[11.5px] text-[#6B7690]">What they see</p>
                  <ul className="mt-1.5 flex flex-wrap gap-1.5 max-w-[560px]">
                    {rd.see.map((t) => <li key={t} className="text-[12.5px] font-semibold px-2.5 py-1 rounded-full" style={{ background: b.soft, color: b.fg }}>{t}</li>)}
                  </ul>
                </div>
                <span className="hidden xl:block flex-none"><Barcode /></span>
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="relative z-10 flex-none h-0 lg:h-auto lg:w-0">
            <span className="absolute left-5 right-5 top-0 border-t-2 lg:border-t-0 lg:left-0 lg:right-auto lg:top-5 lg:bottom-5 lg:border-l-2 border-dashed border-[#C9D6EE]" />
          </div>

          <div className="pl-cut-stub relative lg:w-[220px] flex-none overflow-hidden text-white rounded-b-[22px] lg:rounded-bl-none lg:rounded-r-[22px] p-5 flex lg:flex-col items-center justify-between gap-4 transition-colors duration-500" style={{ background: b.c }}>
            <div aria-hidden="true" className="absolute top-0 right-0 pointer-events-none"><Checker cols={7} rows={5} size={12} colors={["rgba(255,255,255,.16)", "rgba(255,255,255,.08)"]} corner="tr" reach={0.85} /></div>
            <p className="relative text-[11.5px] font-bold tracking-[0.18em] text-white/85">{b.label}</p>
            <span className="relative rounded-xl bg-white p-2.5"><FakeQr size={84} ink="#0B1530" /></span>
            <p className="relative text-[11.5px] font-semibold text-white/85 tabular-nums">No. {String(role + 1).padStart(2, "0")}</p>
          </div>
        </div>
      </div>
    </Band>
  );
};

/* ── Pricing (dark) ────────────────────────────────────────────────────── */

/**
 * Plans as vertical tickets: the plan on the main part, then a punched tear line, then the stub
 * with "Custom quote" and the call to action. The featured plan is the white ticket.
 */
const PLANS = [
  { name: "Starter", for: "Seminars and workshops", note: "Per event", points: ["Registration & tickets", "Online payments", "QR check-in", "Certificates"] },
  { name: "Professional", for: "Events and conferences", note: "Per event or yearly", featured: true, points: ["Everything in Starter", "Your own event site", "Call for papers & review", "Agenda, Q&A & polls", "Sponsors & stalls", "VVIP & on-site desk"] },
  { name: "Custom", for: "Need more?", note: "Built around your event", cta: "Talk to us", points: ["Everything in Professional", "Many events a year", "Extra modules & integrations", "Setup help from our team"] },
];
const STEPS = ["Tell us about your event", "Get a quote", "Get your login"];
const FREE_STEPS = ["Sign up free", "Set up your event", "Upgrade when you grow"];

export const Pricing = () => {
  const signup = useSignup();
  return (
    <Band id="pricing" dark>
      <SectionHead dark kicker="PRICING" title="A plan for every size of event." text="Quoted for your event. No cut of ticket sales, and payments go to your own account." />
      {/* Offer pass: same format as the plans (label on top, bold line under it, fare stub) */}
      <div className="pl-reveal mt-8 flex flex-col lg:flex-row [filter:drop-shadow(0_24px_34px_rgba(0,0,0,0.35))]">
        <div className="pl-cut-main relative flex-1 min-w-0 overflow-hidden rounded-t-[20px] lg:rounded-tr-none lg:rounded-l-[20px] bg-[#0052C9] text-white p-6 sm:p-7">
          <div className="text-[11px] font-bold tracking-[0.16em] text-[#DCE7FD] uppercase">{signup ? `${signup.plan?.name || "Free"} plan · no card needed` : "Experience the new era of conference management"}</div>
          <div className="mt-2 font-display text-[28px] sm:text-[34px] leading-[1.05] font-extrabold tracking-[-0.03em]">{signup ? `Start free: ${planSummary(signup.plan)}.` : "Your first conference is on us."}</div>
        </div>
        <div aria-hidden="true" className="relative h-0 lg:h-auto lg:w-0">
          <span className="absolute left-5 right-5 top-0 border-t-2 lg:border-t-0 lg:left-0 lg:right-auto lg:top-5 lg:bottom-5 lg:border-l-2 border-dashed border-white/35" />
        </div>
        <div className="pl-cut-stub relative overflow-hidden lg:w-[290px] flex-none rounded-b-[20px] lg:rounded-bl-none lg:rounded-r-[20px] bg-[#003E99] text-white p-6 sm:p-7 flex flex-col justify-center gap-3">
          <Corner k="blueStrong" />
          <div className="relative">
            <div className="text-[11px] font-bold tracking-[0.16em] text-[#DCE7FD]">FARE</div>
            <div className="mt-1 font-display text-xl font-bold">Free</div>
            <div className="text-sm text-[#DCE7FD]">{signup ? "Sign up in a minute" : "On any plan"}</div>
          </div>
          {signup && <TicketCta to={START_FREE} tone="light" size="sm" className="relative w-full [&>span:first-child]:flex-1 [&>span:first-child]:justify-center">Start free</TicketCta>}
        </div>
      </div>
      {/* Phones swipe through the plans instead of scrolling past three tall cards. */}
      <Stagger className="mt-6 flex overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-4 sm:grid sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0 gap-5 items-stretch" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))" }}>
        {PLANS.map((p, n) => {
          const f = p.featured;
          return (
            <Rise key={p.name} whileHover={{ y: -6 }} spot={f ? "rgba(21,101,255,0.08)" : "rgba(111,161,255,0.16)"} className={`min-w-[85%] sm:min-w-0 snap-start flex flex-col ${f ? "[filter:drop-shadow(0_30px_40px_rgba(0,0,0,0.45))]" : ""}`}>
              <div className={`pl-cut-b relative flex-1 overflow-hidden rounded-t-[20px] p-6 sm:p-7 flex flex-col gap-5 ${f ? "bg-white text-[#0B1530]" : "bg-white/[0.06]"}`}>
                <Corner k={f ? "blue" : "navy"} />
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <div className={`text-sm font-semibold ${f ? "text-[#0052C9]" : "text-[#7FA6FF]"}`}>{p.for}</div>
                    <div className="mt-1 font-display text-2xl font-bold tracking-[-0.02em]">{p.name}</div>
                  </div>
                  {f && <span className="mt-0.5 inline-flex items-center h-6 px-2.5 rounded-full bg-[#0052C9] text-white text-[11px] font-bold tracking-[0.08em]">POPULAR</span>}
                </div>
                <div className={`relative flex flex-col gap-2.5 text-[14.5px] ${f ? "text-[#43506B]" : "text-[#DCE6FA]"}`}>
                  {p.points.map((t) => <span key={t} className="flex gap-2.5 items-center"><BadgeCheck size={18} color={f ? "#0052C9" : "#7FA6FF"} className="flex-none" />{t}</span>)}
                </div>
              </div>
              <div aria-hidden="true" className={`relative h-0 mx-5 border-t-2 border-dashed ${f ? "border-[#CBDDFE]" : "border-white/15"}`} />
              <div className={`pl-cut-t relative rounded-b-[20px] p-5 sm:px-7 flex flex-col gap-3 ${f ? "bg-white text-[#0B1530]" : "bg-white/[0.06]"}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-lg font-bold">Custom quote</span>
                  <span className={`text-[11px] font-bold tracking-[0.14em] tabular-nums ${f ? "text-[#6B7690]" : "text-[#7FA6FF]"}`}>PLAN 0{n + 1}</span>
                </div>
                <span className={`text-sm ${f ? "text-[#6B7690]" : "text-[#AFBEDB]"}`}>{p.note}</span>
                <TicketCta href="#contact" tone={f ? "blue" : "ghost"} className="mt-1 w-full [&>span:first-child]:flex-1 [&>span:first-child]:justify-center">{p.cta || "Request a quote"}</TicketCta>
              </div>
            </Rise>
          );
        })}
      </Stagger>
      <ol className="pl-reveal mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-[#AFBEDB]">
        {(signup ? FREE_STEPS : STEPS).map((t, i) => (
          <li key={t} className="flex items-center gap-3">
            {i > 0 && <span aria-hidden="true" className="w-6 border-t-2 border-dashed border-white/20" />}
            <span className="w-6 h-6 rounded-full bg-[#0052C9] text-white text-[11px] font-bold flex items-center justify-center">{i + 1}</span>
            <span className="font-semibold text-white">{t}</span>
          </li>
        ))}
      </ol>
    </Band>
  );
};

/* ── FAQ (light) ───────────────────────────────────────────────────────── */

/** One ticket-white list; questions open in place (native <details>), dashed tear lines between them. */
/* ── Security & data (light, right after Roles) ───────────────────────── */

export const Trust = () => (
  <Band id="trust">
    <SectionHead kicker="SECURITY & DATA" title="Your event, your money, your data." text="What Planyt does to keep the event, its people and its payments safe." />
    <Stagger className="mt-8 sm:mt-10 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {TRUST.map(([icon, title, text]) => (
        // Phones: icon beside the text, so six points stay short. Wider: icon on top.
        <Rise key={title} spot="rgba(21,101,255,0.10)" className="relative overflow-hidden rounded-[20px] bg-white border border-[#E4E8F0] p-4 sm:p-6 flex gap-4 sm:block transition-colors hover:border-[#CBDDFE]">
          <span className="flex-none inline-flex w-10 h-10 rounded-xl bg-[#E6EEFD] items-center justify-center"><Ico n={icon} c="#0052C9" s={18} /></span>
          <div>
            <h3 className="sm:mt-4 font-display text-[16px] sm:text-[17px] font-bold leading-snug text-[#0B1530]">{title}</h3>
            <p className="mt-1 sm:mt-2 text-[14px] sm:text-[14.5px] leading-relaxed text-[#5B6680]">{text}</p>
          </div>
        </Rise>
      ))}
    </Stagger>
  </Band>
);

export const Faq = () => {
  const signup = useSignup();
  // With self sign-up open, the first answer is "sign up free"; otherwise the sales-led answer.
  const faqs = signup ? [[FAQS[0][0], `Sign up free and start on the ${signup.plan?.name || "Free"} plan (${planSummary(signup.plan)}). For bigger events, write to us: we quote and set it up with you.`], ...FAQS.slice(1)] : FAQS;
  return (
    <Band id="faq">
      <SectionHead kicker="FAQ" title="Questions organizers ask." text="The short answers. For anything else, write to us." />
      <div className="pl-reveal mt-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px] items-start">
        <div className="relative overflow-hidden rounded-[20px] bg-white border border-[#E4E8F0]">
          <div aria-hidden="true" className="absolute bottom-0 left-0 pointer-events-none"><Checker cols={9} rows={4} size={12} colors={["#DCE7FD", "#E6EEFD"]} corner="bl" reach={0.7} /></div>
          {faqs.map(([q, a], i) => (
            <details key={q} open={i === 0} className="group relative border-t-2 border-dashed border-[#E4E8F0] first-of-type:border-t-0">
              <summary className="flex items-center gap-4 px-5 sm:px-7 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-[#F7F9FD] transition-colors">
                <span className="inline-flex items-center justify-center h-6 min-w-7 px-1.5 rounded-md bg-[#E6EEFD] text-[#0052C9] text-[11px] font-bold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 font-display text-[16px] font-bold leading-snug text-[#0B1530]">{q}</span>
                <span className="w-8 h-8 rounded-full border border-[#E4E8F0] flex items-center justify-center flex-none transition-transform duration-300 group-open:rotate-45"><Plus size={15} color="#0052C9" /></span>
              </summary>
              <p className="relative px-5 sm:px-7 pb-6 pl-[60px] sm:pl-[72px] -mt-1 text-[15px] leading-relaxed text-[#5B6680] max-w-[760px]">{a}</p>
            </details>
          ))}
        </div>
        <aside className="lg:sticky lg:top-24 relative overflow-hidden rounded-[20px] bg-[#071B43] text-white p-6 flex flex-col gap-4">
          <div aria-hidden="true" className="absolute top-0 right-0 pointer-events-none"><Checker {...CK.navy} corner="tr" /></div>
          <p className="relative text-xs font-semibold tracking-[0.14em] text-[#7FA6FF]">STILL DECIDING?</p>
          <p className="relative font-display text-xl font-bold leading-snug">Tell us about your event and we'll show you how it would run.</p>
          <div className="relative flex flex-col gap-2.5">
            <TicketCta href="#contact" tone="light" className="w-full [&>span:first-child]:flex-1 [&>span:first-child]:justify-center">Talk to us</TicketCta>
            <TicketCta to="/events" tone="ghost" icon="calendar-days" className="w-full [&>span:first-child]:flex-1 [&>span:first-child]:justify-center">Browse events</TicketCta>
          </div>
        </aside>
      </div>
    </Band>
  );
};

/* ── Contact (dark) ────────────────────────────────────────────────────── */

const field = "font-normal text-[15px] px-3.5 py-[13px] border border-[#E1E6EE] rounded-xl bg-[#FAFBFD] outline-none focus:border-[#0052C9] focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,82,201,0.1)] transition";
const SIZES = ["Under 100", "100–200", "200–500", "500–1,000", "1,000+", "Not sure yet"];

/** The form's fields; `values` renders a read-only copy (the half that tears away after sending). */
const ContactFields = ({ values }) => {
  const ro = values ? { readOnly: true, tabIndex: -1 } : {};
  const v = (k) => (values ? { defaultValue: values[k] || "" } : {});
  return (
    <>
      <label className="relative flex flex-col gap-2">Your name<input name="name" required maxLength={120} autoComplete="name" className={field} {...v("name")} {...ro} /></label>
      <label className="relative flex flex-col gap-2">Email<input name="email" type="email" required maxLength={200} autoComplete="email" className={field} {...v("email")} {...ro} /></label>
      <label className="flex flex-col gap-2">Event name<input name="event" maxLength={200} className={field} {...v("event")} {...ro} /></label>
      <label className="flex flex-col gap-2">Expected attendees
        <select name="size" defaultValue={values?.size || "200–500"} disabled={!!values} className={field}>{SIZES.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      <label className="col-span-full flex flex-col gap-2">What do you need?<textarea name="need" rows={5} maxLength={4000} placeholder="Dates and city, papers, sponsors, check-in desks…" className={`${field} resize-y`} {...v("need")} {...ro} /></label>
    </>
  );
};

const FORM_PART = "pl-cut-stub bg-white text-[#1F2A44] rounded-b-[22px] lg:rounded-bl-none lg:rounded-r-[22px] p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-[18px] text-sm font-medium content-start";

/**
 * Contact as one ticket: the blue stub (left) carries the pitch, the white main part (right) is the
 * form. On send the form half tears off at the perforation and flies away; the stub stays as the
 * visitor's half, stamped with their ticket number, and the confirmation shows where the form was.
 * Sends through FormSubmit (FORM_ENDPOINT); if that fails, the visitor can email us instead.
 */
export const Contact = () => {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [sent, setSent] = useState(null);

  const mailtoFor = (f) =>
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Planyt setup: ${f.event || "new event"}`)}&body=${encodeURIComponent(`Name: ${f.name}\nEmail: ${f.email}\nEvent: ${f.event}\nExpected attendees: ${f.size}\n\n${f.need}`)}`;

  const send = async (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    if (f._honey) return; // spam bots fill hidden fields
    setStatus("sending");
    try {
      // Saved in Planyt (Admin → Setup requests); the team and the sender both get an email.
      const res = await fetch(leadsUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: f.name, email: f.email, event: f.event, size: f.size, need: f.need, source: window.location.host }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j?.data?.ref) throw new Error(j.message || "Not sent");
      setSent({ ...f, ref: j.data.ref });
      setStatus("sent");
    } catch {
      setSent(f);
      setStatus("error");
    }
  };

  const done = status === "sent";
  return (
    <Band id="contact" dark>
      <div className="pl-reveal flex flex-col lg:flex-row lg:min-h-[520px]">
        {/* stub: the pitch, stamped with the ticket number once sent */}
        <div className={`pl-cut-main relative lg:w-[400px] flex-none overflow-hidden rounded-t-[22px] lg:rounded-tr-none lg:rounded-l-[22px] bg-[#0052C9] text-white p-7 sm:p-9 flex flex-col ${done ? "pl-tear-jolt" : ""}`}>
          <div aria-hidden="true" className="absolute top-0 right-0 pointer-events-none"><Checker cols={9} rows={6} size={14} colors={["rgba(255,255,255,.16)", "rgba(255,255,255,.08)"]} corner="tr" reach={0.85} /></div>
          {done ? (
            <div key="done" className="pl-fade relative" style={{ animationDelay: "1s" }}>
              <p className="text-xs font-bold tracking-[0.16em] text-white/75">REQUEST RECEIVED</p>
              <h2 className="mt-4 font-display font-bold leading-[1.1] tracking-[-0.03em]" style={{ fontSize: "clamp(28px,3vw,38px)" }}>You've got your half.</h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-white/85">Keep this ticket number. It's on our half too.</p>
            </div>
          ) : (
            <div key="idle" className="relative">
              <p className="text-xs font-bold tracking-[0.16em] text-white/75">CONTACT</p>
              <h2 className="mt-4 font-display font-bold leading-[1.1] tracking-[-0.03em]" style={{ fontSize: "clamp(28px,3vw,38px)" }}>Plan your setup with us.</h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-white/85">Tell us about your event and we'll send a quote.</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="mt-5 inline-flex items-center gap-2.5 font-semibold text-[15px] text-white hover:text-[#DCE7FD]"><Mail size={17} />{CONTACT_EMAIL}</a>
            </div>
          )}
          <div className="relative mt-auto pt-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold tracking-[0.16em] text-white/70">ADMIT ONE · SETUP REQUEST</p>
              <p className="mt-1 font-semibold tabular-nums whitespace-nowrap">No. {done ? sent.ref : "— — — —"}</p>
            </div>
            <span className={`rounded-xl bg-white p-2 transition-opacity duration-700 ${done ? "opacity-100" : "opacity-30"}`}><FakeQr size={done ? 64 : 44} ink="#0B1530" /></span>
          </div>
        </div>

        {/* tear line */}
        <div aria-hidden="true" className="relative z-10 flex-none h-0 lg:h-auto lg:w-0">
          <span className="absolute left-6 right-6 top-0 border-t-2 lg:border-t-0 lg:left-0 lg:right-auto lg:top-6 lg:bottom-6 lg:border-l-2 border-dashed border-[#CBDDFE]" />
        </div>

        {/* main part: the form; once sent, its copy tears away and the confirmation is underneath */}
        <div className="relative flex-1 min-w-0">
          {done ? (
            <>
              <div className="h-full min-h-[380px] flex flex-col justify-center p-7 sm:p-10" role="status" aria-live="polite">
                <div className="pl-fade" style={{ animationDelay: "1.1s" }}>
                  <p className="flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-[#7FA6FF]"><span className="w-5 h-5 rounded-full bg-[#16A34A] flex items-center justify-center"><Ico n="check" c="#fff" s={12} /></span>SENT TO OUR TEAM</p>
                  <h3 className="mt-4 font-display font-bold tracking-[-0.03em] leading-[1.1] text-[clamp(26px,2.8vw,36px)]">We've got ours.</h3>
                  <p className="mt-4 text-[15.5px] leading-relaxed text-[#C9D6EE] max-w-[440px]">
                    Thanks, {sent.name.split(" ")[0]}. We've emailed <span className="text-white font-semibold">{sent.email}</span> your reference, and we'll reply within one working day with a quote{sent.event ? ` for ${sent.event}` : ""}.
                  </p>
                  <TicketCta tone="light" icon="refresh-ccw" className="mt-7" onClick={() => { setStatus("idle"); setSent(null); }}>Send another request</TicketCta>
                </div>
              </div>
              <div aria-hidden="true" className={`pl-tear-send absolute inset-0 ${FORM_PART}`}>
                <ContactFields values={sent} />
                <div className="col-span-full flex items-center gap-4"><TicketCta type="button" tabIndex={-1}>Sending…</TicketCta></div>
              </div>
            </>
          ) : (
            <form onSubmit={send} className={`relative h-full ${FORM_PART}`}>
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] w-px h-px opacity-0" />
              <ContactFields />
              <div className="col-span-full flex items-center gap-4 flex-wrap">
                <TicketCta disabled={status === "sending"} className="disabled:opacity-70">{status === "sending" ? "Sending…" : "Send to our team"}</TicketCta>
                {status === "error" ? (
                  <span className="text-[13px] font-normal text-[#b91c1c]">
                    Couldn't send just now. <a href={mailtoFor(sent || {})} className="underline font-semibold">Email us instead</a>, the details are filled in.
                  </span>
                ) : (
                  <span className="text-[13px] font-normal text-[#8A94AA]">We reply within one working day.</span>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </Band>
  );
};

/* ── Closing call to action (light) ────────────────────────────────────── */

export const FinalCta = () => {
  const signup = useSignup();
  return (
    <Band>
      <div className={`pl-reveal relative overflow-hidden rounded-[20px] px-6 py-10 sm:px-12 sm:py-12 flex flex-wrap gap-8 items-center justify-between ${L.card}`}>
        <div className="absolute top-0 right-0 bottom-0 flex items-start pointer-events-none"><Checker {...CK.cta} corner="tr" /></div>
        <div className="relative max-w-[620px]">
          <h2 className="font-display font-bold leading-[1.12] tracking-[-0.03em] text-[#0B1530] [text-wrap:balance]" style={{ fontSize: "clamp(28px,3.2vw,40px)" }}>Set up your next event this week.</h2>
          <p className={`mt-4 text-base leading-relaxed ${L.text}`}>{signup ? "Sign up free and set up your first event today. Running something bigger? Talk to us." : "Tell us about your event. We send a quote, set up your organizer account and share the login."}</p>
        </div>
        <div className="relative flex gap-2.5 flex-wrap items-center">
          {signup ? <><Magnetic><TicketCta to={START_FREE}>Start free</TicketCta></Magnetic><TicketCta href="#contact" tone="outline" icon="message-circle">Talk to us</TicketCta></> : <Magnetic><TicketCta href="#contact">Request access</TicketCta></Magnetic>}
          <TicketCta to="/login" tone="outline" icon="user-check">Organizer log in</TicketCta>
          <TicketCta to="/events" tone="outline" icon="calendar-days">Browse events</TicketCta>
        </div>
      </div>
    </Band>
  );
};

/* ── Footer (dark) ─────────────────────────────────────────────────────── */

const FOOT = [
  ["EXPLORE", [["Events", "/"], ["Website builder", "#website"], ["How it works", "#how"], ["Pricing", "#pricing"]]],
  ["PORTALS", [["Sponsor portal", "/sponsor-login"], ["Volunteer portal", "/volunteer/login"], ["Sign in", "/login"]]], // the one sign-in window, opened on that view
  ["COMPANY", [["Security & data", "#trust"], ["Help", "#faq"], ["Request access", "#contact"]]],
  ["LEGAL", [["Terms", "/terms"], ["Privacy", "/privacy-policy"]]],
];

export const HomeFooter = () => (
  <footer data-dark="1" data-public-footer className="relative overflow-hidden bg-[#071B43] text-[#AFBEDB] border-t border-white/[0.06]">
    <div className="absolute top-0 right-0 pointer-events-none"><Checker {...CK.hero} corner="tr" /></div>
    <div className="relative max-w-[1200px] mx-auto px-4 sm:px-8 pt-20">
      <div className="grid gap-10" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))" }}>
        <div className="col-span-full sm:col-span-2 flex flex-col gap-5">
          <img src={brandLogoSrc("horizontal-tagline", "dark")} alt="Planyt, event platform" className="h-10 w-auto self-start" />
          <p className="text-sm leading-[1.65] max-w-[320px]">Registration, papers, check-in and certificates for conferences, workshops and seminars.</p>
        </div>
        {FOOT.map(([head, links]) => (
          <div key={head} className="flex flex-col gap-3 text-sm">
            <div className="text-xs font-semibold tracking-[0.16em] text-[#7D90B8] mb-1">{head}</div>
            {links.map(([l, to]) => (to.startsWith("#")
              ? <a key={l} href={to} className="text-[#DCE6FA] hover:text-white">{l}</a>
              : <Link key={l} to={to} className="text-[#DCE6FA] hover:text-white">{l}</Link>))}
          </div>
        ))}
      </div>
      <div className="mt-16 py-6 border-t border-white/[0.08] flex justify-between gap-4 flex-wrap text-[13px] text-[#7D90B8]">
        <span>© {new Date().getFullYear()} Planyt. All rights reserved.</span>
        <span className="flex items-center gap-2"><Users size={15} />Built for academic and professional events</span>
      </div>
      <img src={brandLogoSrc("wordmark", "dark")} alt="" aria-hidden="true" className="block w-full h-auto opacity-[0.05] -mb-[3%]" />
    </div>
  </footer>
);

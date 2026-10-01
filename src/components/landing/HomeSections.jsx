import React, { useEffect, useState } from "react";
import { Link } from "./link";
import { BadgeCheck, Mail, Users } from "lucide-react";
import { Checker, CK, Dither, Ico, TicketCta } from "./kit";
import { Band, SectionHead, THEME } from "./Band";
import { CONTACT_EMAIL, EVENT_TYPES, FAQS, ROLE_CARDS } from "./content";
import { brandLogoSrc } from "./BrandLogo";

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

const RP = [
  { bg: "#071B43", fg: "#fff", sub: "#A2C3FF", tx: "#C9D6EE", tile: "rgba(255,255,255,.1)", tileFg: "#A2C3FF", ck: ["#14306E", "#1A3B82", "#0F2860"] },
  { bg: "#0052C9", fg: "#fff", sub: "#DCE7FD", tx: "#E9F0FF", tile: "rgba(255,255,255,.16)", tileFg: "#fff", ck: ["#2D74E0", "#1A66DB", "#4A88E8"] },
  { bg: "#1A3B82", fg: "#fff", sub: "#A2C3FF", tx: "#C9D6EE", tile: "rgba(255,255,255,.12)", tileFg: "#A2C3FF", ck: ["#2B4A8C", "#22407C", "#335399"] },
  { bg: "#0B1530", fg: "#fff", sub: "#7FA6FF", tx: "#C3CCDB", tile: "rgba(255,255,255,.08)", tileFg: "#A2C3FF", ck: ["#1E2738", "#262F42", "#18202F"] },
  { bg: "#003E99", fg: "#fff", sub: "#BFD3FF", tx: "#DCE7FD", tile: "rgba(255,255,255,.14)", tileFg: "#fff", ck: ["#1F57B5", "#1A4FA8", "#2C63C2"] },
];

export const Roles = () => {
  const [role, setRole] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    const t = setTimeout(() => setRole((r) => (r + 1) % ROLE_CARDS.length), 7000);
    return () => clearTimeout(t);
  }, [role, paused]);
  const rd = ROLE_CARDS[role], rp = RP[role];
  return (
    <Band id="roles">
      <SectionHead kicker="EVERYONE AT THE EVENT" title="A place for every role." text="Volunteers don't need revenue and reviewers don't need the registration list. Each role signs in to a screen built for its job." />
      <div role="tablist" aria-label="Roles" className="pl-reveal mt-8 flex w-fit max-w-full overflow-x-auto [scrollbar-width:none] gap-1 p-[5px] bg-white border border-[#E4E8F0] rounded-2xl">
        {ROLE_CARDS.map((r, i) => {
          const on = i === role;
          return (
            <button key={r.name} type="button" role="tab" aria-selected={on} onClick={() => setRole(i)}
              className={`relative shrink-0 overflow-hidden text-sm font-semibold px-4 py-2.5 rounded-[11px] flex items-center gap-2 transition-all duration-300 ${on ? "pl-ticket [--n:5px] bg-[#071B43] text-white" : "text-[#5B6680] hover:text-[#0B1530]"}`}>
              <Ico n={r.icon} s={16} />{r.name}
              <span className="absolute left-2.5 right-2.5 bottom-[3px] h-0.5 rounded overflow-hidden">
                {on && <span key={`${i}${paused}`} className={`block h-full origin-left bg-[#7FA6FF] ${paused ? "" : "pl-run"}`} style={{ "--t": "7s" }} />}
              </span>
            </button>
          );
        })}
      </div>
      <div className="pl-reveal mt-4" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div key={role} className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="pl-fade relative overflow-hidden rounded-[20px] p-6 sm:p-7 flex flex-col gap-2.5 min-h-[300px]" style={{ background: rp.bg, color: rp.fg }}>
            <div className="absolute top-0 right-0"><Checker cols={9} rows={7} size={16} colors={rp.ck} corner="tr" reach={0.85} /></div>
            <span className="relative w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: rp.tile }}><Ico n={rd.icon} c={rp.tileFg} s={26} /></span>
            <div className="relative mt-auto text-sm font-semibold" style={{ color: rp.sub }}>{rd.who}</div>
            <div className="relative font-display font-extrabold tracking-[-0.04em] leading-[1.02]" style={{ fontSize: "clamp(26px,2.6vw,34px)" }}>{rd.name}</div>
            <p className="relative text-[15px] leading-relaxed max-w-[440px]" style={{ color: rp.tx }}>{rd.desc}</p>
          </div>
          <div className={`pl-fade relative overflow-hidden rounded-[20px] p-6 sm:p-7 flex flex-col gap-6 ${L.card}`} style={{ animationDelay: ".07s" }}>
            <Corner k="blue" />
            <div className="relative">
              <div className="text-xs font-semibold tracking-[0.14em] text-[#6B7690]">WHAT THEY SEE</div>
              <div className="mt-3 grid sm:grid-cols-2 gap-x-6">
                {rd.see.map((t, j) => (
                  <div key={t} className="pl-fade flex gap-3 items-center py-2.5 text-[15px] text-[#1F2A44] border-b border-[#EEF1F6]" style={{ animationDelay: `${0.12 + j * 0.06}s` }}>
                    <span className="w-[26px] h-[26px] rounded-lg bg-[#E6EEFD] flex items-center justify-center flex-none"><Ico n="check" c="#0052C9" s={14} /></span>{t}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mt-auto grid sm:grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#F0F3F9] p-4">
                <div className="text-xs font-semibold tracking-[0.14em] text-[#6B7690]">KEPT FROM THEM</div>
                <p className="mt-2 text-[14.5px] leading-relaxed text-[#43506B]">{rd.kept}</p>
              </div>
              <div className="rounded-2xl bg-[#E6EEFD] p-4">
                <div className="text-xs font-semibold tracking-[0.14em] text-[#0052C9]">HOW THEY SIGN IN</div>
                <p className="mt-2 text-[14.5px] leading-relaxed text-[#14306E]">{rd.access}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Band>
  );
};

/* ── Pricing (dark) ────────────────────────────────────────────────────── */

const PLANS = [
  { name: "Starter", for: "Seminars and workshops", note: "Priced per event, by size", points: ["Registration forms and ticket tiers", "QR passes and check-in desk", "Certificates"] },
  { name: "Professional", for: "Conferences and summits", note: "Per event, or yearly for several", featured: true, points: ["Everything in Starter", "Agenda, live Q&A and polls", "Sponsors, floor plan and stalls", "Volunteer desk and badge printing"] },
  { name: "Academic", for: "Universities and large congresses", note: "Yearly, for your institution", points: ["Everything in Professional", "Call for papers and peer review", "Revisions and presentation scheduling", "Setup help from our team"] },
];
const STEPS = [
  ["mail", "Tell us about your event", "Size, dates, papers, sponsors and how many desks."],
  ["file-text", "Get a quote", "We reply with a price for your event or for the year."],
  ["user-check", "Receive your organizer login", "Planyt sets up your account and shares the credentials."],
];

export const Pricing = () => (
  <Band id="pricing" dark>
    <SectionHead dark kicker="PRICING" title="A plan for every size of event." text="Pricing depends on your event, so we quote it for you. No percentage is taken from your ticket sales, and payments settle in your own account." />
    <div className="pl-reveal mt-10 grid gap-4 items-stretch" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))" }}>
      {PLANS.map((p) => {
        const f = p.featured;
        return (
          <div key={p.name} className={`relative overflow-hidden rounded-[20px] p-6 sm:p-7 flex flex-col gap-5 transition-transform duration-[400ms] ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-1.5 ${f ? "bg-white text-[#0B1530] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]" : D.card}`}>
            <Corner k={f ? "blue" : "navy"} />
            <div className="relative">
              <div className={`text-sm font-semibold ${f ? "text-[#0052C9]" : "text-[#7FA6FF]"}`}>{p.for}</div>
              <div className="mt-1 font-display text-2xl font-bold tracking-[-0.02em]">{p.name}</div>
            </div>
            <div className="relative flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center h-7 px-3 rounded-full text-[13px] font-semibold ${f ? "bg-[#E6EEFD] text-[#0052C9]" : "bg-white/10 text-white"}`}>Custom quote</span>
              <span className={`text-sm ${f ? "text-[#6B7690]" : "text-[#AFBEDB]"}`}>{p.note}</span>
            </div>
            <div className={`relative h-px ${f ? "bg-[#EEF1F6]" : "bg-white/10"}`} />
            <div className={`relative flex flex-col gap-2.5 text-[14.5px] ${f ? "text-[#43506B]" : "text-[#DCE6FA]"}`}>
              {p.points.map((t) => <span key={t} className="flex gap-2.5 items-center"><BadgeCheck size={18} color={f ? "#0052C9" : "#7FA6FF"} className="flex-none" />{t}</span>)}
            </div>
            <TicketCta href="#contact" tone={f ? "blue" : "ghost"} className="relative mt-auto w-full [&>span:first-child]:flex-1 [&>span:first-child]:justify-center">Request a quote</TicketCta>
          </div>
        );
      })}
    </div>
    <ol className={`pl-reveal mt-4 grid gap-5 rounded-[20px] p-6 sm:p-8 ${D.card}`} style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))" }}>
      {STEPS.map(([ic, t, d], i) => (
        <li key={t} className="flex gap-4 items-start">
          <span className="relative w-11 h-11 rounded-[13px] bg-white/10 flex items-center justify-center flex-none"><Ico n={ic} c="#A2C3FF" s={20} /><span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#0052C9] text-white text-[11px] font-bold flex items-center justify-center">{i + 1}</span></span>
          <span><span className="block font-display text-base font-bold text-white">{t}</span><span className="block mt-1 text-sm leading-relaxed text-[#AFBEDB]">{d}</span></span>
        </li>
      ))}
    </ol>
  </Band>
);

/* ── FAQ (light) ───────────────────────────────────────────────────────── */

export const Faq = () => (
  <Band id="faq">
    <SectionHead kicker="FAQ" title="Questions organizers ask." text="The short answers. For anything else, write to us." />
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {FAQS.map(([q, a], i) => (
        <article key={q} className={`pl-reveal relative overflow-hidden rounded-[20px] p-5 sm:p-6 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#B8CEF8] ${L.card}`} style={{ "--d": `${(i % 3) * 60}ms` }}>
          <span className="inline-flex items-center justify-center h-6 min-w-6 px-1.5 rounded-md bg-[#E6EEFD] text-[#0052C9] text-[11px] font-bold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 font-display text-base font-bold leading-snug text-[#0B1530]">{q}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[#5B6680]">{a}</p>
        </article>
      ))}
    </div>
    <div className={`pl-reveal mt-4 rounded-[20px] px-5 py-4 flex flex-wrap items-center gap-3 ${L.card}`}>
      <p className="flex-1 min-w-[220px] text-[15px] font-semibold text-[#0B1530]">Still deciding? Tell us about your event and we'll show you how it would run.</p>
      <TicketCta href="#contact" size="sm">Talk to us</TicketCta>
      <TicketCta to="/" size="sm" tone="outline" icon="calendar-days">Browse events</TicketCta>
    </div>
  </Band>
);

/* ── Contact (dark) ────────────────────────────────────────────────────── */

const field = "font-normal text-[15px] px-3.5 py-[13px] border border-[#E1E6EE] rounded-xl bg-[#FAFBFD] outline-none focus:border-[#0052C9] focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,82,201,0.1)] transition";

export const Contact = () => {
  const send = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const body = `Name: ${f.get("name")}\nEmail: ${f.get("email")}\nEvent: ${f.get("event")}\nExpected attendees: ${f.get("size")}\n\n${f.get("need")}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Planyt setup: ${f.get("event") || "new event"}`)}&body=${encodeURIComponent(body)}`;
  };
  return (
    <Band id="contact" dark>
      <div className="pl-reveal grid gap-10 lg:gap-14 items-start lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="flex flex-col gap-5">
          <div className={`text-xs font-semibold tracking-[0.16em] ${D.eyebrow}`}>CONTACT</div>
          <h2 className="font-display font-bold leading-[1.12] tracking-[-0.03em]" style={{ fontSize: "clamp(28px,3.2vw,40px)" }}>Plan your setup with us.</h2>
          <p className={`text-base leading-[1.65] max-w-[440px] ${D.text}`}>Tell us about your event: size, papers, sponsors, how many desks. We'll reply with a quote and, when you're ready, your organizer login.</p>
          <div className={`rounded-[22px] p-5 ${D.card}`}>
            <div className="text-xs font-semibold tracking-[0.14em] text-[#7FA6FF]">HELPFUL TO INCLUDE</div>
            <ul className="mt-3 grid sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-[#DCE6FA]">
              {["Event dates and city", "Expected attendees", "Papers and peer review?", "Sponsors and exhibition?", "Number of check-in desks", "Single event or several a year"].map((t) => (
                <li key={t} className="flex gap-2 items-center"><Ico n="check" c="#7FA6FF" s={14} />{t}</li>
              ))}
            </ul>
          </div>
          <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2.5 self-start text-white hover:text-[#A2C3FF] font-semibold text-[15px]"><Mail size={17} />{CONTACT_EMAIL}</a>
        </div>
        <form onSubmit={send} className="relative overflow-hidden bg-white text-[#1F2A44] rounded-[20px] p-6 sm:p-8 grid gap-[18px] text-sm font-medium content-start" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
          <Corner k="blue" />
          <label className="relative flex flex-col gap-2">Your name<input name="name" required autoComplete="name" className={field} /></label>
          <label className="relative flex flex-col gap-2">Email<input name="email" type="email" required autoComplete="email" className={field} /></label>
          <label className="flex flex-col gap-2">Event name<input name="event" className={field} /></label>
          <label className="flex flex-col gap-2">Expected attendees
            <select name="size" defaultValue="200–500" className={field}>{["Under 100", "100–200", "200–500", "500–1,000", "1,000+"].map((o) => <option key={o}>{o}</option>)}</select>
          </label>
          <label className="col-span-full flex flex-col gap-2">What do you need?<textarea name="need" rows={5} placeholder="Papers and review, sponsors, number of desks…" className={`${field} resize-y`} /></label>
          <div className="col-span-full flex items-center gap-4 flex-wrap">
            <TicketCta>Send to our team</TicketCta>
            <span className="text-[13px] font-normal text-[#8A94AA]">Opens your email app with the details filled in.</span>
          </div>
        </form>
      </div>
    </Band>
  );
};

/* ── Closing call to action (light) ────────────────────────────────────── */

export const FinalCta = () => (
  <Band>
    <div className={`pl-reveal relative overflow-hidden rounded-[20px] px-6 py-10 sm:px-12 sm:py-12 flex flex-wrap gap-8 items-center justify-between ${L.card}`}>
      <div className="absolute top-0 right-0 bottom-0 flex items-start pointer-events-none"><Checker {...CK.cta} corner="tr" /></div>
      <div className="relative max-w-[620px]">
        <h2 className="font-display font-bold leading-[1.12] tracking-[-0.03em] text-[#0B1530] [text-wrap:balance]" style={{ fontSize: "clamp(28px,3.2vw,40px)" }}>Set up your next event this week.</h2>
        <p className={`mt-4 text-base leading-relaxed ${L.text}`}>Tell us about your event. We send a quote, set up your organizer account and share the login.</p>
      </div>
      <div className="relative flex gap-2.5 flex-wrap items-center">
        <TicketCta href="#contact">Request access</TicketCta>
        <TicketCta to="/login" tone="outline" icon="user-check">Organizer log in</TicketCta>
        <TicketCta to="/" tone="outline" icon="calendar-days">Browse events</TicketCta>
      </div>
    </div>
  </Band>
);

/* ── Footer (dark) ─────────────────────────────────────────────────────── */

const FOOT = [
  ["EXPLORE", [["Events", "/"], ["For organizers", "#top"]]],
  ["PORTALS", [["Sponsor portal", "/sponsor-login"], ["Volunteer portal", "/volunteer/login"], ["Sign in", "/login"]]],
  ["COMPANY", [["About", "#top"], ["Help", "#faq"], ["Contact", "#contact"]]],
  ["LEGAL", [["Terms", "/terms"], ["Privacy", "/privacy-policy"]]],
];

export const HomeFooter = () => (
  <footer data-dark="1" className="relative overflow-hidden bg-[#071B43] text-[#AFBEDB] border-t border-white/[0.06]">
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

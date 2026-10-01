import React, { useEffect, useRef, useState } from "react";
import { Link } from "./link";
import { ArrowRight, ArrowUp, LogOut, Menu, X } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { TicketCta } from "./kit";

/**
 * /landing nav. Transparent on the navy hero, frosted navy once scrolled over dark sections,
 * frosted white over light ones (whatever sits under the bar decides: [data-dark]).
 * Also owns the back-to-top button with its scroll-progress ring.
 */
const NAV = [["how", "How it works"], ["features", "Features"], ["roles", "Roles"], ["pricing", "Pricing"], ["faq", "FAQ"]];

const useNavState = (progRef, ringRef) => {
  const [s, setS] = useState({ scrolled: false, light: false, top: false });
  useEffect(() => {
    let raf = 0;
    const run = () => {
      const y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? y / max : 0;
      if (progRef.current) progRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
      if (ringRef.current) ringRef.current.style.setProperty("--p", `${(p * 100).toFixed(1)}%`);
      const under = document.elementsFromPoint(window.innerWidth / 2, 40).find((el) => !el.closest("[data-navbar]"));
      const light = !!under && !under.closest("[data-dark]");
      const next = { scrolled: y > 24, light, top: y > 700 };
      setS((o) => (o.scrolled === next.scrolled && o.light === next.light && o.top === next.top ? o : next));
    };
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(run); };
    run();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, [progRef, ringRef]);
  return s;
};

/** Id of the section crossing the middle of the viewport (for the active link). */
const useActive = () => {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    [...NAV.map(([id]) => id), "contact"].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    const top = () => window.scrollY < 300 && setActive(null);
    window.addEventListener("scroll", top, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", top); };
  }, []);
  return active;
};

export const HomeNav = ({ user, dashTo, onLogout }) => {
  const progRef = useRef(null), ringRef = useRef(null);
  const { scrolled, light, top } = useNavState(progRef, ringRef);
  const [open, setOpen] = useState(false);
  const active = useActive();

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);

  const lt = light || open;
  const bar = lt ? "bg-white/[0.72] border-[rgba(11,21,48,0.08)]" : scrolled ? "bg-[rgba(7,27,67,0.35)] border-white/[0.08]" : "bg-transparent border-transparent";
  const link = lt ? "text-[#43506B] hover:text-[#0B1530] hover:bg-[rgba(7,27,67,0.06)]" : "text-[#C9D6EE] hover:text-white hover:bg-white/[0.08]";
  const cta = lt ? "bg-[#0052C9] text-white hover:bg-[#003E99] shadow-[0_6px_16px_-6px_rgba(0,82,201,0.55)]" : "bg-white text-[#071B43] hover:bg-[#E9F0FF]";

  return (
    <>
      <div data-navbar="1" className={`fixed inset-x-0 top-0 z-50 border-b transition-[background,border-color] duration-[450ms] ${bar} ${scrolled || lt ? "backdrop-blur-[20px] backdrop-saturate-[1.8]" : ""}`}>
        <nav className={`mx-auto max-w-[1200px] px-4 sm:px-8 flex items-center gap-5 transition-[height] duration-[400ms] ease-[cubic-bezier(.2,.8,.2,1)] ${scrolled ? "h-16" : "h-20"}`}>
          <Link to="/" aria-label="Planyt home" className="relative shrink-0 h-6 w-[110px]">
            <BrandLogo size={24} tone="dark" className={`absolute inset-0 transition-opacity duration-300 ${lt ? "opacity-0" : "opacity-100"}`} alt="Planyt" />
            <BrandLogo size={24} tone="light" className={`absolute inset-0 transition-opacity duration-300 ${lt ? "opacity-100" : "opacity-0"}`} alt="" />
          </Link>
          <div className="hidden lg:flex ml-6 gap-0.5 text-sm font-medium">
            {NAV.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined} className={`px-3.5 py-2 rounded-lg transition-colors ${active === id ? `pl-ticket [--n:5px] ${lt ? "bg-[#E6EEFD] text-[#0052C9]" : "bg-white/[0.12] text-white"}` : link}`}>{label}</a>)}
          </div>
          <div className="ml-auto flex items-center gap-1.5 sm:gap-5 text-sm font-medium">
            <span className="hidden md:block"><TicketCta to="/" size="sm" tone={lt ? "outline" : "ghost"} icon="calendar-days">Browse events</TicketCta></span>
            <a href="#contact" className={`hidden xl:inline ${lt ? "text-[#43506B] hover:text-[#0B1530]" : "text-[#C9D6EE] hover:text-white"}`}>Contact</a>
            {user ? (
              <>
                <Link to={dashTo} className={`hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold transition-colors ${cta}`}>My dashboard <ArrowRight size={15} /></Link>
                <button type="button" onClick={onLogout} aria-label="Log out" className={`hidden sm:inline-flex w-10 h-10 rounded-full items-center justify-center ${lt ? "text-[#43506B] hover:bg-[rgba(7,27,67,0.06)]" : "text-[#C9D6EE] hover:bg-white/10"}`}><LogOut size={16} /></button>
              </>
            ) : (
              <>
                <Link to="/login" className={`hidden md:inline font-semibold ${lt ? "text-[#0B1530] hover:text-[#0052C9]" : "text-white"}`}>Log in</Link>
                <span className="hidden sm:block"><TicketCta href="#contact" size="sm" tone={lt ? "blue" : "light"}>Request access</TicketCta></span>
              </>
            )}
            <button
              type="button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
              className={`lg:hidden w-10 h-10 rounded-full inline-flex items-center justify-center border transition-colors ${lt ? "text-[#0B1530] border-[#E4E8F0] bg-white" : "text-white border-white/20 hover:bg-white/10"}`}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
        <span aria-hidden="true" className={`absolute left-0 -bottom-px h-[2px] w-full origin-left bg-[#0052C9] transition-opacity duration-300 ${lt ? "opacity-100" : "opacity-0"}`} style={{ transform: "scaleX(0)" }} ref={progRef} />
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white pt-24 pb-8 px-4 sm:px-8 overflow-y-auto pl-fade">
          <nav aria-label="Sections" className="grid">
            {[...NAV, ["contact", "Contact"]].map(([id, label], i) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)} style={{ animationDelay: `${60 + i * 50}ms` }}
                className="pl-fade flex items-center justify-between py-4 border-b border-[#E4E8F0] font-display text-2xl font-bold text-[#0B1530]">
                {label}<ArrowRight size={20} className="text-[#9AA3B5]" />
              </a>
            ))}
          </nav>
          <div className="mt-8 grid gap-2.5">
            {user ? (
              <>
                <Link to={dashTo} className="h-12 rounded-xl bg-[#0052C9] text-white font-semibold inline-flex items-center justify-center gap-2">My dashboard <ArrowRight size={16} /></Link>
                <button type="button" onClick={onLogout} className="h-12 rounded-xl border border-[#E4E8F0] font-semibold text-[#b91c1c] inline-flex items-center justify-center gap-2"><LogOut size={16} /> Log out</button>
              </>
            ) : (
              <>
                <TicketCta href="#contact" onClick={() => setOpen(false)} className="w-full [&>span:first-child]:flex-1 [&>span:first-child]:justify-center">Request access</TicketCta>
                <Link to="/login" className="h-12 rounded-xl border border-[#E4E8F0] font-semibold text-[#0B1530] inline-flex items-center justify-center">Log in</Link>
                <TicketCta to="/" tone="outline" icon="calendar-days" className="w-full [&>span:first-child]:flex-1 [&>span:first-child]:justify-center">Browse events</TicketCta>
              </>
            )}
          </div>
        </div>
      )}

      <button
        type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" tabIndex={top ? 0 : -1}
        className={`fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-[60] w-14 h-14 rounded-[18px] bg-[#071B43] hover:bg-[#0052C9] flex items-center justify-center shadow-[0_16px_36px_-10px_rgba(7,27,67,0.55),inset_0_0_0_1px_rgba(255,255,255,0.08)] transition-[opacity,transform,background] duration-[450ms] ease-[cubic-bezier(.2,.8,.2,1)] ${top ? "opacity-100" : "opacity-0 translate-y-4 scale-90 pointer-events-none"}`}
      >
        <span ref={ringRef} className="pl-ring absolute inset-1 rounded-[14px]" />
        <span aria-hidden="true" className="absolute top-0 right-0 w-3 h-3 rounded-tr-[18px] overflow-hidden grid grid-cols-2">
          <span className="bg-[#1A3B82]" /><span className="bg-[#0052C9]" /><span /><span className="bg-[#1A3B82]" />
        </span>
        <ArrowUp size={20} className="text-white" />
      </button>
    </>
  );
};

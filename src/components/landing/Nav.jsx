import React, { useEffect, useRef, useState } from "react";
import { Link } from "./link";
import { ArrowRight, ArrowUp, LogOut, Menu, X } from "lucide-react";
import { Logo } from "./pixels";

/**
 * The nav: a dark glass capsule floating over every section, tightening once scrolled. The link of
 * the section under the middle of the screen is marked, and a thin line along the bottom shows how
 * far down the page you are; phones get a full-screen menu. Also owns the back-to-top ticket.
 */
/** Sections without a link of their own light up the chapter they belong to. */
const PART_OF = { website: "before", badges: "day", certificates: "after", proof: "pricing", contact: "faq" };
const NAV = [["why", "Why Planyt"], ["platform", "Platform"], ["before", "Before"], ["day", "On the day"], ["after", "After"], ["pricing", "Pricing"], ["faq", "FAQ"]];

/** A section link: on the landing page a plain #link scrolls; elsewhere it goes back to the landing page in the app. */
const Sec = ({ base, id, ...p }) => (base ? <Link to={`${base}#${id}`} {...p} /> : <a href={`#${id}`} {...p} />);

/**
 * `base`: "" on the landing page; "/" elsewhere, so the section links lead back to it. At the top of
 * the page the nav floats with no bar (dark text over a light hero, white over a dark one: `onDark`);
 * once you scroll, the navy ticket bar fades in behind it.
 */
export const Nav = ({ user, dashTo, onLogout, base = "", onDark = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [far, setFar] = useState(false);
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  const bar = useRef(null);

  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 40); setFar(window.scrollY > 900);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.current?.style.setProperty("--p", max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    const io = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(PART_OF[e.target.id] || e.target.id)), { rootMargin: "-45% 0px -50% 0px" }) : null;
    [...NAV.map(([id]) => id), ...Object.keys(PART_OF)].forEach((id) => { const el = document.getElementById(id); if (el && io) io.observe(el); });
    const top = () => window.scrollY < 400 && setActive(null);
    window.addEventListener("scroll", top, { passive: true });
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("scroll", top); io?.disconnect(); };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <>
      <nav className={`nav g${scrolled ? " scrolled" : ""}${onDark ? " on-dark" : ""}`} aria-label="Main">
        <div className="bar" ref={bar}>
          <div className="crop" aria-hidden="true"><i /><i /><i /><i /></div><span className="prog" aria-hidden="true" />
          <Link className="brand" to="/" aria-label="Planyt home"><Logo tone={scrolled || onDark ? "white" : "color"} height={scrolled ? 30 : 34} /></Link>
          <div className="links">
            {NAV.map(([id, label]) => <Sec key={id} base={base} id={id} aria-current={active === id ? "true" : undefined} className={active === id ? "on tk" : undefined}>{label}</Sec>)}
          </div>
          {user ? (
            <>
              <Link className="btn tk hide-sm" to={dashTo}><span className="t">My dashboard</span><span className="s">→</span></Link>
              <button type="button" className="icon-btn hide-sm" onClick={onLogout} aria-label="Log out"><LogOut size={16} /></button>
            </>
          ) : (
            <>
              <Link className="login hide-sm" to="/login">Log in</Link>
              <Link className="btn tk hide-sm" to="/signup"><span className="t">Sign up</span><span className="s">→</span></Link>
            </>
          )}
          <button type="button" className="icon-btn menu-btn" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </nav>

      {open && (
        <div className="mmenu">
          <nav aria-label="Sections">
            {NAV.map(([id, label]) => <Sec key={id} base={base} id={id} onClick={() => setOpen(false)}>{label}<ArrowRight size={20} /></Sec>)}
          </nav>
          <div className="mmenu-acts">
            {user ? (
              <>
                <Link className="btn tk" to={dashTo}><span className="t">My dashboard</span><span className="s">→</span></Link>
                <button type="button" className="btn line tk" onClick={onLogout}><span className="t">Log out</span><span className="s"><LogOut size={15} /></span></button>
              </>
            ) : (
              <>
                <Link className="btn tk" to="/signup"><span className="t">Sign up</span><span className="s">→</span></Link>
                <Link className="btn line tk" to="/login"><span className="t">Log in</span><span className="s">→</span></Link>
              </>
            )}
          </div>
        </div>
      )}

      <button type="button" className={`totop btn tk${far ? " on" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" tabIndex={far ? 0 : -1}>
        <span className="t"><ArrowUp size={17} /></span><span className="s">TOP</span>
      </button>
    </>
  );
};

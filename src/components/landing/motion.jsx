import React, { useRef } from "react";
import { MotionConfig, motion as Motion, useMotionValue, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * Landing-page motion (Framer Motion). Same file in em-frontend and planyt-landing-page.
 * Everything respects "reduce motion": MotionConfig drops transforms, and the pointer effects
 * (tilt, magnet, spotlight) switch themselves off.
 */
const EASE = [0.2, 0.8, 0.2, 1];

/** Wrap the page: honours the visitor's reduce-motion setting for every animation below. */
export const MotionRoot = ({ children }) => <MotionConfig reducedMotion="user">{children}</MotionConfig>;

/** Thin Planyt Blue bar along the top that fills as the page scrolls. */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.3 });
  return <Motion.div aria-hidden="true" className="fixed top-0 left-0 right-0 h-[3px] z-[70] origin-left bg-gradient-to-r from-[#0052C9] via-[#1565FF] to-[#6FA1FF]" style={{ scaleX }} />;
};

/**
 * A line of words that rise into place one after another (headlines). Plain CSS (.pl-word), so it
 * plays as soon as the page arrives: with JS the headline (the largest thing on screen) stayed
 * invisible until the scripts loaded, ~2 s on a phone.
 */
export const WordsIn = ({ children, className = "", delay = 0, step = 0.07 }) => {
  const words = String(children).split(" ");
  return words.map((w, i) => (
    <React.Fragment key={i}>
      <span className={`pl-word ${className}`} style={{ animationDelay: `${(delay + i * step).toFixed(2)}s` }}>{w}</span>
      {i < words.length - 1 && " "}
    </React.Fragment>
  ));
};

/** A grid whose <Rise> children come in one after another when it scrolls into view. */
export const Stagger = ({ className = "", style, children, gap = 0.08 }) => (
  <Motion.div className={className} style={style} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }}
    variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}>
    {children}
  </Motion.div>
);

/** Spotlight: a soft glow that follows the pointer across the card (spot = its colour). */
const Spot = ({ color }) => (
  <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
    style={{ background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), ${color}, transparent 45%)` }} />
);
const trackPointer = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

/** One item of a <Stagger>: rises and fades in. `spot` adds the pointer spotlight. */
export const Rise = ({ className = "", style, spot, children, ...rest }) => (
  <Motion.div
    className={`${spot ? "group/spot relative" : ""} ${className}`}
    style={style}
    variants={{ hidden: { opacity: 0, y: 28, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE } } }}
    onPointerMove={spot ? trackPointer : undefined}
    {...rest}
  >
    {spot && <Spot color={spot} />}
    {children}
  </Motion.div>
);

/** Tilts its content in 3D toward the pointer (hero media). */
export const Tilt = ({ className = "", children, max = 6 }) => {
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });
  const move = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 2 * max);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 2 * max);
  };
  return (
    <Motion.div className={className} style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }} onPointerMove={move} onPointerLeave={() => { rx.set(0); ry.set(0); }}>
      {children}
    </Motion.div>
  );
};

/** Lets a button drift a little toward the pointer, springing back on leave. */
export const Magnetic = ({ children, pull = 0.25 }) => {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });
  const move = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * pull);
    y.set((e.clientY - (r.top + r.height / 2)) * pull);
  };
  return (
    <Motion.span ref={ref} className="inline-flex" style={{ x, y }} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </Motion.span>
  );
};

/** The same stagger as props, for lists that must stay <ol>/<li>: <Motion.ol {...STAGGER}><Motion.li {...RISE}>. */
export const STAGGER = { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.12 }, variants: { hidden: {}, show: { transition: { staggerChildren: 0.09 } } } };
export const RISE = { variants: { hidden: { opacity: 0, y: 28, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE } } } };

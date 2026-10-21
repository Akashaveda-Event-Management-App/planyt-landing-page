import { useEffect } from "react";

/** True when the visitor asked for reduced motion. */
export const still = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Adds .is-in to every .pl-reveal element as it scrolls into view. Call once from the page. */
export const useReveal = () => {
  useEffect(() => {
    const els = [...document.querySelectorAll(".pl-reveal")];
    if (!("IntersectionObserver" in window) || still()) { els.forEach((el) => el.classList.add("is-in")); return undefined; }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach((el) => io.observe(el));
    // Pause the pixel twinkle in sections that are off screen (see .pl-idle in the CSS).
    const live = new IntersectionObserver((entries) => entries.forEach((e) => e.target.classList.toggle("pl-idle", !e.isIntersecting)), { rootMargin: "200px 0px" });
    const blocks = [...document.querySelectorAll("main > *, footer")];
    blocks.forEach((b) => { b.classList.add("pl-idle"); live.observe(b); });
    return () => { io.disconnect(); live.disconnect(); };
  }, []);
};

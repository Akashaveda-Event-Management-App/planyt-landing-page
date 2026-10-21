import { useEffect, useState } from "react";
import { signupStatusUrl } from "./api.js";

/** Where "Start free" goes: organizer sign-up, then the start page that applies the Free plan. */
export const START_FREE = "/signup?redirect=/organizer/start";

/**
 * Organizer self sign-up status, read once per page: { open, plan } or null until known.
 * Starts closed so the server render and a failed request both show "Request access", today's flow.
 */
let cached = null;
export const useSignup = () => {
  const [s, setS] = useState(cached);
  useEffect(() => {
    if (cached) return;
    let live = true;
    fetch(signupStatusUrl())
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => { cached = { open: !!j?.data?.open, plan: j?.data?.plan || null }; if (live) setS(cached); })
      .catch(() => {});
    return () => { live = false; };
  }, []);
  return s?.open ? s : null;
};

/** "1 event · up to 100 attendees" from the sign-up plan. */
export const planSummary = (p) =>
  p ? [`${p.max_events} event${p.max_events === 1 ? "" : "s"}`, p.max_attendees_per_event ? `up to ${p.max_attendees_per_event} attendees` : "no attendee cap"].join(" · ") : "";

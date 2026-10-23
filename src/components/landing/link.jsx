import React from "react";

/**
 * This site (planyt.in) only has the landing, terms and privacy pages. Every other route
 * belongs to the Planyt app, so it goes to APP_URL (override with VITE_APP_URL).
 */
export const APP_URL = (import.meta.env.VITE_APP_URL || "https://app.planyt.in").replace(/\/$/, "");
const LOCAL = new Set(["/", "/terms", "/privacy-policy"]);

export const appHref = (to = "/") => (LOCAL.has(to) || to.startsWith("#") ? to : `${APP_URL}${to}`);

export const Link = ({ to, ...rest }) => <a href={appHref(to)} {...rest} />;

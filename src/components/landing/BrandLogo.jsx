import React from "react";

/**
 * The Planyt logo, from public/planyt-logo-pack (see its README.txt for usage rules).
 *
 *   variant  horizontal (default, no tagline) · horizontal-tagline · symbol · stacked · wordmark
 *            ("full" and "mark" are kept for older callers)
 *   tone     light: on white/light surfaces · dark: on navy/photos
 *   size     height in px (the width follows the artwork)
 *
 * The pack says: use the tagline lockup only when the logo is at least 180 px wide.
 */
const PACK = "/planyt-logo-pack";
const FILES = {
  horizontal: { light: "horizontal/planyt-logo-horizontal-no-tagline.svg", dark: "horizontal/planyt-logo-horizontal-no-tagline-on-dark.svg" },
  "horizontal-tagline": { light: "horizontal/planyt-logo-horizontal-primary.svg", dark: "horizontal/planyt-logo-horizontal-on-dark.svg" },
  symbol: { light: "symbol/planyt-symbol-blue.svg", dark: "symbol/planyt-symbol-white.svg" },
  stacked: { light: "stacked/planyt-logo-stacked-primary.svg", dark: "stacked/planyt-logo-stacked-on-dark.svg" },
  wordmark: { light: "wordmark/planyt-wordmark-black.svg", dark: "wordmark/planyt-wordmark-white.svg" },
};
const LEGACY = { full: "horizontal", mark: "symbol" };

export const brandLogoSrc = (variant = "horizontal", tone = "light") => {
  const files = FILES[LEGACY[variant] || variant] || FILES.horizontal;
  return `${PACK}/${files[tone === "dark" ? "dark" : "light"]}`;
};

const BrandLogo = ({ variant = "horizontal", tone = "light", size = 28, className = "", alt = "Planyt" }) => (
  <img
    src={brandLogoSrc(variant, tone)}
    alt={alt}
    style={{ height: size, width: "auto" }}
    className={`block select-none ${className}`}
    draggable={false}
  />
);

export default BrandLogo;

/**
 * planyt.in home: the same page as the app's "/" (copied from em-frontend src/pages/marketing, keep
 * the two in step). Two grounds (white spec sheet, deep navy) alternate by section; styles in
 * ./landing.css (scoped under .lp). App routes (log in, sign up, portals) link out via ./link.
 * Differences from the app: no auth state, no "Browse events", no cookie-settings button.
 */
import React, { useEffect } from "react";
import "./landing.css";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Hub } from "./Hub";
import { Platform } from "./Platform";
import { Chapter } from "./Chapters";
import { SiteSpotlight } from "./SiteSpotlight";
import { OnTheDay } from "./OnTheDay";
import { BadgeSpotlight } from "./BadgeSpotlight";
import { CertSpotlight } from "./CertSpotlight";
import { Proof } from "./Proof";
import { Pricing } from "./Pricing";
import { Contact, Faq, Footer } from "./Closing";
import { APP_URL } from "./link";

const LandingPage = () => {
  useEffect(() => {
    const html = document.documentElement.style;
    html.scrollBehavior = "smooth";
    html.scrollPaddingTop = "96px";
    return () => { html.scrollBehavior = ""; html.scrollPaddingTop = ""; };
  }, []);

  return (
    <div className="lp" data-role="public">
      <p className="launch" role="note"><b className="tk">V2</b><span>Planyt 2.0 launches on <strong>1 November 2026</strong>. You're looking at a preview of the new version.</span></p>
      {/* Signed-in state lives on the app domain; the nav offers Log in and Sign up there. */}
      <Nav user={null} dashTo={`${APP_URL}/login`} onLogout={() => {}} />
      <main>
        <Hero />
        <Hub />
        <Platform />
        <Chapter id="before" />
        <SiteSpotlight />
        <OnTheDay />
        <BadgeSpotlight />
        <Chapter id="after" />
        <CertSpotlight />
        <Pricing />
        <Proof />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

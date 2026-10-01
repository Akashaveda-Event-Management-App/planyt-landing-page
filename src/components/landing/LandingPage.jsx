/**
 * planyt.in home: the same page as the app's /landing (copied from em-frontend
 * src/pages/marketing, keep the two in step). App routes link out via ./link.
 */
import React, { useEffect } from "react";
import { useReveal } from "./useReveal";
import { HomeNav } from "./HomeNav";
import { HeroLaptop } from "./HeroLaptop";
import { HowItWorks } from "./HowItWorks";
import { Features } from "./Features";
import { Contact, DitherMarquee, Faq, FinalCta, HomeFooter, Pricing, Roles } from "./HomeSections";
import { APP_URL } from "./link";

const LandingPage = () => {
  useReveal();
  useEffect(() => {
    const html = document.documentElement.style;
    html.scrollBehavior = "smooth";
    html.scrollPaddingTop = "80px";
    return () => { html.scrollBehavior = ""; html.scrollPaddingTop = ""; };
  }, []);

  return (
    <div className="planyt-home min-h-screen bg-[#F7F8FB] text-[#0B1530] overflow-x-clip" style={{ fontFamily: "var(--font-sans)" }}>
      {/* Signed-in state lives on the app domain; the nav offers Log in there. */}
      <HomeNav user={null} dashTo={`${APP_URL}/login`} onLogout={() => {}} />
      <main>
        <HeroLaptop />
        <DitherMarquee />
        <HowItWorks />
        <Features />
        <Roles />
        <Pricing />
        <Faq />
        <Contact />
        <FinalCta />
      </main>
      <HomeFooter />
    </div>
  );
};

export default LandingPage;

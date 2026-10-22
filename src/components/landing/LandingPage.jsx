/**
 * planyt.in home: the same page as the app's /landing (copied from em-frontend
 * src/pages/marketing, keep the two in step). App routes link out via ./link.
 */
import React, { useEffect } from "react";
import { useReveal } from "./useReveal";
import { MotionRoot, ScrollProgress } from "./motion";
import { HomeNav } from "./HomeNav";
import { HeroLaptop } from "./HeroLaptop";
import { Chapter } from "./Features";
import { Problem } from "./Story";
import { Partners } from "./Partners";
import { WebsiteBuilder } from "./WebsiteBuilder";
import { Contact, Faq, HomeFooter, Pricing, Roles, Trust } from "./HomeSections";
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
    <MotionRoot>
    <div className="planyt-home min-h-screen bg-[#F7F8FB] text-[#0B1530] overflow-x-clip" style={{ fontFamily: "var(--font-sans)" }}>
      <ScrollProgress />
      {/* Signed-in state lives on the app domain; the nav offers Log in there. */}
      <HomeNav user={null} dashTo={`${APP_URL}/login`} onLogout={() => {}} />
      <main>
        <HeroLaptop />
        {/* the story: the problem, then before / on the day / after, then proof */}
        <Problem />
        <Chapter id="before" num="01" kicker="BEFORE THE EVENT" title="Get people in." text="A website, registration, payments and papers, all filling one list." keys={["website", "registrations", "payments", "submissions", "sponsors"]} />
        <WebsiteBuilder />
        <Chapter id="day" num="02" kicker="ON THE DAY" title="Run it without the chaos." text="Every gate, hall and helper on the same live system." keys={["checkin", "badges", "agenda", "engagement", "chat", "volunteers", "vvip"]} />
        <Chapter id="after" num="03" kicker="AFTER THE EVENT" title="Close it out in an afternoon." text="Certificates out, feedback in, numbers ready, everything backed up." keys={["certificates", "forms", "analytics"]} />
        <Roles />
        <Partners><Trust /></Partners>
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <HomeFooter />
    </div>
    </MotionRoot>
  );
};

export default LandingPage;

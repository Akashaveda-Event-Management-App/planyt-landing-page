import { createFileRoute } from "@tanstack/react-router";
import Header from "../components/planyt/Header";
import Hero from "../components/planyt/Hero";
import Stats from "../components/planyt/Stats";
import About from "../components/planyt/About";
import Features from "../components/planyt/Features";
import EventTypes from "../components/planyt/EventTypes";
import AppSection from "../components/planyt/AppSection";
import Pricing from "../components/planyt/Pricing";
import FAQ from "../components/planyt/FAQ";
import Contact from "../components/planyt/Contact";
import CTABanner from "../components/planyt/CTABanner";
import Footer from "../components/planyt/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:title", content: "Planyt | Event Management Software for Modern Organizers" },
      { property: "og:description", content: "Stop juggling spreadsheets. Planyt handles registration, ticketing, engagement, and post-event analytics—all in one place." },
      { property: "og:url", content: "https://planyt.in" },
      { name: "twitter:title", content: "Planyt - Run Better Events Faster" },
      { name: "twitter:description", content: "Event management software built for organizers. Handle registration, payments, check-ins, and analytics in one platform." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <Hero />
      <Stats />
      <About />
      <Features />
      <EventTypes />
      <AppSection />
      <Pricing />
      <FAQ />
      <Contact />
      <CTABanner />
      <Footer />
      
      {/* Structured Data - Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Planyt",
          "url": "https://planyt.in",
          "logo": "https://planyt.in/logo.png",
          "description": "Event management software for modern organizers",
          "foundingDate": "2025",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-XXXXXXXXXX",
            "contactType": "Customer Support",
            "email": "contact@planyt.in"
          },
          "sameAs": [
            "https://linkedin.com/company/planyt",
            "https://twitter.com/PlanytApp"
          ]
        })}
      </script>

      {/* Structured Data - SoftwareApplication Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Planyt",
          "description": "All-in-one event management platform for registration, ticketing, engagement, and analytics",
          "url": "https://planyt.in",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "description": "Free trial available"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "150"
          }
        })}
      </script>

      {/* Structured Data - LocalBusiness Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Planyt",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Bangalore",
            "addressCountry": "IN"
          },
          "email": "contact@planyt.in",
          "url": "https://planyt.in"
        })}
      </script>
    </>
  );
}

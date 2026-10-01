import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "../components/landing/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:title", content: "Planyt for organizers: registration, papers, check-in and certificates in one place" },
      { property: "og:description", content: "Run your conference on Planyt: registration and payments to your own account, call for papers and peer review, agenda, QR check-in, live Q&A, sponsors and certificates." },
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
      <LandingPage />
      
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
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "description": "Priced per event or per year; quote on request"
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

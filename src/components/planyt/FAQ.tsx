import { useState } from "react";

const faqs = [
  { q: "How quickly can I set up my first event?", a: "Most events can be set up in under 30 minutes using our guided setup wizard. Our templates and smart defaults help you get started immediately." },
  { q: "Do you offer custom integrations?", a: "Yes! We have a robust API and can create custom integrations with your existing tools like CRM, marketing automation, and payment systems." },
  { q: "What kind of support do you provide?", a: "We offer email support for all plans, priority support for Professional users, and dedicated phone support for Enterprise customers. Our team is available 24/7 during events." },
  { q: "Can I use my own branding?", a: "Absolutely! All plans include custom branding options. Enterprise customers get complete white-label solutions." },
  { q: "Is my data secure?", a: "Security is our top priority. We're SOC 2 compliant, GDPR compliant, and use enterprise-grade encryption for all data." },
  { q: "Do you support hybrid and virtual events?", a: "Yes! Our platform supports in-person, virtual, and hybrid events with seamless attendee experiences across all formats." },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      <section className="section faq-section">
        <div className="section-inner">
          <div className="section-header">
            <div className="tag">FAQ</div>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about Planyt. Can't find what you're looking for? Chat with our team.</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div className={`faq-item${openIdx === i ? " open" : ""}`} key={i}>
                <button className="faq-btn" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                  <span className="faq-q">{faq.q}</span>
                  <span className="faq-chevron">▾</span>
                </button>
                <div className="faq-ans"><p>{faq.a}</p></div>
              </div>
            ))}
          </div>
          <div className="faq-footer">
            <p>Still have questions?</p>
            <button className="btn-outline" style={{ padding: "0.65rem 1.75rem" }}>Contact Support</button>
          </div>
        </div>
      </section>

      {/* FAQ Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </>
  );
}

const cards = [
  { icon: "✓", title: "Tailored Features", desc: "Get exactly what you need with our modular feature set designed around your workflow.", bg: "#dbeafe" },
  { icon: "🤝", title: "Dedicated Support", desc: "Expert assistance to ensure your event runs smoothly from setup to post-event reporting.", bg: "#ede9fe" },
  { icon: "🚀", title: "Scalable Platform", desc: "From small meetups to global conferences, Planyt grows with you every step of the way.", bg: "#dcfce7" },
];

export default function Pricing() {
  return (
    <section id="pricing" className="section pricing-section">
      <div className="section-inner">
        <div className="section-header">
          <div className="tag">Pricing</div>
          <h2>Get Started with Planyt</h2>
          <p>We offer flexible solutions tailored to your specific event needs. Contact us to discuss your requirements and get a custom quote.</p>
        </div>
        <div className="pricing-cta">
          <a href="#contact" className="btn-primary" style={{ padding: "0.85rem 2rem", fontSize: "1rem", textDecoration: "none" }}>Contact Sales</a>
          <a href="https://app.planyt.in" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: "0.85rem 2rem", fontSize: "1rem", textDecoration: "none" }}>Start Free Trial</a>
        </div>
        <div className="pricing-cards">
          {cards.map((c) => (
            <div className="pc" key={c.title}>
              <div className="pc-icon" style={{ background: c.bg }}><span style={{ fontSize: "1.2rem" }}>{c.icon}</span></div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

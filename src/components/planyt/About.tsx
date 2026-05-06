const features = [
  { icon: "⚡", title: "Built for Speed", desc: "Set up your event in minutes, not hours. Registration pages, payment processing, and attendee management—all configured and ready to go." },
  { icon: "🔒", title: "Security You Can Trust", desc: "Your data and your attendees' information are encrypted and protected. We follow industry standards and give you full control." },
  { icon: "📊", title: "Real Data That Matters", desc: "See what actually happened at your event. Registration numbers, attendance rates, engagement metrics, and post-event feedback in one place." },
  { icon: "🌍", title: "Works Globally", desc: "Accept payments in 135+ currencies. Support multiple languages. Host events across time zones. Scale from 10 to 10,000 attendees." },
];

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="section-inner">
        <div className="section-header">
          <div className="tag">About Us</div>
          <h2>About <span style={{ color: "var(--blue)" }}>Planyt</span></h2>
          <p>Event organizers waste too much time on logistics. Planyt was built to fix that—giving you the tools to handle the details while you focus on what actually matters: great attendee experiences.</p>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <h3>Our Story</h3>
            <p>We started Planyt because we got frustrated managing events the old way. Spreadsheets breaking, emails getting lost, manual check-ins, post-event data scattered everywhere. We built a better way.</p>
            <p>Today, Planyt powers events of all sizes—from intimate workshops to conferences with thousands of attendees. Our platform handles the heavy lifting: registrations, payments, check-ins, live updates, and post-event analytics. One dashboard. Real insights.</p>
            <p>We keep it simple, straightforward, and honest. No vendor lock-in. No unnecessary features. Just the tools that actually help you run better events.</p>
            <div style={{ marginTop: "1.5rem" }}>
              <a href="#contact" className="btn-outline" style={{ textDecoration: "none", display: "inline-block", padding: "0.7rem 1.5rem" }}>Get in Touch</a>
            </div>
          </div>
          <div className="about-visual">
            <div className="globe-icon">🌐</div>
            <h4 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.75rem" }}>Global Event Solutions</h4>
            <p style={{ color: "var(--gray-500)", maxWidth: 360, lineHeight: 1.7, fontSize: "0.9rem" }}>Empowering organizers worldwide with scalable technology for in-person, virtual, and hybrid events.</p>
          </div>
        </div>

        <div className="about-features">
          {features.map((f) => (
            <div className="af-card" key={f.title}>
              <div className="af-icon">{f.icon}</div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";

export default function Contact() {
  const [btnState, setBtnState] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnState("sending");
    setTimeout(() => {
      setBtnState("sent");
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setBtnState("idle"), 3000);
    }, 1200);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="contact-blob1" />
      <div className="contact-blob2" />
      <div className="section-inner">
        <div className="section-header">
          <div className="tag">Contact</div>
          <h2>Get in <span style={{ color: "var(--blue)" }}>Touch</span></h2>
          <p>Ready to transform your events? We'd love to hear from you. Reach out and let's make something amazing together.</p>
        </div>
        <div className="contact-grid">
          <div>
            <div className="contact-info-card">
              <div className="ci-deco" />
              <div className="ci-title">Contact Information</div>
              <div className="ci-item">
                <div className="ci-icon blue">✉️</div>
                <div>
                  <div className="ci-label">Email Us</div>
                  <div className="ci-val"><a href="mailto:contact@planyt.in">contact@planyt.in</a></div>
                  <div className="ci-sub">We'll respond within 24 hours</div>
                </div>
              </div>
              <div className="ci-item">
                <div className="ci-icon purple">📍</div>
                <div>
                  <div className="ci-label">Visit Us</div>
                  <div className="ci-val">Bangalore, India</div>
                  <div className="ci-sub">Come say hello at our HQ</div>
                </div>
              </div>
              <div className="ci-divider" />
              <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.75rem" }}>Follow Us</div>
              <div className="social-row">
                <button className="soc-btn">in</button>
                <button className="soc-btn">𝕏</button>
                <button className="soc-btn">f</button>
                <button className="soc-btn">📸</button>
              </div>
            </div>
            <div className="urgent-card">
              <div className="uc-blob" />
              <h3>Need Immediate Help?</h3>
              <p>Our support team is available 24/7 to assist you with any urgent queries.</p>
              <button className="chat-btn">Chat with Support</button>
            </div>
          </div>

          <div className="form-card">
            <h3>Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group" style={{ margin: 0 }}>
                  <label>First Name</label>
                  <input type="text" name="firstName" placeholder="John" required />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label>Last Name</label>
                  <input type="text" name="lastName" placeholder="Doe" required />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <select name="subject">
                  <option>General Inquiry</option>
                  <option>Sales &amp; Pricing</option>
                  <option>Technical Support</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" rows={4} placeholder="Tell us about your event needs..." required />
              </div>
              <button
                type="submit"
                className={`submit-btn${btnState === "sent" ? " success" : ""}`}
                disabled={btnState !== "idle"}
              >
                {btnState === "idle" ? "Send Message" : btnState === "sending" ? "Sending..." : "Message Sent! ✓"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

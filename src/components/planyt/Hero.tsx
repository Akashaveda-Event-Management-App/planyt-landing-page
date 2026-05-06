export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-grid-bg" />
        <div className="hero-blob1" />
        <div className="hero-blob2" />
      </div>
      <div className="hero-inner">
        <div>
          <div className="hero-badge">
            <span className="badge-dot" />
            Event Management Reimagined
          </div>
          <h1 className="hero-title">
            Run better events,<br />
            <span className="gradient">Faster and easier</span>
          </h1>
          <p className="hero-desc">Stop juggling spreadsheets and scattered tools. Planyt handles registration, ticketing, attendee engagement, and post-event analytics—all in one place. Built for event organizers who value their time.</p>
          <div className="hero-cta">
            <a href="https://app.planyt.in" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "0.85rem 2rem", fontSize: "1rem", textDecoration: "none" }}>Start Free Trial</a>
            <button className="btn-demo">
              <span className="play-icon">&#9654;</span>
              Watch Demo
            </button>
          </div>
          <div className="trusted-logos">
            <div className="trusted-label">Trusted by innovative teams</div>
            <div className="logo-row">
              <span className="logo-pill">🌐 GlobalCorp</span>
              <span className="logo-pill">⚡ TechStart</span>
              <span className="logo-pill">🏢 Enterprise</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" role="img" aria-label="Planyt event management dashboard interface showing registration status and attendee engagement metrics">
          <div className="glow" />
          <div className="dashboard-card">
            <div className="db-topbar">
              <div className="db-dot" style={{ background: "#ef4444" }} />
              <div className="db-dot" style={{ background: "#f59e0b" }} />
              <div className="db-dot" style={{ background: "#22c55e" }} />
            </div>
            <div className="db-body">
              <div className="db-header">
                <div className="db-logo">P</div>
                <div className="db-nav">
                  <div className="db-nav-dot" />
                  <div className="db-nav-dot" />
                </div>
              </div>
              <div className="db-grid">
                <div className="db-sidebar">
                  <div className="db-sb-item active" />
                  <div className="db-sb-item" />
                  <div className="db-sb-item" />
                  <div className="db-sb-item" style={{ height: 60, marginTop: "0.5rem" }} />
                </div>
                <div className="db-main">
                  <div className="db-banner">
                    <div className="db-banner-text1" />
                    <div className="db-banner-text2" />
                  </div>
                  <div className="db-cards">
                    <div className="db-small-card" />
                    <div className="db-small-card" />
                  </div>
                  <div className="db-list">
                    <div className="db-list-row" />
                    <div className="db-list-row" />
                    <div className="db-list-row" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="float-badge right">
            <div className="badge-icon green">✓</div>
            <div className="badge-info">
              <p>Status</p>
              <strong>Registration Open</strong>
            </div>
          </div>

          <div className="float-badge left">
            <div className="avatar-stack">
              <div className="avatar av1">SJ</div>
              <div className="avatar av2">MC</div>
              <div className="avatar av3">ER</div>
              <div className="avatar av-count">+1.2k</div>
            </div>
            <div className="badge-info" style={{ marginLeft: "0.5rem" }}>
              <strong>Attendees Joined</strong>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.25rem" }}>
                <span className="live-dot" />
                <span style={{ fontSize: "0.72rem", color: "#22c55e", fontWeight: 600 }}>Live Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

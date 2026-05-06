const appFeatures = [
  { icon: "🌐", title: "Live Networking", desc: "Connect attendees in real-time with smart matching and 1:1 video calls." },
  { icon: "📊", title: "Interactive Polls", desc: "Engage your audience instantly with live polls and Q&A moderation." },
  { icon: "📹", title: "Live Streaming", desc: "Hybrid event capabilities with HD quality and virtual booths." },
  { icon: "💬", title: "Q&A Sessions", desc: "Real-time audience interaction with moderation tools." },
  { icon: "👤", title: "Attendee Profiles", desc: "Rich networking profiles to facilitate meaningful connections." },
  { icon: "🏆", title: "Gamification", desc: "Increase engagement with points, badges, and leaderboards." },
];

export default function AppSection() {
  return (
    <section id="how-it-works" className="section app-section">
      <div className="section-inner">
        <div className="section-header">
          <div className="tag">Platform</div>
          <h2>Seamless Experience on Any Device</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "1.4rem", color: "#facc15" }}>★★★★★</span>
            <span style={{ fontSize: "1.3rem", fontWeight: 700 }}>4.8/5</span>
          </div>
          <p>Access the full power of Planyt directly from your browser. No downloads required.</p>
        </div>

        <div className="app-grid">
          <div className="browser-wrap">
            <div className="app-blob" />
            <div className="browser">
              <div className="browser-bar">
                <div className="bw-dot" style={{ background: "#ef4444" }} />
                <div className="bw-dot" style={{ background: "#f59e0b" }} />
                <div className="bw-dot" style={{ background: "#22c55e" }} />
                <div className="url-bar"><div className="url-dot" /><div className="url-line" /></div>
              </div>
              <div className="browser-content">
                <div className="bc-header">
                  <div className="bc-logo">P</div>
                  <div className="bc-dots"><div className="bc-dot-nav" /><div className="bc-dot-nav" /></div>
                </div>
                <div className="bc-body">
                  <div className="bc-sidebar">
                    <div className="bc-sb active" />
                    <div className="bc-sb" />
                    <div className="bc-sb" />
                    <div className="bc-sb" style={{ height: 50, marginTop: "0.5rem" }} />
                  </div>
                  <div className="bc-main">
                    <div className="bc-hero"><div className="bc-ht1" /><div className="bc-ht2" /></div>
                    <div className="bc-cards2"><div className="bc-card2" /><div className="bc-card2" /></div>
                    <div className="bc-rows"><div className="bc-row" /><div className="bc-row" style={{ width: "80%" }} /><div className="bc-row" style={{ width: "60%" }} /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="app-features">
              {appFeatures.map((f) => (
                <div className="app-feat" key={f.title}>
                  <div className="af-ic">{f.icon}</div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="access-card">
              <div className="access-deco" />
              <h4>Accessible Everywhere</h4>
              <p>No app store downloads needed. Planyt works flawlessly on Chrome, Safari, Firefox, and Edge.</p>
              <div className="browser-types">
                <span>🌐</span>
                <span>Desktop • Tablet • Mobile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

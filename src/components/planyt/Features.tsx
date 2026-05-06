export default function Features() {
  return (
    <section id="features" className="section features-section">
      <div className="section-inner">
        <div className="section-header">
          <div className="tag">Features</div>
          <h2>Comprehensive Event Management</h2>
          <p>Everything you need to create, manage, and execute successful events—from intimate gatherings to large-scale conferences.</p>
        </div>

        <div className="bento">
          {/* Card 1: Large */}
          <div className="bento-card large">
            <h3>Event Creation &amp; Management</h3>
            <p>Complete lifecycle management with an intuitive drag-and-drop builder.</p>
            <div className="pill-row">
              <span className="feature-pill">✓ Multi-track agendas</span>
              <span className="feature-pill">✓ Speaker management</span>
              <span className="feature-pill">✓ Venue mapping</span>
            </div>
            <div className="visual-box">
              <div className="v-calendar">
                <div className="v-row">
                  <div className="v-block blue" style={{ width: "40%" }} />
                  <div className="v-block light" style={{ width: "25%", marginLeft: "auto" }} />
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <div style={{ flex: 1, background: "#fff", borderRadius: 10, border: "1px solid var(--gray-100)", padding: "0.6rem" }}>
                    <div className="v-block" style={{ width: "60%", background: "rgba(37,99,235,0.15)", height: 10, marginBottom: "0.4rem" }} />
                    <div className="v-block light" style={{ width: "80%", height: 6 }} />
                  </div>
                  <div style={{ flex: 1, background: "#fff", borderRadius: 10, border: "1px solid rgba(37,99,235,0.2)", padding: "0.6rem" }}>
                    <div className="v-block blue" style={{ width: "60%", height: 10, marginBottom: "0.4rem" }} />
                    <div className="v-block light" style={{ width: "80%", height: 6 }} />
                  </div>
                  <div style={{ flex: 1, background: "#fff", borderRadius: 10, border: "1px solid var(--gray-100)", padding: "0.6rem" }}>
                    <div className="v-block" style={{ width: "60%", background: "rgba(37,99,235,0.15)", height: 10, marginBottom: "0.4rem" }} />
                    <div className="v-block light" style={{ width: "80%", height: 6 }} />
                  </div>
                </div>
                <div style={{ background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.1)", borderRadius: 10, height: 32, display: "flex", alignItems: "center", padding: "0 0.75rem" }}>
                  <div className="v-block" style={{ width: "50%", background: "rgba(37,99,235,0.2)", height: 6 }} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Small */}
          <div className="bento-card small">
            <h3>Attendee Management</h3>
            <p>Seamless registration, check-in, and engagement tracking.</p>
            <div className="pill-row">
              <span className="feature-pill">✓ QR check-in</span>
              <span className="feature-pill">✓ Custom badges</span>
              <span className="feature-pill">✓ Real-time tracking</span>
            </div>
            <div className="visual-box" style={{ flexDirection: "column", padding: "0.75rem", gap: "0.5rem" }}>
              <div className="v-attendee">
                <div className="v-avatar" style={{ background: "#22c55e" }}>SJ</div>
                <div style={{ flex: 1 }}><div className="v-line" style={{ width: "70%", marginBottom: "0.3rem" }} /><div className="v-line" style={{ width: "45%" }} /></div>
                <div className="v-check">✓</div>
              </div>
              <div className="v-attendee" style={{ opacity: 0.7 }}>
                <div className="v-avatar" style={{ background: "#3b82f6" }}>MC</div>
                <div style={{ flex: 1 }}><div className="v-line" style={{ width: "70%", marginBottom: "0.3rem" }} /><div className="v-line" style={{ width: "45%" }} /></div>
              </div>
              <div className="v-attendee" style={{ opacity: 0.5 }}>
                <div className="v-avatar" style={{ background: "#f59e0b" }}>ER</div>
                <div style={{ flex: 1 }}><div className="v-line" style={{ width: "70%", marginBottom: "0.3rem" }} /><div className="v-line" style={{ width: "45%" }} /></div>
              </div>
            </div>
          </div>

          {/* Card 3: Small */}
          <div className="bento-card small">
            <h3>Virtual &amp; Hybrid Support</h3>
            <p>Connect global audiences with HD streaming and virtual booths.</p>
            <div className="pill-row">
              <span className="feature-pill">✓ Live streaming</span>
              <span className="feature-pill">✓ Virtual booths</span>
              <span className="feature-pill">✓ Networking rooms</span>
            </div>
            <div className="visual-box">
              <div className="v-stream">
                <div className="v-stream-top"><div className="v-play">▶</div></div>
                <div className="v-stream-bottom">
                  <div className="v-thumb" />
                  <div className="v-thumb" />
                  <div className="v-thumb" />
                  <div className="v-thumb" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.55rem", color: "var(--gray-400)" }}>+12</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Large */}
          <div className="bento-card large">
            <h3>Smart Networking</h3>
            <p>AI-powered matchmaking and real-time interaction tools.</p>
            <div className="pill-row">
              <span className="feature-pill">✓ 1:1 Video calls</span>
              <span className="feature-pill">✓ Smart matching</span>
              <span className="feature-pill">✓ Live chat</span>
            </div>
            <div className="visual-box" style={{ background: "#eff6ff", borderColor: "rgba(37,99,235,0.1)" }}>
              <div className="v-chat">
                <div className="v-msg">
                  <div className="v-avatar" style={{ background: "#6366f1", width: 24, height: 24, fontSize: "0.5rem", flexShrink: 0 }}>AK</div>
                  <div className="v-bubble"><div className="v-bubble-line" style={{ width: 100 }} /><div className="v-bubble-line" style={{ width: 70 }} /></div>
                </div>
                <div className="v-msg right">
                  <div className="v-avatar" style={{ background: "#4f46e5", width: 24, height: 24, fontSize: "0.5rem", flexShrink: 0 }}>ME</div>
                  <div className="v-bubble"><div className="v-bubble-line" style={{ width: 80 }} /><div className="v-bubble-line" style={{ width: 110 }} /></div>
                </div>
                <div className="v-msg">
                  <div className="v-avatar" style={{ background: "#6366f1", width: 24, height: 24, fontSize: "0.5rem", flexShrink: 0 }}>AK</div>
                  <div className="v-bubble"><div className="v-bubble-line" style={{ width: 60 }} /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Large */}
          <div className="bento-card large">
            <h3>Interactive Sessions</h3>
            <p>Keep audiences engaged with live polls, Q&amp;A, and gamification.</p>
            <div className="pill-row">
              <span className="feature-pill">✓ Live polling</span>
              <span className="feature-pill">✓ Q&amp;A moderation</span>
              <span className="feature-pill">✓ Leaderboards</span>
            </div>
            <div className="visual-box">
              <div className="v-poll">
                <div className="v-poll-label"><span>Poll Results</span><span style={{ color: "var(--blue)" }}>Live</span></div>
                <div className="v-bar"><div className="v-fill" style={{ width: "75%" }} /></div>
                <div className="v-bar"><div className="v-fill" style={{ width: "45%", background: "var(--indigo)" }} /></div>
                <div className="v-bar"><div className="v-fill" style={{ width: "20%", background: "var(--gray-400)" }} /></div>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                  <div style={{ flex: 1, background: "#eff6ff", borderRadius: 10, height: 30, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>📊</div>
                  <div style={{ flex: 1, background: "#fff7ed", borderRadius: 10, height: 30, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>🏆</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 6: Small */}
          <div className="bento-card small">
            <h3>Registration &amp; Ticketing</h3>
            <p>Flexible ticketing engine with secure payment processing.</p>
            <div className="pill-row">
              <span className="feature-pill">✓ Tiered pricing</span>
              <span className="feature-pill">✓ Discount codes</span>
              <span className="feature-pill">✓ Global payments</span>
            </div>
            <div className="visual-box" style={{ padding: "0.75rem", alignItems: "center" }}>
              <div className="v-ticket">
                <div className="v-ticket-top">
                  <div>
                    <div className="v-ticket-name" style={{ marginBottom: "0.3rem", height: 6, width: 80 }} />
                    <div style={{ height: 14, width: 100, background: "rgba(255,255,255,0.9)", borderRadius: 99 }} />
                  </div>
                  <div className="v-ticket-icon" />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.4rem" }}><span>Admit One</span><span>$299</span></div>
                <div className="v-ticket-barcode">
                  {[18, 12, 20, 14, 18, 10, 16].map((h, i) => (
                    <div key={i} className="v-barline" style={{ height: h }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Extras bar */}
        <div className="extras-bar">
          <div className="cta-blob1" />
          <h3>Plus Many More Features</h3>
          <div className="extras-grid">
            <div className="extra-item"><div className="extra-icon">💬</div>Communication Tools</div>
            <div className="extra-item"><div className="extra-icon">📈</div>Analytics &amp; Reporting</div>
            <div className="extra-item"><div className="extra-icon">🤝</div>Sponsor &amp; Exhibitor Mgmt</div>
            <div className="extra-item"><div className="extra-icon">🔔</div>Real-time Notifications</div>
            <div className="extra-item"><div className="extra-icon">🎨</div>Custom Websites</div>
          </div>
          <button className="btn-white">View All Features</button>
        </div>
      </div>
    </section>
  );
}

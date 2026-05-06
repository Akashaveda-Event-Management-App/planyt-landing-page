import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <>
      <footer className="planyt-footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.5rem", fontWeight: 800, color: "#fff" }}>
                Plan<span style={{ color: "rgba(96,165,250,1)" }}>yt</span>
              </div>
              <p>Everything you need to host, manage, and analyze events. From registration to post-event insights, we've got you covered.</p>
              <div className="foot-social">
                <button className="foot-soc">in</button>
                <button className="foot-soc">𝕏</button>
                <button className="foot-soc">f</button>
                <button className="foot-soc">📸</button>
              </div>
            </div>
            <div>
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#">Event App</a></li>
                <li><a href="#">Integrations</a></li>
                <li><a href="#">Sponsor Login</a></li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Press Kit</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4>Legal</h4>
              <ul>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><a href="#">Cookie Policy</a></li>
                <li><a href="#">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Planyt. All rights reserved.</p>
            <div className="made-with">Made with <span className="heart">❤️</span> for events worldwide</div>
          </div>
        </div>
      </footer>
    </>
  );
}

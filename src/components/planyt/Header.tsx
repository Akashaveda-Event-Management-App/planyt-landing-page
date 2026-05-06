import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="planyt-header">
      <div className="header-inner">
        <a href="#" className="brand">Plan<span>yt</span></a>
        <nav className="pill">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it Works</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="header-actions">
          <a href="https://app.planyt.in" className="btn-primary" target="_blank" rel="noopener noreferrer">Get Started</a>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" style={{ display: undefined }}>
            <span /><span /><span />
          </button>
        </div>
      </div>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
        <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it Works</a>
        <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        <div className="mobile-divider" />
        <a href="https://app.planyt.in" className="btn-primary" style={{ width: "100%", marginTop: "0.5rem", display: "block", textAlign: "center" }} target="_blank" rel="noopener noreferrer">Get Started</a>
      </div>
    </header>
  );
}

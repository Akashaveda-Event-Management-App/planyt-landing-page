export default function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="cta-blob1" />
      <div className="cta-blob2" />
      <div className="cta-inner">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of event organizers who trust Planyt to create exceptional experiences.</p>
        <div className="cta-btns">
          <a href="https://app.planyt.in" target="_blank" rel="noopener noreferrer" className="btn-white" style={{ textDecoration: "none" }}>Start Free Trial</a>
          <button className="btn-ghost-white"><span>▶</span> Watch Demo</button>
        </div>
      </div>
    </section>
  );
}

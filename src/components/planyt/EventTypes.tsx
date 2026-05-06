const types = [
  { icon: "💼", name: "Corporate Events", bg: "#dbeafe", color: "#2563eb" },
  { icon: "🎤", name: "Conferences", bg: "#ede9fe", color: "#7c3aed" },
  { icon: "🏪", name: "Trade Shows", bg: "#dcfce7", color: "#16a34a" },
  { icon: "🤝", name: "Meetings", bg: "#fef9c3", color: "#ca8a04" },
  { icon: "🔧", name: "Workshops", bg: "#fee2e2", color: "#dc2626" },
  { icon: "💡", name: "Seminars", bg: "#e0e7ff", color: "#4f46e5" },
  { icon: "🎓", name: "Academic Events", bg: "#fce7f3", color: "#be185d" },
  { icon: "🏛️", name: "Government Events", bg: "#f3f4f6", color: "#374151" },
  { icon: "👥", name: "Association Events", bg: "#ffedd5", color: "#c2410c" },
];

export default function EventTypes() {
  return (
    <section className="section event-types">
      <div className="section-inner">
        <div className="section-header">
          <h2>Perfect for Every Event Type</h2>
          <p>Whether you're organizing a small workshop or a global conference, Planyt adapts to your needs.</p>
        </div>
        <div className="et-grid">
          {types.map((t) => (
            <div className="et-card" key={t.name}>
              <div className="et-icon" style={{ background: t.bg, color: t.color }}>{t.icon}</div>
              <div className="et-name">{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

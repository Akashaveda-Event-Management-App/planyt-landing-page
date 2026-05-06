const stats = [
  { num: "Scalable", label: "Built for Growth" },
  { num: "Secure", label: "Enterprise Ready" },
  { num: "Global", label: "Multi-Language" },
  { num: "Support", label: "24/7 Assistance" },
];

export default function Stats() {
  return (
    <section className="stats">
      <div className="stats-inner">
        {stats.map((s) => (
          <div key={s.num}>
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

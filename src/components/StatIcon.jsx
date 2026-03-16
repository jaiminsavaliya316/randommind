export default function StatIcon({ letter, value }) {
  const pct = value / 100;
  const r = 14;
  const circ = 2 * Math.PI * r;

  return (
    <div className="stat-icon">
      <svg width="36" height="36" className="stat-icon__ring">
        <circle cx="18" cy="18" r={r} className="stat-icon__track" />
        <circle
          cx="18" cy="18" r={r}
          className="stat-icon__progress"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct)}
        />
      </svg>
      <span className="stat-icon__letter">{letter}</span>
    </div>
  );
}
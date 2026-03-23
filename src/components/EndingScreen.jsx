const STAT_LABELS = [
  { key: "wit",       letter: "W", label: "Wit" },
  { key: "charm",     letter: "C", label: "Charm" },
  { key: "luck",      letter: "L", label: "Luck" },
  { key: "excitement", letter: "E", label: "Excitement" },
  { key: "nerve",     letter: "N", label: "Nerve" },
];

export default function EndingScreen({ ending, stats, onPlayAgain, onBack }) {
  return (
    <div className="page-ending">
      <div className="ending__content">
        <div className="ending__label">THE CAVE</div>
        <h1 className="ending__title">{ending.title}</h1>
        <p className="ending__text">{ending.text}</p>

        <div className="ending__stats">
          <div className="ending__stats-title">Final Stats</div>
          {STAT_LABELS.map(({ key, letter, label }) => (
            <div key={key} className="ending__stat-row">
              <span className="ending__stat-name">{letter} — {label}</span>
              <div className="ending__stat-bar-track">
                <div
                  className="ending__stat-bar-fill"
                  style={{ width: `${stats[key]}%` }}
                />
              </div>
              <span className="ending__stat-value">{stats[key]}</span>
            </div>
          ))}
        </div>

        <div className="ending__actions">
          <button className="ending__btn ending__btn--primary" onClick={onPlayAgain}>
            Play Again
          </button>
          <button className="ending__btn ending__btn--secondary" onClick={onBack}>
            Back to Library
          </button>
        </div>
      </div>
    </div>
  );
}

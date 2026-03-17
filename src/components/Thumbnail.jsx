const GRADIENTS = {
  "The Cave":        ["#9AAE8E", "#889C7C"],
  "Adventure Quest": ["#A0B296", "#90A286"],
  "Puzzle Mania":    ["#96AA8C", "#86A07E"],
  "Football Frenzy": ["#8EA682", "#80987A"],
  "Chess Master":    ["#A4B49A", "#94A48A"],
  "City Builder":    ["#98AC8E", "#8A9E82"],
};

export default function Thumbnail({ title, playable }) {
  const [c1, c2] = GRADIENTS[title] || ["#9AAE8E", "#889C7C"];

  return (
    <div
      className="thumb"
      style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
    >
      {playable && <div className="thumb__badge">Playable</div>}

      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="8" width="40" height="32" rx="4"
          stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" fill="none" />
        <line x1="4" y1="28" x2="44" y2="28"
          stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
        <circle cx="16" cy="18" r="5"
          stroke="rgba(0,0,0,0.1)" strokeWidth="1" fill="none" />
        <path
          d="M4 28 L18 20 L28 26 L36 18 L44 24 L44 36
             C44 38.2 42.2 40 40 40 L8 40
             C5.8 40 4 38.2 4 36 Z"
          fill="rgba(0,0,0,0.04)"
        />
      </svg>
    </div>
  );
}
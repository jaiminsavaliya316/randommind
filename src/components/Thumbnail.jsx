const COLORS = {
  "The Cave": ["#1a3a4a", "#0d2233"],
  "Adventure Quest": ["#3a2a1a", "#221a0d"],
  "Puzzle Mania": ["#2a1a3a", "#1a0d33"],
  "Football Frenzy": ["#1a3a1a", "#0d330d"],
  "Chess Master": ["#3a3a1a", "#33330d"],
  "City Builder": ["#1a2a3a", "#0d1a2a"],
};

export default function Thumbnail({ title, playable }) {
  const [c1, c2] = COLORS[title] || ["#1a2a3a", "#0d1a2a"];

  return (
    <div
      className="thumb"
      style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
    >
      {playable && <div className="thumb__badge">Playable</div>}
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="8" width="40" height="32" rx="4" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none"/>
        <line x1="4" y1="28" x2="44" y2="28" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <circle cx="16" cy="18" r="5" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none"/>
        <path d="M4 28 L18 20 L28 26 L36 18 L44 24 L44 36 C44 38.2 42.2 40 40 40 L8 40 C5.8 40 4 38.2 4 36 Z" fill="rgba(255,255,255,0.04)"/>
      </svg>
    </div>
  );
}
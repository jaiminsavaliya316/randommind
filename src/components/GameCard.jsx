import Thumbnail from "./Thumbnail";

export default function GameCard({ disc, onSelect }) {
  const playable = disc.playable;

  return (
    <div
      onClick={() => playable && onSelect(disc.id)}
      className={playable ? "card" : "card--disabled"}
    >
      <Thumbnail title={disc.title} playable={playable} />
      <div className={playable ? "card__title" : "card__title--disabled"}>
        {disc.title}
      </div>
      <div className={playable ? "card__desc" : "card__desc--disabled"}>
        {disc.description}
      </div>
      {!playable && <div className="card__coming-soon">Coming Soon</div>}
    </div>
  );
}
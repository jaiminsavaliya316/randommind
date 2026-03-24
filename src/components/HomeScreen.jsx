import { DISCS } from "../data/discs";
import GameCard from "./GameCard";

export default function HomeScreen({ onSelectDisc }) {
  return (
    <div className="page-home">
      <h1 className="home__title">The Random Minds</h1>

      <div className="home__grid">
        {DISCS.map(disc => (
          <GameCard key={disc.id} disc={disc} onSelect={onSelectDisc} />
        ))}
      </div>

      <p className="home__footer">
        More stories coming soon — each a new disc for your RandomMind player.
      </p>
    </div>
  );
}
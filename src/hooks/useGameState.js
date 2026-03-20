import { useState, useEffect } from "react";
import { THE_CAVE } from "../data/theCave";
import { resolveStatChanges } from "../services/statResolver";

const INITIAL_STATS = { wit: 50, charm: 50, luck: 50, curiosity: 50, nerve: 50 };

const STAT_TO_ENDING = {
  charm: "diplomat",
  curiosity: "scholar",
  nerve: "survivor",
  wit: "trickster",
  luck: "survivor", // luck has no dedicated ending; resolves to survivor
};

function getScene(step) {
  if (step === 0) return THE_CAVE.startScene;
  return THE_CAVE.scenes[step - 1];
}

function applyDeltas(currentStats, deltas) {
  const next = { ...currentStats };
  for (const [key, delta] of Object.entries(deltas)) {
    if (key in next) {
      next[key] = Math.max(0, Math.min(100, next[key] + delta));
    }
  }
  return next;
}

function resolveEndingKey(stats, choiceHistory) {
  const maxValue = Math.max(...Object.values(stats));
  const tied = Object.keys(stats).filter((k) => stats[k] === maxValue);

  if (tied.length === 1) return STAT_TO_ENDING[tied[0]];

  // Tiebreak: scan choiceHistory from last to first — most recently changed stat wins
  for (let i = choiceHistory.length - 1; i >= 0; i--) {
    const hit = Object.keys(choiceHistory[i].statChanges || {}).find((k) => tied.includes(k));
    if (hit) return STAT_TO_ENDING[hit];
  }

  // Final fallback: first tied stat alphabetically
  return STAT_TO_ENDING[[...tied].sort()[0]];
}

export function useGameState() {
  const [step, setStep] = useState(0);
  const [stats, setStats] = useState(INITIAL_STATS);
  const [choiceHistory, setChoiceHistory] = useState([]);
  const [gamePhase, setGamePhase] = useState("playing"); // "playing" | "ending"
  const [isLoading, setIsLoading] = useState(true);
  const [endingKey, setEndingKey] = useState(null);

  // Initial load delay
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const currentScene = gamePhase === "playing" ? getScene(step) : null;

  // NOTE for Phase 4: add `async` here and `await` before resolveStatChanges(...)
  const selectChoice = (choiceText, choiceIndex) => {
    const deltas = resolveStatChanges({
      scene: currentScene,
      choiceText,
      choiceIndex,
      statNames: Object.keys(INITIAL_STATS),
    });

    const nextStats = applyDeltas(stats, deltas);
    setStats(nextStats);

    const entry = { step, choiceText, statChanges: deltas };
    const nextHistory = [...choiceHistory, entry];
    setChoiceHistory(nextHistory);

    setIsLoading(true);
    setTimeout(() => {
      const nextStep = step + 1;
      if (nextStep > THE_CAVE.scenes.length) {
        // Use nextStats/nextHistory (not state refs) to avoid stale closure
        setEndingKey(resolveEndingKey(nextStats, nextHistory));
        setGamePhase("ending");
      } else {
        setStep(nextStep);
      }
      setIsLoading(false);
    }, 1500);
  };

  const restartGame = () => {
    setStep(0);
    setStats(INITIAL_STATS);
    setChoiceHistory([]);
    setGamePhase("playing");
    setEndingKey(null);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return {
    step,
    stats,
    choiceHistory,
    gamePhase,
    isLoading,
    currentScene,
    endingKey,
    selectChoice,
    restartGame,
  };
}

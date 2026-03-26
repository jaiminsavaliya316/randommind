import { useState, useEffect } from "react";
import { resolveStatChanges } from "../services/statResolver";

const INITIAL_STATS = { wit: 50, charm: 50, luck: 50, excitement: 50, nerve: 50 };

const STAT_TO_ENDING = {
  charm: "diplomat",
  excitement: "scholar",
  nerve: "survivor",
  wit: "trickster",
  luck: "survivor",
};

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

  for (let i = choiceHistory.length - 1; i >= 0; i--) {
    const hit = Object.keys(choiceHistory[i].statChanges || {}).find((k) => tied.includes(k));
    if (hit) return STAT_TO_ENDING[hit];
  }

  return STAT_TO_ENDING[[...tied].sort()[0]];
}

export function useGameState(story) {
  const [step, setStep] = useState(0);
  const [stats, setStats] = useState(INITIAL_STATS);
  const [choiceHistory, setChoiceHistory] = useState([]);
  const [gamePhase, setGamePhase] = useState("playing");
  const [isLoading, setIsLoading] = useState(true);
  const [endingKey, setEndingKey] = useState(null);
  const [currentScene, setCurrentScene] = useState(story.startScene);

  // Initial load delay (entry from home screen)
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const selectChoice = async (choiceText, choiceIndex) => {
    setIsLoading(true);

    const { deltas, nextScene } = await resolveStatChanges({
      scene: currentScene,
      choiceText,
      choiceIndex,
      statNames: Object.keys(INITIAL_STATS),
      choiceHistory,
      step,
      story,
      stats,
    });

    const nextStats = applyDeltas(stats, deltas);
    setStats(nextStats);

    const entry = { step, choiceText, statChanges: deltas };
    const nextHistory = [...choiceHistory, entry];
    setChoiceHistory(nextHistory);

    const nextStep = step + 1;
    if (nextStep > story.scenes.length) {
      setEndingKey(resolveEndingKey(nextStats, nextHistory));
      setGamePhase("ending");
    } else {
      setCurrentScene(nextScene);
      setStep(nextStep);
    }

    setIsLoading(false);
  };

  const restartGame = () => {
    setStep(0);
    setStats(INITIAL_STATS);
    setChoiceHistory([]);
    setGamePhase("playing");
    setEndingKey(null);
    setCurrentScene(story.startScene);
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

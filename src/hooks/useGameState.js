import { useState, useEffect } from "react";
import { resolveStatChanges } from "../services/statResolver";
import { startSession, downloadLogs } from "../services/logger";

const INITIAL_STATS = { wit: 50, charm: 50, luck: 50, excitement: 50, nerve: 50 };

const STAT_TO_ENDING = {
  charm: "diplomat",
  excitement: "scholar",
  nerve: "survivor",
  wit: "trickster",
  luck: "survivor",
};

// Applies stat deltas from a choice to the current stats, clamping each value between 0 and 100
function applyDeltas(currentStats, deltas) {
  const next = { ...currentStats };
  for (const [key, delta] of Object.entries(deltas)) {
    if (key in next) {
      next[key] = Math.max(0, Math.min(100, next[key] + delta));
    }
  }
  return next;
}

// Determines which ending to show based on the highest stat at game end.
// Breaks ties by scanning choice history in reverse to find the most recently changed tied stat.
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
  const [storySummary, setStorySummary] = useState(null);
  const [gamePhase, setGamePhase] = useState("playing");
  const [isLoading, setIsLoading] = useState(true);
  const [endingKey, setEndingKey] = useState(null);
  const [currentScene, setCurrentScene] = useState(story.startScene);

  // Initial load delay (entry from home screen)
  useEffect(() => {
    startSession();
    const t = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  // Handles a player's choice: calls the AI to resolve stat changes and the next scene,
  // updates stats and history, and either advances to the next scene or triggers the ending
  const selectChoice = async (choiceText, choiceIndex) => {
    setIsLoading(true);

    const { deltas, nextScene, storySummary: newSummary } = await resolveStatChanges({
      scene: currentScene,
      choiceText,
      choiceIndex,
      storySummary,
      step,
      story,
      stats,
    });

    if (newSummary) setStorySummary(newSummary);

    const nextStats = applyDeltas(stats, deltas);
    setStats(nextStats);

    const entry = { step, choiceText, statChanges: deltas };
    const nextHistory = [...choiceHistory, entry];
    setChoiceHistory(nextHistory);

    const nextStep = step + 1;
    if (nextStep > story.scenes.length) {
      downloadLogs();
      setEndingKey(resolveEndingKey(nextStats, nextHistory));
      setGamePhase("ending");
    } else {
      setCurrentScene(nextScene);
      setStep(nextStep);
    }

    setIsLoading(false);
  };

  // Resets all game state back to initial values and starts a new session
  const restartGame = () => {
    startSession();
    setStep(0);
    setStats(INITIAL_STATS);
    setChoiceHistory([]);
    setStorySummary(null);
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

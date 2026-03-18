import { useState, useEffect } from "react";
import { THE_CAVE } from "../data/theCave";

const INITIAL_STATS = { wit: 50, charm: 50, luck: 50, curiosity: 50, nerve: 50 };

function getScene(step) {
  if (step === 0) return THE_CAVE.startScene;
  return THE_CAVE.scenes[step - 1];
}

// Phase 2: hardcoded ending key; Phase 3 will derive from stats
function resolveEndingKey() {
  return "survivor";
}

export function useGameState() {
  const [step, setStep] = useState(0);
  const [stats] = useState(INITIAL_STATS);
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

  const selectChoice = (choiceText) => {
    setChoiceHistory((h) => [...h, { step, choiceText }]);
    setIsLoading(true);
    setTimeout(() => {
      const nextStep = step + 1;
      if (nextStep > THE_CAVE.scenes.length) {
        // All middle scenes done — go to ending
        setEndingKey(resolveEndingKey());
        setGamePhase("ending");
      } else {
        setStep(nextStep);
      }
      setIsLoading(false);
    }, 1500);
  };

  const restartGame = () => {
    setStep(0);
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

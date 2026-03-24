import { useState } from "react";
import { useGameState } from "../hooks/useGameState";
import { STORY_MAP } from "../data/discs";
import StatIcon from "./StatIcon";
import ThoughtCloud from "./ThoughtCloud";
import LoadingScreen from "./LoadingScreen";
import EndingScreen from "./EndingScreen";

export default function GameScreen({ discId, onBack }) {
  const story = STORY_MAP[discId];
  const {
    step,
    stats,
    choiceHistory,
    gamePhase,
    isLoading,
    currentScene,
    endingKey,
    selectChoice,
    restartGame,
  } = useGameState(story);

  const [customExpanded, setCustomExpanded] = useState(false);
  const [customText, setCustomText] = useState("");
  const [selectedCloudIndex, setSelectedCloudIndex] = useState(null);

  const statEntries = [
    ["W", stats.wit],
    ["C", stats.charm],
    ["L", stats.luck],
    ["E", stats.excitement],
    ["N", stats.nerve],
  ];

  const handleChoice = (choiceText, choiceIndex) => {
    setSelectedCloudIndex(choiceIndex ?? "custom");
    setCustomExpanded(false);
    setCustomText("");
    selectChoice(choiceText, choiceIndex);
  };

  const midGameLoading = isLoading && choiceHistory.length > 0;

  const cloudAnimClass = (i) => {
    if (!midGameLoading) return "";
    return i === selectedCloudIndex ? "cloud--selected" : "cloud--exit";
  };

  // Full loading screen only on initial game entry (no choice made yet)
  if (isLoading && choiceHistory.length === 0) return <LoadingScreen discTitle={story.config.title ?? discId} stats={statEntries} />;

  if (gamePhase === "ending") {
    const ending = story.endings[endingKey];
    return (
      <EndingScreen
        ending={ending}
        stats={stats}
        onPlayAgain={restartGame}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="page-game">
      {/* Header */}
      <div className="game-header">
        <button onClick={onBack} className="game-header__back" data-tooltip="Home">
          ← Back
        </button>
        <span className="game-header__title">THE CAVE</span>
        <div className="stat-row">
          {statEntries.map(([l, v], i) => (
            <StatIcon key={i} letter={l} value={v} />
          ))}
        </div>
      </div>

      {/* Story body */}
      <div className="game__body">
        <div
          key={step}
          className={`game__story-text ${midGameLoading ? "game__story-text--exiting" : ""}`}
        >
          {currentScene.text}
        </div>

        {/* Thought Clouds */}
        <div
          key={`clouds-${step}`}
          className={`game__clouds-row ${midGameLoading ? "game__clouds-row--exiting" : ""}`}
        >
          {customExpanded ? (
            <div className="cloud__expanded-wide">
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Type your thoughts..."
                autoFocus
                className="cloud__wide-input"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && customText.trim())
                    handleChoice(customText);
                }}
              />
              <div className="cloud__button-row">
                <button
                  onClick={() => {
                    if (customText.trim()) handleChoice(customText);
                  }}
                  className="cloud__send-btn"
                >
                  Send
                </button>
                <button
                  onClick={() => {
                    setCustomExpanded(false);
                    setCustomText("");
                  }}
                  className="cloud__cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              {currentScene.choices.map((choice, i) => (
                <div key={i} className="game__cloud-item">
                  <ThoughtCloud
                    animClass={cloudAnimClass(i)}
                    onClick={() => handleChoice(choice, i)}
                  >
                    {choice}
                  </ThoughtCloud>
                </div>
              ))}
              <div className="game__cloud-item">
                <ThoughtCloud
                  isCustom
                  animClass={cloudAnimClass("custom")}
                  onClick={() => setCustomExpanded(true)}
                >
                  <span className="cloud__placeholder">
                    Enter your own choice...
                  </span>
                </ThoughtCloud>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

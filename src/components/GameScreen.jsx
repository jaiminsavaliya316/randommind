import { useState, useEffect } from "react";
import { THE_CAVE } from "../data/theCave";
import StatIcon from "./StatIcon";
import ThoughtCloud from "./ThoughtCloud";
import LoadingScreen from "./LoadingScreen";

export default function GameScreen({ onBack }) {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    wit: 50, charm: 50, luck: 50, curiosity: 50, nerve: 50
  });
  const [customExpanded, setCustomExpanded] = useState(false);
  const [customText, setCustomText] = useState("");

  const scene = THE_CAVE.startScene;

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) return <LoadingScreen discTitle="THE CAVE" />;

  const handleChoice = (choiceText) => {
    setCustomExpanded(false);
    setCustomText("");
    setIsLoading(true);
    setTimeout(() => {
      // Phase 2+: advance step and load next scene
      setIsLoading(false);
    }, 1500);
  };

  const statEntries = [
    ["W", stats.wit],
    ["C", stats.charm],
    ["L", stats.luck],
    ["C", stats.curiosity],
    ["N", stats.nerve]
  ];

  return (
    <div className="page-game">
      {/* Header */}
      <div className="game-header">
        <div className="game-header__left">
          <button onClick={onBack} className="game-header__back">← Back</button>
          <span className="game-header__title">THE CAVE</span>
        </div>
        <div className="stat-row">
          {statEntries.map(([l, v], i) => (
            <StatIcon key={i} letter={l} value={v} />
          ))}
        </div>
      </div>

      {/* Story body */}
      <div className="game__body">
        <div className="game__story-text">{scene.text}</div>

        {/* Thought Clouds */}
        <div className="game__clouds-row">
          {customExpanded ? (
            <div className="cloud__expanded">
              <ThoughtCloud isCustom>
                <div className="cloud__input-row">
                  <input
                    type="text"
                    value={customText}
                    onChange={e => setCustomText(e.target.value)}
                    placeholder="Type your thoughts..."
                    autoFocus
                    className="cloud__text-input"
                    onKeyDown={e => {
                      if (e.key === "Enter" && customText.trim()) handleChoice(customText);
                    }}
                  />
                  <div className="cloud__button-row">
                    <button
                      onClick={() => { if (customText.trim()) handleChoice(customText); }}
                      className="cloud__send-btn"
                    >Send</button>
                    <button
                      onClick={() => { setCustomExpanded(false); setCustomText(""); }}
                      className="cloud__cancel-btn"
                    >Cancel</button>
                  </div>
                </div>
              </ThoughtCloud>
            </div>
          ) : (
            <>
              {scene.choices.map((choice, i) => (
                <div key={i} className="game__cloud-item">
                  <ThoughtCloud onClick={() => handleChoice(choice)}>
                    {choice}
                  </ThoughtCloud>
                </div>
              ))}
              <div className="game__cloud-item">
                <ThoughtCloud isCustom onClick={() => setCustomExpanded(true)}>
                  <span className="cloud__placeholder">Enter your own choice...</span>
                </ThoughtCloud>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
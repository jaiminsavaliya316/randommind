import { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import GameScreen from "./components/GameScreen";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [activeDiscId, setActiveDiscId] = useState(null);

  if (screen === "playing") {
    return <GameScreen discId={activeDiscId} onBack={() => setScreen("home")} />;
  }

  return (
    <HomeScreen
      onSelectDisc={(id) => {
        setActiveDiscId(id);
        setScreen("playing");
      }}
    />
  );
}
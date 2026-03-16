import { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import GameScreen from "./components/GameScreen";

export default function App() {
  const [screen, setScreen] = useState("home");

  if (screen === "playing") {
    return <GameScreen onBack={() => setScreen("home")} />;
  }

  return <HomeScreen onSelectDisc={() => setScreen("playing")} />;
}
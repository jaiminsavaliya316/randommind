import { useState, useEffect } from "react";
import StatIcon from "./StatIcon";

export default function LoadingScreen({ discTitle }) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const iv = setInterval(() => {
      setDots(d => d.length >= 3 ? "" : d + ".");
    }, 500);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="page-loading">
      <div className="game-header--no-bg">
        <span className="game-header__title">{discTitle}</span>
        <div className="stat-row">
          {["W", "C", "L", "C", "N"].map((l, i) => (
            <StatIcon key={i} letter={l} value={50} />
          ))}
        </div>
      </div>
      <div className="loading__body">
        <div className="loading__text">Loading{dots}</div>
      </div>
    </div>
  );
}
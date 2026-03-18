import { useState, useEffect } from "react";
import StatIcon from "./StatIcon";

export default function LoadingScreen({ discTitle, stats }) {
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
          {(stats ?? [["W",50],["C",50],["L",50],["C",50],["N",50]]).map(([l, v], i) => (
            <StatIcon key={i} letter={l} value={v} />
          ))}
        </div>
      </div>
      <div className="loading__body">
        <div className="loading__text">Loading{dots}</div>
      </div>
    </div>
  );
}
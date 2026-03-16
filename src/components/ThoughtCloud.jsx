import { useState } from "react";

export default function ThoughtCloud({ children, onClick, isCustom, style: extraStyle }) {
  const [hovered, setHovered] = useState(false);

  const fill = isCustom ? "rgba(255,255,255,0.95)" : "none";
  const stroke = hovered ? "rgba(74,158,255,0.8)" : "rgba(255,255,255,0.35)";

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cloud"
      style={extraStyle}
    >
      <svg viewBox="0 0 260 140" width="100%" height="100%" className="cloud__svg">
        <ellipse cx="130" cy="60" rx="120" ry="50" fill={fill} stroke={stroke} strokeWidth="2"/>
        <ellipse cx="55" cy="105" rx="30" ry="18" fill={fill} stroke={stroke} strokeWidth="1.5"/>
        <ellipse cx="200" cy="108" rx="25" ry="15" fill={fill} stroke={stroke} strokeWidth="1.5"/>
        <circle cx="35" cy="125" r="8" fill={fill} stroke={stroke} strokeWidth="1.5"/>
        <circle cx="218" cy="128" r="6" fill={fill} stroke={stroke} strokeWidth="1.5"/>
      </svg>
      <div className={`cloud__content ${isCustom ? "cloud__content--custom" : ""}`}>
        {children}
      </div>
    </div>
  );
}
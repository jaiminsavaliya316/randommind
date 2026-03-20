import { useState } from "react";

// Single continuous bezier path — no overlapping shapes
const CLOUD_PATH = `
  M 68 110
  C 30 110, 28 75, 52 62
  C 38 40, 58 18, 88 24
  C 98 8, 128 2, 152 14
  C 170 4, 205 8, 218 30
  C 245 28, 262 50, 252 72
  C 268 88, 258 112, 230 114
  C 230 114, 68 114, 68 110
  Z
`;

export default function ThoughtCloud({ children, onClick, isCustom, animClass = "" }) {
  const [hovered, setHovered] = useState(false);

  const fill   = isCustom ? "var(--surface-cloud-custom)" : "var(--surface-cloud-default)";
  const stroke = hovered  ? "var(--accent-primary)"       : "var(--cloud-stroke)";
  const sw     = hovered  ? 3 : 2.5;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`cloud ${animClass}`}
    >
      <svg
        viewBox="0 0 280 160"
        width="100%"
        height="100%"
        className="cloud__svg"
      >
        {/* Main cloud body */}
        <path
          d={CLOUD_PATH}
          fill={fill}
          stroke={stroke}
          strokeWidth={sw}
          strokeLinejoin="round"
        />
        {/* Thought-tail bubbles */}
        <ellipse cx="72" cy="128" rx="14" ry="10"
          fill={fill} stroke={stroke} strokeWidth={sw * 0.8} />
        <circle cx="50" cy="146" r="6"
          fill={fill} stroke={stroke} strokeWidth={sw * 0.7} />
      </svg>
      <div className={`cloud__content ${isCustom ? "cloud__content--custom" : ""}`}>
        {children}
      </div>
    </div>
  );
}
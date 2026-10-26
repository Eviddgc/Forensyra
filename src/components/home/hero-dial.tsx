/**
 * A thirteen-point evidence dial that frames the home-page brand lockup.
 * It is decorative, pure SVG, and echoes the thirteen roles without adding
 * another competing illustration.
 */
export function HeroDial({ className = "" }: { className?: string }) {
  const ticks = Array.from({ length: 72 }, (_, index) => {
    const angle = index * 5;
    const outer = 300;
    const inner = index % 6 === 0 ? 282 : index % 2 === 0 ? 290 : 294;
    const start = polar(320, 320, inner, angle);
    const end = polar(320, 320, outer, angle);
    return { start, end, major: index % 6 === 0, medium: index % 2 === 0 };
  });

  const rolePoints = Array.from({ length: 13 }, (_, index) =>
    polar(320, 320, 238, index * (360 / 13) - 90),
  );

  return (
    <svg
      viewBox="0 0 640 640"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <radialGradient id="dial-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d6b068" stopOpacity="0.25" />
          <stop offset="48%" stopColor="#d6b068" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#d6b068" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dial-arc" x1="80" y1="80" x2="560" y2="560">
          <stop offset="0%" stopColor="#d6b068" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#ecd49b" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#d4af5f" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      <circle cx="320" cy="320" r="305" fill="url(#dial-glow)" />
      <circle cx="320" cy="320" r="310" stroke="#d4af5f" strokeWidth="0.8" opacity="0.22" />
      <circle cx="320" cy="320" r="300" stroke="#d6b068" strokeWidth="0.9" opacity="0.32" />
      <circle cx="320" cy="320" r="264" stroke="#d4af5f" strokeWidth="0.7" strokeDasharray="2 9" opacity="0.25" />
      <circle cx="320" cy="320" r="205" stroke="#d6b068" strokeWidth="0.8" opacity="0.22" />

      {ticks.map((tick, index) => (
        <line
          key={index}
          x1={tick.start.x}
          y1={tick.start.y}
          x2={tick.end.x}
          y2={tick.end.y}
          stroke={tick.major ? "#d6b068" : "#d4af5f"}
          strokeWidth={tick.major ? "1.6" : tick.medium ? "1" : "0.7"}
          opacity={tick.major ? "0.65" : tick.medium ? "0.38" : "0.22"}
        />
      ))}

      {Array.from({ length: 13 }, (_, index) => {
        const angle = index * (360 / 13) - 90;
        const start = polar(320, 320, 238, angle);
        const end = polar(320, 320, 300, angle);
        return (
          <line
            key={`ray-${index}`}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke="url(#dial-arc)"
            strokeWidth={index % 3 === 0 ? "1.5" : "0.8"}
            opacity={index % 3 === 0 ? "0.55" : "0.3"}
          />
        );
      })}

      {rolePoints.map((point, index) => (
        <g key={`role-${index}`}>
          <circle
            cx={point.x}
            cy={point.y}
            r={index % 3 === 0 ? 7 : 4.5}
            fill="#080D15"
            stroke={index % 3 === 0 ? "#d6b068" : "#d4af5f"}
            strokeWidth={index % 3 === 0 ? "1.5" : "1"}
          />
          <circle
            cx={point.x}
            cy={point.y}
            r={index % 3 === 0 ? 2.5 : 1.6}
            fill={index % 3 === 0 ? "#ecd49b" : "#ecd49b"}
            opacity="0.9"
          />
          {index % 3 === 0 ? (
            <circle cx={point.x} cy={point.y} r="14" stroke="#d6b068" strokeWidth="0.5" opacity="0.35" />
          ) : null}
        </g>
      ))}

      <path
        d="M320 20 A300 300 0 0 1 590 230"
        stroke="#d6b068"
        strokeWidth="1.4"
        opacity="0.45"
        strokeLinecap="round"
      />
      <path
        d="M50 410 A300 300 0 0 0 320 620"
        stroke="#d4af5f"
        strokeWidth="1"
        opacity="0.3"
        strokeLinecap="round"
      />

      <circle cx="320" cy="320" r="3" fill="#ecd49b" opacity="0.6" />
      <line x1="320" y1="16" x2="320" y2="52" stroke="#d6b068" strokeWidth="1.6" opacity="0.65" />
      <line x1="320" y1="588" x2="320" y2="624" stroke="#d6b068" strokeWidth="1.6" opacity="0.65" />
      <line x1="16" y1="320" x2="52" y2="320" stroke="#d4af5f" strokeWidth="1.2" opacity="0.4" />
      <line x1="588" y1="320" x2="624" y2="320" stroke="#d4af5f" strokeWidth="1.2" opacity="0.4" />
    </svg>
  );
}

function polar(cx: number, cy: number, radius: number, degrees: number) {
  const radians = (degrees * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
}

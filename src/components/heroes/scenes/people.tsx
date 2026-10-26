import { C, Scene, Spark, hexPoints, polar } from "./shared";

/* ------------------------------------------------------------------ */
/* About — a constellation of people held together by one idea.        */
/* ------------------------------------------------------------------ */

const ABOUT_NODES = [
  { angle: -160, radius: 194, gold: false },
  { angle: -115, radius: 194, gold: true },
  { angle: -70, radius: 194, gold: false },
  { angle: -25, radius: 194, gold: false },
  { angle: 25, radius: 194, gold: true },
  { angle: 70, radius: 194, gold: false },
  { angle: 115, radius: 194, gold: false },
  { angle: 160, radius: 194, gold: true },
  { angle: -135, radius: 108, gold: false },
  { angle: -45, radius: 108, gold: true },
  { angle: 45, radius: 108, gold: false },
  { angle: 135, radius: 108, gold: false },
  { angle: 180, radius: 108, gold: true },
];

export function AboutScene() {
  const nodes = ABOUT_NODES.map((node) => ({
    ...node,
    ...polar(480, 310, node.radius, node.angle),
  }));

  return (
    <Scene>
      <defs>
        <radialGradient id="ab-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.goldLight} stopOpacity="0.95" />
          <stop offset="48%" stopColor={C.gold} stopOpacity="0.7" />
          <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ab-link" x1="200" y1="160" x2="700" y2="500">
          <stop offset="0%" stopColor={C.gold} stopOpacity="0.75" />
          <stop offset="100%" stopColor={C.blue} stopOpacity="0.35" />
        </linearGradient>
      </defs>

      <circle cx="480" cy="310" r="248" stroke={C.blue} strokeWidth="0.8" strokeDasharray="2 10" opacity="0.24" />
      <circle cx="480" cy="310" r="194" stroke={C.gold} strokeWidth="0.9" opacity="0.3" />
      <circle cx="480" cy="310" r="150" stroke={C.blue} strokeWidth="0.7" strokeDasharray="4 7" opacity="0.28" className="fx-hero-dash" />
      <circle cx="480" cy="310" r="108" stroke={C.gold} strokeWidth="0.7" opacity="0.24" />
      <circle cx="480" cy="310" r="62" stroke={C.blue} strokeWidth="0.7" opacity="0.3" />

      {Array.from({ length: 48 }, (_, index) => {
        const outer = polar(480, 310, 248, index * 7.5);
        const inner = polar(480, 310, index % 4 === 0 ? 232 : 240, index * 7.5);
        return (
          <line
            key={index}
            x1={outer.x}
            y1={outer.y}
            x2={inner.x}
            y2={inner.y}
            stroke={index % 4 === 0 ? C.gold : C.blue}
            strokeWidth={index % 4 === 0 ? "1.2" : "0.7"}
            opacity={index % 4 === 0 ? "0.55" : "0.28"}
          />
        );
      })}

      {nodes.map((node, index) => {
        const next = nodes[(index + 1) % nodes.length];
        const isNeighbour = node.radius === next.radius;
        return isNeighbour ? (
          <path
            key={`link-${index}`}
            d={`M${node.x} ${node.y} Q${(node.x + next.x) / 2} ${(node.y + next.y) / 2 - 22} ${next.x} ${next.y}`}
            stroke="url(#ab-link)"
            strokeWidth="0.8"
            opacity="0.46"
          />
        ) : null;
      })}

      {nodes
        .filter((node) => node.radius === 108)
        .map((node, index) => (
          <line
            key={`core-${index}`}
            x1="480"
            y1="310"
            x2={node.x}
            y2={node.y}
            stroke={node.gold ? C.gold : C.blue}
            strokeWidth="0.9"
            strokeDasharray={node.gold ? undefined : "3 5"}
            opacity={node.gold ? "0.65" : "0.35"}
          />
        ))}

      <circle cx="480" cy="310" r="58" fill="url(#ab-core)" opacity="0.62" />
      <circle cx="480" cy="310" r="22" fill={C.ink} stroke={C.gold} strokeWidth="1.6" />
      <circle cx="480" cy="310" r="8" fill={C.goldLight} />
      <circle cx="480" cy="310" r="34" stroke={C.gold} strokeWidth="0.8" strokeDasharray="2 4" opacity="0.55" className="fx-hero-spin" />

      {nodes.map((node, index) => (
        <g key={`node-${index}`} className={index % 3 === 0 ? "fx-hero-float" : undefined} style={{ animationDelay: `${index * 0.35}s` }}>
          <circle cx={node.x} cy={node.y} r={node.gold ? 10 : 7} fill={C.ink} stroke={node.gold ? C.gold : C.blue} strokeWidth={node.gold ? "1.6" : "1.1"} />
          <circle cx={node.x} cy={node.y} r={node.gold ? 4 : 2.6} fill={node.gold ? C.goldLight : C.blueLight} opacity="0.95" />
          {node.gold ? (
            <circle cx={node.x} cy={node.y} r="17" stroke={C.gold} strokeWidth="0.5" opacity="0.35" />
          ) : null}
        </g>
      ))}

      <Spark x="258" y="128" r="2.4" />
      <Spark x="680" y="150" r="1.8" color={C.blue} />
      <Spark x="714" y="410" r="2.2" color={C.blue} />
      <Spark x="206" y="470" r="1.8" color={C.blue} />
      <Spark x="620" y="520" r="2.2" />
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* Roles — thirteen interlocking specialisations.                     */
/* ------------------------------------------------------------------ */

const ROLE_CELLS = [
  { angle: 0, radius: 0, active: true },
  ...Array.from({ length: 6 }, (_, index) => ({
    angle: index * 60,
    radius: 84,
    active: index === 1 || index === 4,
  })),
  ...Array.from({ length: 6 }, (_, index) => ({
    angle: index * 60 + 30,
    radius: 164,
    active: false,
  })),
];

export function RolesScene() {
  return (
    <Scene>
      <defs>
        <radialGradient id="role-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.gold} stopOpacity="0.22" />
          <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="480" cy="310" r="244" stroke={C.blue} strokeWidth="0.8" strokeDasharray="2 9" opacity="0.22" />
      <circle cx="480" cy="310" r="216" stroke={C.gold} strokeWidth="0.7" opacity="0.28" />
      <circle cx="480" cy="310" r="214" fill="url(#role-halo)" opacity="0.8" />

      {Array.from({ length: 39 }, (_, index) => {
        const point = polar(480, 310, 232, index * (360 / 39));
        const inner = polar(480, 310, index % 3 === 0 ? 218 : 224, index * (360 / 39));
        return (
          <line
            key={index}
            x1={point.x}
            y1={point.y}
            x2={inner.x}
            y2={inner.y}
            stroke={index % 3 === 0 ? C.gold : C.blue}
            strokeWidth="1"
            opacity={index % 3 === 0 ? "0.5" : "0.25"}
          />
        );
      })}

      {ROLE_CELLS.map((cell, index) => {
        const point = polar(480, 310, cell.radius, cell.angle);
        return (
          <g key={index}>
            <polygon
              points={hexPoints(point.x, point.y, 44)}
              fill={cell.active ? "rgba(214,176,104,0.1)" : "rgba(8,13,21,0.62)"}
              stroke={cell.active ? C.gold : C.blue}
              strokeWidth={cell.active ? "1.8" : "1.05"}
              opacity={cell.active ? "0.96" : "0.62"}
            />
            <circle
              cx={point.x}
              cy={point.y}
              r={cell.active ? 8 : 4}
              fill={cell.active ? C.goldLight : C.blue}
              opacity={cell.active ? "0.95" : "0.55"}
            />
            {cell.active ? (
              <>
                <circle cx={point.x} cy={point.y} r="24" stroke={C.gold} strokeWidth="0.8" strokeDasharray="2 4" opacity="0.55" className="fx-hero-spin" />
                <circle cx={point.x} cy={point.y} r="33" stroke={C.gold} strokeWidth="0.5" opacity="0.25" />
              </>
            ) : null}
          </g>
        );
      })}

      <path d="M232 228 C 276 198 300 170 334 140" stroke={C.gold} strokeWidth="1" strokeDasharray="3 6" opacity="0.34" />
      <path d="M704 430 C 676 456 642 468 614 476" stroke={C.blue} strokeWidth="1" strokeDasharray="3 6" opacity="0.3" />
      <Spark x="334" y="140" r="2.2" />
      <Spark x="704" y="430" r="2" color={C.blue} />
      <Spark x="245" y="470" r="1.8" color={C.blue} />
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* Team — a round table with thirteen seats, some still open.         */
/* ------------------------------------------------------------------ */

const SEATS = Array.from({ length: 13 }, (_, index) => {
  const angle = (index / 13) * Math.PI * 2 - Math.PI / 2;
  return {
    index,
    x: 480 + Math.cos(angle) * 246,
    y: 310 + Math.sin(angle) * 192,
    filled: index === 0 || index === 3 || index === 6 || index === 9 || index === 12,
    open: index === 5,
  };
});

export function TeamScene() {
  return (
    <Scene>
      <defs>
        <radialGradient id="team-table" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#34353a" />
          <stop offset="62%" stopColor="#10141c" />
          <stop offset="100%" stopColor="#16171c" />
        </radialGradient>
        <radialGradient id="team-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.gold} stopOpacity="0.35" />
          <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="480" cy="310" r="286" stroke={C.blue} strokeWidth="0.7" strokeDasharray="2 10" opacity="0.2" />
      {SEATS.map((seat) => (
        <line
          key={`lead-${seat.index}`}
          x1={seat.x}
          y1={seat.y}
          x2={480 + (seat.x - 480) * 0.77}
          y2={310 + (seat.y - 310) * 0.7}
          stroke={seat.filled ? C.gold : C.blue}
          strokeWidth="0.8"
          strokeDasharray={seat.open ? "4 5" : undefined}
          opacity={seat.filled ? "0.55" : "0.26"}
        />
      ))}

      <ellipse cx="480" cy="310" rx="204" ry="151" fill="url(#team-table)" stroke={C.gold} strokeWidth="1.4" opacity="0.98" />
      <ellipse cx="480" cy="310" rx="184" ry="132" stroke={C.blue} strokeWidth="0.8" opacity="0.5" />
      <ellipse cx="480" cy="310" rx="204" ry="151" fill="url(#team-glow)" opacity="0.6" />

      {Array.from({ length: 8 }, (_, index) => {
        const angle = (index / 8) * Math.PI * 2;
        return (
          <line
            key={`spoke-${index}`}
            x1={480 + Math.cos(angle) * 58}
            y1={310 + Math.sin(angle) * 42}
            x2={480 + Math.cos(angle) * 184}
            y2={310 + Math.sin(angle) * 132}
            stroke={C.lineSoft}
            strokeWidth="0.8"
          />
        );
      })}

      <g transform="rotate(-7 480 310)">
        <rect x="391" y="260" width="96" height="70" rx="5" fill={C.card} stroke={C.gold} strokeWidth="0.9" opacity="0.95" />
        <rect x="407" y="276" width="42" height="4" rx="2" fill={C.goldLight} opacity="0.7" />
        <rect x="407" y="287" width="60" height="3" rx="1.5" fill={C.line} />
        <rect x="407" y="296" width="50" height="3" rx="1.5" fill={C.line} />
        <circle cx="465" cy="314" r="6" stroke={C.blue} strokeWidth="0.8" opacity="0.7" />
      </g>
      <g transform="rotate(8 520 330)">
        <rect x="500" y="291" width="88" height="64" rx="5" fill={C.card} stroke={C.blue} strokeWidth="0.9" opacity="0.95" />
        <rect x="514" y="305" width="36" height="4" rx="2" fill={C.blueLight} opacity="0.65" />
        <rect x="514" y="316" width="54" height="3" rx="1.5" fill={C.line} />
        <rect x="514" y="325" width="40" height="3" rx="1.5" fill={C.line} />
      </g>

      <circle cx="478" cy="366" r="28" fill={C.ink} stroke={C.gold} strokeWidth="1.4" />
      <circle cx="478" cy="366" r="9" fill={C.goldLight} />
      <circle cx="478" cy="366" r="18" stroke={C.gold} strokeWidth="0.7" strokeDasharray="2 4" opacity="0.65" className="fx-hero-spin" />

      {SEATS.map((seat) => (
        <g key={seat.index} className={seat.filled ? "fx-hero-float" : undefined} style={{ animationDelay: `${seat.index * 0.22}s` }}>
          <rect
            x={seat.x - 15}
            y={seat.y - 15}
            width="30"
            height="30"
            rx="9"
            fill={seat.filled ? "rgba(214,176,104,0.13)" : C.ink}
            stroke={seat.filled ? C.gold : seat.open ? C.blueLight : C.blue}
            strokeWidth={seat.filled ? "1.6" : "1.1"}
            strokeDasharray={seat.open ? "4 4" : undefined}
            opacity={seat.filled ? "0.98" : "0.72"}
          />
          <circle cx={seat.x} cy={seat.y - 2} r="4.5" fill={seat.filled ? C.goldLight : C.blueLight} opacity={seat.filled ? "1" : "0.75"} />
          <path
            d={`M${seat.x - 7} ${seat.y + 7} Q${seat.x} ${seat.y + 1} ${seat.x + 7} ${seat.y + 7}`}
            stroke={seat.filled ? C.gold : C.blueLight}
            strokeWidth="1"
            opacity={seat.filled ? "0.9" : "0.6"}
          />
        </g>
      ))}

      <Spark x="208" y="190" r="2.2" color={C.blue} />
      <Spark x="740" y="380" r="2.4" />
      <Spark x="620" y="540" r="1.8" color={C.blue} />
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* Join — an open threshold, lit from the other side.                 */
/* ------------------------------------------------------------------ */

export function JoinScene() {
  return (
    <Scene>
      <defs>
        <radialGradient id="join-light" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.goldLight} stopOpacity="0.95" />
          <stop offset="38%" stopColor={C.gold} stopOpacity="0.5" />
          <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="join-beam" x1="500" y1="180" x2="500" y2="560">
          <stop offset="0%" stopColor={C.goldLight} stopOpacity="0.45" />
          <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="500" cy="312" r="264" stroke={C.blue} strokeWidth="0.8" strokeDasharray="2 10" opacity="0.22" />
      <circle cx="500" cy="312" r="220" stroke={C.gold} strokeWidth="0.7" opacity="0.22" />

      <path d="M500 128 L500 196" stroke={C.gold} strokeWidth="1" opacity="0.5" />
      <circle cx="500" cy="118" r="5" stroke={C.gold} strokeWidth="1" opacity="0.8" />

      <rect x="370" y="188" width="260" height="306" rx="12" fill={C.ink} stroke={C.blue} strokeWidth="0.8" opacity="0.65" />
      <path d="M410 520 L410 272 Q410 194 500 194 Q590 194 590 272 L590 520 Z" fill="url(#join-light)" opacity="0.62" />
      <path d="M430 520 L430 282 Q430 220 500 220 Q570 220 570 282 L570 520 Z" fill={C.ink} opacity="0.56" />
      <path d="M410 520 L410 272 Q410 194 500 194 Q590 194 590 272 L590 520" stroke={C.gold} strokeWidth="2" />
      <path d="M430 520 L430 282 Q430 220 500 220 Q570 220 570 282 L570 520" stroke={C.goldLight} strokeWidth="0.8" opacity="0.65" />

      <polygon points="430,520 570,520 640,592 360,592" fill="url(#join-beam)" opacity="0.5" />
      <circle cx="500" cy="350" r="78" fill="url(#join-light)" opacity="0.5" />

      {[0, 1, 2, 3].map((step) => (
        <g key={step}>
          <rect x={388 - step * 15} y={532 + step * 18} width={224 + step * 30} height="11" rx="5.5" fill={step % 2 === 0 ? C.surface : C.card} stroke={step === 0 ? C.gold : C.blue} strokeWidth="0.8" opacity={0.92 - step * 0.12} />
          <line x1={398 - step * 15} y1={537 + step * 18} x2={602 + step * 15} y2={537 + step * 18} stroke={C.line} strokeWidth="0.7" opacity="0.4" />
        </g>
      ))}

      <g transform="rotate(-24 646 250)">
        <circle cx="628" cy="250" r="13" stroke={C.gold} strokeWidth="1.4" />
        <circle cx="628" cy="250" r="5" stroke={C.goldLight} strokeWidth="1" />
        <line x1="641" y1="250" x2="690" y2="250" stroke={C.gold} strokeWidth="1.6" />
        <line x1="682" y1="250" x2="682" y2="260" stroke={C.gold} strokeWidth="1.6" />
        <line x1="690" y1="250" x2="690" y2="257" stroke={C.gold} strokeWidth="1.6" />
      </g>

      <path d="M262 544 C 330 520 344 472 404 478" stroke={C.gold} strokeWidth="1" strokeDasharray="3 7" opacity="0.4" />
      <path d="M672 492 C 650 520 626 538 604 548" stroke={C.blue} strokeWidth="1" strokeDasharray="3 7" opacity="0.32" />

      {[
        [274, 208, C.gold, 2.4],
        [696, 168, C.blue, 2],
        [732, 420, C.gold, 2.2],
        [246, 420, C.blue, 1.8],
        [650, 110, C.goldLight, 1.6],
        [340, 110, C.blueLight, 1.4],
      ].map(([x, y, color, r], index) => (
        <circle key={index} cx={x as number} cy={y as number} r={r as number} fill={color as string} opacity={0.55 + (index % 3) * 0.12} className="fx-hero-float" style={{ animationDelay: `${index * 0.6}s` }} />
      ))}
    </Scene>
  );
}

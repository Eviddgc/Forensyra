import type { CSSProperties } from "react";

/* Deterministic RNG so server and client render the same artwork. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rd = (n: number) => Math.round(n * 100) / 100;

const GOLD = "#d6b068";
const GOLD_LIGHT = "#ecd49b";
const W = 1440;
const H = 900;

function Svg({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      className={className ?? "absolute inset-0 h-full w-full"}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {children}
    </svg>
  );
}

function hexPath(cx: number, cy: number, r: number) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  });
  return `M${pts.join("L")}Z`;
}

/* ------------------------------------------------------------------ */
/* 1. Golden Circuit (home)                                           */
/* ------------------------------------------------------------------ */
const DIRS: Array<[number, number]> = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];

function buildCircuit() {
  const r = rng(7);
  const traces: Array<{ d: string; end: [number, number]; w: number; o: number }> = [];
  const starts: Array<[number, number, number]> = [];
  // Start points hug the right edge, the left edge and the lower right.
  for (let i = 0; i < 26; i++) starts.push([W + 10, 20 + r() * (H - 40), 4]);
  for (let i = 0; i < 12; i++) starts.push([-10, 80 + r() * (H - 120), 0]);
  for (let i = 0; i < 10; i++) starts.push([W - 120 - r() * 420, H + 10, 6]);
  for (const [sx, sy, dir0] of starts) {
    let x = Math.round(sx / 20) * 20;
    let y = Math.round(sy / 20) * 20;
    let dir = dir0;
    let d = `M${x} ${y}`;
    const steps = 3 + Math.floor(r() * 5);
    for (let s = 0; s < steps; s++) {
      const len = (2 + Math.floor(r() * 7)) * 20;
      const [dx, dy] = DIRS[dir];
      x += dx * len;
      y += dy * len;
      d += `L${x} ${y}`;
      const turn = r();
      if (turn < 0.5) dir = (dir + (r() < 0.5 ? 1 : 7)) % 8;
      else if (turn < 0.62) dir = (dir + (r() < 0.5 ? 2 : 6)) % 8;
    }
    traces.push({
      d,
      end: [x, y],
      w: r() < 0.2 ? 2.2 : 1.1,
      o: rd(0.3 + r() * 0.45),
    });
  }
  const chips = Array.from({ length: 7 }, () => ({
    x: (r() < 0.5 ? 40 + r() * 220 : 1120 + r() * 260) | 0,
    y: (80 + r() * 700) | 0,
    w: 30 + ((r() * 40) | 0),
    h: 20 + ((r() * 30) | 0),
  }));
  return { traces, chips };
}
const CIRCUIT = buildCircuit();

export function Circuit({ dim }: { dim: boolean }) {
  return (
    <div
      className="absolute inset-0"
      style={{ opacity: dim ? 0.55 : 1 }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 78% 38%, rgba(214,176,104,0.10), transparent 70%), radial-gradient(40% 50% at 8% 80%, rgba(214,176,104,0.07), transparent 70%)",
        }}
      />
      <Svg>
        <defs>
          <radialGradient id="cc-mask-g" cx="50%" cy="46%" r="62%">
            <stop offset="0.34" stopColor="#000" />
            <stop offset="0.64" stopColor="#8a8a8a" />
            <stop offset="1" stopColor="#fff" />
          </radialGradient>
          <mask id="cc-mask">
            <rect width={W} height={H} fill="url(#cc-mask-g)" />
          </mask>
          <filter id="cc-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
        </defs>
        <g mask="url(#cc-mask)">
          <g filter="url(#cc-glow)" opacity="0.35" className="bg-dense">
            {CIRCUIT.traces.map((t, i) => (
              <path key={i} d={t.d} fill="none" stroke={GOLD} strokeWidth={t.w + 2} />
            ))}
          </g>
          <g fill="none" strokeLinejoin="round" strokeLinecap="round">
            {CIRCUIT.traces.map((t, i) => (
              <g key={i}>
                <path d={t.d} stroke={GOLD} strokeWidth={t.w} opacity={t.o} />
                <circle
                  cx={t.end[0]}
                  cy={t.end[1]}
                  r={t.w > 2 ? 6 : 4}
                  stroke={GOLD_LIGHT}
                  strokeWidth="1.4"
                  opacity={t.o}
                />
              </g>
            ))}
          </g>
          <g fill="rgba(8,13,21,0.8)" stroke={GOLD} strokeWidth="1" opacity="0.5">
            {CIRCUIT.chips.map((c, i) => (
              <rect key={i} x={c.x} y={c.y} width={c.w} height={c.h} rx="3" />
            ))}
          </g>
          {/* Slow pulses that travel along a few traces. */}
          <g fill="none" stroke={GOLD_LIGHT} strokeWidth="2.4" strokeLinecap="round">
            {CIRCUIT.traces.slice(0, 9).map((t, i) => (
              <path
                key={i}
                d={t.d}
                className="bg-pulse"
                pathLength={1000}
                style={{ animationDelay: `${i * -2.1}s` } as CSSProperties}
              />
            ))}
          </g>
        </g>
      </Svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Origin Ridge (about)                                            */
/* ------------------------------------------------------------------ */
function buildRidges() {
  const r = rng(21);
  const cx = 120;
  const cy = 480;
  const rings: string[] = [];
  const count = 64;
  for (let i = 0; i < count; i++) {
    const base = 22 + i * 10.5;
    const ph1 = r() * 6;
    const ph2 = r() * 6;
    const pts: string[] = [];
    for (let k = 0; k <= 96; k++) {
      const a = (k / 96) * Math.PI * 2;
      const wob =
        1 + 0.07 * Math.sin(3 * a + ph1 + i * 0.22) + 0.04 * Math.sin(5 * a + ph2 - i * 0.15);
      const rx = base * 1.18 * wob;
      const ry = base * 1.42 * wob;
      const rot = -0.32;
      const ex = rx * Math.cos(a);
      const ey = ry * Math.sin(a);
      pts.push(
        `${(cx + ex * Math.cos(rot) - ey * Math.sin(rot)).toFixed(1)},${(cy + ex * Math.sin(rot) + ey * Math.cos(rot)).toFixed(1)}`,
      );
    }
    rings.push(`M${pts.join("L")}Z`);
  }
  const hexes = Array.from({ length: 110 }, () => {
    const x = 260 + r() * r() * 900 + r() * 200;
    const y = 40 + r() * 760;
    const o = 0.1 + r() * 0.55 * (1 - (x - 300) / 900);
    return { x: rd(x), y: rd(y), r: rd(3 + r() * 11), o: rd(o), fill: r() < 0.22, d: rd(r() * -30) };
  });
  return { rings, hexes };
}
const RIDGE = buildRidges();

export function OriginRidge() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 60% at 18% 52%, rgba(214,176,104,0.12), transparent 72%)",
        }}
      />
      <Svg>
        <defs>
          <linearGradient id="or-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.1" stopColor="#fff" />
            <stop offset="0.3" stopColor="#555" />
            <stop offset="0.5" stopColor="#000" />
          </linearGradient>
          <mask id="or-mask">
            <rect width={W} height={H} fill="url(#or-fade)" />
          </mask>
          <filter id="or-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>
        <g mask="url(#or-mask)" className="bg-ridge-breathe">
          <g fill="none" stroke={GOLD} strokeWidth="3.4" opacity="0.28" filter="url(#or-glow)" className="bg-dense">
            {RIDGE.rings.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>
          <g fill="none" stroke={GOLD} strokeWidth="1.1">
            {RIDGE.rings.map((d, i) => (
              <path key={i} d={d} opacity={0.4 + (i % 3) * 0.16} />
            ))}
          </g>
        </g>
        <g className="bg-hex-drift">
          {RIDGE.hexes.map((h, i) => (
            <path
              key={i}
              d={hexPath(h.x, h.y, h.r)}
              fill={h.fill ? GOLD : "none"}
              stroke={GOLD}
              strokeWidth="1"
              opacity={Math.max(0.06, h.o)}
              className={i % 2 ? "bg-dense" : undefined}
            />
          ))}
        </g>
      </Svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. The Vault (case board)                                          */
/* ------------------------------------------------------------------ */
function buildVault() {
  const r = rng(33);
  const rows = [90, 250, 410, 570, 730];
  const boxes: Array<{
    x: number;
    y: number;
    w: number;
    h: number;
    row: number;
    tag?: string;
    back: boolean;
  }> = [];
  rows.forEach((y, row) => {
    for (const back of [true, false]) {
      let x = back ? -20 : 10 + r() * 40;
      while (x < W) {
        const w = 70 + r() * 80;
        const h = (back ? 70 : 90) + r() * 40;
        boxes.push({
          x,
          y: y + (back ? 0 : 22) - h + 70,
          w,
          h,
          row,
          back,
          tag:
            !back && r() < 0.35
              ? `${((r() * 65535) | 0).toString(16).toUpperCase().padStart(4, "0")} ${((r() * 65535) | 0).toString(16).toUpperCase().padStart(4, "0")}`
              : undefined,
        });
        x += w + 8 + r() * 40;
      }
    }
  });
  return { rows, boxes };
}
const VAULT = buildVault();

export function Vault() {
  return (
    <div className="absolute inset-0">
      <Svg>
        <defs>
          <linearGradient id="v-box" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#3a2e1d" />
            <stop offset="1" stopColor="#14100b" />
          </linearGradient>
          <filter id="v-soft"><feGaussianBlur stdDeviation="0.9" /></filter>
          <filter id="v-blur" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="3.2" />
          </filter>
          <radialGradient id="v-light-a" cx="22%" cy="14%" r="46%">
            <stop offset="0" stopColor={GOLD} stopOpacity="0.38" />
            <stop offset="1" stopColor={GOLD} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="v-light-b" cx="86%" cy="62%" r="38%">
            <stop offset="0" stopColor={GOLD} stopOpacity="0.26" />
            <stop offset="1" stopColor={GOLD} stopOpacity="0" />
          </radialGradient>
        </defs>
        <g opacity="0.4">
          {VAULT.boxes
            .filter((b) => b.back)
            .map((b, i) => (
              <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill="url(#v-box)" stroke={GOLD} strokeOpacity="0.22" filter="url(#v-blur)" />
            ))}
        </g>
        <g opacity="0.55" filter="url(#v-soft)">
          {VAULT.boxes
            .filter((b) => !b.back)
            .map((b, i) => (
              <g key={i} className={i % 3 === 0 ? "bg-dense" : undefined}>
                <rect x={b.x} y={b.y} width={b.w} height={b.h} fill="url(#v-box)" stroke={GOLD} strokeOpacity="0.3" />
                <rect x={b.x + 8} y={b.y + 12} width={b.w - 16} height="16" fill="rgba(214,176,104,0.12)" />
                <text x={b.x + b.w / 2} y={b.y + 24} textAnchor="middle" fontSize="9" letterSpacing="2" fill={GOLD_LIGHT} opacity="0.55" fontFamily="monospace">
                  EVIDENCE
                </text>
                {b.tag && (
                  <g>
                    <rect x={b.x + 10} y={b.y + b.h - 30} width={b.w - 20} height="18" fill="rgba(8,13,21,0.65)" stroke={GOLD} strokeOpacity="0.25" />
                    <text x={b.x + b.w / 2} y={b.y + b.h - 17} textAnchor="middle" fontSize="9" fill={GOLD_LIGHT} opacity="0.7" fontFamily="monospace">
                      {b.tag}
                    </text>
                  </g>
                )}
              </g>
            ))}
        </g>
        {/* Shelf strata */}
        <g>
          {VAULT.rows.map((y, i) => (
            <g key={i}>
              <rect x="0" y={y + 74} width={W} height="10" fill="#0b0c0f" opacity="0.9" />
              <rect x="0" y={y + 72} width={W} height="2" fill={GOLD} opacity="0.35" />
            </g>
          ))}
        </g>
        <rect width={W} height={H} fill="url(#v-light-a)" />
        <rect width={W} height={H} fill="url(#v-light-b)" />
        <rect width={W} height={H} className="bg-vault-sweep" fill="url(#v-light-a)" opacity="0.5" />
      </Svg>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,13,21,0.55) 0%, rgba(8,13,21,0.72) 55%, rgba(8,13,21,0.9) 100%)",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. The Constellation (roles / team)                                */
/* ------------------------------------------------------------------ */
function buildConstellation() {
  const r = rng(44);
  const nodes = Array.from({ length: 78 }, () => {
    const x = r() < 0.7 ? 520 + r() * 920 : r() * 520;
    const y = 10 + r() * 880;
    return { x: rd(x), y: rd(y), big: r() < 0.13, d: rd(r() * -8) };
  });
  const edges: Array<[number, number]> = [];
  const seen = new Set<string>();
  nodes.forEach((n, i) => {
    const near = nodes
      .map((m, j) => ({ j, dist: Math.hypot(n.x - m.x, n.y - m.y) }))
      .filter((o) => o.j !== i && o.dist < 230)
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 2);
    near.forEach((o) => {
      const key = i < o.j ? `${i}-${o.j}` : `${o.j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([i, o.j]);
      }
    });
  });
  return { nodes, edges };
}
const STARS = buildConstellation();

export function Constellation() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 50% at 78% 30%, rgba(214,176,104,0.10), transparent 70%)",
        }}
      />
      <Svg>
        <defs>
          <radialGradient id="cn-halo">
            <stop offset="0" stopColor={GOLD_LIGHT} stopOpacity="0.9" />
            <stop offset="0.35" stopColor={GOLD} stopOpacity="0.35" />
            <stop offset="1" stopColor={GOLD} stopOpacity="0" />
          </radialGradient>
        </defs>
        <g stroke={GOLD} strokeWidth="1" opacity="0.32">
          {STARS.edges.map(([a, b], i) => (
            <line key={i} x1={STARS.nodes[a].x} y1={STARS.nodes[a].y} x2={STARS.nodes[b].x} y2={STARS.nodes[b].y} />
          ))}
        </g>
        {STARS.nodes.map((n, i) => (
          <g key={i} className={`bg-twinkle${i % 2 ? " bg-dense" : ""}`} style={{ animationDelay: `${n.d}s` } as CSSProperties}>
            <circle cx={n.x} cy={n.y} r={n.big ? 26 : 10} fill="url(#cn-halo)" />
            <circle cx={n.x} cy={n.y} r={n.big ? 3.6 : 2} fill={GOLD_LIGHT} />
          </g>
        ))}
      </Svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. The Threshold (apply)                                           */
/* ------------------------------------------------------------------ */
function buildThreshold() {
  const r = rng(55);
  const glyphs = Array.from({ length: 64 }, () => {
    const x = 740 + (r() + r() + r()) * 150 - 70;
    return {
      x: rd(x),
      y: rd(80 + r() * 760),
      t: ((r() * 255) | 0).toString(16).toUpperCase().padStart(2, "0"),
      size: rd(9 + r() * 7),
      o: rd(0.15 + r() * 0.6),
      d: rd(r() * -16),
    };
  });
  const hexes = Array.from({ length: 36 }, () => ({
    x: rd(700 + r() * 480),
    y: rd(60 + r() * 780),
    r: rd(4 + r() * 9),
    o: rd(0.12 + r() * 0.4),
    d: rd(r() * -20),
  }));
  return { glyphs, hexes };
}
const THRESH = buildThreshold();

export function Threshold() {
  return (
    <div className="absolute inset-0">
      <Svg>
        <defs>
          <linearGradient id="th-beam" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={GOLD} stopOpacity="0" />
            <stop offset="0.5" stopColor={GOLD_LIGHT} stopOpacity="0.95" />
            <stop offset="1" stopColor={GOLD} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="th-fade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.55" stopColor="#bbb" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
          <mask id="th-mask">
            <rect width={W} height={H} fill="url(#th-fade)" />
          </mask>
          <filter id="th-blur" x="-50%" y="-5%" width="200%" height="110%">
            <feGaussianBlur stdDeviation="26" />
          </filter>
          <filter id="th-blur-s" x="-50%" y="-5%" width="200%" height="110%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <g mask="url(#th-mask)" className="bg-beam-breathe">
          <rect x="860" y="-20" width="220" height={H + 40} fill="url(#th-beam)" filter="url(#th-blur)" opacity="0.7" />
          <rect x="948" y="-20" width="44" height={H + 40} fill="url(#th-beam)" filter="url(#th-blur-s)" opacity="0.95" />
        </g>
        <g className="bg-rise" fontFamily="monospace" fill={GOLD_LIGHT}>
          {THRESH.glyphs.map((g, i) => (
            <text
              key={i}
              x={g.x}
              y={g.y}
              fontSize={g.size}
              opacity={g.o}
              className={`bg-glyph${i % 2 ? " bg-dense" : ""}`}
              style={{ animationDelay: `${g.d}s` } as CSSProperties}
            >
              {g.t}
            </text>
          ))}
        </g>
        <g fill="none" stroke={GOLD} strokeWidth="1">
          {THRESH.hexes.map((h, i) => (
            <path
              key={i}
              d={hexPath(h.x, h.y, h.r)}
              opacity={h.o}
              className={`bg-glyph${i % 2 ? " bg-dense" : ""}`}
              style={{ animationDelay: `${h.d}s` } as CSSProperties}
            />
          ))}
        </g>
      </Svg>
    </div>
  );
}

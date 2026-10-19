import { C, RuleLines, Scene, Spark, polar } from "./shared";

/* ------------------------------------------------------------------ */
/* Resources — a lit shelf, with a book open at the centre.           */
/* ------------------------------------------------------------------ */

const SHELF_BOOKS = [
  { x: 318, y: 150, w: 19, h: 62, gold: true },
  { x: 341, y: 160, w: 15, h: 52, gold: false },
  { x: 360, y: 145, w: 22, h: 67, gold: true },
  { x: 386, y: 157, w: 16, h: 55, gold: false },
  { x: 406, y: 148, w: 24, h: 64, gold: false },
  { x: 434, y: 164, w: 14, h: 48, gold: true },
  { x: 452, y: 150, w: 20, h: 62, gold: false },
  { x: 476, y: 158, w: 17, h: 54, gold: true },
  { x: 497, y: 144, w: 23, h: 68, gold: false },
  { x: 524, y: 160, w: 15, h: 52, gold: true },
  { x: 543, y: 149, w: 21, h: 63, gold: false },
  { x: 568, y: 156, w: 18, h: 56, gold: true },
  { x: 590, y: 146, w: 24, h: 66, gold: false },
  { x: 618, y: 162, w: 15, h: 50, gold: true },
  { x: 637, y: 151, w: 21, h: 61, gold: false },
  { x: 318, y: 266, w: 18, h: 58, gold: false },
  { x: 340, y: 276, w: 14, h: 48, gold: true },
  { x: 358, y: 260, w: 23, h: 64, gold: false },
  { x: 385, y: 272, w: 16, h: 52, gold: true },
  { x: 405, y: 264, w: 21, h: 60, gold: false },
  { x: 430, y: 278, w: 13, h: 46, gold: true },
  { x: 447, y: 262, w: 20, h: 62, gold: false },
  { x: 471, y: 270, w: 17, h: 54, gold: true },
  { x: 492, y: 258, w: 24, h: 66, gold: false },
  { x: 520, y: 274, w: 15, h: 50, gold: true },
  { x: 539, y: 264, w: 21, h: 60, gold: false },
  { x: 564, y: 278, w: 14, h: 46, gold: true },
  { x: 582, y: 260, w: 22, h: 64, gold: false },
  { x: 608, y: 272, w: 17, h: 52, gold: true },
  { x: 629, y: 266, w: 20, h: 58, gold: false },
  { x: 318, y: 382, w: 20, h: 52, gold: true },
  { x: 342, y: 390, w: 15, h: 44, gold: false },
  { x: 361, y: 376, w: 23, h: 58, gold: false },
  { x: 388, y: 388, w: 16, h: 46, gold: true },
  { x: 408, y: 380, w: 21, h: 54, gold: false },
  { x: 433, y: 392, w: 14, h: 42, gold: true },
  { x: 451, y: 376, w: 19, h: 58, gold: false },
  { x: 474, y: 386, w: 17, h: 48, gold: true },
  { x: 495, y: 374, w: 24, h: 60, gold: false },
  { x: 523, y: 390, w: 15, h: 44, gold: true },
  { x: 542, y: 380, w: 21, h: 54, gold: false },
  { x: 567, y: 392, w: 14, h: 42, gold: true },
  { x: 585, y: 376, w: 22, h: 58, gold: false },
  { x: 611, y: 388, w: 17, h: 46, gold: true },
  { x: 632, y: 382, w: 20, h: 52, gold: false },
];

export function ResourcesScene() {
  return (
    <Scene>
      <defs>
        <radialGradient id="lib-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.goldLight} stopOpacity="0.8" />
          <stop offset="42%" stopColor={C.gold} stopOpacity="0.25" />
          <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lib-page" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1c3d5c" />
          <stop offset="100%" stopColor="#102741" />
        </linearGradient>
      </defs>

      <path d="M294 520 L294 190 Q294 82 486 82 Q678 82 678 190 L678 520 Z" stroke={C.blue} strokeWidth="1" opacity="0.45" />
      <path d="M306 520 L306 194 Q306 94 486 94 Q666 94 666 194 L666 520" stroke={C.gold} strokeWidth="0.8" opacity="0.3" />
      <path d="M294 520 L294 190 Q294 82 486 82 Q678 82 678 190 L678 520" stroke={C.gold} strokeWidth="0.5" opacity="0.4" strokeDasharray="2 6" />

      {[218, 328, 438, 520].map((y, index) => (
        <g key={y}>
          <line x1="306" y1={y} x2="666" y2={y} stroke={index === 3 ? C.gold : C.blue} strokeWidth={index === 3 ? "1.2" : "0.9"} opacity={index === 3 ? "0.55" : "0.4"} />
          <line x1="306" y1={y + 5} x2="666" y2={y + 5} stroke={C.lineSoft} strokeWidth="0.6" opacity="0.6" />
        </g>
      ))}

      {SHELF_BOOKS.map((book, index) => (
        <g key={index}>
          <rect x={book.x} y={book.y} width={book.w} height={book.h} rx="2" fill={book.gold ? "rgba(230,182,79,0.1)" : "rgba(7,24,39,0.72)"} stroke={book.gold ? C.gold : C.blue} strokeWidth={book.gold ? "1" : "0.7"} opacity={book.gold ? "0.85" : "0.62"} />
          <line x1={book.x + 4} y1={book.y + 9} x2={book.x + book.w - 4} y2={book.y + 9} stroke={book.gold ? C.goldLight : C.blueLight} strokeWidth="0.7" opacity="0.55" />
          <line x1={book.x + 4} y1={book.y + 15} x2={book.x + book.w - 4} y2={book.y + 15} stroke={C.lineSoft} strokeWidth="0.6" />
        </g>
      ))}

      <circle cx="486" cy="360" r="136" fill="url(#lib-glow)" opacity="0.8" />
      <g>
        <path d="M370 344 C 410 320 454 324 486 350 L486 470 C 452 446 410 442 370 462 Z" fill="url(#lib-page)" stroke={C.gold} strokeWidth="1.4" />
        <path d="M486 350 C 518 324 562 320 602 344 L602 462 C 562 442 518 446 486 470 Z" fill="url(#lib-page)" stroke={C.gold} strokeWidth="1.4" />
        <path d="M486 350 L486 470" stroke={C.goldLight} strokeWidth="0.9" opacity="0.7" />
        <RuleLines x={392} y={366} width={64} rows={5} gap={12} color="rgba(245,244,240,0.3)" shortEvery={2} />
        <RuleLines x={514} y={366} width={64} rows={5} gap={12} color="rgba(245,244,240,0.3)" shortEvery={2} />
        <path d="M410 340 C 436 328 460 330 478 342" stroke={C.goldLight} strokeWidth="0.7" opacity="0.6" />
        <path d="M494 342 C 512 330 536 328 562 340" stroke={C.goldLight} strokeWidth="0.7" opacity="0.6" />
      </g>

      {[
        [-150, -90, 34, 46],
        [140, -120, 28, 40],
        [166, -44, 22, 32],
        [-178, 22, 24, 34],
      ].map(([dx, dy, w, h], index) => (
        <g key={index} transform={`translate(${486 + dx} ${360 + dy}) rotate(${index * 11 - 12})`} className="fx-hero-float" style={{ animationDelay: `${index * 0.7}s` }}>
          <rect width={w} height={h} rx="2" fill={C.card} stroke={index % 2 === 0 ? C.blue : C.gold} strokeWidth="0.8" opacity="0.75" />
          <line x1="5" y1="9" x2={w - 5} y2="9" stroke={C.line} strokeWidth="0.7" opacity="0.7" />
          <line x1="5" y1="15" x2={w - 8} y2="15" stroke={C.line} strokeWidth="0.6" opacity="0.5" />
        </g>
      ))}

      <g stroke={C.gold} strokeWidth="0.6" opacity="0.28">
        <line x1="486" y1="352" x2="360" y2="216" />
        <line x1="486" y1="352" x2="612" y2="216" />
        <line x1="486" y1="352" x2="306" y2="320" />
        <line x1="486" y1="352" x2="668" y2="320" />
      </g>

      <Spark x="286" y="150" r="2" color={C.blue} />
      <Spark x="700" y="170" r="2.2" />
      <Spark x="716" y="492" r="1.8" color={C.blue} />
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* Roadmap — a marked trail to the next summit.                       */
/* ------------------------------------------------------------------ */

export function RoadmapScene() {
  const trail = "M296 548 C 352 520 350 492 394 470 C 438 448 426 416 472 394 C 518 372 508 330 548 306 C 576 288 582 270 604 248";
  return (
    <Scene>
      <defs>
        <radialGradient id="road-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3c4" stopOpacity="0.95" />
          <stop offset="28%" stopColor={C.goldLight} stopOpacity="0.8" />
          <stop offset="62%" stopColor={C.gold} stopOpacity="0.28" />
          <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="road-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#071827" stopOpacity="0" />
          <stop offset="100%" stopColor="#153350" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="road-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d3f61" />
          <stop offset="100%" stopColor="#112a45" />
        </linearGradient>
        <linearGradient id="road-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#183755" />
          <stop offset="100%" stopColor="#0d233b" />
        </linearGradient>
        <linearGradient id="road-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#122c49" />
          <stop offset="100%" stopColor="#081a2c" />
        </linearGradient>
      </defs>

      <rect x="280" y="110" width="420" height="460" fill="url(#road-sky)" opacity="0.5" />
      <circle cx="612" cy="190" r="122" fill="url(#road-sun)" opacity="0.95" />
      <circle cx="612" cy="190" r="34" fill={C.goldLight} opacity="0.95" />
      <circle cx="612" cy="190" r="46" stroke={C.gold} strokeWidth="0.8" opacity="0.45" strokeDasharray="2 6" className="fx-hero-spin" />

      {Array.from({ length: 26 }, (_, index) => {
        const point = polar(612, 190, 90 + (index % 4) * 30, index * (360 / 26));
        return <circle key={index} cx={point.x} cy={point.y} r={index % 5 === 0 ? 1.8 : 1} fill={index % 5 === 0 ? C.gold : C.blue} opacity={0.35 + (index % 3) * 0.12} />;
      })}

      <path d="M0 430 L296 330 L338 356 L392 294 L444 344 L498 304 L548 352 L602 316 L660 362 L714 328 L760 350 L760 570 L0 570 Z" fill="#1b3f61" opacity="0.52" />
      <path d="M0 440 L316 320 L378 370 L438 286 L506 352 L566 300 L638 362 L714 318 L760 338 L760 570 L0 570 Z" fill="url(#road-far)" opacity="0.92" />
      <path d="M438 286 L456 300 L438 310 L419 300 Z" fill="#f5f4f0" opacity="0.35" />
      <path d="M0 474 L332 396 L412 442 L486 372 L560 430 L632 382 L714 424 L760 444 L760 570 L0 570 Z" fill="url(#road-mid)" />
      <path d="M0 536 L330 472 L418 512 L510 452 L594 504 L676 470 L714 486 L760 500 L760 570 L0 570 Z" fill="url(#road-near)" />
      <path d={trail} stroke={C.ink} strokeWidth="8" opacity="0.45" strokeLinecap="round" />
      <path d={trail} stroke={C.gold} strokeWidth="2.2" strokeDasharray="5 7" strokeLinecap="round" className="fx-hero-dash" />
      {[
        [394, 470],
        [472, 394],
        [548, 306],
        [604, 248],
      ].map(([x, y], index) => (
        <g key={index}>
          <circle cx={x} cy={y} r="9" fill={C.ink} stroke={C.gold} strokeWidth="1.4" />
          <circle cx={x} cy={y} r="3" fill={index === 3 ? C.goldLight : C.gold} />
          <circle cx={x} cy={y} r="15" stroke={C.gold} strokeWidth="0.5" opacity="0.35" />
        </g>
      ))}

      <line x1="604" y1="248" x2="604" y2="192" stroke={C.goldLight} strokeWidth="1.6" />
      <path d="M604 194 L650 210 L604 228 Z" fill={C.gold} opacity="0.9" />
      <circle cx="604" cy="190" r="3" fill={C.goldLight} />

      <g opacity="0.28" stroke={C.blue} strokeWidth="0.6">
        <path d="M300 534 C 372 518 424 524 486 500" />
        <path d="M316 550 C 392 534 446 540 514 516" />
        <path d="M340 568 C 408 552 468 558 536 536" />
      </g>

      <Spark x="274" y="184" r="2" color={C.blue} />
      <Spark x="708" y="286" r="2.2" />
      <Spark x="322" y="250" r="1.7" color={C.blue} />
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* Datasets — a disk platter with its read arm and evidence tag.      */
/* ------------------------------------------------------------------ */

export function DatasetsScene() {
  return (
    <Scene>
      <defs>
        <radialGradient id="disk-face" cx="45%" cy="38%" r="68%">
          <stop offset="0%" stopColor="#214464" />
          <stop offset="62%" stopColor="#10263d" />
          <stop offset="100%" stopColor="#0a1b2e" />
        </radialGradient>
        <linearGradient id="disk-arm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9cc3ee" />
          <stop offset="100%" stopColor={C.blue} />
        </linearGradient>
        <radialGradient id="disk-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.blue} stopOpacity="0.25" />
          <stop offset="100%" stopColor={C.blue} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="492" cy="310" r="258" stroke={C.blue} strokeWidth="0.7" strokeDasharray="2 10" opacity="0.2" />
      <circle cx="492" cy="310" r="214" fill="url(#disk-glow)" opacity="0.8" />

      <circle cx="492" cy="310" r="194" fill="url(#disk-face)" stroke={C.gold} strokeWidth="1.4" />
      <circle cx="492" cy="310" r="176" stroke={C.blue} strokeWidth="0.7" opacity="0.55" />
      <circle cx="492" cy="310" r="146" stroke={C.line} strokeWidth="0.7" opacity="0.5" />
      <circle cx="492" cy="310" r="112" stroke={C.blue} strokeWidth="0.7" opacity="0.35" strokeDasharray="2 5" />
      <circle cx="492" cy="310" r="76" stroke={C.gold} strokeWidth="0.7" opacity="0.35" />
      <circle cx="492" cy="310" r="42" stroke={C.line} strokeWidth="0.8" opacity="0.55" />
      <circle cx="492" cy="310" r="16" fill={C.ink} stroke={C.gold} strokeWidth="1.2" />
      <circle cx="492" cy="310" r="6" fill={C.gold} opacity="0.8" />

      {Array.from({ length: 26 }, (_, index) => {
        const angle = (index / 26) * 360;
        const outer = polar(492, 310, 190, angle);
        const inner = polar(492, 310, 178, angle);
        return <line key={index} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke={index % 4 === 0 ? C.gold : C.blue} strokeWidth={index % 4 === 0 ? "1" : "0.6"} opacity={index % 4 === 0 ? "0.45" : "0.25"} />;
      })}

      <g transform="rotate(24 492 310)">
        <rect x="492" y="80" width="16" height="172" rx="7" fill="#163451" stroke={C.blue} strokeWidth="0.8" />
        <circle cx="500" cy="82" r="17" fill={C.ink} stroke={C.gold} strokeWidth="1.2" />
        <circle cx="500" cy="82" r="5" fill={C.gold} />
        <path d="M500 256 L518 292 L500 310 L482 292 Z" fill="url(#disk-arm)" stroke={C.blueLight} strokeWidth="0.8" />
        <circle cx="500" cy="304" r="4" fill={C.ink} stroke={C.goldLight} strokeWidth="0.9" />
      </g>

      <g transform="translate(650 410) rotate(-8)">
        <rect width="88" height="48" rx="5" fill={C.ink} stroke={C.gold} strokeWidth="0.9" />
        <text x="12" y="20" fill={C.goldLight} fontFamily="var(--font-plex-mono), monospace" fontSize="8" letterSpacing="1.8">
          SAMPLE
        </text>
        <text x="12" y="34" fill={C.blueLight} fontFamily="var(--font-plex-mono), monospace" fontSize="8" letterSpacing="1.6">
          LAWFUL USE
        </text>
        <circle cx="72" cy="12" r="3" fill={C.ink} stroke={C.gold} strokeWidth="0.8" />
      </g>

      {[
        [284, 158, 14],
        [704, 210, 10],
        [268, 454, 8],
        [730, 492, 12],
      ].map(([x, y, size], index) => (
        <g key={index} className="fx-hero-float" style={{ animationDelay: `${index * 0.6}s` }}>
          <rect x={x} y={y} width={size} height={size} rx="3" fill={C.card} stroke={index % 2 === 0 ? C.blue : C.gold} strokeWidth="0.8" opacity="0.8" />
          <circle cx={x + size / 2} cy={y + size / 2} r="2" fill={index % 2 === 0 ? C.blueLight : C.goldLight} opacity="0.7" />
        </g>
      ))}

      <Spark x="260" y="290" r="2" color={C.blue} />
      <Spark x="732" y="350" r="2.2" />
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* Tools — an open kit, laid out on a pegboard.                       */
/* ------------------------------------------------------------------ */

export function ToolsScene() {
  return (
    <Scene>
      <defs>
        <pattern id="tool-peg" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill={C.blue} opacity="0.3" />
        </pattern>
        <linearGradient id="tool-case" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#193957" />
          <stop offset="100%" stopColor="#0d2238" />
        </linearGradient>
      </defs>

      <rect x="288" y="80" width="448" height="468" rx="16" fill="url(#tool-peg)" stroke={C.blue} strokeWidth="0.8" opacity="0.68" />

      <g transform="rotate(-3 492 330)">
        <path d="M326 270 L658 270 L640 522 L344 522 Z" fill="url(#tool-case)" stroke={C.gold} strokeWidth="1.4" />
        <path d="M326 270 L658 270 L652 306 L332 306 Z" fill="#1d3d5e" stroke={C.blue} strokeWidth="0.8" opacity="0.85" />
        <path d="M352 270 Q352 230 388 230 L596 230 Q632 230 632 270" stroke={C.gold} strokeWidth="1.6" />
        <path d="M370 270 Q370 248 392 248 L592 248 Q614 248 614 270" stroke={C.blue} strokeWidth="0.8" opacity="0.65" />
        <rect x="470" y="214" width="36" height="18" rx="6" fill={C.ink} stroke={C.gold} strokeWidth="0.8" />

        <g transform="translate(360 332)">
          <path d="M0 44 L54 12 L60 22 L30 42 L58 48 L54 58 L24 52 L6 62 Z" fill="rgba(106,160,220,0.12)" stroke={C.blue} strokeWidth="1" />
          <circle cx="56" cy="17" r="7" stroke={C.blueLight} strokeWidth="0.8" />
        </g>

        <g transform="translate(440 330) rotate(18)">
          <rect x="0" y="12" width="94" height="15" rx="7" fill="rgba(230,182,79,0.1)" stroke={C.gold} strokeWidth="1" />
          <rect x="88" y="6" width="22" height="27" rx="4" fill={C.ink} stroke={C.gold} strokeWidth="0.9" />
          <line x1="96" y1="14" x2="104" y2="14" stroke={C.goldLight} strokeWidth="0.8" />
          <line x1="96" y1="20" x2="104" y2="20" stroke={C.goldLight} strokeWidth="0.8" />
          <line x1="96" y1="26" x2="104" y2="26" stroke={C.goldLight} strokeWidth="0.8" />
        </g>

        <g transform="translate(558 330)">
          <rect x="18" y="0" width="58" height="68" rx="6" fill={C.ink} stroke={C.blue} strokeWidth="1" />
          <rect x="32" y="10" width="30" height="20" rx="3" fill={C.blue} opacity="0.22" stroke={C.blueLight} strokeWidth="0.8" />
          {Array.from({ length: 4 }, (_, index) => (
            <line key={index} x1="32" y1={40 + index * 6} x2="62" y2={40 + index * 6} stroke={C.blueLight} strokeWidth="0.7" opacity="0.45" />
          ))}
          {[24, 34, 44, 54].map((x) => (
            <line key={x} x1={x} y1="68" x2={x} y2="78" stroke={C.gold} strokeWidth="1" />
          ))}
        </g>

        <g transform="translate(382 432)">
          <rect x="0" y="0" width="74" height="52" rx="5" fill={C.ink} stroke={C.gold} strokeWidth="1" />
          <circle cx="37" cy="22" r="10" stroke={C.goldLight} strokeWidth="0.9" />
          <circle cx="37" cy="22" r="3" fill={C.gold} />
          <line x1="12" y1="40" x2="62" y2="40" stroke={C.blueLight} strokeWidth="0.7" opacity="0.5" />
        </g>

        <g transform="translate(484 430) rotate(-8)">
          <rect x="0" y="14" width="44" height="16" rx="3" fill={C.ink} stroke={C.blue} strokeWidth="0.9" />
          <rect x="50" y="18" width="22" height="8" rx="2" fill={C.blue} opacity="0.35" stroke={C.blueLight} strokeWidth="0.7" />
          <rect x="8" y="6" width="46" height="8" rx="3" fill={C.ink} stroke={C.blueLight} strokeWidth="0.7" />
        </g>

        <g transform="translate(558 432)">
          <path d="M0 24 L26 0 L52 24 L26 48 Z" fill="rgba(230,182,79,0.08)" stroke={C.gold} strokeWidth="0.9" />
          <circle cx="26" cy="24" r="6" stroke={C.goldLight} strokeWidth="0.7" />
        </g>
      </g>

      <Spark x="274" y="170" r="2" color={C.blue} />
      <Spark x="724" y="210" r="2.2" />
      <Spark x="724" y="490" r="1.8" color={C.blue} />
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* Search — a lens over the index.                                    */
/* ------------------------------------------------------------------ */

export function SearchScene() {
  return (
    <Scene>
      <defs>
        <radialGradient id="search-lens" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.goldLight} stopOpacity="0.22" />
          <stop offset="55%" stopColor={C.blue} stopOpacity="0.12" />
          <stop offset="100%" stopColor={C.ink} stopOpacity="0.45" />
        </radialGradient>
      </defs>

      <circle cx="470" cy="310" r="240" stroke={C.blue} strokeWidth="0.8" strokeDasharray="2 10" opacity="0.22" />

      <g transform="rotate(-7 450 330)">
        <rect x="286" y="146" width="228" height="330" rx="8" fill="#0b1d31" stroke={C.blue} strokeWidth="0.8" opacity="0.8" transform="translate(28 18)" />
        <rect x="300" y="132" width="238" height="340" rx="8" fill={C.card} stroke={C.gold} strokeWidth="1" />
        <text x="322" y="166" fill={C.goldLight} fontFamily="var(--font-plex-mono), monospace" fontSize="9" letterSpacing="2">
          SEARCH INDEX
        </text>
        <RuleLines x={322} y={188} width={190} rows={9} gap={19} color="rgba(245,244,240,0.2)" />
        <rect x="318" y="290" width="198" height="28" rx="4" fill="rgba(230,182,79,0.08)" stroke={C.gold} strokeWidth="0.7" />
        <line x1="332" y1="304" x2="470" y2="304" stroke={C.goldLight} strokeWidth="1" opacity="0.65" />
      </g>

      <g transform="translate(542 330)">
        <circle cx="0" cy="0" r="104" fill="url(#search-lens)" stroke={C.gold} strokeWidth="4" />
        <circle cx="0" cy="0" r="91" stroke={C.blueLight} strokeWidth="1" opacity="0.55" />
        <circle cx="0" cy="0" r="76" stroke={C.lineSoft} strokeWidth="0.8" opacity="0.5" />
        <path d="M-36 18 L34 -16" stroke={C.goldLight} strokeWidth="1.1" opacity="0.65" />
        <line x1="74" y1="74" x2="138" y2="138" stroke={C.gold} strokeWidth="12" strokeLinecap="round" />
        <line x1="74" y1="74" x2="138" y2="138" stroke={C.goldLight} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      </g>

      <path d="M300 520 C 372 498 430 506 486 476" stroke={C.blue} strokeWidth="1" strokeDasharray="3 7" opacity="0.35" />
      <Spark x="276" y="180" r="2" color={C.blue} />
      <Spark x="704" y="188" r="2.2" />
      <Spark x="694" y="512" r="1.8" color={C.blue} />
    </Scene>
  );
}

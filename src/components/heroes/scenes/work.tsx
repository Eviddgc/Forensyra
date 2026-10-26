import { C, RuleLines, Scene, Spark } from "./shared";

/* ------------------------------------------------------------------ */
/* Projects — an evidence board with pinned case cards and string.     */
/* ------------------------------------------------------------------ */

export function ProjectsScene() {
  return (
    <Scene>
      <defs>
        <pattern id="case-grid" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill={C.blue} opacity="0.35" />
        </pattern>
        <radialGradient id="case-pin" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.goldLight} />
          <stop offset="100%" stopColor={C.gold} />
        </radialGradient>
        <linearGradient id="case-tag" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a2c31" />
          <stop offset="100%" stopColor="#10141c" />
        </linearGradient>
      </defs>

      <rect x="286" y="78" width="448" height="476" rx="18" fill="url(#case-grid)" stroke={C.blue} strokeWidth="0.8" opacity="0.5" />
      <rect x="304" y="96" width="412" height="440" rx="12" stroke={C.lineSoft} strokeWidth="0.8" opacity="0.5" />

      <path d="M426 140 C 500 160 570 198 596 254" stroke={C.gold} strokeWidth="1.4" opacity="0.65" />
      <path d="M596 254 C 570 286 470 340 466 372" stroke={C.gold} strokeWidth="1.4" opacity="0.6" />
      <path d="M596 254 C 632 272 660 288 686 304" stroke={C.blue} strokeWidth="1.1" strokeDasharray="3 4" opacity="0.55" />

      <g transform="translate(328 132) rotate(-8)">
        <rect width="190" height="148" rx="8" fill={C.card} stroke={C.gold} strokeWidth="1.3" />
        <rect x="1" y="1" width="188" height="146" rx="7" stroke={C.gold} strokeWidth="0.4" opacity="0.3" />
        <text x="18" y="30" fill={C.goldLight} opacity="0.85" fontFamily="var(--font-plex-mono), monospace" fontSize="10" letterSpacing="2">
          EVIDENCE 01
        </text>
        <rect x="18" y="44" width="154" height="70" rx="4" fill={C.ink} stroke={C.blue} strokeWidth="0.8" opacity="0.9" />
        {[18, 30, 42, 54, 66, 78].map((radius, index) => (
          <path
            key={index}
            d={`M${68 + radius * 0.62} ${79 - radius * 0.22} A${radius} ${radius * 0.72} 0 1 1 ${68 - radius * 0.6} ${79 + radius * 0.2}`}
            stroke={index % 2 === 0 ? C.gold : C.blue}
            strokeWidth="0.8"
            opacity={0.55 - index * 0.05}
          />
        ))}
        <RuleLines x={18} y={124} width={152} rows={2} gap={9} />
        <circle cx="95" cy="4" r="8" fill="url(#case-pin)" stroke="#fbe7ad" strokeWidth="0.8" />
        <circle cx="92" cy="1" r="2.2" fill="#fff8e1" opacity="0.8" />
      </g>

      <g transform="translate(474 214) rotate(7)">
        <rect width="204" height="154" rx="8" fill={C.card} stroke={C.blue} strokeWidth="1.3" />
        <text x="18" y="30" fill={C.blueLight} opacity="0.9" fontFamily="var(--font-plex-mono), monospace" fontSize="10" letterSpacing="2">
          DISK IMAGE
        </text>
        <rect x="18" y="44" width="168" height="72" rx="4" fill={C.ink} stroke={C.blue} strokeWidth="0.8" opacity="0.95" />
        <circle cx="102" cy="80" r="27" stroke={C.gold} strokeWidth="1.1" opacity="0.8" />
        <circle cx="102" cy="80" r="19" stroke={C.blue} strokeWidth="0.7" strokeDasharray="2 4" opacity="0.65" />
        <circle cx="102" cy="80" r="5" fill={C.gold} opacity="0.7" />
        <path d="M132 58 L150 68" stroke={C.blueLight} strokeWidth="1" opacity="0.7" />
        <RuleLines x={18} y={128} width={166} rows={2} gap={9} />
        <circle cx="102" cy="4" r="8" fill="url(#case-pin)" stroke="#fbe7ad" strokeWidth="0.8" />
      </g>

      <g transform="translate(372 352) rotate(-3)">
        <rect width="218" height="150" rx="8" fill={C.card} stroke={C.gold} strokeWidth="1.2" />
        <text x="18" y="29" fill={C.goldLight} opacity="0.85" fontFamily="var(--font-plex-mono), monospace" fontSize="10" letterSpacing="2">
          NETWORK TRACE
        </text>
        <rect x="18" y="43" width="182" height="68" rx="4" fill={C.ink} stroke={C.gold} strokeWidth="0.7" opacity="0.85" />
        {[
          [44, 78],
          [82, 58],
          [122, 88],
          [164, 66],
          [184, 96],
        ].map(([x, y], index) => (
          <g key={index}>
            <circle cx={x} cy={y} r={index === 2 ? 7 : 4.5} fill={index === 2 ? C.gold : C.blue} opacity="0.9" />
            {index > 0 ? (
              <line x1={44} y1={78} x2={x} y2={y} stroke={index === 2 ? C.gold : C.blue} strokeWidth="0.8" opacity="0.45" />
            ) : null}
          </g>
        ))}
        <RuleLines x={18} y={126} width={180} rows={2} gap={9} />
        <circle cx="109" cy="4" r="8" fill="url(#case-pin)" stroke="#fbe7ad" strokeWidth="0.8" />
      </g>

      <g transform="translate(650 248) rotate(8)">
        <rect width="82" height="54" rx="6" fill="url(#case-tag)" stroke={C.gold} strokeWidth="1" />
        <circle cx="12" cy="12" r="3" fill={C.ink} stroke={C.gold} strokeWidth="0.8" />
        <text x="23" y="25" fill={C.goldLight} fontFamily="var(--font-plex-mono), monospace" fontSize="10" letterSpacing="1.8">
          CASE
        </text>
        <text x="23" y="39" fill={C.blueLight} opacity="0.8" fontFamily="var(--font-plex-mono), monospace" fontSize="9" letterSpacing="1.6">
          BOARD
        </text>
      </g>

      <g opacity="0.55">
        <line x1="292" y1="510" x2="724" y2="510" stroke={C.line} strokeWidth="0.8" />
        {Array.from({ length: 22 }, (_, index) => (
          <line key={index} x1={300 + index * 19} y1="505" x2={300 + index * 19} y2={index % 5 === 0 ? 495 : 500} stroke={index % 5 === 0 ? C.gold : C.line} strokeWidth="0.8" />
        ))}
      </g>

      <Spark x="280" y="130" r="2" color={C.blue} />
      <Spark x="728" y="472" r="2.2" />
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* Write-ups — an annotated field journal, magnified.                 */
/* ------------------------------------------------------------------ */

export function WriteupsScene() {
  return (
    <Scene>
      <defs>
        <linearGradient id="paper-left" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2f3035" />
          <stop offset="100%" stopColor="#131419" />
        </linearGradient>
        <linearGradient id="paper-right" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#323338" />
          <stop offset="100%" stopColor="#0f131b" />
        </linearGradient>
        <radialGradient id="write-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.gold} stopOpacity="0.25" />
          <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="486" cy="314" r="250" stroke={C.blue} strokeWidth="0.8" strokeDasharray="2 10" opacity="0.2" />
      <circle cx="486" cy="314" r="214" fill="url(#write-glow)" opacity="0.65" />

      <g transform="rotate(-6 486 318)">
        <rect x="300" y="196" width="366" height="250" rx="10" fill="#0c1119" stroke={C.blue} strokeWidth="0.7" opacity="0.7" transform="translate(18 -16)" />
        <rect x="308" y="186" width="366" height="254" rx="10" fill="#0e1219" stroke={C.blue} strokeWidth="0.8" opacity="0.85" transform="translate(9 -8)" />

        <path d="M300 214 C 372 190 432 202 486 238 L486 472 C 432 436 372 424 300 448 Z" fill="url(#paper-left)" stroke={C.gold} strokeWidth="1.2" />
        <path d="M486 238 C 540 202 600 190 672 214 L672 448 C 600 424 540 436 486 472 Z" fill="url(#paper-right)" stroke={C.gold} strokeWidth="1.2" />
        <path d="M486 238 L486 472" stroke={C.gold} strokeWidth="0.8" opacity="0.7" />
        <path d="M300 214 C 372 190 432 202 486 238" stroke={C.goldLight} strokeWidth="0.5" opacity="0.45" />
        <path d="M486 238 C 540 202 600 190 672 214" stroke={C.goldLight} strokeWidth="0.5" opacity="0.45" />

        <text x="326" y="254" fill={C.goldLight} fontFamily="var(--font-plex-mono), monospace" fontSize="9" letterSpacing="2">
          FIELD NOTE 07
        </text>
        <RuleLines x={326} y={274} width={112} rows={9} gap={16} color="rgba(245,244,240,0.22)" />
        <rect x="326" y="334" width="108" height="34" rx="3" fill="rgba(214,176,104,0.1)" stroke={C.gold} strokeWidth="0.6" opacity="0.9" />
        <RuleLines x={334} y={345} width={92} rows={2} gap={10} color="rgba(245,213,138,0.55)" shortEvery={2} />

        <text x="514" y="254" fill={C.blueLight} fontFamily="var(--font-plex-mono), monospace" fontSize="9" letterSpacing="2">
          ANALYSIS
        </text>
        <RuleLines x={514} y={274} width={128} rows={5} gap={15} color="rgba(245,244,240,0.22)" shortEvery={0} />
        <circle cx="538" cy="370" r="17" stroke={C.blue} strokeWidth="0.9" opacity="0.7" />
        <circle cx="538" cy="370" r="6" fill={C.blue} opacity="0.5" />
        <line x1="562" y1="370" x2="588" y2="370" stroke={C.blue} strokeWidth="0.8" opacity="0.55" />
        <line x1="562" y1="382" x2="606" y2="382" stroke={C.blue} strokeWidth="0.8" opacity="0.4" />
        <line x1="562" y1="394" x2="592" y2="394" stroke={C.blue} strokeWidth="0.8" opacity="0.3" />

        <rect x="672" y="264" width="16" height="40" rx="3" fill={C.gold} opacity="0.8" />
        <rect x="672" y="316" width="16" height="34" rx="3" fill={C.blue} opacity="0.7" />
      </g>

      <g transform="translate(574 346)">
        <circle cx="0" cy="0" r="44" fill="rgba(8,13,21,0.72)" stroke={C.gold} strokeWidth="2.4" />
        <circle cx="0" cy="0" r="34" fill="rgba(212,175,95,0.08)" stroke={C.blue} strokeWidth="0.8" />
        <path d="M-20 10 L20 -10" stroke={C.goldLight} strokeWidth="1" opacity="0.65" />
        <path d="M-8 18 L14 -4" stroke={C.blueLight} strokeWidth="0.6" opacity="0.45" />
        <line x1="31" y1="31" x2="66" y2="66" stroke={C.gold} strokeWidth="5.5" strokeLinecap="round" />
        <line x1="31" y1="31" x2="66" y2="66" stroke={C.goldLight} strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
      </g>

      <g transform="rotate(-37 330 430)">
        <rect x="292" y="422" width="94" height="10" rx="5" fill="#1c2029" stroke={C.blue} strokeWidth="0.7" />
        <path d="M292 422 L274 427 L292 432 Z" fill={C.goldLight} stroke={C.gold} strokeWidth="0.6" />
        <line x1="300" y1="427" x2="374" y2="427" stroke={C.line} strokeWidth="0.6" opacity="0.55" />
      </g>

      <Spark x="262" y="210" r="2" color={C.blue} />
      <Spark x="704" y="176" r="2.4" />
      <Spark x="726" y="478" r="1.8" color={C.blue} />
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* Case detail — one evidence folder, opened.                         */
/* ------------------------------------------------------------------ */

export function CaseScene() {
  return (
    <Scene>
      <defs>
        <linearGradient id="folder-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#313237" />
          <stop offset="100%" stopColor="#0e1219" />
        </linearGradient>
        <radialGradient id="case-seal" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.gold} stopOpacity="0.35" />
          <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="480" cy="320" r="256" stroke={C.blue} strokeWidth="0.8" strokeDasharray="2 10" opacity="0.2" />
      <circle cx="480" cy="320" r="216" fill="url(#case-seal)" opacity="0.55" />

      <g transform="rotate(-3 480 322)">
        <path d="M292 192 L440 192 L462 218 L668 218 L668 502 L292 502 Z" fill="url(#folder-back)" stroke={C.blue} strokeWidth="1" opacity="0.9" />
        <path d="M292 232 L668 232 L668 502 L292 502 Z" fill="#0c1119" stroke={C.gold} strokeWidth="1.2" />
        <rect x="286" y="222" width="82" height="26" rx="6" fill={C.gold} opacity="0.85" />
        <text x="304" y="240" fill={C.ink} fontFamily="var(--font-plex-mono), monospace" fontSize="10" letterSpacing="2">
          CASE
        </text>

        <g transform="translate(326 258) rotate(-4)">
          <rect width="204" height="152" rx="7" fill={C.card} stroke={C.gold} strokeWidth="1" />
          <text x="16" y="26" fill={C.goldLight} fontFamily="var(--font-plex-mono), monospace" fontSize="9" letterSpacing="1.8">
            CHAIN OF CUSTODY
          </text>
          <RuleLines x={16} y={42} width={170} rows={3} gap={14} color="rgba(245,244,240,0.22)" shortEvery={0} />
          {[0, 1, 2].map((row) => (
            <g key={row}>
              <rect x="16" y={92 + row * 16} width="9" height="9" rx="2" stroke={row === 2 ? C.blue : C.gold} strokeWidth="0.8" />
              {row < 2 ? <path d={`M18 ${96 + row * 16} L20.5 ${99 + row * 16} L24 ${94 + row * 16}`} stroke={C.gold} strokeWidth="1" /> : null}
              <line x1="32" y1={97 + row * 16} x2={150 - row * 14} y2={97 + row * 16} stroke={C.line} strokeWidth="1" />
            </g>
          ))}
        </g>

        <g transform="translate(486 282) rotate(6)">
          <rect width="152" height="164" rx="7" fill={C.card} stroke={C.blue} strokeWidth="1" />
          <rect x="14" y="14" width="124" height="82" rx="4" fill={C.ink} stroke={C.blue} strokeWidth="0.7" />
          <circle cx="76" cy="55" r="28" stroke={C.gold} strokeWidth="1" opacity="0.8" />
          <circle cx="76" cy="55" r="20" stroke={C.blue} strokeWidth="0.7" strokeDasharray="2 4" opacity="0.6" />
          <circle cx="76" cy="55" r="5" fill={C.gold} />
          <RuleLines x={14} y={112} width={114} rows={3} gap={11} color="rgba(212,175,95,0.35)" shortEvery={0} />
        </g>

        <g transform="translate(340 410) rotate(-2)">
          <rect width="174" height="62" rx="6" fill={C.ink} stroke={C.blue} strokeWidth="0.8" opacity="0.95" />
          <text x="14" y="21" fill={C.blueLight} fontFamily="var(--font-plex-mono), monospace" fontSize="8" letterSpacing="1.8">
            HASH VERIFIED
          </text>
          <line x1="14" y1="31" x2="158" y2="31" stroke={C.line} strokeWidth="0.7" opacity="0.6" />
          <line x1="14" y1="42" x2="132" y2="42" stroke={C.line} strokeWidth="0.7" opacity="0.4" />
          <line x1="14" y1="52" x2="146" y2="52" stroke={C.line} strokeWidth="0.7" opacity="0.3" />
        </g>

        <g transform="translate(542 444) rotate(5)">
          <rect width="82" height="48" rx="5" fill={C.ink} stroke={C.gold} strokeWidth="0.8" />
          <text x="12" y="20" fill={C.goldLight} fontFamily="var(--font-plex-mono), monospace" fontSize="8" letterSpacing="1.7">
            OPEN
          </text>
          <text x="12" y="34" fill={C.blueLight} fontFamily="var(--font-plex-mono), monospace" fontSize="8" letterSpacing="1.7">
            CASE FILE
          </text>
        </g>

        <circle cx="460" cy="238" r="8" fill={C.gold} stroke={C.goldLight} strokeWidth="0.7" />
        <circle cx="457" cy="235" r="2.1" fill="#fff8e1" opacity="0.8" />
      </g>

      <Spark x="264" y="188" r="2" color={C.blue} />
      <Spark x="720" y="470" r="2.2" />
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* Research detail — one annotated page under a lens.                 */
/* ------------------------------------------------------------------ */

export function ResearchScene() {
  return (
    <Scene>
      <defs>
        <linearGradient id="research-page" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#313237" />
          <stop offset="100%" stopColor="#0f131b" />
        </linearGradient>
      </defs>

      <circle cx="486" cy="312" r="244" stroke={C.blue} strokeWidth="0.8" strokeDasharray="2 10" opacity="0.2" />
      <circle cx="486" cy="312" r="196" stroke={C.gold} strokeWidth="0.7" opacity="0.2" />

      <g transform="rotate(-5 480 316)">
        <rect x="352" y="128" width="296" height="386" rx="8" fill="#0c1119" stroke={C.blue} strokeWidth="0.8" transform="translate(14 10)" opacity="0.55" />
        <rect x="340" y="118" width="296" height="386" rx="8" fill="url(#research-page)" stroke={C.gold} strokeWidth="1.2" />
        <rect x="360" y="140" width="256" height="342" rx="3" stroke={C.lineSoft} strokeWidth="0.7" />
        <text x="378" y="176" fill={C.goldLight} fontFamily="var(--font-plex-mono), monospace" fontSize="9" letterSpacing="2.2">
          RESEARCH NOTE
        </text>
        <text x="378" y="212" fill="#f5f4f0" opacity="0.86" fontFamily="var(--font-playfair), serif" fontSize="26">
          Evidence, explained.
        </text>
        <RuleLines x={378} y={240} width={210} rows={8} gap={17} color="rgba(245,244,240,0.2)" />
        <rect x="374" y="330" width="184" height="48" rx="3" fill="rgba(214,176,104,0.09)" stroke={C.gold} strokeWidth="0.7" />
        <RuleLines x={386} y={343} width={158} rows={2} gap={13} color="rgba(245,213,138,0.5)" shortEvery={2} />
        <line x1="378" y1="414" x2="592" y2="414" stroke={C.line} strokeWidth="0.7" opacity="0.6" />
        <line x1="378" y1="432" x2="540" y2="432" stroke={C.line} strokeWidth="0.7" opacity="0.4" />
        <rect x="562" y="174" width="18" height="54" rx="3" fill={C.gold} opacity="0.8" />
      </g>

      <g transform="translate(588 356)">
        <circle cx="0" cy="0" r="42" fill="rgba(8,13,21,0.7)" stroke={C.gold} strokeWidth="2.2" />
        <circle cx="0" cy="0" r="32" stroke={C.blue} strokeWidth="0.8" />
        <path d="M-16 12 L18 -10" stroke={C.goldLight} strokeWidth="0.9" opacity="0.7" />
        <line x1="30" y1="30" x2="64" y2="64" stroke={C.gold} strokeWidth="5" strokeLinecap="round" />
      </g>

      <Spark x="292" y="210" r="2" color={C.blue} />
      <Spark x="702" y="188" r="2.2" />
      <Spark x="292" y="482" r="1.8" color={C.blue} />
    </Scene>
  );
}

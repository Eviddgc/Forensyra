import { C, RuleLines, Scene, Spark, polar } from "./shared";

/* ------------------------------------------------------------------ */
/* Ethics — the scales, over a foundation of rules.                   */
/* ------------------------------------------------------------------ */

export function EthicsScene() {
  return (
    <Scene>
      <defs>
        <radialGradient id="ethics-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.gold} stopOpacity="0.26" />
          <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ethics-beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={C.goldDeep} />
          <stop offset="50%" stopColor={C.goldLight} />
          <stop offset="100%" stopColor={C.goldDeep} />
        </linearGradient>
      </defs>

      <circle cx="490" cy="312" r="256" stroke={C.blue} strokeWidth="0.8" strokeDasharray="2 10" opacity="0.2" />
      <circle cx="490" cy="312" r="222" fill="url(#ethics-halo)" opacity="0.85" />
      <circle cx="490" cy="312" r="204" stroke={C.gold} strokeWidth="0.8" opacity="0.28" />

      {Array.from({ length: 9 }, (_, index) => (
        <line key={index} x1={318 + index * 43} y1="126" x2={318 + index * 43} y2="500" stroke={C.lineSoft} strokeWidth="0.7" opacity="0.45" />
      ))}

      <g>
        <path d="M430 496 L550 496 L566 516 L414 516 Z" fill={C.card} stroke={C.gold} strokeWidth="1.1" />
        <rect x="462" y="472" width="56" height="24" rx="4" fill={C.ink} stroke={C.blue} strokeWidth="0.8" />
        <rect x="484" y="224" width="12" height="248" fill={C.ink} stroke={C.gold} strokeWidth="1.2" />
        <line x1="490" y1="224" x2="490" y2="188" stroke={C.gold} strokeWidth="1.6" />
        <circle cx="490" cy="180" r="10" fill={C.ink} stroke={C.gold} strokeWidth="1.4" />
        <circle cx="490" cy="180" r="3.5" fill={C.goldLight} />

        <line x1="330" y1="238" x2="650" y2="238" stroke="url(#ethics-beam)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="330" cy="238" r="7" fill={C.ink} stroke={C.gold} strokeWidth="1.2" />
        <circle cx="650" cy="238" r="7" fill={C.ink} stroke={C.gold} strokeWidth="1.2" />

        <line x1="330" y1="238" x2="286" y2="344" stroke={C.gold} strokeWidth="0.9" opacity="0.7" />
        <line x1="330" y1="238" x2="374" y2="344" stroke={C.gold} strokeWidth="0.9" opacity="0.7" />
        <path d="M272 350 Q330 398 388 350" stroke={C.gold} strokeWidth="2" fill="rgba(214,176,104,0.07)" />
        <path d="M286 344 L374 344" stroke={C.gold} strokeWidth="0.8" opacity="0.5" />

        <line x1="650" y1="238" x2="606" y2="344" stroke={C.gold} strokeWidth="0.9" opacity="0.7" />
        <line x1="650" y1="238" x2="694" y2="344" stroke={C.gold} strokeWidth="0.9" opacity="0.7" />
        <path d="M592 350 Q650 398 708 350" stroke={C.gold} strokeWidth="2" fill="rgba(214,176,104,0.07)" />
        <path d="M606 344 L694 344" stroke={C.gold} strokeWidth="0.8" opacity="0.5" />

        <g transform="rotate(-5 330 318)">
          <rect x="300" y="300" width="60" height="38" rx="3" fill={C.card} stroke={C.blue} strokeWidth="0.8" />
          <RuleLines x={308} y={311} width={44} rows={3} gap={8} color="rgba(212,175,95,0.45)" shortEvery={2} />
        </g>

        <g transform="rotate(6 650 318)">
          <rect x="624" y="302" width="52" height="34" rx="4" fill={C.card} stroke={C.gold} strokeWidth="0.8" />
          <circle cx="650" cy="319" r="8" stroke={C.goldLight} strokeWidth="0.8" />
          <circle cx="650" cy="319" r="2.5" fill={C.gold} />
          <line x1="634" y1="331" x2="666" y2="331" stroke={C.line} strokeWidth="0.7" opacity="0.5" />
        </g>
      </g>

      <path d="M280 466 C 356 442 414 448 486 426" stroke={C.blue} strokeWidth="1" strokeDasharray="3 7" opacity="0.3" />
      <Spark x="270" y="176" r="2" color={C.blue} />
      <Spark x="710" y="170" r="2.2" />
      <Spark x="716" y="472" r="1.8" color={C.blue} />
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* Contact — a signal sent, and a reply coming back.                  */
/* ------------------------------------------------------------------ */

export function ContactScene() {
  return (
    <Scene>
      <defs>
        <radialGradient id="contact-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.goldLight} stopOpacity="0.9" />
          <stop offset="45%" stopColor={C.gold} stopOpacity="0.28" />
          <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="contact-wave" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.gold} />
          <stop offset="100%" stopColor={C.blue} />
        </linearGradient>
      </defs>

      <circle cx="490" cy="312" r="256" stroke={C.blue} strokeWidth="0.8" strokeDasharray="2 10" opacity="0.2" />
      {[58, 106, 154, 202].map((radius, index) => (
        <circle key={radius} cx="490" cy="312" r={radius} stroke={index % 2 === 0 ? C.gold : C.blue} strokeWidth={index === 0 ? "1.3" : "0.8"} opacity={0.48 - index * 0.08} />
      ))}
      <circle cx="490" cy="312" r="132" fill="url(#contact-core)" opacity="0.65" />

      {Array.from({ length: 32 }, (_, index) => {
        const point = polar(490, 312, 256, index * (360 / 32));
        const inner = polar(490, 312, index % 4 === 0 ? 242 : 248, index * (360 / 32));
        return <line key={index} x1={point.x} y1={point.y} x2={inner.x} y2={inner.y} stroke={index % 4 === 0 ? C.gold : C.blue} strokeWidth={index % 4 === 0 ? "1" : "0.6"} opacity={index % 4 === 0 ? "0.5" : "0.25"} />;
      })}

      <g>
        <rect x="430" y="280" width="120" height="70" rx="10" fill={C.card} stroke={C.gold} strokeWidth="1.6" />
        <path d="M438 290 L490 326 L542 290" stroke={C.goldLight} strokeWidth="1.2" opacity="0.85" />
        <path d="M438 342 L476 312" stroke={C.blueLight} strokeWidth="0.8" opacity="0.55" />
        <path d="M542 342 L504 312" stroke={C.blueLight} strokeWidth="0.8" opacity="0.55" />
        <circle cx="490" cy="312" r="45" stroke={C.gold} strokeWidth="0.7" strokeDasharray="2 5" opacity="0.5" className="fx-hero-spin" />
      </g>

      <g className="fx-hero-pulse" style={{ transformOrigin: "490px 312px" }}>
        <circle cx="490" cy="312" r="84" stroke={C.goldLight} strokeWidth="0.8" opacity="0.4" />
      </g>

      <path d="M620 234 C 674 214 704 182 720 142" stroke="url(#contact-wave)" strokeWidth="1.2" strokeDasharray="3 5" opacity="0.55" />
      <circle cx="720" cy="142" r="9" fill={C.ink} stroke={C.blue} strokeWidth="1.2" />
      <circle cx="720" cy="142" r="3" fill={C.blueLight} />
      <path d="M266 382 C 238 408 230 438 236 468" stroke={C.blue} strokeWidth="1" strokeDasharray="3 7" opacity="0.35" />

      {[
        [624, 430, C.gold],
        [276, 194, C.blue],
        [710, 368, C.blue],
        [342, 462, C.gold],
      ].map(([x, y, color], index) => (
        <circle key={index} cx={x as number} cy={y as number} r={2.2 + (index % 2)} fill={color as string} opacity="0.6" className="fx-hero-float" style={{ animationDelay: `${index * 0.6}s` }} />
      ))}
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* Security — a shield with a lock at its heart.                      */
/* ------------------------------------------------------------------ */

export function SecurityScene() {
  return (
    <Scene>
      <defs>
        <linearGradient id="shield-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2c31" />
          <stop offset="62%" stopColor="#101521" />
          <stop offset="100%" stopColor="#0a1c2f" />
        </linearGradient>
        <radialGradient id="shield-glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={C.gold} stopOpacity="0.28" />
          <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="492" cy="312" r="256" stroke={C.blue} strokeWidth="0.8" strokeDasharray="2 10" opacity="0.2" />
      <circle cx="492" cy="312" r="214" fill="url(#shield-glow)" opacity="0.8" />

      <g>
        <path d="M492 112 L638 170 L628 344 C 620 442 560 504 492 534 C 424 504 364 442 356 344 L346 170 Z" fill="url(#shield-face)" stroke={C.gold} strokeWidth="2" />
        <path d="M492 142 L608 188 L599 338 C 592 420 544 472 492 498 C 440 472 392 420 385 338 L376 188 Z" stroke={C.blue} strokeWidth="1" opacity="0.6" />
        <path d="M492 112 L492 534" stroke={C.lineSoft} strokeWidth="0.8" opacity="0.4" />
        <path d="M346 170 L638 170" stroke={C.lineSoft} strokeWidth="0.8" opacity="0.3" />
      </g>

      <g>
        <rect x="440" y="274" width="104" height="82" rx="12" fill={C.ink} stroke={C.gold} strokeWidth="1.8" />
        <path d="M462 274 L462 242 Q462 206 492 206 Q522 206 522 242 L522 274" stroke={C.gold} strokeWidth="7" strokeLinecap="round" />
        <path d="M462 274 L462 242 Q462 206 492 206 Q522 206 522 242 L522 274" stroke={C.goldLight} strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
        <circle cx="492" cy="307" r="12" fill={C.gold} />
        <path d="M492 316 L492 336" stroke={C.gold} strokeWidth="5" strokeLinecap="round" />
        <circle cx="492" cy="307" r="22" stroke={C.gold} strokeWidth="0.7" strokeDasharray="2 4" opacity="0.55" className="fx-hero-spin" />
      </g>

      <g stroke={C.blue} strokeWidth="0.9" opacity="0.55">
        <path d="M356 300 L286 300 L262 276 L226 276" strokeDasharray="3 5" />
        <path d="M628 300 L698 300 L722 276 L748 276" strokeDasharray="3 5" />
        <path d="M404 410 L348 466 L316 466" strokeDasharray="3 5" />
        <path d="M580 410 L636 466 L668 466" strokeDasharray="3 5" />
      </g>
      {[
        [226, 276],
        [748, 276],
        [316, 466],
        [668, 466],
      ].map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r="6" fill={C.ink} stroke={index % 2 === 0 ? C.gold : C.blue} strokeWidth="1" />
      ))}

      {Array.from({ length: 4 }, (_, index) => (
        <path key={index} d={`M${300 + index * 12} ${496 - index * 8} l18 -18 l12 12 l18 -18`} stroke={C.gold} strokeWidth="0.8" opacity="0.25" />
      ))}

      <Spark x="272" y="168" r="2" color={C.blue} />
      <Spark x="716" y="182" r="2.2" />
      <Spark x="716" y="486" r="1.8" color={C.blue} />
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* Playground — a shell that answers back.                            */
/* ------------------------------------------------------------------ */

export function PlaygroundScene() {
  return (
    <Scene>
      <defs>
        <linearGradient id="term-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#102945" />
          <stop offset="100%" stopColor="#0b1017" />
        </linearGradient>
        <radialGradient id="term-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.blue} stopOpacity="0.22" />
          <stop offset="100%" stopColor={C.blue} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="480" cy="310" r="246" stroke={C.blue} strokeWidth="0.8" strokeDasharray="2 10" opacity="0.2" />
      <circle cx="480" cy="310" r="202" fill="url(#term-glow)" opacity="0.8" />

      <g transform="rotate(-3 480 318)">
        <rect x="286" y="132" width="402" height="316" rx="13" fill={C.ink} stroke={C.gold} strokeWidth="1.4" />
        <rect x="286" y="132" width="402" height="42" rx="13" fill="#171b24" />
        <rect x="286" y="162" width="402" height="12" fill="#171b24" />
        <line x1="286" y1="174" x2="688" y2="174" stroke={C.gold} strokeWidth="0.8" opacity="0.5" />
        <circle cx="310" cy="153" r="5" fill={C.gold} opacity="0.9" />
        <circle cx="328" cy="153" r="5" fill={C.blue} opacity="0.75" />
        <circle cx="346" cy="153" r="5" fill={C.line} opacity="0.55" />
        <text x="444" y="157" fill={C.blueLight} opacity="0.75" fontFamily="var(--font-plex-mono), monospace" fontSize="9" letterSpacing="2">
          FORENSYRA SHELL
        </text>

        <rect x="286" y="174" width="402" height="274" fill="url(#term-face)" opacity="0.88" />
        <g fontFamily="var(--font-plex-mono), monospace" fontSize="12">
          <text x="314" y="210" fill={C.goldLight}>
            forensyra:~$
          </text>
          <text x="416" y="210" fill={C.blueLight}>
            help
          </text>
          <text x="314" y="238" fill={C.line} opacity="0.72">
            roles · projects · writeups · ethics
          </text>
          <text x="314" y="272" fill={C.goldLight}>
            forensyra:~$
          </text>
          <text x="416" y="272" fill={C.blueLight}>
            hash &quot;digital truth&quot;
          </text>
          <text x="314" y="300" fill={C.gold} opacity="0.8">
            sha256
          </text>
          <text x="380" y="300" fill={C.line} opacity="0.65">
            computed locally in your browser
          </text>
          <text x="314" y="334" fill={C.goldLight}>
            forensyra:~$
          </text>
          <rect x="416" y="322" width="9" height="14" fill={C.goldLight} className="fx-hero-blink" />
        </g>

        <g opacity="0.55">
          {Array.from({ length: 8 }, (_, index) => (
            <line key={index} x1="314" y1={366 + index * 8} x2={index % 3 === 0 ? 458 : 400 + index * 12} y2={366 + index * 8} stroke={C.lineSoft} strokeWidth="0.7" />
          ))}
        </g>
      </g>

      <g transform="translate(650 390) rotate(9)">
        <rect width="70" height="38" rx="5" fill={C.card} stroke={C.blue} strokeWidth="0.9" />
        <text x="10" y="16" fill={C.blueLight} fontFamily="var(--font-plex-mono), monospace" fontSize="7" letterSpacing="1.2">
          LOCAL
        </text>
        <text x="10" y="28" fill={C.goldLight} fontFamily="var(--font-plex-mono), monospace" fontSize="7" letterSpacing="1.2">
          NO TRACKING
        </text>
      </g>

      <path d="M250 224 C 274 198 292 182 316 170" stroke={C.gold} strokeWidth="1" strokeDasharray="3 6" opacity="0.35" />
      <Spark x="250" y="224" r="2" />
      <Spark x="720" y="180" r="2.2" color={C.blue} />
      <Spark x="720" y="510" r="1.8" />
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* Apply — a dossier, filled in and clipped shut.                     */
/* ------------------------------------------------------------------ */

export function ApplyScene() {
  return (
    <Scene>
      <defs>
        <linearGradient id="apply-folder" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2c31" />
          <stop offset="100%" stopColor="#0c2137" />
        </linearGradient>
        <radialGradient id="apply-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.gold} stopOpacity="0.24" />
          <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="486" cy="318" r="250" stroke={C.blue} strokeWidth="0.8" strokeDasharray="2 10" opacity="0.2" />
      <circle cx="486" cy="318" r="208" fill="url(#apply-glow)" opacity="0.7" />

      <g transform="rotate(-3 486 318)">
        <path d="M296 190 L446 190 L468 216 L676 216 L676 514 L296 514 Z" fill="url(#apply-folder)" stroke={C.blue} strokeWidth="1" opacity="0.95" />
        <path d="M296 236 L676 236 L676 514 L296 514 Z" fill="#0c1119" stroke={C.gold} strokeWidth="1.2" />
        <rect x="290" y="224" width="88" height="27" rx="6" fill={C.gold} />
        <text x="306" y="242" fill={C.ink} fontFamily="var(--font-plex-mono), monospace" fontSize="9" letterSpacing="1.8">
          APPLICATION
        </text>

        <g transform="translate(326 258) rotate(-2)">
          <rect width="300" height="230" rx="7" fill={C.card} stroke={C.gold} strokeWidth="1.1" />
          <text x="18" y="27" fill={C.goldLight} fontFamily="var(--font-plex-mono), monospace" fontSize="9" letterSpacing="2">
            TEAM APPLICATION
          </text>
          <RuleLines x={18} y={42} width={264} rows={3} gap={15} color="rgba(245,244,240,0.16)" shortEvery={0} />
          <text x="18" y="100" fill={C.blueLight} fontFamily="var(--font-plex-mono), monospace" fontSize="8" letterSpacing="1.5">
            ROLE
          </text>
          <rect x="18" y="110" width="264" height="26" rx="3" fill={C.ink} stroke={C.blue} strokeWidth="0.7" />
          <line x1="28" y1="123" x2="158" y2="123" stroke={C.line} strokeWidth="1" opacity="0.55" />
          <text x="18" y="162" fill={C.blueLight} fontFamily="var(--font-plex-mono), monospace" fontSize="8" letterSpacing="1.5">
            AVAILABILITY
          </text>
          {[0, 1, 2].map((index) => (
            <g key={index}>
              <rect x={18 + index * 90} y="172" width="10" height="10" rx="2" stroke={index === 1 ? C.gold : C.blue} strokeWidth="0.8" />
              {index === 1 ? <path d="M20 177 L23 180 L28 174" stroke={C.gold} strokeWidth="1" /> : null}
              <line x1={34 + index * 90} y1="177" x2={82 + index * 90} y2="177" stroke={C.line} strokeWidth="0.8" opacity="0.55" />
            </g>
          ))}
          <line x1="18" y1="204" x2="280" y2="204" stroke={C.gold} strokeWidth="0.8" opacity="0.55" />
          <text x="18" y="220" fill={C.goldLight} opacity="0.8" fontFamily="var(--font-playfair), serif" fontSize="17" fontStyle="italic">
            Curious. Careful. Evidence-led.
          </text>
        </g>

        <g transform="translate(520 380) rotate(10)">
          <circle cx="0" cy="0" r="35" stroke={C.gold} strokeWidth="1" opacity="0.7" />
          <circle cx="0" cy="0" r="27" stroke={C.gold} strokeWidth="0.5" opacity="0.4" strokeDasharray="2 4" />
          <text x="0" y="-3" fill={C.goldLight} textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="7" letterSpacing="1.2">
            OPEN
          </text>
          <text x="0" y="9" fill={C.blueLight} textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="7" letterSpacing="1.2">
            ROLES
          </text>
        </g>

        <g transform="translate(584 246) rotate(-14)">
          <path d="M0 0 L18 8 L18 48 Q18 58 8 50 L0 42 Z" fill="none" stroke={C.gold} strokeWidth="2.2" />
          <path d="M0 10 L18 18" stroke={C.gold} strokeWidth="1.4" />
          <path d="M0 22 L18 30" stroke={C.gold} strokeWidth="1.4" />
        </g>
      </g>

      <g transform="translate(654 244)">
        <rect width="70" height="36" rx="4" fill={C.card} stroke={C.blue} strokeWidth="0.8" transform="rotate(8)" />
        <text x="10" y="15" fill={C.blueLight} fontFamily="var(--font-plex-mono), monospace" fontSize="7" letterSpacing="1.2" transform="rotate(8)">
          NO FEES
        </text>
        <text x="10" y="27" fill={C.goldLight} fontFamily="var(--font-plex-mono), monospace" fontSize="7" letterSpacing="1.2" transform="rotate(8)">
          ALL LEVELS
        </text>
      </g>

      <Spark x="264" y="206" r="2" color={C.blue} />
      <Spark x="724" y="190" r="2.2" />
      <Spark x="720" y="492" r="1.8" color={C.blue} />
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* Mentor — a compass and a path to a guiding star.                   */
/* ------------------------------------------------------------------ */

export function MentorScene() {
  const star = polar(610, 180, 9, 0);
  return (
    <Scene>
      <defs>
        <radialGradient id="mentor-star" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.goldLight} stopOpacity="0.95" />
          <stop offset="38%" stopColor={C.gold} stopOpacity="0.45" />
          <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="478" cy="322" r="252" stroke={C.blue} strokeWidth="0.8" strokeDasharray="2 10" opacity="0.2" />
      <circle cx="478" cy="322" r="210" stroke={C.gold} strokeWidth="0.7" opacity="0.28" />
      <circle cx="478" cy="322" r="164" stroke={C.blue} strokeWidth="0.7" opacity="0.22" />

      <g>
        <circle cx="478" cy="322" r="142" stroke={C.gold} strokeWidth="1.2" fill={C.ink} fillOpacity="0.6" />
        <circle cx="478" cy="322" r="126" stroke={C.blue} strokeWidth="0.8" opacity="0.55" />
        <circle cx="478" cy="322" r="92" stroke={C.line} strokeWidth="0.7" opacity="0.45" />
        {Array.from({ length: 16 }, (_, index) => {
          const outer = polar(478, 322, 142, index * 22.5);
          const inner = polar(478, 322, index % 2 === 0 ? 122 : 130, index * 22.5);
          return <line key={index} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke={index % 4 === 0 ? C.gold : C.blue} strokeWidth={index % 4 === 0 ? "1.2" : "0.7"} opacity={index % 4 === 0 ? "0.6" : "0.3"} />;
        })}
        {[0, 90, 180, 270].map((angle) => {
          const point = polar(478, 322, 62, angle);
          const tip = polar(478, 322, 116, angle);
          return <path key={angle} d={`M${point.x} ${point.y} L${tip.x} ${tip.y}`} stroke={angle === 0 ? C.gold : C.blue} strokeWidth={angle === 0 ? "2" : "1"} opacity={angle === 0 ? "0.85" : "0.45"} />;
        })}
        {[45, 135, 225, 315].map((angle) => {
          const tip = polar(478, 322, 98, angle);
          const left = polar(478, 322, 5, angle - 90);
          const right = polar(478, 322, 5, angle + 90);
          return (
            <path
              key={`petal-${angle}`}
              d={`M${left.x} ${left.y} L${tip.x} ${tip.y} L${right.x} ${right.y} Z`}
              fill={angle === 45 ? C.blue : C.blueLight}
              opacity={angle === 45 ? "0.22" : "0.12"}
            />
          );
        })}
        {[
          { angle: 0, label: "N", color: C.goldLight },
          { angle: 90, label: "E", color: C.blueLight },
          { angle: 180, label: "S", color: C.blueLight },
          { angle: 270, label: "W", color: C.blueLight },
        ].map((point) => {
          const at = polar(478, 322, 152, point.angle);
          return (
            <text
              key={point.label}
              x={at.x}
              y={at.y + 4}
              fill={point.color}
              textAnchor="middle"
              fontFamily="var(--font-plex-mono), monospace"
              fontSize="11"
              letterSpacing="1.5"
              opacity="0.85"
            >
              {point.label}
            </text>
          );
        })}
        <path d="M478 236 L494 304 L478 322 Z" fill={C.gold} opacity="0.85" />
        <path d="M478 322 L462 304 L478 236 Z" fill={C.goldLight} opacity="0.55" />
        <path d="M478 322 L540 264 L532 256 Z" fill={C.blueLight} opacity="0.75" />
        <circle cx="478" cy="322" r="10" fill={C.ink} stroke={C.gold} strokeWidth="1.4" />
        <circle cx="478" cy="322" r="4" fill={C.goldLight} />
      </g>

      <circle cx="610" cy="180" r="56" fill="url(#mentor-star)" />
      <g className="fx-hero-float">
        <path d={`M${star.x} ${star.y - 15} L${star.x + 4} ${star.y - 4} L${star.x + 15} ${star.y} L${star.x + 4} ${star.y + 4} L${star.x} ${star.y + 15} L${star.x - 4} ${star.y + 4} L${star.x - 15} ${star.y} L${star.x - 4} ${star.y - 4} Z`} fill={C.goldLight} />
        <circle cx={star.x} cy={star.y} r="28" stroke={C.gold} strokeWidth="0.7" opacity="0.5" />
      </g>

      <path d="M322 486 C 374 452 404 408 442 374" stroke={C.gold} strokeWidth="2" strokeDasharray="4 7" strokeLinecap="round" className="fx-hero-dash" />
      <circle cx="322" cy="486" r="10" fill={C.ink} stroke={C.blue} strokeWidth="1.3" />
      <circle cx="322" cy="486" r="3" fill={C.blueLight} />
      <path d="M562 230 C 578 210 592 196 606 186" stroke={C.blue} strokeWidth="1" strokeDasharray="3 5" opacity="0.45" />

      <Spark x="272" y="180" r="2" color={C.blue} />
      <Spark x="710" y="448" r="2.2" />
      <Spark x="694" y="148" r="1.8" color={C.blue} />
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* Matcher — six questions, one highlighted route.                    */
/* ------------------------------------------------------------------ */

const MATCH_QUESTIONS = [
  { x: 412, y: 198 },
  { x: 446, y: 310 },
  { x: 412, y: 424 },
];

const MATCH_ROLES = [
  { x: 636, y: 142 },
  { x: 672, y: 226 },
  { x: 646, y: 310 },
  { x: 672, y: 394 },
  { x: 636, y: 476 },
];

export function MatcherScene() {
  return (
    <Scene>
      <defs>
        <radialGradient id="match-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.goldLight} stopOpacity="0.9" />
          <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="492" cy="310" r="244" stroke={C.blue} strokeWidth="0.8" strokeDasharray="2 10" opacity="0.2" />
      <circle cx="492" cy="310" r="190" fill="url(#match-core)" opacity="0.3" />

      <g stroke={C.blue} strokeWidth="1" opacity="0.36">
        {MATCH_QUESTIONS.map((question, qIndex) =>
          MATCH_ROLES.map((role, rIndex) =>
            qIndex === 1 || rIndex === 2 ? (
              <path key={`${qIndex}-${rIndex}`} d={`M${question.x} ${question.y} C ${question.x + 80} ${question.y} ${role.x - 80} ${role.y} ${role.x} ${role.y}`} />
            ) : null,
          ),
        )}
      </g>

      <path d="M330 310 C 360 310 382 310 404 310" stroke={C.gold} strokeWidth="2" opacity="0.8" />
      <g>
        <circle cx="294" cy="310" r="34" fill={C.ink} stroke={C.gold} strokeWidth="1.8" />
        <circle cx="294" cy="310" r="12" fill={C.gold} opacity="0.85" />
        <path d="M282 310 L290 318 L306 302" stroke={C.ink} strokeWidth="2" />
        <text x="294" y="362" fill={C.goldLight} textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="9" letterSpacing="1.8">
          START
        </text>
      </g>

      {MATCH_QUESTIONS.map((question, index) => (
        <g key={index}>
          <path d={`M${index === 0 ? 330 : 446} ${index === 0 ? 310 : 310} C 370 ${index === 0 ? 310 : 310} ${question.x - 40} ${question.y} ${question.x} ${question.y}`} stroke={index === 1 ? C.gold : C.blue} strokeWidth={index === 1 ? "2" : "1.1"} opacity={index === 1 ? "0.85" : "0.45"} />
          <circle cx={question.x} cy={question.y} r={index === 1 ? 27 : 22} fill={C.ink} stroke={index === 1 ? C.gold : C.blue} strokeWidth={index === 1 ? "1.8" : "1.1"} />
          <text x={question.x} y={question.y + 4} fill={index === 1 ? C.goldLight : C.blueLight} textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="11">
            0{index + 1}
          </text>
        </g>
      ))}

      {MATCH_ROLES.map((role, index) => (
        <g key={index}>
          <path d={`M446 310 C 500 310 540 ${role.y} ${role.x} ${role.y}`} stroke={index === 2 ? C.gold : C.blue} strokeWidth={index === 2 ? "2" : "1"} opacity={index === 2 ? "0.82" : "0.3"} strokeDasharray={index === 2 ? undefined : "3 5"} />
          <rect x={role.x - 25} y={role.y - 19} width="50" height="38" rx="10" fill={C.ink} stroke={index === 2 ? C.gold : C.blue} strokeWidth={index === 2 ? "1.7" : "1"} />
          <circle cx={role.x} cy={role.y - 2} r="6" fill={index === 2 ? C.goldLight : C.blueLight} opacity={index === 2 ? "1" : "0.55"} />
          <path d={`M${role.x - 9} ${role.y + 10} Q${role.x} ${role.y + 2} ${role.x + 9} ${role.y + 10}`} stroke={index === 2 ? C.gold : C.blue} strokeWidth="1" opacity={index === 2 ? "0.8" : "0.4"} />
        </g>
      ))}

      <g opacity="0.7">
        <line x1="370" y1="540" x2="618" y2="540" stroke={C.line} strokeWidth="0.8" />
        {Array.from({ length: 7 }, (_, index) => (
          <line key={index} x1={370 + index * 41.3} y1="535" x2={370 + index * 41.3} y2="545" stroke={index < 6 ? C.gold : C.line} strokeWidth="0.8" opacity={index < 6 ? "0.55" : "0.3"} />
        ))}
      </g>

      <Spark x="254" y="194" r="2" color={C.blue} />
      <Spark x="728" y="190" r="2.2" />
      <Spark x="730" y="492" r="1.8" color={C.blue} />
    </Scene>
  );
}

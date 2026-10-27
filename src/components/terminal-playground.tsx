"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";

/* ------------------------------------------------------------------ *
 *  Static, honest content — nothing here is invented investigation data
 * ------------------------------------------------------------------ */

interface Line {
  kind: "input" | "output" | "error" | "success" | "accent";
  text: string;
}

const BANNER = [
  "  ____  _____  _____  _   _  ____   _  _____  ____    ___  ___ ",
  " |  _ \\|  ___||  ___|| \\ | ||  _ \\ / \\|_   _|/ ___|  / _ \\|_ _|",
  " | |_) | |__  | |__  |  \\| || |_) / _ \\ | | | |     | | | | | ",
  " |  _ <|  __| |  __| | . ` ||  _ < / _ \\| | | |     | | | | | ",
  " | |_) | |___ | |___ | |\\  || |_) / ___ \\ | | | |___| |_| || | ",
  " |____/|_____| |_____|_| \\_||____/_/   \\_\\_|  \\_____|\\___/|___|",
];

const README = [
  "FORENSYRA — a student-led digital forensics & incident response collective.",
  "",
  "We document investigations the way they should be done: lawful, verified,",
  "hash-fresh, chain-of-custody intact, and published so others can learn.",
  "",
  "Type 'help' for the commands. 'missions' starts a defensive drill.",
];

const HELP_GROUPS: Array<{ head: string; rows: Array<[string, string]> }> = [
  {
    head: "Navigation",
    rows: [
      ["open <page>", "Jump to a page (try: open case001)"],
      ["clear", "Clear the screen (Ctrl+L)"],
      ["exit", "Sign off"],
    ],
  },
  {
    head: "Case workspace",
    rows: [
      ["ls", "List the workspace"],
      ["cd <dir>", "Change directory (try: cd cases)"],
      ["pwd", "Print working directory"],
      ["tree", "Print the whole evidence tree"],
      ["cat <file>", "Read a file (try: cat README.md)"],
      ["grep <word>", "Search every file (try: grep hash)"],
      ["find <term>", "Search file names"],
      ["file <name>", "What kind of file is it?"],
      ["stat <path>", "File metadata"],
    ],
  },
  {
    head: "Forensic tools",
    rows: [
      ["hash <text>", "Real SHA-256, computed in your browser"],
      ["sha256sum <text>", "Same as hash — the Linux way"],
      ["base64 <text>", "Encode text; -d decodes"],
      ["strings <file>", "Print readable sequences"],
      ["entropy <text>", "How random does it look?"],
      ["tools", "List the curated DFIR toolkit"],
      ["datasets", "List practice evidence"],
    ],
  },
  {
    head: "Collective brief",
    rows: [
      ["roles", "List the specialisations"],
      ["ethics", "Rules of engagement"],
      ["roadmap", "What we're building, in phases"],
    ],
  },
  {
    head: "Games & badges",
    rows: [
      ["type", "Typing drill — speed + accuracy"],
      ["missions", "List the DFIR missions"],
      ["mission <id>", "Open a mission (try: mission m1)"],
      ["badges", "Show the badge locker"],
      ["neofetch", "System + badge summary"],
      ["sudo *", "Try your luck 🙂"],
    ],
  },
];

const COMMAND_NAMES = [
  "about",
  "badges",
  "base64",
  "banner",
  "case001",
  "cat",
  "cd",
  "clear",
  "date",
  "datasets",
  "entropy",
  "ethics",
  "exit",
  "find",
  "file",
  "grep",
  "hash",
  "help",
  "history",
  "ls",
  "mission",
  "missions",
  "neofetch",
  "open",
  "pwd",
  "readme",
  "roles",
  "roadmap",
  "sha256sum",
  "stat",
  "strings",
  "tools",
  "tree",
  "type",
  "uptime",
  "whoami",
  "sudo",
];

const ROLES = [
  "lead-forensic-investigator",
  "evidence-custodian-chain-of-custody",
  "endpoint-forensics-analyst",
  "timeline-forensic-reporting-analyst",
  "threat-intelligence-osint-analyst",
  "legal-digital-evidence-advisor",
  "coordinator-operations",
  "network-forensics-analyst",
  "memory-malware-analysis-analyst",
  "cloud-forensics-analyst",
  "mobile-device-forensics-analyst",
  "multimedia-forensics-analyst",
  "ai-forensics-ai-security-analyst",
];

const ETHICS = [
  "1. Lawful and authorised — nothing without consent.",
  "2. Evidence preserved — hash first, work on copies.",
  "3. Honest findings — report what the evidence actually says.",
  "4. Privacy respected — no unnecessary data, ever.",
  "5. Teach openly — publish method, not secrets.",
];

const ROADMAP = [
  "Phase 1 — Found the collective: roles, ethics, first mock case.",
  "Phase 2 — Case File 001: full investigation, published report.",
  "Phase 3 — Case Files 002 and 003 across new evidence types.",
  "Phase 4 — Open learn library and member portfolios.",
];

const TOOLS: Array<[string, string]> = [
  ["autopsy", "Disk forensics platform on The Sleuth Kit"],
  ["volatility 3", "Memory forensics framework"],
  ["kape", "Targeted Windows artifact collection"],
  ["velociraptor", "Endpoint visibility at scale"],
  ["eric zimmerman's tools", "Windows artifact parsers"],
  ["wireshark", "Packet analysis"],
  ["plaso", "Super timelines"],
  ["yara", "Malware pattern matching"],
  ["cyberchef", "Encoding & transformation recipes"],
  ["remnux / flare vm", "Malware analysis distributions"],
];

const DATASETS = [
  "NIST CFReDS        reference disk / memory images",
  "Digital Corpora    disk & memory captures",
  "UNB CIC            labelled network datasets",
  "Malware-Traffic    real infection PCAPs",
  "VirusShare         curated malware corpus",
];

const ROUTES: Record<string, string> = {
  home: "/",
  about: "/about",
  roles: "/roles",
  matcher: "/roles/matcher",
  team: "/team",
  projects: "/projects",
  case001: "/projects/case-file-001",
  case002: "/projects/case-file-002",
  case003: "/projects/case-file-003",
  writeups: "/writeups",
  learn: "/resources",
  datasets: "/resources/datasets",
  tools: "/resources/tools",
  roadmap: "/roadmap",
  ethics: "/ethics",
  join: "/join",
  apply: "/apply",
  contact: "/contact",
  security: "/security",
  playground: "/playground",
};

/* ------------------------------------------------------------------ *
 *  Virtual file system
 * ------------------------------------------------------------------ */

interface FSFile {
  kind: "file";
  name: string;
  content: string[];
}
interface FSDir {
  kind: "dir";
  name: string;
  children: FSNode[];
}
type FSNode = FSFile | FSDir;

const CASE001 = [
  "CASE FILE 001 — The Data Leakage Investigation",
  "Status: planning",
  "Source: NIST CFReDS public practice images (about 6 GB)",
  "Evidence: Windows 7 PC image, two USB images, one CD image,",
  "          seed files and reference hash lists.",
  "Scenario: an insider leaks research to a rival using email,",
  "          personal cloud storage, USB drives and a CD.",
  "Open it: open case001",
];

const CASE002 = [
  "CASE FILE 002 — [CLASSIFIED until Case File 001 ships]",
  "",
  "Rumor has it the next image involves a cloud storage artefact.",
  "No evidence yet. Patience is a forensic skill.",
];

const CASE003 = ["CASE FILE 003 — [CLASSIFIED]", "", "Hint: packets."];

const TOOL_DOC: Record<string, string[]> = {
  "autopsy.md": [
    "Autopsy — open-source disk forensics on The Sleuth Kit.",
    "Best for: ingesting disk images, browsing file systems,",
    "recovering deleted files, timeline creation, keyword search.",
  ],
  "volatility.md": [
    "Volatility 3 — memory forensics framework.",
    "Best for: RAM captures, process listing, network connections,",
    "injected code detection, symbol resolution.",
  ],
  "wireshark.md": [
    "Wireshark — packet analysis.",
    "Best for: capture vs display filters, following streams,",
    "protocol hierarchy, extracting files, confirming C2 traffic.",
  ],
  "kape.md": [
    "KAPE — targeted Windows artifact collection & processing.",
    "Best for: fast triage when a full image is not possible.",
  ],
  "velociraptor.md": [
    "Velociraptor — endpoint visibility at scale via VQL hunts.",
    "Best for: answering one question across many hosts.",
  ],
};

const FS: FSDir = {
  kind: "dir",
  name: "/",
  children: [
    { kind: "file", name: "README.md", content: README },
    { kind: "file", name: "ethics.md", content: ETHICS },
    { kind: "file", name: "roadmap.md", content: ROADMAP },
    {
      kind: "dir",
      name: "cases",
      children: [
        { kind: "file", name: "case-file-001.md", content: CASE001 },
        { kind: "file", name: "case-file-002.md", content: CASE002 },
        { kind: "file", name: "case-file-003.md", content: CASE003 },
      ],
    },
    {
      kind: "dir",
      name: "roles",
      children: ROLES.map((role, index) => {
        const n = String(index + 1).padStart(2, "0");
        return {
          kind: "file" as const,
          name: `${n}-${role}.md`,
          content: [
            `# ${role}`,
            "",
            `Specialisation No. ${index + 1}. Full brief: open roles`,
          ],
        };
      }),
    },
    {
      kind: "dir",
      name: "tools",
      children: Object.entries(TOOL_DOC).map(([name, content]) => ({
        kind: "file" as const,
        name,
        content,
      })),
    },
    {
      kind: "dir",
      name: "learn",
      children: [
        {
          kind: "file",
          name: "library.json",
          content: [
            "{",
            '  "note": "Index of our on-site Learn library.",',
            '  "groups": ["start-here", "references", "datasets", "tools", "standards", "reading", "case-toolkit"],',
            '  "url": "/resources"',
            "}",
          ],
        },
        {
          kind: "file",
          name: "dfir-basics.md",
          content: [
            "1) Preserve the trace — image first, analyse second.",
            "2) Verify every hash before you touch the data.",
            "3) Record what you did; a method is evidence too.",
            "4) Poke nothing live — read-only until you know.",
          ],
        },
      ],
    },
    {
      kind: "file",
      name: "hidden-treasure.txt",
      content: [
        "You found the hidden file! Nice one, investigator.",
        "Use: open apply",
        "…and mention 'terminal explorer' to stand out.",
      ],
    },
  ],
};

/* ------------------------------------------------------------------ *
 *  FS helpers
 * ------------------------------------------------------------------ */

function joinPath(base: string, next: string): string {
  const parts = next.startsWith("/") ? [] : base.split("/").filter(Boolean);
  for (const raw of next.split("/")) {
    const seg = raw.trim();
    if (!seg || seg === "." || seg === "~") continue;
    if (seg === "..") parts.pop();
    else parts.push(seg);
  }
  return parts.join("/");
}

function lookup(path: string): FSNode | null {
  let node: FSNode = FS;
  for (const seg of path.split("/").filter(Boolean)) {
    if (node.kind !== "dir") return null;
    const child: FSNode | undefined = node.children.find((c) => c.name === seg);
    if (!child) return null;
    node = child;
  }
  return node;
}

function sortedChildren(dir: FSDir): FSNode[] {
  return [...dir.children].sort((a, b) => {
    if (a.kind !== b.kind) return a.kind === "dir" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

function walk(node: FSNode, base = ""): Array<{ path: string; node: FSNode }> {
  const out: Array<{ path: string; node: FSNode }> = [];
  out.push({ path: base, node });
  if (node.kind !== "dir") return out;
  for (const child of sortedChildren(node)) {
    out.push(...walk(child, base ? `${base}/${child.name}` : child.name));
  }
  return out;
}

function tabulate(rows: string[], pad = 16): string[] {
  return rows.map((r) => {
    const [left, ...rest] = r.split("\t");
    return `  ${left.padEnd(pad)}${rest.join(" ")}`;
  });
}

/* ------------------------------------------------------------------ *
 *  Crypto helpers
 * ------------------------------------------------------------------ */

async function sha256Hex(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/* ------------------------------------------------------------------ *
 *  Games & progression
 * ------------------------------------------------------------------ */

const TYPE_PHRASES: Array<{ title: string; text: string }> = [
  { title: "Order of Volatility", text: "capture live memory before disk and logs" },
  { title: "Hash Verification", text: "verify the sha256 before touching the image" },
  { title: "Chain of Custody", text: "record what you collected and when you did it" },
  { title: "Timeline Analysis", text: "correlate artefacts into a super timeline" },
  { title: "Network Triage", text: "isolate the beacon then preserve the packets" },
  { title: "Memory Analysis", text: "volatility exposes processes hidden in ram" },
  { title: "Registry Recon", text: "run keys persistence leaves a forensic trace" },
  { title: "USB Forensics", text: "removable device history answers who copied what" },
  { title: "Cloud Footprint", text: "the artefacts survive in browser timezones" },
  { title: "Mobile Evidence", text: "faraday isolation prevents remote wipe" },
  { title: "Compression", text: "zlib streams inside docx files hide their content" },
  { title: "Entropy", text: "high entropy often means encrypted or compressed data" },
];

interface BadgeDef {
  id: string;
  name: string;
  hint: string;
}

const BADGES: BadgeDef[] = [
  { id: "first-steps", name: "Persistence", hint: "run 10 commands" },
  { id: "explorer", name: "Cartographer", hint: "use 8 different commands" },
  { id: "hasher", name: "Integrity Audit", hint: "hash 3 times" },
  { id: "fast-hands", name: "Swift Strokes", hint: "30+ wpm in a drill" },
  { id: "sharp-eye", name: "Precision Tool", hint: "95% accuracy at 40+wpm" },
  { id: "m1", name: "Chain of Custody", hint: "mission m1" },
  { id: "m2", name: "Scene Documentation", hint: "mission m2" },
  { id: "m3", name: "Field Kit", hint: "mission m3" },
  { id: "m4", name: "Typing Analyst", hint: "mission m4" },
  { id: "m5", name: "Cipher Cutter", hint: "mission m5" },
  { id: "m6", name: "Case Cracker", hint: "complete missions m1–m5" },
  { id: "sudo", name: "Privilege Denied", hint: "try sudo" },
  { id: "treasure", name: "Hidden Treasure", hint: "cat the secret file" },
];

const ENCODED = "cHJlc2VydmUgdGhlIHRyYWNl"; // "preserve the trace"

interface HitContext {
  key: string;
  arg: string;
  wpm?: number;
  accuracy?: number;
}
interface MissionStep {
  label: string;
  hit: (ctx: HitContext) => boolean;
}
interface MissionDef {
  id: string;
  title: string;
  brief: string[];
  steps: MissionStep[];
}

const MISSIONS: MissionDef[] = [
  {
    id: "m1",
    title: "Evidence Integrity",
    brief: [
      "Before you analyse anything, prove your chain of custody.",
      "Steps:",
      "  1. hash <anything>            (e.g. hash forensyra)",
      "  2. sha256sum <same thing>     (confirm the digest is stable)",
      "Done automatically when both run in this session.",
    ],
    steps: [
      { label: "Run hash on some input", hit: (c) => c.key === "hash" },
      { label: "Verify with sha256sum", hit: (c) => c.key === "sha256sum" },
    ],
  },
  {
    id: "m2",
    title: "Scene Documentation",
    brief: [
      "A scene isn't mapped until you know where everything lives.",
      "Steps:",
      "  1. ls",
      "  2. tree",
      "  3. cat README.md",
    ],
    steps: [
      { label: "Run ls", hit: (c) => c.key === "ls" },
      { label: "Run tree", hit: (c) => c.key === "tree" },
      { label: "Read README.md", hit: (c) => c.key === "cat" && /readme/i.test(c.arg) },
    ],
  },
  {
    id: "m3",
    title: "Know Your Tooling",
    brief: [
      "The right tool chosen with intent beats tool sprawl.",
      "Steps:",
      "  1. tools",
      "  2. roles",
      "  3. open case001",
    ],
    steps: [
      { label: "List the toolkit", hit: (c) => c.key === "tools" },
      { label: "List the roles", hit: (c) => c.key === "roles" },
      { label: "Open Case File 001", hit: (c) => c.key === "open" && /case001/i.test(c.arg) },
    ],
  },
  {
    id: "m4",
    title: "Typing Under Pressure",
    brief: ["Reports are typed, not spoken. Hit 30+ wpm in a drill.", "  Run: type"],
    steps: [
      {
        label: "Score 30+ wpm",
        hit: (c) => c.key === "@typing-done" && (c.wpm ?? 0) >= 30,
      },
    ],
  },
  {
    id: "m5",
    title: "Cipher Cutter",
    brief: [
      "Someone encoded a message before they shared it.",
      "  Decode it with:   base64 -d cHJlc2VydmUgdGhlIHRyYWNl",
    ],
    steps: [
      {
        label: "Decode cHJlc2VydmUgdGhlIHRyYWNl",
        hit: (c) =>
          c.key === "base64" &&
          c.arg.toLowerCase().replace(/^(-d\s+)/i, "").trim() === ENCODED,
      },
    ],
  },
  {
    id: "m6",
    title: "Full Sweep",
    brief: [
      "Complete m1, m2, m3, m4 and m5 — then you earn the Case Cracker badge.",
    ],
    steps: [],
  },
];

/* ------------------------------------------------------------------ *
 *  Storage
 * ------------------------------------------------------------------ */

const STORAGE = {
  badges: "fx-terminal-badges",
  missions: "fx-terminal-missions",
  typing: "fx-terminal-typing",
} as const;

function storageGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function storageSet(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

/* ------------------------------------------------------------------ *
 *  Component
 * ------------------------------------------------------------------ */

export function TerminalPlayground() {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>(() => [
    ...BANNER.map((text) => ({ kind: "accent" as const, text })),
    { kind: "output" as const, text: "" },
    {
      kind: "output" as const,
      text: "forensyra simulated shell — nothing touches a real system.",
    },
    { kind: "output" as const, text: "type 'help' for commands, 'missions' for drills." },
  ]);
  const [cwd, setCwd] = useState("");
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [busy, setBusy] = useState(false);
  const [badges, setBadges] = useState<string[]>([]);
  const [missionProgress, setMissionProgress] = useState<Record<string, boolean[]>>({});
  const [stats, setStats] = useState<{ best: number; drills: number }>({ best: 0, drills: 0 });
  const [rowCount, setRowCount] = useState(0);
  const uniqueCommandsRef = useRef<Set<string>>(new Set());
  const hashCountRef = useRef(0);
  const [typing, setTyping] = useState<{ phrase: string; title: string; id: number } | null>(null);
  const typingStartRef = useRef<number | null>(null);
  const [liveStats, setLiveStats] = useState<{ wpm: number; accuracy: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef<number>(0);

  /* refs mirroring latest state so callbacks stay stable */
  const badgesRef = useRef(badges);
  const missionProgressRef = useRef(missionProgress);
  const statsRef = useRef(stats);
  useEffect(() => {
    badgesRef.current = badges;
    missionProgressRef.current = missionProgress;
    statsRef.current = stats;
  }, [badges, missionProgress, stats]);

  /* ---------------- persistence hydration ---------------- */
  useEffect(() => {
    // Deferred so the state read happens after paint, not during render.
    const frame = window.requestAnimationFrame(() => {
      mountedRef.current = Date.now();
      setBadges(storageGet<string[]>(STORAGE.badges, []));
      setMissionProgress(storageGet<Record<string, boolean[]>>(STORAGE.missions, {}));
      setStats(storageGet<{ best: number; drills: number }>(STORAGE.typing, { best: 0, drills: 0 }));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  /* ---------------- auto-scroll ---------------- */
  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [lines, typing]);

  const push = useCallback((...next: Line[]) => {
    setLines((previous) => [...previous, ...next].slice(-400));
  }, []);

  const award = useCallback(
    (id: string) => {
      if (badgesRef.current.includes(id)) return;
      badgesRef.current = [...badgesRef.current, id];
      setBadges(badgesRef.current);
      storageSet(STORAGE.badges, badgesRef.current);
      const badge = BADGES.find((b) => b.id === id);
      if (badge) {
        push({
          kind: "success",
          text: `🎖  Badge earned: ${badge.name} — ${badge.hint}`,
        });
      }
    },
    [push],
  );

  const completeStep = useCallback(
    (missionId: string, index: number, total: number) => {
      const existing = missionProgressRef.current[missionId] ?? new Array(total).fill(false);
      if (existing[index]) return;
      const next = [...existing];
      next[index] = true;
      missionProgressRef.current = {
        ...missionProgressRef.current,
        [missionId]: next,
      };
      setMissionProgress(missionProgressRef.current);
      storageSet(STORAGE.missions, missionProgressRef.current);
      push({
        kind: "accent",
        text: `   ↳ step ${index + 1} ✓  (${next.filter(Boolean).length}/${total})`,
      });
      if (next.every(Boolean)) {
        award(missionId);
        // meta mission — Case Cracker
        const prerequisite = MISSIONS.filter((m) => m.id !== "m6");
        const allDone = prerequisite.every((m) => {
          const steps = missionProgressRef.current[m.id];
          return Array.isArray(steps) && steps.length === m.steps.length && steps.every(Boolean);
        });
        if (allDone && MISSIONS.some((m) => m.id === "m6")) {
          window.setTimeout(() => award("m6"), 120);
        }
      }
    },
    [award, push],
  );

  const bumpCommands = useCallback(
    (command: string) => {
      setRowCount((prevValue) => prevValue + 1);
      uniqueCommandsRef.current.add(command);
      const count = rowCount + 1;
      if (count >= 10) award("first-steps");
      if (uniqueCommandsRef.current.size >= 8) award("explorer");
      if (hashCountRef.current >= 3) award("hasher");
    },
    [award, rowCount],
  );

  const checkCommands = useCallback(
    (ctx: HitContext) => {
      MISSIONS.forEach((mission) => {
        mission.steps.forEach((step, index) => {
          if ((missionProgressRef.current[mission.id]?.[index] ?? false)) return;
          if (step.hit(ctx)) completeStep(mission.id, index, mission.steps.length);
        });
      });
    },
    [completeStep],
  );

  const runCommand = useCallback(
    async (raw: string) => {
      const command = raw.trim();
      if (!command) return;

      if (typing) {
        // typing submission
        const typed = command;
        const elapsed = typingStartRef.current ? Date.now() - typingStartRef.current : 0;
        const minutes = Math.max(elapsed / 60000, 0.001);
        const wpm = Math.min(250, Math.round(typed.length / 5 / minutes));
        const target = typing.phrase;
        let misses = 0;
        for (let i = 0; i < Math.max(typed.length, target.length); i++) {
          if (typed[i] !== target[i]) misses += 1;
        }
        const accuracy = Math.max(0, Math.round(100 - (misses / target.length) * 100));
        push({ kind: "input", text: typed });
        push({ kind: "success", text: `results  wpm ${wpm}  accuracy ${accuracy}%` });
        const newStats = { best: Math.max(statsRef.current.best, wpm), drills: statsRef.current.drills + 1 };
        setStats(newStats);
        storageSet(STORAGE.typing, newStats);
        if (wpm >= 30) award("fast-hands");
        if (wpm >= 40 && accuracy >= 95) award("sharp-eye");
        checkCommands({ key: "@typing-done", arg: typed, wpm, accuracy });
        setTyping(null);
        setLiveStats(null);
        typingStartRef.current = null;
        setValue("");
        return;
      }

      push({ kind: "input", text: command });
      setHistory((prev) => [command, ...prev].slice(0, 100));
      setHistoryIndex(-1);

      const [name, ...rest] = command.split(/\s+/);
      const argument = rest.join(" ").trim();
      const key = name.toLowerCase();
      const out = (...rows: string[]) =>
        push(...rows.map((text) => ({ kind: "output" as const, text })));

      bumpCommands(key);
      // deferred for hash — the step/badge lines should follow the digest
      if (key !== "hash" && key !== "sha256sum") checkCommands({ key, arg: argument });

      switch (key) {
        case "help":
        case "?": {
          const rows: string[] = [];
          HELP_GROUPS.forEach((group) => {
            rows.push(group.head);
            tabulate(group.rows.map(([c, d]) => `${c}\t${d}`), 20).forEach((l) =>
              rows.push(l),
            );
            rows.push("");
          });
          out(...rows);
          return;
        }

        case "about":
        case "readme":
          out(...README);
          return;

        case "ls": {
          const dir = lookup(cwd);
          if (dir?.kind === "dir") {
            out(
              ...sortedChildren(dir).map((n) => (n.kind === "dir" ? `${n.name}/` : n.name)),
            );
          } else {
            out(`ls: cannot access ${cwd || "/"}`);
          }
          return;
        }

        case "tree": {
          const rows = walk(lookup(cwd) ?? FS).map(({ path, node }) => {
            const depth = path.split("/").filter(Boolean).length;
            return `${"│  ".repeat(depth)}${node.kind === "dir" ? "" : "├─ "}${node.name}`;
          });
          out(...rows);
          return;
        }

        case "cd": {
          if (!argument) {
            setCwd("");
            return;
          }
          const next = joinPath(cwd, argument);
          const target = lookup(next);
          if (target?.kind === "dir") setCwd(next);
          else out(`cd: no such directory: ${argument}`);
          return;
        }

        case "pwd":
          out(`/${cwd}`);
          return;

        case "cat": {
          if (!argument) {
            out("usage: cat <file>");
            return;
          }
          const path = joinPath(cwd, argument);
          const node = lookup(path);
          if (node?.kind === "file") {
            out(...node.content);
            if (path.endsWith("hidden-treasure.txt")) award("treasure");
          } else if (node?.kind === "dir") {
            out(`cat: ${argument}: is a directory`);
          } else {
            out(`cat: ${argument}: no such file. Try: ls`);
          }
          return;
        }

        case "file": {
          if (!argument) {
            out("usage: file <name>");
            return;
          }
          const path = joinPath(cwd, argument);
          const node = lookup(path);
          if (!node) out(`${argument}: cannot open`);
          else if (node.kind === "dir") out(`${node.name}: directory`);
          else if (node.name.endsWith(".json")) out(`${node.name}: JSON text data`);
          else if (node.name.endsWith(".md")) out(`${node.name}: Markdown document, ASCII text`);
          else out(`${node.name}: ASCII text`);
          return;
        }

        case "stat": {
          if (!argument) {
            out("usage: stat <path>");
            return;
          }
          const path = joinPath(cwd, argument);
          const node = lookup(path);
          if (!node) out(`stat: cannot stat ${argument}`);
          else
            out(
              `  Path: /${path}`,
              `  Type: ${node.kind}`,
              node.kind === "dir"
                ? `  Children: ${sortedChildren(node).length}`
                : `  Lines: ${node.content.length}`,
            );
          return;
        }

        case "find": {
          if (!argument) {
            out("usage: find <term>");
            return;
          }
          const target = argument.toLowerCase();
          const hits = walk(FS)
            .filter(
              ({ path, node }) =>
                path.toLowerCase().includes(target) ||
                node.name.toLowerCase().includes(target),
            )
            .slice(0, 30)
            .map(({ path, node }) => (node.kind === "dir" ? `${path}/` : path));
          out(...(hits.length ? hits : [`no name matches "${argument}"`]));
          return;
        }

        case "grep": {
          if (!argument) {
            out("usage: grep <pattern>");
            return;
          }
          const needle = argument.toLowerCase();
          const results: string[] = [];
          for (const entry of walk(FS)) {
            if (entry.node.kind !== "file") continue;
            entry.node.content.forEach((row, lineNo) => {
              if (row.toLowerCase().includes(needle) && results.length < 60) {
                results.push(`  ${entry.path}:${lineNo + 1}\t${row.trim()}`);
              }
            });
          }
          push(...results.map((text) => ({ kind: "output" as const, text })));
          return;
        }

        case "hash":
        case "sha256sum": {
          if (!argument) {
            out("usage: hash <text>", "example: hash digital evidence");
            return;
          }
          setBusy(true);
          push({ kind: "output", text: "computing …" });
          try {
            const digest = await sha256Hex(argument);
            hashCountRef.current += 1;
            push({ kind: "success", text: digest });
            if (hashCountRef.current >= 3) award("hasher");
            checkCommands({ key, arg: argument });
          } catch {
            out("hash: browser refused to compute a digest.");
          } finally {
            setBusy(false);
          }
          return;
        }

        case "base64": {
          const decoding = /^-d\s+/.test(argument);
          const payload = decoding ? argument.split(/\s+/).slice(1).join(" ") : argument;
          if (!payload) {
            out("usage: base64 <text>  ·  base64 -d <text>");
            return;
          }
          try {
            if (decoding) {
              push({ kind: "success", text: atob(payload) || "· decode returned nothing ·" });
            } else {
              push({ kind: "success", text: btoa(payload) });
            }
          } catch {
            out("base64: invalid input.");
          }
          return;
        }

        case "strings": {
          if (!argument) {
            out("usage: strings <file>");
            return;
          }
          const path = joinPath(cwd, argument);
          const node = lookup(path);
          if (node?.kind === "file") out(...node.content.slice(0, 8));
          else out(`strings: ${argument}: no such file`);
          return;
        }

        case "entropy": {
          const sample = argument || "digital forensics makes entropy measurable";
          const freq: Record<string, number> = {};
          for (const ch of sample) freq[ch] = (freq[ch] ?? 0) + 1;
          const len = sample.length;
          let h = 0;
          for (const count of Object.values(freq)) {
            const p = count / len;
            h -= p * Math.log2(p);
          }
          out(`  entropy: ${h.toFixed(3)} bits/char  (${len} chars, 0–4.7 scale)`);
          return;
        }

        case "roles":
          out(
            `specialisations (${ROLES.length}):`,
            ...tabulate(ROLES.map((r, i) => `${String(i + 1).padStart(2, "0")}\t${r}`), 8),
            "",
            "not sure? open matcher",
          );
          return;

        case "tools":
          out(...tabulate(TOOLS.map(([n, d]) => `${n}\t${d}`), 24));
          return;

        case "datasets":
          out(...DATASETS);
          return;

        case "roadmap":
          out(...ROADMAP);
          return;

        case "ethics":
          out(...ETHICS);
          return;

        case "case001":
        case "case002":
        case "case003":
        case "case": {
          const number = key === "case" ? (argument.endsWith("3") ? "003" : argument.endsWith("2") ? "002" : "001") : key.slice(4);
          const path = joinPath(cwd, `cases/case-file-${number}.md`);
          const node = lookup(path);
          if (node?.kind === "file") out(...node.content);
          else out(`case: unknown. Try: ls cases`);
          return;
        }

        case "open": {
          if (!argument) {
            out(
              "usage: open <page>",
              `targets: ${Object.keys(ROUTES).slice(0, 10).join(", ")} …`,
            );
            return;
          }
          const route = ROUTES[argument.toLowerCase().replace(/^\//, "")];
          if (!route) {
            out(`open: unknown target "${argument}".`);
            return;
          }
          out(`opening ${route} …`);
          router.push(route);
          return;
        }

        case "banner":
          out(...BANNER, "");
          return;

        case "neofetch": {
          const secs = Math.round((Date.now() - (mountedRef.current || Date.now())) / 1000);
          const missionCount = MISSIONS.filter((m) => {
            if (m.steps.length === 0) return false;
            const steps = missionProgress[m.id];
            return Array.isArray(steps) && steps.length === m.steps.length && steps.every(Boolean);
          }).length;
          out(
            ...BANNER,
            "",
            `  user     visitor@forensyra`,
            `  cwd      /${cwd}`,
            `  badges   ${badges.length}/${BADGES.length}`,
            `  missions   ${missionCount}/5 complete`,
            `  drills   ${stats.drills}   best ${stats.best} wpm`,
            `  uptime   ${secs}s`,
            "",
            "  preserve the trace. prove the story.",
          );
          return;
        }

        case "date":
          out(`${new Date().toISOString()}  (UTC)`);
          return;

        case "uptime": {
          const secs = Math.round((Date.now() - (mountedRef.current || Date.now())) / 1000);
          out(`shell up ${secs}s · real sha256 hashing ready`);
          return;
        }

        case "whoami":
          out("visitor@forensyra — welcome. Start with: help");
          return;

        case "history": {
          if (argument === "-c") {
            setHistory([]);
            out("history cleared");
            return;
          }
          out(
            ...(history.length
              ? [...history].reverse().map((h, i) => `  ${i + 1}\t${h}`)
              : ["  empty"]),
          );
          return;
        }

        case "missions": {
          out("DFIR missions");
          MISSIONS.forEach((m) => {
            const steps = missionProgress[m.id];
            const done = m.steps.length > 0 ? steps?.every(Boolean) : false;
            const marker = done ? "✔" : steps?.some(Boolean) ? "◐" : "·";
            out(`  [${marker}]  ${m.id}  ${m.title}`);
          });
          out("", "open with: mission <id>");
          return;
        }

        case "mission": {
          if (!argument) {
            out("usage: mission <id>", "list: missions");
            return;
          }
          const def = MISSIONS.find((m) => m.id === argument.toLowerCase());
          if (!def) {
            out(`mission: unknown "${argument}". List: missions`);
            return;
          }
          const steps = missionProgress[def.id];
          out(
            `mission ${def.id} — ${def.title}`,
            "",
            ...def.brief,
            "",
            `progress: ${steps?.filter(Boolean).length ?? 0}/${def.steps.length || "locked"}`,
          );
          return;
        }

        case "badges":
          out(
            `badge locker — ${badges.length}/${BADGES.length}`,
            "",
            ...BADGES.map((b) => {
              const earned = badges.includes(b.id);
              return `  ${earned ? "🎖" : "·"}  ${b.name.padEnd(20)} ${earned ? "earned" : `— ${b.hint}`}`;
            }),
          );
          return;

        case "type": {
          if (argument === "reset" || argument === "abandon") {
            setTyping(null);
            setLiveStats(null);
            out("typing drill abandoned.");
            return;
          }
          const picked =
            argument && /^\d+$/.test(argument)
              ? TYPE_PHRASES[Number(argument) % TYPE_PHRASES.length]
              : TYPE_PHRASES[Math.floor(Math.random() * TYPE_PHRASES.length)];
          setTyping({ phrase: picked.text, title: picked.title, id: Date.now() });
          typingStartRef.current = null;
          setLiveStats(null);
          setValue("");
          push(
            { kind: "accent", text: `typing drill — ${picked.title}` },
            {
              kind: "output",
              text: "retype exactly, then press Enter. wpm & accuracy measured as you type.",
            },
            { kind: "output", text: "" },
            { kind: "accent", text: picked.text },
            { kind: "output", text: "" },
          );
          inputRef.current?.focus();
          return;
        }

        case "sudo":
          out(
            "sudo: this is a simulated shell. Nothing is hidden from you.",
            "— but I admire the intent.",
          );
          award("sudo");
          return;

        case "clear":
          setLines([]);
          return;

        case "exit":
          out("** Session ended. Press the browser's back button, or type 'banner'. **");
          return;

        default: {
          const nearest = COMMAND_NAMES.find(
            (n) => n.startsWith(key.slice(0, 2)) || key.includes(n.slice(0, 3)),
          );
          push({
            kind: "error",
            text: `${name}: command not found${nearest ? ` — did you mean ${nearest}?` : ""}`,
          });
          push({ kind: "output", text: "type 'help' for the command list" });
        }
      }
    },
    [award, badges, bumpCommands, checkCommands, cwd, history, missionProgress, push, router, stats, typing],
  );

  /* ---------------- tab completion ---------------- */
  const completions = useMemo(() => {
    const parts = value.split(/\s+/);
    if (parts.length === 1) {
      return {
        kind: "command" as const,
        hits: COMMAND_NAMES.filter((n) => n.startsWith(parts[0].toLowerCase())).sort(),
      };
    }
    const lastPart = parts[parts.length - 1];
    const argKey = parts[0].toLowerCase();
    if (argKey === "open") {
      return {
        kind: "route" as const,
        hits: Object.keys(ROUTES)
          .filter((r) => r.startsWith(lastPart.toLowerCase()))
          .sort(),
      };
    }
    const dirPath = lastPart.includes("/") ? lastPart.replace(/[^/]+$/, "") : "";
    const dirNode = lookup(joinPath(cwd, dirPath));
    const fsEntries =
      dirNode?.kind === "dir"
        ? sortedChildren(dirNode).map((n) => (n.kind === "dir" ? `${n.name}/` : n.name))
        : [];
    const stem = lastPart.includes("/") ? lastPart.split("/").pop() ?? "" : lastPart;
    return {
      kind: "file" as const,
      hits: fsEntries.filter((name) => name.startsWith(stem)).sort(),
    };
  }, [value, cwd]);

  function onKeydown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.ctrlKey || event.metaKey) {
      if (event.key === "l") {
        event.preventDefault();
        setLines([]);
        return;
      }
      if (event.key === "c") {
        event.preventDefault();
        if (typing) {
          setTyping(null);
          setLiveStats(null);
          push({ kind: "output", text: "typing drill abandoned (ctrl+c)." });
        }
        setValue("");
        return;
      }
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const result = completions;
      if (!result || result.hits.length === 0) return;
      const parts = value.split(/\s+/);
      const index = parts.length - 1;
      if (result.kind === "command") {
        const pick = result.hits[0];
        setValue(pick + (result.hits.length > 1 ? "" : " "));
        return;
      }
      parts[index] = result.hits[0] ?? parts[index];
      setValue(parts.join(" "));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      if (next >= 0) {
        setHistoryIndex(next);
        setValue(history[next]);
      }
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = historyIndex - 1;
      setHistoryIndex(next);
      setValue(next >= 0 ? history[next] : "");
      return;
    }
    if (event.key === "Escape" && typing) {
      event.preventDefault();
      setTyping(null);
      setLiveStats(null);
      push({ kind: "output", text: "typing drill abandoned." });
      setValue("");
      return;
    }
  }

  /* ---------------- render ---------------- */

  const prompt = `visitor@forensyra:~${cwd ? `/${cwd}` : ""}$`;

  function lineClass(kind: Line["kind"]): string {
    switch (kind) {
      case "input":
        return "text-foreground";
      case "error":
        return "text-danger";
      case "success":
        return "text-success";
      case "accent":
        return "text-accent";
      default:
        return "whitespace-pre-wrap text-muted";
    }
  }

  return (
    <div
      id="fx-terminal"
      className="overflow-hidden rounded-2xl border border-border-gold/50 bg-[#0a0b10] shadow-[0_40px_80px_-40px] shadow-black/90"
    >
      <div className="flex items-center gap-2 border-b border-border/60 bg-background/60 px-4 py-2.5">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-danger/70" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-warning/70" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-success/70" />
        <span className="ml-2 max-w-[55%] truncate font-mono text-[11px] text-muted">
          forensyra://simulated-shell — {cwd ? `~/${cwd}` : "~"}
        </span>
        <span className="ml-auto shrink-0 font-mono text-[10px] whitespace-nowrap text-muted/60">
          {badges.length}/{BADGES.length} badges
        </span>
      </div>

      <div
        ref={scrollRef}
        aria-live="polite"
        aria-label="Terminal output"
        onClick={() => inputRef.current?.focus()}
        className="h-[22rem] cursor-text overflow-y-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed sm:h-[26rem]"
      >
        {lines.map((line, index) => (
          <p key={`${index}-${line.text.slice(0, 24)}`} className={lineClass(line.kind)}>
            {line.kind === "input" ? (
              <>
                <span className="text-accent">visitor@forensyra</span>
                <span className="text-muted">:</span>
                <span className="text-[#d4af5f]">~{cwd ? `/${cwd}` : ""}$</span> {line.text}
              </>
            ) : (
              line.text || "\u00A0"
            )}
          </p>
        ))}

        {typing ? (
          <p className="mt-1 whitespace-pre">
            {typing.phrase.split("").map((ch, i) => {
              const typedCh = value[i];
              if (typedCh === undefined) {
                return (
                  <span key={`${i}-pending`} className="text-muted/45">
                    {ch}
                  </span>
                );
              }
              return typedCh === ch ? (
                <span key={`${i}-ok`} className="text-success">
                  {typedCh}
                </span>
              ) : (
                <span key={`${i}-bad`} className="text-danger">
                  {typedCh}
                </span>
              );
            })}
          </p>
        ) : null}

        {busy ? <p className="text-muted/70">computing …</p> : null}
      </div>

      {typing ? (
        <div className="flex flex-wrap items-center gap-4 border-t border-border/60 bg-background/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted/70">
          <span>
            wpm <span className="text-accent">{liveStats?.wpm ?? 0}</span>
          </span>
          <span>
            accuracy <span className="text-accent">{liveStats?.accuracy ?? 100}%</span>
          </span>
          <span className="ml-auto text-muted/50">esc aborts · enter submits early</span>
        </div>
      ) : null}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const submitted = value;
          if (typing) {
            typingStartRef.current = typingStartRef.current ?? Date.now();
          }
          setValue("");
          void runCommand(submitted);
        }}
        className="flex items-center gap-2 border-t border-border/60 bg-background/60 px-4 py-3"
      >
        <label htmlFor="fx-terminal-input" className="sr-only">
          Terminal command
        </label>
        <span
          aria-hidden="true"
          className="shrink-0 font-mono text-[12.5px] text-accent"
        >
          {prompt}
        </span>
        <input
          id="fx-terminal-input"
          ref={inputRef}
          value={value}
          onChange={(event) => {
            const next = event.target.value;
            setValue(next);
            if (typing && next.length > 0) {
              // Live stats are computed here, in the event, so rendering stays pure.
              const startedAt = typingStartRef.current ?? Date.now();
              typingStartRef.current = startedAt;
              const elapsed = (Date.now() - startedAt) / 60000;
              const mismatches = next
                .split("")
                .filter((ch, i) => ch !== typing.phrase[i]).length;
              const accuracy =
                next.length === 0
                  ? 100
                  : Math.max(
                      0,
                      Math.round(
                        100 - (mismatches / Math.max(next.length, typing.phrase.length)) * 100,
                      ),
                    );
              setLiveStats({
                wpm: elapsed > 0 ? Math.min(250, Math.round(next.length / 5 / elapsed)) : 0,
                accuracy,
              });
            }
          }}
          onKeyDown={onKeydown}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder={
            typing
              ? "start typing the drill text…"
              : "type a command, press Enter (tab completes)"
          }
          aria-describedby="fx-terminal-hint"
          className="flex-1 bg-transparent font-mono text-[12.5px] text-foreground placeholder:text-muted/50 focus:outline-none"
          style={{ caretColor: "#d6b068" }}
        />
      </form>

      <div className="flex flex-wrap items-center gap-2 border-t border-border/60 bg-background/40 px-4 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted/70">
          try
        </span>
        {["help", "ls", "case001", "roles", "ethics", "type", "missions", "badges"].map(
          (chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => {
                setValue("");
                void runCommand(chip);
                inputRef.current?.focus();
              }}
              className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-muted transition hover:border-accent/60 hover:text-accent-2"
            >
              {chip}
            </button>
          ),
        )}
        <span id="fx-terminal-hint" className="sr-only">
          Up/Down arrow for history. Tab completes. Ctrl+L clears. Escape leaves the
          typing drill.
        </span>
      </div>
    </div>
  );
}
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Terminal as TerminalIcon } from "lucide-react";

interface Line {
  kind: "input" | "output" | "error";
  text: string;
}

const ROUTES: Record<string, string> = {
  home: "/",
  about: "/about",
  roles: "/roles",
  matcher: "/roles/matcher",
  team: "/team",
  projects: "/projects",
  case001: "/projects/case-file-001",
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
};

const README = [
  "FORENSYRA — a student-led digital forensics and incident response collective.",
  "",
  "We document investigations the way they should be done: lawful, verified,",
  "chain-of-custody intact, and published so others can learn from them.",
  "",
  "Type 'help' for available commands.",
];

const HELP: Array<[string, string]> = [
  ["help", "Show this list"],
  ["about", "What the collective is"],
  ["ls", "List the workspace"],
  ["cat <file>", "Read a file (try: cat case001)"],
  ["roles", "List the thirteen specialisations"],
  ["case001", "Case File 001 briefing"],
  ["roadmap", "What we are building, in phases"],
  ["ethics", "Our rules of engagement"],
  ["hash <text>", "Compute a real SHA-256, in your browser"],
  ["open <target>", "Go to a page (try: open case001)"],
  ["clear", "Clear the screen"],
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

async function sha256Hex(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * A simulated DFIR shell. It answers from static, honest content and can
 * compute a real SHA-256 in the browser — but it never touches a system.
 * A playful way to learn the vocabulary and wander the site by typing.
 */
export function TerminalPlayground() {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>(() => [
    { kind: "output", text: "FORENSYRA simulated shell — nothing here touches a real system." },
    ...README.map((text) => ({ kind: "output" as const, text })),
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [lines]);

  const push = useCallback((...next: Line[]) => {
    setLines((previous) => [...previous, ...next]);
  }, []);

  const run = useCallback(
    async (raw: string) => {
      const command = raw.trim();
      if (!command) return;

      push({ kind: "input", text: command });
      setHistory((previous) => [command, ...previous].slice(0, 50));
      setHistoryIndex(-1);

      const [name, ...rest] = command.split(/\s+/);
      const argument = rest.join(" ").trim();
      const key = name.toLowerCase();
      const out = (...rows: string[]) =>
        push(...rows.map((text) => ({ kind: "output" as const, text })));

      switch (key) {
        case "help":
        case "?":
          out(
            "Available commands:",
            ...HELP.map(([cmd, description]) => `  ${cmd.padEnd(14)} ${description}`),
          );
          return;

        case "about":
          out(...README);
          return;

        case "ls":
          out(
            "case001/      briefing.md",
            "roles/        (13 specialisations)",
            "learn/        library.json",
            "roadmap.md    ethics.md",
            "README.md",
          );
          return;

        case "cat": {
          const target = argument.toLowerCase();
          if (target.includes("case001") || target.includes("briefing")) {
            out(
              "CASE FILE 001 — The Data Leakage Investigation",
              "Status: planning",
              "Source: NIST CFReDS public practice images (about 6 GB)",
              "Evidence: Windows 7 PC image, two USB images, one CD image,",
              "          seed files and reference hash lists.",
              "Scenario: an insider leaks research to a rival using email,",
              "          personal cloud storage, USB drives and a CD.",
              "Open it: open case001",
            );
            return;
          }
          if (target.includes("roadmap")) {
            out(...ROADMAP);
            return;
          }
          if (target.includes("ethic")) {
            out(...ETHICS);
            return;
          }
          if (target.includes("readme")) {
            out(...README);
            return;
          }
          out(`cat: ${argument || "?"}: no such file. Try: ls`);
          return;
        }

        case "roles":
          out(
            `Thirteen specialisations (${ROLES.length}):`,
            ...ROLES.map((role, index) => `  ${String(index + 1).padStart(2, "0")}  ${role}`),
            "",
            "Not sure? open matcher",
          );
          return;

        case "case001":
        case "case":
          out(
            "Case File 001 — The Data Leakage Investigation",
            "Built entirely on public, legal evidence from NIST CFReDS.",
            "Every role has a defined job; findings meet in one report.",
            "open case001 to read it.",
          );
          return;

        case "roadmap":
          out(...ROADMAP);
          return;

        case "ethics":
          out(...ETHICS);
          return;

        case "hash": {
          if (!argument) {
            out("usage: hash <text>", "Example: hash digital evidence");
            return;
          }
          setBusy(true);
          try {
            const digest = await sha256Hex(argument);
            out(`SHA-256(${argument})`, `  ${digest}`);
          } catch {
            out("hash: this browser wouldn't compute a digest.");
          } finally {
            setBusy(false);
          }
          return;
        }

        case "open": {
          const route = ROUTES[argument.toLowerCase().replace(/^\//, "")];
          if (!route) {
            out(
              `open: unknown target "${argument}".`,
              `Try: ${Object.keys(ROUTES).slice(0, 8).join(", ")} …`,
            );
            return;
          }
          out(`Opening ${route} …`);
          router.push(route);
          return;
        }

        case "clear":
          setLines([]);
          return;

        case "whoami":
          out("visitor@forensyra — welcome. Start with: help");
          return;

        case "date":
          out(new Date().toISOString());
          return;

        default:
          push({
            kind: "error",
            text: `${name}: command not found. Type 'help' for available commands.`,
          });
      }
    },
    [push, router],
  );

  function onKeydown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      const next = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(next);
      setValue(history[next]);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = historyIndex - 1;
      setHistoryIndex(next);
      setValue(next >= 0 ? history[next] : "");
    } else if (event.key === "l" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      setLines([]);
    }
  }

  const QUICK = ["help", "ls", "case001", "roles", "ethics", "hash digital evidence"];

  return (
    <div className="overflow-hidden rounded-2xl border border-border-gold/50 bg-[#050d17] shadow-[0_40px_80px_-40px] shadow-black/90">
      <div className="flex items-center gap-2 border-b border-border/60 bg-background/60 px-4 py-2.5">
        <TerminalIcon className="h-3.5 w-3.5 text-accent" />
        <span className="font-mono text-[11px] text-muted">
          forensyra — simulated shell
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-warning/70" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-success/70" />
        </span>
      </div>

      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="h-[22rem] overflow-y-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed sm:h-[26rem]"
      >
        {lines.map((line, index) => (
          <p
            key={index}
            className={
              line.kind === "input"
                ? "text-foreground"
                : line.kind === "error"
                  ? "text-danger"
                  : "whitespace-pre-wrap text-muted"
            }
          >
            {line.kind === "input" ? (
              <>
                <span className="text-accent">visitor@forensyra</span>
                <span className="text-muted">:~$ </span>
                {line.text}
              </>
            ) : (
              line.text
            )}
          </p>
        ))}
        {busy ? <p className="text-muted/70">computing …</p> : null}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const command = value;
          setValue("");
          void run(command);
        }}
        className="flex items-center gap-2 border-t border-border/60 bg-background/60 px-4 py-3"
      >
        <label htmlFor="fx-terminal-input" className="sr-only">
          Terminal command
        </label>
        <span aria-hidden="true" className="font-mono text-[12.5px] text-accent">
          $
        </span>
        <input
          id="fx-terminal-input"
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={onKeydown}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="type a command, then Enter"
          aria-describedby="fx-terminal-hint"
          className="flex-1 bg-transparent font-mono text-[12.5px] text-foreground placeholder:text-muted/50 focus:outline-none"
        />
      </form>

      <div className="flex flex-wrap items-center gap-2 border-t border-border/60 bg-background/40 px-4 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted/70">
          Try
        </span>
        {QUICK.map((command) => (
          <button
            key={command}
            type="button"
            onClick={() => {
              setValue("");
              void run(command);
              inputRef.current?.focus();
            }}
            className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-muted transition hover:border-accent/60 hover:text-accent-2"
          >
            {command}
          </button>
        ))}
        <span id="fx-terminal-hint" className="sr-only">
          Use the up and down arrow keys to browse command history.
        </span>
      </div>
    </div>
  );
}

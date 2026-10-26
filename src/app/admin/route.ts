import fs from "node:fs";
import path from "node:path";

// Dev-only Decap CMS shell.
//
// The production site has no GitHub OAuth proxy yet, so `/admin` must not be
// publicly reachable: the shell and its config would expose the GitHub repo and
// file layout behind a login that cannot work. The shell therefore lives
// outside `public/` (so it is never copied into the static output) and is
// served only when running the local CMS against `npx decap-server`.
export const dynamic = "force-dynamic";

function notFound() {
  return new Response("Not Found", {
    status: 404,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export function GET() {
  if (process.env.NODE_ENV === "production" && process.env.ENABLE_CMS !== "true") {
    return notFound();
  }

  const file = path.join(process.cwd(), "content", "admin", "index.html");
  const html = fs.readFileSync(file, "utf8");

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

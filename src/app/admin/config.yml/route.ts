import fs from "node:fs";
import path from "node:path";

// Serves the Decap CMS configuration at /admin/config.yml in development only.
//
// In development the local backend is enabled so content can be edited at
// http://localhost:3000/admin without GitHub OAuth (run `npx decap-server`
// alongside `npm run dev`). Production returns 404 unless ENABLE_CMS=true is
// set after the GitHub OAuth proxy is configured; the deployed CMS must not
// expose its repo configuration before then.
export const dynamic = "force-dynamic";

export function GET() {
  if (process.env.NODE_ENV === "production" && process.env.ENABLE_CMS !== "true") {
    return new Response("Not Found", {
      status: 404,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  }

  const file = path.join(process.cwd(), "content", "admin", "config.yml");
  const raw = fs.readFileSync(file, "utf8");
  // With ENABLE_CMS=true the deployed CMS uses the GitHub backend. The local
  // proxy only exists on the developer's machine, so never advertise it in
  // production even though the checked-in config enables it for `npm run dev`.
  const isProduction = process.env.NODE_ENV === "production";
  const body = isProduction
    ? raw.replace(/^local_backend:\s*true\s*$/m, "local_backend: false")
    : raw;

  return new Response(body, {
    headers: {
      "content-type": "text/yaml; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

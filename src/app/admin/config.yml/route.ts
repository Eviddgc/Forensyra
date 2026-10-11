import fs from "node:fs";
import path from "node:path";

// Serves the Decap CMS configuration at /admin/config.yml.
//
// In development the local backend is enabled so content can be edited at
// http://localhost:3000/admin without GitHub OAuth (run `npx decap-server`
// alongside `npm run dev`). In production it is forced off, so the deployed
// CMS talks to the configured GitHub backend instead of a local proxy.
export const dynamic = "force-static";

export function GET() {
  const file = path.join(process.cwd(), "content", "admin", "config.yml");
  const raw = fs.readFileSync(file, "utf8");
  const isProduction = process.env.NODE_ENV === "production";
  const body = isProduction
    ? raw.replace(/^local_backend:\s*true\s*$/m, "local_backend: false")
    : raw;

  return new Response(body, {
    headers: {
      "content-type": "text/yaml; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}

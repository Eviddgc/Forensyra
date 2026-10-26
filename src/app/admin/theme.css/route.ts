import fs from "node:fs";
import path from "node:path";

// Serves the FORENSYRA theme for the Decap CMS shell at /admin/theme.css.
//
// The theme lives outside `public/` so it follows the same production gate as
// the CMS itself: without ENABLE_CMS=true the whole admin surface, stylesheet
// included, must stay unreachable.
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

  const file = path.join(process.cwd(), "content", "admin", "theme.css");
  const css = fs.readFileSync(file, "utf8");

  return new Response(css, {
    headers: {
      "content-type": "text/css; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * A nonce-based CSP requires every route to render dynamically, which would
 * trade away this site's fully static output. Following Next's documented
 * non-nonce policy, inline script/style stay allowed (the pre-paint intro
 * script, the JSON-LD blocks and React's style attributes are inline), but
 * every *source* is pinned to this origin, and framing, plugins, workers and
 * cross-origin form posts are blocked.
 */
const siteContentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "media-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

/**
 * Decap CMS (§ content/admin) is a third-party SPA: it loads its bundle from a
 * CDN and talks to GitHub (and, once configured, an OAuth proxy), so the strict
 * policy would break the editor. It gets a relaxed policy that still forbids
 * plugins, framing and <base> hijacking. Tighten this when the OAuth proxy is
 * set up and its origin is known.
 */
const cmsContentSecurityPolicy = [
  "default-src 'self'",
  // Decap loads its bundle from a CDN and validates the config with Ajv, which
  // compiles validators through `new Function` — hence 'unsafe-eval' here.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://cdn.jsdelivr.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  // `npx decap-server` (local backend) listens on :8081 in development only.
  `connect-src 'self' https:${isDev ? " http://localhost:8081" : ""}`,
  "media-src 'self' blob:",
  "frame-src 'self' https:",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
].join("; ");
const nextConfig: NextConfig = {
  // Don't advertise the framework in every response.
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: siteContentSecurityPolicy },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          // HSTS is production-only: sending it from a plain-HTTP dev server
          // would pin localhost to HTTPS in the browser.
          ...(isDev
            ? []
            : [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=31536000",
                },
              ]),
        ],
      },
      {
        // Last match wins for duplicate keys, so this overrides only the CSP.
        source: "/admin/:path*",
        headers: [
          { key: "Content-Security-Policy", value: cmsContentSecurityPolicy },
        ],
      },
    ];
  },
  // Decap CMS lives in public/admin/index.html. Next doesn't map a bare
  // directory to its index file, so route /admin (and /admin/) to it.
  async rewrites() {
    return [
      { source: "/admin", destination: "/admin/index.html" },
      { source: "/admin/", destination: "/admin/index.html" },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

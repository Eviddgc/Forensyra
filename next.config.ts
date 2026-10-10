import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

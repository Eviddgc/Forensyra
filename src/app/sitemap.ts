import type { MetadataRoute } from "next";
import { getSite } from "@/lib/site";
import { getSlugs } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSite();
  const base = site.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: Array<{ path: string; priority: number }> = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/roles", priority: 0.8 },
    { path: "/team", priority: 0.7 },
    { path: "/projects", priority: 0.9 },
    { path: "/writeups", priority: 0.7 },
    { path: "/roadmap", priority: 0.7 },
    { path: "/ethics", priority: 0.6 },
    { path: "/join", priority: 0.9 },
    { path: "/resources", priority: 0.6 },
    { path: "/contact", priority: 0.5 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route.path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route.priority,
    })),
    ...getSlugs("projects").map((slug) => ({
      url: `${base}/projects/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...getSlugs("writeups").map((slug) => ({
      url: `${base}/writeups/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

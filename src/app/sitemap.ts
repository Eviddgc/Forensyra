import type { MetadataRoute } from "next";
import { getSite } from "@/lib/site";
import { getEntries } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = getSite();
  const base = site.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: Array<{ path: string; priority: number }> = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/roles", priority: 0.8 },
    { path: "/roles/matcher", priority: 0.7 },
    { path: "/team", priority: 0.7 },
    { path: "/projects", priority: 0.9 },
    { path: "/writeups", priority: 0.7 },
    { path: "/roadmap", priority: 0.7 },
    { path: "/ethics", priority: 0.6 },
    { path: "/join", priority: 0.9 },
    { path: "/resources", priority: 0.7 },
    { path: "/resources/datasets", priority: 0.6 },
    { path: "/resources/tools", priority: 0.6 },
    { path: "/playground", priority: 0.6 },
    { path: "/apply", priority: 0.9 },
    { path: "/apply/mentor", priority: 0.6 },
    { path: "/security", priority: 0.4 },
    { path: "/contact", priority: 0.5 },
  ];

  const [projects, writeups] = await Promise.all([
    getEntries("projects"),
    getEntries("writeups"),
  ]);

  const dateOf = (value?: string) => {
    if (!value) return now;
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? now : parsed;
  };

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route.path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route.priority,
    })),
    ...projects.map((entry) => ({
      url: `${base}/projects/${entry.slug}`,
      lastModified: dateOf(entry.updated ?? entry.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...writeups.map((entry) => ({
      url: `${base}/writeups/${entry.slug}`,
      lastModified: dateOf(entry.updated ?? entry.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

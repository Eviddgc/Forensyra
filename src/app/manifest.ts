import type { MetadataRoute } from "next";
import { getSite } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  const site = getSite();
  return {
    name: `${site.name} — ${site.descriptor}`,
    short_name: site.name,
    description: site.description,
    id: "/",
    start_url: "/",
    scope: "/",
    lang: "en",
    dir: "ltr",
    display: "standalone",
    background_color: "#071827",
    theme_color: "#071827",
    icons: [
      { src: "/brand-mark.png", sizes: "768x768", type: "image/png", purpose: "any" },
    ],
  };
}

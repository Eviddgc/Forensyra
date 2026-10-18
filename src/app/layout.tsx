import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Announcement } from "@/components/announcement";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Preloader } from "@/components/preloader";
import { ScrollProgress } from "@/components/scroll-progress";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
import { CommandPalette } from "@/components/command-palette";
import { getSearchIndex } from "@/lib/search";
import { getSite } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const site = getSite();

// Runs before the page paints so the intro overlay is only shown to new
// sessions (no flash for returning visitors).
const INTRO_SCRIPT = `(function(){try{var s=sessionStorage.getItem('fx-intro-seen');var r=document.documentElement;if(s){r.classList.add('intro-seen');}else{r.classList.add('intro-active');}}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.descriptor}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "digital forensics",
    "DFIR",
    "incident response",
    "evidence handling",
    "chain of custody",
    "memory forensics",
    "network forensics",
    "mobile forensics",
    "AI forensics",
    "Forensyra",
  ],
  authors: [{ name: site.name, url: site.social.github || site.url }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.descriptor}`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.descriptor}`,
    description: site.tagline,
  },
  alternates: {
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: `${site.name} — RSS` }],
    },
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#071827",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { docs } = await getSearchIndex();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${plexMono.variable} ${playfair.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <noscript>
          {/* Without JS the intro can't dismiss itself and reveals can't run. */}
          <style>{".fx-intro{display:none !important}.fx-reveal{opacity:1 !important;transform:none !important}"}</style>
        </noscript>

        <Preloader />
        <ScrollProgress />
        <CommandPalette docs={docs} />

        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          <div className="bg-damask absolute inset-0" />
          <div className="fx-orb animate-drift left-[-12%] top-[-14%] h-[44rem] w-[44rem] bg-accent/20" />
          <div className="fx-orb animate-float-slow right-[-14%] top-[16%] h-[36rem] w-[36rem] bg-accent-2/20" />
          <div className="fx-orb bottom-[-22%] left-[28%] h-[32rem] w-[32rem] bg-accent/10" />
          <div className="fx-noise absolute inset-0 opacity-[0.035] mix-blend-soft-light" />
        </div>

        <Announcement
          enabled={site.announcement.enabled}
          text={site.announcement.text}
          link={site.announcement.link}
          linkLabel={site.announcement.linkLabel}
        />
        <SiteHeader
          name={site.name}
          descriptor={site.descriptor}
        />
        <main id="main" className="relative flex-1">{children}</main>
        <SiteFooter
          name={site.name}
          description={site.description}
          motto={site.motto}
          email={site.email}
          social={site.social}
        />
      </body>
    </html>
  );
}

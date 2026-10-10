import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Announcement } from "@/components/announcement";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSite } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const site = getSite();

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <Announcement
          enabled={site.announcement.enabled}
          text={site.announcement.text}
          link={site.announcement.link}
          linkLabel={site.announcement.linkLabel}
        />
        <SiteHeader
          name={site.name}
          descriptor={site.descriptor}
          applyUrl={site.applyUrl}
        />
        <main className="flex-1">{children}</main>
        <SiteFooter
          name={site.name}
          descriptor={site.descriptor}
          motto={site.motto}
          email={site.email}
          github={site.social.github}
          linkedin={site.social.linkedin}
        />
      </body>
    </html>
  );
}

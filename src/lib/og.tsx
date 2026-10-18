import { ImageResponse } from "next/og";
import { getSite } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

function clamp(value: string, max: number): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trimEnd()}…`;
}

/**
 * Shared 1200×630 Open Graph card for content pages. Keeps the generated
 * images visually consistent with the site-wide card in app/opengraph-image.
 */
export function renderOgCard({
  kind,
  title,
  subtitle,
  footer,
}: {
  kind: string;
  title: string;
  subtitle?: string;
  footer?: Array<string | undefined>;
}): ImageResponse {
  const site = getSite();
  const meta = (footer ?? []).filter((item): item is string => Boolean(item));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0d1b2a",
          backgroundImage:
            "radial-gradient(60% 55% at 20% 0%, rgba(201,154,71,0.20) 0%, rgba(13,27,42,0) 70%), radial-gradient(50% 50% at 90% 15%, rgba(27,54,93,0.55) 0%, rgba(13,27,42,0) 70%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 999,
                border: "2px solid #c99a47",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#c99a47",
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              F
            </div>
            <div
              style={{
                color: "#f5ebdd",
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: 5,
              }}
            >
              {site.name}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              border: "1px solid rgba(201,154,71,0.55)",
              backgroundColor: "rgba(201,154,71,0.12)",
              color: "#e6c17a",
              borderRadius: 999,
              padding: "8px 22px",
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {kind}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              color: "#f5ebdd",
              fontSize: title.length > 60 ? 50 : 62,
              fontWeight: 700,
              letterSpacing: -1,
              lineHeight: 1.1,
              maxWidth: 1000,
            }}
          >
            {clamp(title, 96)}
          </div>
          {subtitle ? (
            <div
              style={{
                color: "#93a3bb",
                fontSize: 26,
                lineHeight: 1.4,
                maxWidth: 940,
              }}
            >
              {clamp(subtitle, 150)}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            color: "#93a3bb",
            fontSize: 22,
            letterSpacing: 1,
          }}
        >
          {meta.map((item) => (
            <div key={item} style={{ display: "flex" }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}

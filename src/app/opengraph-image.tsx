import { ImageResponse } from "next/og";
import { getSite } from "@/lib/site";

export const alt = "FORENSYRA — Digital Evidence & DFIR Collective";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const site = getSite();

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
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              border: "2px solid #c99a47",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#c99a47",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            F
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                color: "#f5ebdd",
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: 6,
              }}
            >
              {site.name}
            </div>
            <div style={{ color: "#93a3bb", fontSize: 20 }}>
              {site.descriptor}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              color: "#f5ebdd",
              fontSize: 62,
              fontWeight: 700,
              letterSpacing: -1,
              lineHeight: 1.1,
            }}
          >
            {site.tagline}
          </div>
          <div style={{ color: "#e6c17a", fontSize: 26, letterSpacing: 3 }}>
            {site.motto}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            color: "#93a3bb",
            fontSize: 22,
            letterSpacing: 1,
          }}
        >
          Student-led DFIR · Legal mock cases · Public sample evidence
        </div>
      </div>
    ),
    { ...size },
  );
}

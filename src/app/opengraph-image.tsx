import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getSite } from "@/lib/site";

export const alt = "FORENSYRA — Digital Evidence & DFIR Collective";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const site = getSite();
  const logo = `data:image/png;base64,${fs.readFileSync(path.join(process.cwd(), "public/brand-mark.png")).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0c1119",
          backgroundImage:
            "radial-gradient(60% 55% at 20% 0%, rgba(201,154,71,0.20) 0%, rgba(12,17,25,0) 70%), radial-gradient(50% 50% at 90% 15%, rgba(201,154,71,0.09) 0%, rgba(12,17,25,0) 70%)",
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
            <img src={logo} width={60} height={60} alt="" />
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
            <div style={{ color: "#a9aaad", fontSize: 20 }}>
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
            color: "#a9aaad",
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

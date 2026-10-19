"use client";

import { useEffect } from "react";
import site from "../../content/settings/site.json";

/**
 * Last-resort boundary: replaces the whole document when the root layout
 * itself throws, so there is still a branded, usable page. Must render its own
 * <html> and <body>. No app styles are guaranteed here, so styles are inline.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[forensyra] global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#071827",
          color: "#f5f4f0",
          fontFamily: "system-ui, sans-serif",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "32rem", textAlign: "center" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.72rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#e6b64f",
            }}
          >
            System fault
          </p>
          <h1
            style={{
              margin: "0.75rem 0 0",
              fontSize: "1.75rem",
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            FORENSYRA could not start
          </h1>
          <p style={{ marginTop: "1rem", color: "#b7c4d2", lineHeight: 1.6 }}>
            A critical error prevented the site from loading. Reloading usually
            clears it. If the problem persists, please email {site.email}.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1.75rem",
              cursor: "pointer",
              borderRadius: "999px",
              border: "none",
              background: "#e6b64f",
              color: "#071827",
              padding: "0.7rem 1.5rem",
              fontSize: "0.95rem",
              fontWeight: 600,
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}

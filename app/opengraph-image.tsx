import { ImageResponse } from "next/og";

export const alt = "ARIQ Labs — Automatiza WhatsApp y SEO Local en Arequipa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#F8FAFC",
          padding: "64px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="#0B0F19" d="M18 14h28v8H34v12h-8V22H18V14z" />
            <path fill="#0B0F19" d="M74 14h28v8H86v12h-8V22H74V14z" />
            <path fill="#0B0F19" d="M38 38h22v28L38 66V38z" />
            <path fill="#10B981" d="M60 38h22l-22 28V38z" />
            <circle cx="60" cy="78" r="5" fill="#10B981" />
          </svg>
          <span
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#0B0F19",
              letterSpacing: "-0.02em",
            }}
          >
            ARIQ Labs
          </span>
        </div>
        <p
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: "#1E293B",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          Automatiza tu WhatsApp y posiciónate primero en Google Maps
        </p>
        <p
          style={{
            fontSize: 24,
            color: "#2563EB",
            marginTop: 24,
          }}
        >
          Arequipa · Pymes locales · 10 días
        </p>
      </div>
    ),
    { ...size },
  );
}

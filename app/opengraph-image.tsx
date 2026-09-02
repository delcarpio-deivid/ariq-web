import { ImageResponse } from "next/og";
import { AriqIsotipoSvg } from "@/lib/brand-isotipo";

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
          <AriqIsotipoSvg width={80} height={80} />
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

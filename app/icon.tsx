import { ImageResponse } from "next/og";
import { AriqIsotipoSvg } from "@/lib/brand-isotipo";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <AriqIsotipoSvg width={28} height={28} />
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";

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
        <svg
          width="28"
          height="28"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="#0B0F19" d="M18 14h28v8H34v12h-8V22H18V14z" />
          <path fill="#0B0F19" d="M74 14h28v8H86v12h-8V22H74V14z" />
          <path fill="#0B0F19" d="M38 38h22v28L38 66V38z" />
          <path fill="#10B981" d="M60 38h22l-22 28V38z" />
          <circle cx="60" cy="78" r="5" fill="#10B981" />
          <path
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            d="M60 83v12"
          />
          <path
            stroke="#0B0F19"
            strokeWidth="3"
            strokeLinecap="round"
            d="M60 83L38 102"
          />
          <path
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            d="M60 83L82 102"
          />
          <circle cx="38" cy="102" r="4" fill="#0B0F19" />
          <circle cx="82" cy="102" r="4" fill="#10B981" />
        </svg>
      </div>
    ),
    { ...size },
  );
}

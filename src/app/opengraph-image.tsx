import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          background: "#1a1a1a",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,122,0,0.35), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,193,7,0.25), transparent 40%)",
        }}
      >
        <div
          style={{
            fontSize: 110,
            fontWeight: 900,
            backgroundImage: "linear-gradient(90deg, #FF7A00, #FFC107, #FF4D00)",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: -2,
          }}
        >
          EMG
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 34,
            fontWeight: 700,
            color: "#ffffff",
          }}
        >
          Everything Must Go Online
        </div>
        <div style={{ marginTop: 14, fontSize: 22, color: "rgba(255,255,255,0.6)" }}>
          Buy. Sell. Advertise. Grow.
        </div>
      </div>
    ),
    { ...size }
  );
}

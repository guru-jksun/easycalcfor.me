import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "EasyCalcFor.me";
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
          background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #9333ea 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative math symbols at top */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            fontSize: "64px",
            color: "rgba(255,255,255,0.25)",
            fontWeight: 700,
            position: "absolute",
            top: "60px",
          }}
        >
          <span>+</span>
          <span>−</span>
          <span>×</span>
          <span>=</span>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-2px",
            marginTop: "20px",
          }}
        >
          EasyCalcFor.me
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "32px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.85)",
            marginTop: "16px",
          }}
        >
          Calculate Anything, Easily
        </div>

        {/* Bottom info */}
        <div
          style={{
            fontSize: "22px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.6)",
            position: "absolute",
            bottom: "60px",
            display: "flex",
            gap: "12px",
          }}
        >
          <span>100+ Free Calculators</span>
          <span>|</span>
          <span>9 Languages</span>
          <span>|</span>
          <span>AI-Powered</span>
        </div>
      </div>
    ),
    { ...size },
  );
}

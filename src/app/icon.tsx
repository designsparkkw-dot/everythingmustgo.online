import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

const cartSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 56">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFC107" />
      <stop offset="55%" stop-color="#FF7A00" />
      <stop offset="100%" stop-color="#FF4D00" />
    </linearGradient>
  </defs>
  <rect x="0" y="10" width="14" height="3.4" rx="1.7" fill="url(#g)" opacity="0.55" />
  <rect x="5" y="17" width="20" height="3.4" rx="1.7" fill="url(#g)" opacity="0.75" />
  <rect x="2" y="24" width="16" height="3.4" rx="1.7" fill="url(#g)" opacity="0.55" />
  <path d="M19 13 H54 L48 31 H25 Z" fill="none" stroke="url(#g)" stroke-width="3.4" stroke-linejoin="round" />
  <path d="M19 13 L24 31" stroke="url(#g)" stroke-width="3" />
  <path d="M28.5 13 L31 31" stroke="url(#g)" stroke-width="2.6" />
  <path d="M38 13 L39.5 31" stroke="url(#g)" stroke-width="2.6" />
  <path d="M47 13 L42.5 31" stroke="url(#g)" stroke-width="2.6" />
  <path d="M54 13 L60 9" stroke="url(#g)" stroke-width="3.4" stroke-linecap="round" />
  <circle cx="29" cy="40" r="4.4" fill="none" stroke="url(#g)" stroke-width="3" />
  <circle cx="44" cy="40" r="4.4" fill="none" stroke="url(#g)" stroke-width="3" />
</svg>
`;

const cartDataUri = `data:image/svg+xml;base64,${Buffer.from(cartSvg).toString("base64")}`;

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
          background: "#1A1A1A",
          borderRadius: 14,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cartDataUri} width={46} height={40} alt="EMG" />
      </div>
    ),
    { ...size }
  );
}

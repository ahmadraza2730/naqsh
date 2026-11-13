import { ImageResponse } from "next/og";
import { RINGS } from "@/lib/mark";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", background: "#081626", padding: 80, gap: 72 }}>
        <svg width="400" height="400" viewBox="-110 -110 220 220">
          {RINGS.map((r, i) => (
            <path key={r.R} d={r.d} fill="none" stroke={i === RINGS.length - 1 ? "#c9a45c" : "#ede6d6"} strokeOpacity={i === RINGS.length - 1 ? 1 : 0.35 + i * 0.12} strokeWidth={i === 0 ? 2.4 : 2} />
          ))}
          <circle r="5" fill="#c9a45c" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", color: "#ede6d6" }}>
          <div style={{ fontSize: 110, letterSpacing: -2 }}>{site.name}</div>
          <div style={{ fontSize: 40, color: "#c9a45c", marginTop: 8 }}>{site.tagline}</div>
          <div style={{ fontSize: 26, color: "#98a4b6", marginTop: 28 }}>{`Graphic design studio, ${site.city}`}</div>
        </div>
      </div>
    ),
    size,
  );
}

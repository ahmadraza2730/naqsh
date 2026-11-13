import { ImageResponse } from "next/og";
import { CONTOURS, PIN, ROUTE, STAR } from "@/lib/mark";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", background: "#081626", padding: 80, gap: 72 }}>
        <svg width="400" height="400" viewBox="-110 -110 220 220">
          <path d={STAR} fill="none" stroke="#ede6d6" strokeWidth={2} />
          {CONTOURS.slice(1).map((c, i) => (
            <path key={c.t} d={c.d} fill="none" stroke="#ede6d6" strokeOpacity={0.35 + i * 0.15} strokeWidth={1.6} />
          ))}
          <path d={ROUTE} fill="none" stroke="#c9a45c" strokeWidth={1.8} strokeDasharray="4 5" />
          <path d={PIN.d} transform={`translate(${PIN.x} ${PIN.y})`} fill="#c9a45c" />
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

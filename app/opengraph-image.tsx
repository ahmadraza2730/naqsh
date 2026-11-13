import { ImageResponse } from "next/og";
import { BOX, INDUS, ISLAMABAD, OUTLINE, starPath } from "@/lib/mark";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", background: "#081626", padding: 80, gap: 72 }}>
        <svg width="420" height="420" viewBox={`${BOX.x - 8} ${BOX.y - 8} ${BOX.w + 16} ${BOX.h + 16}`}>
          <path d={OUTLINE} fill="#0f2742" stroke="#ede6d6" strokeWidth={1.4} />
          <path d={INDUS} fill="none" stroke="#c9a45c" strokeWidth={2} />
          <path d={starPath(6)} transform={`translate(${ISLAMABAD.x} ${ISLAMABAD.y})`} fill="#c9a45c" />
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

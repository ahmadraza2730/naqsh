// The Naqsh mark: a map in an eight-point star.
// The khatam star from Islamic geometry is the frame, like the border of
// an old map. Inside it, topographic contour lines rise to a summit where a
// gold pin marks the spot, and a dashed route climbs to it. A small tick on
// the top point is north. Naqsh means imprint, pattern and map.

const K = Math.cos(Math.PI / 4) / Math.cos(Math.PI / 8); // inner/outer ratio of an 8-point star

export function starPath(R: number, rotationDeg = 0): string {
  const pts: string[] = [];
  for (let i = 0; i < 16; i++) {
    const r = i % 2 === 0 ? R : R * K;
    const a = ((i * 22.5 + rotationDeg - 90) * Math.PI) / 180;
    pts.push(`${(r * Math.cos(a)).toFixed(2)} ${(r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}

// Smooth closed curve through points (Catmull-Rom converted to cubic Béziers).
function closedCurve(pts: [number, number][]): string {
  const n = pts.length;
  const f = (v: number) => v.toFixed(2);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + "Z";
}

// One contour of the hill. Higher levels shrink and drift toward the summit,
// so the lines bunch up on the steep side like a real topographic map.
const SUMMIT: [number, number] = [8, -10];
function contour(level: number): string {
  const t = level; // 0 = base, 1 = top
  const R = 60 * (1 - t) + 9;
  const cx = SUMMIT[0] * t - 6 * (1 - t);
  const cy = SUMMIT[1] * t + 8 * (1 - t);
  const pts: [number, number][] = [];
  const N = 12;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const wob =
      1 +
      0.13 * Math.sin(2 * a + 0.6 + t * 1.4) +
      0.08 * Math.sin(3 * a + 2.1 - t * 0.9) +
      0.05 * Math.sin(5 * a + 0.3);
    pts.push([cx + Math.cos(a) * R * wob * 1.08, cy + Math.sin(a) * R * wob * 0.92]);
  }
  return closedCurve(pts);
}

export const STAR = starPath(100);
export const CONTOURS = [0, 0.22, 0.42, 0.6, 0.76].map((t) => ({ t, d: contour(t) }));
// Dashed route from the lower-left of the frame up to the pin.
export const ROUTE = "M-62 58 C-40 50 -46 30 -24 24 S2 26 0 6 S6 -4 8 -10";
// Location pin, tip resting on the summit.
export const PIN = { x: SUMMIT[0], y: SUMMIT[1], d: "M0 0 C-3 -6 -9 -10 -9 -17 A9 9 0 1 1 9 -17 C9 -10 3 -6 0 0Z" };
export const NORTH = "M0 -100 L0 -116";

// Fewer, bolder lines for small sizes (nav, favicon, footer).
export const CONTOURS_SMALL = [0.12, 0.5].map((t) => ({ t, d: contour(t) }));

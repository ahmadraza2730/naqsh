// The Naqsh mark: an eight-point star (the khatam of Islamic geometry)
// drawn as nested contour lines, like the rings of a topographic map,
// each ring turned a few degrees so the star seems to spiral in toward
// a single point — the place a mark is made.

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

export const RINGS = [100, 84, 68, 53, 39, 26].map((R, i) => ({
  R,
  rot: i * 4.5,
  d: starPath(R, i * 4.5),
}));

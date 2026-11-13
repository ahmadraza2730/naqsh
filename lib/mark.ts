// The Naqsh mark: a map of Pakistan.
// The outline is the country (Natural Earth, see lib/pakistan.ts). Contour
// lines rise toward the Karakoram and Hindu Kush in the north, the Indus runs
// in gold from the mountains to the Arabian Sea, and a small eight-point
// khatam star marks Islamabad, where the studio is. Naqsh means imprint,
// pattern and map.

export { BOX, OUTLINE, OUTLINE_SMALL, CONTOURS, INDUS, ISLAMABAD } from "./pakistan";

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

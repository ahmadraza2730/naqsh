"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { BOX, CONTOURS, INDUS, ISLAMABAD, OUTLINE, starPath } from "@/lib/mark";
import { site } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;
const PAD = 14;
const VB = `${BOX.x - PAD} ${BOX.y - PAD} ${BOX.w + PAD * 2} ${BOX.h + PAD * 2}`;

function Contour({
  d,
  i,
  mx,
  my,
  reduce,
}: {
  d: string;
  i: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  reduce: boolean;
}) {
  // Higher contours travel further, so the mountains seem to rise toward you.
  const depth = (i + 1) * 1.6;
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.path
      d={d}
      style={{ x, y }}
      fill="none"
      stroke="var(--parchment)"
      strokeOpacity={0.16 + i * 0.1}
      strokeWidth={0.6}
      initial={reduce ? false : { pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.6, delay: 0.9 + i * 0.12, ease: EASE }}
    />
  );
}

export default function Hero() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });
  const tiltX = useTransform(my, (v) => (reduce ? 0 : v * -6));
  const tiltY = useTransform(mx, (v) => (reduce ? 0 : v * 8));

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mapY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const mapScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.85]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, rawX, rawY]);

  // Bodoni's wide W leaves a gap before "e"; kern it by hand.
  const lines: [string, React.ReactNode][] = [
    ["a", "Every brand"],
    ["b", "leaves a mark."],
    [
      "c",
      <>
        <span className="kern-w">W</span>e draw yours.
      </>,
    ],
  ];

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <motion.div className="hero__copy" style={{ y: copyY, opacity: copyOpacity }}>
        <h1 id="hero-title" className="hero__title">
          {lines.map(([k, line], i) => (
            <span className="line-mask" key={k}>
              <motion.span
                className="line"
                initial={reduce ? false : { y: "105%", rotate: 2 }}
                animate={{ y: "0%", rotate: 0 }}
                transition={{ duration: 1.1, delay: 0.5 + i * 0.12, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
        >
          <p className="hero__lede">{site.description}</p>
          <div className="hero__actions">
            <a className="btn btn--gold" href="#brief">
              Start a project
            </a>
            <a className="btn btn--ghost" href="#work">
              See our work
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="hero__mark" style={{ y: mapY, scale: mapScale }} aria-hidden="true">
        <motion.div className="hero__tilt" style={{ rotateX: tiltX, rotateY: tiltY }}>
          <svg viewBox={VB}>
            <defs>
              <clipPath id="pk-clip">
                <path d={OUTLINE} />
              </clipPath>
              <radialGradient id="pk-glow" cx="70%" cy="20%" r="70%">
                <stop offset="0%" stopColor="#1d4170" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0d2036" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* The land: a soft fill so the country reads as a shape. */}
            <motion.path
              d={OUTLINE}
              fill="url(#pk-glow)"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, delay: 1.2 }}
            />

            {/* Graticule, like the lines on a survey sheet. */}
            <g clipPath="url(#pk-clip)" stroke="var(--parchment)" strokeOpacity={0.06} strokeWidth={0.4}>
              {[-80, -58, -36, -14, 8, 30, 52, 74].map((g) => (
                <g key={g}>
                  <line x1={g} y1={-100} x2={g} y2={100} />
                  <line x1={-100} y1={g} x2={100} y2={g} />
                </g>
              ))}
            </g>

            <g clipPath="url(#pk-clip)">
              {CONTOURS.map((d, i) => (
                <Contour key={i} d={d} i={i} mx={mx} my={my} reduce={reduce} />
              ))}
            </g>

            <motion.path
              d={OUTLINE}
              fill="none"
              stroke="var(--parchment)"
              strokeWidth={1.1}
              strokeLinejoin="round"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, delay: 0.15, ease: [0.45, 0, 0.2, 1] }}
            />

            {/* The Indus, drawn from the mountains to the sea. */}
            <motion.path
              d={INDUS}
              fill="none"
              stroke="var(--gold)"
              strokeWidth={1.5}
              strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.7, ease: EASE }}
            />

            {/* Islamabad: a khatam star with a slow ripple. */}
            <g transform={`translate(${ISLAMABAD.x} ${ISLAMABAD.y})`}>
              {!reduce &&
                [0, 1.4].map((d) => (
                  <motion.circle
                    key={d}
                    r={4}
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth={0.6}
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: [1, 5], opacity: [0.7, 0] }}
                    transition={{ duration: 2.8, delay: 3.2 + d, repeat: Infinity, ease: "easeOut" }}
                  />
                ))}
              <motion.path
                d={starPath(5.2)}
                fill="var(--gold)"
                initial={reduce ? false : { scale: 0, rotate: -135 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 12, delay: 2.9 }}
              />
            </g>
            <motion.text
              x={ISLAMABAD.x + 9}
              y={ISLAMABAD.y + 2.5}
              className="hero__label"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2, duration: 0.6 }}
            >
              Islamabad
            </motion.text>

            {/* North arrow. */}
            <motion.g
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4 }}
            >
              <g transform={`translate(${BOX.x + 14} ${BOX.y + 8})`}>
                <path d="M0 -10 L4 4 L0 1.5 L-4 4Z" fill="var(--gold)" />
                <text y={14} textAnchor="middle" className="hero__label">
                  N
                </text>
              </g>
            </motion.g>
          </svg>
        </motion.div>
        <motion.span
          className="hero__urdu"
          lang="ur"
          dir="rtl"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.6 }}
        >
          {site.urdu}
        </motion.span>
      </motion.div>

      <motion.p
        className="hero__coords"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <span>33.6844° N, 73.0479° E</span>
        <span>Designing from {site.city} for clients everywhere</span>
      </motion.p>
    </section>
  );
}

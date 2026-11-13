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
import { CONTOURS, NORTH, PIN, ROUTE, STAR, starPath } from "@/lib/mark";
import { site } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

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
  // Higher contours travel further, so the hill seems to rise toward you.
  const depth = (i + 1) * 3;
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.path
      d={d}
      style={{ x, y }}
      fill="none"
      stroke="var(--parchment)"
      strokeOpacity={0.22 + i * 0.13}
      strokeWidth={0.55}
      initial={reduce ? false : { pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 + i * 0.13, ease: EASE }}
    />
  );
}

const GRID = [-60, -20, 20, 60];

export default function Hero() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 50]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.86]);

  const pinX = useTransform(mx, (v) => v * 18);
  const pinY = useTransform(my, (v) => v * 18);
  const routeX = useTransform(mx, (v) => v * 9);
  const routeY = useTransform(my, (v) => v * 9);

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
    ["c", <><span className="kern-w">W</span>e draw yours.</>],
  ];

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="hero__copy">
        <h1 id="hero-title" className="hero__title">
          {lines.map(([k, line], i) => (
            <span className="line-mask" key={k}>
              <motion.span
                className="line"
                initial={reduce ? false : { y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.9 + i * 0.12, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.45, ease: EASE }}
        >
          <p className="hero__lede">{site.description}</p>
          <div className="hero__actions">
            <a className="btn btn--gold" href="#brief">
              Start a project
            </a>
            <a className="btn btn--ghost" href="#services">
              See services and prices
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div className="hero__mark" style={{ rotate, scale }} aria-hidden="true">
        <svg viewBox="-112 -124 224 236">
          <defs>
            <clipPath id="hero-frame">
              <path d={starPath(98)} />
            </clipPath>
            <mask id="hero-route">
              <motion.path
                d={ROUTE}
                fill="none"
                stroke="#fff"
                strokeWidth={4}
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 1.3, ease: EASE }}
              />
            </mask>
          </defs>

          {/* Frame: the eight-point star, with north marked on its top point. */}
          <motion.path
            d={STAR}
            fill="none"
            stroke="var(--parchment)"
            strokeWidth={0.8}
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.2, ease: EASE }}
          />
          <motion.path
            d={NORTH}
            stroke="var(--gold)"
            strokeWidth={1.2}
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 1.6, ease: EASE }}
          />
          <motion.text
            x={0}
            y={-118}
            textAnchor="middle"
            fontSize={7}
            fill="var(--gold)"
            style={{ fontFamily: "var(--sans)", letterSpacing: 1 }}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
          >
            N
          </motion.text>

          <g clipPath="url(#hero-frame)">
            {/* Graticule, like the lines on a survey sheet. */}
            {GRID.map((g) => (
              <g key={g} stroke="var(--parchment)" strokeOpacity={0.07} strokeWidth={0.4}>
                <line x1={g} y1={-110} x2={g} y2={110} />
                <line x1={-110} y1={g} x2={110} y2={g} />
              </g>
            ))}
            {CONTOURS.map((c, i) => (
              <Contour key={c.t} d={c.d} i={i} mx={mx} my={my} reduce={reduce} />
            ))}
            <motion.g style={{ x: routeX, y: routeY }}>
              <path
                d={ROUTE}
                fill="none"
                stroke="var(--gold)"
                strokeWidth={0.9}
                strokeDasharray="2.5 3"
                strokeLinecap="round"
                mask="url(#hero-route)"
              />
            </motion.g>
          </g>

          {/* The pin drops onto the summit last. */}
          <motion.g style={{ x: pinX, y: pinY }}>
            <motion.g
              initial={reduce ? false : { y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 13, delay: 2.2 }}
            >
              <g transform={`translate(${PIN.x} ${PIN.y})`}>
                <path d={PIN.d} fill="var(--gold)" />
                <circle cy={-17} r={3.4} fill="var(--lapis-900)" />
              </g>
            </motion.g>
            <motion.ellipse
              cx={PIN.x}
              cy={PIN.y + 0.5}
              rx={5}
              ry={1.4}
              fill="var(--gold)"
              opacity={0.35}
              initial={reduce ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2.35, duration: 0.4 }}
            />
          </motion.g>
        </svg>
        <motion.span
          className="hero__urdu"
          lang="ur"
          dir="rtl"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.6 }}
        >
          {site.urdu}
        </motion.span>
      </motion.div>

      <motion.p
        className="hero__coords"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.9 }}
      >
        <span>33.6844° N, 73.0479° E</span>
        <span>Designing from {site.city} for clients everywhere</span>
      </motion.p>
    </section>
  );
}

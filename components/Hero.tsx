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
import { RINGS } from "@/lib/mark";
import { site } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

function Ring({
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
  // Inner rings travel further, so the star reads as a hill you look down on.
  const depth = (i + 1) * 3.2;
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  const last = i === RINGS.length - 1;
  return (
    <motion.path
      d={d}
      style={{ x, y }}
      fill="none"
      stroke={last ? "var(--gold)" : "var(--parchment)"}
      strokeOpacity={last ? 1 : 0.28 + i * 0.12}
      strokeWidth={i === 0 ? 0.65 : 0.5}
      strokeLinejoin="round"
      initial={reduce ? false : { pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.6, delay: 0.25 + (RINGS.length - 1 - i) * 0.14, ease: EASE }}
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

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 50]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.86]);

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
        <svg viewBox="-112 -112 224 224">
          {RINGS.map((r, i) => (
            <Ring key={r.R} d={r.d} i={i} mx={mx} my={my} reduce={reduce} />
          ))}
          <motion.circle
            r={4.2}
            fill="var(--gold)"
            style={{
              x: useTransform(mx, (v) => v * 22),
              y: useTransform(my, (v) => v * 22),
            }}
            initial={reduce ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
          />
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

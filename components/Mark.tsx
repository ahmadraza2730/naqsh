"use client";

import { motion, useReducedMotion } from "motion/react";
import { RINGS } from "@/lib/mark";

type Props = {
  size?: number;
  draw?: boolean;
  delay?: number;
  className?: string;
  title?: string;
};

/** Small, static-friendly version of the mark for nav, footer and stamps. */
export default function Mark({ size = 32, draw = false, delay = 0, className, title = "Naqsh" }: Props) {
  const reduce = useReducedMotion();
  const animate = draw && !reduce;
  return (
    <svg
      viewBox="-106 -106 212 212"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title}
    >
      {RINGS.map((ring, i) => (
        <motion.path
          key={ring.R}
          d={ring.d}
          fill="none"
          stroke={i === RINGS.length - 1 ? "var(--gold)" : "currentColor"}
          strokeWidth={i === 0 ? 7 : 5.5}
          strokeLinejoin="round"
          initial={animate ? { pathLength: 0, opacity: 0 } : false}
          animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.9, delay: delay + (RINGS.length - i) * 0.07, ease: [0.65, 0, 0.35, 1] }}
        />
      ))}
      <motion.circle
        r={9}
        fill="var(--gold)"
        initial={animate ? { scale: 0 } : false}
        animate={animate ? { scale: 1 } : undefined}
        transition={{ duration: 0.4, delay: delay + 0.9, ease: [0.34, 1.56, 0.64, 1] }}
      />
    </svg>
  );
}

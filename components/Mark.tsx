"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CONTOURS_SMALL, PIN, STAR, starPath } from "@/lib/mark";

type Props = {
  size?: number;
  draw?: boolean;
  delay?: number;
  className?: string;
  title?: string;
};

const ease = [0.65, 0, 0.35, 1] as const;

/** Compact mark for nav, footer and the confirmation stamp. */
export default function Mark({ size = 32, draw = false, delay = 0, className, title = "Naqsh" }: Props) {
  const reduce = useReducedMotion();
  const animate = draw && !reduce;
  const clip = useId();
  return (
    <svg viewBox="-108 -118 216 226" width={size} height={size} className={className} role="img" aria-label={title}>
      <defs>
        <clipPath id={clip}>
          <path d={starPath(94)} />
        </clipPath>
      </defs>
      <motion.path
        d={STAR}
        fill="none"
        stroke="currentColor"
        strokeWidth={9}
        strokeLinejoin="round"
        initial={animate ? { pathLength: 0 } : false}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 1, delay, ease }}
      />
      <g clipPath={`url(#${clip})`}>
        {CONTOURS_SMALL.map((c, i) => (
          <motion.path
            key={c.t}
            d={c.d}
            fill="none"
            stroke="currentColor"
            strokeOpacity={i === 0 ? 0.55 : 0.85}
            strokeWidth={8}
            initial={animate ? { pathLength: 0 } : false}
            animate={animate ? { pathLength: 1 } : undefined}
            transition={{ duration: 0.8, delay: delay + 0.3 + i * 0.15, ease }}
          />
        ))}
      </g>
      <motion.g
        initial={animate ? { y: -30, opacity: 0 } : false}
        animate={animate ? { y: 0, opacity: 1 } : undefined}
        transition={{ type: "spring", stiffness: 380, damping: 14, delay: delay + 0.8 }}
      >
        <g transform={`translate(${PIN.x} ${PIN.y + 4}) scale(1.9)`}>
          <path d={PIN.d} fill="var(--gold)" />
          <circle cy={-17} r={3.4} fill="var(--lapis-900)" />
        </g>
      </motion.g>
    </svg>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { BOX, INDUS, ISLAMABAD, OUTLINE_SMALL, starPath } from "@/lib/mark";

type Props = {
  size?: number;
  draw?: boolean;
  delay?: number;
  className?: string;
  title?: string;
};

const ease = [0.65, 0, 0.35, 1] as const;
const PAD = 8;
export const MARK_VIEWBOX = `${BOX.x - PAD} ${BOX.y - PAD} ${BOX.w + PAD * 2} ${BOX.h + PAD * 2}`;

/** Compact mark: Pakistan as a solid shape, the Indus cut through it, Islamabad in gold. */
export default function Mark({ size = 32, draw = false, delay = 0, className, title = "Naqsh" }: Props) {
  const reduce = useReducedMotion();
  const animate = draw && !reduce;
  return (
    <svg viewBox={MARK_VIEWBOX} width={size} height={size} className={className} role="img" aria-label={title}>
      <motion.path
        d={OUTLINE_SMALL}
        stroke="currentColor"
        strokeWidth={6}
        strokeLinejoin="round"
        initial={animate ? { pathLength: 0, fill: "rgba(237,230,214,0)" } : false}
        animate={animate ? { pathLength: 1, fill: "rgba(237,230,214,1)" } : undefined}
        style={animate ? undefined : { fill: "currentColor" }}
        transition={{ pathLength: { duration: 1.1, delay, ease }, fill: { duration: 0.5, delay: delay + 0.9 } }}
      />
      <motion.path
        d={INDUS}
        fill="none"
        stroke="var(--lapis-900)"
        strokeWidth={7}
        strokeLinecap="round"
        initial={animate ? { pathLength: 0 } : false}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.8, delay: delay + 1.1, ease }}
      />
      <g transform={`translate(${ISLAMABAD.x} ${ISLAMABAD.y})`}>
      <motion.path
        d={starPath(19)}
        fill="var(--gold)"
        stroke="var(--lapis-900)"
        strokeWidth={4}
        initial={animate ? { scale: 0, rotate: -90 } : false}
        animate={animate ? { scale: 1, rotate: 0 } : undefined}
        transition={{ type: "spring", stiffness: 300, damping: 14, delay: delay + 1.6 }}
      />
      </g>
    </svg>
  );
}

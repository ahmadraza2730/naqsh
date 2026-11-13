"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { allServices, site } from "@/lib/site";
import { starPath } from "@/lib/mark";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: "0px 0px -12% 0px" } as const;

/** Section heading: the title rises out of a mask, the intro follows. */
export function SectionHead({ id, title, intro }: { id: string; title: React.ReactNode; intro?: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <div className="section__head">
      <h2 id={id} className="h2">
        <span className="line-mask">
          <motion.span
            className="line"
            initial={reduce ? false : { y: "110%", rotate: 1.5 }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={VIEW}
            transition={{ duration: 1, ease: EASE }}
          >
            {title}
          </motion.span>
        </span>
      </h2>
      {intro && (
        <motion.p
          className="section__intro"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
}

/** Generic rise-in for blocks, with an optional stagger index. */
export function Rise({
  children,
  i = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  i?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
    >
      {children}
    </M>
  );
}

/** Image reveal: a lapis curtain lifts off the picture. */
export function Unveil({ children, i = 0 }: { children: React.ReactNode; i?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className="unveil"
      initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={VIEW}
      transition={{ duration: 1.1, delay: i * 0.12, ease: [0.77, 0, 0.18, 1] }}
    >
      <motion.span
        className="unveil__inner"
        initial={reduce ? false : { scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={VIEW}
        transition={{ duration: 1.6, delay: i * 0.12, ease: EASE }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/** Thin gold bar under the nav showing how far down the page you are. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />;
}

/** A slow ribbon of every service, like the border of an illuminated page. */
export function Marquee() {
  const reduce = useReducedMotion();
  const items = allServices.map((s) => s.name);
  const row = (
    <span className="marquee__row">
      {items.map((t) => (
        <span key={t} className="marquee__item">
          {t}
          <svg viewBox="-12 -12 24 24" width="12" height="12" aria-hidden="true">
            <path d={starPath(11)} fill="var(--gold)" />
          </svg>
        </span>
      ))}
    </span>
  );
  return (
    <div className="marquee" aria-label={`${site.name} services`}>
      <motion.div
        className="marquee__track"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
      >
        {row}
        <span aria-hidden="true">{row}</span>
      </motion.div>
    </div>
  );
}

/** A dashed route that draws itself across the process steps. */
export function RouteLine() {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className="steps__line"
      aria-hidden="true"
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEW}
      transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
    />
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { projects } from "@/lib/site";

// Every image across every project, in order, so the viewer can step through all work.
const slides = projects.flatMap((p) => p.images.map((img, i) => ({ ...img, project: p, index: i })));
const slideIndex = (projectId: string, i = 0) => slides.findIndex((s) => s.project.id === projectId && s.index === i);

export default function Work() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);
  const featured = projects.find((p) => p.featured)!;
  const rest = projects.filter((p) => !p.featured);
  // Portrait pieces three to a row, landscape pieces two to a row.
  const ratio = (p: (typeof projects)[number]) => p.images[0].w / p.images[0].h;
  const chunk = <T,>(a: T[], n: number) => Array.from({ length: Math.ceil(a.length / n) }, (_, i) => a.slice(i * n, i * n + n));
  const rows = [...chunk(rest.filter((p) => ratio(p) < 1), 3), ...chunk(rest.filter((p) => ratio(p) >= 1), 2)];
  const [shown, setShown] = useState(0);

  const step = useCallback(
    (d: number) => setOpen((o) => (o === null ? o : (o + d + slides.length) % slides.length)),
    [],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  const cur = open === null ? null : slides[open];

  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="section__head">
        <h2 id="work-title" className="h2">
          Delivered work
        </h2>
        <p className="section__intro">
          Identities, logos and posters we have designed and handed over. Select any piece to see it full size.
        </p>
      </div>

      <article className="case">
        <button
          className="case__stage"
          onClick={() => setOpen(slideIndex(featured.id, shown))}
          aria-label={`View ${featured.images[shown].alt} full size`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={shown}
              className="case__img"
              initial={reduce ? false : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={featured.images[shown].src}
                alt={featured.images[shown].alt}
                fill
                sizes="(max-width: 820px) 100vw, 60vw"
                priority={false}
              />
            </motion.div>
          </AnimatePresence>
        </button>
        <div className="case__info">
          <p className="case__kind">{featured.kind}</p>
          <h3 className="case__title">{featured.title}</h3>
          <p className="case__text">{featured.summary}</p>
          <ul className="case__thumbs" aria-label={`${featured.title} images`}>
            {featured.images.map((img, i) => (
              <li key={img.src}>
                <button
                  className={`thumb ${i === shown ? "thumb--on" : ""}`}
                  onClick={() => setShown(i)}
                  aria-label={img.alt}
                  aria-pressed={i === shown}
                >
                  <Image src={img.src} alt="" width={96} height={96} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </article>

      <div className="works">
        {rows.map((row, r) => (
          <ul className="works__row" key={r}>
            {row.map((p) => {
              const img = p.images[0];
              return (
                // Width proportional to aspect ratio, so every image in a row is the same height.
                <li key={p.id} className="work-card" style={{ flex: `${img.w / img.h} 1 0` }}>
                  <button className="work-card__btn" onClick={() => setOpen(slideIndex(p.id))}>
                    <span className="work-card__img">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={img.w}
                        height={img.h}
                        sizes="(max-width: 820px) 100vw, 40vw"
                      />
                    </span>
                    <span className="work-card__meta">
                      <span className="work-card__title">{p.title}</span>
                      <span className="work-card__kind">{p.kind}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        ))}
      </div>

      <AnimatePresence>
        {cur && (
          <motion.div
            className="viewer"
            role="dialog"
            aria-modal="true"
            aria-label={`${cur.project.title}: ${cur.alt}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(null)}
          >
            <div className="viewer__frame" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={open}
                  className="viewer__img"
                  initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image src={cur.src} alt={cur.alt} width={cur.w} height={cur.h} sizes="90vw" />
                </motion.div>
              </AnimatePresence>
              <div className="viewer__bar">
                <p>
                  <strong>{cur.project.title}</strong> <span>{cur.project.kind}</span>
                </p>
                <p className="viewer__count">
                  {open! + 1} of {slides.length}
                </p>
                <div className="viewer__nav">
                  <button className="btn btn--ghost btn--small" onClick={() => step(-1)}>
                    Previous
                  </button>
                  <button className="btn btn--ghost btn--small" onClick={() => step(1)}>
                    Next
                  </button>
                  <button className="btn btn--gold btn--small" onClick={() => setOpen(null)} autoFocus>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

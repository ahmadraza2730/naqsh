"use client";

import { useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import { serviceGroups, pkr, usd } from "@/lib/site";

export function chooseService(id: string) {
  window.dispatchEvent(new CustomEvent("naqsh:service", { detail: id }));
  document.getElementById("brief")?.scrollIntoView({ behavior: "smooth" });
}

export default function Services() {
  const [groupId, setGroupId] = useState(serviceGroups[0].id);
  const [openId, setOpenId] = useState<string | null>(serviceGroups[0].services[0].id);
  const group = serviceGroups.find((g) => g.id === groupId)!;
  const count = serviceGroups.reduce((n, g) => n + g.services.length, 0);

  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="section__head">
        <h2 id="services-title" className="h2">
          <span className="kern-w">W</span>hat we design
        </h2>
        <p className="section__intro">
          {count} services across four disciplines. Prices are starting points in Pakistani rupees, with an
          approximate dollar figure for international clients. Every project gets a fixed quote before you pay
          anything.
        </p>
      </div>

      <LayoutGroup>
        <div className="tabs" role="tablist" aria-label="Service categories">
          {serviceGroups.map((g) => (
            <button
              key={g.id}
              role="tab"
              aria-selected={g.id === groupId}
              className="tab"
              onClick={() => {
                setGroupId(g.id);
                setOpenId(g.services[0].id);
              }}
            >
              {g.title}
              <span className="tab__count">{g.services.length}</span>
              {g.id === groupId && <motion.span layoutId="tab-ink" className="tab__ink" />}
            </button>
          ))}
        </div>
      </LayoutGroup>

      <AnimatePresence mode="wait">
        <motion.div
          key={group.id}
          role="tabpanel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="group-note">{group.note}</p>
          <ul className="svc-list">
            {group.services.map((s) => {
              const open = openId === s.id;
              return (
                <li key={s.id} className={`svc ${open ? "svc--open" : ""}`}>
                  <button
                    className="svc__row"
                    aria-expanded={open}
                    aria-controls={`svc-${s.id}`}
                    onClick={() => setOpenId(open ? null : s.id)}
                  >
                    <span className="svc__name">{s.name}</span>
                    <span className="svc__days">{s.days}</span>
                    <span className="svc__price">
                      from {pkr(s.fromPkr)}
                      <small>≈ {usd(s.fromPkr)}</small>
                    </span>
                    <span className="svc__plus" aria-hidden="true" />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`svc-${s.id}`}
                        className="svc__body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
                      >
                        <div className="svc__inner">
                          <p>{s.summary}</p>
                          <ul className="svc__deliv">
                            {s.deliverables.map((d) => (
                              <li key={d}>{d}</li>
                            ))}
                          </ul>
                          <button className="btn btn--line" onClick={() => chooseService(s.id)}>
                            Request a quote for {s.name.toLowerCase()}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

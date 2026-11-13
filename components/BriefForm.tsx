"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Mark from "./Mark";
import { budgets, payByRegion, payLabels } from "@/lib/brief";
import { packages, serviceGroups, site } from "@/lib/site";
import { SectionHead } from "./Motion";

type Region = "pakistan" | "international";
type Status = { kind: "idle" } | { kind: "sending" } | { kind: "done"; ref: string; email: string } | { kind: "error"; message: string };

export default function BriefForm() {
  const reduce = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const [region, setRegion] = useState<Region>("pakistan");
  const [service, setService] = useState("");
  const [payment, setPayment] = useState<string>("bank");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  useEffect(() => {
    const onPick = (e: Event) => setService((e as CustomEvent<string>).detail);
    window.addEventListener("naqsh:service", onPick);
    return () => window.removeEventListener("naqsh:service", onPick);
  }, []);

  useEffect(() => {
    setPayment(payByRegion[region][0]);
  }, [region]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setErrors({});
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus({ kind: "done", ref: json.ref, email: String(data.email) });
        return;
      }
      if (json.fields) {
        setErrors(json.fields);
        const first = Object.keys(json.fields)[0];
        formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      }
      setStatus({ kind: "error", message: json.error ?? "Something went wrong. Try again." });
    } catch {
      setStatus({ kind: "error", message: "You seem to be offline. Check your connection and send again." });
    }
  }

  const err = (k: string) =>
    errors[k] ? (
      <span className="field__err" id={`${k}-err`}>
        {errors[k]}
      </span>
    ) : null;
  const aria = (k: string) => (errors[k] ? { "aria-invalid": true, "aria-describedby": `${k}-err` } : {});

  const c = site.contact;
  const direct = [
    c.whatsapp && { href: `https://wa.me/${c.whatsapp}`, label: "Message us on WhatsApp" },
    c.email && { href: `mailto:${c.email}`, label: `Email ${c.email}` },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <section id="brief" className="section brief" aria-labelledby="brief-title">
      <SectionHead id="brief-title" title={"Start a project"} intro={<>Tell us what you need. We reply within 24 hours with questions, a fixed quote and a delivery date. Nothing is charged until you accept the quote.</>} />

      <AnimatePresence mode="wait">
        {status.kind === "done" ? (
          <motion.div
            key="done"
            className="stamp"
            role="status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="stamp__seal"
              initial={reduce ? false : { scale: 2.6, rotate: -28, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, mass: 0.9 }}
            >
              <Mark size={120} />
            </motion.div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <h3 className="stamp__title">Brief received</h3>
              <p>
                Your reference is <strong>{status.ref}</strong>. We will reply to {status.email} within 24 hours
                with a quote and payment details.
              </p>
              <button
                className="btn btn--line"
                onClick={() => {
                  setStatus({ kind: "idle" });
                  setService("");
                }}
              >
                Send another brief
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            className="form"
            onSubmit={onSubmit}
            noValidate
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            exit={{ opacity: 0, y: -10 }}
          >
            <fieldset className="form__region">
              <legend>Where is your business based?</legend>
              <div className="seg">
                {(["pakistan", "international"] as Region[]).map((r) => (
                  <label key={r} className={`seg__opt ${region === r ? "seg__opt--on" : ""}`}>
                    <input
                      type="radio"
                      name="region"
                      value={r}
                      checked={region === r}
                      onChange={() => setRegion(r)}
                    />
                    {r === "pakistan" ? "Pakistan" : "Outside Pakistan"}
                    {region === r && <motion.span layoutId="seg-ink" className="seg__ink" />}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="form__grid">
              <label className="field">
                <span>Your name</span>
                <input name="name" autoComplete="name" required {...aria("name")} />
                {err("name")}
              </label>
              <label className="field">
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" required {...aria("email")} />
                {err("email")}
              </label>
              <label className="field">
                <span>
                  WhatsApp <em>optional</em>
                </span>
                <input name="whatsapp" type="tel" autoComplete="tel" placeholder="+92 300 1234567" {...aria("whatsapp")} />
                {err("whatsapp")}
              </label>
              <label className="field">
                <span>
                  Business or brand name <em>optional</em>
                </span>
                <input name="business" autoComplete="organization" />
              </label>

              <label className="field">
                <span>What do you need?</span>
                <select
                  name="service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  required
                  {...aria("service")}
                >
                  <option value="" disabled>
                    Choose a service or package
                  </option>
                  <optgroup label="Packages">
                    {packages.map((p) => (
                      <option key={p.id} value={`package:${p.id}`}>
                        {p.name} package
                      </option>
                    ))}
                  </optgroup>
                  {serviceGroups.map((g) => (
                    <optgroup key={g.id} label={g.title}>
                      {g.services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                  <option value="other">Something else</option>
                </select>
                {err("service")}
              </label>
              <label className="field">
                <span>
                  Budget <em>optional</em>
                </span>
                <select name="budget" defaultValue="" key={region}>
                  <option value="">Not sure yet</option>
                  {budgets[region].map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field field--wide">
                <span>Describe the project</span>
                <textarea
                  name="details"
                  rows={5}
                  required
                  placeholder="What the business does, who it is for, what you need designed, and anything you already like or dislike."
                  {...aria("details")}
                />
                {err("details")}
              </label>

              <label className="field">
                <span>
                  Reference links <em>optional</em>
                </span>
                <input name="references" placeholder="Pinterest, Instagram, Drive folder…" />
              </label>
              <label className="field">
                <span>
                  Needed by <em>optional</em>
                </span>
                <input name="deadline" type="date" min={new Date().toISOString().slice(0, 10)} />
              </label>
            </div>

            <fieldset className="form__pay">
              <legend>How would you like to pay?</legend>
              <div className="chips">
                {payByRegion[region].map((m) => (
                  <label key={m} className={`chip ${payment === m ? "chip--on" : ""}`}>
                    <input
                      type="radio"
                      name="payment"
                      value={m}
                      checked={payment === m}
                      onChange={() => setPayment(m)}
                    />
                    {payLabels[m]}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Honeypot: hidden from people, irresistible to bots. */}
            <div className="hp" aria-hidden="true">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="form__foot">
              <button className="btn btn--gold btn--big" type="submit" disabled={status.kind === "sending"}>
                {status.kind === "sending" ? "Sending brief…" : "Send brief"}
              </button>
              <AnimatePresence>
                {status.kind === "error" && (
                  <motion.div
                    className="form__error"
                    role="alert"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <p>{status.message}</p>
                    {direct.length > 0 && (
                      <p>
                        {direct.map((d, i) => (
                          <span key={d.href}>
                            {i > 0 && " or "}
                            <a href={d.href}>{d.label}</a>
                          </span>
                        ))}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  );
}

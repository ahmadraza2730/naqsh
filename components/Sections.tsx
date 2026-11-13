import Mark from "./Mark";
import { faqs, payments, process, site } from "@/lib/site";

export function Process() {
  return (
    <section id="process" className="section" aria-labelledby="process-title">
      <div className="section__head">
        <h2 id="process-title" className="h2">
          How a project runs
        </h2>
        <p className="section__intro">Four steps, the same for a single thumbnail or a full identity.</p>
      </div>
      <ol className="steps">
        {process.map((p, i) => (
          <li key={p.title} className="step">
            <span className="step__n">{i + 1}</span>
            <h3 className="step__title">{p.title}</h3>
            <p>{p.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Payment() {
  return (
    <section id="payment" className="section" aria-labelledby="payment-title">
      <div className="section__head">
        <h2 id="payment-title" className="h2">
          Paying us
        </h2>
        <p className="section__intro">
          50% to start, 50% on delivery. Projects under Rs 5,000 are paid in full upfront. Payment details are sent
          with your quote, never before.
        </p>
      </div>
      <div className="pay">
        <div className="pay__col">
          <h3 className="pay__title">In Pakistan</h3>
          <p className="pay__sub">Billed in PKR</p>
          <ul>
            {payments.local.map((m) => (
              <li key={m.name}>
                <strong>{m.name}</strong>
                <span>{m.detail}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="pay__col">
          <h3 className="pay__title">Outside Pakistan</h3>
          <p className="pay__sub">Billed in USD</p>
          <ul>
            {payments.international.map((m) => (
              <li key={m.name}>
                <strong>{m.name}</strong>
                <span>
                  {m.name === "Fiverr" && site.contact.fiverr ? (
                    <>
                      {m.detail}{" "}
                      <a href={site.contact.fiverr} target="_blank" rel="noreferrer">
                        Open our Fiverr profile
                      </a>
                    </>
                  ) : (
                    m.detail
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className="section__head">
        <h2 id="faq-title" className="h2">
          Questions clients ask
        </h2>
      </div>
      <div className="faq">
        {faqs.map((f) => (
          <details key={f.q} className="faq__item">
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  const c = site.contact;
  const links = [
    c.email && { href: `mailto:${c.email}`, label: c.email },
    c.whatsapp && { href: `https://wa.me/${c.whatsapp}`, label: "WhatsApp" },
    c.instagram && { href: c.instagram, label: "Instagram" },
    c.behance && { href: c.behance, label: "Behance" },
    c.fiverr && { href: c.fiverr, label: "Fiverr" },
    c.contra && { href: c.contra, label: "Contra" },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <footer className="footer">
      <div className="footer__brand">
        <Mark size={56} />
        <div>
          <p className="footer__name">
            {site.name} <span lang="ur">{site.urdu}</span>
          </p>
          <p className="footer__line">Graphic design studio, {site.city}</p>
        </div>
      </div>
      {links.length > 0 && (
        <ul className="footer__links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      <p className="footer__legal">
        © {new Date().getFullYear()} {site.name}. Naqsh (نقش) means an imprint, a pattern, a map.
      </p>
    </footer>
  );
}

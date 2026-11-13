"use client";

import { packages, pkr, usd } from "@/lib/site";
import { chooseService } from "./Services";

export default function Packages() {
  return (
    <section id="packages" className="section" aria-labelledby="packages-title">
      <div className="section__head">
        <h2 id="packages-title" className="h2">
          Packages
        </h2>
        <p className="section__intro">Bundles for the most common starting points. Cheaper than ordering each piece on its own.</p>
      </div>
      <div className="pkgs">
        {packages.map((p) => (
          <article key={p.id} className={`pkg ${p.featured ? "pkg--featured" : ""}`}>
            {p.featured && <p className="pkg__flag">Most chosen</p>}
            <h3 className="pkg__name">{p.name}</h3>
            <p className="pkg__fit">{p.fit}</p>
            <p className="pkg__price">
              {pkr(p.pricePkr)}
              {p.per && <span className="pkg__per"> {p.per}</span>}
            </p>
            <p className="pkg__usd">
              about {usd(p.pricePkr)}
              {p.per ? ` ${p.per}` : ""} for international clients
            </p>
            <ul className="pkg__items">
              {p.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
            <button
              className={`btn ${p.featured ? "btn--gold" : "btn--line"}`}
              onClick={() => chooseService(`package:${p.id}`)}
            >
              Choose {p.name}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

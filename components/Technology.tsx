"use client";

import ImageSlot from "./ImageSlot";
import { useCopy } from "./LangProvider";

export default function Technology() {
  const t = useCopy();
  return (
    <section id="technologie" className="tech">
      <div className="tech__inner">
        <div className="tech__media">
          <ImageSlot id="xlaser" label={t.technology.imageAlt} sizes="(max-width: 900px) 100vw, 48vw" />
        </div>

        <div className="tech__copy">
          <span className="eyebrow">{t.technology.eyebrow}</span>
          <h2 className="h-display">{t.technology.title}</h2>
          <p className="body-light">{t.technology.intro}</p>

          <div className="specs">
            <span className="specs__label">{t.technology.specsLabel}</span>
            <ul className="specs__grid">
              {t.technology.specs.map((s) => (
                <li key={s.value}>
                  <span className="specs__value">{s.value}</span>
                  <span className="specs__name">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {t.technology.body.map((p) => (
            <p key={p} className="body-light">
              {p}
            </p>
          ))}

          <p className="tech__closing">{t.technology.closing}</p>
        </div>
      </div>
    </section>
  );
}

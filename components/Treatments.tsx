"use client";

import ImageSlot from "./ImageSlot";
import PillButton from "./PillButton";
import { useCopy } from "./LangProvider";

export default function Treatments() {
  const t = useCopy();
  return (
    <section id="behandlungen" className="shop">
      <div className="shop__intro">
        <span className="eyebrow eyebrow--dark">{t.treatments.eyebrow}</span>
        <h2 className="h-display">{t.treatments.title}</h2>
        <p className="body-light">{t.treatments.intro}</p>
      </div>

      <div className="treats">
        {t.treatments.items.map((item, i) => (
          <article key={item.id} className="treat">
            <div className="treat__panel">
              <span className="treat__badge">
                {t.treatments.badge} {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="treat__title">
                <span className="treat__lead">{item.lead}</span>
                <span className="treat__name">{item.name}</span>
              </h3>
              <p className="treat__body">{item.body}</p>
              <PillButton href="#standorte">{t.treatments.cta}</PillButton>
            </div>
            <div className="treat__media">
              <ImageSlot id={item.id} label={item.alt} sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

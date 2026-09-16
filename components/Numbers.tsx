"use client";

import ImageSlot from "./ImageSlot";
import { useCopy } from "./LangProvider";

export default function Numbers() {
  const t = useCopy();
  // The first figure repeats at the end so the ticker loops seamlessly.
  const frames = [...t.numbers.stats, t.numbers.stats[0]];
  return (
    <section className="band band--numbers">
      <div className="band__media">
        <ImageSlot id="band2" label={t.numbers.imageAlt} sizes="100vw" />
      </div>
      <div className="band__scrim band__scrim--28" aria-hidden="true" />
      <div className="numbers">
        <div className="numbers__head">
          <span className="eyebrow">{t.numbers.eyebrow}</span>
          <h2 className="h-display numbers__title">{t.numbers.title}</h2>
        </div>
        <div className="ticker" aria-label={`${t.numbers.statsLabel}: ${t.numbers.stats.join(", ")}`}>
          <div className="ticker__track">
            {frames.map((s, i) => (
              <div key={i} className="ticker__frame" aria-hidden={i > 0}>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="numbers__body body-light">{t.numbers.body}</p>
      </div>
    </section>
  );
}

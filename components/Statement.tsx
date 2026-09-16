"use client";

import ImageSlot from "./ImageSlot";
import { useCopy } from "./LangProvider";

export default function Statement() {
  const t = useCopy();
  return (
    <section className="band band--statement">
      <div className="band__media">
        <ImageSlot id="band1" label={t.statement.imageAlt} sizes="100vw" />
      </div>
      <div className="band__scrim band__scrim--30" aria-hidden="true" />
      <div className="band__copy">
        <span className="eyebrow">{t.statement.eyebrow}</span>
        <h2 className="h-display band__title">{t.statement.title}</h2>
      </div>
    </section>
  );
}

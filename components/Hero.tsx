"use client";

import ImageSlot from "./ImageSlot";
import { useCopy } from "./LangProvider";

export default function Hero() {
  const t = useCopy();
  return (
    <section id="top" className="hero">
      <div className="hero__frame">
        <div className="hero__media">
          <ImageSlot id="hero" label={t.hero.imageAlt} priority sizes="100vw" />
        </div>
        <div className="hero__scrim" aria-hidden="true" />
        <div className="hero__mid">
          <div className="hero__copy">
            <span className="hero__badge">{t.hero.badge}</span>
            <p className="hero__lede">{t.hero.lede}</p>
          </div>
        </div>

        <div className="hero__giant" aria-hidden="true">
          <span>{t.hero.giant}</span>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import ImageSlot from "./ImageSlot";
import BenefitIcon from "./BenefitIcon";
import { useCopy } from "./LangProvider";

const INTERVAL_MS = 5000;

export default function About() {
  const t = useCopy();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = t.about.benefits.length;

  // One card is visible at a time; the next one fades in over it.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  return (
    <section id="ueber-uns" className="about">
      <div className="about__card">
        <div className="about__head">
          <div className="about__headline">
            <span className="eyebrow eyebrow--dark">{t.about.eyebrow}</span>
            <h2 className="h-display">{t.about.title}</h2>
          </div>
          <p className="about__intro body-light">{t.about.intro}</p>
        </div>

        <div
          className="about__benefits"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {t.about.benefits.map((b, i) => (
            <article key={b.title} className="benefit" data-active={i === active} aria-hidden={i !== active}>
              <div className="benefit__media">
                {/* eager: all three must be decoded before the cross-fade reaches them */}
                <ImageSlot id={b.id} label={b.alt} priority sizes="(max-width: 900px) 100vw, 40vw" />
              </div>
              <div className="benefit__text">
                <BenefitIcon id={b.id} />
                <h3>{b.title}</h3>
                <p className="body-light">{b.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { FACTS } from "@/lib/site";
import { useCopy } from "../LangProvider";
import SplitWords from "../ui/SplitWords";
import ProvenExpert from "./ProvenExpert";
import styles from "./Reviews.module.css";

export default function Reviews({ limit }: { limit?: number }) {
  const t = useCopy();
  const items = t.reviews.items.slice(0, limit);
  const stageRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Progress through the pinned stage (0 → 1) slides the cards from right to
  // left. It goes straight into a CSS variable, so scrolling never re-renders.
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const stage = stageRef.current;
      const sticky = stickyRef.current;
      if (!stage || !sticky) return;
      const distance = stage.offsetHeight - sticky.offsetHeight;
      const progress = distance > 0 ? -stage.getBoundingClientRect().top / distance : 0;
      stage.style.setProperty("--progress", String(Math.min(1, Math.max(0, progress))));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <section id="bewertungen" className={styles.section} aria-labelledby="reviews-title">
      <div ref={stageRef} className={styles.stage} style={{ "--count": items.length } as CSSProperties}>
        <div ref={stickyRef} className={styles.sticky}>
          <div className={styles.titleWrap}>
            <SplitWords as="h2" id="reviews-title" text={t.reviews.title} className="t-display" />
          </div>

          <ul className={styles.track}>
            {items.map((r) => (
              <li key={r.name} className={styles.card}>
                <figure className={styles.figure}>
                  <div>
                    <p className={styles.stars} aria-hidden="true">
                      ★★★★★
                    </p>
                    <span className="sr-only">{t.reviews.rating}</span>
                    <blockquote className="t-quote">
                      <p>
                        {t.reviews.quoteOpen}
                        {r.quote}
                        {t.reviews.quoteClose}
                      </p>
                    </blockquote>
                  </div>
                  <figcaption className={styles.details}>
                    <span className="t-mono">{r.name}</span>
                    <span className={`t-mono ${styles.source}`}>{t.reviews.source}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.summary}>
        <p className="t-mono">{t.reviews.summary(FACTS.googleReviews)}</p>
        <ProvenExpert />
      </div>
    </section>
  );
}

"use client";

import { FACTS } from "@/lib/site";
import { useCopy } from "../LangProvider";
import Photo from "../ui/Photo";
import SplitWords from "../ui/SplitWords";
import ProvenExpert from "./ProvenExpert";
import styles from "./Reviews.module.css";

export default function Reviews({ limit }: { limit?: number }) {
  const t = useCopy();
  const items = t.reviews.items.slice(0, limit);

  return (
    <section id="bewertungen" className={styles.section} aria-labelledby="reviews-title">
      {/* the title is pinned only while the cards pass over it */}
      <div className={styles.pin}>
        <div className={styles.titleWrap}>
          <SplitWords as="h2" id="reviews-title" text={t.reviews.title} className="t-display" />
        </div>

        <ul className={styles.cards}>
          {items.map((r) => (
            <li key={r.name} className={styles.card}>
              <div className={styles.media}>
                <Photo src={r.image} alt={r.alt} sizes="(max-width: 699px) 92vw, 450px" />
              </div>
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

      <div className={styles.summary}>
        <p className="t-mono">{t.reviews.summary(FACTS.googleReviews)}</p>
        <ProvenExpert />
      </div>
    </section>
  );
}

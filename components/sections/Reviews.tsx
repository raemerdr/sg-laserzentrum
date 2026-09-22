"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { STUDIOS, mapsUrl, type Studio } from "@/lib/locations";
import { STUDIO_REVIEWS } from "@/lib/reviews";
import { FACTS, GOOGLE_REVIEWS_URL } from "@/lib/site";
import { useLang } from "../LangProvider";
import GoogleLogo from "../ui/GoogleLogo";
import Icon from "../ui/Icon";
import SplitWords from "../ui/SplitWords";
import ProvenExpert from "./ProvenExpert";
import styles from "./Reviews.module.css";

/**
 * On a studio page, `studio` swaps in that studio's own Google reviews and
 * adds a link to its Google listing; the home page shows the brand-wide ones.
 */
export default function Reviews({ studio }: { studio?: Studio }) {
  const { lang, t } = useLang();
  const items = studio ? STUDIO_REVIEWS[studio.slug].map((r) => ({ name: r.name, quote: r[lang] })) : t.reviews.items;
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
            <SplitWords
              as="h2"
              id="reviews-title"
              text={studio ? t.reviews.studioTitle(studio.city) : t.reviews.title}
              className="t-display"
            />
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
                    <span className={styles.source}>
                      <GoogleLogo size={16} />
                      <span className="t-mono">{t.reviews.source}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.summary}>
        <a className={styles.google} href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
          <span className={styles.googleTop} aria-hidden="true">
            <GoogleLogo size={24} />
            <span className={styles.googleStars}>★★★★★</span>
          </span>
          <span className={`t-h2 ${styles.googleText}`}>{t.reviews.summary(FACTS.googleReviews, STUDIOS.length)}</span>
          <span className="sr-only">{t.a11y.opensNewTab}</span>
        </a>
        {studio && (
          <a className={styles.studioLink} href={mapsUrl(studio)} target="_blank" rel="noopener noreferrer">
            <span className={styles.studioLinkText}>
              {studio.google
                ? t.reviews.studioRating(studio.google.rating, studio.google.count, studio.city)
                : t.reviews.studioLink(studio.city)}
            </span>
            <Icon name="external" size={14} />
            <span className="sr-only">{t.a11y.opensNewTab}</span>
          </a>
        )}
        <ProvenExpert />
      </div>
    </section>
  );
}

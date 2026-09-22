"use client";

import { useCopy } from "../LangProvider";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import SplitWords from "../ui/SplitWords";
import styles from "./Technology.module.css";

/**
 * The benefit first, beside the device: four wavelengths reach four depths of
 * the skin. The illustration shows four hairs, each followed by a beam of
 * light down to its root, deeper from left to right; the labels sit above
 * their beams.
 */
export default function Technology() {
  const t = useCopy();

  return (
    <section id="technologie" className={styles.section} aria-labelledby="tech-title">
      <div className={styles.top}>
        <header className={styles.head}>
          <Reveal>
            <p className="t-mono t-muted">{t.technology.eyebrow}</p>
          </Reveal>
          <SplitWords as="h2" id="tech-title" text={t.technology.title} className={`t-h2 ${styles.title}`} />
          <Reveal delay={150}>
            <p className={styles.body}>{t.technology.body}</p>
          </Reveal>
        </header>
        {/* the product photo until the client's own shot of the device in a studio arrives; swap the src then */}
        <Reveal className={styles.device} delay={120}>
          <Photo
            src="/images/sg-xlaser-pro.jpg"
            alt={t.technology.imageAlt}
            sizes="(max-width: 899px) 92vw, 540px"
            position="50% 45%"
            className={styles.devicePhoto}
          />
        </Reveal>
      </div>

      <figure className={styles.chart}>
        <figcaption className={styles.caption}>{t.technology.chartLabel}</figcaption>
        <Reveal className={styles.scene}>
          {/* generated for this section (Nano Banana Pro); its beams sit at the centres of its quarters, above the four columns */}
          <div className={styles.skin}>
            <Photo src="/images/technologie-wellenlaengen.jpg" alt={t.technology.chartAlt} sizes="100vw" />
          </div>
          <ol className={styles.waves}>
            {t.technology.wavelengths.map((w) => (
              <li key={w.nm} className={styles.wave}>
                <p className={`t-mono ${styles.nm}`}>{w.nm}</p>
                <h3 className={styles.waveTitle}>{w.title}</h3>
                <p className={styles.waveBody}>{w.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </figure>

      <Reveal className={styles.cooling}>
        <p className={styles.coolingValue}>{t.technology.cooling.value}</p>
        <div className={styles.coolingText}>
          <p className="t-mono">{t.technology.cooling.label}</p>
          <p className={styles.coolingBody}>{t.technology.cooling.body}</p>
        </div>
      </Reveal>
    </section>
  );
}

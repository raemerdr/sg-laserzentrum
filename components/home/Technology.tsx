"use client";

import { useCopy } from "../LangProvider";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import styles from "./Technology.module.css";

export default function Technology() {
  const t = useCopy();
  return (
    <section id="technologie" className={styles.section} aria-labelledby="tech-title">
      <Reveal className={styles.card}>
        <div className={styles.media}>
          <Photo src="/images/sg-xlaser-pro.jpg" alt={t.technology.imageAlt} sizes="(max-width: 899px) 100vw, 650px" position="50% 100%" />
        </div>
        <div className={styles.text}>
          <div className={styles.top}>
            <p className="t-mono t-muted">{t.technology.eyebrow}</p>
            <h2 id="tech-title" className="t-h2">
              {t.technology.title}
            </h2>
            <p className={styles.body}>{t.technology.body}</p>
          </div>
          <dl className={styles.specs}>
            {t.technology.specs.map((s) => (
              <div key={s.value} className={styles.spec}>
                <dt className={styles.specValue}>{s.value}</dt>
                <dd className={`t-mono ${styles.specLabel}`}>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}

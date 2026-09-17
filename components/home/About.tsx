"use client";

import { STUDIOS } from "@/lib/locations";
import { useCopy } from "../LangProvider";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import SplitWords from "../ui/SplitWords";
import styles from "./About.module.css";

export default function About() {
  const t = useCopy();
  return (
    <section className={styles.about} aria-labelledby="about-title">
      <div className={styles.media}>
        <Photo src="/images/studio.jpg" alt={t.about.imageAlt} sizes="100vw" position="50% 60%" />
      </div>
      <div className={styles.veil} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.titleCol}>
          <Reveal>
            <p className={`t-mono ${styles.eyebrow}`}>{t.about.eyebrow}</p>
          </Reveal>
          <SplitWords as="h2" id="about-title" text={t.about.title} className="t-h2" />
        </div>
        <Reveal className={styles.text} delay={250}>
          <p className="t-lead">{t.about.body(STUDIOS.length)}</p>
        </Reveal>
      </div>
    </section>
  );
}

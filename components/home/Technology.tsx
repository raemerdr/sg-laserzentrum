"use client";

import Image from "next/image";
import { useCopy } from "../LangProvider";
import Reveal from "../ui/Reveal";
import SplitWords from "../ui/SplitWords";
import styles from "./Technology.module.css";

/** Centered product stage: the large name behind the full machine cut-out, then the description and specs. */
export default function Technology() {
  const t = useCopy();
  return (
    <section id="technologie" className={styles.section} aria-labelledby="tech-title">
      <Reveal>
        <p className="t-mono t-muted">{t.technology.eyebrow}</p>
      </Reveal>

      <div className={styles.stage}>
        <SplitWords as="h2" id="tech-title" text={t.technology.title} className={styles.title} />
        <Reveal className={styles.machine} delay={120}>
          <Image
            src="/images/sg-xlaser-pro-full.png"
            alt={t.technology.imageAlt}
            width={991}
            height={2178}
            sizes="360px"
            className={styles.machineImage}
          />
        </Reveal>
      </div>

      <Reveal delay={150}>
        <p className={styles.body}>{t.technology.body}</p>
      </Reveal>

      <dl className={styles.specs}>
        {t.technology.specs.map((s, i) => (
          <Reveal key={s.value} className={styles.spec} delay={i * 80}>
            <dt className={styles.specValue}>{s.value}</dt>
            <dd className={`t-mono ${styles.specLabel}`}>{s.label}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

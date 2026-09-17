"use client";

import { FACTS } from "@/lib/site";
import { STUDIOS } from "@/lib/locations";
import { useCopy } from "../LangProvider";
import Reveal from "../ui/Reveal";
import SplitWords from "../ui/SplitWords";
import styles from "./Proof.module.css";

export default function Proof() {
  const t = useCopy();
  const stats = t.proof.stats(STUDIOS.length, FACTS.treatments, FACTS.googleReviews);

  return (
    <section className={styles.proof} aria-labelledby="proof-title">
      <header className={styles.head}>
        <Reveal>
          <p className="t-mono t-muted">{t.proof.eyebrow}</p>
        </Reveal>
        <SplitWords as="h2" id="proof-title" text={t.proof.title} className="t-h2" />
      </header>

      <dl className={styles.stats}>
        {stats.map((s, i) => (
          <Reveal key={s.label} className={styles.stat} delay={i * 90}>
            <dt className={`t-mono ${styles.label}`}>{s.label}</dt>
            <dd className={styles.value}>{s.value}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

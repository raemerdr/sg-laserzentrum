"use client";

import { useCopy } from "../LangProvider";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import SplitWords from "../ui/SplitWords";
import styles from "./Belief.module.css";

/** Two columns: an eyebrow over a large statement, beside a tall photograph. */
export default function Belief() {
  const t = useCopy();
  return (
    <section className={styles.section} aria-labelledby="belief-title">
      <div className={styles.text}>
        <Reveal>
          <p className="t-mono t-muted">{t.belief.eyebrow}</p>
        </Reveal>

        <div>
          <SplitWords as="h2" id="belief-title" text={t.belief.title} className={styles.title} />
          <Reveal delay={200}>
            <p className={styles.body}>{t.belief.body}</p>
          </Reveal>
        </div>
      </div>

      <Reveal className={styles.media} delay={120}>
        <Photo src="/images/belief-legs.jpg" alt={t.belief.imageAlt} sizes="(max-width: 899px) 92vw, 600px" />
      </Reveal>
    </section>
  );
}

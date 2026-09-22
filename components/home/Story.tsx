"use client";

import { STUDIOS } from "@/lib/locations";
import { useCopy } from "../LangProvider";
import Reveal from "../ui/Reveal";
import SplitWords from "../ui/SplitWords";
import styles from "./Story.module.css";

/** How SG grew from one studio into a brand, beside the brand's two letters. */
export default function Story() {
  const t = useCopy();

  return (
    <section className={styles.section} aria-labelledby="story-title">
      <Reveal className={styles.mark}>
        <span className={styles.letters} aria-hidden="true">
          SG
        </span>
      </Reveal>

      <div className={styles.text}>
        <Reveal>
          <p className="t-mono t-muted">{t.story.eyebrow}</p>
        </Reveal>
        <SplitWords as="h2" id="story-title" text={t.story.title} className="t-display" />
        <Reveal delay={150}>
          <p className={`t-lead ${styles.lead}`}>{t.story.body(STUDIOS.length)}</p>
        </Reveal>
      </div>
    </section>
  );
}

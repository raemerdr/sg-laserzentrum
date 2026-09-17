"use client";

import { useCopy } from "../LangProvider";
import Reveal from "../ui/Reveal";
import SplitWords from "../ui/SplitWords";
import styles from "./Statement.module.css";

/** Centered opening line of the panel that rises over the hero. */
export default function Statement() {
  const t = useCopy();
  return (
    <section className={styles.section} aria-labelledby="statement-title">
      <Reveal>
        <p className={`t-mono ${styles.eyebrow}`}>{t.statement.eyebrow}</p>
      </Reveal>
      <SplitWords as="h2" id="statement-title" text={t.statement.text} className="t-h3" />
    </section>
  );
}

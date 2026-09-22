"use client";

import { FOUNDERS } from "@/lib/site";
import { useCopy } from "../LangProvider";
import Reveal from "../ui/Reveal";
import SplitWords from "../ui/SplitWords";
import styles from "./Founders.module.css";

/**
 * "Die Frauen hinter SG": the two founders, a photo of them together with
 * their names under it, then the brand's international outlook.
 */
export default function Founders() {
  const t = useCopy();
  const f = t.founders;

  return (
    <section className={styles.section} aria-labelledby="founders-title">
      <header className={styles.head}>
        <SplitWords as="h2" id="founders-title" text={f.title} className="t-display" />
        <Reveal delay={150}>
          <p className={`t-lead ${styles.intro}`}>{f.intro}</p>
        </Reveal>
      </header>

      <figure className={styles.figure}>
        {/* an empty frame until the client sends the portrait; put a <Photo> in here then */}
        <Reveal className={styles.photo}>
          <p className={`t-mono ${styles.pending}`}>{f.photoPending}</p>
        </Reveal>
        <figcaption className={styles.caption}>
          <span>{FOUNDERS.map((person) => person.name).join(" & ")}</span>
          <span className="t-mono t-muted">{f.role}</span>
        </figcaption>
      </figure>

      <Reveal className={styles.international}>
        <h3 className={`t-mono ${styles.intlTitle}`}>{f.international.title}</h3>
        <div className={styles.intlText}>
          <ul className={styles.markets}>
            {f.international.markets.map((market) => (
              <li key={market}>{market}</li>
            ))}
          </ul>
          <p className={styles.body}>{f.international.body}</p>
        </div>
      </Reveal>
    </section>
  );
}

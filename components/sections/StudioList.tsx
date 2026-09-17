"use client";

import Link from "next/link";
import { PLANNED_CITIES, STUDIOS, type StudioSlug } from "@/lib/locations";
import { useCopy } from "../LangProvider";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import SplitWords from "../ui/SplitWords";
import styles from "./StudioList.module.css";

export default function StudioList({ exclude, title }: { exclude?: StudioSlug; title?: string }) {
  const t = useCopy();
  const studios = STUDIOS.filter((s) => s.slug !== exclude);

  return (
    <section id="standorte" className={styles.section} aria-labelledby="studios-title">
      <header className={styles.head}>
        <Reveal>
          <p className="t-mono t-muted">{t.locations.eyebrow}</p>
        </Reveal>
        <SplitWords as="h2" id="studios-title" text={title ?? t.locations.title(STUDIOS.length)} className="t-h2" />
        {!exclude && (
          <Reveal delay={150}>
            <p className={styles.intro}>{t.locations.intro}</p>
          </Reveal>
        )}
      </header>

      <Reveal>
        <ul className={styles.list}>
          {studios.map((s) => (
            <li key={s.slug} className={styles.row}>
              <Link href={`/standorte/${s.slug}`} className={`t-h3 ${styles.city} ${styles.link}`}>
                {s.city}
                <Icon name="arrow" size={22} />
              </Link>
              <address className={styles.address}>
                {s.street}
                <br />
                {s.zip}
              </address>
              <div className={styles.actions}>
                <Button href={s.booking} external size="sm" icon="external">
                  {t.locations.book}
                </Button>
              </div>
            </li>
          ))}
          {!exclude &&
            PLANNED_CITIES.map((city) => (
              <li key={city} className={`${styles.row} ${styles.planned}`}>
                <span className={`t-h3 ${styles.city}`}>{city}</span>
                <span className={styles.address} />
                <span className="t-mono t-muted">{t.locations.planned}</span>
              </li>
            ))}
        </ul>
      </Reveal>
    </section>
  );
}

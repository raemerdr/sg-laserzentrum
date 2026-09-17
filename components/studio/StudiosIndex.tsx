"use client";

import { PLANNED_CITIES, STUDIOS } from "@/lib/locations";
import { useCopy } from "../LangProvider";
import BookingCta from "../sections/BookingCta";
import Button from "../ui/Button";
import PageHeader from "../ui/PageHeader";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import styles from "./StudiosIndex.module.css";

export default function StudiosIndex() {
  const t = useCopy();
  return (
    <div>
      <PageHeader eyebrow={t.studiosPage.eyebrow} title={t.studiosPage.title} intro={t.studiosPage.intro(STUDIOS.length)} />

      <ul className={styles.grid}>
        {STUDIOS.map((s, i) => (
          <li key={s.slug}>
            <Reveal className={styles.card} delay={(i % 2) * 90}>
              <div className={styles.media}>
                <Photo src={s.image} alt="" sizes="(max-width: 799px) 92vw, 640px" />
              </div>
              <div className={styles.body}>
                <div>
                  <h2 className="t-h3">{s.city}</h2>
                  <address className={styles.address}>
                    {s.street}, {s.zip}
                  </address>
                </div>
                <div className={styles.actions}>
                  <Button href={`/standorte/${s.slug}`} icon="arrow">
                    {t.locations.details}
                  </Button>
                  <Button href={s.booking} external variant="stone" icon="external">
                    {t.locations.book}
                  </Button>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
        {PLANNED_CITIES.map((city) => (
          <li key={city}>
            <Reveal className={styles.planned}>
              <p className="t-mono t-muted">{t.locations.planned}</p>
              <h2 className="t-h3">{city}</h2>
              <p className={styles.plannedBody}>{t.studiosPage.plannedBody}</p>
            </Reveal>
          </li>
        ))}
      </ul>

      <BookingCta />
    </div>
  );
}

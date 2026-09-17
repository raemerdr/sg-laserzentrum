"use client";

import { CONTACT } from "@/lib/site";
import { hoursFor, mapsUrl, type Studio, type TimeRange } from "@/lib/locations";
import { useCopy } from "../LangProvider";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import styles from "./StudioFacts.module.css";

export default function StudioFacts({ studio }: { studio: Studio }) {
  const t = useCopy();
  const hours = hoursFor(studio);
  const range = (r: TimeRange | null) => (r ? `${r.open}–${r.close}${t.studio.clock ? ` ${t.studio.clock}` : ""}` : t.studio.closed);

  return (
    <section className={styles.section} aria-label={`${t.studio.address}, ${t.studio.contact}, ${t.studio.hours}`}>
      <Reveal className={styles.card}>
        <h2 className={`t-mono ${styles.label}`}>{t.studio.address}</h2>
        <address className={styles.big}>
          {studio.street}
          <br />
          {studio.zip}
        </address>
        <a className={styles.link} href={mapsUrl(studio)} target="_blank" rel="noopener noreferrer">
          {t.studio.route}
          <Icon name="external" size={14} />
          <span className="sr-only">{t.a11y.opensNewTab}</span>
        </a>
      </Reveal>

      <Reveal className={styles.card} delay={90}>
        <h2 className={`t-mono ${styles.label}`}>{t.studio.contact}</h2>
        <a className={styles.big} href={studio.phoneHref}>
          {studio.phone}
        </a>
        <div className={styles.links}>
          {studio.whatsapp && (
            <a className={styles.link} href={studio.whatsapp} target="_blank" rel="noopener noreferrer">
              {t.studio.whatsapp}
              <Icon name="external" size={14} />
              <span className="sr-only">{t.a11y.opensNewTab}</span>
            </a>
          )}
          <a className={styles.link} href={`mailto:${CONTACT.email}`}>
            {CONTACT.email}
          </a>
        </div>
      </Reveal>

      <Reveal className={styles.card} delay={180}>
        <h2 className={`t-mono ${styles.label}`}>{t.studio.hours}</h2>
        <dl className={styles.hours}>
          <div className={styles.hoursRow}>
            <dt>{t.studio.weekdays}</dt>
            <dd>{range(hours.weekdays)}</dd>
          </div>
          <div className={styles.hoursRow}>
            <dt>{t.studio.saturday}</dt>
            <dd>{range(hours.saturday)}</dd>
          </div>
          <div className={styles.hoursRow}>
            <dt>{t.studio.sunday}</dt>
            <dd>{range(hours.sunday)}</dd>
          </div>
        </dl>
      </Reveal>
    </section>
  );
}

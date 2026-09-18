"use client";

import { CONTACT } from "@/lib/site";
import { hoursFor, mapsUrl, type Studio, type TimeRange } from "@/lib/locations";
import { useCopy } from "../LangProvider";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import SplitWords from "../ui/SplitWords";
import StudioMap from "./StudioMap";
import styles from "./StudioFacts.module.css";

export default function StudioFacts({ studio }: { studio: Studio }) {
  const t = useCopy();
  const hours = hoursFor(studio);
  const range = (r: TimeRange | null) => (r ? `${r.open}–${r.close}${t.studio.clock ? ` ${t.studio.clock}` : ""}` : t.studio.closed);

  return (
    <section className={styles.section} aria-labelledby="facts-title">
      <header className={styles.head}>
        <SplitWords as="h2" id="facts-title" text={t.studio.factsTitle(studio.city)} className="t-h2" />
        <Reveal delay={150}>
          <p className={styles.intro}>{t.studio.factsIntro}</p>
        </Reveal>
      </header>

      <div className={styles.cards}>
        <Reveal className={styles.card}>
          <div className={styles.cardHead}>
            <span className={styles.badge}>
              <Icon name="pin" size={20} />
            </span>
            <h3 className={`t-mono ${styles.label}`}>{t.studio.address}</h3>
          </div>
          <address className={styles.big}>
            {studio.street}
            <br />
            {studio.zip}
          </address>
          <a className={styles.link} href={mapsUrl(studio)} target="_blank" rel="noopener noreferrer">
            <span className={styles.linkText}>{t.studio.route}</span>
            <Icon name="external" size={14} />
            <span className="sr-only">{t.a11y.opensNewTab}</span>
          </a>
        </Reveal>

        <Reveal className={styles.card} delay={90}>
          <div className={styles.cardHead}>
            <span className={styles.badge}>
              <Icon name="phone" size={20} />
            </span>
            <h3 className={`t-mono ${styles.label}`}>{t.studio.contact}</h3>
          </div>
          <a className={styles.big} href={studio.phoneHref}>
            {studio.phone}
          </a>
          <div className={styles.links}>
            {studio.whatsapp && (
              <a className={styles.link} href={studio.whatsapp} target="_blank" rel="noopener noreferrer">
                <Icon name="chat" size={18} className={styles.lead} />
                <span className={styles.linkText}>{t.studio.whatsapp}</span>
                <Icon name="external" size={14} />
                <span className="sr-only">{t.a11y.opensNewTab}</span>
              </a>
            )}
            <a className={styles.link} href={`mailto:${CONTACT.email}`}>
              <Icon name="mail" size={18} className={styles.lead} />
              <span className={styles.linkText}>{CONTACT.email}</span>
            </a>
          </div>
        </Reveal>

        <Reveal className={styles.card} delay={180}>
          <div className={styles.cardHead}>
            <span className={styles.badge}>
              <Icon name="clock" size={20} />
            </span>
            <h3 className={`t-mono ${styles.label}`}>{t.studio.hours}</h3>
          </div>
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
      </div>

      <StudioMap studio={studio} className={styles.map} />
    </section>
  );
}

"use client";

import Link from "next/link";
import { STUDIOS } from "@/lib/locations";
import { CONTACT } from "@/lib/site";
import { useCopy } from "../LangProvider";
import { useBooking } from "../layout/BookingProvider";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import PageHeader from "../ui/PageHeader";
import Reveal from "../ui/Reveal";
import SplitWords from "../ui/SplitWords";
import styles from "./Contact.module.css";

/** Three ways to get in touch, then every studio's address and phone number. */
export default function Contact() {
  const t = useCopy();
  const { openBooking } = useBooking();

  return (
    <div>
      <PageHeader eyebrow={t.contact.eyebrow} title={t.contact.title} intro={t.contact.intro} />

      <section className={styles.ways} aria-label={t.contact.eyebrow}>
        <Reveal className={styles.card}>
          <div className={styles.cardHead}>
            <span className={styles.badge}>
              <Icon name="phone" size={20} />
            </span>
            <h2 className={`t-mono ${styles.label}`}>{t.contact.phone}</h2>
          </div>
          <a className={styles.big} href={CONTACT.phoneHref}>
            {CONTACT.phone}
          </a>
          <a className={styles.link} href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
            <Icon name="chat" size={18} className={styles.lead} />
            <span className={styles.linkText}>{t.studio.whatsapp}</span>
            <Icon name="external" size={14} />
            <span className="sr-only">{t.a11y.opensNewTab}</span>
          </a>
        </Reveal>

        <Reveal className={styles.card} delay={90}>
          <div className={styles.cardHead}>
            <span className={styles.badge}>
              <Icon name="mail" size={20} />
            </span>
            <h2 className={`t-mono ${styles.label}`}>{t.contact.email}</h2>
          </div>
          <a
            className={`${styles.big} ${styles.email}`}
            href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(t.contact.emailSubject)}`}
          >
            {CONTACT.email}
          </a>
        </Reveal>

        <Reveal className={styles.card} delay={180}>
          <div className={styles.cardHead}>
            <span className={styles.badge}>
              <Icon name="calendar" size={20} />
            </span>
            <h2 className={`t-mono ${styles.label}`}>{t.contact.booking}</h2>
          </div>
          <p className={styles.text}>{t.contact.bookingBody}</p>
          <Button onClick={openBooking} icon="arrow">
            {t.nav.book}
          </Button>
        </Reveal>
      </section>

      <section className={styles.studios} aria-labelledby="contact-studios">
        <header className={styles.head}>
          <Reveal>
            <p className="t-mono t-muted">{t.contact.studiosEyebrow}</p>
          </Reveal>
          <SplitWords as="h2" id="contact-studios" text={t.contact.studiosTitle} className="t-h2" />
          <Reveal delay={150}>
            <p className={styles.intro}>{t.contact.studiosIntro}</p>
          </Reveal>
        </header>

        <ul className={styles.grid}>
          {STUDIOS.map((s, i) => (
            <li key={s.slug}>
              <Reveal className={styles.studio} delay={(i % 3) * 90}>
                <h3 className={styles.city}>{s.city}</h3>
                <address className={styles.address}>
                  {s.street}
                  <br />
                  {s.zip}
                </address>
                <a className={styles.phone} href={s.phoneHref}>
                  {s.phone}
                </a>
                <Link href={`/standorte/${s.slug}`} className={styles.link}>
                  <span className={styles.linkText}>{t.contact.toStudio}</span>
                  <Icon name="arrow" size={14} />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

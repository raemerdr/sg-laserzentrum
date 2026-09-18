"use client";

import Link from "next/link";
import { COMPANY, CONTACT, CREDIT } from "@/lib/site";
import { PLANNED_CITIES, STUDIOS } from "@/lib/locations";
import { useCopy } from "../LangProvider";
import Button from "../ui/Button";
import SgMonogram from "../ui/SgMonogram";
import { useBooking } from "./BookingProvider";
import { useHashLink } from "./useHashLink";
import styles from "./Footer.module.css";

export default function Footer() {
  const t = useCopy();
  const { openBooking } = useBooking();
  const onHashLink = useHashLink();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <SgMonogram className={styles.logo} />
            <p className={styles.tagline}>{t.footer.tagline(STUDIOS.length)}</p>
            <Button variant="paper" onClick={openBooking}>
              {t.nav.book}
            </Button>
          </div>

          <nav className={styles.cols} aria-label={t.a11y.footerNav}>
            <div>
              <h2 className={`t-mono ${styles.heading}`}>{t.footer.studios}</h2>
              <ul className={styles.list}>
                {STUDIOS.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/standorte/${s.slug}`}>{s.city}</Link>
                  </li>
                ))}
                {PLANNED_CITIES.map((city) => (
                  <li key={city} className={styles.planned}>
                    {city} · {t.footer.planned}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className={`t-mono ${styles.heading}`}>{t.footer.company}</h2>
              <ul className={styles.list}>
                {t.footer.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={(e) => onHashLink(e, l.href)}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div id="kontakt">
              <h2 className={`t-mono ${styles.heading}`}>{t.footer.contact}</h2>
              <ul className={styles.list}>
                <li>
                  <span className={styles.contactLabel}>{t.footer.phone}</span>
                  <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                </li>
                <li>
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                    <span className="sr-only"> {t.a11y.opensNewTab}</span>
                  </a>
                </li>
                <li>
                  <span className={styles.contactLabel}>{t.footer.email}</span>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </li>
                <li>
                  <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">
                    Instagram
                    <span className="sr-only"> {t.a11y.opensNewTab}</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className="t-mono" suppressHydrationWarning>
            © {new Date().getFullYear()} {COMPANY.legalName}
          </p>
          <p className={styles.credit}>
            {CREDIT.label}{" "}
            <a href={CREDIT.url} target="_blank" rel="noopener noreferrer">
              {CREDIT.name}
              <span className="sr-only">{t.a11y.opensNewTab}</span>
            </a>
          </p>
          <ul className={`t-mono ${styles.legal}`}>
            {t.footer.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { COMPANY, CONTACT } from "@/lib/site";
import { useCopy } from "../LangProvider";
import SplitWords from "../ui/SplitWords";
import styles from "./Legal.module.css";

export default function Imprint() {
  const t = useCopy();
  const gp = COMPANY.generalPartner;
  const and = t.imprint.title === "Impressum" ? " und " : " and ";

  return (
    <article className={styles.page}>
      <SplitWords as="h1" mode="load" text={t.imprint.title} className={`t-display ${styles.title}`} />

      <section className={styles.block}>
        <h2 className={`t-mono ${styles.label}`}>{t.imprint.provider}</h2>
        <address className={styles.rows}>
          <span className={styles.strong}>{COMPANY.legalName}</span>
          <span>{COMPANY.street}</span>
          <span>
            {COMPANY.zip} {COMPANY.city}
          </span>
        </address>
        <p className={styles.rows}>
          <span>
            {t.imprint.register}: {COMPANY.registerCourt}
          </span>
          <span>
            {t.imprint.registerNumber}: {COMPANY.registerNumber}
          </span>
        </p>
      </section>

      <section className={styles.block}>
        <h2 className={`t-mono ${styles.label}`}>{t.imprint.representedBy}</h2>
        <address className={styles.rows}>
          <span className={styles.strong}>{gp.name}</span>
          <span>{gp.street}</span>
          <span>
            {gp.zip} {gp.city}
          </span>
        </address>
        <p className={styles.rows}>
          <span>
            {t.imprint.register}: {gp.registerCourt}
          </span>
          <span>
            {t.imprint.registerNumber}: {gp.registerNumber}
          </span>
        </p>
        <p>
          {t.imprint.managingDirectors}: {COMPANY.managingDirectors.join(and)}
        </p>
      </section>

      <section className={styles.block}>
        <h2 className={`t-mono ${styles.label}`}>{t.imprint.contact}</h2>
        <p className={styles.rows}>
          <span>
            {t.imprint.phone}: <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          </span>
          <span>
            {t.imprint.email}: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </span>
        </p>
      </section>

      {COMPANY.vatId ? (
        <section className={styles.block}>
          <h2 className={`t-mono ${styles.label}`}>{t.imprint.vat}</h2>
          <p>{COMPANY.vatId}</p>
        </section>
      ) : (
        process.env.NODE_ENV !== "production" && (
          <section className={styles.block}>
            <h2 className={`t-mono ${styles.label}`}>{t.imprint.vat}</h2>
            <p className={styles.devNote}>{t.imprint.vatPending}</p>
          </section>
        )
      )}
    </article>
  );
}

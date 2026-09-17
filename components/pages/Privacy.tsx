"use client";

import { COMPANY, CONTACT } from "@/lib/site";
import { useCopy } from "../LangProvider";
import SplitWords from "../ui/SplitWords";
import styles from "./Legal.module.css";

export default function Privacy() {
  const t = useCopy();
  return (
    <article className={styles.page}>
      <SplitWords as="h1" mode="load" text={t.privacy.title} className={`t-display ${styles.title}`} />

      <section className={styles.block}>
        <h2 className={`t-mono ${styles.label}`}>{t.privacy.controller}</h2>
        <address className={styles.rows}>
          <span className={styles.strong}>{COMPANY.legalName}</span>
          <span>{COMPANY.street}</span>
          <span>
            {COMPANY.zip} {COMPANY.city}
          </span>
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </address>
      </section>

      <section className={styles.block}>
        <p>{t.privacy.pending}</p>
        {process.env.NODE_ENV !== "production" && <p className={styles.devNote}>{t.privacy.devNote}</p>}
      </section>
    </article>
  );
}

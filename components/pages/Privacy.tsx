"use client";

import { COMPANY, CONTACT } from "@/lib/site";
import { useCopy } from "../LangProvider";
import SplitWords from "../ui/SplitWords";
import styles from "./Legal.module.css";

/** Privacy policy. The controller comes from the same company data as the imprint. */
export default function Privacy() {
  const t = useCopy();
  return (
    <article className={styles.page}>
      <SplitWords as="h1" mode="load" text={t.privacy.title} className={`t-display ${styles.title}`} />

      <section className={styles.block}>
        <h2 className={styles.heading}>{t.privacy.controller}</h2>
        <p>{t.privacy.controllerIntro}</p>
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

      {t.privacy.sections.map((section) => (
        <section key={section.title} className={styles.block}>
          <h2 className={styles.heading}>{section.title}</h2>
          {section.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {section.list && (
            <ul className={styles.list}>
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {section.after?.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>
      ))}

      <section className={styles.block}>
        <p className={styles.muted}>{t.privacy.updated}</p>
        {process.env.NODE_ENV !== "production" && <p className={styles.devNote}>{t.privacy.devNote}</p>}
      </section>
    </article>
  );
}

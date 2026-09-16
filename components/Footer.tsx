"use client";

import { CONTACT, LOCATIONS } from "@/lib/content";
import { useCopy } from "./LangProvider";
import PillButton from "./PillButton";
import Wordmark from "./Wordmark";

export default function Footer() {
  const t = useCopy();
  return (
    <footer id="standorte" className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__pitch">
            <span className="eyebrow">{t.footer.eyebrow}</span>
            <h2>{t.footer.pitch}</h2>
            <PillButton href={LOCATIONS[0].booking} external>
              {t.footer.cta}
            </PillButton>
          </div>
          <div className="footer__contact">
            <span className="footer__heading">{t.footer.contactHeading}</span>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer noopener">
              Instagram
            </a>
          </div>
        </div>

        <div className="footer__rule" />

        <div className="locations">
          <span className="footer__heading">{t.footer.locationsHeading}</span>
          <ul className="locations__grid">
            {LOCATIONS.map((l) => (
              <li key={l.city} className="location">
                <h3>{l.city}</h3>
                <address>
                  {l.street}
                  <br />
                  {l.zip}
                </address>
                <a href={l.phoneHref} className="location__phone">
                  {l.phone}
                </a>
                <a href={l.booking} className="location__book" target="_blank" rel="noreferrer noopener">
                  {t.footer.bookLabel}
                  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14.43 5.4a.75.75 0 0 0-1.06 1.06L18.44 11.5H3.5a.75.75 0 0 0 0 1.5h14.94l-5.07 5.04a.75.75 0 1 0 1.06 1.06l6.6-6.57a.75.75 0 0 0 0-1.06l-6.6-6.57Z" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__rule" />

        <div className="footer__cols">
          {t.footer.columns.map((c) => (
            <div key={c.heading} className="footer__col">
              <span className="footer__heading">{c.heading}</span>
              {c.links.map((l) => (
                <a key={l.label} href={l.href}>
                  {l.label}
                </a>
              ))}
            </div>
          ))}
          <div className="footer__col">
            <span className="footer__heading">{CONTACT.company}</span>
            <address>
              {CONTACT.companyStreet}
              <br />
              {CONTACT.companyZip}
            </address>
            <p className="footer__legal">{t.footer.legal}</p>
          </div>
        </div>
      </div>

      <div className="footer__wordmark" aria-hidden="true">
        <Wordmark className="wordmark--giant" showLine={false} />
      </div>
    </footer>
  );
}

"use client";

import { CONTACT } from "@/lib/site";
import { STUDIOS } from "@/lib/locations";
import { useCopy } from "../LangProvider";
import Button from "../ui/Button";
import PageHeader from "../ui/PageHeader";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import SplitWords from "../ui/SplitWords";
import styles from "./Careers.module.css";

type Offer = {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  cta: string;
  subject: string;
  imageAlt: string;
};

function OfferCard({ offer, image, reverse }: { offer: Offer; image: string; reverse?: boolean }) {
  return (
    <Reveal className={`${styles.card} ${reverse ? styles.reverse : ""}`}>
      <div className={styles.media}>
        <Photo src={image} alt={offer.imageAlt} sizes="(max-width: 899px) 92vw, 650px" />
      </div>
      <div className={styles.text}>
        <p className="t-mono t-muted">{offer.eyebrow}</p>
        <h2 className="t-h2">{offer.title}</h2>
        <p className={styles.body}>{offer.body}</p>
        <ul className={styles.points}>
          {offer.points.map((point, i) => (
            <li key={point} className={styles.point}>
              <span className={`t-mono ${styles.pointIndex}`}>{String(i + 1).padStart(2, "0")}</span>
              {point}
            </li>
          ))}
        </ul>
        <div className={styles.cta}>
          <Button href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(offer.subject)}`} icon="arrow">
            {offer.cta}
          </Button>
        </div>
      </div>
    </Reveal>
  );
}

export default function Careers() {
  const t = useCopy();
  return (
    <div>
      <PageHeader eyebrow={t.careers.eyebrow} title={t.careers.title} intro={t.careers.intro(STUDIOS.length)} />

      <section className={styles.cards}>
        <OfferCard offer={t.careers.franchise} image="/images/studio.jpg" />
        <OfferCard offer={t.careers.jobs} image="/images/vorteil-2.jpg" reverse />
      </section>

      <section className={styles.contact} aria-labelledby="careers-contact">
        <SplitWords as="h2" id="careers-contact" text={t.careers.contactTitle} className="t-h2" />
        <p className={styles.contactBody}>{t.careers.contactBody}</p>
        <div className={styles.contactActions}>
          <Button href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(t.careers.contactSubject)}`} icon="arrow">
            {CONTACT.email}
          </Button>
          <Button href={CONTACT.whatsapp} external variant="stone" icon="external">
            WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { CONTACT, LOCATIONS, mapsUrl, type Location } from "@/lib/content";
import { useCopy } from "./LangProvider";
import PageHeader from "./PageHeader";
import LocationCard from "./LocationCard";
import PillButton from "./PillButton";
import Technology from "./Technology";
import Faq from "./Faq";

export default function LocationDetail({ location }: { location: Location }) {
  const t = useCopy();
  const others = LOCATIONS.filter((l) => l.slug !== location.slug);

  return (
    <>
      <PageHeader
        eyebrow={t.locations.detailPrefix}
        title={location.city}
        lead={t.locations.cityIntro}
        image={location.image}
        imageAlt={`${t.locations.detailPrefix} ${location.city}`}
      />

      <section className="locdetail">
        <div className="locdetail__grid">
          <div className="locdetail__block">
            <span className="eyebrow eyebrow--dark">{t.locations.addressLabel}</span>
            <address>
              {location.street}
              <br />
              {location.zip}
            </address>
            <a className="locdetail__link" href={mapsUrl(location)} target="_blank" rel="noreferrer noopener">
              {t.locations.routeLabel}
            </a>
          </div>

          <div className="locdetail__block">
            <span className="eyebrow eyebrow--dark">{t.locations.phoneLabel}</span>
            <a href={location.phoneHref}>{location.phone}</a>
            <a className="locdetail__link" href={location.whatsapp} target="_blank" rel="noreferrer noopener">
              {t.locations.whatsappLabel}
            </a>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </div>

          <div className="locdetail__block">
            <span className="eyebrow eyebrow--dark">{t.locations.hoursLabel}</span>
            <p>{t.locations.hoursNote}</p>
          </div>

          <div className="locdetail__cta">
            <PillButton href={location.booking} external>
              {t.locations.bookLabel}
            </PillButton>
          </div>
        </div>
      </section>

      {location.hasXLaser && <Technology />}

      <Faq />

      <section className="locgrid locgrid--others">
        <div className="locgrid__head">
          <span className="eyebrow eyebrow--dark">{t.locations.otherTitle}</span>
          <Link href="/standorte" className="locgrid__back">
            {t.locations.backLabel}
          </Link>
        </div>
        <ul className="locgrid__list">
          {others.map((l) => (
            <LocationCard key={l.slug} location={l} />
          ))}
        </ul>
      </section>
    </>
  );
}

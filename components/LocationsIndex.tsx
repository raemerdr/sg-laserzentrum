"use client";

import { COMING_SOON, LOCATIONS } from "@/lib/content";
import { useCopy } from "./LangProvider";
import PageHeader from "./PageHeader";
import LocationCard from "./LocationCard";

export default function LocationsIndex() {
  const t = useCopy();
  return (
    <>
      <PageHeader
        eyebrow={t.locations.eyebrow}
        title={t.locations.title}
        lead={t.locations.intro}
        image="/images/studio.jpg"
        imageAlt={t.numbers.imageAlt}
      />

      <section className="locgrid">
        <ul className="locgrid__list">
          {LOCATIONS.map((l) => (
            <LocationCard key={l.slug} location={l} />
          ))}
        </ul>

        <div className="locgrid__soon">
          <span className="eyebrow eyebrow--dark">{t.locations.comingLabel}</span>
          <p>{COMING_SOON.join(" · ")}</p>
        </div>
      </section>
    </>
  );
}

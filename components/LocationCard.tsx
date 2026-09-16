"use client";

import Link from "next/link";
import ImageSlot from "./ImageSlot";
import { useCopy } from "./LangProvider";
import type { Location } from "@/lib/content";

export default function LocationCard({ location }: { location: Location }) {
  const t = useCopy();
  return (
    <li className="loccard">
      <Link href={`/standorte/${location.slug}`} className="loccard__link">
        <div className="loccard__media">
          <ImageSlot
            src={location.image}
            label={`${t.locations.detailPrefix} ${location.city}`}
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
          />
        </div>
        <div className="loccard__text">
          <h2>{location.city}</h2>
          <address>
            {location.street}
            <br />
            {location.zip}
          </address>
          <span className="loccard__cta">
            {t.locations.bookLabel}
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14.43 5.4a.75.75 0 0 0-1.06 1.06L18.44 11.5H3.5a.75.75 0 0 0 0 1.5h14.94l-5.07 5.04a.75.75 0 1 0 1.06 1.06l6.6-6.57a.75.75 0 0 0 0-1.06l-6.6-6.57Z" />
            </svg>
          </span>
        </div>
      </Link>
    </li>
  );
}

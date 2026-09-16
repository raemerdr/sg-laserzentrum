"use client";

import ImageSlot from "./ImageSlot";

/** Compact hero used by the pages below the home page. */
export default function PageHeader({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="pagehero">
      <div className="pagehero__media">
        <ImageSlot src={image} label={imageAlt} priority sizes="100vw" />
      </div>
      <div className="pagehero__scrim" aria-hidden="true" />
      <div className="pagehero__copy">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {lead && <p>{lead}</p>}
      </div>
    </section>
  );
}

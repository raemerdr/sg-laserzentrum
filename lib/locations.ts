/**
 * Studios. Booking runs through Studiolution; each studio has its own
 * studiobookr.com page (studiobookr is Studiolution's booking front end).
 */

export type TimeRange = { open: string; close: string };

export type OpeningHours = {
  weekdays: TimeRange | null;
  saturday: TimeRange | null;
  sunday: TimeRange | null;
};

/** Usual hours from the client brief. Studios can override them. */
export const DEFAULT_HOURS: OpeningHours = {
  weekdays: { open: "09:00", close: "20:00" },
  saturday: { open: "10:00", close: "18:45" },
  sunday: null,
};

type StudioInput = {
  slug: string;
  city: string;
  street: string;
  zip: string;
  phone: string;
  phoneHref: string;
  whatsapp: string | null;
  booking: string;
  /**
   * Header photo. Generated from the studio's photos on the old site, so it
   * shows the real room; Köln had none and gets a generic SG room for now.
   */
  image: string;
  /** Per-studio hours once the client confirms them. */
  hours?: Partial<OpeningHours>;
};

export const STUDIOS = [
  {
    slug: "frankfurt",
    city: "Frankfurt",
    street: "Grempstraße 10",
    zip: "60487 Frankfurt am Main",
    phone: "0160 6337377",
    phoneHref: "tel:+491606337377",
    whatsapp: "https://wa.me/491606337377",
    booking: "https://www.studiobookr.com/sg-beauty-72869",
    image: "/images/studio-frankfurt.jpg",
  },
  {
    slug: "karlsruhe",
    city: "Karlsruhe",
    street: "Peter-und-Paul-Platz 4",
    zip: "76185 Karlsruhe",
    phone: "01525 5823470",
    phoneHref: "tel:+4915255823470",
    whatsapp: "http://wa.me/message/WJGAUTLGVEXRK1",
    booking: "https://www.studiobookr.com/sg-beauty-71344",
    image: "/images/studio-karlsruhe.jpg",
  },
  {
    slug: "koeln",
    city: "Köln",
    street: "Agrippastraße 6",
    zip: "50676 Köln",
    phone: "0170 9931346",
    phoneHref: "tel:+491709931346",
    whatsapp: null,
    booking: "https://www.studiobookr.com/sg-laserzentrum-koeln-76670",
    image: "/images/studio-koeln.jpg",
  },
  {
    slug: "mainz",
    city: "Mainz",
    street: "An der Fahrt 2A",
    zip: "55124 Mainz",
    phone: "01522 1799094",
    phoneHref: "tel:+4915221799094",
    whatsapp: "http://wa.me/message/KIFZ2RDI7H7YH1",
    booking: "https://www.studiobookr.com/sg-beauty-73325",
    image: "/images/studio-mainz.jpg",
  },
  {
    slug: "mannheim",
    city: "Mannheim",
    street: "Schwetzinger Straße 69",
    zip: "68165 Mannheim",
    phone: "0176 83393934",
    phoneHref: "tel:+4917683393934",
    whatsapp: "http://wa.me/message/YEEFLIC27DFEO1",
    booking: "https://www.studiobookr.com/sinem-gizem-beauty-gbr-71750",
    image: "/images/studio-mannheim.jpg",
  },
  {
    slug: "nuernberg",
    city: "Nürnberg",
    street: "Schönweißstraße 41",
    zip: "90461 Nürnberg",
    phone: "0172 2632858",
    phoneHref: "tel:+491722632858",
    whatsapp: "https://wa.me/491722632858",
    booking: "https://www.studiobookr.com/sg-laserzentrum-nuernberg-74077",
    image: "/images/studio-nuernberg.jpg",
  },
  {
    slug: "stuttgart",
    city: "Stuttgart",
    street: "Heilbronner Straße 93",
    zip: "70191 Stuttgart",
    phone: "0176 30636683",
    phoneHref: "tel:+4917630636683",
    whatsapp: "http://wa.me/message/HVGZUS2BWHG6I1",
    booking: "https://www.studiobookr.com/sg-beauty-stuttgart-73466",
    image: "/images/studio-stuttgart.jpg",
  },
] as const satisfies readonly StudioInput[];

export type Studio = StudioInput & { slug: StudioSlug };
export type StudioSlug = (typeof STUDIOS)[number]["slug"];

/** Announced but not open yet. They get no page and no booking link. */
export const PLANNED_CITIES = ["München"];

export function findStudio(slug: string): Studio | undefined {
  return (STUDIOS as readonly Studio[]).find((s) => s.slug === slug);
}


export function hoursFor(studio: Studio): OpeningHours {
  return { ...DEFAULT_HOURS, ...studio.hours };
}

/** What both Google Maps links search for, so the map pin and the route link agree. */
function mapsQuery(studio: Studio) {
  return `SG Laserzentrum, ${studio.street}, ${studio.zip}`;
}

/** Google Maps search link built from the address, for route planning. */
export function mapsUrl(studio: Studio) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery(studio))}`;
}

/** Keyless Google Maps embed of the same search, in the page language. */
export function mapsEmbedUrl(studio: Studio, lang: string) {
  const params = new URLSearchParams({ q: mapsQuery(studio), hl: lang, z: "16", output: "embed" });
  return `https://maps.google.com/maps?${params}`;
}

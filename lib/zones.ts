import { TREATMENTS, type TreatmentId } from "./services";

/**
 * Treatment-zone landing pages under /haarentfernung/<slug>, one per laser
 * zone of the home page stage. Copy lives in `lib/content.ts` (`zones`).
 */
export const ZONES = [
  { slug: "gesicht", treatment: "gesicht" },
  { slug: "achseln", treatment: "achseln" },
  { slug: "intimbereich", treatment: "bikinizone" },
  { slug: "beine", treatment: "beine" },
] as const satisfies readonly { slug: string; treatment: TreatmentId }[];

export type Zone = (typeof ZONES)[number];
export type ZoneSlug = Zone["slug"];

export function findZone(slug: string): Zone | undefined {
  return ZONES.find((z) => z.slug === slug);
}

export const zonePath = (slug: ZoneSlug) => `/haarentfernung/${slug}`;

/** The zone page for a treatment of the home stage, if it has one. */
export function zoneForTreatment(id: TreatmentId): Zone | undefined {
  return ZONES.find((z) => z.treatment === id);
}

const IMAGES = Object.fromEntries(TREATMENTS.map((t) => [t.id, t.image])) as Record<TreatmentId, string>;

/** Zones reuse the photo of their treatment in the home page stage. */
export const zoneImage = (zone: Zone) => IMAGES[zone.treatment];

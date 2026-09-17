/**
 * Services and the treatment items shown in the home page stage.
 *
 * To launch Aquafacial: set `published: true` below, finish its copy in
 * `lib/content.ts` (`services.aquafacial`, `treatments.items.aquafacial`) and
 * add its price groups per studio in `lib/prices.ts`. The stage, the price
 * lists and the footer pick it up from there.
 */

export const SERVICES = [
  { id: "laser", published: true },
  { id: "aquafacial", published: false },
] as const;

export type ServiceId = (typeof SERVICES)[number]["id"];

export function isPublished(id: ServiceId) {
  return SERVICES.some((s) => s.id === id && s.published);
}

export const PUBLISHED_SERVICES: ServiceId[] = SERVICES.filter((s) => s.published).map((s) => s.id);

/** Order here is the order in the treatments stage. */
export const TREATMENTS = [
  { id: "gesicht", service: "laser", image: "/images/gesicht.jpg" },
  { id: "achseln", service: "laser", image: "/images/achseln.jpg" },
  { id: "bikinizone", service: "laser", image: "/images/bikinizone.jpg" },
  { id: "beine", service: "laser", image: "/images/beine.jpg" },
  { id: "aquafacial", service: "aquafacial", image: "/images/hero.jpg" },
] as const satisfies readonly { id: string; service: ServiceId; image: string }[];

export type TreatmentId = (typeof TREATMENTS)[number]["id"];

export const PUBLISHED_TREATMENTS = TREATMENTS.filter((t) => isPublished(t.service));

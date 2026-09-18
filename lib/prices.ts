import type { StudioSlug } from "./locations";
import type { ServiceId } from "./services";

export type PriceItem = {
  name: string;
  /** Euro amount incl. VAT. */
  price: number;
  /** Renders "ab" before the price. */
  from?: boolean;
  note?: string;
};

export type PriceGroup = { title: string; items: PriceItem[] };

export type StudioPrices = Partial<Record<ServiceId, PriceGroup[]>>;

/**
 * Every studio has its own price list. The client sends them separately;
 * until a studio has entries, its page shows a "Preisliste folgt" note.
 */
export const PRICES: Record<StudioSlug, StudioPrices> = {
  frankfurt: {},
  karlsruhe: {},
  koeln: {},
  mainz: {},
  mannheim: {},
  nuernberg: {},
  stuttgart: {},
};

/**
 * Shown on every studio page, without a label, until that studio's real prices
 * are added. They look real to visitors: replace them before launch.
 */
export const SAMPLE_PRICES: StudioPrices = {
  laser: [
    {
      title: "Gesicht",
      items: [
        { name: "Oberlippe", price: 39 },
        { name: "Kinn", price: 39 },
        { name: "Gesicht komplett", price: 89 },
      ],
    },
    {
      title: "Körper",
      items: [
        { name: "Achseln", price: 49 },
        { name: "Bikinizone", price: 69 },
        { name: "Intimbereich komplett", price: 99 },
        { name: "Unterschenkel", price: 119 },
        { name: "Beine komplett", price: 189 },
      ],
    },
    {
      title: "Pakete",
      items: [
        { name: "Achseln & Bikinizone", price: 99 },
        { name: "Ganzkörper", price: 299, from: true, note: "je nach Umfang" },
      ],
    },
  ],
};

const euro = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatPrice(item: PriceItem) {
  return `${item.from ? "ab " : ""}${euro.format(item.price)}`;
}

export function pricesFor(slug: StudioSlug): StudioPrices {
  return PRICES[slug];
}

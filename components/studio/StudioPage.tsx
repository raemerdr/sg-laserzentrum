"use client";

import { findStudio } from "@/lib/locations";
import { useCopy } from "../LangProvider";
import BookingCta from "../sections/BookingCta";
import Faq from "../sections/Faq";
import Reviews from "../sections/Reviews";
import StudioList from "../sections/StudioList";
import Panel from "../ui/Panel";
import StudioFacts from "./StudioFacts";
import StudioHero from "./StudioHero";

export default function StudioPage({ slug }: { slug: string }) {
  const t = useCopy();
  const studio = findStudio(slug);
  if (!studio) return null;

  return (
    <>
      <StudioHero studio={studio} />
      <Panel>
        <StudioFacts studio={studio} />
        {/* The price list (./PriceList, data in lib/prices.ts) is off until the
            studios send their real prices; add <PriceList studio={studio} /> back here. */}
        <Reviews limit={2} />
        <Faq />
        <StudioList exclude={studio.slug} title={t.studio.others} />
        <BookingCta studio={studio.slug} />
      </Panel>
    </>
  );
}

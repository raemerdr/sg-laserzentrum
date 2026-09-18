"use client";

import { findStudio } from "@/lib/locations";
import { useCopy } from "../LangProvider";
import BookingCta from "../sections/BookingCta";
import Faq from "../sections/Faq";
import Reviews from "../sections/Reviews";
import StudioList from "../sections/StudioList";
import Panel from "../ui/Panel";
import PriceList from "./PriceList";
import StudioFacts from "./StudioFacts";
import StudioHero from "./StudioHero";
import StudioMap from "./StudioMap";

export default function StudioPage({ slug }: { slug: string }) {
  const t = useCopy();
  const studio = findStudio(slug);
  if (!studio) return null;

  return (
    <>
      <StudioHero studio={studio} />
      <Panel>
        <StudioFacts studio={studio} />
        <StudioMap studio={studio} />
        <PriceList studio={studio} />
        <Reviews limit={2} />
        <Faq />
        <StudioList exclude={studio.slug} title={t.studio.others} />
        <BookingCta studio={studio.slug} />
      </Panel>
    </>
  );
}

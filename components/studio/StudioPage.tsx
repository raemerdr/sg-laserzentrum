"use client";

import { findStudio } from "@/lib/locations";
import { useCopy } from "../LangProvider";
import BookingRing from "../sections/BookingRing";
import Faq from "../sections/Faq";
import Reviews from "../sections/Reviews";
import StudioList from "../sections/StudioList";
import Panel from "../ui/Panel";
import PriceList from "./PriceList";
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
        <PriceList studio={studio} />
        <Reviews limit={2} />
        <Faq />
        <StudioList exclude={studio.slug} title={t.studio.others} />
        <BookingRing studio={studio.slug} />
      </Panel>
    </>
  );
}

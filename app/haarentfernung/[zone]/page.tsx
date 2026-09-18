import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import ZonePage from "@/components/zones/ZonePage";
import { studiosByPriority } from "@/lib/locations";
import { ZONES, findZone, type ZoneSlug } from "@/lib/zones";

export function generateStaticParams() {
  return ZONES.map((z) => ({ zone: z.slug }));
}

export const dynamicParams = false;

/** Search titles and descriptions per zone; the public site is German. */
const META: Record<ZoneSlug, { title: string; lead: string }> = {
  gesicht: {
    title: "Haarentfernung Gesicht mit Laser",
    lead: "Laser-Haarentfernung im Gesicht: Oberlippe, Kinn und Wangen, sanft gekühlt.",
  },
  achseln: {
    title: "Haarentfernung Achseln mit Laser",
    lead: "Laser-Haarentfernung an den Achseln: in wenigen Minuten behandelt, ohne Rasurbrand.",
  },
  intimbereich: {
    title: "Haarentfernung Intimbereich mit Laser",
    lead: "Laser-Haarentfernung im Intimbereich: gekühlt, diskret und individuell abgestimmt.",
  },
  beine: {
    title: "Haarentfernung Beine mit Laser",
    lead: "Laser-Haarentfernung an den Beinen: große Flächen zügig und präzise behandelt.",
  },
};

/** "A, B und C" */
function listDe(items: string[]) {
  return items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} und ${items.at(-1)}`;
}

export async function generateMetadata({ params }: PageProps<"/haarentfernung/[zone]">): Promise<Metadata> {
  const { zone: slug } = await params;
  const zone = findZone(slug);
  if (!zone) return {};
  const meta = META[zone.slug];
  return {
    title: meta.title,
    description: `${meta.lead} In ${listDe(studiosByPriority().map((s) => s.city))}.`,
    alternates: { canonical: `/haarentfernung/${zone.slug}` },
  };
}

export default async function Page({ params }: PageProps<"/haarentfernung/[zone]">) {
  const { zone: slug } = await params;
  const zone = findZone(slug);
  if (!zone) notFound();

  return (
    <div className="page">
      <main id="inhalt">
        <ZonePage slug={zone.slug} />
      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCATIONS, findLocation } from "@/lib/content";
import LocationDetail from "@/components/LocationDetail";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/standorte/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const location = findLocation(slug);
  if (!location) return {};
  return {
    title: `Dauerhafte Haarentfernung ${location.city} | SG Laserzentrum`,
    description: `SG Laserzentrum ${location.city}, ${location.street}, ${location.zip}. Dauerhafte Haarentfernung mit dem SG XLaser Pro. Jetzt online Termin buchen.`,
  };
}

export default async function LocationPage({ params }: PageProps<"/standorte/[slug]">) {
  const { slug } = await params;
  const location = findLocation(slug);
  if (!location) notFound();

  return (
    <main className="site">
      <LocationDetail location={location} />
      <Footer />
    </main>
  );
}

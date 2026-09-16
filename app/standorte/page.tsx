import type { Metadata } from "next";
import LocationsIndex from "@/components/LocationsIndex";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Standorte | SG Laserzentrum",
  description:
    "SG Laserzentrum in Mainz, Karlsruhe, Mannheim, Stuttgart, Frankfurt und Nürnberg. Adressen, Kontakt und Online-Terminbuchung für jedes Studio.",
};

export default function StandortePage() {
  return (
    <main className="site">
      <LocationsIndex />
      <Footer />
    </main>
  );
}

import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import StudiosIndex from "@/components/studio/StudiosIndex";
import { STUDIOS } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Standorte",
  description: `SG Laserzentrum in ${STUDIOS.map((s) => s.city).join(", ")}. Adressen, Öffnungszeiten, Preise und Online-Terminbuchung für jedes Studio.`,
  alternates: { canonical: "/standorte" },
};

export default function Page() {
  return (
    <div className="page">
      <main id="inhalt">
        <StudiosIndex />
      </main>
      <Footer />
    </div>
  );
}

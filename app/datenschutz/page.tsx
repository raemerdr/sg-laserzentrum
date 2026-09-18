import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Privacy from "@/components/pages/Privacy";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Datenschutzerklärung von SG Laserzentrum: welche Daten wir beim Besuch der Website, bei Kontakt und Online-Buchung verarbeiten und welche Rechte Sie haben.",
  alternates: { canonical: "/datenschutz" },
};

export default function Page() {
  return (
    <div className="page">
      <main id="inhalt">
        <Privacy />
      </main>
      <Footer />
    </div>
  );
}

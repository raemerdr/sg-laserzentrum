import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Privacy from "@/components/pages/Privacy";

export const metadata: Metadata = {
  title: "Datenschutz",
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

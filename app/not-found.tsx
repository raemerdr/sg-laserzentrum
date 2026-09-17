import Footer from "@/components/layout/Footer";
import NotFound from "@/components/pages/NotFound";

export default function Page() {
  return (
    <div className="page">
      <main id="inhalt">
        <NotFound />
      </main>
      <Footer />
    </div>
  );
}

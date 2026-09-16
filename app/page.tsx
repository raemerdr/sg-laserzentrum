import Hero from "@/components/Hero";
import About from "@/components/About";
import Treatments from "@/components/Treatments";
import Statement from "@/components/Statement";
import Proof from "@/components/Proof";
import Technology from "@/components/Technology";
import Reviews from "@/components/Reviews";
import Numbers from "@/components/Numbers";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="site">
      <Hero />
      <About />
      <Treatments />
      <Statement />
      <Proof />
      <Technology />
      <Reviews />
      <Numbers />
      <Faq />
      <Footer />
    </main>
  );
}

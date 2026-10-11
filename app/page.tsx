
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Prices from "@/components/Prices";
import Calculator from "@/components/Calculator";
import Checklist from "@/components/Checklist";
import Keys from "@/components/Keys";
import Services from "@/components/Services";
import Cabin from "@/components/Cabin";
import Allergy from "@/components/Allergy";
import Process from "@/components/Process";
import About from "@/components/About";
import Coverage from "@/components/Coverage";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { Hairline, PhraseStrip, Statement, ZigEdge } from "@/components/Interstitials";

export default function Home() {
  return (
    <>
      <Header />
      <div className="pb-14 md:pb-0">
        <main>
          <Hero />
          <Prices />
          <Hairline />
          <Calculator />
          <Checklist />
          <Keys />
          <Services />
          <Cabin />
          <PhraseStrip />
          <Allergy />
          <Process />
          <Statement />
          <About />
          <Coverage />
          <ZigEdge />
          <Faq />
          <Contact />
        </main>
        <Footer />
      </div>
      <BottomNav />
    </>
  );
}

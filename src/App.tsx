import PromoBar from "./components/PromoBar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Quiz from "./components/Quiz";
import ForWhom from "./components/ForWhom";
import WhyPoland from "./components/WhyPoland";
import AdmissionPaths from "./components/AdmissionPaths";
import Specialties from "./components/Specialties";
import Process from "./components/Process";
import Cases from "./components/Cases";
import Pricing from "./components/Pricing";
import ParentPeace from "./components/ParentPeace";
import Trust from "./components/Trust";
import FAQ from "./components/FAQ";
import FinalForm from "./components/FinalForm";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";
import MobileStickyCTA from "./components/MobileStickyCTA";

export default function App() {
  return (
    <>
      <PromoBar />
      <Header />
      <main>
        <Hero />
        <Quiz />
        <ForWhom />
        <WhyPoland />
        <AdmissionPaths />
        <Specialties />
        <Process />
        <Cases />
        <Pricing />
        <ParentPeace />
        <Trust />
        <FAQ />
        <FinalForm />
      </main>
      <Footer />
      <FloatingContact />
      <MobileStickyCTA />
    </>
  );
}

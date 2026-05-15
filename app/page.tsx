import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Problem from "@/components/home/Problem";
import SystemSection from "@/components/home/SystemSection";
import Benefits from "@/components/home/Benefits";
import Logos from "@/components/home/Logos";
import Testimonials from "@/components/home/Testimonials";
import ScaleCTA from "@/components/home/ScaleCTA";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <SystemSection />
        <Benefits />
        <Logos />
        <Testimonials />
        <ScaleCTA />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

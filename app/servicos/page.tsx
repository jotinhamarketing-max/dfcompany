import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ServicosHero, PillarPackages, ServicesGrid, ProcessTimeline, ServicosCTA } from "@/components/servicos";

export const metadata: Metadata = {
  title: "Serviços — DF COMPANY",
  description: "Um sistema completo de aquisição de clientes: tráfego pago, landing pages, CRM, automação e estratégia comercial.",
};

export default function Servicos() {
  return (
    <>
      <Navbar />
      <main>
        <ServicosHero />
        <PillarPackages />
        <ServicesGrid />
        <ProcessTimeline />
        <ServicosCTA />
      </main>
      <Footer />
    </>
  );
}

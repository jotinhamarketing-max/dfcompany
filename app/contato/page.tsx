import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ContatoLayout, ContatoFAQ } from "@/components/contato";

export const metadata: Metadata = {
  title: "Contato — DF COMPANY",
  description: "Agende seu diagnóstico estratégico gratuito. Fale diretamente com o time DF COMPANY.",
};

export default function Contato() {
  return (
    <>
      <Navbar />
      <main>
        <ContatoLayout />
        <ContatoFAQ />
      </main>
      <Footer />
    </>
  );
}

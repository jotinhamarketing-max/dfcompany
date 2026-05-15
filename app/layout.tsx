import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DF COMPANY — Tráfego pago estratégico que vira venda",
  description: "Transformamos tráfego em vendas previsíveis. Tráfego pago, automação, CRM e estratégia comercial para empresas que querem crescer de verdade.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

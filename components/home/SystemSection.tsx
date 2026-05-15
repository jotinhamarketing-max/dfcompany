"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BgGlow, IconTile, SVC_ICONS } from "../ui";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { label: "Meta Ads", icon: "meta" }, { label: "Google Ads", icon: "google" },
  { label: "TikTok Ads", icon: "tiktok" }, { label: "LinkedIn Ads", icon: "linkedin" },
  { label: "Landing Pages", icon: "page" }, { label: "Web Design", icon: "web" },
  { label: "CRM", icon: "crm" }, { label: "Automação com IA", icon: "ai" },
  { label: "Relatórios semanais", icon: "report" }, { label: "Estratégia comercial", icon: "strategy" },
];

function ServiceChip({ label, icon }: { label: string; icon: string }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      display: "flex", alignItems: "center", gap: 12, padding: "14px 14px",
      background: hover ? "var(--surface-hover)" : "var(--surface)",
      border: `1px solid ${hover ? "rgba(255,0,0,0.25)" : "rgba(255,255,255,0.05)"}`,
      borderRadius: 12, transition: "all var(--dur-fast) var(--ease-out)", cursor: "default",
    }}>
      <IconTile size={36} radius={8}>{SVC_ICONS[icon]}</IconTile>
      <span style={{ color: "var(--fg)", fontSize: 14.5, fontWeight: 500 }}>{label}</span>
    </div>
  );
}

function BigStat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ padding: "16px 18px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, background: "var(--surface)" }}>
      <div style={{ color: "var(--accent)", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, letterSpacing: "-0.02em" }}>+ {value}</div>
      <div style={{ color: "var(--fg-muted)", fontSize: 13, marginTop: 4 }}>{label}</div>
    </div>
  );
}

export default function SystemSection() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".system-left", { x: -50, opacity: 0 }, {
      x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 75%", once: true },
    });
    gsap.fromTo(".system-chip", { scale: 0.8, opacity: 0 }, {
      scale: 1, opacity: 1, stagger: { amount: 0.6, from: "start" }, duration: 0.4, ease: "back.out(1.4)",
      scrollTrigger: { trigger: ".system-grid", start: "top 80%", once: true },
    });
  }, { scope: container });

  return (
    <section ref={container} className="section" style={{ background: "var(--bg)" }}>
      <BgGlow variant="edge" opacity={0.6} />
      <div className="container" style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 64, alignItems: "center" }} className="stack-md">

          <div className="system-left">
            <div className="cm-eyebrow">O Sistema</div>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg)",
              fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.02em",
              margin: "0 0 20px", textTransform: "uppercase",
            }}>
              Um sistema completo para{" "}
              <span className="cm-emph" style={{ color: "var(--accent)" }}>gerar clientes</span> todos os dias.
            </h2>
            <p style={{ fontSize: 17, margin: "0 0 14px", color: "var(--fg-2)", lineHeight: 1.6 }}>
              Aqui você não contrata apenas tráfego pago. Você entra em uma estrutura completa pensada para gerar vendas.
            </p>
            <p style={{ fontSize: 17, margin: "0 0 28px", color: "var(--fg-2)", lineHeight: 1.6 }}>
              João Vitor lidera um time focado em performance, suporte próximo e crescimento real.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
              <BigStat value="5+" label="anos no mercado" />
              <BigStat value="R$ 10M" label="em vendas geradas" />
              <BigStat value="3+ anos" label="clientes ativos" />
            </div>
            <p style={{ fontSize: 16, color: "var(--fg-1)", borderLeft: "2px solid var(--accent)", paddingLeft: 16, margin: 0, fontStyle: "italic", lineHeight: 1.6 }}>
              Porque resultado não vem só do anúncio. Vem da estratégia completa.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{
              position: "relative", borderRadius: 24, padding: 28,
              background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))",
              border: "1px solid rgba(255,255,255,0.06)", boxShadow: "var(--shadow-card)",
            }}>
              <span aria-hidden style={{ position: "absolute", inset: "0 0 auto 0", height: 1, background: "var(--card-horn)", borderRadius: "24px 24px 0 0" }} />
              <div className="system-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                {SERVICES.map((s) => <div key={s.label} className="system-chip"><ServiceChip {...s} /></div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

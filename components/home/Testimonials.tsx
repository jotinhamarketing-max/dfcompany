"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BgGlow, Card } from "../ui";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { quote: "Hoje tenho previsibilidade nas vendas.", who: "Marina Souza", role: "CEO · Clínica Vértice" },
  { quote: "O suporte deles faz toda diferença.", who: "Bruno Almeida", role: "Diretor · Rocha & Co" },
  { quote: "Finalmente encontrei uma equipe que entende meu negócio.", who: "Renato Costa", role: "Founder · Orbital" },
  { quote: "O tráfego começou a gerar clientes de verdade.", who: "Camila Lima", role: "Sócia · Studio 9" },
];

function Stars() {
  return (
    <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
      {[0,1,2,3,4].map((s) => (
        <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="var(--gold-500)">
          <path d="M12 2l3 7 7 .5-5.5 5 1.5 7-6-3.5-6 3.5L8 14.5 2.5 9.5 9.5 9z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".test-left", { x: -50, opacity: 0 }, {
      x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 75%", once: true },
    });
    gsap.fromTo(".test-card", { y: 50, opacity: 0, scale: 0.96 }, {
      y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.6, ease: "power3.out",
      scrollTrigger: { trigger: ".test-grid", start: "top 80%", once: true },
    });
  }, { scope: container });

  return (
    <section ref={container} className="section" style={{ background: "var(--bg-alt)" }}>
      <BgGlow variant="corner" opacity={0.55} />
      <div className="container" style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64, alignItems: "start" }} className="stack-md">
          <div className="test-left">
            <div className="cm-eyebrow">Depoimentos</div>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg)",
              fontSize: "clamp(28px, 3.6vw, 44px)", lineHeight: 1.05, letterSpacing: "-0.02em",
              margin: "0 0 20px", textTransform: "uppercase",
            }}>
              Resultados constroem{" "}
              <span className="cm-emph" style={{ color: "var(--accent)" }}>parcerias duradouras</span>
            </h2>
            <p style={{ fontSize: 16, marginBottom: 10, color: "var(--fg-2)", lineHeight: 1.6 }}>Nosso foco não é contratos rápidos.</p>
            <p style={{ fontSize: 16, color: "#fff", fontWeight: 600, lineHeight: 1.6 }}>É construir crescimento de longo prazo para cada cliente.</p>
          </div>

          <div className="test-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }} >
            {ITEMS.map((t, i) => (
              <div key={i} className="test-card">
                <Card padding={28} horn hover style={{ height: "100%" }}>
                  <Stars />
                  <p style={{ color: "var(--fg-1)", fontSize: 17, fontStyle: "italic", margin: "0 0 18px", lineHeight: 1.45 }}>"{t.quote}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <span style={{
                      width: 36, height: 36, borderRadius: 999,
                      background: `linear-gradient(135deg, hsl(${i*40+10} 40% 30%), #1a0a0a)`,
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontWeight: 700, fontSize: 14,
                    }}>{t.who.charAt(0)}</span>
                    <div style={{ lineHeight: 1.2 }}>
                      <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>{t.who}</div>
                      <div style={{ color: "var(--fg-muted)", fontSize: 12 }}>{t.role}</div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

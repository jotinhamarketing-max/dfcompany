"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BgGlow, Card } from "../ui";

gsap.registerPlugin(ScrollTrigger);

const QUOTES = [
  "Já investi em tráfego e não tive retorno.",
  "As agências prometem muito e entregam pouco.",
  "Preciso de clientes qualificados, não só curtidas.",
];

export default function Problem() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".problem-title", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: ".problem-title", start: "top 85%", once: true },
    });
    gsap.fromTo(".problem-card", { y: 50, opacity: 0, scale: 0.96 }, {
      y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: ".problem-cards", start: "top 80%", once: true },
    });
    gsap.fromTo(".problem-footer", { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: ".problem-footer", start: "top 85%", once: true },
    });
  }, { scope: container });

  return (
    <section ref={container} className="section" style={{ background: "var(--bg-alt)" }}>
      <BgGlow variant="corner" opacity={0.5} />
      <div className="container" style={{ position: "relative" }}>
        <div className="problem-title" style={{ maxWidth: 880, marginInline: "auto", textAlign: "center" }}>
          <div className="cm-eyebrow">O Problema</div>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg)",
            fontSize: "clamp(32px, 4.4vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.02em",
            margin: 0, textTransform: "uppercase",
          }}>
            Sua empresa não precisa de mais marketing.{" "}
            <span className="cm-emph" style={{ color: "var(--accent)" }}>Precisa de mais vendas.</span>
          </h2>
          <p style={{ marginTop: 24, fontSize: 17, maxWidth: 680, marginInline: "auto", color: "var(--fg-2)", lineHeight: 1.6 }}>
            Muitos empresários já investiram em marketing e saíram frustrados.
          </p>
        </div>

        <div className="problem-cards" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 56 }} >
          {QUOTES.map((q, i) => (
            <div key={i} className="problem-card">
              <Card padding={28} hover horn>
                <div style={{ color: "var(--accent)", fontFamily: "var(--font-display)", fontSize: 48, lineHeight: 1, marginBottom: 8 }}>"</div>
                <p style={{ color: "var(--fg-1)", fontSize: 17, fontStyle: "italic", margin: 0, lineHeight: 1.45 }}>{q}</p>
              </Card>
            </div>
          ))}
        </div>

        <div className="problem-footer" style={{ marginTop: 56, maxWidth: 820, marginInline: "auto", textAlign: "center" }}>
          <p style={{ fontSize: 17, color: "var(--fg-2)", lineHeight: 1.6 }}>
            Enquanto isso, o dinheiro continua sendo gasto sem previsibilidade. Sem estratégia, sem acompanhamento e sem alguém realmente comprometido com o crescimento da empresa.
          </p>
          <p style={{ fontSize: 19, color: "#fff", marginTop: 24, fontWeight: 600 }}>
            É exatamente aqui que a <span style={{ color: "var(--accent)" }}>DF COMPANY</span> entra.
          </p>
        </div>
      </div>
    </section>
  );
}

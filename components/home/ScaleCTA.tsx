"use client";
import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BgGlow, PrimaryButton, GhostButton } from "../ui";

gsap.registerPlugin(ScrollTrigger);

export default function ScaleCTA() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".scale-left", { x: -60, opacity: 0 }, {
      x: 0, opacity: 1, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 75%", once: true },
    });
    gsap.fromTo(".scale-right", {
      clipPath: "inset(0 100% 0 0)", opacity: 0,
    }, {
      clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1.1, ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 75%", once: true },
    });
  }, { scope: container });

  return (
    <section ref={container} className="section" style={{ background: "var(--bg)", padding: "120px 0" }}>
      <BgGlow variant="edge" opacity={0.85} />
      <div className="container" style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 64, alignItems: "center" }} className="stack-md">
          <div className="scale-left">
            <div className="cm-eyebrow">A próxima</div>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg)",
              fontSize: "clamp(34px, 4.6vw, 60px)", lineHeight: 1.05, letterSpacing: "-0.02em",
              margin: "0 0 22px", textTransform: "uppercase",
            }}>
              Sua empresa pode ser{" "}
              <span className="cm-emph" style={{ color: "var(--accent)" }}>a próxima a escalar.</span>
            </h2>
            <p style={{ fontSize: 17, marginBottom: 14, maxWidth: 540, color: "var(--fg-2)", lineHeight: 1.6 }}>
              Enquanto muitos continuam testando estratégias aleatórias, seus concorrentes já estão investindo em aquisição previsível de clientes.
            </p>
            <p style={{ fontSize: 17, marginBottom: 32, maxWidth: 540, color: "#fff", lineHeight: 1.6 }}>
              Quanto mais cedo sua estrutura estiver pronta, mais rápido sua empresa cresce.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 18 }}>
              <PrimaryButton size="lg" href="/contato">AGENDAR REUNIÃO ESTRATÉGICA</PrimaryButton>
              <GhostButton size="lg" href="https://wa.me/5511999999999">Chamar no WhatsApp</GhostButton>
            </div>
            <p style={{ color: "var(--fg-muted)", fontSize: 14, margin: 0 }}>
              Diagnóstico personalizado com o time DF COMPANY.
            </p>
          </div>

          <div className="scale-right" style={{ position: "relative" }}>
            <div style={{
              position: "relative", borderRadius: 24, overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
              aspectRatio: "4 / 5",
            }}>
              <Image src="/assets/joao-arms.jpg" alt="João Vitor"
                fill style={{ objectFit: "cover", objectPosition: "center top", filter: "saturate(0.85) contrast(1.05)" }} />
              <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7) 100%), linear-gradient(225deg, rgba(255,0,0,0.18), transparent 55%)" }} />
              <div style={{ position: "absolute", left: 22, right: 22, bottom: 22, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div className="cm-eyebrow" style={{ marginBottom: 6 }}>P R O N T O</div>
                  <div style={{ color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22 }}>Vamos crescer juntos?</div>
                </div>
                <span style={{ width: 44, height: 44, borderRadius: 12, background: "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-flame)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 7L7 17"/><path d="M17 17H7V7"/></svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

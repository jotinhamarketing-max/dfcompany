"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrimaryButton } from "../ui";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: container.current, start: "top 75%", once: true },
    });
    tl.fromTo(".fcta-eyebrow", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" })
      .fromTo(".fcta-word", { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.7, ease: "power3.out" }, "-=0.2")
      .fromTo(".fcta-btn", { y: 20, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)" }, "-=0.2");

    /* Pulse glow */
    gsap.to(".fcta-glow", {
      opacity: 0.35, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut",
    });
  }, { scope: container });

  const words = ["Pronto para transformar", "marketing em"];
  const emphWords = ["vendas?"];

  return (
    <section ref={container} className="section" style={{ background: "var(--bg)", padding: "100px 0", overflow: "hidden", position: "relative" }}>
      <div className="fcta-glow" aria-hidden style={{
        position: "absolute", inset: 0, opacity: 0.18,
        background: "radial-gradient(ellipse at center, rgba(255,0,0,0.5), transparent 60%)",
      }} />
      <div className="container" style={{ position: "relative", textAlign: "center" }}>
        <div style={{ maxWidth: 880, marginInline: "auto" }}>
          <div className="fcta-eyebrow cm-eyebrow" style={{ marginBottom: 18 }}>Última chamada</div>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg)",
            fontSize: "clamp(36px, 5.6vw, 72px)", lineHeight: 1.05, letterSpacing: "-0.02em",
            margin: "0 0 32px", textTransform: "uppercase",
          }}>
            {"Pronto para transformar marketing em ".split(" ").map((w, i) => (
              <span key={i} className="fcta-word" style={{ display: "inline-block", marginRight: "0.22em" }}>{w}</span>
            ))}
            <span className="fcta-word cm-emph" style={{ display: "inline-block", color: "var(--accent)" }}>vendas?</span>
          </h2>
          <div className="fcta-btn" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12 }}>
            <PrimaryButton size="lg" href="/contato">AGENDAR DIAGNÓSTICO AGORA</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

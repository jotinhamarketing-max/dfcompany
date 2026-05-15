"use client";
import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { BgGlow, PrimaryButton, GhostButton, StatPill } from "../ui";

function FloatChip({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  return (
    <div style={{
      position: "absolute", display: "flex", alignItems: "center", gap: 12,
      padding: "10px 14px",
      background: "rgba(20,20,22,0.88)",
      backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
      border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14,
      boxShadow: "var(--shadow-pop)", ...style,
    }} className={className}>{children}</div>
  );
}

export default function Hero() {
  const container = useRef<HTMLElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(".hero-chip", { y: 20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.5 })
      .fromTo(".hero-h1 .word", { y: 60, opacity: 0, rotateX: -20 }, { y: 0, opacity: 1, rotateX: 0, stagger: 0.06, duration: 0.7 }, "-=0.2")
      .fromTo(".hero-lead", { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.5 }, "-=0.3")
      .fromTo(".hero-btns", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2")
      .fromTo(".hero-stats > *", { y: 16, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.4 }, "-=0.2")
      .fromTo(".hero-portrait", { scale: 1.05, opacity: 0, clipPath: "inset(0 0 100% 0)" }, { scale: 1, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1, ease: "power2.out" }, 0.2)
      .fromTo(".hero-float-chip", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.15, duration: 0.5, ease: "back.out(1.7)" }, "-=0.5");

    /* Floating animations for chips */
    gsap.to(".chip-roi",   { y: -8, duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0 });
    gsap.to(".chip-lead",  { y: -6, duration: 2.1, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.6 });
    gsap.to(".chip-sales", { y: -5, duration: 1.9, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.2 });
  }, { scope: container });

  return (
    <section ref={container} style={{ position: "relative", overflow: "hidden", background: "var(--bg)" }}>
      <BgGlow variant="edge" opacity={0.85} />
      <div aria-hidden className="grid-bg" style={{
        position: "absolute", inset: 0, opacity: 0.5,
        maskImage: "radial-gradient(ellipse at center, #000, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, #000, transparent 75%)",
      }} />

      <div className="container" style={{ position: "relative", paddingTop: 64, paddingBottom: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 56, alignItems: "center" }} className="stack-md">

          {/* LEFT — copy */}
          <div>
            <span className="chip hero-chip" style={{ marginBottom: 24, display: "inline-flex" }}>
              <span className="dot" /> Tráfego pago estratégico · Florianópolis
            </span>

            <h1 className="hero-h1" style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "clamp(40px, 5.4vw, 72px)", lineHeight: 1.02,
              letterSpacing: "-0.025em", margin: "0 0 22px",
              textTransform: "uppercase", color: "var(--fg)",
              perspective: "800px",
            }}>
              {["Aumente", "suas"].map((w, i) => <span key={i} className="word" style={{ display: "inline-block", marginRight: "0.25em" }}>{w}</span>)}
              <span className="word cm-emph" style={{ display: "inline-block", color: "var(--accent)", marginRight: "0.25em" }}>vendas</span>
              {["com", "tráfego", "pago"].map((w, i) => <span key={i} className="word" style={{ display: "inline-block", marginRight: "0.25em" }}>{w}</span>)}
              <span className="word" style={{ display: "inline-block", fontWeight: 800 }}>estratégico</span>
            </h1>

            <p className="hero-lead" style={{ maxWidth: 520, margin: "0 0 8px", fontSize: 19, color: "var(--fg-2)", fontFamily: "var(--font-body)", lineHeight: 1.5 }}>
              Você não precisa de mais curtidas.
            </p>
            <p className="hero-lead" style={{ maxWidth: 520, margin: "0 0 28px", fontSize: 19, color: "var(--fg)", fontFamily: "var(--font-body)", fontWeight: 700, lineHeight: 1.5 }}>
              Precisa de clientes prontos para comprar.
            </p>
            <p className="hero-lead" style={{ maxWidth: 520, margin: "0 0 36px", fontSize: 16, color: "var(--fg-2)", fontFamily: "var(--font-body)", lineHeight: 1.6 }}>
              João Vitor e seu time criam estratégias de tráfego, automação e conversão para transformar anúncios em{" "}
              <span style={{ color: "var(--fg)" }}>crescimento previsível</span> para sua empresa.
            </p>

            <div className="hero-btns" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 36 }}>
              <PrimaryButton size="lg" href="/contato">AGENDAR DIAGNÓSTICO ESTRATÉGICO</PrimaryButton>
              <GhostButton size="lg" href="https://wa.me/5511999999999">
                <svg width="14" height="14" viewBox="0 0 32 32" fill="#25d366">
                  <path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.5L3 29l6.7-1.7c1.9 1 4 1.6 6.3 1.6 7.2 0 13-5.8 13-13S23.2 3 16 3z"/>
                </svg>
                Falar no WhatsApp
              </GhostButton>
            </div>

            <div className="hero-stats" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <StatPill value="5 anos" label="no mercado" />
              <StatPill value="R$ 10M" label="em vendas geradas" />
              <StatPill value="3+ anos" label="clientes ativos" />
            </div>
          </div>

          {/* RIGHT — portrait */}
          <div ref={chipsRef} style={{ position: "relative", minHeight: 600 }}>
            <div aria-hidden style={{
              position: "absolute", inset: "5% -10% 0 10%",
              background: "radial-gradient(ellipse at center, rgba(255,0,0,0.35), transparent 60%)",
              filter: "blur(40px)",
            }} />

            <div className="hero-portrait" style={{
              position: "absolute", inset: "0 0 0 8%",
              borderRadius: 24, overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
            }}>
              <Image src="/assets/joao-portrait.jpg" alt="João Vitor — Founder DF Company"
                fill style={{ objectFit: "cover", objectPosition: "center top", filter: "saturate(0.85) contrast(1.05)" }} priority />
              <div aria-hidden style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%), linear-gradient(45deg, rgba(255,0,0,0.18), transparent 50%)",
              }} />
              <div style={{ position: "absolute", left: 22, right: 22, bottom: 22, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div className="cm-eyebrow" style={{ marginBottom: 6 }}>F O U N D E R</div>
                  <div style={{ color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, letterSpacing: "-0.01em" }}>João Vitor</div>
                  <div style={{ color: "var(--fg-muted)", fontSize: 13 }}>CEO · DF COMPANY</div>
                </div>
              </div>
            </div>

            {/* Lead chip */}
            <FloatChip className="hero-float-chip chip-lead" style={{ left: -20, bottom: 110 }}>
              <span style={{ width: 38, height: 38, borderRadius: 999, background: "#25d366", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M3.5 20.5L5 16a9 9 0 1 1 3.2 3.2L3.5 20.5z"/></svg>
              </span>
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
                <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Novo lead qualificado</span>
                <span style={{ color: "var(--fg-muted)", fontSize: 11 }}>quer fechar orçamento · 19:42</span>
              </div>
              <span style={{ marginLeft: 6, width: 8, height: 8, borderRadius: 999, background: "var(--accent)", boxShadow: "0 0 12px var(--accent)" }} />
            </FloatChip>

            {/* Sales chip */}
            <FloatChip className="hero-float-chip chip-sales" style={{ right: 16, bottom: 30, padding: "14px 16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ color: "var(--fg-muted)", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase" }}>Vendas (7d)</span>
                <span style={{ color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}>R$ 184.230</span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="50" height="14" viewBox="0 0 50 14" fill="none">
                    <polyline points="0,12 8,10 14,8 22,6 30,7 38,3 48,1" stroke="var(--accent)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ color: "#2fb46a", fontSize: 11, fontWeight: 600 }}>+38%</span>
                </div>
              </div>
            </FloatChip>
          </div>
        </div>
      </div>
    </section>
  );
}

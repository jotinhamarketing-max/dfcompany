"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BgGlow, Card, PrimaryButton, GhostButton } from "../ui";

gsap.registerPlugin(ScrollTrigger);

/* ── Hero ─────────────────────────────────────────────────── */
function HeroMetric({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ padding: "22px 22px", background: "var(--surface)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, position: "relative", overflow: "hidden" }}>
      <span aria-hidden style={{ position: "absolute", inset: "0 0 auto 0", height: 1, background: "var(--card-horn)" }} />
      <div style={{ color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 30, letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</div>
      <div style={{ color: "var(--fg-muted)", fontSize: 12.5, marginTop: 8, letterSpacing: "0.04em" }}>{label}</div>
    </div>
  );
}

export function CasesHero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".ch-left", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9 })
      .fromTo(".ch-metric", { y: 30, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.5, ease: "back.out(1.4)" }, "-=0.5");
  }, { scope: container });

  return (
    <section ref={container} style={{ position: "relative", background: "var(--bg)", overflow: "hidden", padding: "96px 0 60px" }}>
      <BgGlow variant="edge" opacity={0.85} />
      <div className="container" style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 56, alignItems: "end" }} className="stack-md">
          <div className="ch-left">
            <span className="chip" style={{ marginBottom: 24, display: "inline-flex" }}>
              <span className="dot" /> Resultados reais · DF COMPANY
            </span>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 1, letterSpacing: "-0.025em", margin: "0 0 22px", textTransform: "uppercase", color: "var(--fg)" }}>
              Cases que provam que <span className="cm-emph" style={{ color: "var(--accent)" }}>tráfego vira venda</span>
            </h1>
            <p style={{ maxWidth: 560, fontSize: 18, color: "var(--fg-2)", lineHeight: 1.6 }}>
              Não vendemos promessa. Vendemos resultado. Veja números reais de empresas que escalaram com a DF COMPANY.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[["R$ 10M+", "em vendas geradas"], ["487%", "ROAS médio dos cases"], ["42", "empresas escaladas"], ["3+ anos", "parcerias ativas"]].map(([v, l]) => (
              <div key={l} className="ch-metric"><HeroMetric value={v} label={l} /></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Featured Case ────────────────────────────────────────── */
function SmallMetric({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ padding: "14px 14px", background: "var(--bg-alt)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12 }}>
      <div style={{ color: "var(--accent)", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}>{value}</div>
      <div style={{ color: "var(--fg-muted)", fontSize: 12, marginTop: 4 }}>{label}</div>
    </div>
  );
}

export function FeaturedCase() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".fc-card", { y: 50, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: container.current, start: "top 80%", once: true } });
    gsap.fromTo(".fc-chart-line", { strokeDashoffset: 800 }, { strokeDashoffset: 0, duration: 2, ease: "power2.out", scrollTrigger: { trigger: ".fc-card", start: "top 75%", once: true } });
  }, { scope: container });

  return (
    <section ref={container} className="section" style={{ background: "var(--bg)", paddingTop: 48 }}>
      <div className="container">
        <div className="fc-card">
          <Card padding={0} radius={24} style={{ overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", minHeight: 480 }} className="stack-md">
              <div style={{ position: "relative", background: "linear-gradient(135deg, #1a1414 0%, #2a0a0a 50%, #131314 100%)", padding: "44px 44px", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" }}>
                <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 30%, rgba(255,0,0,0.28), transparent 60%)" }} />
                <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div className="cm-eyebrow" style={{ marginBottom: 8 }}>C A S E   E M   D E S T A Q U E</div>
                    <div style={{ color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 32, letterSpacing: "-0.02em" }}>Clínica Vértice</div>
                    <div style={{ color: "var(--fg-muted)", fontSize: 14, marginTop: 4 }}>Saúde · Estética · São Paulo</div>
                  </div>
                  <span className="chip" style={{ background: "var(--accent)", color: "#fff", border: "none" }}>Ativa há 2 anos</span>
                </div>
                <div style={{ position: "relative", marginTop: 32 }}>
                  <svg viewBox="0 0 280 100" preserveAspectRatio="none" style={{ width: "100%", height: 140 }}>
                    <defs>
                      <linearGradient id="caseFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(255,0,0,0.5)"/>
                        <stop offset="100%" stopColor="rgba(255,0,0,0)"/>
                      </linearGradient>
                    </defs>
                    <path d="M0 88 L30 84 L60 76 L90 70 L120 56 L150 48 L180 36 L210 28 L240 14 L280 6 L280 100 L0 100 Z" fill="url(#caseFill)"/>
                    <path className="fc-chart-line" d="M0 88 L30 84 L60 76 L90 70 L120 56 L150 48 L180 36 L210 28 L240 14 L280 6" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="800" strokeDashoffset="800"/>
                  </svg>
                </div>
                <div style={{ position: "relative", display: "flex", justifyContent: "space-between", color: "var(--fg-muted)", fontSize: 12, marginTop: 8, letterSpacing: "0.06em" }}>
                  <span>MÊS 1</span><span>MÊS 6</span><span>MÊS 12</span><span>MÊS 18</span><span>MÊS 24</span>
                </div>
              </div>
              <div style={{ padding: "44px 44px", display: "flex", flexDirection: "column", gap: 22 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--fg)", margin: 0, fontSize: 26, textTransform: "uppercase", lineHeight: 1.15 }}>
                  De R$ 80 mil para <span style={{ color: "var(--accent)" }} className="cm-emph">R$ 528 mil</span> de faturamento mensal.
                </h3>
                <p style={{ margin: 0, fontSize: 15, color: "var(--fg-2)", lineHeight: 1.6 }}>
                  Reestruturação completa: tráfego pago multicanal, landing pages otimizadas, CRM e automação no WhatsApp. Em 18 meses, escalamos previsibilidade — sem aumentar headcount.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 4 }}>
                  <SmallMetric value="660%" label="ROAS médio" />
                  <SmallMetric value="6,5x" label="faturamento" />
                  <SmallMetric value="-58%" label="custo / lead" />
                </div>
                <div style={{ marginTop: "auto" }}>
                  <PrimaryButton size="md" href="/contato">QUERO O MESMO RESULTADO</PrimaryButton>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ── Cases Grid ───────────────────────────────────────────── */
const CASES = [
  { brand: "Rocha & Co", sector: "Advocacia · Contencioso", headline: "Vendas previsíveis no LinkedIn B2B", tagline: "De 4 para 38 reuniões qualificadas por mês", metrics: [["38", "reuniões/mês"], ["+ 9,5x", "pipeline"], ["R$ 1,2M", "em propostas"]] as [string,string][], stack: ["LinkedIn Ads", "CRM", "Estratégia comercial"], color: "linear-gradient(135deg, #1a1414, #2a1010)" },
  { brand: "Studio 9", sector: "Arquitetura · Interiores", headline: "Orçamentos consistentes no Meta Ads", tagline: "Saiu da dependência de indicação em 90 dias", metrics: [["112", "leads/mês"], ["+ 312%", "ROAS"], ["68 dias", "para break-even"]] as [string,string][], stack: ["Meta Ads", "Landing Pages", "Automação"], color: "linear-gradient(135deg, #131314, #1a0a0a)" },
  { brand: "Orbital", sector: "SaaS · B2B", headline: "Aquisição previsível em Google Ads", tagline: "MRR cresceu 4x em 8 meses", metrics: [["4x", "MRR"], ["+ 218%", "trial signups"], ["R$ 12", "CPL médio"]] as [string,string][], stack: ["Google Ads", "PMax", "CRM"], color: "linear-gradient(135deg, #1a1414, #131314)" },
  { brand: "Novalux", sector: "E-commerce · Iluminação", headline: "ROAS escalado em alta temporada", tagline: "Black Friday quebrou recorde da casa", metrics: [["8,1x", "ROAS BF"], ["R$ 2,4M", "em 14 dias"], ["+ 540%", "tráfego"]] as [string,string][], stack: ["Meta Ads", "Google Ads", "TikTok Ads"], color: "linear-gradient(135deg, #131314, #1a0a0a)" },
  { brand: "Vértice Smile", sector: "Odontologia · Clínica", headline: "Automação que multiplicou a agenda", tagline: "97% dos leads respondidos em até 3 minutos", metrics: [["97%", "leads respondidos"], ["3 min", "1ª resposta"], ["+ 184%", "agenda cheia"]] as [string,string][], stack: ["WhatsApp + IA", "CRM", "Meta Ads"], color: "linear-gradient(135deg, #1a1010, #131314)" },
  { brand: "Atlas Capital", sector: "Finanças · Mentoria", headline: "Lançamento de R$ 1M em 7 dias", tagline: "Estratégia de aquecimento e conversão", metrics: [["R$ 1,1M", "no lançamento"], ["7 dias", "de campanha"], ["+ 1.090%", "ROI"]] as [string,string][], stack: ["Meta Ads", "Landing Pages", "E-mail"], color: "linear-gradient(135deg, #131314, #1a1010)" },
];

function CaseCard({ brand, sector, headline, tagline, metrics, stack, color }: typeof CASES[0]) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      position: "relative", borderRadius: 20, overflow: "hidden",
      border: `1px solid ${hover ? "rgba(255,0,0,0.3)" : "rgba(255,255,255,0.06)"}`,
      background: "var(--surface)",
      boxShadow: hover ? "0 20px 50px rgba(0,0,0,0.5)" : "var(--shadow-card)",
      transform: hover ? "translateY(-4px)" : "translateY(0)",
      transition: "all var(--dur-base) var(--ease-out)", height: "100%",
      display: "flex", flexDirection: "column",
    }}>
      <span aria-hidden style={{ position: "absolute", inset: "0 0 auto 0", height: 1, background: "var(--card-horn)", opacity: hover ? 1 : 0.4 }} />
      <div style={{ position: "relative", background: color, padding: "28px 24px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: hover ? "radial-gradient(ellipse at 70% 40%, rgba(255,0,0,0.3), transparent 60%)" : "radial-gradient(ellipse at 70% 40%, rgba(255,0,0,0.18), transparent 65%)", transition: "all var(--dur-base) var(--ease-out)" }} />
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, letterSpacing: "-0.01em" }}>{brand}</div>
            <div style={{ color: "var(--fg-muted)", fontSize: 12, marginTop: 4, letterSpacing: "0.04em" }}>{sector}</div>
          </div>
          <span style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,0,0,0.15)", border: "1px solid rgba(255,0,0,0.3)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>
          </span>
        </div>
      </div>
      <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
        <div>
          <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--fg)", margin: 0, fontSize: 17, lineHeight: 1.3, textTransform: "uppercase" }}>{headline}</h4>
          <p style={{ margin: "8px 0 0", fontSize: 13.5, lineHeight: 1.55, color: "var(--fg-muted)" }}>{tagline}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          {metrics.map(([v, l]) => (
            <div key={l}>
              <div style={{ color: "var(--accent)", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 17, letterSpacing: "-0.02em" }}>{v}</div>
              <div style={{ color: "var(--fg-muted)", fontSize: 10.5, marginTop: 3, lineHeight: 1.3 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
          {stack.map((s) => (
            <span key={s} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 999, background: "var(--bg-alt)", border: "1px solid rgba(255,255,255,0.06)", color: "var(--fg-muted)" }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CasesGrid() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".cg-header", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".cg-header", start: "top 85%", once: true } });
    gsap.fromTo(".cg-card", { y: 50, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: ".cg-grid", start: "top 80%", once: true } });
  }, { scope: container });

  return (
    <section ref={container} className="section" style={{ background: "var(--bg-alt)" }}>
      <BgGlow variant="corner" opacity={0.5} />
      <div className="container" style={{ position: "relative" }}>
        <div className="cg-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", marginBottom: 48 }}>
          <div>
            <div className="cm-eyebrow">Outros cases</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg)", fontSize: "clamp(28px, 3.8vw, 44px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>
              Diferentes setores. <span className="cm-emph" style={{ color: "var(--accent)" }}>Mesmo método.</span>
            </h2>
          </div>
          <p style={{ maxWidth: 360, margin: 0, color: "var(--fg-2)", fontSize: 16, lineHeight: 1.6 }}>
            B2B, e-commerce, serviços, infoprodutos — a estrutura funciona quando há método.
          </p>
        </div>
        <div className="cg-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
          {CASES.map((c) => (
            <div key={c.brand} className="cg-card"><CaseCard {...c} /></div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonial Strip ────────────────────────────────────── */
export function CasesTestimonialStrip() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".cts-card", { y: 40, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: container.current, start: "top 80%", once: true } });
  }, { scope: container });

  return (
    <section ref={container} className="section" style={{ background: "var(--bg)", padding: "84px 0" }}>
      <BgGlow variant="edge" opacity={0.55} />
      <div className="container" style={{ position: "relative" }}>
        <div className="cts-card">
          <Card padding={48} radius={24} horn style={{ background: "linear-gradient(120deg, var(--surface), rgba(255,0,0,0.06))", border: "1px solid rgba(255,0,0,0.2)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 32, alignItems: "center" }} className="stack-md">
              <div style={{ width: 84, height: 84, borderRadius: 999, background: "linear-gradient(135deg, #4a1414, #1a0a0a)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 30, border: "2px solid rgba(255,0,0,0.4)" }}>MV</div>
              <div>
                <p style={{ color: "#fff", fontSize: 22, fontStyle: "italic", margin: 0, lineHeight: 1.4, fontFamily: "var(--font-display)", fontWeight: 600 }}>
                  "Em 18 meses a DF COMPANY transformou nossa operação. Saímos de um faturamento instável para R$ 528 mil mensais consistentes. O time entende de negócio, não só de anúncio."
                </p>
                <div style={{ marginTop: 14, color: "var(--fg-muted)", fontSize: 14 }}>
                  <strong style={{ color: "#fff" }}>Marina Vértice</strong> · CEO da Clínica Vértice
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                <div style={{ display: "flex", gap: 3 }}>
                  {[0,1,2,3,4].map((s) => <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="var(--gold-500)"><path d="M12 2l3 7 7 .5-5.5 5 1.5 7-6-3.5-6 3.5L8 14.5 2.5 9.5 9.5 9z"/></svg>)}
                </div>
                <span style={{ color: "var(--fg-muted)", fontSize: 12 }}>5.0 · Google</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ── CTA ──────────────────────────────────────────────────── */
export function CasesCTA() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".ccta-inner", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: container.current, start: "top 80%", once: true } });
  }, { scope: container });

  return (
    <section ref={container} className="section" style={{ background: "var(--bg-alt)" }}>
      <BgGlow variant="edge" opacity={0.7} />
      <div className="container" style={{ position: "relative", textAlign: "center" }}>
        <div className="ccta-inner" style={{ maxWidth: 760, marginInline: "auto" }}>
          <div className="cm-eyebrow">Sua vez</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg)", fontSize: "clamp(32px, 4.6vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 24px", textTransform: "uppercase" }}>
            O próximo case <span className="cm-emph" style={{ color: "var(--accent)" }}>pode ser o seu.</span>
          </h2>
          <p style={{ fontSize: 17, marginBottom: 36, maxWidth: 560, marginInline: "auto", color: "var(--fg-2)", lineHeight: 1.6 }}>
            Diagnóstico estratégico gratuito com o time DF COMPANY. Você sai com um plano de aquisição claro para os próximos 90 dias.
          </p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12 }}>
            <PrimaryButton size="lg" href="/contato">AGENDAR DIAGNÓSTICO</PrimaryButton>
            <GhostButton size="lg" href="https://wa.me/5511999999999">Chamar no WhatsApp</GhostButton>
          </div>
        </div>
      </div>
    </section>
  );
}

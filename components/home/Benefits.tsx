"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BgGlow, Card, IconTile } from "../ui";

gsap.registerPlugin(ScrollTrigger);

function LeadVisual() {
  return (
    <div style={{ position: "absolute", inset: 0, padding: 28, display: "flex", flexDirection: "column", gap: 12 }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 30%, rgba(255,0,0,0.2), transparent 60%)" }} />
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "var(--fg-muted)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>Leads hoje</span>
        <span style={{ color: "#2fb46a", fontSize: 12, fontWeight: 600 }}>+ 42% vs ontem</span>
      </div>
      <div style={{ position: "relative", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 56, letterSpacing: "-0.03em", lineHeight: 1 }}>187</div>
      <div style={{ position: "relative", marginTop: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { name: "Marina S.", msg: "Quero o orçamento", t: "agora" },
          { name: "Bruno A.", msg: "Tem disponibilidade?", t: "2 min" },
          { name: "Renato C.", msg: "Fechei com vocês", t: "5 min" },
        ].map((m, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px", background: "rgba(20,20,22,0.78)",
            border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12,
          }}>
            <span style={{ width: 30, height: 30, borderRadius: 999, background: `hsl(${i*60+10} 30% 30%)`, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{m.name.charAt(0)}</span>
            <div style={{ display: "flex", flexDirection: "column", flex: 1, lineHeight: 1.3 }}>
              <span style={{ color: "#fff", fontSize: 12.5, fontWeight: 600 }}>{m.name}</span>
              <span style={{ color: "var(--fg-muted)", fontSize: 11 }}>{m.msg}</span>
            </div>
            <span style={{ color: "var(--fg-soft)", fontSize: 10 }}>{m.t}</span>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function AutomationVisual() {
  const nodes = [
    { x: 12, y: 30, label: "Anúncio", color: "var(--accent)" },
    { x: 50, y: 16, label: "Lead capturado" },
    { x: 50, y: 50, label: "CRM" },
    { x: 88, y: 30, label: "IA responde" },
    { x: 50, y: 80, label: "Vendedor fecha" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, padding: 28 }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, rgba(255,0,0,0.18), transparent 60%)" }} />
      <div style={{ position: "relative", width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
        <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", maxWidth: 440 }} preserveAspectRatio="xMidYMid meet">
          <g stroke="rgba(255,255,255,0.12)" strokeWidth="0.4" fill="none">
            <path d="M18 30 L46 18"/><path d="M18 30 L46 50"/>
            <path d="M54 18 L84 30"/><path d="M54 50 L84 30"/>
            <path d="M54 50 L50 76"/>
          </g>
          <circle cx="0" cy="0" r="1.4" fill="var(--accent)">
            <animateMotion dur="3.6s" repeatCount="indefinite" path="M18 30 L46 18 L54 18 L84 30"/>
          </circle>
          <circle cx="0" cy="0" r="1.2" fill="#2fb46a">
            <animateMotion dur="4.2s" repeatCount="indefinite" path="M18 30 L46 50 L54 50 L50 76" begin="1s"/>
          </circle>
          {nodes.map((n, i) => (
            <g key={i} transform={`translate(${n.x} ${n.y})`}>
              <circle r="4.5" fill={n.color === "var(--accent)" ? "var(--accent)" : "#1a1a1a"} stroke="rgba(255,255,255,0.2)" strokeWidth="0.3"/>
              <text x="0" y="9" textAnchor="middle" fill="#fff" style={{ fontSize: 3.2, fontFamily: "var(--font-body)", fontWeight: 600 }}>{n.label}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

function GrowthVisual() {
  return (
    <div style={{ position: "absolute", inset: 0, padding: 28, display: "flex", flexDirection: "column", gap: 12 }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 80%, rgba(255,0,0,0.25), transparent 60%)" }} />
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between" }}>
        <div>
          <div style={{ color: "var(--fg-muted)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>Faturamento mensal</div>
          <div style={{ color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 38, letterSpacing: "-0.02em", lineHeight: 1.1, marginTop: 4 }}>R$ 528K</div>
        </div>
        <div style={{ alignSelf: "flex-end" }}>
          <span className="chip" style={{ padding: "4px 10px", fontSize: 11 }}>
            <span className="dot" /> + 218%
          </span>
        </div>
      </div>
      <div style={{ position: "relative", flex: 1, marginTop: "auto" }}>
        <svg viewBox="0 0 200 80" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="gfill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,0,0,0.55)"/>
              <stop offset="100%" stopColor="rgba(255,0,0,0)"/>
            </linearGradient>
          </defs>
          <path d="M0 68 L20 64 L40 58 L60 54 L80 46 L100 42 L120 32 L140 28 L160 20 L180 16 L200 8 L200 80 L0 80 Z" fill="url(#gfill)"/>
          <path d="M0 68 L20 64 L40 58 L60 54 L80 46 L100 42 L120 32 L140 28 L160 20 L180 16 L200 8" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          {[68,64,58,54,46,42,32,28,20,16,8].map((y,i) => <circle key={i} cx={i*20} cy={y} r="1.6" fill="var(--accent)"/>)}
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", color: "var(--fg-soft)", fontSize: 10, marginTop: 6 }}>
          <span>Jan</span><span>Mar</span><span>Mai</span><span>Jul</span><span>Set</span><span>Nov</span>
        </div>
      </div>
    </div>
  );
}

const BENEFITS = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-4 3-6 6-6s6 2 6 6"/><path d="M17 8v6M14 11h6"/></svg>,
    kicker: "01", title: "Mais leads qualificados",
    body: "Atraímos pessoas com intenção real de compra usando campanhas estratégicas e segmentação avançada. Você para de depender apenas de indicação e começa a gerar oportunidades todos os dias.",
    visual: <LeadVisual />,
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/><path d="M10 7h4M10 17h4M7 10v4M17 10v4"/></svg>,
    kicker: "02", title: "Processos automatizados que economizam tempo",
    body: "Automação com IA e CRM para organizar atendimento, acelerar respostas e aumentar conversão. Sua empresa ganha velocidade sem perder qualidade.",
    visual: <AutomationVisual />,
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>,
    kicker: "03", title: "Crescimento com previsibilidade",
    body: "Você entende exatamente para onde seu investimento está indo. Com relatórios semanais, suporte próximo e acompanhamento estratégico, suas campanhas evoluem continuamente.",
    visual: <GrowthVisual />,
  },
];

export default function Benefits() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".benefits-title", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: ".benefits-title", start: "top 85%", once: true },
    });
    BENEFITS.forEach((_, i) => {
      const xFrom = i % 2 === 0 ? -60 : 60;
      gsap.fromTo(`.benefit-card-${i}`, { x: xFrom, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: `.benefit-card-${i}`, start: "top 82%", once: true },
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="section" style={{ background: "var(--bg-alt)" }}>
      <BgGlow variant="edge" opacity={0.6} />
      <div className="container" style={{ position: "relative" }}>
        <div className="benefits-title" style={{ textAlign: "center", marginBottom: 64, maxWidth: 760, marginInline: "auto" }}>
          <div className="cm-eyebrow">O que você ganha</div>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg)",
            fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.02em",
            margin: 0, textTransform: "uppercase",
          }}>
            Três frentes que transformam{" "}
            <span className="cm-emph" style={{ color: "var(--accent)" }}>anúncio em receita</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {BENEFITS.map((it, i) => (
            <div key={i} className={`benefit-card-${i}`}>
              <Card padding={0} radius={20} hover style={{ overflow: "hidden" }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: i % 2 === 0 ? "1.05fr 1fr" : "1fr 1.05fr",
                  alignItems: "stretch", minHeight: 320,
                }} className="stack-sm">
                  <div style={{
                    padding: "44px 44px", order: i % 2 === 0 ? 1 : 2,
                    display: "flex", flexDirection: "column", justifyContent: "center", gap: 14,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 4 }}>
                      <IconTile size={42} radius={10}>{it.icon}</IconTile>
                      <span style={{ color: "var(--accent)", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 36, letterSpacing: "-0.04em", opacity: 0.5 }}>{it.kicker}</span>
                    </div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--fg)", margin: 0, fontSize: "clamp(22px, 2.4vw, 30px)", textTransform: "uppercase", lineHeight: 1.15 }}>{it.title}</h3>
                    <p style={{ margin: 0, fontSize: 15.5, color: "var(--fg-2)", lineHeight: 1.6 }}>{it.body}</p>
                  </div>
                  <div style={{
                    order: i % 2 === 0 ? 2 : 1,
                    background: "linear-gradient(135deg, #131314 0%, #1a1414 100%)",
                    borderLeft: i % 2 === 0 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    borderRight: i % 2 === 0 ? "none" : "1px solid rgba(255,255,255,0.04)",
                    position: "relative", overflow: "hidden", minHeight: 280,
                  }}>
                    {it.visual}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

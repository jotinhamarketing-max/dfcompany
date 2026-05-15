"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BgGlow, Card, IconTile, PrimaryButton, GhostButton, SVC_ICONS } from "../ui";

gsap.registerPlugin(ScrollTrigger);

/* ── Hero ─────────────────────────────────────────────────── */
export function ServicosHero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".sh-chip", { y: 20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.5 })
      .fromTo(".sh-h1 .word", { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.7 }, "-=0.2")
      .fromTo(".sh-lead", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
      .fromTo(".sh-btn", { y: 20, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)" }, "-=0.2");
  }, { scope: container });

  return (
    <section ref={container} style={{ position: "relative", background: "var(--bg)", overflow: "hidden", padding: "96px 0 80px" }}>
      <BgGlow variant="edge" opacity={0.85} />
      <div aria-hidden className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.4, maskImage: "radial-gradient(ellipse at top, #000, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse at top, #000, transparent 70%)" }} />
      <div className="container" style={{ position: "relative", textAlign: "center" }}>
        <div style={{ maxWidth: 880, marginInline: "auto" }}>
          <span className="chip sh-chip" style={{ marginBottom: 24, display: "inline-flex" }}>
            <span className="dot" /> Serviços DF COMPANY
          </span>
          <h1 className="sh-h1" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 1, letterSpacing: "-0.025em", margin: "0 0 22px", textTransform: "uppercase", color: "var(--fg)" }}>
            {["Um sistema"].map((w, i) => <span key={i} className="word" style={{ display: "inline-block", marginRight: "0.25em" }}>{w}</span>)}
            <span className="word cm-emph" style={{ display: "inline-block", color: "var(--accent)", marginRight: "0.25em" }}>completo</span>
            {["de aquisição de clientes"].map((w, i) => <span key={i} className="word" style={{ display: "inline-block", marginRight: "0.25em" }}>{w}</span>)}
          </h1>
          <p className="sh-lead" style={{ maxWidth: 640, marginInline: "auto", fontSize: 19, color: "var(--fg-2)", lineHeight: 1.6, marginBottom: 32 }}>
            Cada serviço da DF COMPANY trabalha em conjunto para transformar investimento em receita previsível. Você escolhe o pacote certo. Nós cuidamos do resto.
          </p>
          <div className="sh-btn">
            <PrimaryButton size="lg" href="/contato">AGENDAR DIAGNÓSTICO</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Pillar Packages ──────────────────────────────────────── */
const PKGS = [
  {
    tag: "01 · Aquisição", title: "Tráfego pago multicanal",
    body: "Campanhas estratégicas em Meta, Google, TikTok e LinkedIn, com segmentação avançada e otimização diária para atrair quem está pronto para comprar.",
    items: ["Meta Ads", "Google Ads", "TikTok Ads", "LinkedIn Ads", "Segmentação avançada", "Otimização diária"],
  },
  {
    tag: "02 · Conversão", title: "Estrutura para vender", featured: true,
    body: "Landing pages, sites e fluxos pensados para converter o lead em cliente. Cada pixel testado, cada CTA medido.",
    items: ["Landing Pages", "Web Design", "Testes A/B", "Otimização de funil", "Páginas de venda", "Copywriting"],
  },
  {
    tag: "03 · Escala", title: "Automação e CRM",
    body: "Inteligência artificial e CRM organizando o atendimento, acelerando respostas e aumentando conversão sem perder qualidade.",
    items: ["CRM personalizado", "Automação com IA", "Integrações WhatsApp", "Relatórios semanais", "Dashboard ao vivo", "Estratégia comercial"],
  },
];

export function PillarPackages() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".pillar-title", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".pillar-title", start: "top 85%", once: true } });
    gsap.fromTo(".pillar-card", { y: 50, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".pillar-grid", start: "top 80%", once: true } });
  }, { scope: container });

  return (
    <section ref={container} className="section" style={{ background: "var(--bg)" }}>
      <BgGlow variant="corner" opacity={0.5} />
      <div className="container" style={{ position: "relative" }}>
        <div className="pillar-title" style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="cm-eyebrow">Três pilares</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg)", fontSize: "clamp(28px, 3.8vw, 44px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>
            Da primeira impressão à <span className="cm-emph" style={{ color: "var(--accent)" }}>venda fechada</span>
          </h2>
        </div>
        <div className="pillar-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
          {PKGS.map((p, i) => (
            <div key={i} className="pillar-card">
              <Card padding={32} radius={20} horn={p.featured} hover style={{
                height: "100%",
                background: p.featured ? "linear-gradient(180deg, rgba(255,0,0,0.07), var(--surface) 40%)" : "var(--surface)",
                border: p.featured ? "1px solid rgba(255,0,0,0.25)" : "1px solid rgba(255,255,255,0.05)",
                display: "flex", flexDirection: "column", gap: 16,
              }}>
                <div style={{ color: "var(--accent)", fontSize: 12, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>{p.tag}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--fg)", margin: 0, fontSize: 24, textTransform: "uppercase", lineHeight: 1.15 }}>{p.title}</h3>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "var(--fg-muted)" }}>{p.body}</p>
                <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "8px 0" }} />
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {p.items.map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--fg-2)", fontSize: 14 }}>
                      <span style={{ width: 18, height: 18, borderRadius: 999, background: "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Services Grid ────────────────────────────────────────── */
const SERVICES = [
  { icon: "meta", title: "Meta Ads", body: "Facebook e Instagram com criativos testados e públicos validados para escalar com previsibilidade.", channels: "Facebook · Instagram · Reels" },
  { icon: "google", title: "Google Ads", body: "Search, Display, Performance Max e YouTube. Quem busca por você encontra você — e converte.", channels: "Search · Display · PMax · YouTube" },
  { icon: "tiktok", title: "TikTok Ads", body: "Criativos nativos da plataforma e segmentação por interesse para impactar a próxima geração de consumidores.", channels: "Spark Ads · TopView · In-Feed" },
  { icon: "linkedin", title: "LinkedIn Ads", body: "B2B com precisão cirúrgica: cargos, indústrias e empresas onde sua oferta faz sentido.", channels: "Sponsored Content · InMail · Lead Gen" },
  { icon: "page", title: "Landing Pages", body: "Páginas focadas em conversão com copywriting estratégico, prova social e teste A/B contínuo.", channels: "Wireframe · Design · Dev · A/B" },
  { icon: "web", title: "Web Design", body: "Sites institucionais e e-commerces que sustentam a marca, performam e geram autoridade.", channels: "UI · UX · CMS · SEO técnico" },
  { icon: "crm", title: "CRM", body: "Organização total da operação comercial: pipeline, follow-up automatizado e visibilidade do funil.", channels: "RD Station · HubSpot · Pipedrive" },
  { icon: "ai", title: "Automação com IA", body: "Inteligência artificial qualificando leads, respondendo no WhatsApp e acelerando a primeira resposta.", channels: "Bots · IA conversacional · Workflows" },
  { icon: "report", title: "Relatórios semanais", body: "Reports claros em português direto. Quanto investiu, quanto voltou e o próximo passo da estratégia.", channels: "Looker Studio · Reuniões · WhatsApp" },
  { icon: "strategy", title: "Estratégia comercial", body: "Mais que rodar anúncios: alinhamos oferta, time de vendas e funil para o resultado fechar.", channels: "Posicionamento · Funil · Vendas" },
];

function ServiceRow({ icon, title, body, channels }: { icon: string; title: string; body: string; channels: string }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      position: "relative", padding: "26px 28px",
      background: hover ? "var(--surface-hover)" : "var(--surface)",
      border: `1px solid ${hover ? "rgba(255,0,0,0.25)" : "rgba(255,255,255,0.05)"}`,
      borderRadius: 18,
      display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 22, alignItems: "center",
      transition: "all var(--dur-base) var(--ease-out)",
      transform: hover ? "translateY(-2px)" : "translateY(0)",
    }}>
      <IconTile size={48} radius={12}>{SVC_ICONS[icon]}</IconTile>
      <div>
        <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--fg)", margin: "0 0 6px", fontSize: 18 }}>{title}</h4>
        <p style={{ margin: 0, color: "var(--fg-muted)", fontSize: 14, lineHeight: 1.55 }}>{body}</p>
        <div style={{ marginTop: 12, color: "var(--fg-soft)", fontSize: 11.5, letterSpacing: "0.12em", textTransform: "uppercase" }}>{channels}</div>
      </div>
      <span style={{
        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
        background: hover ? "var(--accent)" : "transparent",
        border: `1px solid ${hover ? "var(--accent)" : "var(--border)"}`,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        color: hover ? "#fff" : "var(--fg-muted)", transition: "all var(--dur-fast) var(--ease-out)",
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </span>
    </div>
  );
}

export function ServicesGrid() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".sg-header", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".sg-header", start: "top 85%", once: true } });
    gsap.fromTo(".sg-row", { x: -30, opacity: 0 }, { x: 0, opacity: 1, stagger: { amount: 0.5 }, duration: 0.5, ease: "power3.out", scrollTrigger: { trigger: ".sg-grid", start: "top 80%", once: true } });
  }, { scope: container });

  return (
    <section ref={container} className="section" style={{ background: "var(--bg-alt)" }}>
      <BgGlow variant="edge" opacity={0.55} />
      <div className="container" style={{ position: "relative" }}>
        <div className="sg-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 32, marginBottom: 48 }}>
          <div style={{ maxWidth: 640 }}>
            <div className="cm-eyebrow">Tudo que entregamos</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg)", fontSize: "clamp(28px, 3.8vw, 44px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>
              10 frentes. <span className="cm-emph" style={{ color: "var(--accent)" }}>Um único objetivo:</span> vender mais.
            </h2>
          </div>
          <p style={{ maxWidth: 360, margin: 0, color: "var(--fg-2)", fontSize: 16, lineHeight: 1.6 }}>
            Você contrata quem entrega resultado — não quem cobra por hora.
          </p>
        </div>
        <div className="sg-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }}>
          {SERVICES.map((s, i) => (
            <div key={s.title} className="sg-row"><ServiceRow {...s} /></div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Process Timeline ─────────────────────────────────────── */
const STEPS = [
  { n: "01", title: "Diagnóstico estratégico", body: "Reunião com o time DF COMPANY para entender o negócio, o funil atual e o objetivo de receita. Mapa-de-rotas em até 5 dias." },
  { n: "02", title: "Estrutura e setup", body: "Configuramos campanhas, criativos, landing pages, CRM e automações antes de gastar o primeiro real em mídia. Sem improviso." },
  { n: "03", title: "Lançamento e otimização", body: "Campanhas no ar com acompanhamento diário. Otimizações contínuas guiadas por dados, não por achismo." },
  { n: "04", title: "Escala e revisão", body: "Relatórios semanais, dashboard ao vivo e reunião estratégica mensal. O que funciona, escala. O que não, sai." },
];

export function ProcessTimeline() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".pt-title", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".pt-title", start: "top 85%", once: true } });
    gsap.fromTo(".pt-line", { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power2.out", transformOrigin: "left center", scrollTrigger: { trigger: ".pt-grid", start: "top 80%", once: true } });
    gsap.fromTo(".pt-step", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: ".pt-grid", start: "top 80%", once: true } });
  }, { scope: container });

  return (
    <section ref={container} className="section" style={{ background: "var(--bg)" }}>
      <BgGlow variant="corner" opacity={0.55} />
      <div className="container" style={{ position: "relative" }}>
        <div className="pt-title" style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="cm-eyebrow">Como trabalhamos</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg)", fontSize: "clamp(28px, 3.8vw, 44px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>
            Quatro passos. <span className="cm-emph" style={{ color: "var(--accent)" }}>Zero achismo.</span>
          </h2>
        </div>
        <div className="pt-grid" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          <div className="pt-line" aria-hidden style={{
            position: "absolute", left: "8%", right: "8%", top: 26, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,0,0,0.4), transparent)",
            pointerEvents: "none",
          }} />
          {STEPS.map((s, i) => (
            <div key={i} className="pt-step" style={{ position: "relative", display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{
                width: 52, height: 52, borderRadius: 14, background: "var(--surface)",
                border: "1px solid rgba(255,0,0,0.35)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                color: "var(--accent)", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18,
                boxShadow: "0 0 0 6px var(--bg)", position: "relative", zIndex: 2,
              }}>{s.n}</span>
              <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--fg)", margin: "8px 0 0", fontSize: 18, textTransform: "uppercase" }}>{s.title}</h4>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--fg-muted)" }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ──────────────────────────────────────────────────── */
export function ServicosCTA() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".scta-inner", { y: 40, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: container.current, start: "top 80%", once: true } });
  }, { scope: container });

  return (
    <section ref={container} className="section" style={{ background: "var(--bg-alt)" }}>
      <BgGlow variant="edge" opacity={0.65} />
      <div className="container" style={{ position: "relative" }}>
        <div className="scta-inner">
          <Card padding={56} radius={24} horn style={{ background: "linear-gradient(120deg, var(--surface) 0%, rgba(255,0,0,0.08) 100%)", border: "1px solid rgba(255,0,0,0.2)", textAlign: "center" }}>
            <div style={{ maxWidth: 760, marginInline: "auto" }}>
              <div className="cm-eyebrow">Próximo passo</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg)", fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 22px", textTransform: "uppercase" }}>
                Pronto para montar a estrutura <span className="cm-emph" style={{ color: "var(--accent)" }}>que vende sozinha?</span>
              </h2>
              <p style={{ fontSize: 16, marginBottom: 32, maxWidth: 560, marginInline: "auto", color: "var(--fg-2)", lineHeight: 1.6 }}>
                Diagnóstico gratuito de 30 minutos com o time DF COMPANY. Você sai com um mapa claro do que precisa para escalar.
              </p>
              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12 }}>
                <PrimaryButton size="lg" href="/contato">AGENDAR DIAGNÓSTICO ESTRATÉGICO</PrimaryButton>
                <GhostButton size="lg" href="https://wa.me/5511999999999">Falar no WhatsApp</GhostButton>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

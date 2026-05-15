"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BgGlow, Card, IconTile, PrimaryButton, GhostButton } from "../ui";

gsap.registerPlugin(ScrollTrigger);

/* ── Channel icons ────────────────────────────────────────── */
const CHANNEL_ICONS = {
  whatsapp: <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M3.5 20.5L5 16a9 9 0 1 1 3.2 3.2L3.5 20.5z"/></svg>,
  email: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 7l10 6 10-6"/></svg>,
  pin: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  instagram: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none"/></svg>,
};

function ChannelRow({ kind, title, value, hint, href }: { kind: keyof typeof CHANNEL_ICONS; title: string; value: string; hint: string; href?: string }) {
  const [hover, setHover] = useState(false);
  const Comp = href ? "a" : "div";
  return (
    <Comp
      {...(href ? { href, target: kind === "whatsapp" ? "_blank" : undefined, rel: "noreferrer" } : {})}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 16,
        padding: "16px 20px",
        background: hover ? "var(--surface-hover)" : "var(--surface)",
        border: `1px solid ${hover ? "rgba(255,0,0,0.25)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 14, textDecoration: "none",
        cursor: href ? "pointer" : "default",
        transition: "all var(--dur-base) var(--ease-out)",
        transform: href && hover ? "translateY(-2px)" : "translateY(0)",
      } as React.CSSProperties}
    >
      <IconTile size={40} radius={10}>{CHANNEL_ICONS[kind]}</IconTile>
      <div style={{ lineHeight: 1.3 }}>
        <div style={{ color: "var(--fg-muted)", fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase" }}>{title}</div>
        <div style={{ color: "#fff", fontSize: 16, fontWeight: 600, marginTop: 2 }}>{value}</div>
        <div style={{ color: "var(--fg-soft)", fontSize: 12.5, marginTop: 2 }}>{hint}</div>
      </div>
      {href && (
        <span style={{ width: 32, height: 32, borderRadius: 8, background: hover ? "var(--accent)" : "transparent", border: `1px solid ${hover ? "var(--accent)" : "var(--border)"}`, display: "inline-flex", alignItems: "center", justifyContent: "center", color: hover ? "#fff" : "var(--fg-muted)", transition: "all var(--dur-fast) var(--ease-out)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>
        </span>
      )}
    </Comp>
  );
}

/* ── Contact Form ─────────────────────────────────────────── */
function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label style={{ display: "block", color: "var(--fg-muted)", fontSize: 12, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
      {children}{required && <span style={{ color: "var(--accent)", marginLeft: 4 }}>*</span>}
    </label>
  );
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      {children}
      {error && <div style={{ color: "var(--accent)", fontSize: 12, marginTop: 6 }}>{error}</div>}
    </div>
  );
}

function ChoiceChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
      padding: "10px 14px",
      background: active ? "rgba(255,0,0,0.12)" : "var(--bg-alt)",
      border: `1px solid ${active ? "var(--accent)" : "rgba(255,255,255,0.08)"}`,
      borderRadius: 999,
      color: active ? "#fff" : "var(--fg-2)",
      fontSize: 13, fontWeight: 500, fontFamily: "var(--font-body)",
      cursor: "pointer", transition: "all var(--dur-fast) var(--ease-out)", whiteSpace: "nowrap",
    }}>
      {active && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
      {children}
    </button>
  );
}

function ContactForm() {
  const [data, setData] = useState({ nome: "", empresa: "", email: "", telefone: "", faturamento: "", investimento: "", servicos: [] as string[], orcamento: "", urgencia: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));
  const toggleService = (s: string) => setData((d) => ({ ...d, servicos: d.servicos.includes(s) ? d.servicos.filter((x) => x !== s) : [...d.servicos, s] }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!data.nome.trim()) errs.nome = "Informe seu nome";
    if (!data.email.trim() || !/.+@.+\..+/.test(data.email)) errs.email = "E-mail inválido";
    if (!data.telefone.trim()) errs.telefone = "Informe um telefone";
    if (!data.empresa.trim()) errs.empresa = "Informe a empresa";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setSendError("");
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erro ao enviar");
      setSubmitted(true);
    } catch {
      setSendError("Não foi possível enviar. Tente pelo WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card padding={48} radius={24} horn style={{ textAlign: "center", background: "linear-gradient(135deg, var(--surface), rgba(255,0,0,0.07))", border: "1px solid rgba(255,0,0,0.25)" }}>
        <div style={{ width: 72, height: 72, borderRadius: 999, background: "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: "var(--shadow-flame)" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--fg)", margin: "0 0 12px", textTransform: "uppercase" }}>Recebemos sua mensagem</h3>
        <p style={{ fontSize: 15.5, marginBottom: 28, maxWidth: 420, marginInline: "auto", color: "var(--fg-2)", lineHeight: 1.6 }}>
          Em até <strong style={{ color: "#fff" }}>2h úteis</strong>, alguém do time DF COMPANY entra em contato para agendar seu diagnóstico estratégico.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
          <PrimaryButton size="md" href="https://wa.me/5592991220748">FALAR AGORA NO WHATSAPP</PrimaryButton>
        </div>
      </Card>
    );
  }

  const faturamentos = ["Até R$ 50k/mês", "R$ 50k–200k/mês", "R$ 200k–1M/mês", "Acima de R$ 1M/mês"];
  const investimentos = ["Até R$ 5k", "R$ 5k–20k", "R$ 20k–50k", "Acima de R$ 50k"];
  const services = ["Gestão de Tráfego Pago", "Landing Pages", "Sistema de CRM"];
  const urgencias = [
    { key: "A", label: "Baixa", desc: "Apenas explorando possibilidades" },
    { key: "B", label: "Média", desc: "Pretendo começar em breve" },
    { key: "C", label: "Alta", desc: "Precisamos iniciar o quanto antes" },
  ];

  return (
    <form onSubmit={submit} noValidate>
      <Card padding={36} radius={22} horn style={{ position: "relative" }}>
        <div style={{ marginBottom: 28 }}>
          <div className="cm-eyebrow">Diagnóstico estratégico</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg)", margin: "0 0 8px", fontSize: 26, textTransform: "uppercase" }}>
            Conte sobre seu <span className="cm-emph">negócio</span>
          </h2>
          <p style={{ margin: 0, fontSize: 13.5, color: "var(--fg-muted)" }}>Quanto mais detalhe, melhor a primeira conversa.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="stack-sm">
          <Field label="Nome completo" required error={errors.nome}>
            <input type="text" value={data.nome} onChange={(e) => update("nome", e.target.value)} placeholder="Seu nome" className="df-input" />
          </Field>
          <Field label="Empresa" required error={errors.empresa}>
            <input type="text" value={data.empresa} onChange={(e) => update("empresa", e.target.value)} placeholder="Nome da empresa" className="df-input" />
          </Field>
          <Field label="E-mail" required error={errors.email}>
            <input type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="voce@empresa.com" className="df-input" />
          </Field>
          <Field label="WhatsApp" required error={errors.telefone}>
            <input type="tel" value={data.telefone} onChange={(e) => update("telefone", e.target.value)} placeholder="(11) 9 9999-9999" className="df-input" />
          </Field>
        </div>

        <div style={{ marginTop: 22 }}>
          <FieldLabel>Faturamento mensal</FieldLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
            {faturamentos.map((f) => <ChoiceChip key={f} active={data.faturamento === f} onClick={() => update("faturamento", f)}>{f}</ChoiceChip>)}
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <FieldLabel>Investimento mensal em mídia</FieldLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
            {investimentos.map((f) => <ChoiceChip key={f} active={data.investimento === f} onClick={() => update("investimento", f)}>{f}</ChoiceChip>)}
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <FieldLabel>Quais serviços te interessam?</FieldLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
            {services.map((s) => <ChoiceChip key={s} active={data.servicos.includes(s)} onClick={() => toggleService(s)}>{s}</ChoiceChip>)}
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <FieldLabel>Nossa mão de obra se inicia em R$&nbsp;1.500,00/mês. Esse valor se encaixa no seu orçamento hoje?</FieldLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
            {[
              "Sim, estou preparado(a) para levar meu negócio ao próximo nível",
              "Infelizmente não é meu momento",
            ].map((op) => (
              <button key={op} type="button" onClick={() => update("orcamento", op)} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "14px 18px", textAlign: "left",
                background: data.orcamento === op ? "rgba(255,0,0,0.1)" : "var(--bg-alt)",
                border: `1px solid ${data.orcamento === op ? "var(--accent)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 12, color: data.orcamento === op ? "#fff" : "var(--fg-2)",
                fontSize: 14, fontWeight: 500, fontFamily: "var(--font-body)",
                cursor: "pointer", transition: "all var(--dur-fast) var(--ease-out)",
              }}>
                <span style={{ width: 20, height: 20, borderRadius: 999, border: `2px solid ${data.orcamento === op ? "var(--accent)" : "rgba(255,255,255,0.2)"}`, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {data.orcamento === op && <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--accent)", display: "block" }} />}
                </span>
                {op}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <FieldLabel>Qual o nível de urgência para você dar início a este projeto?</FieldLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
            {urgencias.map(({ key, label, desc }) => (
              <button key={key} type="button" onClick={() => update("urgencia", key)} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 18px", textAlign: "left",
                background: data.urgencia === key ? "rgba(255,0,0,0.1)" : "var(--bg-alt)",
                border: `1px solid ${data.urgencia === key ? "var(--accent)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 12, color: data.urgencia === key ? "#fff" : "var(--fg-2)",
                fontSize: 14, fontFamily: "var(--font-body)",
                cursor: "pointer", transition: "all var(--dur-fast) var(--ease-out)",
              }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: data.urgencia === key ? "var(--accent)" : "rgba(255,255,255,0.06)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: data.urgencia === key ? "#fff" : "var(--fg-muted)", flexShrink: 0, transition: "all var(--dur-fast) var(--ease-out)" }}>{key}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{label}</div>
                  <div style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 2 }}>{desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {sendError && (
          <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(255,0,0,0.08)", border: "1px solid rgba(255,0,0,0.3)", borderRadius: 10, color: "var(--accent)", fontSize: 13 }}>
            {sendError}
          </div>
        )}
        <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ margin: 0, maxWidth: 340, fontSize: 13, color: "var(--fg-soft)" }}>
            Ao enviar, você concorda com nossa política de privacidade.
          </p>
          <PrimaryButton size="lg" type="submit" icon="arrow">
            {loading ? "ENVIANDO..." : "ENVIAR DIAGNÓSTICO"}
          </PrimaryButton>
        </div>
      </Card>
    </form>
  );
}

/* ── Layout ───────────────────────────────────────────────── */
export function ContatoLayout() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".cl-left", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9 })
      .fromTo(".cl-right", { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9 }, "-=0.7");
  }, { scope: container });

  return (
    <section ref={container} style={{ position: "relative", background: "var(--bg)", overflow: "hidden", padding: "80px 0 100px" }}>
      <BgGlow variant="edge" opacity={0.85} />
      <div aria-hidden className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
      <div className="container" style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", gap: 56, alignItems: "start" }} className="stack-md">
          <div className="cl-left cl-order-2">
            <span className="chip" style={{ marginBottom: 22, display: "inline-flex" }}>
              <span className="dot" /> Resposta em até 2h úteis
            </span>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(36px, 5.4vw, 64px)", lineHeight: 1.02, letterSpacing: "-0.025em", margin: "0 0 22px", textTransform: "uppercase", color: "var(--fg)" }}>
              Vamos falar de <span className="cm-emph" style={{ color: "var(--accent)" }}>crescimento</span>
            </h1>
            <p style={{ maxWidth: 520, fontSize: 18, margin: "0 0 36px", color: "var(--fg-2)", lineHeight: 1.6 }}>
              Preencha o formulário e nosso time entra em contato para entender seu negócio e montar uma estratégia personalizada de aquisição.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
              <ChannelRow kind="whatsapp" title="WhatsApp" value="(92) 99122-0748" hint="Resposta rápida · seg–sex 9h às 19h" href="https://wa.me/5592991220748" />
              <ChannelRow kind="email" title="E-mail" value="contato@dfcompany.com.br" hint="Respondemos em até 4h úteis" href="mailto:contato@dfcompany.com.br" />
              <ChannelRow kind="instagram" title="Instagram" value="@euojaovitorr" hint="Siga para conteúdo de tráfego pago" href="https://instagram.com/euojaovitorr" />
              <ChannelRow kind="pin" title="Escritório" value="Florianópolis, SC — Brasil" hint="Reuniões presenciais sob agendamento" />
            </div>

            <div style={{ display: "flex", gap: 14, alignItems: "center", padding: "14px 18px", background: "var(--surface)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14 }}>
              <span style={{ width: 40, height: 40, borderRadius: 999, overflow: "hidden", flexShrink: 0, border: "2px solid rgba(255,0,0,0.4)", position: "relative" }}>
                <Image src="/assets/joao-portrait.jpg" alt="João Vitor" fill style={{ objectFit: "cover", objectPosition: "center top" }} />
              </span>
              <div style={{ flex: 1, lineHeight: 1.3 }}>
                <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>Atendimento direto com o time</div>
                <div style={{ color: "var(--fg-muted)", fontSize: 12.5 }}>João Vitor e DF COMPANY · resposta em até 2h úteis</div>
              </div>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: "#2fb46a", boxShadow: "0 0 10px #2fb46a" }} />
            </div>
          </div>

          <div className="cl-right cl-order-1">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ──────────────────────────────────────────────────── */
export function ContatoFAQ() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".cfaq-title", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".cfaq-title", start: "top 85%", once: true } });
    gsap.fromTo(".cfaq-card", { y: 40, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: ".cfaq-grid", start: "top 80%", once: true } });
  }, { scope: container });

  return (
    <section ref={container} className="section" style={{ background: "var(--bg-alt)" }}>
      <BgGlow variant="corner" opacity={0.55} />
      <div className="container" style={{ position: "relative" }}>
        <div className="cfaq-title" style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="cm-eyebrow">Antes de mandar</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg)", fontSize: "clamp(28px, 3.6vw, 40px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>
            Talvez você já tenha <span className="cm-emph" style={{ color: "var(--accent)" }}>uma resposta aqui</span>
          </h2>
        </div>

        <div className="cfaq-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {[
            { q: "Em quanto tempo recebo retorno?", a: "Resposta em até 2h úteis pelo time DF COMPANY (segunda a sexta, 9h–19h). Para casos urgentes, chame no WhatsApp." },
            { q: "Preciso de orçamento mínimo?", a: "Trabalhamos com empresas a partir de R$ 5k/mês em mídia. Acima disso, montamos um plano sob medida." },
            { q: "O diagnóstico é cobrado?", a: "Não. A primeira reunião de 30 minutos é gratuita. Você sai com um mapa claro do que precisa para crescer." },
          ].map((it, i) => (
            <div key={i} className="cfaq-card">
              <Card padding={24} horn hover>
                <div style={{ color: "var(--accent)", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, marginBottom: 12 }}>0{i+1}</div>
                <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--fg)", margin: "0 0 10px", fontSize: 17 }}>{it.q}</h4>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--fg-muted)" }}>{it.a}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

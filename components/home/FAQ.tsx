"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BgGlow, PrimaryButton } from "../ui";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { q: "Em quanto tempo começo a ter resultados?", a: "Isso depende do nicho e investimento, mas muitas campanhas começam a gerar leads já nos primeiros dias." },
  { q: "Vocês atendem todo o Brasil?", a: "Sim. Atendemos empresas e mentorias em diversos estados do Brasil." },
  { q: "Vocês fazem apenas tráfego pago?", a: "Não. Criamos toda a estrutura de crescimento: anúncios, landing pages, CRM, automação e estratégia comercial." },
  { q: "Como funciona o acompanhamento?", a: "Você recebe relatórios semanais, dashboard em tempo real e reuniões estratégicas mensais com o time da DF COMPANY." },
  { q: "Tem fidelidade?", a: "Não trabalhamos com fidelidade. A renovação é por desempenho — se a parceria não fizer sentido, encerramos com aviso prévio." },
];

function FAQItem({ q, a, open, onClick }: { q: string; a: string; open: boolean; onClick: () => void }) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!bodyRef.current) return;
    gsap.to(bodyRef.current, {
      height: open ? "auto" : 0,
      opacity: open ? 1 : 0,
      duration: 0.35,
      ease: open ? "power2.out" : "power2.in",
      overwrite: true,
    });
  }, [open]);

  return (
    <div style={{
      borderRadius: 14, background: "var(--surface)",
      border: `1px solid ${open ? "rgba(255,0,0,0.25)" : "rgba(255,255,255,0.05)"}`,
      overflow: "hidden", transition: "border-color 200ms ease",
    }}>
      <button type="button" onClick={onClick} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 16, padding: "20px 22px",
        background: "transparent", border: "none", cursor: "pointer",
        color: "var(--fg)", fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, textAlign: "left",
      }}>
        <span>{q}</span>
        <span style={{
          width: 32, height: 32, borderRadius: 8, background: "var(--flame-500)",
          display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          transition: "transform 200ms ease",
          transform: open ? "rotate(180deg)" : "rotate(0)",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </span>
      </button>
      <div ref={bodyRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <div style={{ padding: "0 22px 22px", color: "var(--fg-muted)", fontSize: 15, lineHeight: 1.6 }}>{a}</div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".faq-left", { x: -50, opacity: 0 }, {
      x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 75%", once: true },
    });
    gsap.fromTo(".faq-item", { x: 40, opacity: 0 }, {
      x: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out",
      scrollTrigger: { trigger: ".faq-list", start: "top 80%", once: true },
    });
  }, { scope: container });

  return (
    <section ref={container} id="faq" className="section" style={{ background: "var(--bg-alt)" }}>
      <BgGlow variant="edge" opacity={0.5} />
      <div className="container" style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 64, alignItems: "start" }} className="stack-md">
          <div className="faq-left">
            <div className="cm-eyebrow">Dúvidas</div>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg)",
              fontSize: "clamp(28px, 3.6vw, 44px)", lineHeight: 1.05, letterSpacing: "-0.02em",
              margin: "0 0 20px", textTransform: "uppercase",
            }}>
              Perguntas <span className="cm-emph" style={{ color: "var(--accent)" }}>frequentes</span>
            </h2>
            <p style={{ fontSize: 16, marginBottom: 28, color: "var(--fg-2)", lineHeight: 1.6 }}>
              Respondidas com transparência, sem promessas mágicas.
            </p>
            <PrimaryButton href="/contato">FALAR COM A EQUIPE</PrimaryButton>
          </div>

          <div className="faq-list" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {ITEMS.map((it, i) => (
              <div key={i} className="faq-item">
                <FAQItem q={it.q} a={it.a} open={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

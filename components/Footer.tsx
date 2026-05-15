"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function SocialIcon({ kind, href = "#" }: { kind: "instagram" | "linkedin" | "whatsapp"; href?: string }) {
  const [hover, setHover] = useState(false);
  const paths: Record<string, React.ReactNode> = {
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></>,
    linkedin:  <><rect x="3" y="3" width="18" height="18" rx="3"/><line x1="8" y1="11" x2="8" y2="17"/><circle cx="8" cy="8" r="1" fill="currentColor" stroke="none"/><path d="M12 17v-4a2 2 0 0 1 4 0v4"/></>,
    whatsapp:  <><path d="M3.5 20.5L5 16a9 9 0 1 1 3.2 3.2L3.5 20.5z"/><path d="M9 10c0 3 2 5 5 5l1.5-1.5-2-1L12 14c-1 0-2-1-2-2l1.5-1.5-1-2L9 10z" fill="currentColor" stroke="none"/></>,
  };
  return (
    <a href={href} target={kind === "whatsapp" ? "_blank" : undefined} rel="noreferrer"
      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "rgba(255,0,0,0.4)"; setHover(true); }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--fg-muted)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; setHover(false); }}
      style={{
        width: 36, height: 36, borderRadius: 8, background: "var(--surface)",
        border: "1px solid rgba(255,255,255,0.06)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        color: "var(--fg-muted)", transition: "color 120ms ease, border-color 120ms ease",
      }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[kind]}</svg>
    </a>
  );
}

function FL({ children, href = "#" }: { children: React.ReactNode; href?: string }) {
  return (
    <Link href={href}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
      style={{ color: "var(--fg-muted)", fontSize: 14, padding: "4px 0", display: "block", transition: "color 120ms ease" }}>
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer style={{ position: "relative", background: "var(--bg)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "72px 0 28px", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "var(--glow-edge)", opacity: 0.55, pointerEvents: "none" }} />
      <div className="container" style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.1fr", gap: 40 }} className="stack-md">
          <div>
            <Image src="/assets/logo-df-2x.png" alt="DF COMPANY" width={176} height={64} quality={100} style={{ height: 32, width: "auto" }} />
            <p style={{ marginTop: 18, maxWidth: 320, color: "var(--fg-muted)", fontSize: 14, lineHeight: 1.6 }}>
              Transformamos tráfego em vendas previsíveis para empresas que querem crescer de verdade.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <SocialIcon kind="instagram" href="https://instagram.com/euojaovitorr" />
              <SocialIcon kind="linkedin" href="https://linkedin.com" />
              <SocialIcon kind="whatsapp" href="https://wa.me/5592991220748" />
            </div>
          </div>
          <div>
            <h4 style={{ color: "#fff", fontSize: 15, fontWeight: 600, margin: "0 0 14px" }}>Navegação</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <FL href="/">Home</FL>
              <FL href="/servicos">Serviços</FL>
              <FL href="/contato">Contato</FL>
            </div>
          </div>
          <div>
            <h4 style={{ color: "#fff", fontSize: 15, fontWeight: 600, margin: "0 0 14px" }}>Serviços</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <FL href="/servicos">Meta Ads</FL>
              <FL href="/servicos">Google Ads</FL>
              <FL href="/servicos">TikTok Ads</FL>
              <FL href="/servicos">LinkedIn Ads</FL>
              <FL href="/servicos">Landing Pages</FL>
              <FL href="/servicos">CRM + IA</FL>
            </div>
          </div>
          <div>
            <h4 style={{ color: "#fff", fontSize: 15, fontWeight: 600, margin: "0 0 14px" }}>Contato</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, color: "var(--fg-muted)", fontSize: 14 }}>
              {[
                { icon: <><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 7l10 6 10-6"/></>, text: "contato@dfcompany.com.br" },
                { icon: <path d="M22 16.92V21a1 1 0 0 1-1.11 1A19.86 19.86 0 0 1 2 4.11 1 1 0 0 1 3 3h4.09a1 1 0 0 1 1 .75l1 4a1 1 0 0 1-.29 1L7 10.5a16 16 0 0 0 6.5 6.5l1.75-1.75a1 1 0 0 1 1-.29l4 1a1 1 0 0 1 .75 1z"/>, text: "(92) 99122-0748" },
                { icon: <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>, text: "Florianópolis, SC — Brasil" },
              ].map(({ icon, text }) => (
                <span key={text} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 56, paddingTop: 22,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", flexWrap: "wrap", gap: 12,
          justifyContent: "space-between", alignItems: "center",
          color: "var(--fg-soft)", fontSize: 13,
        }}>
          <span>© 2026 DF COMPANY · João Vitor · Todos os direitos reservados.</span>
          <div style={{ display: "flex", gap: 24 }}>
            <FL>Política de Privacidade</FL>
            <FL>Termos de Uso</FL>
          </div>
        </div>
      </div>
    </footer>
  );
}

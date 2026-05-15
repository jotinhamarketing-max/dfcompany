"use client";
import { useState, type CSSProperties, type ReactNode } from "react";

/* ── Eyebrow ─────────────────────────────────────────────── */
export function Eyebrow({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <div className="cm-eyebrow" style={{ color }}>
      {children}
    </div>
  );
}

/* ── Headline ────────────────────────────────────────────── */
export function Headline({
  children, level = 2, align = "left", uppercase = false, size, style = {},
}: {
  children: ReactNode; level?: 1 | 2 | 3; align?: CSSProperties["textAlign"];
  uppercase?: boolean; size?: string; style?: CSSProperties;
}) {
  const Tag = (level === 1 ? "h1" : level === 3 ? "h3" : "h2") as "h1" | "h2" | "h3";
  const cls = level === 1 ? "cm-h1" : level === 3 ? "cm-h3" : "cm-h2";
  return (
    <Tag className={cls} style={{
      textAlign: align, textTransform: uppercase ? "uppercase" : undefined,
      margin: 0, fontSize: size, lineHeight: 1.05, ...style,
    }}>
      {children}
    </Tag>
  );
}

/* ── Emph span ───────────────────────────────────────────── */
export function Emph({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <span className="cm-emph" style={{ color: "var(--accent)", ...style }}>{children}</span>;
}

/* ── PrimaryButton ───────────────────────────────────────── */
type BtnSize = "sm" | "md" | "lg";
const BTN = {
  sm: { padX: 14, padY: 10, font: 12, chip: 22, icon: 12, gap: 8, radius: 8 },
  md: { padX: 22, padY: 14, font: 13, chip: 30, icon: 14, gap: 12, radius: 10 },
  lg: { padX: 28, padY: 18, font: 14, chip: 36, icon: 16, gap: 14, radius: 12 },
};

export function PrimaryButton({
  children = "QUERO VENDER MAIS", size = "md", href, onClick, fullWidth = false, icon = "arrow", type = "button",
}: {
  children?: ReactNode; size?: BtnSize; href?: string; onClick?: () => void;
  fullWidth?: boolean; icon?: "arrow" | "whatsapp"; type?: "button" | "submit";
}) {
  const s = BTN[size];
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const bg = press ? "var(--flame-700)" : hover ? "var(--flame-400)" : "var(--flame-500)";

  const innerIcon = icon === "whatsapp" ? (
    <svg width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="#fff">
      <path d="M3.5 20.5L5 16a9 9 0 1 1 3.2 3.2L3.5 20.5z" fill="none" stroke="#fff" strokeWidth="1.6"/>
      <path d="M9 10c0 3 2 5 5 5l1.5-1.5-2-1L12 14c-1 0-2-1-2-2l1.5-1.5-1-2L9 10z" fill="#fff" stroke="none"/>
    </svg>
  ) : (
    <svg width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 7L7 17"/><path d="M17 17H7V7"/>
    </svg>
  );

  const style: CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: s.gap,
    background: bg, color: "#fff",
    fontFamily: "var(--font-body)", fontWeight: 700, fontSize: s.font,
    letterSpacing: "0.08em", textTransform: "uppercase",
    padding: `${s.padY}px ${s.padY}px ${s.padY}px ${s.padX}px`,
    border: "none", borderRadius: s.radius, textDecoration: "none",
    cursor: "pointer",
    boxShadow: hover ? "var(--shadow-flame)" : "0 6px 18px rgba(255,0,0,0.18)",
    transform: press ? "translateY(0)" : hover ? "translateY(-2px)" : "translateY(0)",
    transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), background var(--dur-fast) var(--ease-out)",
    width: fullWidth ? "100%" : "auto", justifyContent: fullWidth ? "center" : "flex-start",
  };

  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => { setHover(false); setPress(false); },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
  };

  if (href) return (
    <a href={href} style={style} {...handlers}><span>{children}</span><BtnChip s={s}>{innerIcon}</BtnChip></a>
  );
  return (
    <button type={type} onClick={onClick} style={style} {...handlers}><span>{children}</span><BtnChip s={s}>{innerIcon}</BtnChip></button>
  );
}

function BtnChip({ children, s }: { children: ReactNode; s: typeof BTN.md }) {
  return (
    <span aria-hidden style={{
      width: s.chip, height: s.chip, borderRadius: 6,
      background: "var(--flame-700)",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)", flexShrink: 0,
    }}>{children}</span>
  );
}

/* ── GhostButton ─────────────────────────────────────────── */
export function GhostButton({ children, href, onClick, size = "md" }: {
  children: ReactNode; href?: string; onClick?: () => void; size?: "sm" | "md" | "lg";
}) {
  const [hover, setHover] = useState(false);
  const padding = size === "lg" ? "14px 22px" : "10px 18px";
  const style: CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: hover ? "rgba(255,255,255,0.05)" : "transparent",
    color: "var(--fg)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13,
    padding, border: "1px solid var(--border-strong)", borderRadius: 10,
    cursor: "pointer", textDecoration: "none", letterSpacing: "0.04em",
    transition: "background var(--dur-fast) var(--ease-out)",
  };
  const handlers = { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) };
  if (href) return <a href={href} style={style} {...handlers}>{children}</a>;
  return <button type="button" onClick={onClick} style={style} {...handlers}>{children}</button>;
}

/* ── Card ────────────────────────────────────────────────── */
export function Card({
  children, padding = 32, radius = 18, horn = false, raised = false,
  hover: hoverProp = false, style = {}, className,
}: {
  children: ReactNode; padding?: number; radius?: number; horn?: boolean;
  raised?: boolean; hover?: boolean; style?: CSSProperties; className?: string;
}) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => hoverProp && setH(true)}
      onMouseLeave={() => hoverProp && setH(false)}
      className={className}
      style={{
        position: "relative",
        background: raised ? "var(--surface-raised)" : "var(--surface)",
        borderRadius: radius, padding,
        border: `1px solid ${h ? "rgba(255,0,0,0.25)" : "rgba(255,255,255,0.05)"}`,
        boxShadow: h ? "0 18px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,0,0,0.08)" : "var(--shadow-card)",
        transform: h ? "translateY(-3px)" : "translateY(0)",
        transition: "transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
        ...style,
      }}
    >
      {horn && (
        <span aria-hidden style={{
          position: "absolute", inset: "0 0 auto 0", height: 1,
          background: "var(--card-horn)", borderRadius: `${radius}px ${radius}px 0 0`,
          pointerEvents: "none",
        }} />
      )}
      {children}
    </div>
  );
}

/* ── IconTile ────────────────────────────────────────────── */
export function IconTile({ size = 44, radius = 10, children }: {
  size?: number; radius?: number; children: ReactNode;
}) {
  return (
    <span style={{
      width: size, height: size, borderRadius: radius, background: "var(--flame-500)",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 6px 14px rgba(255,0,0,0.28)",
      color: "#fff", flexShrink: 0,
    }}>{children}</span>
  );
}

/* ── StatPill ────────────────────────────────────────────── */
export function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "8px 14px", background: "var(--surface)",
      border: "1px solid rgba(255,255,255,0.06)", borderRadius: 999,
      fontSize: 13, color: "var(--fg-2)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
    }}>
      <strong style={{ color: "var(--accent)", fontWeight: 700 }}>+ {value}</strong>
      <span>{label}</span>
    </span>
  );
}

/* ── BgGlow ──────────────────────────────────────────────── */
export function BgGlow({ variant = "edge", opacity = 0.7 }: { variant?: "edge" | "corner"; opacity?: number }) {
  return (
    <div aria-hidden style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      background: variant === "corner" ? "var(--glow-corner)" : "var(--glow-edge)",
      opacity,
    }} />
  );
}

/* ── SVC_ICONS ───────────────────────────────────────────── */
export const SVC_ICONS: Record<string, ReactNode> = {
  meta: <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M12 4c-3 0-5 2-7 6 2 4 4 6 7 6s5-2 7-6c-2-4-4-6-7-6zm0 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>,
  google: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>,
  tiktok: <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M14 4v8.5a3.5 3.5 0 1 1-3.5-3.5V12a1.5 1.5 0 1 0 1.5 1.5V4h2a4 4 0 0 0 4 4v2a6 6 0 0 1-4-1.5z"/></svg>,
  linkedin: <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><rect x="3" y="9" width="4" height="11"/><circle cx="5" cy="5" r="2"/><path d="M10 9h4v2c.7-1.2 2-2 4-2 3 0 4 2 4 5v6h-4v-5c0-1.5-.5-2.5-2-2.5s-2 1-2 2.5V20h-4z"/></svg>,
  page: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>,
  web: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M8 4v14"/></svg>,
  crm: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3 20c1-3 3.5-4.5 6-4.5s5 1.5 6 4.5"/><circle cx="17" cy="9" r="2"/><path d="M15 20c.5-2 2-3 3.5-3s3 1 3.5 3"/></svg>,
  ai: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="6" width="16" height="13" rx="3"/><path d="M9 11v3M15 11v3"/><path d="M12 3v3M8 19l-1 2M16 19l1 2"/></svg>,
  report: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V8M10 20V4M16 20v-8M22 20H2"/></svg>,
  strategy: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6"/></svg>,
};

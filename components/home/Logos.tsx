"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const LOGOS = [
  "https://i.ibb.co/LXXDj3Sm/485269994-656005816829402-2190523986701263318-n.webp",
  "https://i.ibb.co/hx1sXkjm/670837709-17931332664237613-4642775894198371647-n.webp",
  "https://i.ibb.co/6cZMwS65/311499924-830860564716688-1131104423509042216-n.webp",
  "https://i.ibb.co/N61s0ddf/158608544-157763812859920-8620214480285475426-n.webp",
  "https://i.ibb.co/JFSnLTRg/508307172-18463365418076386-5660713790926612214-n.webp",
  "https://i.ibb.co/sXPd8nB/375047534-290337820362318-1093504319075902838-n.webp",
  "https://i.ibb.co/gFrLKmCM/129142440-401324357582296-7497181281580672836-n.webp",
  "https://i.ibb.co/ynTGCHt6/573551125-17966163341977024-6952450134439579195-n.webp",
  "https://i.ibb.co/sv3swWDj/467543439-1302356024450352-5112039911750446584-n.webp",
  "https://i.ibb.co/DDwyMw31/697091938-17999799923943078-7941792671990499524-n.webp",
  "https://i.ibb.co/S4J4jpFH/641634291-18566146147013556-7142478410328758319-n.webp",
  "https://i.ibb.co/VpPp94KN/607518016-18157340986415178-7269852632466483976-n.webp",
  "https://i.ibb.co/Gfx3tjNn/642515367-18536903566067007-6744568193794196477-n.webp",
];

const ALL = [...LOGOS, ...LOGOS];

export default function Logos() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".logos-title", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: ".logos-title", start: "top 85%", once: true },
    });
    gsap.fromTo(".logo-marquee", { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: ".logo-marquee", start: "top 90%", once: true },
    });
  }, { scope: container });

  return (
    <section ref={container} className="section" style={{ background: "var(--bg)", padding: "84px 0" }}>
      <div className="container">
        <div className="logos-title" style={{ textAlign: "center", marginBottom: 44 }}>
          <div className="cm-eyebrow">Quem confia</div>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg)",
            fontSize: "clamp(26px, 3.4vw, 40px)", lineHeight: 1.05, letterSpacing: "-0.02em",
            margin: 0, textTransform: "uppercase",
          }}>
            Empresas que <span className="cm-emph" style={{ color: "var(--accent)" }}>confiam no nosso trabalho</span>
          </h2>
          <p style={{ marginTop: 14, fontSize: 15, color: "var(--fg-2)" }}>
            Parceiros reais que escolheram tráfego com método e resultado.
          </p>
        </div>

        <div className="logo-marquee">
          <div className="track">
            {ALL.map((src, i) => (
              <span key={i} className="logo-tile">
                <img src={src} alt="Parceiro DF COMPANY" loading="lazy" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function WhatsAppFloat() {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    gsap.fromTo(ref.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)", delay: 1.5 }
    );
    gsap.to(ref.current, {
      y: -6, duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.1,
    });
  }, { scope: ref });

  return (
    <a ref={ref} className="wa-float" href="https://wa.me/5592991220748" target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp">
      <svg width="26" height="26" viewBox="0 0 48 48" fill="none">
        <path fill="#fff" fillRule="evenodd" d="M19.2 16.6c-.4-.9-.8-.9-1.2-.9h-1c-.4 0-1 .1-1.5.7-.5.5-2 2-2 4.8 0 2.9 2.1 5.6 2.4 6 .3.3 4 6.4 9.9 8.7 4.9 1.9 5.9 1.5 7 1.4 1-.1 3.3-1.4 3.8-2.7.4-1.3.4-2.4.3-2.7-.1-.2-.5-.4-1-.6l-3.5-1.7c-.5-.3-.8-.4-1.2.1l-1.7 2.1c-.3.4-.6.4-1.1.2-2.2-.9-4.5-2.5-6.2-5.2-.5-.8-.1-1.1.2-1.5l1.2-1.5c.3-.4.4-.8.2-1.2l-1.4-3.5-.2-.5z"/>
        <path fill="#fff" d="M24 4C13 4 4 13 4 24c0 3.6 1 7 2.7 9.9L4 44l10.4-2.7A20 20 0 0 0 24 44c11 0 20-9 20-20S35 4 24 4zm0 36a16 16 0 0 1-8.2-2.2l-.7-.4-6.3 1.6 1.7-6.1-.4-.7A16 16 0 1 1 24 40z"/>
      </svg>
    </a>
  );
}

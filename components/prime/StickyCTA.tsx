"use client";

import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { WhatsAppIcon, CalendarIcon } from "./ui/Icons";

export default function StickyCTA({ hidden }: { hidden: boolean }) {
  const [visible, setVisible] = useState(false);

  // Reveal after the user scrolls past the hero.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const show = visible && !hidden;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      } transition-transform duration-300`}
      style={{ paddingBottom: "var(--safe-bottom)" }}
      aria-hidden={!show}
    >
      <div className="mx-3 mb-3 flex gap-2 rounded-2xl border border-forest-700/10 bg-ivory/95 p-2 shadow-float backdrop-blur">
        <a
          href={whatsappUrl({ kind: "general" })}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("prime_whatsapp_click", { source: "sticky" })}
          className="btn-green flex-1"
          tabIndex={show ? 0 : -1}
        >
          <WhatsAppIcon width={18} height={18} />
          WhatsApp
        </a>
        <a
          href={whatsappUrl({ kind: "site-visit" })}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("prime_site_visit_open", { source: "sticky" })}
          className="btn-outline flex-1"
          tabIndex={show ? 0 : -1}
        >
          <CalendarIcon width={17} height={17} />
          Site Visit
        </a>
      </div>
    </div>
  );
}

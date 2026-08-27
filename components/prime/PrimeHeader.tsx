"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { WhatsAppIcon, CalendarIcon } from "./ui/Icons";

const NAV = [
  { label: "Story", href: "#story" },
  { label: "Plantation", href: "#plantation" },
  { label: "Water", href: "#water" },
  { label: "Location", href: "#location" },
  { label: "Plots", href: "#plots" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
];

export default function PrimeHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wa = whatsappUrl({ kind: "general" });
  const waSiteVisit = whatsappUrl({ kind: "site-visit" });
  const tone = scrolled ? "dark" : "light";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "bg-ivory/95 shadow-[0_1px_0_rgba(31,64,41,0.08)] backdrop-blur"
          : "bg-gradient-to-b from-black/45 to-transparent"
      }`}
    >
      <div className="prime-container flex h-16 items-center justify-between">
        <a href="#top" aria-label="Malnad Realty PRIME — home">
          <Logo tone={tone} />
        </a>

        <div className="flex items-center gap-2.5">
          {/* WhatsApp — white pill */}
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Malnad Realty on WhatsApp"
            onClick={() => track("prime_whatsapp_click", { source: "header" })}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#25D366] px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#1ebe5b]"
          >
            <WhatsAppIcon width={18} height={18} className="text-white" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Site Visit — WhatsApp (desktop/tablet) */}
          <a
            href={waSiteVisit}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("prime_site_visit_open", { source: "header" })}
            className="hidden min-h-[40px] items-center gap-2 rounded-lg bg-forest-500 px-4 py-2 text-xs font-semibold text-ivory transition-colors hover:bg-forest-600 sm:inline-flex"
          >
            <CalendarIcon width={15} height={15} />
            Site Visit
          </a>
        </div>
      </div>

    </header>
  );
}

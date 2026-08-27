"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { WhatsAppIcon, MenuIcon, CloseIcon, CalendarIcon } from "./ui/Icons";

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
  const [menuOpen, setMenuOpen] = useState(false);

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

          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-lg lg:hidden ${
              scrolled ? "text-forest-800" : "text-ivory"
            }`}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 top-16 z-50 lg:hidden animate-fade-in bg-forest-950/95 backdrop-blur overflow-y-auto">
          <nav
            className="flex flex-col gap-1 px-6 py-6"
            aria-label="Mobile"
            onClick={(e) => e.stopPropagation()}
          >
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/10 py-3.5 text-lg font-medium text-ivory"
                >
                  {n.label}
                </a>
              ))}
              <a
                href={waSiteVisit}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setMenuOpen(false);
                  track("prime_site_visit_open", { source: "mobile_menu" });
                }}
                className="btn-green mt-4 w-full"
              >
                Plan a Site Visit
              </a>
            </nav>
        </div>
      )}
    </header>
  );
}

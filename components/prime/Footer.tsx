"use client";

import { usePrime } from "./PrimeContext";
import Logo from "./Logo";
import { PinIcon } from "./ui/Icons";

export default function Footer() {
  const { property } = usePrime();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-forest-950 pb-24 pt-14 text-center text-ivory lg:pb-14">
      <div className="prime-container">
        <div className="flex flex-col gap-8">
          <div>
            <div className="flex justify-center">
              <Logo tone="light" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ivory/55">
              Curated property opportunities across the {property.region}.
            </p>
          </div>

          <div className="text-sm">
            <p className="flex items-center justify-center gap-2 font-semibold text-ivory">
              <PinIcon width={16} height={16} className="text-moss" />
              {property.location} · {property.taluk} · {property.district}
            </p>
            <nav className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-ivory/60">
              <a href="#story" className="hover:text-ivory">Story</a>
              <a href="#plantation" className="hover:text-ivory">Plantation</a>
              <a href="#location" className="hover:text-ivory">Location</a>
              <a href="#plots" className="hover:text-ivory">Plots</a>
              <a href="#gallery" className="hover:text-ivory">Gallery</a>
              <a href="#faq" className="hover:text-ivory">FAQ</a>
            </nav>
          </div>

          <div className="text-xs leading-relaxed text-ivory/45">
            <p>
              Property information, pricing and availability are subject to verification and
              change. Buyers are advised to independently verify relevant property, legal and
              regulatory details before completing a transaction.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-ivory/40">
          <p>© {year} Malnad Realty PRIME. All rights reserved.</p>
          <p>14 Acres · 6 Plots · One Established Plantation</p>
        </div>
      </div>
    </footer>
  );
}

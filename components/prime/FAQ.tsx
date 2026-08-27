"use client";

import { useState } from "react";
import { usePrime } from "./PrimeContext";
import Reveal from "./ui/Reveal";
import { track } from "@/lib/analytics";

export default function FAQ() {
  const { property } = usePrime();
  const [open, setOpen] = useState<Set<number>>(new Set());

  const toggle = (i: number, q: string) => {
    setOpen((cur) => {
      const next = new Set(cur);
      if (next.has(i)) next.delete(i);
      else {
        next.add(i);
        track("prime_faq_open", { question: q });
      }
      return next;
    });
  };

  const allOpen = open.size === property.faq.length;
  const toggleAll = () =>
    setOpen(allOpen ? new Set() : new Set(property.faq.map((_, i) => i)));

  return (
    <section id="faq" className="scroll-mt-16 bg-cream py-16 sm:py-24">
      <div className="prime-container">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-3">FAQ</p>
              <h2 className="text-3xl font-bold tracking-tight text-forest-900 sm:text-4xl">
                Before You Reach Out.
              </h2>
            </div>
            <button
              type="button"
              onClick={toggleAll}
              className="btn-green !min-h-[44px] !px-5 text-xs"
            >
              {allOpen ? "Collapse All" : "View All Answers"}
            </button>
          </div>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          {property.faq.map((f, i) => {
            const isOpen = open.has(i);
            return (
              <div key={f.q} className="border-b border-forest-700/12">
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(i, f.q)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-3 py-4 text-left"
                  >
                    <span className="text-[14px] font-semibold text-forest-900">{f.q}</span>
                    <span
                      className={`flex h-6 w-6 flex-none items-center justify-center rounded-full text-forest-600 transition-transform duration-300 ${
                        isOpen ? "rotate-45 bg-forest-500/12" : "bg-forest-500/8"
                      }`}
                      aria-hidden
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-4 text-[13px] leading-relaxed text-forest-900/65">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

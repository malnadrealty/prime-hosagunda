"use client";

import { useState } from "react";
import { usePrime } from "./PrimeContext";
import Reveal from "./ui/Reveal";
import type { PublicPlot } from "@/config/types";
import {
  formatPriceINR,
  formatRupees,
  formatGunta,
  formatAcresApprox,
  formatDate,
} from "@/lib/format";
import { track } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon, StarIcon } from "./ui/Icons";

export default function PlotInventory() {
  const { property, plots: initialPlots, lastUpdated: initialUpdated, source } = usePrime();

  const [plots, setPlots] = useState<PublicPlot[]>(initialPlots);
  const [updated, setUpdated] = useState<string | null>(initialUpdated);
  const [refreshing, setRefreshing] = useState(false);
  const [errored, setErrored] = useState(source === "error");

  const refresh = async () => {
    setRefreshing(true);
    try {
      const res = await fetch(`/api/inventory?slug=${property.slug}`, { cache: "no-store" });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (Array.isArray(data.plots)) {
        setPlots(data.plots);
        setUpdated(data.lastUpdated);
        setErrored(data.source === "error");
      }
    } catch {
      setErrored(true);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <section id="plots" className="scroll-mt-16 bg-cream py-16 sm:py-24">
      <div className="prime-container">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-3">{property.plotInventory.headingKannada}</p>
              <h2 className="text-h2 text-forest-900">
                {property.plotInventory.subheadingKannada}
              </h2>
              <p className="mt-2 text-body text-forest-900/70">
                Current Availability &amp; Pricing
              </p>
            </div>
            <button
              type="button"
              onClick={refresh}
              disabled={refreshing}
              className="rounded-lg border border-forest-700/20 px-3.5 py-2 text-tiny font-semibold text-forest-700 transition-colors hover:bg-forest-700/5 disabled:opacity-50"
            >
              {refreshing ? "Refreshing…" : "Refresh availability"}
            </button>
          </div>
        </Reveal>

        {errored && (
          <p className="mt-6 rounded-lg border border-brand-red/20 bg-brand-red/5 px-4 py-3 text-label text-forest-900/70">
            Availability is temporarily being updated. Please contact Malnad Realty for the
            latest status.
          </p>
        )}

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {plots.map((plot, i) => {
            const available = plot.status === "AVAILABLE";
            const booked = plot.status === "BOOKED";
            const reserved = plot.status === "HOLD" || plot.status === "RESERVED";
            const sold = plot.status === "SOLD";
            const premium = property.premiumPlots?.includes(plot.plotNumber) ?? false;
            const gunta = formatGunta(plot.areaGunta);

            // Status-based colors: Available (white), Booked (blue), Reserved (orange), Sold (gray)
            const statusBgClass = premium
              ? "border-forest-500/40 bg-forest-900 text-ivory ring-1 ring-forest-500/30"
              : available
                ? "border-blue-200/40 bg-white"
                : booked
                  ? "border-blue-300/50 bg-blue-50"
                  : reserved
                    ? "border-orange-300/50 bg-orange-50"
                    : sold
                      ? "border-gray-300/50 bg-gray-50"
                      : "border-forest-700/10 bg-white";

            const statusTextClass = premium
              ? "text-forest-500"
              : available
                ? "text-forest-500"
                : booked
                  ? "text-blue-600"
                  : reserved
                    ? "text-orange-600"
                    : sold
                      ? "text-gray-600"
                      : "text-forest-500";

            return (
              <Reveal key={plot.plotNumber} delay={(i % 6) * 40}>
                <article
                  className={`relative flex h-full flex-col rounded-xl2 border p-4 shadow-card transition-shadow hover:shadow-float ${statusBgClass}`}
                >
                  {premium && (
                    <span className="absolute -top-2.5 left-4 inline-flex items-center gap-1 rounded-full bg-brand-red px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                      <StarIcon width={10} height={10} />
                      {property.premiumLabel ?? "PRIME"}
                    </span>
                  )}

                  <div className={`flex items-center justify-between ${premium ? "mt-1.5" : ""}`}>
                    <p className={`text-tiny font-bold uppercase tracking-[0.16em] ${premium ? "text-moss" : statusTextClass}`}>
                      Plot {plot.plotNumber}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${premium ? "text-ivory/50" : statusTextClass}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          premium
                            ? "bg-moss"
                            : available
                              ? "bg-blue-500"
                              : booked
                                ? "bg-blue-500"
                                : reserved
                                  ? "bg-orange-500"
                                  : sold
                                    ? "bg-gray-500"
                                    : "bg-forest-500"
                        }`}
                      />
                      {plot.status}
                    </span>
                  </div>

                  <p className={`mt-2 text-h3 font-extrabold leading-tight tracking-tight ${premium ? "text-ivory" : "text-forest-900"}`}>
                    {gunta ?? `${plot.areaAcres.toFixed(2)} Acres`}
                  </p>
                  <p className={`text-tiny ${premium ? "text-ivory/50" : "text-forest-900/70"}`}>
                    {formatAcresApprox(plot.areaAcres)}
                  </p>

                  <dl className={`mt-3 space-y-1 border-t pt-3 text-label ${
                    premium
                      ? "border-white/10"
                      : booked
                        ? "border-blue-200/50"
                        : reserved
                          ? "border-orange-200/50"
                          : sold
                            ? "border-gray-200/50"
                            : "border-forest-700/8"
                  }`}>
                    <div className="flex items-center justify-between">
                      <dt className={premium ? "text-ivory/55" : "text-forest-900/70"}>/ Gunta</dt>
                      <dd className={`font-semibold ${premium ? "text-ivory" : "text-forest-900"}`}>
                        {formatRupees(plot.pricePerGunta)}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <dt className={premium ? "text-ivory/55" : "text-forest-900/70"}>Total</dt>
                      <dd className={`text-base font-extrabold ${premium ? "text-moss" : "text-forest-600"}`}>
                        {formatPriceINR(plot.totalPrice)}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-3 flex-1" />

                  {available ? (
                    <a
                      href={whatsappUrl({ kind: "plot", plotNumber: plot.plotNumber, action: "interest" })}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        track("prime_plot_interest", {
                          source: "inventory_card",
                          plot_number: plot.plotNumber,
                          premium,
                        })
                      }
                      className="btn-green mt-1 w-full !min-h-[42px] !px-3 !py-2 text-tiny"
                    >
                      <WhatsAppIcon width={14} height={14} />
                      I&apos;m Interested
                    </a>
                  ) : (
                    <p
                      className={`mt-1 rounded-lg py-2.5 text-center text-tiny font-medium ${
                        premium ? "bg-white/5 text-ivory/55" : "bg-forest-700/5 text-forest-900/70"
                      }`}
                    >
                      Currently {plot.status.toLowerCase()}
                    </p>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-tiny text-forest-900/70">
          <span>{property.pricing.updatedNote}</span>
          {updated && (
            <>
              <span aria-hidden>·</span>
              <span>Last updated: {formatDate(updated)}</span>
            </>
          )}
        </p>
      </div>
    </section>
  );
}

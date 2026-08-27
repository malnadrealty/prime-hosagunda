"use client";

import { usePrime } from "./PrimeContext";
import { whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import {
  formatPriceINR,
  formatRupees,
  formatGunta,
  formatAcresApprox,
} from "@/lib/format";
import { WhatsAppIcon, StarIcon } from "./ui/Icons";

// Shared parcel detail body (desktop masterplan side panel). The CTA opens
// WhatsApp directly — no form.
export default function PlotDetail({
  plotNumber,
  variant = "light",
}: {
  plotNumber: string;
  variant?: "light" | "dark";
}) {
  const { property, plotByNumber } = usePrime();
  const plot = plotByNumber(plotNumber);

  if (!plot) return null;

  const available = plot.status === "AVAILABLE";
  const premium = property.premiumPlots?.includes(plot.plotNumber) ?? false;
  const dark = variant === "dark";
  const gunta = formatGunta(plot.areaGunta);
  const wa = whatsappUrl({ kind: "plot", plotNumber: plot.plotNumber, action: "interest" });

  return (
    <div>
      {premium && (
        <span className="mb-3 inline-flex items-center gap-1 rounded-full bg-brand-red px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
          <StarIcon width={11} height={11} />
          {property.premiumLabel ?? "PRIME"} Parcel
        </span>
      )}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${dark ? "text-moss" : "text-forest-500"}`}>
            Plot {plot.plotNumber}
          </p>
          <p className={`mt-1 text-2xl font-extrabold tracking-tight ${dark ? "text-ivory" : "text-forest-900"}`}>
            {gunta ?? `${plot.areaAcres.toFixed(2)} Acres`}
          </p>
          <p className={`text-sm ${dark ? "text-ivory/55" : "text-forest-900/70"}`}>
            {formatAcresApprox(plot.areaAcres)}
          </p>
        </div>
        <span
          className={`status-pill ${
            available
              ? dark
                ? "bg-forest-500/15 text-moss"
                : "bg-forest-500/10 status-available"
              : dark
                ? "bg-white/10 status-booked"
                : "bg-black/5 status-booked"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${available ? "bg-forest-500" : "bg-[#8f8f8f]"}`} />
          {plot.status}
        </span>
      </div>

      <dl className={`mt-5 space-y-2.5 border-t pt-4 text-sm ${dark ? "border-white/10" : "border-forest-700/10"}`}>
        <div className="flex items-center justify-between">
          <dt className={dark ? "text-ivory/55" : "text-forest-900/70"}>Price per Gunta</dt>
          <dd className={`font-semibold ${dark ? "text-ivory" : "text-forest-900"}`}>
            {formatRupees(plot.pricePerGunta)}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className={dark ? "text-ivory/55" : "text-forest-900/70"}>Total price</dt>
          <dd className={`text-lg font-extrabold ${dark ? "text-moss" : "text-forest-600"}`}>
            {formatPriceINR(plot.totalPrice)}
          </dd>
        </div>
      </dl>

      {available ? (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            track("prime_plot_interest", { source: "plot_detail", plot_number: plot.plotNumber })
          }
          className="btn-green mt-5 w-full"
        >
          <WhatsAppIcon width={17} height={17} />
          I&apos;m Interested
        </a>
      ) : (
        <p className={`mt-5 rounded-lg px-4 py-3 text-sm ${dark ? "bg-white/5 text-ivory/70" : "bg-forest-700/5 text-forest-900/70"}`}>
          This parcel is currently {plot.status.toLowerCase()}. Explore the other available
          parcels, or contact Malnad Realty for the latest status.
        </p>
      )}
    </div>
  );
}

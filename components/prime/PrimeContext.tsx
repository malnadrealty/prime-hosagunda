"use client";

import { createContext, useContext } from "react";
import type { PropertyConfig, PublicPlot } from "@/config/types";

export type PrimeContextValue = {
  property: PropertyConfig;
  plots: PublicPlot[];
  lastUpdated: string | null;
  source: "sheet" | "seed" | "error";
  selectedPlot: string | null;
  selectPlot: (plotNumber: string | null) => void;
  openGallery: (index: number) => void;
  plotByNumber: (plotNumber: string) => PublicPlot | undefined;
};

export const PrimeContext = createContext<PrimeContextValue | null>(null);

export function usePrime(): PrimeContextValue {
  const ctx = useContext(PrimeContext);
  if (!ctx) throw new Error("usePrime must be used within PrimeContext provider");
  return ctx;
}

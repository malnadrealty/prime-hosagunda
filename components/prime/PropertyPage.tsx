"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { PropertyConfig, PublicInventory } from "@/config/types";
import { PrimeContext } from "./PrimeContext";
import { captureUtm } from "@/lib/utm";
import { track } from "@/lib/analytics";

import PrimeHeader from "./PrimeHeader";
import PrimeHero from "./PrimeHero";
import PropertyStats from "./PropertyStats";
import StorySection from "./StorySection";
import PlantationSection from "./PlantationSection";
import WaterSection from "./WaterSection";
import LocationSection from "./LocationSection";
import Masterplan from "./Masterplan";
import PlotInventory from "./PlotInventory";
import PricingTrustVideo from "./PricingTrustVideo";
import GallerySection from "./GallerySection";
import FAQ from "./FAQ";
import FinalCTA from "./FinalCTA";
import Footer from "./Footer";
import StickyCTA from "./StickyCTA";
import GalleryLightbox from "./GalleryLightbox";
import JsonLd from "./JsonLd";

export default function PropertyPage({
  property,
  inventory,
}: {
  property: PropertyConfig;
  inventory: PublicInventory;
}) {
  const [selectedPlot, setSelectedPlot] = useState<string | null>(null);
  const [gallery, setGallery] = useState<{ open: boolean; index: number }>({
    open: false,
    index: 0,
  });

  // First-touch UTM capture + page view.
  useEffect(() => {
    captureUtm();
    track("prime_page_view", { property_id: property.propertyId });
  }, [property.propertyId]);

  const plotByNumber = useCallback(
    (n: string) => inventory.plots.find((p) => p.plotNumber === n),
    [inventory.plots]
  );

  const selectPlot = useCallback((plotNumber: string | null) => {
    setSelectedPlot(plotNumber);
    if (plotNumber) {
      track("prime_masterplan_plot_select", { plot_number: plotNumber });
      // On mobile there's no side panel — take the tap to the plot's price card.
      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        document.getElementById("plots")?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const openGallery = useCallback((index: number) => {
    setGallery({ open: true, index });
    track("prime_gallery_open", { index });
  }, []);

  // Lock scroll while the (full-screen) gallery viewer is open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = gallery.open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [gallery.open]);

  const ctxValue = useMemo(
    () => ({
      property,
      plots: inventory.plots,
      lastUpdated: inventory.lastUpdated,
      source: inventory.source,
      selectedPlot,
      selectPlot,
      openGallery,
      plotByNumber,
    }),
    [property, inventory, selectedPlot, selectPlot, openGallery, plotByNumber]
  );

  return (
    <PrimeContext.Provider value={ctxValue}>
      <JsonLd property={property} />
      <PrimeHeader />
      <main id="top">
        <PrimeHero />
        <PropertyStats />
        <StorySection />
        <PlantationSection />
        <WaterSection />
        <LocationSection />
        <Masterplan />
        <PlotInventory />
        <PricingTrustVideo />
        <GallerySection />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />

      <StickyCTA hidden={gallery.open} />

      <GalleryLightbox
        open={gallery.open}
        index={gallery.index}
        items={property.gallery.items}
        onClose={() => setGallery((s) => ({ ...s, open: false }))}
        onIndex={(i) => setGallery({ open: true, index: i })}
      />
    </PrimeContext.Provider>
  );
}

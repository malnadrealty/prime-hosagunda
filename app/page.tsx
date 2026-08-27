import type { Metadata } from "next";
import { getProperty } from "@/config/properties";
import { getInventory, publicStatus } from "@/lib/inventory";
import type { PublicInventory } from "@/config/types";
import PropertyPage from "@/components/prime/PropertyPage";

export const dynamic = "force-static";
export const revalidate = 120;

export async function generateMetadata(): Promise<Metadata> {
  const property = getProperty("hosagunda");
  if (!property) return { title: "Not found" };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prime.malnadrealty.com";
  const url = `${siteUrl}/hosagunda`;
  return {
    title: property.seo.title,
    description: property.seo.description,
    keywords: property.seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: property.seo.title,
      description: property.seo.description,
      url,
      siteName: "Malnad Realty PRIME",
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: property.seo.title,
      description: property.seo.description,
    },
  };
}

export default async function Home() {
  const property = getProperty("hosagunda");
  if (!property) {
    return <div>Property not found</div>;
  }

  const inventory = await getInventory(property.propertyId);

  const publicInventory: PublicInventory = {
    plots: inventory.plots.map((p) => ({
      plotNumber: p.plotNumber,
      areaAcres: p.areaAcres,
      areaGunta: p.areaGunta,
      pricePerGunta: p.pricePerGunta,
      totalPrice: p.totalPrice,
      status: publicStatus(p.status),
    })),
    lastUpdated: inventory.lastUpdated,
    source: inventory.source,
  };

  return <PropertyPage property={property} inventory={publicInventory} />;
}

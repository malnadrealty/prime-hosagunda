import { NextResponse } from "next/server";
import { getInventory, publicStatus } from "@/lib/inventory";
import { properties } from "@/config/properties";

// Public inventory endpoint used by the client for a manual "refresh" without a
// full page reload. Only public-safe fields and collapsed statuses are exposed.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "hosagunda";
  const property = properties[slug];
  if (!property) {
    return NextResponse.json({ error: "Unknown property" }, { status: 404 });
  }

  const inventory = await getInventory(property.propertyId);
  const plots = inventory.plots.map((p) => ({
    plotNumber: p.plotNumber,
    areaAcres: p.areaAcres,
    areaGunta: p.areaGunta,
    pricePerGunta: p.pricePerGunta,
    totalPrice: p.totalPrice,
    status: publicStatus(p.status),
  }));

  return NextResponse.json(
    {
      propertyId: property.propertyId,
      plots,
      lastUpdated: inventory.lastUpdated,
      source: inventory.source,
    },
    {
      headers: { "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=120" },
    }
  );
}

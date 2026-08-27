// Context-aware WhatsApp deep links. The number is configured once via env.

export function whatsappNumber(): string {
  return (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");
}

type WaContext =
  | { kind: "general" }
  | { kind: "site-visit" }
  | { kind: "plot"; plotNumber: string; action?: "interest" | "site-visit" };

const PROPERTY_LABEL = "Hosagunda PRIME";

export function whatsappMessage(ctx: WaContext): string {
  switch (ctx.kind) {
    case "site-visit":
      return `Hi Malnad Realty, I am interested to visit this farmland plot in Hosagunda, Sagara Taluk. Please help me schedule a site visit.`;
    case "plot": {
      if (ctx.action === "site-visit") {
        return `Hi Malnad Realty, I am interested to visit Plot ${ctx.plotNumber} at ${PROPERTY_LABEL}. Please help me schedule a site visit.`;
      }
      return `Hi Malnad Realty, I am interested in Plot ${ctx.plotNumber} at ${PROPERTY_LABEL}. I have viewed the property details online and would like to know more and schedule a site visit.`;
    }
    case "general":
    default:
      return `Hi Malnad Realty, I am interested in the ${PROPERTY_LABEL} plantation property. I have gone through the property details and would like to know more.`;
  }
}

export function whatsappUrl(ctx: WaContext): string {
  const number = whatsappNumber();
  const text = encodeURIComponent(whatsappMessage(ctx));
  const base = number ? `https://wa.me/${number}` : "https://wa.me/";
  return `${base}?text=${text}`;
}

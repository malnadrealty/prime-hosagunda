import type { PropertyConfig } from "@/config/types";

// Accurate JSON-LD only: Organization + WebSite + BreadcrumbList + a FAQPage
// built from real Q&A. No fabricated ratings, reviews, prices or availability.
export default function JsonLd({ property }: { property: PropertyConfig }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prime.malnadrealty.com";
  const pageUrl = `${siteUrl}/${property.slug}`;

  const graph = [
    {
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      name: "Malnad Realty",
      brand: "Malnad Realty PRIME",
      areaServed: "Malnad region, Karnataka",
      url: siteUrl,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      url: siteUrl,
      name: "Malnad Realty PRIME",
      publisher: { "@id": `${siteUrl}#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Malnad Realty PRIME", item: siteUrl },
        { "@type": "ListItem", position: 2, name: property.name, item: pageUrl },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: property.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  const json = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      // JSON-LD injection is standard and safe here (static, no user input).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

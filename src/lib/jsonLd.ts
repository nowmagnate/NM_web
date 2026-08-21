import { brand } from "@/config/brand";
import { siteUrl } from "@/config/site";
import type { FaqItem } from "@/data/faq";

/**
 * Structured-data builders. Each returns a plain object matching schema.org,
 * rendered into a page via:
 *
 *   <script type="application/ld+json" dangerouslySetInnerHTML={{
 *     __html: JSON.stringify(organizationJsonLd()),
 *   }} />
 *
 * `dangerouslySetInnerHTML` is safe here specifically because every value
 * going in comes from our own typed config and data files, never from user
 * input — there is nothing here that could carry an injected script.
 */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    alternateName: brand.shortName,
    url: siteUrl,
    foundingDate: String(brand.foundedYear),
    description: brand.tagline,
    ...(brand.email.sales ? { email: brand.email.sales } : {}),
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    description,
    url: `${siteUrl}${path}`,
    provider: { "@type": "Organization", name: brand.name, url: siteUrl },
  };
}

/** For the $499 template offer specifically — a Product, not a Service, since it has a fixed price. */
export function templateProductJsonLd({
  name,
  description,
  path,
  imageUrl,
}: {
  name: string;
  description: string;
  path: string;
  imageUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: `${siteUrl}${path}`,
    image: imageUrl,
    brand: { "@type": "Brand", name: brand.name },
    offers: {
      "@type": "Offer",
      price: brand.templatePrice,
      priceCurrency: brand.templateCurrency,
      availability: "https://schema.org/InStock",
      url: `${siteUrl}${path}`,
    },
  };
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

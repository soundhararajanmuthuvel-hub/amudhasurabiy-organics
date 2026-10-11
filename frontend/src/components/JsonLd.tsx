interface JsonLdProps<T extends object = Record<string, unknown>> {
  type: "organization" | "product" | "breadcrumb" | "article" | "faq" | "recipe";
  data: T;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

export default function JsonLd<T extends object>({ type, data }: JsonLdProps<T>) {
  const d = data as Record<string, unknown>;
  let schema: Record<string, unknown> | null = null;

  if (type === "organization") {
    schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Amudhasurabiy Organics",
      "alternateName": ["Amudhasurabi", "Amuthasurabi", "Amudhasurabiy", "Blovit"],
      "url": "https://amudhasurabiy.com",
      "logo": "https://amudhasurabiy.com/images/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-70106-02115",
        "contactType": "customer service",
        "areaServed": "IN"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kumbakonam",
        "addressLocality": "Thanjavur District",
        "addressRegion": "Tamil Nadu",
        "postalCode": "612001",
        "addressCountry": "IN"
      },
      ...d
    };
  } else if (type === "product") {
    const additional = (d.additional as Record<string, unknown>) || {};
    const sku = (d.sku as string) || `BLV-${String(d.slug || d.id).toUpperCase()}-200G`;
    schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": d.name,
      "image": `https://amudhasurabiy.com${d.imageUrl}`,
      "description": d.description,
      "sku": sku,
      "mpn": sku,
      "weight": "200 g",
      "netWeight": {
        "@type": "QuantitativeValue",
        "value": 200,
        "unitCode": "GRM"
      },
      "brand": {
        "@type": "Brand",
        "name": "Blovit",
        "parentOrganization": {
          "@type": "Organization",
          "name": "Amudhasurabiy Organics"
        }
      },
      "offers": {
        "@type": "Offer",
        "price": d.price,
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "url": `https://amudhasurabiy.com/product/${d.slug}/`,
        "priceValidUntil": "2030-01-01",
        "seller": {
          "@type": "Organization",
          "name": "Amudhasurabiy Organics"
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "60",
            "currency": "INR"
          },
          "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": "IN"
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": 0,
              "maxValue": 1,
              "unitCode": "d"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": 1,
              "maxValue": 4,
              "unitCode": "d"
            }
          }
        }
      },
      "aggregateRating": d.rating ? {
        "@type": "AggregateRating",
        "ratingValue": d.rating,
        "reviewCount": d.reviewCount || 42
      } : undefined,
      ...additional
    };
  } else if (type === "breadcrumb") {
    const items = (d.items as BreadcrumbItem[]) || [];
    schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url.startsWith("http") ? item.url : `https://amudhasurabiy.com${item.url}`
      }))
    };
  } else if (type === "article") {
    const imageUrl = d.imageUrl as string | undefined;
    const publishedAt = d.publishedAt as string | undefined;
    const updatedAt = d.updatedAt as string | undefined;
    schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": d.title,
      "image": [
        imageUrl?.startsWith("http") ? imageUrl : `https://amudhasurabiy.com${imageUrl || "/images/logo.png"}`
      ],
      "datePublished": publishedAt || "2026-07-22T00:00:00Z",
      "dateModified": updatedAt || publishedAt || "2026-07-22T00:00:00Z",
      "author": {
        "@type": "Organization",
        "name": "Amudhasurabiy Organics",
        "url": "https://amudhasurabiy.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Amudhasurabiy Organics",
        "logo": {
          "@type": "ImageObject",
          "url": "https://amudhasurabiy.com/images/logo.png"
        }
      },
      "description": d.description
    };
  } else if (type === "faq") {
    const faqs = (d.faqs as FaqItem[]) || [];
    schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  } else if (type === "recipe") {
    const imageUrl = d.imageUrl as string | undefined;
    const ingredients = (d.ingredients as string[]) || [];
    const steps = (d.steps as string[]) || [];
    schema = {
      "@context": "https://schema.org",
      "@type": "Recipe",
      "name": d.title,
      "image": [
        imageUrl?.startsWith("http") ? imageUrl : `https://amudhasurabiy.com${imageUrl || "/images/logo.png"}`
      ],
      "author": {
        "@type": "Organization",
        "name": "Blovit Kitchen by Amudhasurabiy Organics"
      },
      "description": d.description,
      "prepTime": "PT5M",
      "recipeIngredient": ingredients,
      "recipeInstructions": steps.map((step) => ({
        "@type": "HowToStep",
        "text": step
      }))
    };
  }

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

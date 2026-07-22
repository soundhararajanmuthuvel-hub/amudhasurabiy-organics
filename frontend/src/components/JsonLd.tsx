import React from "react";

interface JsonLdProps {
  type: "organization" | "product" | "breadcrumb" | "article" | "faq" | "recipe";
  data: any;
}

export default function JsonLd({ type, data }: JsonLdProps) {
  let schema: any = null;

  if (type === "organization") {
    schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Amudhasurabiy Organics",
      "alternateName": "Blovit",
      "url": "https://amudhasurabiy.com",
      "logo": "https://amudhasurabiy.com/images/og-image.png",
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
      ...data
    };
  } else if (type === "product") {
    schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": data.name,
      "image": `https://amudhasurabiy.com${data.imageUrl}`,
      "description": data.description,
      "brand": {
        "@type": "Brand",
        "name": "Blovit"
      },
      "offers": {
        "@type": "Offer",
        "price": data.price,
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "url": `https://amudhasurabiy.com/product/${data.slug}/`,
        "priceValidUntil": "2030-01-01"
      },
      "aggregateRating": data.rating ? {
        "@type": "AggregateRating",
        "ratingValue": data.rating,
        "reviewCount": data.reviewCount || 100
      } : undefined,
      ...data.additional
    };
  } else if (type === "breadcrumb") {
    schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": data.items.map((item: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url.startsWith("http") ? item.url : `https://amudhasurabiy.com${item.url}`
      }))
    };
  } else if (type === "article") {
    schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": data.title,
      "image": [
        data.imageUrl.startsWith("http") ? data.imageUrl : `https://amudhasurabiy.com${data.imageUrl}`
      ],
      "datePublished": data.publishedAt || "2026-07-22T00:00:00Z",
      "dateModified": data.updatedAt || data.publishedAt || "2026-07-22T00:00:00Z",
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
          "url": "https://amudhasurabiy.com/images/og-image.png"
        }
      },
      "description": data.description
    };
  } else if (type === "faq") {
    schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": (data.faqs || []).map((faq: any) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  } else if (type === "recipe") {
    schema = {
      "@context": "https://schema.org",
      "@type": "Recipe",
      "name": data.title,
      "image": [
        data.imageUrl.startsWith("http") ? data.imageUrl : `https://amudhasurabiy.com${data.imageUrl}`
      ],
      "author": {
        "@type": "Organization",
        "name": "Blovit Kitchen"
      },
      "description": data.description,
      "prepTime": "PT5M",
      "recipeIngredient": data.ingredients || [],
      "recipeInstructions": (data.steps || []).map((step: string) => ({
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

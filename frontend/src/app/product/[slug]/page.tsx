import { Metadata } from "next";
import { getProductBySlug, getProducts } from "@/lib/api/products";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

export const revalidate = 300; // ISR: revalidate product details every 5 minutes

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return {
      title: "Product Not Found | Amudhasurabiy Organics",
    };
  }

  let title = `${product.name} — 200 g | Blovit Natural Malts`;
  let description = `${product.description} Pack size: 200 g. Amudhasurabiy Organics, Kumbakonam.`;

  if (slug === "abc-malt") {
    title = "Blovit ABC Malt — 200 g | Amudhasurabiy Organics";
    description = "A delicious blend of apple, beetroot and carrot in one convenient malt drink. Simply mix, sip and enjoy goodness in your everyday routine. 200 g pack.";
  } else if (slug === "beetroot-malt") {
    title = "Blovit Beetroot Malt — 200 g | Amudhasurabiy Organics";
    description = "Bring the goodness of beetroot to your daily drink with Blovit Beetroot Malt. An easy-to-prepare blend for a colourful, delicious everyday moment. 200 g pack.";
  } else if (slug === "nendram-banana-malt" || slug === "nendran-malt" || slug === "banana-malt") {
    title = "Blovit Nendran Banana Malt — 200 g | Amudhasurabiy Organics";
    description = "Enjoy the familiar taste of Nendran banana in a convenient malt drink. Easy to prepare and perfect for adding a little natural goodness to your day. 200 g pack.";
  }

  return {
    title,
    description,
    alternates: {
      canonical: `/product/${product.slug}/`,
    },
    openGraph: {
      title,
      description,
      url: `https://amudhasurabiy.com/product/${product.slug}/`,
      images: [
        {
          url: `https://amudhasurabiy.com${product.imageUrl}`,
          alt: `Blovit ${product.name} by Amudhasurabiy Organics`,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug;
  const slug = typeof rawSlug === "string" ? decodeURIComponent(rawSlug).replace(/\/$/, "") : "";
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  // Get related products
  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter((p) => p.slug !== product.slug);

  return (
    <ProductDetailClient product={product} relatedProducts={relatedProducts} />
  );
}

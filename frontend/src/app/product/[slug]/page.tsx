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

  let title = `Blovit ${product.name} | Amudhasurabiy Organics (Amudhasurabi)`;
  let description = `${product.description} Crafted by Amudhasurabiy Organics (also searched as Amudhasurabi, Amuthasurabi).`;

  if (slug === "abc-malt") {
    title = "Blovit ABC Malt | Amudhasurabiy Organics Apple Beetroot Carrot Malt";
    description = "Blovit ABC Malt by Amudhasurabiy Organics (also searched as Amudhasurabi, Amuthasurabi) combines Apple, Beetroot, and Carrot for 100% natural daily family energy.";
  } else if (slug === "beetroot-malt") {
    title = "Blovit Beetroot Malt | Amudhasurabiy Organics";
    description = "Blovit Beetroot Malt by Amudhasurabiy Organics (Amudhasurabi, Amuthasurabi) is rich in iron, fiber, and essential minerals.";
  } else if (slug === "nendram-banana-malt" || slug === "nendran-malt" || slug === "banana-malt") {
    title = "Blovit Nendram Banana Malt | Amudhasurabiy Organics";
    description = "Blovit Nendram Banana Malt (Nendran Banana Malt) by Amudhasurabiy Organics (Amudhasurabi) brings traditional weight-gaining energy.";
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
  const { slug } = await params;
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

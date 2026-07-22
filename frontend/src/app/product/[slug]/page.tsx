import { Metadata } from "next";
import { getProductBySlug, getProducts } from "@/lib/api/products";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return {
      title: "Product Not Found | Blovit",
    };
  }
  return {
    title: `${product.name} - 100% Natural Organic Drink | Blovit`,
    description: product.description,
    alternates: {
      canonical: `/product/${product.slug}/`,
    },
    openGraph: {
      title: `${product.name} - Amudhasurabiy Organics`,
      description: product.description,
      url: `https://amudhasurabiy.com/product/${product.slug}/`,
      images: [
        {
          url: `https://amudhasurabiy.com${product.imageUrl}`,
          alt: product.name,
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

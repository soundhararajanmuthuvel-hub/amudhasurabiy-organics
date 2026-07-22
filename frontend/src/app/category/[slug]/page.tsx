import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { getProducts } from "@/lib/api/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_NAMES: Record<string, { name: string; desc: string }> = {
  malts: {
    name: "Nutrition Malts",
    desc: "100% natural, preservative-free Apple, Beetroot, and Nendran Banana health drink powders by Amudhasurabiy Organics.",
  },
  agricultural: {
    name: "Agricultural Products",
    desc: "Premium grade sprouted grains, sun-dried millets, and farm-fresh organic pulses straight from Kumbakonam farms.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORY_NAMES[slug];
  const title = cat ? `${cat.name} | Blovit` : "Category | Blovit";
  const desc = cat ? cat.desc : "Explore organic food products on Blovit.";
  return {
    title,
    description: desc,
    alternates: {
      canonical: `/category/${slug}/`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const cat = CATEGORY_NAMES[slug];
  const allProducts = await getProducts();
  
  // Filter products: if 'malts', show all. If 'agricultural', we can mock raw grains
  const products = slug === "malts" ? allProducts : [];

  const mockAgriculturalProducts = [
    {
      id: "raw-ragi",
      name: "Organic Sprouted Finger Millet (Ragi)",
      price: 120,
      description: "Naturally sprouted and sun-dried organic Ragi grains, ready for custom home milling.",
      imageUrl: "/images/hero-bg.png"
    },
    {
      id: "raw-kambu",
      name: "Organic Sprouted Pearl Millet (Kambu)",
      price: 110,
      description: "Rich in iron and fiber, harvested from our pesticide-free Kumbakonam farms.",
      imageUrl: "/images/hero-bg.png"
    }
  ];

  const visibleProducts = slug === "agricultural" ? mockAgriculturalProducts : products;

  return (
    <>
      <JsonLd
        type="breadcrumb"
        data={{
          items: [
            { name: "Home", url: "/" },
            { name: "Category", url: `/category/${slug}/` },
            { name: cat ? cat.name : slug, url: `/category/${slug}/` },
          ],
        }}
      />
      <Header />

      <main className="flex-grow bg-cream py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <Link href="/" className="inline-flex items-center gap-1 font-heading text-sm font-semibold text-walnut-brown/60 hover:text-moss-green transition-colors mb-8">
            <ChevronLeft className="h-4 w-4" /> Back to Home
          </Link>

          <div className="mb-12">
            <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-2">
              Product Category
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-walnut-brown mb-3">
              {cat ? cat.name : slug}
            </h1>
            <p className="font-body text-sm text-walnut-brown/70 max-w-xl">
              {cat ? cat.desc : ""}
            </p>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {visibleProducts.map((p: any) => (
                <div key={p.id} className="bg-white rounded-3xl overflow-hidden border border-walnut-brown/5 shadow-sm p-4 flex flex-col h-full hover:shadow-md transition-shadow relative">
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-cream-dark mb-4">
                    <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-heading text-sm font-bold text-walnut-brown line-clamp-1 mb-1">{p.name}</h3>
                  <p className="font-body text-xs text-walnut-brown/60 line-clamp-2 mb-4">{p.description}</p>
                  
                  <div className="flex justify-between items-center mt-auto pt-4 border-t">
                    <span className="font-heading text-sm font-semibold text-moss-green">₹{p.price}</span>
                    {slug === "malts" ? (
                      <Link
                        href={`/product/${p.slug}/`}
                        className="flex items-center gap-0.5 font-heading text-[10px] font-semibold text-moss-green uppercase tracking-wider group"
                      >
                        Buy <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    ) : (
                      <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-walnut-brown/50">
                        In Store Only
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-walnut-brown/5">
              <p className="font-body text-walnut-brown/60">No products found in this category.</p>
            </div>
          )}

        </div>
      </main>

      <WhatsAppButton />
      <Footer />
    </>
  );
}

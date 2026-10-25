import { Suspense } from "react";
import { Metadata } from "next";
import ShopClient from "../shop/ShopClient";
import { getProducts } from "@/lib/api/products";

export const metadata: Metadata = {
  title: "Search Blovit Malt Health Drinks | Amudhasurabiy Organics",
  description: "Live search results for Blovit organic natural health drinks and malt powders, crafted by Amudhasurabiy Organics.",
  alternates: {
    canonical: "/search/",
  },
};

export default async function SearchPage() {
  const initialProducts = await getProducts();
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream py-16 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-earth-dark text-sm font-medium">Searching Catalog...</p>
          </div>
        </div>
      }
    >
      <ShopClient initialProducts={initialProducts} />
    </Suspense>
  );
}

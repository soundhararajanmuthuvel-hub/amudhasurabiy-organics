import { Suspense } from "react";
import { Metadata } from "next";
import { getProducts } from "@/lib/api/products";
import ShopClient from "./ShopClient";

export const revalidate = 300; // ISR: revalidate every 5 minutes

export const metadata: Metadata = {
  title: "Shop Blovit Natural Health Drinks & Malts | Amudhasurabiy Organics",
  description: "Browse 100% natural, organic malt health drinks crafted in Tamil Nadu by Amudhasurabiy Organics (Amudhasurabi). ABC Malt, Beetroot Malt, Sprouted Ragi Malt, and Nendran Banana Malt.",
  alternates: {
    canonical: "/shop/",
  },
};

export default async function ShopPage() {
  const initialProducts = await getProducts();
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream py-16 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-earth-dark text-sm font-medium">Loading Amudhasurabiy Organics Catalog...</p>
          </div>
        </div>
      }
    >
      <ShopClient initialProducts={initialProducts} />
    </Suspense>
  );
}

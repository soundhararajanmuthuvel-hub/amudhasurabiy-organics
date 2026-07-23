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
  return <ShopClient initialProducts={initialProducts} />;
}

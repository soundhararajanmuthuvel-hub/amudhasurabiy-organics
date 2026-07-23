"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { MOCK_PRODUCTS } from "@/lib/api/mockData";

export default function CollectionsPage() {
  const collections = [
    {
      title: "Malt Health Drinks",
      desc: "Pure organic health drink powders crafted from fruits, vegetables, sprouted grains, and nuts.",
      image: "/images/abc-malt.png",
      products: MOCK_PRODUCTS
    },
    {
      title: "Iron & Hemoglobin Boosters",
      desc: "Targeted natural formulations rich in organic iron and natural nitrates for managing anemia.",
      image: "/images/beetroot-malt.png",
      products: MOCK_PRODUCTS.filter(p => p.id === "beetroot-malt" || p.id === "abc-malt")
    },
    {
      title: "Kids Nutrition & Weight Gainers",
      desc: "Wholesome, chemical-free nutrition mixes formulated for toddlers and growing children.",
      image: "/images/banana-malt.png",
      products: MOCK_PRODUCTS.filter(p => p.id === "nendram-banana-malt" || p.id === "abc-malt")
    }
  ];

  return (
    <>
      <JsonLd
        type="breadcrumb"
        data={{
          items: [
            { name: "Home", url: "/" },
            { name: "Collections", url: "/collections/" },
          ],
        }}
      />
      <Header />

      <main className="flex-grow bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-2">
              Curated Wellness
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-walnut-brown mb-4">
              Blovit Collections
            </h1>
            <p className="font-body text-sm text-walnut-brown/70 leading-relaxed">
              Explore our curated natural product lines designed to fulfill your family&apos;s daily health and nutrition goals.
            </p>
          </div>

          <div className="flex flex-col gap-16">
            {collections.map((col, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 md:p-12 border border-walnut-brown/5 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
                  <div className="lg:col-span-8">
                    <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-wider block mb-2">Category Showcase</span>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-walnut-brown mb-2">{col.title}</h2>
                    <p className="font-body text-xs text-walnut-brown/75 max-w-xl">{col.desc}</p>
                  </div>
                  <div className="lg:col-span-4 flex justify-end">
                    <Link href="/shop/" className="inline-flex items-center gap-1.5 bg-moss-green hover:bg-walnut-brown text-white px-6 py-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-colors shadow-sm">
                      Explore Line <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-walnut-brown/5 pt-8">
                  {col.products.map((p) => (
                    <div key={p.id} className="p-4 rounded-2xl bg-cream border border-walnut-brown/5 flex flex-col justify-between">
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white mb-4">
                        <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                      </div>
                      <h4 className="font-heading text-sm font-bold text-walnut-brown mb-1">{p.name}</h4>
                      <span className="font-heading text-xs font-semibold text-moss-green mb-4">₹{p.price}</span>
                      <Link href={`/product/${p.slug}/`} className="w-full bg-white hover:bg-moss-green hover:text-white text-walnut-brown border border-walnut-brown/10 text-[10px] font-heading font-bold uppercase tracking-wider py-2.5 rounded-full text-center transition-colors">
                        View Product
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <WhatsAppButton />
      <Footer />
    </>
  );
}

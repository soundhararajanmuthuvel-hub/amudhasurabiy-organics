"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, ShieldCheck, Heart, Leaf } from "lucide-react";
import JsonLd from "@/components/JsonLd";

export default function OurBrandsPage() {
  const brands = [
    {
      id: "blovit",
      name: "Blovit",
      tagline: "Natural Malt Nutrition",
      description: "Flagship consumer brand of Amudhasurabiy Organics. Manufacturing 100% natural, farm-sourced ABC Malt, Beetroot Malt, and Kerala Nendran Banana Malt powders with zero artificial additives.",
      status: "Active Flagship Brand",
      href: "/brands/blovit/",
      badge: "Flagship Brand",
      productsCount: "3 Premium Malts",
      active: true,
      image: "/images/abc-malt.png"
    },
    {
      id: "future-brand-1",
      name: "Heritage Spices & Herbal Elixirs",
      tagline: "Traditional South Indian Herbal Blends",
      description: "Upcoming organic brand dedicated to sun-dried spice infusions and traditional herbal health formulations.",
      status: "In Formulation Phase",
      href: "#",
      badge: "Coming Soon",
      productsCount: "Harvest 2026",
      active: false,
    },
    {
      id: "future-brand-2",
      name: "Pure Harvest Millets",
      tagline: "Wholesome Ancient Grain Mixes",
      description: "Sustainably grown millet flakes, porridge mixes, and sprouted grain superfoods sourced directly from local Tamil Nadu farmers.",
      status: "In Sourcing Phase",
      href: "#",
      badge: "Coming Soon",
      productsCount: "Harvest 2026",
      active: false,
    },
    {
      id: "future-brand-3",
      name: "Vitality Oils & Botanicals",
      tagline: "Cold-Pressed Seed Oils & Botanical Extracts",
      description: "Cold-pressed wood-churned oils and pure botanical wellness extracts.",
      status: "In Research & Development",
      href: "#",
      badge: "Coming Soon",
      productsCount: "Future Expansion",
      active: false,
    }
  ];

  return (
    <>
      <JsonLd
        type="organization"
        data={{
          name: "Amudhasurabiy Organics",
          url: "https://amudhasurabiy.com/our-brands/"
        }}
      />
      <Header />
      <main className="min-h-screen bg-cream text-charcoal py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-moss-green/10 text-moss-green font-heading text-xs font-bold uppercase tracking-widest">
              Brand Architecture & Portfolio
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-walnut-brown">
              Our Portfolio of Natural Brands
            </h1>
            <p className="font-body text-sm sm:text-base text-walnut-brown/70 leading-relaxed">
              At <strong className="text-walnut-brown font-semibold">Amudhasurabiy Organics</strong>, we craft trusted consumer brands rooted in traditional Indian nutrition, clean ingredients, and zero compromise on quality.
            </p>
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className={`rounded-3xl p-8 sm:p-10 border transition-all duration-500 flex flex-col justify-between relative overflow-hidden ${
                  brand.active
                    ? "bg-white border-moss-green/20 shadow-lg hover:shadow-2xl hover:-translate-y-1"
                    : "bg-cream-dark/40 border-walnut-brown/10 opacity-90"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider ${
                        brand.active
                          ? "bg-moss-green text-white"
                          : "bg-walnut-brown/10 text-walnut-brown/70"
                      }`}
                    >
                      {brand.badge}
                    </span>
                    <span className="text-xs font-body text-walnut-brown/60">
                      {brand.productsCount}
                    </span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-walnut-brown mb-2">
                    {brand.name}
                  </h2>
                  <p className="font-heading text-xs font-semibold text-moss-green uppercase tracking-wider mb-4">
                    {brand.tagline}
                  </p>
                  <p className="font-body text-xs sm:text-sm text-walnut-brown/75 leading-relaxed mb-8">
                    {brand.description}
                  </p>
                </div>

                <div>
                  {brand.active ? (
                    <Link
                      href={brand.href}
                      className="inline-flex items-center justify-between w-full bg-moss-green hover:bg-walnut-brown text-white px-6 py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md group"
                    >
                      <span>Explore Blovit Brand</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ) : (
                    <div className="w-full bg-walnut-brown/5 text-walnut-brown/50 px-6 py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider text-center cursor-not-allowed">
                      Coming Soon — Under Development
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Corporate Commitment Banner */}
          <div className="rounded-3xl bg-walnut-brown text-white p-8 md:p-12 text-center max-w-4xl mx-auto shadow-xl space-y-6">
            <Sparkles className="h-8 w-8 text-moss-green mx-auto" />
            <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight">
              Building India's Trusted Natural Food Ecosystem
            </h3>
            <p className="font-body text-xs md:text-sm text-cream-dark/80 max-w-2xl mx-auto leading-relaxed">
              Every brand under Amudhasurabiy Organics adheres strictly to our core promise: 100% natural, farm-sourced ingredients, zero synthetic chemicals, and complete manufacturing transparency from Kumbakonam.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/shop/"
                className="bg-cream hover:bg-white text-walnut-brown px-8 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                Shop All Products
              </Link>
              <Link
                href="/quality-and-trust/"
                className="border border-cream/30 hover:border-white text-white px-8 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all"
              >
                View Quality Standards
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

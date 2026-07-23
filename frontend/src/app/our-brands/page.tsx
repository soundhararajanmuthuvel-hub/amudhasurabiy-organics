"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import JsonLd from "@/components/JsonLd";

export default function OurBrandsPage() {
  const brands = [
    {
      id: "blovit",
      name: "Blovit",
      tagline: "Natural Malt Nutrition",
      status: "Active Flagship Brand",
      description: "Our flagship consumer brand specializing in 100% natural, farm-sourced health drink mixes including Beetroot Malt, ABC Malt, and Sprouted Nendran Banana Malt.",
      highlights: [
        "No Chemical Preservatives",
        "Direct Farm Sourcing",
        "Formulated for All Ages",
        "Palm Sugar Sweetened"
      ],
      href: "/brands/blovit/",
      isLaunched: true,
    },
    {
      id: "future-brand-1",
      name: "Amudha Organics Care",
      tagline: "Pure Herbal & Skincare Line",
      status: "In Development",
      description: "Upcoming consumer brand focused on cold-pressed oils, traditional bath powders, and chemical-free personal care products.",
      highlights: [
        "100% Cold-Pressed Oils",
        "Traditional Heritage Recipes",
        "Zero Paraben or Sulfates"
      ],
      href: "#",
      isLaunched: false,
    },
    {
      id: "future-brand-2",
      name: "Surabiy Spices & Staples",
      tagline: "Farm-Direct Spices & Grains",
      status: "Planned for 2027",
      description: "Upcoming brand for single-origin spices, unpolished millets, and traditional South Indian rice varieties directly sourced from organic farmer clusters.",
      highlights: [
        "Single-Origin Spices",
        "Unpolished Native Millets",
        "Fair Trade Farmer Pay"
      ],
      href: "#",
      isLaunched: false,
    }
  ];

  return (
    <>
      <JsonLd
        type="breadcrumb"
        data={{
          items: [
            { name: "Home", url: "/" },
            { name: "Our Brands", url: "/our-brands/" },
          ],
        }}
      />
      <Header />

      <main className="flex-grow bg-cream py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block">
              Parent Brand Portfolio
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-walnut-brown">
              Our Brands & Product Ecosystem
            </h1>
            <p className="font-body text-xs sm:text-sm text-walnut-brown/75 leading-relaxed">
              Amudhasurabiy Organics is the parent enterprise behind specialized consumer brands dedicated to pure nutrition, traditional recipes, and sustainable farming.
            </p>
          </div>

          {/* Brand Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="bg-white rounded-3xl p-8 border border-walnut-brown/10 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                {!brand.isLaunched && (
                  <div className="absolute top-4 right-4 bg-cream-dark text-walnut-brown/70 font-heading text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {brand.status}
                  </div>
                )}
                {brand.isLaunched && (
                  <div className="absolute top-4 right-4 bg-moss-green text-white font-heading text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {brand.status}
                  </div>
                )}

                <div>
                  <span className="text-[11px] font-body text-walnut-brown/50 uppercase tracking-widest block mb-1">
                    Amudhasurabiy Organics
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-walnut-brown mb-1">
                    {brand.name}
                  </h3>
                  <p className="font-heading text-xs font-bold text-moss-green uppercase tracking-wider mb-4">
                    {brand.tagline}
                  </p>
                  <p className="font-body text-xs text-walnut-brown/75 leading-relaxed mb-6">
                    {brand.description}
                  </p>

                  <div className="space-y-2 mb-6 pt-4 border-t border-walnut-brown/10">
                    <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-walnut-brown/50 block">
                      Brand Principles:
                    </span>
                    {brand.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-body text-walnut-brown/85">
                        <span className="h-1.5 w-1.5 rounded-full bg-moss-green shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {brand.isLaunched ? (
                    <Link
                      href={brand.href}
                      className="w-full inline-flex items-center justify-center gap-2 bg-moss-green hover:bg-walnut-brown text-white py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-colors shadow-md group"
                    >
                      Explore {brand.name} Products
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="w-full inline-flex items-center justify-center gap-2 bg-cream-dark text-walnut-brown/50 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Corporate Commitment Banner */}
          <div className="rounded-3xl bg-walnut-brown text-white p-8 md:p-12 text-center max-w-4xl mx-auto shadow-xl space-y-6">
            <Sparkles className="h-8 w-8 text-moss-green mx-auto" />
            <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight">
              Building India&apos;s Trusted Natural Food Ecosystem
            </h3>
            <p className="font-body text-xs md:text-sm text-cream-dark/80 max-w-2xl mx-auto leading-relaxed">
              Every brand under Amudhasurabiy Organics adheres strictly to our core promise: 100% natural, farm-sourced ingredients, zero synthetic chemicals, and complete manufacturing transparency from Kumbakonam.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/shop/"
                className="bg-cream hover:bg-white text-walnut-brown px-8 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                Shop Blovit Products
              </Link>
              <Link
                href="/about/"
                className="bg-transparent border border-cream/30 text-cream hover:bg-white/10 px-8 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all"
              >
                Learn About Parent Enterprise
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

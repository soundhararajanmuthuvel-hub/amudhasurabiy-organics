"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { Product } from "@/lib/api/mockData";
import { trackCustomerEvent } from "@/lib/api/events";

interface ShopClientProps {
  initialProducts: Product[];
}

export default function ShopClient({ initialProducts }: ShopClientProps) {
  const [products] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const healthGoals = [
    { id: "all", label: "All Health Goals" },
    { id: "Increase Iron", label: "🩸 Increase Iron" },
    { id: "Kids Growth & Nutrition", label: "👶 Kids Growth & Weight" },
    { id: "Daily Energy", label: "⚡ Daily Energy" },
    { id: "Family Wellness", label: "🛡️ Family Wellness" },
  ];

  // Debounce search input by 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    trackCustomerEvent("category_view", { source: "shop_page" });
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (debouncedSearch.trim() !== "") {
      const term = debouncedSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          (Array.isArray(p.ingredients) && p.ingredients.some((i) => i.toLowerCase().includes(term)))
      );
    }

    if (selectedGoal !== "all") {
      result = result.filter((p) =>
        Array.isArray(p.healthGoals) &&
        p.healthGoals.some((g) => g.toLowerCase().includes(selectedGoal.toLowerCase()))
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [products, debouncedSearch, selectedGoal, sortBy]);

  return (
    <>
      <JsonLd type="breadcrumb" data={{ items: [{ name: "Home", url: "/" }, { name: "Shop", url: "/shop/" }] }} />
      <Header />

      <main className="flex-grow bg-cream py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header & Subtitle */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-moss-green bg-cream-dark px-4 py-1.5 rounded-full inline-block mb-3 border border-walnut-brown/10">
              AO Core ERP Storefront
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-walnut-brown mb-4 tracking-tight">
              Blovit Pure Nutrition
            </h1>
            <p className="font-body text-sm sm:text-base text-walnut-brown/80 leading-relaxed">
              100% natural, preservative-free malt health drinks crafted by Amudhasurabiy Organics in Tamil Nadu.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-walnut-brown/10 mb-12 space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              {/* Search input */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-walnut-brown/40" />
                <input
                  type="text"
                  placeholder="Search products or ingredients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-full bg-cream-dark/50 border border-walnut-brown/15 text-xs text-walnut-brown focus:outline-none focus:border-moss-green transition-all"
                />
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <span className="font-body text-xs font-semibold text-walnut-brown/60 shrink-0">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-full px-4 py-2 bg-cream-dark/50 border border-walnut-brown/15 text-xs text-walnut-brown font-heading font-semibold focus:outline-none focus:border-moss-green"
                >
                  <option value="default">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Health Goals Filter Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-walnut-brown/10">
              <span className="font-heading text-xs font-bold uppercase tracking-wider text-walnut-brown/60 mr-2">
                Health Goal:
              </span>
              {healthGoals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGoal(g.id)}
                  className={`px-4 py-1.5 rounded-full font-heading text-xs font-semibold transition-all ${
                    selectedGoal === g.id
                      ? "bg-moss-green text-white shadow-xs"
                      : "bg-cream-dark/60 hover:bg-cream-dark text-walnut-brown/80"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 rounded-3xl bg-white border border-walnut-brown/10 p-8">
              <h3 className="font-heading text-xl font-bold text-walnut-brown mb-2">No Products Found</h3>
              <p className="font-body text-xs text-walnut-brown/60 max-w-md mx-auto">
                No matching products for the selected filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="rounded-3xl bg-white border border-walnut-brown/10 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-56 w-full rounded-2xl bg-cream-dark/30 mb-6 overflow-hidden flex items-center justify-center p-4">
                      <Image
                        src={p.imageUrl || (Array.isArray(p.images) && p.images[0]) || "/images/products/sprouted-ragi-malt.png"}
                        alt={p.name}
                        width={200}
                        height={200}
                        className="h-48 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 right-3 bg-moss-green text-white text-[10px] font-heading font-bold px-2.5 py-1 rounded-full uppercase">
                        Blovit
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-amber-500 text-xs mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-walnut-brown/60 font-body text-[11px]">
                        ({p.reviewCount || 42} reviews)
                      </span>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-walnut-brown mb-2 group-hover:text-moss-green transition-colors">
                      <Link href={`/product/${p.slug}/`}>{p.name}</Link>
                    </h3>

                    <p className="font-body text-xs text-walnut-brown/70 leading-relaxed mb-4 line-clamp-2">
                      {p.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="font-heading text-2xl font-bold text-moss-green">₹{p.price}</span>
                      {p.originalPrice > p.price && (
                        <span className="font-body text-xs text-walnut-brown/40 line-through">
                          ₹{p.originalPrice}
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/product/${p.slug}/`}
                      className="w-full block text-center bg-moss-green hover:bg-walnut-brown text-white py-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      View Details & Buy
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <WhatsAppButton />
      <Footer />
    </>
  );
}

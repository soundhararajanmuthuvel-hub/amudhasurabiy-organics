"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, ArrowRight, Heart, Sparkles, Star, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/lib/api/mockData";
import { getProducts } from "@/lib/api/products";
import { trackCustomerEvent } from "@/lib/api/events";

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedGoal, setSelectedGoal] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [filterBestseller, setFilterBestseller] = useState(false);
  const { addToCart, toggleWishlist, wishlist } = useCartStore();

  const brandOptions = [
    { id: "all", label: "All Brands" },
    { id: "blovit", label: "Blovit (Malt Nutrition)" },
    { id: "future", label: "Future Brands (Coming Soon)" },
  ];

  const healthGoals = [
    { id: "all", label: "All Health Goals" },
    { id: "Increase Iron", label: "🩸 Increase Iron" },
    { id: "Kids Growth & Nutrition", label: "👶 Kids Growth & Weight" },
    { id: "Daily Energy", label: "⚡ Daily Energy" },
    { id: "Family Wellness", label: "🛡️ Family Wellness" },
  ];

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setFilteredProducts(data);
    });
    trackCustomerEvent("category_view", { source: "shop_page" });
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Brand filter
    if (selectedBrand === "future") {
      result = [];
    }

    // Search filter
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.ingredients.some(i => i.toLowerCase().includes(term))
      );
    }

    // Health Goal filter
    if (selectedGoal !== "all") {
      result = result.filter(p => p.healthGoals?.includes(selectedGoal));
    }

    // Bestseller filter
    if (filterBestseller) {
      result = result.filter((p) => p.isBestseller);
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(result);
  }, [products, searchTerm, selectedBrand, selectedGoal, sortBy, filterBestseller]);

  return (
    <>
      <JsonLd
        type="breadcrumb"
        data={{
          items: [
            { name: "Home", url: "/" },
            { name: "Shop", url: "/shop/" },
          ],
        }}
      />
      <Header />

      <main className="flex-grow bg-cream py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block">
              Amudhasurabiy Organics Store
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-walnut-brown">
              Natural Health Mix & Malt Products
            </h1>
            <p className="font-body text-xs sm:text-sm text-walnut-brown/70 leading-relaxed">
              Discover pure 100% natural health drink mixes manufactured under Blovit, the flagship consumer brand of Amudhasurabiy Organics.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="bg-white rounded-3xl p-6 border border-walnut-brown/10 shadow-sm mb-12 space-y-6">
            
            {/* Top row: Search and Brand Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-3.5 h-4 w-4 text-walnut-brown/40" />
                <input
                  type="text"
                  placeholder="Search products or ingredients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-full pl-10 pr-4 py-3 bg-cream-dark/30 border border-walnut-brown/15 text-xs text-walnut-brown focus:outline-none focus:border-moss-green"
                />
              </div>

              {/* Brand Filter */}
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full rounded-full px-4 py-3 bg-cream-dark/30 border border-walnut-brown/15 text-xs font-heading font-bold uppercase tracking-wider text-walnut-brown focus:outline-none focus:border-moss-green"
              >
                {brandOptions.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-full px-4 py-3 bg-cream-dark/30 border border-walnut-brown/15 text-xs font-heading font-bold uppercase tracking-wider text-walnut-brown focus:outline-none focus:border-moss-green"
              >
                <option value="default">Sort by Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Alphabetical: A-Z</option>
              </select>
            </div>

            {/* Health Goal Chips */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-walnut-brown/10">
              {healthGoals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGoal(g.id)}
                  className={`px-4 py-2 rounded-full font-heading text-[11px] font-bold uppercase tracking-wider transition-all ${
                    selectedGoal === g.id
                      ? "bg-moss-green text-white"
                      : "bg-cream-dark/40 text-walnut-brown/80 hover:bg-moss-green/10"
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
                No matching products for the selected filters. Additional consumer brands under Amudhasurabiy Organics are coming soon.
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
                        src={p.imageUrl}
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
                        ({p.reviewsCount} reviews)
                      </span>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-walnut-brown mb-1">
                      {p.name}
                    </h3>
                    <p className="font-body text-xs text-walnut-brown/50 uppercase tracking-widest mb-2 font-medium">
                      By Amudhasurabiy Organics
                    </p>
                    <p className="font-body text-xs text-walnut-brown/70 leading-relaxed mb-4">
                      {p.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-walnut-brown/10 flex items-center justify-between">
                    <div>
                      <span className="font-heading text-lg font-bold text-walnut-brown">
                        ₹{p.price}
                      </span>
                      <span className="font-body text-xs text-walnut-brown/40 line-through ml-2">
                        ₹{p.originalPrice}
                      </span>
                    </div>
                    <Link
                      href={`/product/${p.slug}/`}
                      className="bg-moss-green hover:bg-walnut-brown text-white px-5 py-2.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

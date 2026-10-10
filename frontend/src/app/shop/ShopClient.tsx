"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/api/mockData";
import { trackCustomerEvent } from "@/lib/api/events";

interface ShopClientProps {
  initialProducts: Product[];
}

export default function ShopClient({ initialProducts }: ShopClientProps) {
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") || "";

  const [products] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(urlSearch);
  const [selectedGoal, setSelectedGoal] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [selectedPriceMax, setSelectedPriceMax] = useState<number>(1500);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const healthGoals = [
    { id: "all", label: "All Health Goals" },
    { id: "Increase Iron", label: "🩸 Iron & Hemoglobin" },
    { id: "Kids Growth & Nutrition", label: "👶 Kids Growth & Weight" },
    { id: "Daily Energy", label: "⚡ Daily Energy & Vitality" },
    { id: "Family Wellness", label: "🛡️ Family Overall Wellness" },
  ];

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 250);
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
          p.category.toLowerCase().includes(term) ||
          (Array.isArray(p.ingredients) && p.ingredients.some((i) => i.toLowerCase().includes(term))) ||
          (Array.isArray(p.healthGoals) && p.healthGoals.some((g) => g.toLowerCase().includes(term)))
      );
    }

    if (selectedGoal !== "all") {
      result = result.filter((p) =>
        Array.isArray(p.healthGoals) &&
        p.healthGoals.some((g) => g.toLowerCase().includes(selectedGoal.toLowerCase()))
      );
    }

    // Filter by availability
    if (onlyInStock) {
      result = result.filter((p) => p.inStock !== false);
    }

    // Filter by price range
    result = result.filter((p) => p.price <= selectedPriceMax);

    // Sort products
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "bestseller") {
      result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    return result;
  }, [products, debouncedSearch, selectedGoal, selectedPriceMax, sortBy, onlyInStock]);

  const clearAllFilters = () => {
    setSearchTerm("");
    setDebouncedSearch("");
    setSelectedGoal("all");
    setSelectedPriceMax(1500);
    setOnlyInStock(false);
    setSortBy("default");
  };

  return (
    <>
      <JsonLd type="breadcrumb" data={{ items: [{ name: "Home", url: "/" }, { name: "Shop", url: "/shop/" }] }} />
      <Header />

      <main className="flex-grow bg-cream py-8 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-heading text-xs font-bold uppercase tracking-widest text-moss-green block mb-1">
                  100% Organic Tamil Nadu Malts
                </span>
                <h1 className="font-heading text-3xl sm:text-4xl font-bold text-walnut-brown tracking-tight">
                  Blovit Pure Health Drinks & Malts
                </h1>
                <p className="font-body text-xs sm:text-sm text-walnut-brown/70 mt-1">
                  Showing {filteredProducts.length} authentic products • Pan-India doorstep delivery
                </p>
              </div>

              {/* Mobile Filter & Sort Triggers */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-white border border-walnut-brown/20 text-xs font-heading font-bold text-walnut-brown"
                >
                  <SlidersHorizontal className="h-4 w-4 text-moss-green" />
                  <span>Filters</span>
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 py-2.5 px-3 rounded-full bg-white border border-walnut-brown/20 text-xs font-heading font-semibold text-walnut-brown"
                >
                  <option value="default">Sort: Featured</option>
                  <option value="bestseller">Best Sellers</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Amazon/Flipkart Catalog Layout: Left Filter Sidebar, Right Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Desktop Left Filter Sidebar */}
            <aside className="hidden lg:block lg:col-span-3 bg-white rounded-3xl p-6 border border-walnut-brown/10 shadow-xs space-y-6 sticky top-28">
              <div className="flex items-center justify-between pb-4 border-b border-walnut-brown/10">
                <span className="font-heading text-sm font-bold uppercase tracking-wider text-walnut-brown flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-moss-green" />
                  Filters
                </span>
                {(selectedGoal !== "all" || searchTerm || selectedPriceMax < 1500) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-[11px] font-heading font-semibold text-red-500 hover:underline"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Keyword Search */}
              <div className="space-y-2">
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-walnut-brown/60">
                  Search Catalog
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search malts or ingredients..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-cream border border-walnut-brown/15 text-xs text-walnut-brown placeholder-walnut-brown/40 focus:outline-none focus:border-moss-green"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-walnut-brown/40" />
                </div>
              </div>

              {/* Health Goal Filter */}
              <div className="space-y-2.5">
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-walnut-brown/60">
                  Health Goal
                </label>
                <div className="flex flex-col gap-1.5">
                  {healthGoals.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGoal(g.id)}
                      className={`text-left px-3 py-2 rounded-xl text-xs font-body transition-all flex items-center justify-between ${
                        selectedGoal === g.id
                          ? "bg-moss-green text-white font-bold"
                          : "text-walnut-brown/80 hover:bg-cream"
                      }`}
                    >
                      <span>{g.label}</span>
                      {selectedGoal === g.id && <Check className="h-3.5 w-3.5 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-2.5 pt-2 border-t border-walnut-brown/10">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-heading font-bold uppercase tracking-wider text-walnut-brown/60">
                    Max Price
                  </label>
                  <span className="font-heading font-bold text-xs text-moss-green">₹{selectedPriceMax}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="1500"
                  step="50"
                  value={selectedPriceMax}
                  onChange={(e) => setSelectedPriceMax(Number(e.target.value))}
                  className="w-full accent-moss-green cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-body text-walnut-brown/40">
                  <span>₹200</span>
                  <span>₹1500</span>
                </div>
              </div>

              {/* In-Stock Availability Filter */}
              <div className="pt-2 border-t border-walnut-brown/10">
                <label className="flex items-center gap-2.5 text-xs font-heading font-semibold text-walnut-brown cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="h-4 w-4 rounded text-moss-green focus:ring-moss-green"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>

              {/* Authentic Trust Note */}
              <div className="pt-4 border-t border-walnut-brown/10 text-[11px] font-body text-walnut-brown/60 space-y-1">
                <p className="font-bold text-walnut-brown">Amudhasurabiy Guarantee</p>
                <p>100% farm-sourced, no preservatives, sweetened with raw organic palm sugar.</p>
              </div>
            </aside>

            {/* Products Main Column */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* Desktop Sort Bar */}
              <div className="hidden md:flex items-center justify-between bg-white px-6 py-3.5 rounded-2xl border border-walnut-brown/10 shadow-xs">
                <span className="font-body text-xs text-walnut-brown/70">
                  Showing <strong className="text-walnut-brown">{filteredProducts.length}</strong> of {products.length} products
                </span>

                <div className="flex items-center gap-3">
                  <span className="font-heading text-xs font-bold text-walnut-brown/60 uppercase tracking-wider">
                    Sort By:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-full px-4 py-1.5 bg-cream border border-walnut-brown/15 text-xs text-walnut-brown font-heading font-semibold focus:outline-none focus:border-moss-green"
                  >
                    <option value="default">Featured First</option>
                    <option value="bestseller">Best Sellers</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                  </select>
                </div>
              </div>

              {/* Product Cards Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 rounded-3xl bg-white border border-walnut-brown/10 p-8 space-y-4">
                  <h3 className="font-heading text-xl font-bold text-walnut-brown">No Products Match Your Filters</h3>
                  <p className="font-body text-xs text-walnut-brown/60 max-w-md mx-auto">
                    Try adjusting your search query, increasing your price range, or clearing filters.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="bg-moss-green text-white px-6 py-2.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider hover:bg-walnut-brown transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((p, idx) => (
                    <ProductCard key={p.id} product={p} priority={idx < 3} />
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 md:hidden backdrop-blur-xs">
          <div className="bg-white rounded-t-3xl p-6 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-walnut-brown/10">
              <span className="font-heading text-base font-bold text-walnut-brown">Filter Products</span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-walnut-brown/60 hover:text-walnut-brown"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search */}
            <div>
              <label className="block text-xs font-heading font-bold uppercase text-walnut-brown/60 mb-1">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Product name..."
                className="w-full px-4 py-2 bg-cream rounded-xl border border-walnut-brown/20 text-xs font-body"
              />
            </div>

            {/* Health Goals */}
            <div>
              <label className="block text-xs font-heading font-bold uppercase text-walnut-brown/60 mb-2">Health Goal</label>
              <div className="flex flex-wrap gap-2">
                {healthGoals.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGoal(g.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-heading ${
                      selectedGoal === g.id
                        ? "bg-moss-green text-white font-bold"
                        : "bg-cream text-walnut-brown/80"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3.5 rounded-full bg-moss-green text-white font-heading text-xs font-bold uppercase tracking-wider"
            >
              Apply Filters ({filteredProducts.length} Results)
            </button>
          </div>
        </div>
      )}

      <WhatsAppButton />
      <Footer />
    </>
  );
}

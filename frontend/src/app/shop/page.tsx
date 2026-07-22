"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, ArrowRight, Heart, Sparkles, Star } from "lucide-react";
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
  const [selectedGoal, setSelectedGoal] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [filterBestseller, setFilterBestseller] = useState(false);
  const { addToCart, toggleWishlist, wishlist } = useCartStore();

  const healthGoals = [
    { id: "all", label: "All Health Goals" },
    { id: "Increase Iron", label: "🩸 Increase Iron" },
    { id: "Kids Growth & Nutrition", label: "👶 Kids Growth & Weight" },
    { id: "Daily Energy", label: "⚡ Daily Energy" },
    { id: "Family Wellness", label: "🛡️ Family Wellness" },
    { id: "Natural Nutrition", label: "🌿 Natural Nutrition" }
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
  }, [products, searchTerm, selectedGoal, sortBy, filterBestseller]);

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
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-2">
              Natural Health Mixes
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-walnut-brown mb-4">
              Blovit Product Catalog
            </h1>
            <p className="font-body text-sm text-walnut-brown/70 leading-relaxed">
              100% natural, farm-fresh health mixes from Kumbakonam. Filter by health goal or search for specific ingredients below.
            </p>
          </div>

          {/* Health Goals Filter Band */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-10">
            {healthGoals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                className={`px-4 py-2 rounded-full font-heading text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedGoal === goal.id
                    ? "bg-moss-green text-white shadow-sm"
                    : "bg-white border border-walnut-brown/10 text-walnut-brown hover:border-moss-green"
                }`}
              >
                {goal.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Toolbar */}
          <div className="bg-white rounded-3xl p-6 border border-walnut-brown/5 shadow-sm mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-walnut-brown/40" />
              <input
                type="text"
                placeholder="Search products or ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-cream border border-walnut-brown/10 text-xs focus:outline-none focus:border-moss-green transition-all"
              />
            </div>

            {/* Filter Switches */}
            <div className="flex flex-wrap w-full md:w-auto items-center gap-4 justify-end">
              <label className="flex items-center gap-2 cursor-pointer font-body text-xs text-walnut-brown/80">
                <input
                  type="checkbox"
                  checked={filterBestseller}
                  onChange={(e) => setFilterBestseller(e.target.checked)}
                  className="rounded text-moss-green focus:ring-moss-green border-walnut-brown/20 h-4 w-4"
                />
                Bestsellers Only
              </label>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-walnut-brown/60" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-cream border border-walnut-brown/10 rounded-full px-4 py-2 text-xs text-walnut-brown focus:outline-none focus:border-moss-green font-heading"
                >
                  <option value="default">Sort by: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredProducts.map((product) => {
                const isFavorite = wishlist.includes(product.id);
                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-3xl overflow-hidden border border-walnut-brown/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1 relative"
                  >
                    {product.isBestseller && (
                      <span className="absolute top-4 left-4 z-10 bg-moss-green text-cream text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                        Best Seller
                      </span>
                    )}

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 text-walnut-brown hover:text-red-500 shadow-md transition-colors hover:scale-105"
                      aria-label="Wishlist"
                    >
                      <Heart className={`h-4.5 w-4.5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                    </button>

                    <div className="relative h-64 w-full bg-cream-dark overflow-hidden">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <Link href={`/product/${product.slug}/`} className="hover:text-moss-green transition-colors">
                          <h3 className="font-heading text-lg font-bold text-walnut-brown">
                            {product.name}
                          </h3>
                        </Link>
                        <span className="font-heading text-lg font-bold text-moss-green">
                          ₹{product.price}
                        </span>
                      </div>

                      {/* Who Is It For Tags */}
                      {product.whoIsItFor && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.whoIsItFor.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="font-body text-[9px] font-semibold text-walnut-brown/60 bg-cream-dark px-2 py-0.5 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="font-body text-xs text-walnut-brown/70 line-clamp-2 mb-6 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="flex gap-2 mt-auto">
                        <Link
                          href={`/product/${product.slug}/`}
                          className="flex-grow flex items-center justify-center bg-cream-dark hover:bg-walnut-brown hover:text-white text-walnut-brown px-4 py-3 rounded-full font-heading text-[10px] font-bold uppercase tracking-wider transition-all duration-300"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="flex items-center justify-center gap-1 bg-moss-green hover:bg-walnut-brown text-white px-5 py-3 rounded-full font-heading text-[10px] font-bold uppercase tracking-wider transition-all duration-300 group"
                        >
                          Add to Cart
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-walnut-brown/5">
              <p className="font-body text-xs text-walnut-brown/60 mb-4">No products found matching your active filters.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedGoal("all");
                  setFilterBestseller(false);
                  setSortBy("default");
                }}
                className="bg-walnut-brown text-cream px-6 py-2.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>
      </main>

      <WhatsAppButton />
      <Footer />
    </>
  );
}

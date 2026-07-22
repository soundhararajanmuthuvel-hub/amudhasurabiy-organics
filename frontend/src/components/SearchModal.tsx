"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, TrendingUp, Sparkles, ArrowRight, Heart } from "lucide-react";
import { getAISearchIntent, AISearchResult } from "@/lib/api/ai";
import { trackCustomerEvent } from "@/lib/api/events";
import { useCartStore } from "@/store/useCartStore";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AISearchResult | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { addToCart } = useCartStore();

  const trendingQueries = ["Iron Booster", "Kids Weight Gain", "Daily Energy", "ABC Malt", "Nendran Banana"];

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const history = JSON.parse(window.localStorage.getItem("blovit_recent_searches") || "[]");
        setRecentSearches(history);
      } catch (e) {}
    }
  }, []);

  const handleSearch = async (searchTerm: string) => {
    setQuery(searchTerm);
    if (!searchTerm.trim()) {
      setResults(null);
      return;
    }

    trackCustomerEvent("search_query", { metadata: { query: searchTerm } });

    // Save recent search
    if (typeof window !== "undefined") {
      const updated = Array.from(new Set([searchTerm, ...recentSearches])).slice(0, 5);
      setRecentSearches(updated);
      window.localStorage.setItem("blovit_recent_searches", JSON.stringify(updated));
    }

    const res = await getAISearchIntent(searchTerm);
    setResults(res);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-md pt-16 px-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl border border-walnut-brown/10 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Search Header Bar */}
        <div className="p-4 sm:p-6 border-b border-walnut-brown/10 flex items-center gap-3 bg-cream">
          <Search className="h-5 w-5 text-moss-green shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search by product, ingredient, or goal (e.g. Iron, Kids, Energy)..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-transparent font-heading text-base md:text-lg text-walnut-brown placeholder-walnut-brown/40 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-walnut-brown/10 text-walnut-brown/60 hover:text-walnut-brown transition-colors"
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body Viewport */}
        <div className="p-6 overflow-y-auto font-body text-sm text-walnut-brown">
          {!query.trim() ? (
            <div className="flex flex-col gap-6">
              {/* Trending Searches */}
              <div>
                <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-moss-green mb-3 flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4" /> Trending Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {trendingQueries.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSearch(term)}
                      className="px-4 py-2 rounded-full bg-cream-dark border border-walnut-brown/10 hover:border-moss-green text-walnut-brown text-xs font-semibold transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-walnut-brown/50 mb-3">
                    Recent Searches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSearch(term)}
                        className="px-4 py-1.5 rounded-full bg-white border border-walnut-brown/10 hover:bg-cream text-walnut-brown/80 text-xs transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Search Results & Intent Explanation */
            <div className="flex flex-col gap-6">
              {results && (
                <div className="p-4 rounded-2xl bg-moss-green/10 border border-moss-green/20 text-moss-green text-xs flex items-start gap-2.5">
                  <Sparkles className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block uppercase tracking-wider text-[10px]">Intent Identified: {results.intent.replace("_", " ")}</span>
                    <p>{results.explanation}</p>
                  </div>
                </div>
              )}

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results?.products.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 rounded-2xl border border-walnut-brown/10 bg-cream flex gap-4 items-center hover:border-moss-green transition-colors"
                  >
                    <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-white shrink-0 border border-walnut-brown/10">
                      <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <Link
                        href={`/product/${product.slug}/`}
                        onClick={onClose}
                        className="font-heading text-sm font-bold text-walnut-brown hover:text-moss-green truncate block"
                      >
                        {product.name}
                      </Link>
                      <span className="font-heading text-xs font-semibold text-moss-green">₹{product.price}</span>
                    </div>
                    <button
                      onClick={() => {
                        addToCart(product, 1);
                        onClose();
                      }}
                      className="bg-moss-green text-white p-2 rounded-full hover:bg-walnut-brown transition-colors shrink-0"
                      aria-label="Add product"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

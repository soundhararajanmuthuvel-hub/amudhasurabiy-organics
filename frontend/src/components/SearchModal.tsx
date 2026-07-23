"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ArrowRight } from "lucide-react";
import { Product } from "@/lib/api/mockData";
import { getProducts } from "@/lib/api/products";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (isOpen) {
      getProducts().then(setProducts);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const intentTags = [
    { label: "🩸 Increase Iron", keyword: "Iron" },
    { label: "👶 Kids Growth", keyword: "Kids" },
    { label: "⚡ Daily Energy", keyword: "Energy" },
    { label: "🛡️ Family Wellness", keyword: "ABC" },
  ];

  const filteredProducts = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (q.includes("iron") && p.slug.includes("beetroot")) ||
          (q.includes("kids") && (p.slug.includes("banana") || p.slug.includes("abc"))) ||
          (q.includes("energy") && (p.slug.includes("banana") || p.slug.includes("abc"))) ||
          (q.includes("weight") && p.slug.includes("banana"))
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-2xl bg-cream border border-walnut-brown/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Search Header */}
        <div className="flex items-center justify-between border-b border-walnut-brown/10 pb-4">
          <div className="flex items-center gap-2 text-walnut-brown">
            <Search className="h-5 w-5 text-moss-green" />
            <span className="font-heading text-sm font-bold uppercase tracking-wider">
              Intent-Based Health Search
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-walnut-brown/60 hover:text-walnut-brown hover:bg-walnut-brown/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Input Bar */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by health goal or ingredient (e.g. 'Iron', 'Kids', 'Energy', 'ABC Malt')..."
            className="w-full rounded-2xl px-5 py-4 bg-white border border-walnut-brown/20 text-xs sm:text-sm text-walnut-brown placeholder-walnut-brown/40 focus:outline-none focus:border-moss-green shadow-inner"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-4 text-xs font-body text-walnut-brown/50 hover:text-walnut-brown"
            >
              Clear
            </button>
          )}
        </div>

        {/* Intent Quick Chips */}
        <div>
          <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-walnut-brown/50 block mb-2">
            Popular Health Intent Searches:
          </span>
          <div className="flex flex-wrap gap-2">
            {intentTags.map((tag) => (
              <button
                key={tag.keyword}
                onClick={() => setQuery(tag.keyword)}
                className="px-3 py-1.5 rounded-full bg-moss-green/10 hover:bg-moss-green hover:text-white text-moss-green text-xs font-body font-medium transition-all"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto space-y-3 pt-2">
          {query.trim() && filteredProducts.length === 0 && (
            <div className="text-center py-8 text-xs font-body text-walnut-brown/60">
              No direct malt matches for &quot;{query}&quot;. Try searching &quot;Iron&quot;, &quot;Kids&quot;, or &quot;ABC&quot;.
            </div>
          )}

          {filteredProducts.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.slug}/`}
              onClick={onClose}
              className="flex items-center justify-between p-4 rounded-2xl bg-white border border-walnut-brown/10 hover:border-moss-green hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-cream-dark/30 flex items-center justify-center p-1 shrink-0">
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    width={40}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-walnut-brown group-hover:text-moss-green transition-colors">
                    Blovit — {p.name}
                  </h4>
                  <p className="font-body text-[11px] text-walnut-brown/60 line-clamp-1">
                    By Amudhasurabiy Organics • ₹{p.price}
                  </p>
                </div>
              </div>

              <ArrowRight className="h-4 w-4 text-walnut-brown/40 group-hover:text-moss-green group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

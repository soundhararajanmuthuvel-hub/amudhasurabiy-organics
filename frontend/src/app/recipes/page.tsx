"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, ChefHat } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { MOCK_RECIPES } from "@/lib/api/mockData";

export default function RecipesIndex() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All", "ABC Malt", "Beetroot Malt", "Kids Nutrition"
  ];

  const filteredRecipes = selectedCategory === "All"
    ? MOCK_RECIPES
    : MOCK_RECIPES.filter(r => r.category === selectedCategory);

  return (
    <>
      <JsonLd
        type="breadcrumb"
        data={{
          items: [
            { name: "Home", url: "/" },
            { name: "Recipes", url: "/recipes/" },
          ],
        }}
      />
      <Header />

      <main className="flex-grow bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-2 flex items-center justify-center gap-1.5">
              <ChefHat className="h-4 w-4" /> Blovit Kitchen
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-walnut-brown mb-4">
              Healthy Drink Recipes
            </h1>
            <p className="font-body text-sm text-walnut-brown/70 leading-relaxed">
              Discover creative, delicious ways to prepare Blovit organic malts for morning smoothies, warm lattes, and toddler breakfast porridges.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-heading text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? "bg-moss-green text-white shadow-md"
                    : "bg-white border border-walnut-brown/10 text-walnut-brown hover:bg-walnut-brown hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Recipes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-3xl overflow-hidden border border-walnut-brown/5 shadow-sm hover:shadow-lg transition-all flex flex-col h-full group"
              >
                <div className="relative h-56 w-full bg-cream-dark overflow-hidden">
                  <Image
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-body text-[10px] font-bold uppercase tracking-wider text-moss-green bg-moss-green/10 px-3 py-1 rounded-full">
                      {recipe.category}
                    </span>
                    <span className="font-body text-xs text-walnut-brown/50 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {recipe.prepTime}
                    </span>
                  </div>

                  <Link href={`/recipes/${recipe.slug}/`} className="hover:text-moss-green transition-colors">
                    <h3 className="font-heading text-lg font-bold text-walnut-brown mb-2 leading-snug">
                      {recipe.title}
                    </h3>
                  </Link>

                  <p className="font-body text-xs text-walnut-brown/70 line-clamp-3 mb-6 leading-relaxed">
                    {recipe.description}
                  </p>

                  <Link
                    href={`/recipes/${recipe.slug}/`}
                    className="mt-auto inline-flex items-center gap-1.5 font-heading text-xs font-bold text-moss-green uppercase tracking-wider hover:text-walnut-brown transition-colors group"
                  >
                    View Recipe & Instructions
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
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

"use client";

import Link from "next/link";
import { Leaf, ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";

export default function IngredientsClient() {
  const ingredients = [
    { name: "Dehydrated Apples", benefits: "Rich in Vitamin C, flavonoids, and dietary pectin to aid digestion.", origin: "Himachal Organic Orchards" },
    { name: "Fresh Farm Beetroot", benefits: "Abundant in natural iron, folate, and nitrates to boost hemoglobin and stamina.", origin: "Nilgiris & Tamil Nadu Farms" },
    { name: "Dehydrated Carrots", benefits: "Packed with Beta-Carotene (Vitamin A) for eye health and glowing skin texture.", origin: "South Indian Agri Grower Farms" },
    { name: "Kerala Nendran Bananas", benefits: "Sun-dried raw banana powder rich in potassium and clean healthy calories.", origin: "Kerala Palakkad Growers" },
    { name: "Sprouted Finger Millet (Ragi)", benefits: "Sprouted to maximize calcium bioavailability, iron, and dietary fiber.", origin: "Tamil Nadu Organic Farms" },
    { name: "Premium Almonds & Cashews", benefits: "Supply essential Vitamin E, healthy fats, zinc, and protein for brain power.", origin: "Selected Nuts Sourcing" },
    { name: "Organic Palm Sugar (Nattu Sakkarai)", benefits: "Unrefined natural sweetener packed with essential trace minerals.", origin: "Traditional Palm Mills" },
    { name: "Green Cardamom", benefits: "Natural aromatic digestive spice that activates digestive enzymes.", origin: "Western Ghats Hill Farms" }
  ];

  return (
    <>
      <JsonLd
        type="breadcrumb"
        data={{
          items: [
            { name: "Home", url: "/" },
            { name: "Ingredients", url: "/ingredients/" },
          ],
        }}
      />
      <Header />

      <main className="flex-grow bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          
          <Link href="/" className="inline-flex items-center gap-1 font-heading text-xs font-bold text-walnut-brown/60 hover:text-moss-green uppercase tracking-wider mb-8">
            <ChevronLeft className="h-4 w-4" /> Back to Home
          </Link>

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-2">
              100% Transparency
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-walnut-brown mb-4">
              Our Ingredients
            </h1>
            <p className="font-body text-sm text-walnut-brown/70 leading-relaxed">
              We never use synthetic chemicals, maltodextrin fillers, or refined white sugar. Every ingredient in Blovit serves a vital nutritional purpose.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {ingredients.map((ing, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-walnut-brown/5 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="h-4 w-4 text-moss-green shrink-0" />
                    <h3 className="font-heading text-lg font-bold text-walnut-brown">{ing.name}</h3>
                  </div>
                  <p className="font-body text-xs text-walnut-brown/80 leading-relaxed mb-4">{ing.benefits}</p>
                </div>
                <span className="font-heading text-[10px] font-bold uppercase tracking-wider text-moss-green bg-moss-green/10 px-3 py-1 rounded-full w-fit">
                  Origin: {ing.origin}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-moss-green text-cream rounded-3xl p-8 md:p-12 text-center">
            <h3 className="font-heading text-2xl font-bold text-white mb-3">Pure Formulation Guarantee</h3>
            <p className="font-body text-xs text-cream/80 max-w-lg mx-auto mb-6 leading-relaxed">
              All Blovit malts are slowly sun-dried and processed at our FSSAI-licensed Kumbakonam facility to lock in bioavailable nutrition.
            </p>
            <Link href="/shop/" className="bg-cream text-walnut-brown hover:bg-white px-8 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all inline-block">
              Shop Natural Malts
            </Link>
          </div>

        </div>
      </main>

      <WhatsAppButton />
      <Footer />
    </>
  );
}

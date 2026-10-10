"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, ShieldCheck, Heart, Leaf, Award, 
  ChevronDown, Activity, Sparkles, Truck, Check,
  Clock, Package, Building2, Flame, Droplets, Star,
  PhoneCall, CheckCircle2
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Testimonials from "@/components/Testimonials";
import JsonLd from "@/components/JsonLd";
import ProductCard from "@/components/ProductCard";
import { Product, MOCK_PRODUCTS, MOCK_RECIPES } from "@/lib/api/mockData";
import { getProducts } from "@/lib/api/products";
import { trackCustomerEvent } from "@/lib/api/events";

export default function Home() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedGoal, setSelectedGoal] = useState<string>("all");

  useEffect(() => {
    getProducts().then(setProducts).catch(() => setProducts(MOCK_PRODUCTS));
    trackCustomerEvent("page_view", { source: "homepage" });
  }, []);

  const healthGoals = [
    { id: "all", name: "All Formulations", tag: "All" },
    { id: "Increase Iron", name: "🩸 Iron & Hemoglobin", tag: "Iron" },
    { id: "Kids Growth & Nutrition", name: "👶 Kids Growth & Weight", tag: "Kids" },
    { id: "Daily Energy", name: "⚡ Daily Stamina & Vitality", tag: "Energy" },
    { id: "Family Wellness", name: "🛡️ Family Overall Wellness", tag: "Wellness" },
  ];

  const filteredGoalProducts = useMemo(() => {
    if (selectedGoal === "all") return products;
    return products.filter((p) =>
      Array.isArray(p.healthGoals) &&
      p.healthGoals.some((g) => g.toLowerCase().includes(selectedGoal.toLowerCase()))
    );
  }, [products, selectedGoal]);

  const ingredientsShowcase = [
    {
      title: "Farm Beetroots & Apples",
      origin: "Direct from fresh regional harvests",
      benefit: "Naturally boosts hemoglobin and circulation with bioavailable iron and Vitamin C.",
      icon: Droplets,
      malt: "Blovit ABC & Beetroot Malt",
    },
    {
      title: "Raw Kerala Nendran Bananas",
      origin: "Sun-dried Kerala plantation harvest",
      benefit: "Clean, natural calories and potassium for healthy weight gain and toddler development.",
      icon: Sparkles,
      malt: "Blovit Nendran Banana Malt",
    },
    {
      title: "Sprouted Finger Millet (Ragi)",
      origin: "Traditional slow sprouting process",
      benefit: "Sprouting triples mineral absorption for strong bone density and daily stamina.",
      icon: Leaf,
      malt: "Blovit Sprouted Ragi Malt",
    },
    {
      title: "Raw Organic Palm Jaggery",
      origin: "Pure Nattu Sakkarai without bleaching",
      benefit: "Natural slow-burning sweetness rich in micro-minerals with zero refined white sugar spikes.",
      icon: Flame,
      malt: "Present in all Blovit Malts",
    },
  ];

  const qualityStandards = [
    {
      title: "FSSAI Licensed Facility",
      desc: "Licensed small-batch manufacturing unit in Kumbakonam, Thanjavur District (Lic No: 22421543000120).",
      icon: ShieldCheck,
    },
    {
      title: "Zero Preservatives or Chemicals",
      desc: "Never contains sodium benzoate, artificial food colorants, synthetic emulsifiers, or maltodextrin fillers.",
      icon: Award,
    },
    {
      title: "Traditional Slow Roasting",
      desc: "Ingredients are roasted at controlled temperatures to preserve delicate phytonutrients and natural aroma.",
      icon: Flame,
    },
    {
      title: "Pan-India Fresh Dispatch",
      desc: "Airtight food-grade seal packaging dispatched directly from Kumbakonam to your doorstep across India.",
      icon: Truck,
    },
  ];

  const faqs = [
    {
      question: "Is it Amudhasurabiy or Amudhasurabi?",
      answer: "Amudhasurabiy Organics is the official registered brand name. It is also commonly searched as Amudhasurabi or Amuthasurabi — all refer to the same brand based in Kumbakonam, Tamil Nadu."
    },
    {
      question: "Are Blovit malts 100% natural with no preservatives?",
      answer: "Yes! All Blovit malt drink mixes by Amudhasurabiy Organics are manufactured using 100% natural, farm-sourced ingredients. We never add artificial preservatives, synthetic colors, chemical thickeners, or refined white sugar."
    },
    {
      question: "Which malt is best for children and healthy weight gain?",
      answer: "Blovit Nendran Banana Malt and Blovit ABC Malt are exceptional for children. Nendran Banana powder provides clean healthy calories and potassium for healthy weight gain and bone strength."
    },
    {
      question: "Do you deliver pan-India to all Indian pincodes?",
      answer: "Yes! We ship across India. Free shipping is unlocked for Tamil Nadu orders above ₹499, and for Rest of India orders above ₹999. All packages are dispatched directly from our Kumbakonam facility."
    },
    {
      question: "How do I prepare Blovit malt drinks?",
      answer: "Simply mix 2-3 tablespoons (approx 15-20g) of Blovit malt into a cup of warm milk or boiling water. Stir well. Since every mix is already naturally sweetened with raw organic palm jaggery (nattu sakkarai), there is no need to add white sugar."
    },
    {
      question: "Where are Amudhasurabiy Organics products manufactured?",
      answer: "Our products are manufactured in our licensed FSSAI facility in Kumbakonam, Thanjavur District, Tamil Nadu (FSSAI Lic No: 22421543000120), adhering to strict sanitary and small-batch roasting standards."
    }
  ];

  return (
    <>
      <JsonLd
        type="organization"
        data={{
          name: "Amudhasurabiy Organics",
          url: "https://amudhasurabiy.com"
        }}
      />
      <JsonLd
        type="faq"
        data={{
          faqs
        }}
      />

      <Header />

      <main className="min-h-screen bg-[#FDFBF7] text-[#1B1B1B]">
        
        {/* 1. HERO SECTION (Editorial D2C Natural Nutrition Entrance) */}
        <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 border-b border-[#5A3B28]/10 bg-gradient-to-b from-[#FDFBF7] via-[#F4EFEA]/60 to-[#FDFBF7]">
          {/* Subtle Ambient Background Grain/Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2E5A44]/5 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#5A3B28]/5 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Brand Story & Conversion CTAs */}
              <div className="lg:col-span-7 space-y-6 text-left">
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2E5A44]/10 text-[#2E5A44] font-heading text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="h-3.5 w-3.5 text-[#2E5A44]" />
                  <span>Amudhasurabiy Organics • Direct from Kumbakonam</span>
                </div>

                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#5A3B28] leading-[1.12]">
                  Pure natural nutrition for <br />
                  <span className="text-[#2E5A44] italic font-serif">everyday family wellness.</span>
                </h1>

                <p className="font-body text-base sm:text-lg text-[#5A3B28]/85 max-w-2xl leading-relaxed">
                  Crafted with traditional Tamil wisdom and modern FSSAI quality standards. 100% natural health drink powders made from real apples, beetroots, carrots, Kerala Nendran bananas, and sprouted grains—purely sweetened with raw organic palm sugar (nattu sakkarai).
                </p>

                {/* Hero CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href="/shop/"
                    className="bg-[#2E5A44] hover:bg-[#5A3B28] text-white px-8 py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span>Shop Blovit Malts</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/collections/"
                    className="border-2 border-[#5A3B28]/30 hover:border-[#5A3B28] text-[#5A3B28] hover:bg-[#5A3B28] hover:text-white px-8 py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300"
                  >
                    <span>Explore Collections</span>
                  </Link>

                  <Link
                    href="/wholesale/"
                    className="text-xs font-heading font-semibold uppercase tracking-wider text-[#2E5A44] hover:text-[#5A3B28] underline underline-offset-4 py-2 px-1"
                  >
                    Wholesale & Private Label →
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="pt-6 border-t border-[#5A3B28]/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-body text-[#5A3B28]/85">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#2E5A44] shrink-0" />
                    <span className="font-semibold">100% Natural Farm Sourced</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#2E5A44] shrink-0" />
                    <span className="font-semibold">Zero Preservatives</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#2E5A44] shrink-0" />
                    <span className="font-semibold">FSSAI Certified Unit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#2E5A44] shrink-0" />
                    <span className="font-semibold">Pan-India Delivery</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Hero Visual Product Pouch Showcase */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="absolute -inset-4 rounded-3xl bg-[#2E5A44]/10 blur-2xl -z-10" />
                  
                  <div className="rounded-3xl bg-white p-6 sm:p-8 border border-[#5A3B28]/10 shadow-2xl relative">
                    <div className="relative h-72 sm:h-80 w-full rounded-2xl bg-[#F4EFEA]/60 overflow-hidden flex items-center justify-center p-4">
                      <Image
                        src="/images/abc-malt.png"
                        alt="Blovit ABC Malt by Amudhasurabiy Organics"
                        width={280}
                        height={280}
                        className="h-64 w-auto object-contain transition-transform duration-700 hover:scale-105"
                        priority
                      />
                      <span className="absolute top-4 left-4 bg-[#2E5A44] text-white text-[10px] font-heading font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                        Flagship Bestseller
                      </span>
                      <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs text-[#5A3B28] text-[10px] font-heading font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-[#5A3B28]/10">
                        Sweetened with Nattu Sakkarai
                      </span>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div>
                        <span className="font-heading text-xs font-bold text-[#2E5A44] uppercase tracking-wider">
                          Apple • Beetroot • Carrot
                        </span>
                        <h3 className="font-heading text-xl font-bold text-[#5A3B28]">
                          Blovit ABC Malt (200g)
                        </h3>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="font-heading text-lg font-bold text-[#5A3B28]">₹250</span>
                          <span className="font-body text-xs text-[#5A3B28]/40 line-through">₹299</span>
                          <span className="font-heading text-xs font-bold text-[#2E5A44] bg-[#2E5A44]/10 px-2 py-0.5 rounded-full">
                            16% OFF
                          </span>
                        </div>
                      </div>
                      <Link
                        href="/product/abc-malt/"
                        className="p-3.5 rounded-full bg-[#2E5A44] hover:bg-[#5A3B28] text-white transition-all shadow-md hover:scale-105"
                        aria-label="View Product Details"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. CATEGORY QUICK DISCOVERY RAIL */}
        <section className="py-8 bg-white border-b border-[#5A3B28]/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
              {[
                { name: "ABC Malt", slug: "abc-malt", img: "/images/abc-malt.png", desc: "Apple • Beet • Carrot" },
                { name: "Beetroot Malt", slug: "beetroot-malt", img: "/images/beetroot-malt.png", desc: "Iron & Stamina" },
                { name: "Nendran Banana", slug: "nendram-banana-malt", img: "/images/nendran-banana-malt.png", desc: "Kids Growth Weight" },
                { name: "Sprouted Ragi", slug: "sprouted-ragi-malt", img: "/images/sprouted-ragi-malt.png", desc: "Bioavailable Calcium" },
                { name: "All Collections", slug: "../collections/", img: "/images/logo.png", desc: "View Full Range" },
              ].map((cat) => (
                <Link
                  key={cat.name}
                  href={`/product/${cat.slug}/`}
                  className="flex flex-col items-center gap-2 shrink-0 group"
                >
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-[#FDFBF7] border border-[#5A3B28]/10 p-2 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-[#2E5A44] group-hover:shadow-md">
                    <Image src={cat.img} alt={cat.name} width={50} height={50} className="object-contain max-h-full" />
                  </div>
                  <div className="text-center">
                    <span className="font-heading text-xs font-semibold text-[#5A3B28] group-hover:text-[#2E5A44] transition-colors block">
                      {cat.name}
                    </span>
                    <span className="text-[10px] font-body text-[#5A3B28]/60 block hidden sm:block">
                      {cat.desc}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 3. BESTSELLERS / FLAGSHIP STOREFRONT */}
        <section className="py-16 md:py-24 bg-[#FDFBF7] border-b border-[#5A3B28]/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="font-heading text-xs font-bold text-[#2E5A44] uppercase tracking-widest">
                  Direct From Our Kumbakonam Facility
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#5A3B28] tracking-tight mt-1">
                  Blovit Natural Malt Health Drinks
                </h2>
                <p className="font-body text-xs sm:text-sm text-[#5A3B28]/70 mt-1">
                  Select pack size (200g, 500g, 1kg) with transparent pricing and pan-India express delivery.
                </p>
              </div>

              <Link
                href="/shop/"
                className="font-heading text-xs font-bold text-[#2E5A44] hover:text-[#5A3B28] uppercase tracking-wider flex items-center gap-1 group transition-colors shrink-0"
              >
                <span>View Full Catalog</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p, idx) => (
                <ProductCard key={p.id} product={p} priority={idx < 2} />
              ))}
            </div>
          </div>
        </section>

        {/* 4. BRAND STORY — TRADITIONAL TAMIL FOOD WISDOM & KAUVERY DELTA HERITAGE */}
        <section className="py-16 md:py-24 bg-white border-b border-[#5A3B28]/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2E5A44]/10 text-[#2E5A44] font-heading text-xs font-bold uppercase tracking-widest">
                  <Leaf className="h-3.5 w-3.5" />
                  <span>The Amudhasurabiy Heritage</span>
                </span>

                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#5A3B28] tracking-tight leading-tight">
                  Rooted in Kumbakonam’s agricultural wisdom.
                </h2>

                <p className="font-body text-sm sm:text-base text-[#5A3B28]/85 leading-relaxed">
                  For centuries, the Cauvery Delta around Kumbakonam has been renowned for rich agricultural traditions, natural harvest preservation, and nutrient-dense traditional food preparations.
                </p>

                <p className="font-body text-sm sm:text-base text-[#5A3B28]/80 leading-relaxed">
                  At Amudhasurabiy Organics, we refuse commercial shortcuts. We never use refined white sugar, maltodextrin thickeners, synthetic vitamins, or chemical preservatives. Every spoonful of Blovit natural malt is crafted from sun-ripened farm produce, sprouted native millets, and unbleached palm jaggery (nattu sakkarai).
                </p>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#5A3B28]/10">
                  <div className="space-y-1">
                    <span className="font-heading text-2xl font-bold text-[#2E5A44]">100%</span>
                    <p className="font-body text-xs text-[#5A3B28]/70">Pure natural farm-sourced ingredients</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-heading text-2xl font-bold text-[#2E5A44]">0%</span>
                    <p className="font-body text-xs text-[#5A3B28]/70">Refined sugar, artificial colors & chemicals</p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/our-story/"
                    className="inline-flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-wider text-[#2E5A44] hover:text-[#5A3B28] transition-colors"
                  >
                    <span>Read Our Complete Founding Story</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 relative">
                <div className="relative rounded-3xl overflow-hidden border border-[#5A3B28]/10 shadow-xl bg-[#FDFBF7] p-8 space-y-6">
                  <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden">
                    <Image
                      src="/images/hero-bg.png"
                      alt="Raw natural ingredients on rustic wooden table"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5A3B28]/80 via-transparent to-transparent flex items-end p-6">
                      <p className="text-white font-heading text-sm font-bold uppercase tracking-wider">
                        Pure Farm Harvests • Sprouted Millets • Nattu Sakkarai
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F4EFEA] border border-[#5A3B28]/10 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-[#2E5A44] text-white flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-heading text-xs font-bold text-[#5A3B28] uppercase">FSSAI Licensed Facility</h4>
                      <p className="font-body text-[11px] text-[#5A3B28]/70">
                        License No: 22421543000120 | Kumbakonam, Tamil Nadu
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5. INGREDIENT-LED VISUAL STORYTELLING */}
        <section className="py-16 md:py-24 bg-[#F4EFEA]/40 border-b border-[#5A3B28]/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="font-heading text-xs font-bold text-[#2E5A44] uppercase tracking-widest">
                Ingredient Integrity
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#5A3B28] tracking-tight">
                What Goes Into Every Pouch of Blovit
              </h2>
              <p className="font-body text-xs sm:text-sm text-[#5A3B28]/75">
                Every single ingredient is selected for bioavailability, wholesome nutrition, and natural purity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ingredientsShowcase.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-3xl bg-white p-7 border border-[#5A3B28]/10 shadow-xs hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="h-12 w-12 rounded-2xl bg-[#2E5A44]/10 text-[#2E5A44] flex items-center justify-center">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-heading font-bold text-[#2E5A44] uppercase tracking-wider block mb-1">
                          {item.origin}
                        </span>
                        <h3 className="font-heading text-lg font-bold text-[#5A3B28]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="font-body text-xs text-[#5A3B28]/80 leading-relaxed">
                        {item.benefit}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#5A3B28]/10 text-[11px] font-heading font-semibold text-[#5A3B28]/70">
                      Found in: <span className="text-[#2E5A44]">{item.malt}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. QUALITY, SAFETY & MANUFACTURING STANDARDS */}
        <section className="py-16 md:py-24 bg-white border-b border-[#5A3B28]/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="font-heading text-xs font-bold text-[#2E5A44] uppercase tracking-widest">
                Manufacturing Excellence
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#5A3B28] tracking-tight">
                Modern Quality Standards. Traditional Care.
              </h2>
              <p className="font-body text-xs sm:text-sm text-[#5A3B28]/70">
                Processed in our dedicated clean-room facility adhering to rigorous food safety protocols.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {qualityStandards.map((std) => {
                const Icon = std.icon;
                return (
                  <div
                    key={std.title}
                    className="rounded-3xl bg-[#FDFBF7] p-7 border border-[#5A3B28]/10 space-y-3"
                  >
                    <div className="h-10 w-10 rounded-2xl bg-[#2E5A44]/10 text-[#2E5A44] flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-[#5A3B28]">
                      {std.title}
                    </h3>
                    <p className="font-body text-xs text-[#5A3B28]/75 leading-relaxed">
                      {std.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. INTENT-BASED HEALTH GOAL MATCHING */}
        <section className="py-16 md:py-24 bg-[#FDFBF7] border-b border-[#5A3B28]/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
              <span className="font-heading text-xs font-bold text-[#2E5A44] uppercase tracking-widest">
                Targeted Family Nutrition
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#5A3B28] tracking-tight">
                Find Nutrition That Matches Your Health Goals
              </h2>
              <p className="font-body text-xs sm:text-sm text-[#5A3B28]/70">
                Filter our small-batch malt health drink range by intended family wellness benefit.
              </p>
            </div>

            {/* Health Goal Filter Chips */}
            <div className="flex flex-wrap justify-center gap-2.5 mb-10">
              {healthGoals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGoal(g.id)}
                  className={`px-5 py-2.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-xs ${
                    selectedGoal === g.id
                      ? "bg-[#2E5A44] text-white shadow-md scale-102"
                      : "bg-white text-[#5A3B28] hover:bg-[#F4EFEA] border border-[#5A3B28]/10"
                  }`}
                >
                  {g.name}
                </button>
              ))}
            </div>

            {/* Filtered Result Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGoalProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* 8. RECIPES & PREPARATION RITUALS */}
        <section className="py-16 md:py-24 bg-white border-b border-[#5A3B28]/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="font-heading text-xs font-bold text-[#2E5A44] uppercase tracking-widest">
                  Daily Nourishment
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#5A3B28] tracking-tight mt-1">
                  How Families Enjoy Blovit Malts
                </h2>
                <p className="font-body text-xs sm:text-sm text-[#5A3B28]/70 mt-1">
                  Ready in under 2 minutes. Naturally sweetened — simply mix with warm milk or water.
                </p>
              </div>

              <Link
                href="/recipes/"
                className="font-heading text-xs font-bold text-[#2E5A44] hover:text-[#5A3B28] uppercase tracking-wider flex items-center gap-1 group transition-colors shrink-0"
              >
                <span>Browse All Recipes</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {MOCK_RECIPES.map((recipe) => (
                <div
                  key={recipe.id}
                  className="rounded-3xl bg-[#FDFBF7] border border-[#5A3B28]/10 p-7 shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-[#2E5A44]/10 text-[#2E5A44] text-[10px] font-heading font-bold uppercase tracking-wider">
                        {recipe.category}
                      </span>
                      <span className="text-[11px] font-body text-[#5A3B28]/60 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {recipe.prepTime}
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-[#5A3B28] leading-snug">
                      {recipe.title}
                    </h3>

                    <p className="font-body text-xs text-[#5A3B28]/75 leading-relaxed">
                      {recipe.description}
                    </p>

                    <div className="pt-2 text-xs font-body text-[#5A3B28]/80">
                      <strong>Key ingredients:</strong> {recipe.ingredients.slice(0, 3).join(", ")}
                    </div>
                  </div>

                  <Link
                    href={`/recipes/${recipe.slug}/`}
                    className="inline-flex items-center gap-1 text-xs font-heading font-bold text-[#2E5A44] uppercase tracking-wider hover:text-[#5A3B28] pt-4 border-t border-[#5A3B28]/10"
                  >
                    <span>View Recipe Steps</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. TESTIMONIALS */}
        <Testimonials />

        {/* 10. WHOLESALE & PRIVATE-LABEL ENQUIRY BANNER */}
        <section className="py-16 bg-[#5A3B28] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#FDFBF7] font-heading text-xs font-bold uppercase tracking-widest">
                  <Building2 className="h-3.5 w-3.5" />
                  <span>Wholesale, Retail Distribution & Private-Label</span>
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Looking for bulk supply or custom private-label manufacturing?
                </h2>
                <p className="font-body text-xs sm:text-sm text-white/85 leading-relaxed max-w-2xl">
                  We supply natural food retailers, supermarkets, organic stores, Ayurveda clinics, and consumer brands with genuine small-batch malt formulations from our Kumbakonam licensed unit.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <Link
                  href="/wholesale/"
                  className="bg-[#2E5A44] hover:bg-white hover:text-[#2E5A44] text-white px-8 py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Submit Wholesale Enquiry</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://wa.me/917010602115?text=Hello%20Amudhasurabiy%20Organics,%20I%20would%20like%20to%20discuss%20wholesale%20distribution%20opportunities."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/40 hover:bg-white/10 text-white px-8 py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2"
                >
                  <PhoneCall className="h-4 w-4" />
                  <span>WhatsApp +91 70106 02115</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 11. FAQ ACCORDION SECTION */}
        <section className="py-16 md:py-24 bg-[#FDFBF7] border-b border-[#5A3B28]/10">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-3">
              <span className="font-heading text-xs font-bold text-[#2E5A44] uppercase tracking-widest">
                Frequently Asked Questions
              </span>
              <h2 className="font-heading text-3xl font-bold text-[#5A3B28]">
                Everything You Need to Know
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl bg-white border border-[#5A3B28]/10 overflow-hidden transition-all shadow-xs"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full p-6 text-left font-heading text-sm font-bold text-[#5A3B28] flex items-center justify-between gap-4"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 text-[#2E5A44] transition-transform duration-300 shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 font-body text-xs text-[#5A3B28]/85 leading-relaxed border-t border-[#5A3B28]/5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

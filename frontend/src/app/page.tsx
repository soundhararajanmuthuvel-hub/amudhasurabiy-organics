"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, Star, ShieldCheck, Heart, Leaf, Award, 
  ChevronDown, Activity, UserCheck, Sparkles
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Testimonials from "@/components/Testimonials";
import JsonLd from "@/components/JsonLd";
import { Product } from "@/lib/api/mockData";
import { getProducts } from "@/lib/api/products";
import { trackCustomerEvent } from "@/lib/api/events";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedGoal, setSelectedGoal] = useState<string>("all");

  useEffect(() => {
    getProducts().then(setProducts);
    trackCustomerEvent("page_view", { source: "homepage" });
  }, []);

  const corporateValues = [
    { title: "Health First", desc: "Formulated to deliver maximum bioavailable nutrition for growing children and families.", icon: Activity },
    { title: "Natural Ingredients", desc: "100% farm-sourced fresh apples, beetroots, carrots, and Kerala Nendran bananas.", icon: Leaf },
    { title: "Quality Without Compromise", desc: "Zero artificial preservatives, chemical thickeners, or synthetic food colors.", icon: ShieldCheck },
    { title: "Transparency", desc: "Open ingredient labeling and raw organic palm jaggery sweetening instead of refined white sugar.", icon: Award },
    { title: "Sustainability", desc: "Supporting local agricultural growers in Tamil Nadu and eco-conscious food-grade packaging.", icon: Heart },
    { title: "Customer Trust", desc: "FSSAI licensed facility in Kumbakonam delivering pure unadulterated nutrition nationwide.", icon: UserCheck },
  ];

  const healthGoals = [
    { id: "all", name: "All Health Goals", icon: Sparkles },
    { id: "Increase Iron", name: "🩸 Increase Iron & Hemoglobin", targetId: "beetroot-malt" },
    { id: "Kids Growth & Nutrition", name: "👶 Kids Growth & Weight", targetId: "nendram-banana-malt" },
    { id: "Daily Energy", name: "⚡ Daily Stamina & Vitality", targetId: "banana-malt" },
    { id: "Family Wellness", name: "🛡️ Family Overall Wellness", targetId: "abc-malt" },
  ];



  const whyChooseUs = [
    { title: "100% Natural Ingredients", desc: "Farm-fresh produce sourced directly from trusted growers in South India.", icon: Leaf },
    { title: "No Preservatives", desc: "Prepared using authentic sun-drying and small-batch roasting methods.", icon: ShieldCheck },
    { title: "No Artificial Colours", desc: "Vibrant colors derived purely from natural beetroots, apples, and carrots.", icon: Sparkles },
    { title: "No Refined Sugar", desc: "Naturally sweetened using raw organic palm sugar (Nattu Sakkarai).", icon: Heart },
    { title: "Rich in Natural Nutrition", desc: "Bioavailable iron, calcium, potassium, and essential vitamins naturally preserved.", icon: Activity },
    { title: "Family Friendly", desc: "Safe, wholesome, and easy to prepare for children, parents, and grandparents.", icon: UserCheck },
  ];



  const faqs = [
    {
      question: "Is it Amudhasurabiy or Amudhasurabi?",
      answer: "Amudhasurabiy Organics is the official name. It's also commonly searched as Amudhasurabi or Amuthasurabi — all refer to the same brand."
    },
    {
      question: "Are Blovit malts 100% natural with no preservatives?",
      answer: "Yes! All Blovit malt drink mixes by Amudhasurabiy Organics are manufactured using 100% natural, farm-sourced ingredients. We never add artificial preservatives, synthetic colors, chemical thickeners, or refined white sugar."
    },
    {
      question: "Which malt is best for children and weight gain?",
      answer: "Blovit Nendran Banana Malt and Blovit ABC Malt are exceptional for children. Nendran Banana powder provides clean healthy calories and potassium for healthy weight gain and bone strength."
    },
    {
      question: "Where are Amudhasurabiy Organics products manufactured?",
      answer: "Our products are manufactured in our licensed FSSAI facility in Kumbakonam, Thanjavur District, Tamil Nadu, adhering to strict sanitary and small-batch roasting standards."
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

      <main className="min-h-screen bg-cream text-charcoal">
        
        {/* 1. HERO SECTION (Inspired Stage) */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-walnut-brown/10 bg-gradient-to-b from-cream via-cream-dark/30 to-cream">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Hero Content */}
              <div className="lg:col-span-7 space-y-6 text-left">
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-moss-green/10 text-moss-green font-heading text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="h-3.5 w-3.5 text-moss-green" />
                  <span>Amudhasurabiy Organics Corporate Headquarters</span>
                </div>

                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-walnut-brown leading-[1.15]">
                  Naturally Nourishing <br />
                  <span className="text-moss-green italic font-serif">Every Generation.</span>
                </h1>

                <p className="font-body text-base sm:text-lg text-walnut-brown/80 max-w-2xl leading-relaxed">
                  At <strong>Amudhasurabiy Organics</strong>, we craft premium natural food and nutrition products using carefully selected ingredients, traditional wisdom, and modern quality standards—helping families embrace healthier living every day.
                </p>

                {/* Hero CTAs */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    href="/shop/"
                    className="btn-primary px-8 py-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
                  >
                    <span>Shop Blovit Range</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/shop/"
                    className="btn-secondary px-8 py-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Shop All Products</span>
                  </Link>
                </div>

                {/* Micro Trust Tags */}
                <div className="pt-8 border-t border-walnut-brown/10 flex flex-wrap items-center gap-6 text-xs font-body text-walnut-brown/70">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-moss-green" /> 100% Farm-Fresh
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-moss-green" /> FSSAI Certified Unit
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Heart className="h-4 w-4 text-moss-green" /> Kumbakonam Sourced
                  </span>
                </div>

              </div>

              {/* Right Column: Hero Visual Showcase */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="absolute -inset-4 rounded-3xl bg-moss-green/10 blur-2xl -z-10" />
                  <div className="rounded-3xl bg-white p-6 sm:p-8 border border-walnut-brown/10 shadow-2xl relative">
                    <div className="relative h-72 sm:h-80 w-full rounded-2xl bg-cream-dark/40 overflow-hidden flex items-center justify-center p-4">
                      <Image
                        src="/images/abc-malt.png"
                        alt="Blovit ABC Malt by Amudhasurabiy Organics"
                        width={280}
                        height={280}
                        className="h-64 w-auto object-contain transition-transform duration-700 hover:scale-105"
                        priority
                      />
                      <span className="absolute top-4 left-4 bg-moss-green text-white text-[10px] font-heading font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                        Flagship Product
                      </span>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div>
                        <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-wider">
                          Flagship Brand: Blovit
                        </span>
                        <h3 className="font-heading text-xl font-bold text-walnut-brown">
                          ABC Malt (Apple, Beetroot, Carrot)
                        </h3>
                      </div>
                      <Link
                        href="/product/abc-malt/"
                        className="p-3 rounded-full bg-cream hover:bg-moss-green hover:text-white text-walnut-brown transition-all shadow"
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

        {/* 2. BRAND PHILOSOPHY SECTION (Core Belief) */}
        <section className="py-16 md:py-24 bg-walnut-brown text-cream-dark border-b border-walnut-brown/20 relative">
          <div className="mx-auto max-w-4xl px-4 text-center space-y-6">
            <span className="text-moss-green font-heading text-xs font-bold uppercase tracking-widest block">
              Corporate Brand Philosophy
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">
              &quot;Health is Wealth.&quot;
            </h2>
            <p className="font-body text-base sm:text-lg text-cream-dark/90 leading-relaxed max-w-2xl mx-auto">
              This simple belief guides everything we create—from carefully sourced ingredients to thoughtfully crafted nutrition that supports healthier families and better living.
            </p>
            <div className="pt-4">
              <Link
                href="/about/"
                className="inline-flex items-center gap-2 font-heading text-xs font-bold text-moss-green hover:text-white uppercase tracking-wider transition-colors"
              >
                <span>Read Amudhasurabiy Parent Story</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 3. OUR PURPOSE SECTION */}
        <section className="py-16 md:py-24 bg-cream border-b border-walnut-brown/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest">
                  Why Amudhasurabiy Organics Was Created
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-walnut-brown tracking-tight">
                  Restoring Pure, Chemical-Free Nutrition to Indian Homes
                </h2>
                <p className="font-body text-xs sm:text-sm text-walnut-brown/80 leading-relaxed">
                  In an era dominated by processed ultra-refined food powders packed with artificial colors, synthetic thickeners, and excessive white refined sugar, Amudhasurabiy Organics was born out of a commitment to return to real nutrition.
                </p>
                <p className="font-body text-xs sm:text-sm text-walnut-brown/80 leading-relaxed">
                  Named after the legendary vessel of unlimited abundance (*Amudha Surabhi*), our mission is to manufacture 100% natural, farm-sourced health drink mixes that families can rely on daily.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-8 border border-walnut-brown/10 shadow-lg space-y-6">
                <h3 className="font-heading text-xl font-bold text-walnut-brown">Corporate Pillars</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-2xl bg-moss-green/10 text-moss-green flex items-center justify-center shrink-0">
                      <Leaf className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-bold text-walnut-brown">100% Farm-Sourced Raw Materials</h4>
                      <p className="font-body text-xs text-walnut-brown/70">Sourced directly from local farmers in Kumbakonam and South India.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-2xl bg-moss-green/10 text-moss-green flex items-center justify-center shrink-0">
                      <Heart className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-bold text-walnut-brown">Raw Organic Palm Sugar Sweetening</h4>
                      <p className="font-body text-xs text-walnut-brown/70">Naturally sweetened with Nattu Sakkarai and raw palm jaggery.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. OUR VALUES SECTION */}
        <section className="py-16 md:py-24 bg-cream-dark/30 border-b border-walnut-brown/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest">
                Our Core Values
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-walnut-brown tracking-tight">
                Principles That Build Unshakable Trust
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {corporateValues.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="rounded-3xl bg-white p-8 border border-walnut-brown/10 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-moss-green/10 text-moss-green flex items-center justify-center">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-walnut-brown">
                      {v.title}
                    </h3>
                    <p className="font-body text-xs text-walnut-brown/75 leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>



        {/* 6. FEATURED PRODUCTS SECTION */}
        <section className="py-16 md:py-24 bg-cream-dark/20 border-b border-walnut-brown/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest">
                Flagship Consumer Products
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-walnut-brown tracking-tight">
                Blovit Natural Malt Health Drinks
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.slice(0, 3).map((p) => (
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
                        ({p.reviewCount} reviews)
                      </span>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-walnut-brown mb-1">
                      {p.name}
                    </h3>
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
          </div>
        </section>

        {/* 7. WHY CHOOSE AMUDHASURABIY ORGANICS */}
        <section className="py-16 md:py-24 bg-cream border-b border-walnut-brown/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest">
                The Amudhasurabiy Difference
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-walnut-brown tracking-tight">
                Why Families Choose Our Products
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseUs.map((w) => {
                const Icon = w.icon;
                return (
                  <div
                    key={w.title}
                    className="rounded-3xl bg-white p-8 border border-walnut-brown/10 shadow-sm space-y-3"
                  >
                    <div className="h-10 w-10 rounded-2xl bg-moss-green/10 text-moss-green flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-walnut-brown">
                      {w.title}
                    </h3>
                    <p className="font-body text-xs text-walnut-brown/70 leading-relaxed">
                      {w.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 8. HEALTH GOALS INTENT SELECTOR */}
        <section className="py-16 md:py-24 bg-cream-dark/30 border-b border-walnut-brown/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest">
                Intent-Based Product Matching
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-walnut-brown tracking-tight">
                Find Nutrition That Matches Your Health Goals
              </h2>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {healthGoals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGoal(g.id)}
                  className={`px-5 py-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
                    selectedGoal === g.id
                      ? "bg-moss-green text-white"
                      : "bg-white text-walnut-brown hover:bg-walnut-brown/10"
                  }`}
                >
                  {g.name}
                </button>
              ))}
            </div>

            {/* Products Filtered Result */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.slice(0, 3).map((p) => (
                <div
                  key={p.id}
                  className="rounded-3xl bg-white border border-walnut-brown/10 p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="h-44 w-full bg-cream-dark/30 rounded-2xl p-4 flex items-center justify-center mb-4">
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        width={180}
                        height={180}
                        className="h-36 w-auto object-contain"
                      />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-walnut-brown mb-1">
                      Blovit — {p.name}
                    </h3>
                    <p className="font-body text-xs text-walnut-brown/70 leading-relaxed mb-4">
                      {p.description}
                    </p>
                  </div>
                  <Link
                    href={`/product/${p.slug}/`}
                    className="w-full bg-moss-green text-white text-center py-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-colors hover:bg-walnut-brown"
                  >
                    Select Product — ₹{p.price}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. HEALTH LIBRARY & BLOGS */}
        <section className="py-16 md:py-24 bg-cream border-b border-walnut-brown/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest">
                  Educational Content
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-walnut-brown mt-1">
                  Amudhasurabiy Health Library
                </h2>
              </div>
              <Link
                href="/health-library/"
                className="font-heading text-xs font-bold text-moss-green hover:text-walnut-brown uppercase tracking-wider flex items-center gap-1 group transition-colors"
              >
                <span>Browse All Articles</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-3xl bg-white border border-walnut-brown/10 p-8 shadow-sm space-y-4">
                <span className="px-3 py-1 rounded-full bg-moss-green/10 text-moss-green text-[10px] font-heading font-bold uppercase">
                  Nutritional Science
                </span>
                <h3 className="font-heading text-lg font-bold text-walnut-brown leading-snug">
                  Why ABC Malt (Apple, Beetroot, Carrot) Boosts Hemoglobin
                </h3>
                <p className="font-body text-xs text-walnut-brown/70 leading-relaxed">
                  Discover how bioavailable iron from beetroots and Vitamin C from fresh apples combine for daily stamina.
                </p>
                <Link
                  href="/health-library/why-abc-malt-is-the-ultimate-morning-drink/"
                  className="inline-flex items-center gap-1 text-xs font-heading font-bold text-moss-green uppercase tracking-wider hover:text-walnut-brown"
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="rounded-3xl bg-white border border-walnut-brown/10 p-8 shadow-sm space-y-4">
                <span className="px-3 py-1 rounded-full bg-moss-green/10 text-moss-green text-[10px] font-heading font-bold uppercase">
                  Kids Growth
                </span>
                <h3 className="font-heading text-lg font-bold text-walnut-brown leading-snug">
                  Kerala Nendran Banana Powder for Toddler Weight Gain
                </h3>
                <p className="font-body text-xs text-walnut-brown/70 leading-relaxed">
                  Traditional South Indian nutrition wisdom for healthy calories, easy digestion, and bone strength.
                </p>
                <Link
                  href="/health-library/nendran-banana-powder-for-toddler-weight-gain/"
                  className="inline-flex items-center gap-1 text-xs font-heading font-bold text-moss-green uppercase tracking-wider hover:text-walnut-brown"
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="rounded-3xl bg-white border border-walnut-brown/10 p-8 shadow-sm space-y-4">
                <span className="px-3 py-1 rounded-full bg-moss-green/10 text-moss-green text-[10px] font-heading font-bold uppercase">
                  Ingredient Wisdom
                </span>
                <h3 className="font-heading text-lg font-bold text-walnut-brown leading-snug">
                  The Sugar Trap: Why Raw Organic Palm Sugar Matters
                </h3>
                <p className="font-body text-xs text-walnut-brown/70 leading-relaxed">
                  How raw palm jaggery (Nattu Sakkarai) provides sustained energy without white sugar glycemic spikes.
                </p>
                <Link
                  href="/health-library/dangers-of-refined-sugar-in-commercial-health-drinks/"
                  className="inline-flex items-center gap-1 text-xs font-heading font-bold text-moss-green uppercase tracking-wider hover:text-walnut-brown"
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 10. GOOGLE VERIFIED REVIEWS MARQUEE (Social Proof) */}
        <Testimonials />

        {/* 11. FAQ ACCORDION SECTION */}
        <section className="py-16 md:py-24 bg-cream border-b border-walnut-brown/10">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-3">
              <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest">
                Frequently Asked Questions
              </span>
              <h2 className="font-heading text-3xl font-bold text-walnut-brown">
                Everything You Need to Know
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl bg-white border border-walnut-brown/10 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full p-6 text-left font-heading text-sm font-bold text-walnut-brown flex items-center justify-between gap-4"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 text-moss-green transition-transform duration-300 shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 font-body text-xs text-walnut-brown/80 leading-relaxed border-t border-walnut-brown/5">
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

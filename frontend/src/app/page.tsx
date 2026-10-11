"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, ShieldCheck, Leaf, 
  ChevronDown, Sparkles, Truck, Check,
  Clock, Flame, Droplets, Heart,
  Coffee, Package
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

  useEffect(() => {
    getProducts().then(setProducts).catch(() => setProducts(MOCK_PRODUCTS));
    trackCustomerEvent("page_view", { source: "homepage" });
  }, []);

  const trustPoints = [
    {
      title: "100% Farm-Sourced",
      desc: "Pure fruits & sprouted millets, sweetened only with unbleached country jaggery.",
      icon: Leaf,
    },
    {
      title: "FSSAI Licensed Facility",
      desc: "Small-batch roasted in Kumbakonam, Tamil Nadu (Lic No: 22421543000120).",
      icon: ShieldCheck,
    },
    {
      title: "Pan-India Express Delivery",
      desc: "Direct dispatch from Kumbakonam to all Indian pincodes with real-time tracking.",
      icon: Truck,
    },
    {
      title: "Direct Customer Care",
      desc: "Friendly assistance via WhatsApp and phone direct from our Kumbakonam team.",
      icon: Heart,
    },
  ];

  const ingredientsShowcase = [
    {
      title: "Farm Beetroots & Apples",
      origin: "Fresh Regional Harvests",
      benefit: "Naturally rich in bioavailable iron, folate, and Vitamin C for healthy hemoglobin and daily vitality.",
      malt: "Blovit ABC & Beetroot Malt",
      slug: "abc-malt",
      icon: Droplets,
    },
    {
      title: "Sun-Dried Kerala Nendran Bananas",
      origin: "Kerala Plantation Harvest",
      benefit: "Clean, natural calories, potassium, and dietary fiber supporting healthy weight and active energy.",
      malt: "Blovit Nendran Banana Malt",
      slug: "nendram-banana-malt",
      icon: Sparkles,
    },
    {
      title: "Sprouted Finger Millet (Ragi)",
      origin: "Traditional Germination Method",
      benefit: "Traditional sprouted native grain providing wholesome nourishment and minerals.",
      malt: "Present in Blovit Malt Blends",
      slug: "abc-malt",
      icon: Leaf,
    },
    {
      title: "Pure Country Jaggery (Nattu Sakkarai)",
      origin: "Unbleached Native Cane Sugar",
      benefit: "Traditional slow-burning sweetness. Zero refined white sugar, artificial syrups, or fillers.",
      malt: "Present in all Blovit Malts",
      slug: "abc-malt",
      icon: Flame,
    },
  ];

  const whyChoosePoints = [
    {
      title: "Transparent Ingredients",
      desc: "100% natural farm ingredients. Zero refined white sugar, zero chemical preservatives, zero artificial food coloring.",
      icon: Leaf,
    },
    {
      title: "2-Minute Preparation",
      desc: "Blends smoothly with warm milk or boiled water. Naturally sweetened, requiring no additional sugar or sweetener.",
      icon: Coffee,
    },
    {
      title: "Convenient 200 g Pack",
      desc: "Available in convenient 200 g food-grade pouches, sealed to ensure freshness for everyday family use.",
      icon: Package,
    },
    {
      title: "Resealable Food-Grade Pouches",
      desc: "Airtight multi-layer barrier packaging protects delicate natural ingredients and keeps out humidity.",
      icon: ShieldCheck,
    },
  ];

  const prepSteps = [
    {
      step: "01",
      title: "Add 2 Heaped Spoons",
      desc: "Scoop approximately 15g - 20g of Blovit Malt powder into a clean glass or cup.",
    },
    {
      step: "02",
      title: "Pour Warm Milk or Water",
      desc: "Add 150ml - 200ml of hot or warm milk (cow milk or plant milk) or boiled water.",
    },
    {
      step: "03",
      title: "Stir Smoothly & Enjoy",
      desc: "Stir until dissolved. No refined white sugar needed—it is already naturally sweetened with country jaggery.",
    },
  ];

  const faqs = [
    {
      question: "What makes Blovit Malts different from commercial health drink powders?",
      answer: "Blovit malts by Amudhasurabiy Organics are made exclusively from real farm produce, sprouted native grains, and unbleached country jaggery (nattu sakkarai). We never use chemical preservatives, artificial colors, or artificial thickeners."
    },
    {
      question: "Which Blovit malt is best suited for children and toddlers?",
      answer: "Blovit Nendran Banana Malt and Blovit ABC Malt are customer favorites for children. Nendran banana provides familiar, comforting taste, while ABC Malt provides apple, beetroot, and carrot goodness."
    },
    {
      question: "How do I prepare Blovit malt drinks?",
      answer: "Mix 2 heaped tablespoons (approx 15-20g) of Blovit malt into a cup (150-200ml) of warm milk or boiled water. Stir well. Since every mix is already naturally sweetened with unrefined country jaggery, you do not need to add any sugar."
    },
    {
      question: "What pack sizes are available and what is the shelf life?",
      answer: "Our products are available in convenient 200 g airtight resealable pouches. Store in a cool, dry place away from direct sunlight. Once opened, seal the pouch tightly or transfer to an airtight container. The shelf life is 6 months from the date of manufacture."
    },
    {
      question: "Do you ship Pan-India and what are the delivery charges?",
      answer: "Yes, we ship across India to all serviceable pincodes. Orders within Tamil Nadu enjoy free delivery on orders above ₹499. Orders across the Rest of India qualify for free shipping above ₹999. All packages are dispatched directly from our licensed facility in Kumbakonam."
    },
    {
      question: "Where are Amudhasurabiy Organics products manufactured?",
      answer: "Our products are manufactured in our licensed FSSAI facility in Kumbakonam, Thanjavur District, Tamil Nadu (FSSAI Lic No: 22421543000120), adhering to rigorous food safety, hygienic handling, and small-batch roasting protocols."
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
        
        {/* =========================================================================
            SECTION A — IMMERSIVE HERO (Reference 1 Aesthetic Direction)
            Large rounded hero composition framed by deep forest-green surroundings,
            natural warm-cream panel, packaging focal point, and clear calls to action.
            ========================================================================= */}
        <section className="bg-[#0B351C] px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-10 sm:pb-16 md:pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-3xl lg:rounded-[2.5rem] bg-[#FDFBF7] border border-white/20 shadow-2xl p-6 sm:p-10 lg:p-16">
              
              {/* Subtle Botanical Ambient Accents */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8F0E3] rounded-full blur-3xl pointer-events-none -z-0 opacity-70" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#B9CBB5]/20 rounded-full blur-3xl pointer-events-none -z-0" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Column: Editorial Headline & Actions */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  
                  {/* Brand Tagline Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F0E3] text-[#2E5A44] font-heading text-xs font-bold uppercase tracking-widest border border-[#B9CBB5]/50">
                    <Sparkles className="h-3.5 w-3.5 text-[#2E5A44]" />
                    <span>Amudhasurabiy Organics &bull; Kumbakonam</span>
                  </div>

                  {/* Headline from Prompt */}
                  <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0B351C] leading-[1.12]">
                    Everyday Nutrition, <br />
                    <span className="text-[#2E5A44] font-serif italic">Rooted in Nature.</span>
                  </h1>

                  {/* Supporting Copy from Prompt */}
                  <p className="font-body text-base sm:text-lg text-[#5A3B28] max-w-xl leading-relaxed">
                    Discover thoughtfully crafted malt blends inspired by natural ingredients and everyday family routines. Purely sweetened with unbleached country jaggery.
                  </p>

                  {/* Primary & Secondary CTAs from Prompt */}
                  <div className="pt-2 flex flex-wrap items-center gap-3.5">
                    <Link
                      href="/shop/"
                      className="bg-[#2E5A44] hover:bg-[#0B351C] text-white px-8 py-3.5 sm:py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-102"
                    >
                      <span>Shop Blovit</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      href="/our-story/"
                      className="border-2 border-[#5A3B28]/30 hover:border-[#5A3B28] text-[#5A3B28] hover:bg-[#5A3B28] hover:text-white px-7 py-3.5 sm:py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300"
                    >
                      <span>Discover Our Story</span>
                    </Link>
                  </div>

                  {/* Key Editorial Trust Highlights */}
                  <div className="pt-6 border-t border-[#5A3B28]/10 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-body text-[#5A3B28]">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#2E5A44] shrink-0" />
                      <span className="font-semibold">Zero Refined Sugar</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#2E5A44] shrink-0" />
                      <span className="font-semibold">Zero Preservatives</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#2E5A44] shrink-0" />
                      <span className="font-semibold">Pan-India Delivery</span>
                    </div>
                  </div>

                </div>

                {/* Right Column: Authentic Packaging Focal Point */}
                <div className="lg:col-span-5 relative">
                  <div className="relative mx-auto max-w-sm lg:max-w-none">
                    
                    {/* Packaging Display Card */}
                    <div className="rounded-3xl bg-white p-5 sm:p-7 border border-[#5A3B28]/10 shadow-xl relative">
                      
                      {/* Pouch Container */}
                      <div className="relative h-64 sm:h-76 w-full rounded-2xl bg-[#FDFBF7] border border-[#5A3B28]/8 overflow-hidden flex items-center justify-center p-3">
                        <Image
                          src="/images/abc-malt.png"
                          alt="Blovit ABC Malt natural health drink packaging by Amudhasurabiy Organics"
                          width={260}
                          height={260}
                          className="h-56 sm:h-68 w-auto object-contain transition-transform duration-700 hover:scale-105"
                          priority
                        />
                        <span className="absolute top-3 left-3 bg-[#2E5A44] text-white text-[10px] font-heading font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                          Flagship Blend
                        </span>
                        <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-[#5A3B28] text-[9px] sm:text-[10px] font-heading font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#5A3B28]/10">
                          Apple &bull; Beet &bull; Carrot
                        </span>
                      </div>

                      {/* Product Card Details */}
                      <div className="mt-5 flex items-center justify-between">
                        <div>
                          <span className="font-heading text-[11px] font-bold text-[#2E5A44] uppercase tracking-wider block">
                            Nature&apos;s goodness in every sip.
                          </span>
                          <h2 className="font-heading text-lg sm:text-xl font-bold text-[#5A3B28]">
                            Blovit ABC Malt — 200 g
                          </h2>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="font-heading text-lg font-bold text-[#5A3B28]">₹250</span>
                            <span className="font-body text-xs text-[#5A3B28]/40 line-through">₹299</span>
                            <span className="font-heading text-[10px] font-bold text-[#2E5A44] bg-[#2E5A44]/10 px-2 py-0.5 rounded-full">
                              16% OFF
                            </span>
                          </div>
                        </div>

                        <Link
                          href="/product/abc-malt/"
                          className="p-3 rounded-full bg-[#2E5A44] hover:bg-[#0B351C] text-white transition-all shadow-md hover:scale-105"
                          aria-label="View Blovit ABC Malt"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>

                    </div>

                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION B — TRUST STRIP
            Concise trust points with simple line icons and verified details.
            ========================================================================= */}
        <section className="py-8 sm:py-10 bg-white border-b border-[#5A3B28]/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {trustPoints.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3.5">
                    <div className="h-10 w-10 rounded-xl bg-[#E8F0E3] text-[#2E5A44] flex items-center justify-center shrink-0 border border-[#B9CBB5]/40">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xs sm:text-sm font-bold text-[#5A3B28]">
                        {item.title}
                      </h3>
                      <p className="font-body text-[11px] sm:text-xs text-[#5A3B28]/70 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION C — SHOP THE BLOVIT RANGE
            4-column desktop, 2-column mobile responsive product collection grid.
            ========================================================================= */}
        <section className="py-14 sm:py-20 md:py-24 bg-[#FDFBF7] border-b border-[#5A3B28]/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
              <div>
                <span className="font-heading text-xs font-bold text-[#2E5A44] uppercase tracking-widest block mb-1">
                  Small-Batch Formulations &bull; Kumbakonam
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#5A3B28] tracking-tight">
                  Shop the Blovit Range
                </h2>
                <p className="font-body text-xs sm:text-sm text-[#5A3B28]/70 mt-1 max-w-xl">
                  Thoughtfully crafted natural malt health drink mixes for the whole family, made with sun-dried fruits, sprouted millets, and unbleached country jaggery.
                </p>
              </div>

              <Link
                href="/shop/"
                className="font-heading text-xs font-bold text-[#2E5A44] hover:text-[#0B351C] uppercase tracking-wider flex items-center gap-1 group transition-colors shrink-0"
              >
                <span>View All Products</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Responsive Product Grid: 4-col desktop, 2-col mobile */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {products.map((p, idx) => (
                <ProductCard key={p.id} product={p} priority={idx < 2} />
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION D — INGREDIENT-LED STORYTELLING
            Editorial storytelling explaining the real ingredients across the range.
            ========================================================================= */}
        <section className="py-14 sm:py-20 md:py-24 bg-white border-b border-[#5A3B28]/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2.5">
              <span className="font-heading text-xs font-bold text-[#2E5A44] uppercase tracking-widest block">
                Ingredient Integrity
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#5A3B28] tracking-tight">
                Rooted in Real, Wholesome Ingredients
              </h2>
              <p className="font-body text-xs sm:text-sm text-[#5A3B28]/75">
                Every Blovit recipe is built around regional farm produce and traditional sprouting, with zero fillers or artificial chemicals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {ingredientsShowcase.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl sm:rounded-3xl bg-[#FDFBF7] p-6 sm:p-7 border border-[#5A3B28]/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="h-12 w-12 rounded-2xl bg-[#E8F0E3] text-[#2E5A44] flex items-center justify-center border border-[#B9CBB5]/40">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-heading font-bold text-[#2E5A44] uppercase tracking-wider block mb-1">
                          {item.origin}
                        </span>
                        <h3 className="font-heading text-base sm:text-lg font-bold text-[#5A3B28]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="font-body text-xs text-[#5A3B28]/80 leading-relaxed">
                        {item.benefit}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#5A3B28]/10">
                      <Link
                        href={`/product/${item.slug}/`}
                        className="text-[11px] font-heading font-semibold text-[#2E5A44] hover:text-[#0B351C] inline-flex items-center gap-1 group"
                      >
                        <span>Found in {item.malt}</span>
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION E — OUR STORY
            Parent brand Amudhasurabiy Organics and Blovit malt brand editorial split.
            ========================================================================= */}
        <section className="py-14 sm:py-20 md:py-24 bg-[#E8F0E3]/40 border-b border-[#5A3B28]/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Visual Heritage Panel */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-3xl overflow-hidden border border-[#5A3B28]/10 shadow-xl bg-white p-6 sm:p-8 space-y-6">
                  <div className="relative h-64 sm:h-76 w-full rounded-2xl overflow-hidden">
                    <Image
                      src="/images/hero-bg.png"
                      alt="Traditional natural ingredients and rustic grains of Amudhasurabiy Organics"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B351C]/90 via-[#0B351C]/30 to-transparent flex items-end p-6">
                      <p className="text-white font-heading text-xs sm:text-sm font-bold uppercase tracking-wider">
                        Cauvery Delta Agriculture &bull; Kumbakonam, Tamil Nadu
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#5A3B28]/10 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-[#2E5A44] text-white flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-heading text-xs font-bold text-[#5A3B28] uppercase">
                        FSSAI Licensed Facility
                      </h4>
                      <p className="font-body text-[11px] text-[#5A3B28]/70">
                        Lic No: 22421543000120 &bull; Licensed small-batch facility in Kumbakonam
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Narrative */}
              <div className="lg:col-span-6 space-y-6">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F0E3] text-[#2E5A44] font-heading text-xs font-bold uppercase tracking-widest border border-[#B9CBB5]/50">
                  <Leaf className="h-3.5 w-3.5" />
                  <span>The Amudhasurabiy Heritage</span>
                </span>

                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B351C] tracking-tight leading-tight">
                  Rooted in Kumbakonam’s agricultural traditions.
                </h2>

                <p className="font-body text-sm sm:text-base text-[#5A3B28]/90 leading-relaxed">
                  Amudhasurabiy Organics is founded in Kumbakonam, in the heart of Tamil Nadu’s historic Cauvery Delta. For generations, this region has celebrated natural food preparations that nourish the body without relying on synthetic shortcuts.
                </p>

                <p className="font-body text-sm sm:text-base text-[#5A3B28]/85 leading-relaxed">
                  Through our consumer product brand, <strong>Blovit Natural Malts</strong>, we bring traditional wholesome nourishment into modern family homes. We use zero refined white sugar, zero maltodextrin fillers, and zero chemical preservatives—relying solely on slow-roasted grains, farm fruits, and native palm jaggery.
                </p>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#5A3B28]/10">
                  <div className="space-y-1">
                    <span className="font-heading text-2xl font-bold text-[#2E5A44]">100%</span>
                    <p className="font-body text-xs text-[#5A3B28]/70">Farm-sourced natural ingredients</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-heading text-2xl font-bold text-[#2E5A44]">0%</span>
                    <p className="font-body text-xs text-[#5A3B28]/70">Refined sugar & chemical preservatives</p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/our-story/"
                    className="inline-flex items-center gap-2 bg-[#2E5A44] hover:bg-[#0B351C] text-white px-7 py-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                  >
                    <span>Discover Our Story</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION F — WHY CHOOSE BLOVIT?
            Balanced grid of verified product & service information.
            ========================================================================= */}
        <section className="py-14 sm:py-20 md:py-24 bg-white border-b border-[#5A3B28]/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2.5">
              <span className="font-heading text-xs font-bold text-[#2E5A44] uppercase tracking-widest block">
                The Blovit Difference
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#5A3B28] tracking-tight">
                Why Families Choose Blovit
              </h2>
              <p className="font-body text-xs sm:text-sm text-[#5A3B28]/70">
                Crafted with care, packaged with integrity, and delivered fresh across India.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChoosePoints.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl sm:rounded-3xl bg-[#FDFBF7] p-6 sm:p-7 border border-[#5A3B28]/10 space-y-3.5 hover:shadow-sm transition-all"
                  >
                    <div className="h-11 w-11 rounded-2xl bg-[#E8F0E3] text-[#2E5A44] flex items-center justify-center border border-[#B9CBB5]/40">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-[#5A3B28]">
                      {item.title}
                    </h3>
                    <p className="font-body text-xs text-[#5A3B28]/75 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION G — HOW TO PREPARE
            Clear, genuine 3-step ritual using verified instructions.
            ========================================================================= */}
        <section className="py-14 sm:py-20 md:py-24 bg-[#FDFBF7] border-b border-[#5A3B28]/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2.5">
              <span className="font-heading text-xs font-bold text-[#2E5A44] uppercase tracking-widest block">
                Daily Ritual
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#5A3B28] tracking-tight">
                How to Prepare Your Blovit Drink
              </h2>
              <p className="font-body text-xs sm:text-sm text-[#5A3B28]/70">
                Ready in under 2 minutes. Naturally sweetened with country jaggery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {prepSteps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl sm:rounded-3xl bg-white p-7 sm:p-8 border border-[#5A3B28]/10 shadow-xs relative flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <span className="font-heading text-3xl sm:text-4xl font-bold text-[#2E5A44]/30 block">
                      {step.step}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-[#5A3B28]">
                      {step.title}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-[#5A3B28]/75 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <div className="pt-6 mt-4 border-t border-[#5A3B28]/5 flex items-center gap-2 text-xs font-heading font-semibold text-[#2E5A44]">
                    <Check className="h-4 w-4" />
                    <span>Simple &bull; Wholesome &bull; Delicious</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION H — CUSTOMER REVIEWS
            Authentic customer reviews with rating metrics and verified purchaser tags.
            ========================================================================= */}
        <Testimonials />

        {/* =========================================================================
            SECTION I — RECIPES AND LEARNING
            Editorial content grid for verified recipes linking to valid pages.
            ========================================================================= */}
        <section className="py-14 sm:py-20 md:py-24 bg-white border-b border-[#5A3B28]/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
              <div>
                <span className="font-heading text-xs font-bold text-[#2E5A44] uppercase tracking-widest block mb-1">
                  Kitchen Inspiration
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#5A3B28] tracking-tight">
                  Recipes &amp; Everyday Nutrition
                </h2>
                <p className="font-body text-xs sm:text-sm text-[#5A3B28]/70 mt-1">
                  Discover simple, wholesome recipes using Blovit natural malts for breakfast and evening routines.
                </p>
              </div>

              <Link
                href="/recipes/"
                className="font-heading text-xs font-bold text-[#2E5A44] hover:text-[#0B351C] uppercase tracking-wider flex items-center gap-1 group transition-colors shrink-0"
              >
                <span>Browse All Recipes</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {MOCK_RECIPES.map((recipe) => (
                <div
                  key={recipe.id}
                  className="rounded-2xl sm:rounded-3xl bg-[#FDFBF7] border border-[#5A3B28]/10 p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-[#E8F0E3] text-[#2E5A44] text-[10px] font-heading font-bold uppercase tracking-wider">
                        {recipe.category}
                      </span>
                      <span className="text-[11px] font-body text-[#5A3B28]/60 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {recipe.prepTime}
                      </span>
                    </div>

                    <h3 className="font-heading text-base sm:text-lg font-bold text-[#5A3B28] leading-snug">
                      {recipe.title}
                    </h3>

                    <p className="font-body text-xs text-[#5A3B28]/75 leading-relaxed">
                      {recipe.description}
                    </p>

                    <div className="pt-2 text-xs font-body text-[#5A3B28]/80">
                      <strong>Ingredients:</strong> {recipe.ingredients.slice(0, 3).join(", ")}
                    </div>
                  </div>

                  <Link
                    href={`/recipes/${recipe.slug}/`}
                    className="inline-flex items-center gap-1 text-xs font-heading font-bold text-[#2E5A44] uppercase tracking-wider hover:text-[#0B351C] pt-4 border-t border-[#5A3B28]/10"
                  >
                    <span>View Recipe Details</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION J — FAQ ACCORDION
            Answers to practical questions about sizes, ingredients, storage, shipping.
            ========================================================================= */}
        <section className="py-14 sm:py-20 md:py-24 bg-[#FDFBF7] border-b border-[#5A3B28]/10">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2.5">
              <span className="font-heading text-xs font-bold text-[#2E5A44] uppercase tracking-widest block">
                Got Questions?
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#5A3B28]">
                Frequently Asked Questions
              </h2>
              <p className="font-body text-xs sm:text-sm text-[#5A3B28]/70">
                Clear answers regarding our ingredients, preparation, delivery, and policies.
              </p>
            </div>

            <div className="space-y-3.5">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl bg-white border border-[#5A3B28]/10 overflow-hidden transition-all shadow-xs"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full p-5 sm:p-6 text-left font-heading text-sm font-bold text-[#5A3B28] flex items-center justify-between gap-4"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-[#2E5A44] transition-transform duration-300 shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 font-body text-xs sm:text-sm text-[#5A3B28]/85 leading-relaxed border-t border-[#5A3B28]/5">
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

      {/* =========================================================================
          SECTION K — NEWSLETTER AND FOOTER
          Clean verified newsletter subscription and comprehensive footer links.
          ========================================================================= */}
      <Footer />
      <WhatsAppButton />
    </>
  );
}

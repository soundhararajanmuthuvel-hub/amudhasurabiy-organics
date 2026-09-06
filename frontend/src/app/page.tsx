"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, ShieldCheck, Heart, Leaf, Award, 
  ChevronDown, Activity, UserCheck, Sparkles, Truck, Check
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Testimonials from "@/components/Testimonials";
import JsonLd from "@/components/JsonLd";
import ProductCard from "@/components/ProductCard";
import { Product, MOCK_PRODUCTS } from "@/lib/api/mockData";
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
    { id: "all", name: "All Health Goals", icon: Sparkles },
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

  const whyChooseUs = [
    { title: "100% Farm-Sourced Purity", desc: "Farm-fresh produce sourced directly from trusted growers in Kumbakonam & Kerala.", icon: Leaf },
    { title: "Zero Artificial Preservatives", desc: "Prepared using authentic sun-drying and small-batch roasting methods.", icon: ShieldCheck },
    { title: "No Artificial Colours or Flavours", desc: "Vibrant colors derived purely from natural beetroots, apples, and carrots.", icon: Sparkles },
    { title: "Sweetened with Nattu Sakkarai", desc: "Naturally sweetened using raw organic palm jaggery instead of refined white sugar.", icon: Heart },
    { title: "Rich in Bioavailable Nutrition", desc: "Naturally occurring iron, calcium, potassium, and essential vitamins naturally preserved.", icon: Activity },
    { title: "Pan-India Express Delivery", desc: "Safe, food-grade sealed dispatch from Kumbakonam to any Indian pincode.", icon: Truck },
  ];

  const corporateValues = [
    { title: "Health First", desc: "Formulated to deliver maximum bioavailable nutrition for growing children and families.", icon: Activity },
    { title: "Natural Ingredients", desc: "100% farm-sourced fresh apples, beetroots, carrots, and Kerala Nendran bananas.", icon: Leaf },
    { title: "Quality Without Compromise", desc: "Zero artificial preservatives, chemical thickeners, or synthetic food colors.", icon: ShieldCheck },
    { title: "Transparency", desc: "Open ingredient labeling and raw organic palm jaggery sweetening instead of refined white sugar.", icon: Award },
    { title: "Sustainability", desc: "Supporting local agricultural growers in Tamil Nadu and eco-conscious food-grade packaging.", icon: Heart },
    { title: "Customer Trust", desc: "FSSAI licensed facility in Kumbakonam (Lic No: 22421543000120) delivering unadulterated nutrition nationwide.", icon: UserCheck },
  ];

  const faqs = [
    {
      question: "Is it Amudhasurabiy or Amudhasurabi?",
      answer: "Amudhasurabiy Organics is the official brand name. It is also commonly searched as Amudhasurabi or Amuthasurabi — all refer to the same brand based in Kumbakonam, Tamil Nadu."
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

      <main className="min-h-screen bg-cream text-charcoal">
        
        {/* 1. HERO SECTION (High-Conversion D2C Brand Entrance) */}
        <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 border-b border-walnut-brown/10 bg-gradient-to-b from-cream via-cream-dark/30 to-cream">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Hero Content */}
              <div className="lg:col-span-7 space-y-6 text-left">
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-moss-green/10 text-moss-green font-heading text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="h-3.5 w-3.5 text-moss-green" />
                  <span>Amudhasurabiy Organics • Direct from Kumbakonam</span>
                </div>

                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-walnut-brown leading-[1.12]">
                  Natural nutrition for <br />
                  <span className="text-moss-green italic font-serif">everyday family wellness.</span>
                </h1>

                <p className="font-body text-base sm:text-lg text-walnut-brown/80 max-w-2xl leading-relaxed">
                  Crafted with traditional Tamil wisdom and modern FSSAI quality standards. Pure organic health drink powders made from real apples, beetroots, carrots, Kerala Nendran bananas, and sprouted grains—naturally sweetened with raw organic palm sugar.
                </p>

                {/* Hero CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href="/shop/"
                    className="bg-moss-green hover:bg-walnut-brown text-white px-8 py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span>Shop Blovit Malts</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/shop/"
                    className="border-2 border-walnut-brown/30 hover:border-walnut-brown text-walnut-brown hover:bg-walnut-brown hover:text-white px-8 py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300"
                  >
                    <span>Explore Our Malts</span>
                  </Link>
                </div>

                {/* Authentic Trust Indicators */}
                <div className="pt-6 border-t border-walnut-brown/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-body text-walnut-brown/80">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-moss-green shrink-0" />
                    <span className="font-semibold">100% Natural</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-moss-green shrink-0" />
                    <span className="font-semibold">No Preservatives</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-moss-green shrink-0" />
                    <span className="font-semibold">Made in Tamil Nadu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-moss-green shrink-0" />
                    <span className="font-semibold">Pan-India Delivery</span>
                  </div>
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
                      <span className="absolute top-4 left-4 bg-moss-green text-white text-[10px] font-heading font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                        Flagship Bestseller
                      </span>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div>
                        <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-wider">
                          Apple • Beetroot • Carrot
                        </span>
                        <h3 className="font-heading text-xl font-bold text-walnut-brown">
                          Blovit ABC Malt (200g)
                        </h3>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="font-heading text-lg font-bold text-walnut-brown">₹250</span>
                          <span className="font-body text-xs text-walnut-brown/40 line-through">₹299</span>
                          <span className="font-heading text-xs font-bold text-moss-green bg-moss-green/10 px-2 py-0.5 rounded-full">
                            16% OFF
                          </span>
                        </div>
                      </div>
                      <Link
                        href="/product/abc-malt/"
                        className="p-3.5 rounded-full bg-moss-green hover:bg-walnut-brown text-white transition-all shadow-md hover:scale-105"
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

        {/* 2. CATEGORY QUICK DISCOVERY RAIL (Amazon/Flipkart Style) */}
        <section className="py-8 bg-white border-b border-walnut-brown/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
              {[
                { name: "ABC Malt", slug: "abc-malt", img: "/images/abc-malt.png" },
                { name: "Beetroot Malt", slug: "beetroot-malt", img: "/images/beetroot-malt.png" },
                { name: "Nendran Banana", slug: "nendram-banana-malt", img: "/images/nendran-banana-malt.png" },
                { name: "Sprouted Ragi", slug: "sprouted-ragi-malt", img: "/images/sprouted-ragi-malt.png" },
                { name: "All Collections", slug: "../collections/", img: "/images/logo.png" },
              ].map((cat) => (
                <Link
                  key={cat.name}
                  href={`/product/${cat.slug}/`}
                  className="flex flex-col items-center gap-2 shrink-0 group"
                >
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-cream border border-walnut-brown/10 p-2 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-moss-green group-hover:shadow-md">
                    <Image src={cat.img} alt={cat.name} width={50} height={50} className="object-contain max-h-full" />
                  </div>
                  <span className="font-heading text-xs font-semibold text-walnut-brown group-hover:text-moss-green transition-colors text-center">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 3. BESTSELLERS / FLAGSHIP STOREFRONT (Amazon/Flipkart Card Grid) */}
        <section className="py-16 md:py-24 bg-cream border-b border-walnut-brown/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest">
                  Direct From Our Facility
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-walnut-brown tracking-tight mt-1">
                  Blovit Natural Malt Health Drinks
                </h2>
                <p className="font-body text-xs sm:text-sm text-walnut-brown/70 mt-1">
                  Select pack size (200g, 500g, 1kg) and order online with pan-India delivery.
                </p>
              </div>

              <Link
                href="/shop/"
                className="font-heading text-xs font-bold text-moss-green hover:text-walnut-brown uppercase tracking-wider flex items-center gap-1 group transition-colors shrink-0"
              >
                <span>View Full Catalog</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Amazon/Flipkart-Style Functional Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p, idx) => (
                <ProductCard key={p.id} product={p} priority={idx < 2} />
              ))}
            </div>
          </div>
        </section>

        {/* 4. INTENT-BASED HEALTH GOAL MATCHING */}
        <section className="py-16 md:py-24 bg-cream-dark/30 border-b border-walnut-brown/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
              <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest">
                Targeted Family Nutrition
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-walnut-brown tracking-tight">
                Find Nutrition That Matches Your Health Goals
              </h2>
              <p className="font-body text-xs sm:text-sm text-walnut-brown/70">
                Each Blovit formulation is tailored for specific everyday nutrition needs.
              </p>
            </div>

            {/* Health Goal Chips */}
            <div className="flex flex-wrap justify-center gap-2.5 mb-10">
              {healthGoals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGoal(g.id)}
                  className={`px-5 py-2.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-xs ${
                    selectedGoal === g.id
                      ? "bg-moss-green text-white shadow-md scale-102"
                      : "bg-white text-walnut-brown hover:bg-cream-dark/80"
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

        {/* 5. THE AMUDHASURABIY DIFFERENCE */}
        <section className="py-16 md:py-24 bg-cream border-b border-walnut-brown/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest">
                Authentic Craftsmanship
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-walnut-brown tracking-tight">
                Why Indian Families Choose Amudhasurabiy Organics
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseUs.map((w) => {
                const Icon = w.icon;
                return (
                  <div
                    key={w.title}
                    className="rounded-3xl bg-white p-8 border border-walnut-brown/10 shadow-xs space-y-3 hover:shadow-md transition-shadow"
                  >
                    <div className="h-11 w-11 rounded-2xl bg-moss-green/10 text-moss-green flex items-center justify-center">
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

        {/* 6. CORPORATE VALUES */}
        <section className="py-16 md:py-24 bg-cream-dark/20 border-b border-walnut-brown/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest">
                Core Integrity
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-walnut-brown tracking-tight">
                Principles That Build Unshakable Trust
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {corporateValues.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="rounded-3xl bg-white p-8 border border-walnut-brown/10 shadow-xs hover:shadow-md transition-all space-y-3"
                  >
                    <div className="h-11 w-11 rounded-2xl bg-moss-green/10 text-moss-green flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-walnut-brown">
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

        {/* 7. HEALTH LIBRARY & BLOGS */}
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
              <div className="rounded-3xl bg-white border border-walnut-brown/10 p-8 shadow-xs space-y-4">
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

              <div className="rounded-3xl bg-white border border-walnut-brown/10 p-8 shadow-xs space-y-4">
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

              <div className="rounded-3xl bg-white border border-walnut-brown/10 p-8 shadow-xs space-y-4">
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

        {/* 8. TESTIMONIALS */}
        <Testimonials />

        {/* 9. FAQ ACCORDION SECTION */}
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

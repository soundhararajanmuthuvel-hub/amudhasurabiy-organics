"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Star, ShieldCheck, Heart, Leaf, Truck, Award, 
  ChevronDown, CheckCircle2, Flame, Sparkles, Activity, Clock, 
  UserCheck, RefreshCw, ShoppingBag 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { useCartStore } from "@/store/useCartStore";
import { Product, MOCK_RECIPES, Recipe } from "@/lib/api/mockData";
import { getProducts } from "@/lib/api/products";
import { trackCustomerEvent } from "@/lib/api/events";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedGoal, setSelectedGoal] = useState<string>("all");
  const { addToCart, toggleWishlist, wishlist } = useCartStore();

  useEffect(() => {
    getProducts().then(setProducts);
    trackCustomerEvent("page_view", { source: "homepage" });
  }, []);

  const healthGoals = [
    { id: "all", name: "All Goals", icon: Sparkles },
    { id: "Increase Iron", name: "🩸 Increase Iron", targetId: "beetroot-malt" },
    { id: "Kids Growth & Nutrition", name: "👶 Kids Growth & Weight", targetId: "nendram-banana-malt" },
    { id: "Daily Energy", name: "⚡ Daily Stamina", targetId: "banana-malt" },
    { id: "Family Wellness", name: "🛡️ Family Wellness", targetId: "abc-malt" },
  ];

  const whyBlovitItems = [
    { title: "100% Natural Ingredients", desc: "Farm-fresh ingredients directly sourced from South Indian agricultural growers.", icon: Leaf },
    { title: "No Preservatives", desc: "Prepared using authentic sun-drying and small-batch roasting methods.", icon: ShieldCheck },
    { title: "No Artificial Colours", desc: "Rich vibrant colors derived purely from natural beetroots, apples, and carrots.", icon: Sparkles },
    { title: "No Refined Sugar", desc: "Naturally sweetened using raw organic palm sugar (Nattu Sakkarai) and palm jaggery.", icon: Heart },
    { title: "Rich in Natural Nutrition", desc: "Bioavailable iron, calcium, potassium, and vitamins naturally preserved.", icon: Activity },
    { title: "Family Friendly", desc: "Safe, healthy, and easy to prepare for children, parents, and grandparents.", icon: UserCheck },
  ];

  const timelineSteps = [
    { name: "Apple", desc: "Rich in Vitamin C & Fiber", color: "bg-red-500/10 text-red-700" },
    { name: "Beetroot", desc: "Natural Iron & Nitrates", color: "bg-rose-500/10 text-rose-700" },
    { name: "Carrot", desc: "Beta-Carotene & Antioxidants", color: "bg-orange-500/10 text-orange-700" },
    { name: "Nendran Banana", desc: "Potassium & Calorie Booster", color: "bg-amber-500/10 text-amber-700" },
    { name: "Jaggery", desc: "Unrefined Palm Sugar", color: "bg-amber-700/10 text-amber-800" },
    { name: "Badam", desc: "Vitamin E & Brain Power", color: "bg-amber-600/10 text-amber-900" },
    { name: "Cashew", desc: "Zinc & Creamy Texture", color: "bg-yellow-500/10 text-yellow-800" },
    { name: "Cardamom", desc: "Aromatic Digestive Aid", color: "bg-emerald-500/10 text-emerald-700" },
    { name: "Blovit", desc: "Pure Luxury Health Drink", color: "bg-moss-green text-white font-bold" },
  ];

  const processSteps = [
    { num: "01", title: "Raw Material Sourcing", desc: "Handpicking fresh apples, beetroots, carrots, and Kerala Nendran bananas from trusted farms." },
    { num: "02", title: "Quality Inspection", desc: "Rigorous cleaning, sorting, and lab testing for zero chemical residues." },
    { num: "03", title: "Hygienic Production", desc: "Slow sun-drying and small-batch roasting in our FSSAI-licensed Kumbakonam facility." },
    { num: "04", title: "Eco Packaging", desc: "Sealed in food-grade, moisture-proof containers to retain freshness naturally." },
    { num: "05", title: "Fast Delivery", desc: "Packed with care and shipped directly to your doorstep across India." },
  ];

  const customerReviews = [
    {
      name: "Ramanathan K.",
      location: "Chennai",
      review: "Blovit ABC Malt has become our family's daily morning drink. Knowing there are zero preservatives or refined sugars gives me complete peace of mind.",
      stars: 5,
    },
    {
      name: "Aswathy Nair",
      location: "Kochi",
      review: "The Nendran Banana Malt is a natural weight gainer for my toddler. He loves the natural sweetness and it digests very smoothly.",
      stars: 5,
    },
    {
      name: "Meera Krishnan",
      location: "Bengaluru",
      review: "Blovit Beetroot Malt improved my hemoglobin levels within a month. Authentic taste, premium packaging, and quick shipping from Kumbakonam!",
      stars: 5,
    },
  ];

  const faqs = [
    {
      question: "Are Blovit malts 100% natural with no preservatives?",
      answer: "Yes! All Blovit malt drink mixes are manufactured using 100% natural, farm-sourced ingredients. We never add artificial preservatives, synthetic colors, chemical thickeners, or refined white sugar."
    },
    {
      question: "Which Blovit malt is best for children and weight gain?",
      answer: "Blovit Nendran Banana Malt and Blovit ABC Malt are exceptional for children. Nendran Banana powder provides clean healthy calories and potassium for weight gain and bone strength."
    },
    {
      question: "How do I prepare Blovit malt drinks?",
      answer: "Simply mix 2 tablespoons (approx. 15g) of Blovit Malt powder into a glass of warm milk or warm water. Stir briskly until completely dissolved. No added sugar is required!"
    },
    {
      question: "Are Blovit products licensed by FSSAI?",
      answer: "Yes, Amudhasurabiy Organics operates an FSSAI-licensed production facility in Kumbakonam, Thanjavur District (License No: 22421543000120)."
    }
  ];

  const filteredProducts = selectedGoal === "all"
    ? products
    : products.filter(p => p.healthGoals?.includes(selectedGoal));

  return (
    <>
      <JsonLd type="organization" data={{}} />
      <JsonLd type="faq" data={{ faqs }} />
      <Header />

      <main className="flex-grow bg-white">
        
        {/* 1. Cinematic Hero Section */}
        <section className="relative min-h-[85vh] w-full overflow-hidden flex items-center bg-black">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg.png"
              alt="Natural Organic Ingredients background"
              fill
              priority
              className="object-cover opacity-75 animate-ken-burns"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-walnut-brown/90 via-walnut-brown/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-20">
            <div className="max-w-2xl text-white">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-heading text-xs font-bold tracking-widest text-cream uppercase bg-moss-green/80 px-4 py-2 rounded-full inline-block mb-6 shadow-sm border border-white/10"
              >
                Amudhasurabiy Organics • Kumbakonam
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6"
              >
                Nature's Nutrition,
                <span className="block text-cream-dark font-light italic mt-2">Crafted with Care.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-body text-base sm:text-lg text-cream-dark/90 leading-relaxed mb-8 max-w-lg"
              >
                Premium organic malt mixes crafted with fresh farm ingredients. 100% natural, chemical-free nutrition for your whole family.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/shop/"
                  className="flex items-center justify-center gap-2 bg-cream hover:bg-white text-walnut-brown px-8 py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg group hover:scale-105"
                >
                  Shop Collection
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/our-story/"
                  className="flex items-center justify-center gap-2 bg-transparent border border-white/30 hover:border-white hover:bg-white/10 text-white px-8 py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
                >
                  Our Brand Story
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. Early Homepage Trust Indicators */}
        <section className="py-8 bg-cream border-b border-walnut-brown/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
              {[
                "100% Natural Ingredients",
                "No Artificial Preservatives",
                "FSSAI Licensed",
                "Secure Payments",
                "Made in India",
                "Fast Shipping Across India",
                "WhatsApp Support"
              ].map((trust, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-walnut-brown/5 shadow-2xs">
                  <CheckCircle2 className="h-4 w-4 text-moss-green mb-1.5" />
                  <span className="font-heading text-[10px] font-bold text-walnut-brown uppercase tracking-wider">{trust}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Shop By Health Goals */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-2">
                Targeted Wellness
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-walnut-brown">
                Shop By Health Goal
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {healthGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`px-5 py-3 rounded-full font-heading text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                    selectedGoal === goal.id
                      ? "bg-moss-green text-white shadow-md scale-105"
                      : "bg-cream-dark text-walnut-brown hover:bg-walnut-brown hover:text-white"
                  }`}
                >
                  {goal.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Best Sellers / Featured Products */}
        <section className="py-12 bg-cream-dark">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-2">
                  Our Signature Collection
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-walnut-brown">
                  Blovit Natural Malts
                </h2>
              </div>
              <Link
                href="/shop/"
                className="mt-4 md:mt-0 flex items-center gap-1 font-heading text-xs font-bold text-moss-green uppercase tracking-wider hover:text-walnut-brown transition-colors group"
              >
                View all products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

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
                      className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/95 text-walnut-brown hover:text-red-500 shadow-md transition-colors hover:scale-105"
                      aria-label="Wishlist"
                    >
                      <Heart className={`h-4.5 w-4.5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                    </button>

                    <div className="relative h-64 w-full bg-cream overflow-hidden">
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
                          <h3 className="font-heading text-xl font-bold text-walnut-brown">
                            {product.name}
                          </h3>
                        </Link>
                        <span className="font-heading text-lg font-bold text-moss-green">
                          ₹{product.price}
                        </span>
                      </div>
                      <p className="font-body text-xs text-walnut-brown/70 line-clamp-2 mb-6 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="flex gap-2 mt-auto">
                        <Link
                          href={`/product/${product.slug}/`}
                          className="flex-grow flex items-center justify-center bg-cream-dark hover:bg-walnut-brown hover:text-white text-walnut-brown px-4 py-3 rounded-full font-heading text-[10px] font-bold uppercase tracking-wider transition-all duration-300"
                        >
                          Details
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
          </div>
        </section>

        {/* 5. Why Blovit Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-2">
                Pure Quality Promise
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-walnut-brown">
                Why Families Choose Blovit
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyBlovitItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-cream rounded-3xl p-8 border border-walnut-brown/5 card-hover flex flex-col items-start"
                >
                  <div className="h-12 w-12 rounded-full bg-moss-green/10 text-moss-green flex items-center justify-center mb-6">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-walnut-brown mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs text-walnut-brown/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Ingredient Journey (Timeline) */}
        <section className="py-24 bg-cream-dark">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-2">
                From Farm To Cup
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-walnut-brown">
                The Blovit Ingredient Journey
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-4 items-center">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className={`w-full p-4 rounded-2xl border border-walnut-brown/10 shadow-2xs mb-2 ${step.color}`}>
                    <span className="font-heading text-xs font-bold block">{step.name}</span>
                  </div>
                  <span className="font-body text-[10px] text-walnut-brown/60">{step.desc}</span>
                  {idx < timelineSteps.length - 1 && (
                    <span className="hidden lg:block text-walnut-brown/30 mt-2 font-bold">➔</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Founder & Brand Story */}
        <section className="py-24 bg-white border-y border-walnut-brown/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 bg-cream rounded-3xl p-8 lg:p-12 border border-walnut-brown/5">
                <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-4">
                  Amudhasurabiy Organics
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-walnut-brown mb-6">
                  Rooted in Kumbakonam Heritage
                </h2>
                <p className="font-body text-sm text-walnut-brown/80 leading-relaxed mb-6">
                  Founded in Kumbakonam, Thanjavur District, Amudhasurabiy Organics was born with a mission to bring authentic, farm-fresh Indian wellness drinks back into modern households.
                </p>
                <p className="font-body text-sm text-walnut-brown/80 leading-relaxed mb-8">
                  Unlike commercial drinks packed with synthetic maltodextrin and refined sugars, every pack of Blovit is slowly sun-dried and crafted in small batches to preserve pure bioavailable nutrition.
                </p>
                <Link
                  href="/our-story/"
                  className="inline-flex items-center gap-2 bg-moss-green hover:bg-walnut-brown text-white px-6 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                >
                  Read Our Founder's Story
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-cream-dark p-6 rounded-3xl border border-walnut-brown/5">
                  <h3 className="font-heading text-base font-bold text-walnut-brown mb-2">Direct Sourcing</h3>
                  <p className="font-body text-xs text-walnut-brown/70">Partnerships with local farmers in Tamil Nadu & Kerala for fresh organic raw produce.</p>
                </div>
                <div className="bg-cream-dark p-6 rounded-3xl border border-walnut-brown/5">
                  <h3 className="font-heading text-base font-bold text-walnut-brown mb-2">FSSAI Certified</h3>
                  <p className="font-body text-xs text-walnut-brown/70">Manufactured under strict ISO & hygiene audit standards (Lic. 22421543000120).</p>
                </div>
                <div className="bg-cream-dark p-6 rounded-3xl border border-walnut-brown/5">
                  <h3 className="font-heading text-base font-bold text-walnut-brown mb-2">Small-Batch Care</h3>
                  <p className="font-body text-xs text-walnut-brown/70">Roasting in controlled temperature to protect natural enzymes and minerals.</p>
                </div>
                <div className="bg-cream-dark p-6 rounded-3xl border border-walnut-brown/5">
                  <h3 className="font-heading text-base font-bold text-walnut-brown mb-2">Zero Chemicals</h3>
                  <p className="font-body text-xs text-walnut-brown/70">No artificial colors, thickeners, or chemical preservatives—guaranteed.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Manufacturing Process */}
        <section className="py-24 bg-cream">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-2">
                Uncompromising Quality
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-walnut-brown">
                5-Step Manufacturing Standard
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {processSteps.map((p, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-walnut-brown/5 shadow-2xs flex flex-col justify-between">
                  <span className="font-heading text-3xl font-extrabold text-moss-green/30 mb-4">{p.num}</span>
                  <div>
                    <h3 className="font-heading text-base font-bold text-walnut-brown mb-2">{p.title}</h3>
                    <p className="font-body text-xs text-walnut-brown/70 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Featured Recipes */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-2">
                  Blovit Kitchen
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-walnut-brown">
                  Delicious Recipe Ideas
                </h2>
              </div>
              <Link
                href="/recipes/"
                className="mt-4 md:mt-0 flex items-center gap-1 font-heading text-xs font-bold text-moss-green uppercase tracking-wider hover:text-walnut-brown transition-colors group"
              >
                View all recipes
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {MOCK_RECIPES.map((recipe) => (
                <div key={recipe.id} className="bg-cream rounded-3xl overflow-hidden border border-walnut-brown/5 shadow-sm flex flex-col h-full">
                  <div className="relative h-48 w-full bg-cream-dark">
                    <Image src={recipe.imageUrl} alt={recipe.title} fill className="object-cover" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="font-body text-[10px] uppercase font-bold text-moss-green tracking-wider mb-2">
                      {recipe.category} • {recipe.prepTime}
                    </span>
                    <Link href={`/recipes/${recipe.slug}/`} className="hover:text-moss-green transition-colors">
                      <h3 className="font-heading text-lg font-bold text-walnut-brown mb-2">{recipe.title}</h3>
                    </Link>
                    <p className="font-body text-xs text-walnut-brown/70 line-clamp-2 mb-6 leading-relaxed">
                      {recipe.description}
                    </p>
                    <Link
                      href={`/recipes/${recipe.slug}/`}
                      className="mt-auto inline-flex items-center gap-1 font-heading text-xs font-bold text-moss-green uppercase tracking-wider hover:text-walnut-brown"
                    >
                      Read Recipe <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. Customer Testimonials */}
        <section className="py-24 bg-cream-dark">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-2">
                Verified Reviews
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-walnut-brown">
                Loved by Families Nationwide
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {customerReviews.map((t, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-8 border border-walnut-brown/5 shadow-sm">
                  <div className="flex gap-1 text-amber-500 mb-6">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500 stroke-none" />
                    ))}
                  </div>
                  <p className="font-body text-xs text-walnut-brown/80 leading-relaxed mb-6 italic">
                    "{t.review}"
                  </p>
                  <div>
                    <h4 className="font-heading text-sm font-bold text-walnut-brown">{t.name}</h4>
                    <span className="font-body text-[10px] text-walnut-brown/60">{t.location} • Verified Buyer</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. FAQs Accordion */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-2">
                Got Questions?
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-walnut-brown">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-walnut-brown/10 rounded-2xl overflow-hidden bg-cream">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left font-heading text-base font-bold text-walnut-brown hover:text-moss-green transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`h-5 w-5 transition-transform ${activeFaq === idx ? "rotate-180 text-moss-green" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-6 pb-6 font-body text-xs text-walnut-brown/80 leading-relaxed border-t border-walnut-brown/5 pt-4"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <WhatsAppButton />
      <Footer />
    </>
  );
}

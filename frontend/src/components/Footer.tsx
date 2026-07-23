"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Lock, Award, Heart, Leaf } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full text-cream-dark border-t border-white/10 mt-auto">
      
      {/* SECTION 1 — Brand Statement Band */}
      <div className="relative py-20 md:py-24 bg-[#563E2D] text-white text-center overflow-hidden">
        {/* Subtle Radial Backdrop Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8CBD7B]/10 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 space-y-6">
          <div className="h-12 w-12 rounded-2xl bg-[#8CBD7B]/15 border border-[#8CBD7B]/30 text-[#8CBD7B] flex items-center justify-center mx-auto shadow-inner">
            <Leaf className="h-6 w-6 text-[#8CBD7B]" />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-sm">
            Amudhasurabiy Organics
          </h2>

          <div className="space-y-3 font-body text-xs sm:text-sm text-cream-dark">
            <p className="font-semibold text-white leading-relaxed">
              Official Digital Headquarters • Kumbakonam, Tamil Nadu, India.
            </p>
            <p className="text-[#8CBD7B] font-heading uppercase tracking-widest text-xs font-bold mt-3 block leading-normal">
              Pure Nutrition. Naturally Crafted.
            </p>
          </div>

          <div className="max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-white/10 border border-white/20 text-xs sm:text-sm text-white/95 italic leading-relaxed backdrop-blur-sm shadow-sm">
            Amudhasurabiy Organics — sometimes searched as Amudhasurabi or Amuthasurabi — is the maker of Blovit natural malt powders.
          </div>

          <div className="pt-3 flex flex-wrap justify-center items-center gap-4">
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/shop/"
                className="bg-moss-green hover:bg-moss-green/90 text-white px-8 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-moss-green/25 inline-flex items-center gap-2"
              >
                <span>SHOP BLOVIT RANGE</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/quality-and-trust/"
                className="border-2 border-white/50 hover:border-white hover:bg-white/10 text-white px-8 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
              >
                QUALITY STANDARDS
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SECTION 2 — Newsletter Band */}
      <div className="border-t border-b border-white/10 py-14 md:py-18 bg-[#3E2C1E]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="font-heading text-xs font-bold text-[#8CBD7B] uppercase tracking-widest block mb-2">
                JOIN THE AMUDHASURABIY CIRCLE
              </span>
              <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
                Pure Nutrition Insights & Seasonal Harvests
              </h3>
              <p className="font-body text-xs md:text-sm text-cream-dark/90 max-w-md leading-relaxed">
                Subscribe to receive traditional wellness knowledge, health drink recipes, and early access to pure organic harvests.
              </p>
            </div>

            <div>
              {subscribed ? (
                <div className="p-4 rounded-full bg-moss-green/20 border border-moss-green/30 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm">
                  <span>✓</span> Thank you for subscribing to the Amudhasurabiy Organics Circle!
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                  <div className="relative flex items-center rounded-full bg-white/10 border border-white/20 p-1.5 focus-within:border-[#8CBD7B] focus-within:ring-2 focus-within:ring-[#8CBD7B]/30 transition-all shadow-inner">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full rounded-full bg-transparent px-5 py-3 text-white placeholder-cream-dark/50 text-xs focus:outline-none"
                      required
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="shrink-0 flex items-center gap-1.5 bg-white hover:bg-cream text-walnut-brown px-6 py-3 rounded-full font-heading text-[10px] font-bold uppercase tracking-wider transition-all shadow-md group"
                    >
                      <span>SUBSCRIBE</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3 — Trust Badges Strip */}
      <div className="border-b border-white/10 py-8 bg-[#312217]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            
            <div className="flex items-center justify-center gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/15 shadow-sm transition-transform hover:-translate-y-0.5">
              <div className="h-9 w-9 rounded-full bg-[#8CBD7B]/20 border border-[#8CBD7B]/40 text-[#8CBD7B] flex items-center justify-center shrink-0">
                <ShieldCheck className="h-4.5 w-4.5 text-[#8CBD7B]" />
              </div>
              <span className="text-xs font-body font-semibold text-white text-left leading-snug">
                FSSAI Certified Unit
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/15 shadow-sm transition-transform hover:-translate-y-0.5">
              <div className="h-9 w-9 rounded-full bg-[#8CBD7B]/20 border border-[#8CBD7B]/40 text-[#8CBD7B] flex items-center justify-center shrink-0">
                <Lock className="h-4.5 w-4.5 text-[#8CBD7B]" />
              </div>
              <span className="text-xs font-body font-semibold text-white text-left leading-snug">
                Secure Razorpay Payments
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/15 shadow-sm transition-transform hover:-translate-y-0.5">
              <div className="h-9 w-9 rounded-full bg-[#8CBD7B]/20 border border-[#8CBD7B]/40 text-[#8CBD7B] flex items-center justify-center shrink-0">
                <Award className="h-4.5 w-4.5 text-[#8CBD7B]" />
              </div>
              <span className="text-xs font-body font-semibold text-white text-left leading-snug">
                100% Natural & Chemical-Free
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/15 shadow-sm transition-transform hover:-translate-y-0.5">
              <div className="h-9 w-9 rounded-full bg-[#8CBD7B]/20 border border-[#8CBD7B]/40 text-[#8CBD7B] flex items-center justify-center shrink-0">
                <Heart className="h-4.5 w-4.5 text-[#8CBD7B]" />
              </div>
              <span className="text-xs font-body font-semibold text-white text-left leading-snug">
                Made with Care in Kumbakonam
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 4 — Link Columns */}
      <div className="relative bg-[#39271B] text-cream-dark/90 py-16 md:py-20">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            
            {/* Column 1 — Company Info with Crisp White Framed Logo Lockup */}
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center gap-3 mb-1">
                <div className="relative h-10 w-10 shrink-0 bg-white p-1 rounded-xl border border-white/30 shadow-md">
                  <Image
                    src="/images/logo.png"
                    alt="Amudhasurabiy Organics Logo"
                    width={32}
                    height={32}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-white tracking-tight uppercase leading-snug">
                    AMUDHASURABIY ORGANICS
                  </h4>
                  <span className="text-[9px] font-heading font-semibold uppercase tracking-widest text-[#8CBD7B] block">
                    PURE NUTRITION. NATURALLY CRAFTED.
                  </span>
                </div>
              </div>

              <p className="font-body text-xs text-cream-dark/85 leading-relaxed">
                Manufacturers of 100% quality organic food & nutrition products. Parent company behind Blovit natural malt drinks. Rooted in traditional wisdom and farm-fresh purity.
              </p>

              <div className="text-[11px] font-body text-cream-dark/65 space-y-1 pt-3 border-t border-white/10">
                <p>FSSAI Lic. No: <strong className="text-white font-semibold">22421543000120</strong></p>
                <p>GST Reg: <strong className="text-white font-semibold">33AAFFA9012K1Z9</strong></p>
              </div>
            </div>

            {/* Column 2 — CORPORATE & BRANDS */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8CBD7B]" />
                <h4 className="font-heading text-[11px] font-bold uppercase tracking-widest text-cream-dark/70">
                  CORPORATE & BRANDS
                </h4>
              </div>

              <ul className="flex flex-col gap-3.5 font-body text-xs text-cream-dark/85">
                <li>
                  <Link href="/" className="inline-flex items-center gap-1 hover:text-[#8CBD7B] hover:translate-x-1.5 transition-all duration-300 group">
                    <span className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#8CBD7B] font-bold">›</span>
                    <span>Home Headquarters</span>
                  </Link>
                </li>
                <li>
                  <Link href="/shop/" className="inline-flex items-center gap-1 hover:text-[#8CBD7B] hover:translate-x-1.5 transition-all duration-300 group">
                    <span className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#8CBD7B] font-bold">›</span>
                    <span>Shop Blovit Range</span>
                  </Link>
                </li>
                <li>
                  <Link href="/brands/blovit/" className="inline-flex items-center gap-1 hover:text-[#8CBD7B] hover:translate-x-1.5 transition-all duration-300 group">
                    <span className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#8CBD7B] font-bold">›</span>
                    <span>Blovit Flagship Brand</span>
                  </Link>
                </li>
                <li>
                  <Link href="/shop/" className="inline-flex items-center gap-1 hover:text-[#8CBD7B] hover:translate-x-1.5 transition-all duration-300 group">
                    <span className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#8CBD7B] font-bold">›</span>
                    <span>Shop All Products</span>
                  </Link>
                </li>
                <li>
                  <Link href="/about/" className="inline-flex items-center gap-1 hover:text-[#8CBD7B] hover:translate-x-1.5 transition-all duration-300 group">
                    <span className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#8CBD7B] font-bold">›</span>
                    <span>About Amudhasurabiy Organics</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 — EDUCATION & QUALITY */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8CBD7B]" />
                <h4 className="font-heading text-[11px] font-bold uppercase tracking-widest text-cream-dark/70">
                  EDUCATION & QUALITY
                </h4>
              </div>

              <ul className="flex flex-col gap-3.5 font-body text-xs text-cream-dark/85">
                <li>
                  <Link href="/recipes/" className="inline-flex items-center gap-1 hover:text-[#8CBD7B] hover:translate-x-1.5 transition-all duration-300 group">
                    <span className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#8CBD7B] font-bold">›</span>
                    <span>Health Drink Recipes</span>
                  </Link>
                </li>
                <li>
                  <Link href="/health-library/" className="inline-flex items-center gap-1 hover:text-[#8CBD7B] hover:translate-x-1.5 transition-all duration-300 group">
                    <span className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#8CBD7B] font-bold">›</span>
                    <span>Health Library & Blogs</span>
                  </Link>
                </li>
                <li>
                  <Link href="/quality-and-trust/" className="inline-flex items-center gap-1 hover:text-[#8CBD7B] hover:translate-x-1.5 transition-all duration-300 group">
                    <span className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#8CBD7B] font-bold">›</span>
                    <span>Quality & Trust Hub</span>
                  </Link>
                </li>
                <li>
                  <Link href="/our-process/" className="inline-flex items-center gap-1 hover:text-[#8CBD7B] hover:translate-x-1.5 transition-all duration-300 group">
                    <span className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#8CBD7B] font-bold">›</span>
                    <span>Manufacturing Process</span>
                  </Link>
                </li>
                <li>
                  <Link href="/ingredients/" className="inline-flex items-center gap-1 hover:text-[#8CBD7B] hover:translate-x-1.5 transition-all duration-300 group">
                    <span className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#8CBD7B] font-bold">›</span>
                    <span>Ingredient Philosophy</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 — CUSTOMER SUPPORT & CONTACT */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8CBD7B]" />
                <h4 className="font-heading text-[11px] font-bold uppercase tracking-widest text-cream-dark/70">
                  CUSTOMER SUPPORT & CONTACT
                </h4>
              </div>

              <ul className="flex flex-col gap-3.5 font-body text-xs text-cream-dark/85">
                <li>
                  <Link href="/contact/" className="inline-flex items-center gap-1 hover:text-[#8CBD7B] hover:translate-x-1.5 transition-all duration-300 group">
                    <span className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#8CBD7B] font-bold">›</span>
                    <span>Contact Us & Wholesale</span>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy-2/" className="inline-flex items-center gap-1 hover:text-[#8CBD7B] hover:translate-x-1.5 transition-all duration-300 group">
                    <span className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#8CBD7B] font-bold">›</span>
                    <span>Privacy Policy</span>
                  </Link>
                </li>
                <li>
                  <Link href="/shipping-policy/" className="inline-flex items-center gap-1 hover:text-[#8CBD7B] hover:translate-x-1.5 transition-all duration-300 group">
                    <span className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#8CBD7B] font-bold">›</span>
                    <span>Shipping Policy</span>
                  </Link>
                </li>
                <li>
                  <Link href="/return-refund-policy/" className="inline-flex items-center gap-1 hover:text-[#8CBD7B] hover:translate-x-1.5 transition-all duration-300 group">
                    <span className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#8CBD7B] font-bold">›</span>
                    <span>Return & Refund Policy</span>
                  </Link>
                </li>
                <li>
                  <Link href="/terms-conditions/" className="inline-flex items-center gap-1 hover:text-[#8CBD7B] hover:translate-x-1.5 transition-all duration-300 group">
                    <span className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#8CBD7B] font-bold">›</span>
                    <span>Terms & Conditions</span>
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 5 — Copyright Bar */}
      <div className="border-t border-white/10 py-6 bg-[#281B12] text-xs text-cream-dark/75 font-body">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center md:text-left">
            © 2026 Amudhasurabiy Organics. All rights reserved. Blovit is a registered consumer brand of Amudhasurabiy Organics.
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <span>Kumbakonam, Tamil Nadu, India</span>
            <span>•</span>
            <Link href="/quality-and-trust/" className="hover:text-white transition-colors">
              FSSAI Certified
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

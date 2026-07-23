"use client";

import { useState } from "react";
import Link from "next/link";
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
    <footer className="w-full bg-walnut-brown text-cream-dark border-t border-walnut-brown/20 mt-auto">
      
      {/* SECTION 1 — Brand Statement Band */}
      <div className="py-16 md:py-20 bg-walnut-brown text-white text-center border-b border-cream-dark/10">
        <div className="mx-auto max-w-4xl px-4 space-y-6">
          <div className="h-10 w-10 rounded-2xl bg-moss-green/10 text-moss-green flex items-center justify-center mx-auto">
            <Leaf className="h-6 w-6 text-moss-green" />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Amudhasurabiy Organics
          </h2>

          <div className="space-y-1 font-body text-xs sm:text-sm text-cream-dark/90">
            <p className="font-semibold text-cream-dark">
              Official Digital Headquarters • Kumbakonam, Tamil Nadu, India.
            </p>
            <p className="text-moss-green font-heading uppercase tracking-wider text-xs font-bold">
              Pure Nutrition. Naturally Crafted.
            </p>
          </div>

          <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-cream/5 border border-cream/15 text-xs text-cream-dark/80 italic leading-relaxed">
            Amudhasurabiy Organics — sometimes searched as Amudhasurabi or Amuthasurabi — is the maker of Blovit natural malt powders.
          </div>

          <div className="pt-2 flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/shop/"
              className="bg-moss-green hover:bg-white hover:text-walnut-brown text-white px-8 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              SHOP BLOVIT RANGE
            </Link>
            <Link
              href="/quality-and-trust/"
              className="border border-white/40 hover:border-white hover:bg-white/10 text-white px-8 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all"
            >
              QUALITY STANDARDS
            </Link>
          </div>
        </div>
      </div>

      {/* SECTION 2 — Newsletter Band */}
      <div className="border-b border-cream-dark/10 py-12 md:py-16 bg-walnut-brown/95">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-2">
                JOIN THE AMUDHASURABIY CIRCLE
              </span>
              <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
                Pure Nutrition Insights & Seasonal Harvests
              </h3>
              <p className="font-body text-xs md:text-sm text-cream-dark/80 max-w-md leading-relaxed">
                Subscribe to receive traditional wellness knowledge, health drink recipes, and early access to pure organic harvests.
              </p>
            </div>
            <div>
              {subscribed ? (
                <div className="p-4 rounded-full bg-moss-green/20 border border-moss-green/30 text-white font-medium text-xs flex items-center justify-center gap-2">
                  <span>✓</span> Thank you for subscribing to the Amudhasurabiy Organics Circle!
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2 max-w-md w-full relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded-full px-6 py-4 bg-white/10 text-white placeholder-cream-dark/50 border border-white/20 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/30 text-xs transition-all"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 flex items-center gap-1 bg-white hover:bg-cream text-walnut-brown px-5 py-2.5 rounded-full font-heading text-[10px] font-bold uppercase tracking-wider transition-all duration-300 shadow-md group"
                  >
                    <span>SUBSCRIBE</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3 — Trust Badges Strip */}
      <div className="border-b border-cream-dark/10 py-6 bg-black/25">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-body text-cream-dark/90">
              <ShieldCheck className="h-4 w-4 text-moss-green shrink-0" />
              <span>FSSAI Certified Unit</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-body text-cream-dark/90">
              <Lock className="h-4 w-4 text-moss-green shrink-0" />
              <span>Secure Razorpay Payments</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-body text-cream-dark/90">
              <Award className="h-4 w-4 text-moss-green shrink-0" />
              <span>100% Natural & Chemical-Free</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-body text-cream-dark/90">
              <Heart className="h-4 w-4 text-moss-green shrink-0" />
              <span>Made with Care in Kumbakonam</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4 — Link Columns */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1 — Company Info */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading text-base font-bold text-white tracking-tight uppercase">
              AMUDHASURABIY ORGANICS
            </h4>
            <span className="text-[10px] font-heading font-semibold uppercase tracking-widest text-moss-green">
              PURE NUTRITION. NATURALLY CRAFTED.
            </span>
            <p className="font-body text-xs text-cream-dark/70 leading-relaxed">
              Manufacturers of 100% quality organic food & nutrition products. Parent company behind Blovit natural malt drinks. Rooted in traditional wisdom and farm-fresh purity.
            </p>
            <div className="text-[11px] font-body text-cream-dark/50 space-y-1 pt-2 border-t border-cream-dark/10">
              <p>FSSAI Lic. No: <strong className="text-cream-dark/80">22421543000120</strong></p>
              <p>GST Reg: <strong className="text-cream-dark/80">33AAFFA9012K1Z9</strong></p>
            </div>
          </div>

          {/* Column 2 — CORPORATE & BRANDS */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-cream-dark/60 mb-5">
              CORPORATE & BRANDS
            </h4>
            <ul className="flex flex-col gap-3 font-body text-xs text-cream-dark/80">
              <li>
                <Link href="/" className="hover:text-moss-green transition-colors duration-300">
                  Home Headquarters
                </Link>
              </li>
              <li>
                <Link href="/shop/" className="hover:text-moss-green transition-colors duration-300">
                  Shop Blovit Range
                </Link>
              </li>
              <li>
                <Link href="/brands/blovit/" className="hover:text-moss-green transition-colors duration-300">
                  Blovit Flagship Brand
                </Link>
              </li>
              <li>
                <Link href="/shop/" className="hover:text-moss-green transition-colors duration-300">
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link href="/about/" className="hover:text-moss-green transition-colors duration-300">
                  About Amudhasurabiy Organics
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — EDUCATION & QUALITY */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-cream-dark/60 mb-5">
              EDUCATION & QUALITY
            </h4>
            <ul className="flex flex-col gap-3 font-body text-xs text-cream-dark/80">
              <li>
                <Link href="/recipes/" className="hover:text-moss-green transition-colors duration-300">
                  Health Drink Recipes
                </Link>
              </li>
              <li>
                <Link href="/health-library/" className="hover:text-moss-green transition-colors duration-300">
                  Health Library & Blogs
                </Link>
              </li>
              <li>
                <Link href="/quality-and-trust/" className="hover:text-moss-green transition-colors duration-300">
                  Quality & Trust Hub
                </Link>
              </li>
              <li>
                <Link href="/our-process/" className="hover:text-moss-green transition-colors duration-300">
                  Manufacturing Process
                </Link>
              </li>
              <li>
                <Link href="/ingredients/" className="hover:text-moss-green transition-colors duration-300">
                  Ingredient Philosophy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — CUSTOMER SUPPORT & CONTACT */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-cream-dark/60 mb-5">
              CUSTOMER SUPPORT & CONTACT
            </h4>
            <ul className="flex flex-col gap-3 font-body text-xs text-cream-dark/80">
              <li>
                <Link href="/contact/" className="hover:text-moss-green transition-colors duration-300">
                  Contact Us & Wholesale
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy-2/" className="hover:text-moss-green transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy/" className="hover:text-moss-green transition-colors duration-300">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/return-refund-policy/" className="hover:text-moss-green transition-colors duration-300">
                  Return & Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions/" className="hover:text-moss-green transition-colors duration-300">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* SECTION 5 — Copyright Bar */}
      <div className="border-t border-cream-dark/10 py-6 bg-black/20 text-xs text-cream-dark/60 font-body">
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

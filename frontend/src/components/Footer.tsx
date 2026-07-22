"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Lock, Award, Heart, Sparkles } from "lucide-react";

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
      
      {/* 1. Newsletter & Circle Signup Band */}
      <div className="border-b border-cream-dark/10 py-12 bg-walnut-brown/95">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-2">
                Join the Amudhasurabiy Circle
              </span>
              <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
                Pure Nutrition Insights & Seasonal Harvests
              </h3>
              <p className="font-body text-xs md:text-sm text-cream-dark/80 max-w-md">
                Subscribe to receive traditional wellness knowledge, health drink recipes, and early access to pure organic harvests.
              </p>
            </div>
            <div>
              {subscribed ? (
                <div className="p-4 rounded-xl bg-moss-green/20 border border-moss-green/30 text-white font-medium text-xs flex items-center gap-2">
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
                    className="absolute right-2 top-2 flex items-center gap-1 bg-cream hover:bg-white text-walnut-brown px-5 py-2.5 rounded-full font-heading text-[10px] font-bold uppercase tracking-wider transition-all duration-300 shadow-md group"
                  >
                    Subscribe
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Trust Elements Bar */}
      <div className="border-b border-cream-dark/10 py-8 bg-black/20">
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

      {/* 3. Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Parent Corporate Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.svg"
                alt="Amudhasurabiy Organics Logo"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-heading text-lg font-bold text-white tracking-tight uppercase">
                  AMUDHASURABIY ORGANICS
                </span>
                <span className="text-[9px] font-body uppercase tracking-widest text-cream-dark/60">
                  Pure Nutrition. Naturally Crafted.
                </span>
              </div>
            </div>
            <p className="font-body text-xs text-cream-dark/70 leading-relaxed">
              Manufacturers of 100% quality organic natural food & nutrition products. Parent company behind Blovit natural malt drinks. Rooted in traditional wisdom and farm-fresh purity.
            </p>
            <div className="text-[11px] font-body text-cream-dark/50 space-y-1">
              <p>FSSAI Lic. No: <strong>22421543000120</strong></p>
              <p>GST Reg: <strong>33AAFFA9012K1Z9</strong></p>
            </div>
          </div>

          {/* Corporate Navigation */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white mb-5">
              Corporate & Brands
            </h4>
            <ul className="flex flex-col gap-3 font-body text-xs text-cream-dark/70">
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-300">
                  Home Headquarters
                </Link>
              </li>
              <li>
                <Link href="/our-brands/" className="hover:text-white transition-colors duration-300">
                  Our Brands Portfolio
                </Link>
              </li>
              <li>
                <Link href="/brands/blovit/" className="hover:text-white transition-colors duration-300">
                  Blovit Flagship Brand
                </Link>
              </li>
              <li>
                <Link href="/shop/" className="hover:text-white transition-colors duration-300">
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link href="/about/" className="hover:text-white transition-colors duration-300">
                  About Parent Company
                </Link>
              </li>
            </ul>
          </div>

          {/* Educational & Quality Hub */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white mb-5">
              Education & Quality
            </h4>
            <ul className="flex flex-col gap-3 font-body text-xs text-cream-dark/70">
              <li>
                <Link href="/recipes/" className="hover:text-white transition-colors duration-300">
                  Health Drink Recipes
                </Link>
              </li>
              <li>
                <Link href="/health-library/" className="hover:text-white transition-colors duration-300">
                  Health Library & Blogs
                </Link>
              </li>
              <li>
                <Link href="/quality-and-trust/" className="hover:text-white transition-colors duration-300">
                  Quality & Trust Hub
                </Link>
              </li>
              <li>
                <Link href="/our-process/" className="hover:text-white transition-colors duration-300">
                  Manufacturing Process
                </Link>
              </li>
              <li>
                <Link href="/ingredients/" className="hover:text-white transition-colors duration-300">
                  Ingredient Philosophy
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white mb-5">
              Customer Support & Contact
            </h4>
            <ul className="flex flex-col gap-3 font-body text-xs text-cream-dark/70">
              <li>
                <Link href="/contact/" className="hover:text-white transition-colors duration-300">
                  Contact Us & Wholesale
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy-2/" className="hover:text-white transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy/" className="hover:text-white transition-colors duration-300">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/return-refund-policy/" className="hover:text-white transition-colors duration-300">
                  Return & Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions/" className="hover:text-white transition-colors duration-300">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* 4. Bottom Legal Footer */}
        <div className="border-t border-cream-dark/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-cream-dark/50 gap-4 font-body">
          <p>© {new Date().getFullYear()} Amudhasurabiy Organics. All rights reserved. Blovit is a registered consumer brand of Amudhasurabiy Organics.</p>
          <div className="flex items-center gap-6">
            <span>Kumbakonam, Tamil Nadu, India</span>
            <span>•</span>
            <Link href="/quality-and-trust/" className="hover:text-white transition-colors">FSSAI Certified</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

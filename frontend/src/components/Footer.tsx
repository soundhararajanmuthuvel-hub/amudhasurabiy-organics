"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Lock, Award, Heart } from "lucide-react";

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
                Join the Blovit Circle
              </span>
              <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
                Pure Health Tips & Exclusive Offers
              </h3>
              <p className="font-body text-xs md:text-sm text-cream-dark/80 max-w-md">
                Subscribe to receive organic living insights, healthy drink recipes, and early access to seasonal harvests.
              </p>
            </div>
            <div>
              {subscribed ? (
                <div className="p-4 rounded-xl bg-moss-green/20 border border-moss-green/30 text-white font-medium text-xs flex items-center gap-2">
                  <span>✓</span> Thank you! You have joined the Blovit Circle.
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
          
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="font-heading text-2xl font-bold text-white tracking-tight">
                Blovit
              </span>
              <span className="text-[10px] font-body uppercase tracking-widest text-cream-dark/60">
                Amudhasurabiy Organics
              </span>
            </div>
            <p className="font-body text-xs text-cream-dark/70 leading-relaxed">
              Manufacturers of 100% quality organic malt health drink mixes. Rooted in traditional wellness and local farms, delivering pure nutrition straight to families nationwide.
            </p>
            <div className="text-[11px] font-body text-cream-dark/50 space-y-1">
              <p>FSSAI Lic. No: <strong>22421543000120</strong></p>
              <p>GST Reg: <strong>33AAFFA9012K1Z9</strong></p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white mb-5">
              Brand Journey
            </h4>
            <ul className="flex flex-col gap-3 font-body text-xs text-cream-dark/70">
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-300">
                  Home Story
                </Link>
              </li>
              <li>
                <Link href="/shop/" className="hover:text-white transition-colors duration-300">
                  Shop All Malts
                </Link>
              </li>
              <li>
                <Link href="/recipes/" className="hover:text-white transition-colors duration-300">
                  Health Drink Recipes
                </Link>
              </li>
              <li>
                <Link href="/trust/" className="hover:text-white transition-colors duration-300">
                  Trust & Quality Center
                </Link>
              </li>
              <li>
                <Link href="/about-us/" className="hover:text-white transition-colors duration-300">
                  About Amudhasurabiy
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white mb-5">
              Policies & Support
            </h4>
            <ul className="flex flex-col gap-3 font-body text-xs text-cream-dark/70">
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
                  Return & Refund
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions/" className="hover:text-white transition-colors duration-300">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white mb-5">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-4 font-body text-xs text-cream-dark/70">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-moss-green shrink-0 mt-0.5" />
                <span>
                  Amudhasurabiy Organics,<br />
                  Kumbakonam, Thanjavur District,<br />
                  Tamil Nadu - 612001, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-moss-green shrink-0" />
                <a href="tel:+917010602115" className="hover:text-white transition-colors">
                  +91 70106 02115
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-moss-green shrink-0" />
                <a href="mailto:info@amudhasurabiy.com" className="hover:text-white transition-colors">
                  info@amudhasurabiy.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-cream-dark/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-cream-dark/50 font-body">
          <p>© {new Date().getFullYear()} Amudhasurabiy Organics. All rights reserved.</p>
          <p>
            Crafted with natural care in Kumbakonam, Tamil Nadu.
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ShieldCheck, Sparkles, MapPin } from "lucide-react";
import JsonLd from "@/components/JsonLd";

export default function AboutPage() {
  return (
    <>
      <JsonLd
        type="organization"
        data={{
          name: "Amudhasurabiy Organics",
          url: "https://amudhasurabiy.com/about/"
        }}
      />
      <Header />
      <main className="min-h-screen bg-cream text-charcoal py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-moss-green/10 text-moss-green font-heading text-xs font-bold uppercase tracking-widest">
              Parent Company Identity
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-walnut-brown tracking-tight">
              About Amudhasurabiy Organics
            </h1>
            <p className="font-heading text-lg font-semibold text-moss-green uppercase tracking-wider">
              Health is Wealth.
            </p>
            <p className="font-body text-sm sm:text-base text-walnut-brown/75 leading-relaxed">
              Founded in Kumbakonam, Tamil Nadu, Amudhasurabiy Organics is a premium natural food and nutrition company. We create farm-sourced, chemical-free nutrition products inspired by traditional Indian wisdom and modern safety standards.
            </p>
          </div>

          {/* Mission, Vision, Philosophy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="rounded-3xl bg-white p-8 border border-walnut-brown/10 shadow-sm space-y-4">
              <span className="h-10 w-10 rounded-2xl bg-moss-green/10 text-moss-green flex items-center justify-center font-heading font-bold text-sm">01</span>
              <h3 className="font-heading text-xl font-bold text-walnut-brown">Our Mission</h3>
              <p className="font-body text-xs sm:text-sm text-walnut-brown/70 leading-relaxed">
                To help every family live a healthier life through pure natural nutrition, crafted without synthetic additives or refined white sugars.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 border border-walnut-brown/10 shadow-sm space-y-4">
              <span className="h-10 w-10 rounded-2xl bg-moss-green/10 text-moss-green flex items-center justify-center font-heading font-bold text-sm">02</span>
              <h3 className="font-heading text-xl font-bold text-walnut-brown">Our Vision</h3>
              <p className="font-body text-xs sm:text-sm text-walnut-brown/70 leading-relaxed">
                To become one of India&apos;s most trusted natural food and wellness companies, fostering a portfolio of pure consumer health brands.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 border border-walnut-brown/10 shadow-sm space-y-4">
              <span className="h-10 w-10 rounded-2xl bg-moss-green/10 text-moss-green flex items-center justify-center font-heading font-bold text-sm">03</span>
              <h3 className="font-heading text-xl font-bold text-walnut-brown">Traditional Wisdom</h3>
              <p className="font-body text-xs sm:text-sm text-walnut-brown/70 leading-relaxed">
                We combine centuries-old sun-drying and small-batch roasting methods with FSSAI-licensed manufacturing transparency.
              </p>
            </div>
          </div>

          {/* Kumbakonam Heritage Section */}
          <div className="rounded-3xl bg-walnut-brown text-white p-8 sm:p-12 md:p-16 mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center shadow-xl">
            <div className="space-y-6">
              <span className="text-moss-green font-heading text-xs font-bold uppercase tracking-widest block">
                Heritage & Roots
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Direct Sourcing from Kumbakonam
              </h2>
              <p className="font-body text-xs sm:text-sm text-cream-dark/80 leading-relaxed">
                Deep in the agricultural heartland of Tamil Nadu, our processing unit in Kumbakonam partners with trusted local farmers. From Kerala Nendran bananas to organic palm jaggery growers, we ensure complete supply chain transparency.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-body text-cream-dark">
                <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-moss-green" /> Thanjavur District, Tamil Nadu</span>
                <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-moss-green" /> FSSAI Lic. 22421543000120</span>
              </div>
            </div>
            <div className="bg-cream/10 p-8 rounded-2xl border border-cream/20 text-center space-y-4">
              <Sparkles className="h-10 w-10 text-moss-green mx-auto" />
              <h4 className="font-heading text-xl font-bold text-white">Flagship Consumer Brand</h4>
              <p className="font-body text-xs text-cream-dark/80">
                Blovit is our first consumer malt nutrition brand. Additional natural health brands are currently under development.
              </p>
              <Link
                href="/shop/"
                className="bg-moss-green hover:bg-white hover:text-walnut-brown text-white px-6 py-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all inline-block shadow-md"
              >
                Shop Blovit Range
              </Link>
            </div>
          </div>

          {/* Brand Name Spelling FAQ Section */}
          <div className="rounded-3xl bg-white p-8 sm:p-12 border border-walnut-brown/10 shadow-sm mb-20 space-y-4">
            <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block">Brand Identity FAQ</span>
            <h3 className="font-heading text-xl font-bold text-walnut-brown">Is it Amudhasurabiy or Amudhasurabi?</h3>
            <p className="font-body text-xs sm:text-sm text-walnut-brown/80 leading-relaxed">
              <strong>Amudhasurabiy Organics</strong> is the official registered name. It is also commonly searched as <strong>Amudhasurabi</strong> or <strong>Amuthasurabi</strong> — all three spellings refer to our exact same brand and products.
            </p>
          </div>

        </div>
      </main>
      <JsonLd
        type="faq"
        data={{
          faqs: [
            {
              question: "Is it Amudhasurabiy or Amudhasurabi?",
              answer: "Amudhasurabiy Organics is the official name. It's also commonly searched as Amudhasurabi or Amuthasurabi — all refer to the same brand."
            }
          ]
        }}
      />
      <Footer />
    </>
  );
}

"use client";

import Link from "next/link";
import { ShieldCheck, Award, Lock, Truck, RefreshCw, Phone, Mail, CheckCircle2, ChevronLeft, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";

export default function TrustCenter() {
  const trustPillars = [
    {
      title: "FSSAI Licensed Facility",
      desc: "Amudhasurabiy Organics operates an FSSAI-certified production unit in Kumbakonam, Thanjavur District (Lic. No: 22421543000120). Every batch undergoes strict hygiene audits.",
      icon: ShieldCheck
    },
    {
      title: "100% Farm-Sourced Ingredients",
      desc: "Fresh apples, beetroots, carrots, and Kerala Nendran bananas directly procured from verified agricultural growers without middleman contamination.",
      icon: Award
    },
    {
      title: "Zero Preservatives & Artificial Additives",
      desc: "No synthetic maltodextrin, artificial food colors, chemical preservatives, or refined white sugar. Naturally sweetened with organic palm sugar and jaggery.",
      icon: CheckCircle2
    },
    {
      title: "Encrypted Razorpay Payment Gateway",
      desc: "All transactions are processed through 256-bit SSL encrypted Razorpay payment gateways supporting UPI, Credit Cards, Debit Cards, and Net Banking.",
      icon: Lock
    },
    {
      title: "Fast Shipping Across India",
      desc: "Dispatched within 24 hours in food-grade, moisture-proof sealed containers to preserve freshness and nutrition.",
      icon: Truck
    },
    {
      title: "7-Day Quality Replacement Guarantee",
      desc: "If your shipment arrives damaged or tampered with, our Kumbakonam team provides immediate replacement or full refunds without hassle.",
      icon: RefreshCw
    }
  ];

  return (
    <>
      <JsonLd
        type="breadcrumb"
        data={{
          items: [
            { name: "Home", url: "/" },
            { name: "Trust Center", url: "/trust/" },
          ],
        }}
      />
      <Header />

      <main className="flex-grow bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          
          <Link href="/" className="inline-flex items-center gap-1 font-heading text-xs font-bold text-walnut-brown/60 hover:text-moss-green uppercase tracking-wider mb-8">
            <ChevronLeft className="h-4 w-4" /> Back to Home
          </Link>

          {/* Header Banner */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-2">
              Transparency & Quality
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-walnut-brown mb-4">
              Blovit Trust Center
            </h1>
            <p className="font-body text-sm text-walnut-brown/70 leading-relaxed">
              We believe families deserve 100% transparency regarding what goes into their health drinks. Here is our complete commitment to quality, licensing, and safety.
            </p>
          </div>

          {/* Trust Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {trustPillars.map((pillar, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 border border-walnut-brown/5 shadow-sm flex items-start gap-5">
                <div className="h-12 w-12 rounded-full bg-moss-green/10 text-moss-green flex items-center justify-center shrink-0">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-walnut-brown mb-2">{pillar.title}</h3>
                  <p className="font-body text-xs text-walnut-brown/75 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Official Licensing Details */}
          <div className="bg-white rounded-3xl p-8 border border-walnut-brown/5 shadow-sm mb-16">
            <h3 className="font-heading text-xl font-bold text-walnut-brown mb-6">Government Registration & Credentials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-body text-xs text-walnut-brown/85">
              <div className="p-5 rounded-2xl bg-cream-dark border border-walnut-brown/5">
                <span className="font-heading font-bold text-moss-green block mb-1">FSSAI Food Safety Registration</span>
                <p>License Number: <strong>22421543000120</strong></p>
                <p className="text-[11px] text-walnut-brown/60 mt-1">Issued under Food Safety and Standards Authority of India for health mix manufacturing.</p>
              </div>
              <div className="p-5 rounded-2xl bg-cream-dark border border-walnut-brown/5">
                <span className="font-heading font-bold text-moss-green block mb-1">GST Registration Status</span>
                <p>GSTIN: <strong>33AAFFA9012K1Z9</strong></p>
                <p className="text-[11px] text-walnut-brown/60 mt-1">Registered under Goods and Services Tax Council of India.</p>
              </div>
            </div>
          </div>

          {/* Direct Support Hub */}
          <div className="bg-moss-green text-cream rounded-3xl p-8 md:p-12 text-center flex flex-col items-center">
            <h3 className="font-heading text-2xl font-bold mb-3 text-white">Have Questions Before Purchasing?</h3>
            <p className="font-body text-xs text-cream/80 max-w-md mb-8 leading-relaxed">
              Our Kumbakonam customer care team is available on WhatsApp and Phone to answer any inquiries about ingredient sourcing, nutrition, or bulk orders.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/917010602115"
                target="_blank"
                rel="noreferrer"
                className="bg-cream text-walnut-brown hover:bg-white px-8 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                Chat on WhatsApp
              </a>
              <Link
                href="/contact-us/"
                className="bg-transparent border border-cream/30 text-cream hover:bg-white/10 px-8 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all"
              >
                Contact Support Page
              </Link>
            </div>
          </div>

        </div>
      </main>

      <WhatsAppButton />
      <Footer />
    </>
  );
}

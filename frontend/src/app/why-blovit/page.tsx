"use client";

import Link from "next/link";
import { ShieldCheck, Heart, Leaf, Activity, UserCheck, Sparkles, ChevronLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";

export default function WhyBlovitPage() {
  const pillars = [
    { title: "100% Natural Ingredients", desc: "Sourced directly from organic farms in Tamil Nadu & Kerala without chemical fertilizers or pesticide residues.", icon: Leaf },
    { title: "No Preservatives", desc: "Sun-dried and traditional roasting processes naturally preserve freshness without chemical preservatives.", icon: ShieldCheck },
    { title: "No Artificial Colours", desc: "The deep ruby hue in our Beetroot Malt and warm gold in our Banana Malt come purely from natural fruits.", icon: Sparkles },
    { title: "No Refined Sugar", desc: "We use traditional unrefined palm sugar (Nattu Sakkarai) and palm jaggery rich in bioavailable minerals.", icon: Heart },
    { title: "Rich Natural Nutrition", desc: "High natural iron, calcium, potassium, dietary fibers, and essential trace minerals.", icon: Activity },
    { title: "Safe for the Whole Family", desc: "Formulated to be gentle on digestive systems of growing toddlers, mothers, adults, and seniors.", icon: UserCheck },
  ];

  return (
    <>
      <JsonLd
        type="breadcrumb"
        data={{
          items: [
            { name: "Home", url: "/" },
            { name: "Why Blovit", url: "/why-blovit/" },
          ],
        }}
      />
      <Header />

      <main className="flex-grow bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          
          <Link href="/" className="inline-flex items-center gap-1 font-heading text-xs font-bold text-walnut-brown/60 hover:text-moss-green uppercase tracking-wider mb-8">
            <ChevronLeft className="h-4 w-4" /> Back to Home
          </Link>

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-2">
              The Blovit Standard
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-walnut-brown mb-4">
              Why Choose Blovit?
            </h1>
            <p className="font-body text-sm text-walnut-brown/70 leading-relaxed">
              Commercial malt drinks are often over 60% refined sugar and synthetic maltodextrin. Blovit offers a pure, authentic alternative rooted in South Indian farm nutrition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {pillars.map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 border border-walnut-brown/5 shadow-2xs flex items-start gap-5">
                <div className="h-12 w-12 rounded-full bg-moss-green/10 text-moss-green flex items-center justify-center shrink-0">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-walnut-brown mb-2">{item.title}</h3>
                  <p className="font-body text-xs text-walnut-brown/75 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 border border-walnut-brown/5 text-center">
            <h3 className="font-heading text-2xl font-bold text-walnut-brown mb-3">Experience the Blovit Difference</h3>
            <p className="font-body text-xs text-walnut-brown/70 max-w-md mx-auto mb-8 leading-relaxed">
              Order your first jar of Blovit ABC, Beetroot, or Nendran Banana Malt today.
            </p>
            <Link href="/shop/" className="bg-moss-green hover:bg-walnut-brown text-white px-8 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-md">
              Shop Collection <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </main>

      <WhatsAppButton />
      <Footer />
    </>
  );
}

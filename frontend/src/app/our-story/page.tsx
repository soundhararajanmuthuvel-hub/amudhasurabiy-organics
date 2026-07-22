"use client";

import Link from "next/link";
import { ChevronLeft, ArrowRight, Heart, Award, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";

export default function OurStoryPage() {
  return (
    <>
      <JsonLd
        type="breadcrumb"
        data={{
          items: [
            { name: "Home", url: "/" },
            { name: "Our Story", url: "/our-story/" },
          ],
        }}
      />
      <Header />

      <main className="flex-grow bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <Link href="/" className="inline-flex items-center gap-1 font-heading text-xs font-bold text-walnut-brown/60 hover:text-moss-green uppercase tracking-wider mb-8">
            <ChevronLeft className="h-4 w-4" /> Back to Home
          </Link>

          <div className="bg-white rounded-3xl p-8 md:p-12 border border-walnut-brown/5 shadow-sm mb-12">
            <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-3">
              Amudhasurabiy Organics Founding Heritage
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-walnut-brown mb-6 leading-tight">
              Crafting Pure Nutrition from Kumbakonam to Indian Families
            </h1>

            <div className="font-body text-sm text-walnut-brown/85 leading-relaxed space-y-6">
              <p>
                Amudhasurabiy Organics was established in Kumbakonam, Thanjavur District—the agricultural heartland of Tamil Nadu. The name <em>Amudhasurabiy</em> symbolizes a vessel of infinite, life-giving nectar.
              </p>
              <p>
                Modern lifestyle beverages are increasingly dominated by synthetic maltodextrin powders, artificial colors, and over 60% refined white sugar. We realized that traditional health drinks—prepared with sprouted millets, farm-fresh beetroots, apples, raw Kerala Nendran bananas, and organic palm jaggery—were fading away.
              </p>
              <p>
                Our flagship brand, <strong>Blovit</strong>, was created to restore this heritage. We source fresh produce directly from local agricultural growers, slow sun-dry our ingredients, and gently mill them in small batches at our FSSAI-licensed facility.
              </p>
              <p>
                Today, Blovit ABC Malt, Blovit Beetroot Malt, and Blovit Nendran Banana Malt are trusted by thousands of mothers, working professionals, and families seeking honest, chemical-free nutrition.
              </p>
            </div>
          </div>

          <div className="bg-moss-green text-cream rounded-3xl p-8 md:p-12 text-center">
            <h3 className="font-heading text-2xl font-bold text-white mb-3">Join the Blovit Circle</h3>
            <p className="font-body text-xs text-cream/80 max-w-md mx-auto mb-6 leading-relaxed">
              Experience authentic South Indian natural nutrition crafted with care.
            </p>
            <Link href="/shop/" className="bg-cream text-walnut-brown hover:bg-white px-8 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2">
              Explore Our Malts <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </main>

      <WhatsAppButton />
      <Footer />
    </>
  );
}

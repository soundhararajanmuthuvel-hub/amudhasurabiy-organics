"use client";

import Link from "next/link";
import { ChevronLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";

export default function OurProcessPage() {
  const steps = [
    { num: "01", title: "Raw Material Sourcing", desc: "Handpicking fresh apples, beetroots, carrots, and Kerala Nendran bananas from trusted organic farms." },
    { num: "02", title: "Quality Inspection & Washing", desc: "Multi-stage hygienic washing and lab testing to ensure zero chemical pesticides or dust residues." },
    { num: "03", title: "Sun-Drying & Sprouting", desc: "Traditional slow sun-drying to preserve natural heat-sensitive vitamins, alongside grain sprouting for bioavailable calcium." },
    { num: "04", title: "Micro-Fine Slow Grinding", desc: "Controlled temperature milling to blend sprouted grains, nuts, cardamom, and unrefined palm sugar into a silky powder." },
    { num: "05", title: "Hygiene Sealed Packaging", desc: "Packed into food-grade, moisture-barrier jars in our FSSAI-licensed facility in Kumbakonam." }
  ];

  return (
    <>
      <JsonLd
        type="breadcrumb"
        data={{
          items: [
            { name: "Home", url: "/" },
            { name: "Our Process", url: "/our-process/" },
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
              Manufacturing Philosophy
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-walnut-brown mb-4">
              Our 5-Step Process
            </h1>
            <p className="font-body text-sm text-walnut-brown/70 leading-relaxed">
              Discover how we turn fresh organic fruits and sprouted grains into luxury health drink powders at our Kumbakonam facility.
            </p>
          </div>

          <div className="flex flex-col gap-6 mb-16">
            {steps.map((s, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 border border-walnut-brown/5 shadow-2xs flex flex-col md:flex-row items-start md:items-center gap-6">
                <span className="font-heading text-4xl font-extrabold text-moss-green shrink-0">{s.num}</span>
                <div>
                  <h3 className="font-heading text-xl font-bold text-walnut-brown mb-2">{s.title}</h3>
                  <p className="font-body text-xs text-walnut-brown/75 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-moss-green text-cream rounded-3xl p-8 md:p-12 text-center">
            <h3 className="font-heading text-2xl font-bold text-white mb-3">Taste Pure Heritage</h3>
            <p className="font-body text-xs text-cream/80 max-w-md mx-auto mb-6 leading-relaxed">
              Formulated without synthetic chemicals or fillers.
            </p>
            <Link href="/shop/" className="bg-cream text-walnut-brown hover:bg-white px-8 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2">
              Shop Blovit Malts <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </main>

      <WhatsAppButton />
      <Footer />
    </>
  );
}

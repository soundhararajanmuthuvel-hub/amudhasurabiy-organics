"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ShieldCheck, Award, Lock, RefreshCw } from "lucide-react";
import JsonLd from "@/components/JsonLd";

export default function QualityAndTrustPage() {
  const trustPillars = [
    {
      icon: ShieldCheck,
      title: "100% Farm-Sourced Purity",
      desc: "Fresh apples, beetroots, carrots, and Kerala Nendran bananas sourced straight from trusted growers without synthetic chemicals."
    },
    {
      icon: Award,
      title: "FSSAI Licensed Facility",
      desc: "Manufactured under strict sanitary guidelines in our licensed Kumbakonam facility (FSSAI Lic. No: 22421543000120)."
    },
    {
      icon: Lock,
      title: "Zero Artificial Additives",
      desc: "No preservatives, synthetic food colors, chemical thickeners, or refined white sugar. Naturally sweetened with raw palm jaggery."
    },
    {
      icon: RefreshCw,
      title: "Small-Batch Roasting",
      desc: "Crafted using slow sun-drying and small-batch roasting to lock in bioavailable minerals, vitamins, and natural flavor."
    }
  ];

  const policies = [
    {
      title: "Company Story & Mission",
      desc: "Amudhasurabiy Organics was founded with a single mission: to help every family live a healthier life through pure natural nutrition.",
      link: "/about/"
    },
    {
      title: "Manufacturing & Sourcing Standards",
      desc: "Every batch of raw ingredients undergoes rigorous cleaning, sorting, and micro-lab testing before processing.",
      link: "/our-process/"
    },
    {
      title: "FSSAI & Regulatory Certifications",
      desc: "FSSAI License: 22421543000120 | GST Registration: 33AAFFA9012K1Z9.",
      link: "/contact/"
    },
    {
      title: "Shipping & Nationwide Delivery",
      desc: "Packed in food-grade moisture-proof seals. Free shipping across Tamil Nadu on orders above ₹499.",
      link: "/shipping-policy/"
    },
    {
      title: "Returns & Refund Policy",
      desc: "Easy replacement or full refund within 7 days if the product package is damaged during transit.",
      link: "/return-refund-policy/"
    },
    {
      title: "Customer Support & Direct Hotline",
      desc: "Dedicated support helpline (+91 70106 02115) and email support for all customer inquiries.",
      link: "/contact/"
    }
  ];

  return (
    <>
      <JsonLd
        type="organization"
        data={{
          name: "Amudhasurabiy Organics Trust Center",
          url: "https://amudhasurabiy.com/quality-and-trust/"
        }}
      />
      <Header />
      <main className="min-h-screen bg-cream text-charcoal py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-moss-green/10 text-moss-green font-heading text-xs font-bold uppercase tracking-widest">
              Quality & Transparency Center
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-walnut-brown tracking-tight">
              Our Uncompromising Commitment to Quality
            </h1>
            <p className="font-body text-sm sm:text-base text-walnut-brown/70 leading-relaxed">
              At <strong className="text-walnut-brown">Amudhasurabiy Organics</strong>, trust is built through complete transparency. From raw farm harvests in Kumbakonam to your kitchen shelf, we uphold the highest safety standards.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {trustPillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-3xl bg-white p-8 border border-walnut-brown/10 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="h-12 w-12 rounded-2xl bg-moss-green/10 flex items-center justify-center text-moss-green mb-6">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-walnut-brown mb-2">
                      {p.title}
                    </h3>
                    <p className="font-body text-xs text-walnut-brown/70 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust Policies Grid */}
          <div className="mb-20">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-walnut-brown mb-8 text-center">
              Transparency, Certification & Support Directory
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {policies.map((pol) => (
                <Link
                  key={pol.title}
                  href={pol.link}
                  className="rounded-3xl bg-cream-dark/30 border border-walnut-brown/10 p-6 hover:bg-white hover:shadow-lg transition-all duration-300 block group"
                >
                  <h4 className="font-heading text-base font-bold text-walnut-brown group-hover:text-moss-green transition-colors mb-2">
                    {pol.title} →
                  </h4>
                  <p className="font-body text-xs text-walnut-brown/70 leading-relaxed">
                    {pol.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* FSSAI & Business License Banner */}
          <div className="rounded-3xl bg-walnut-brown text-white p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xl space-y-4">
            <ShieldCheck className="h-10 w-10 text-moss-green mx-auto" />
            <h3 className="font-heading text-2xl font-bold">FSSAI & Registered Corporate Identity</h3>
            <p className="font-body text-xs sm:text-sm text-cream-dark/80 max-w-xl mx-auto leading-relaxed">
              Amudhasurabiy Organics operates under full regulatory compliance.
              <br />
              <strong>FSSAI Registration Lic. No:</strong> 22421543000120
              <br />
              <strong>GSTIN Registration No:</strong> 33AAFFA9012K1Z9
            </p>
            <div className="pt-4">
              <Link
                href="/contact/"
                className="bg-moss-green hover:bg-white hover:text-walnut-brown text-white px-8 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-md inline-block"
              >
                Contact Quality Team
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

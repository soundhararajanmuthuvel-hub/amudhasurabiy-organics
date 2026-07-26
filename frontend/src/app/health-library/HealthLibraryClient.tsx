"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import JsonLd from "@/components/JsonLd";

export default function HealthLibraryClient() {
  const articles = [
    {
      slug: "why-abc-malt-is-the-ultimate-morning-drink",
      title: "Why ABC Malt (Apple, Beetroot, Carrot) is the Ultimate Morning Health Drink",
      excerpt: "Discover how combining bioavailable iron from beetroots, antioxidants from carrots, and fiber from fresh apples boosts daily stamina and natural hemoglobin levels.",
      category: "Nutritional Science",
      readTime: "4 min read",
      date: "July 2026",
    },
    {
      slug: "nendran-banana-powder-for-toddler-weight-gain",
      title: "Kerala Nendran Banana Powder: A Natural Weight Gainer for Toddlers",
      excerpt: "Traditional South Indian wisdom recommends Nendran banana powder for growing children. Learn about its calorie density, potassium benefits, and easy digestion.",
      category: "Kids Nutrition",
      readTime: "5 min read",
      date: "July 2026",
    },
    {
      slug: "dangers-of-refined-sugar-in-commercial-health-drinks",
      title: "The Hidden Sugar Trap: Why Raw Organic Palm Sugar Matters",
      excerpt: "Commercial malt drinks often contain up to 60% refined white sugar. Explore how raw palm jaggery (Nattu Sakkarai) provides clean energy without glycemic spikes.",
      category: "Ingredient Wisdom",
      readTime: "6 min read",
      date: "July 2026",
    },
  ];

  return (
    <>
      <JsonLd
        type="organization"
        data={{
          name: "Amudhasurabiy Health Library",
          url: "https://amudhasurabiy.com/health-library/"
        }}
      />
      <Header />
      <main className="min-h-screen bg-cream text-charcoal py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-moss-green/10 text-moss-green font-heading text-xs font-bold uppercase tracking-widest">
              Educational Content & Natural Living
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-walnut-brown tracking-tight">
              Amudhasurabiy Health Library
            </h1>
            <p className="font-body text-sm sm:text-base text-walnut-brown/70 leading-relaxed">
              Explore evidence-based articles on traditional Indian nutrition, natural malt preparation, hemoglobin boosting, and child weight management.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {articles.map((art) => (
              <article
                key={art.slug}
                className="rounded-3xl bg-white border border-walnut-brown/10 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 text-xs font-body text-walnut-brown/60 mb-4">
                    <span className="px-3 py-1 rounded-full bg-moss-green/10 text-moss-green font-heading font-bold text-[10px] uppercase">
                      {art.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {art.readTime}
                    </span>
                  </div>

                  <h2 className="font-heading text-xl font-bold text-walnut-brown group-hover:text-moss-green transition-colors mb-3 leading-snug">
                    {art.title}
                  </h2>
                  <p className="font-body text-xs text-walnut-brown/75 leading-relaxed mb-6">
                    {art.excerpt}
                  </p>
                </div>

                <Link
                  href={`/health-library/${art.slug}/`}
                  className="font-heading text-xs font-bold text-moss-green group-hover:text-walnut-brown uppercase tracking-wider flex items-center gap-1 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

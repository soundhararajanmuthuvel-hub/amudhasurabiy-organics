"use client";

import { use } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Heart, Star, Award } from "lucide-react";
import JsonLd from "@/components/JsonLd";

export default function BrandSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const brandInfo = {
    name: "Blovit",
    tagline: "Natural Malt Nutrition",
    company: "Amudhasurabiy Organics",
    description: "Blovit is the flagship consumer nutrition brand of Amudhasurabiy Organics. Crafted with fresh apples, beetroots, carrots, and authentic Kerala Nendran bananas, sweet raw palm sugar, badam, and cashew. Prepared using traditional small-batch sun-drying and gentle roasting in Kumbakonam, Tamil Nadu.",
    products: [
      {
        id: "1",
        name: "ABC Malt",
        slug: "abc-malt",
        category: "Natural Malts",
        price: 399,
        originalPrice: 499,
        rating: 4.9,
        reviewCount: 128,
        image: "/images/abc-malt.png",
        description: "Apple, Beetroot & Carrot natural malt blend enriched with raw palm sugar, badam, and cashew.",
        benefits: ["Boosts Hemoglobin", "Natural Immunity", "100% Chemical Free"]
      },
      {
        id: "2",
        name: "Beetroot Malt",
        slug: "beetroot-malt",
        category: "Natural Malts",
        price: 349,
        originalPrice: 429,
        rating: 4.85,
        reviewCount: 94,
        image: "/images/beetroot-malt.png",
        description: "Pure farm-fresh beetroot powder with cardamom, palm jaggery, and premium nuts.",
        benefits: ["Iron Booster", "Stamina & Energy", "Zero Refined Sugar"]
      },
      {
        id: "3",
        name: "Nendran Banana Malt",
        slug: "nendram-banana-malt",
        category: "Natural Malts",
        price: 379,
        originalPrice: 459,
        rating: 4.92,
        reviewCount: 156,
        image: "/images/banana-malt.png",
        description: "Authentic Kerala Nendran banana malt powder for healthy kids growth and weight gain.",
        benefits: ["Weight Gain for Kids", "Rich Potassium", "Easy Digestion"]
      }
    ]
  };

  return (
    <>
      <JsonLd
        type="organization"
        data={{
          name: `${brandInfo.name} by ${brandInfo.company}`,
          url: `https://amudhasurabiy.com/brands/${slug}/`
        }}
      />
      <Header />
      <main className="min-h-screen bg-cream text-charcoal py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Brand Hero Banner */}
          <div className="rounded-3xl bg-walnut-brown text-cream-dark p-8 sm:p-12 md:p-16 mb-16 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-moss-green text-white font-heading text-xs font-bold uppercase tracking-widest">
                Flagship Brand Portfolio
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
                {brandInfo.name}
              </h1>
              <p className="font-heading text-base sm:text-lg font-semibold text-moss-green uppercase tracking-wider">
                {brandInfo.tagline} — <span className="text-cream-dark/70">by {brandInfo.company}</span>
              </p>
              <p className="font-body text-xs sm:text-sm md:text-base text-cream-dark/80 leading-relaxed pt-2">
                {brandInfo.description}
              </p>
              
              <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-cream-dark/90 font-body">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-moss-green" /> 100% Natural Malts
                </span>
                <span className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-moss-green" /> FSSAI Certified Unit
                </span>
                <span className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-moss-green" /> Kumbakonam Sourced
                </span>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest">
                  Featured Product Collection
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-walnut-brown mt-1">
                  Blovit Natural Health Drink Range
                </h2>
              </div>
              <Link
                href="/shop/"
                className="font-heading text-xs font-bold text-walnut-brown hover:text-moss-green uppercase tracking-wider flex items-center gap-1 group transition-colors"
              >
                <span>View Full Shop</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {brandInfo.products.map((product) => (
                <div
                  key={product.id}
                  className="rounded-3xl bg-white border border-walnut-brown/10 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-56 w-full rounded-2xl bg-cream-dark/30 mb-6 overflow-hidden flex items-center justify-center p-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="h-48 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 right-3 bg-moss-green text-white text-[10px] font-heading font-bold px-2.5 py-1 rounded-full uppercase">
                        By {brandInfo.company}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-amber-500 text-xs mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-walnut-brown/60 font-body text-[11px]">
                        ({product.reviewCount} reviews)
                      </span>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-walnut-brown mb-1">
                      {product.name}
                    </h3>
                    <p className="font-body text-xs text-walnut-brown/70 leading-relaxed mb-4">
                      {product.description}
                    </p>

                    {/* Benefits tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {product.benefits.map((b) => (
                        <span
                          key={b}
                          className="px-2.5 py-0.5 rounded-md bg-moss-green/10 text-moss-green font-body text-[10px] font-medium"
                        >
                          ✓ {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-walnut-brown/10 flex items-center justify-between">
                    <div>
                      <span className="font-heading text-lg font-bold text-walnut-brown">
                        ₹{product.price}
                      </span>
                      <span className="font-body text-xs text-walnut-brown/40 line-through ml-2">
                        ₹{product.originalPrice}
                      </span>
                    </div>
                    <Link
                      href={`/product/${product.slug}/`}
                      className="bg-moss-green hover:bg-walnut-brown text-white px-5 py-2.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

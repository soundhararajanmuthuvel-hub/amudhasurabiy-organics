import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, ShieldCheck } from "lucide-react";
import JsonLd from "@/components/JsonLd";

// Article metadata map — extend as new articles are added
const ARTICLE_META: Record<string, { title: string; description: string }> = {
  "why-abc-malt-is-the-ultimate-morning-drink": {
    title: "Why ABC Malt is the Ultimate Morning Health Drink | Amudhasurabiy Health Library",
    description: "How combining bioavailable iron from beetroots, antioxidants from carrots, and fiber from fresh apples boosts daily stamina and natural hemoglobin levels.",
  },
  "nendran-banana-powder-for-toddler-weight-gain": {
    title: "Kerala Nendran Banana Powder: Natural Weight Gainer for Toddlers | Amudhasurabiy",
    description: "Traditional South Indian wisdom recommends Nendran banana powder for growing children — calorie density, potassium benefits, and easy digestion.",
  },
  "dangers-of-refined-sugar-in-commercial-health-drinks": {
    title: "The Hidden Sugar Trap: Why Raw Organic Palm Sugar Matters | Amudhasurabiy",
    description: "Commercial malt drinks contain up to 60% refined sugar. Discover how raw palm jaggery provides clean energy without glycemic spikes.",
  },
};

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const meta = ARTICLE_META[slug];
  const title = meta?.title ?? "Health Article | Amudhasurabiy Health Library";
  const description = meta?.description ?? "Evidence-based natural nutrition articles from Amudhasurabiy Organics.";
  return {
    title,
    description,
    alternates: { canonical: `/health-library/${slug}/` },
    openGraph: {
      title,
      description,
      url: `https://amudhasurabiy.com/health-library/${slug}/`,
      images: [{ url: "/images/logo.png", width: 512, height: 512, alt: "Amudhasurabiy Organics" }],
    },
  };
}

export default function HealthLibraryArticlePage() {

  const article = {
    title: "Why ABC Malt (Apple, Beetroot, Carrot) is the Ultimate Morning Health Drink",
    category: "Nutritional Science",
    author: "Amudhasurabiy Research Team",
    date: "July 22, 2026",
    readTime: "4 min read",
    content: `
      <p class="text-base leading-relaxed mb-6">In modern fast-paced routines, finding clean, bioavailable daily nutrition without synthetic additives or heavy refined sugars can be challenging. ABC Malt—crafted from farm-fresh <strong>Apples, Beetroots, and Carrots</strong>—has emerged as one of the most effective natural health drink powders in traditional South Indian wellness practices.</p>
      
      <h3 class="text-xl font-heading font-bold text-walnut-brown mt-8 mb-4">1. Bioavailable Iron & Natural Hemoglobin Boost</h3>
      <p class="text-sm leading-relaxed mb-6">Beetroot is rich in natural nitrates, dietary iron, and folate. When combined with Vitamin C naturally present in fresh apples, the absorption of non-heme iron increases significantly in the human body, helping boost natural hemoglobin levels and combat fatigue.</p>
      
      <h3 class="text-xl font-heading font-bold text-walnut-brown mt-8 mb-4">2. Beta-Carotene & Eye Health</h3>
      <p class="text-sm leading-relaxed mb-6">Fresh carrots contain high concentrations of beta-carotene, a precursor to Vitamin A. Daily intake supports eye health, cellular repair, and skin radiance without synthetic vitamin fortification.</p>
      
      <h3 class="text-xl font-heading font-bold text-walnut-brown mt-8 mb-4">3. Zero Refined White Sugar</h3>
      <p class="text-sm leading-relaxed mb-6">Unlike commercial drinks loaded with white refined sugar, Blovit ABC Malt by Amudhasurabiy Organics is naturally sweetened using raw organic palm sugar (Nattu Sakkarai) and raw palm jaggery, keeping glycemic spikes low and providing sustained energy.</p>
    `
  };

  return (
    <>
      <JsonLd
        type="article"
        data={{
          title: article.title,
          description: "Discover how ABC malt boosts daily stamina and natural hemoglobin levels.",
          imageUrl: "/images/abc-malt.png",
          publishedAt: "2026-07-22T00:00:00Z"
        }}
      />
      <Header />
      <main className="min-h-screen bg-cream text-charcoal py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <Link
            href="/health-library/"
            className="inline-flex items-center gap-2 text-xs font-heading font-bold text-moss-green uppercase tracking-wider hover:text-walnut-brown transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Health Library
          </Link>

          <header className="mb-10 space-y-4">
            <span className="px-3 py-1 rounded-full bg-moss-green/10 text-moss-green font-heading text-xs font-bold uppercase">
              {article.category}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-walnut-brown tracking-tight leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-body text-walnut-brown/60 pt-2 border-b border-walnut-brown/10 pb-6">
              <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {article.author}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {article.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {article.readTime}</span>
            </div>
          </header>

          <article
            className="prose prose-stone max-w-none text-walnut-brown/90 font-body text-sm sm:text-base leading-relaxed mb-16"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="rounded-3xl bg-walnut-brown text-white p-8 text-center space-y-4">
            <ShieldCheck className="h-8 w-8 text-moss-green mx-auto" />
            <h3 className="font-heading text-2xl font-bold">Experience 100% Pure ABC Malt</h3>
            <p className="font-body text-xs sm:text-sm text-cream-dark/80 max-w-md mx-auto">
              Prepared in small batches at Kumbakonam with farm-fresh apples, beetroots, carrots, and raw palm sugar.
            </p>
            <div>
              <Link
                href="/shop/"
                className="bg-moss-green hover:bg-white hover:text-walnut-brown text-white px-8 py-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all inline-block shadow-md"
              >
                Shop Blovit ABC Malt Now
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

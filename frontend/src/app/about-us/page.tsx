import Link from "next/link";
import { ChevronLeft, Heart, Sparkles, Sprout } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "About Us | Blovit",
  description: "Learn about Amudhasurabiy Organics, our production roots in Kumbakonam, and our organic food philosophy.",
};

export default function AboutUs() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-cream py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-1 font-heading text-sm font-semibold text-walnut-brown/60 hover:text-moss-green transition-colors mb-8">
            <ChevronLeft className="h-4 w-4" /> Back to Home
          </Link>

          <article className="bg-white rounded-3xl p-8 md:p-12 border border-walnut-brown/5 shadow-sm font-body text-sm text-walnut-brown/85 leading-relaxed space-y-6">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-walnut-brown mb-6">Our Story</h1>
            
            <p className="text-base font-medium text-moss-green italic">
              &quot;We are manufacturers of 100% quality products, rooted in the heritage of traditional Indian wellness.&quot;
            </p>

            <p>
              Based in the historic temple town of <strong>Kumbakonam, Tamil Nadu, India</strong>, <strong>Amudhasurabiy Organics</strong> was founded on a simple, powerful vision: to replace modern chemical-laden energy drinks with pure, traditional organic mixes that feed families safely. Under our premium brand <strong>Blovit</strong>, we deliver natural health drink powders that bring the pure, unadulterated goodness of nature right into your kitchen.
            </p>

            <h2 className="font-heading text-xl font-bold text-walnut-brown mt-8">The Pillars of Blovit</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-6 text-center">
              <div className="p-4 bg-cream-dark rounded-2xl border">
                <Sprout className="h-8 w-8 text-moss-green mx-auto mb-2" />
                <h4 className="font-heading font-bold text-walnut-brown">100% Organic</h4>
                <p className="text-xs text-walnut-brown/70 mt-1">Farm-fresh grains and roots, hand-roasted and milled.</p>
              </div>
              <div className="p-4 bg-cream-dark rounded-2xl border">
                <Heart className="h-8 w-8 text-moss-green mx-auto mb-2" />
                <h4 className="font-heading font-bold text-walnut-brown">Zero Preservatives</h4>
                <p className="text-xs text-walnut-brown/70 mt-1">No artificial flavorings, colorings, or stabilizers.</p>
              </div>
              <div className="p-4 bg-cream-dark rounded-2xl border">
                <Sparkles className="h-8 w-8 text-moss-green mx-auto mb-2" />
                <h4 className="font-heading font-bold text-walnut-brown">Pure Nutrition</h4>                       
                <p className="text-xs text-walnut-brown/70 mt-1">Naturally rich in iron, calcium, potassium and vitamins.</p>
              </div>
            </div>

            <h2 className="font-heading text-xl font-bold text-walnut-brown mt-8">Our Heritage</h2>
            <p>
              Every jar of Blovit Malt is the culmination of careful harvesting and traditional processing. Whether it&apos;s the premium raw Kerala Nendran Bananas sun-dried and milled, or the organic carrots, apples, and beetroots dehydrated to retain their essential enzymes—our focus is on maximum bioavailability. We sprouted Finger Millet (Ragi) to amplify calcium absorption and added real almonds and cashews for cognitive power.
            </p>

            <p>
              We stand against the massive industrialization of food where fillers like refined sugar, palm oil, and maltodextrin are marketed as healthy. Blovit is pure, honest wellness—from Kumbakonam with love.
            </p>

            <p className="text-xs text-walnut-brown/50 pt-8 border-t">
              Amudhasurabiy Organics Team. Kumbakonam, Tamil Nadu, India.
            </p>
          </article>
        </div>
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}

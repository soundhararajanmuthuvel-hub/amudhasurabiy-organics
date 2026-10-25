"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronLeft, HelpCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";

export default function FAQPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "What makes Blovit Malts different from commercial health drink powders?",
      answer: "Blovit malts by Amudhasurabiy Organics are made exclusively from real farm produce, sprouted native grains, and unbleached country jaggery (nattu sakkarai). We never use chemical preservatives, artificial colors, maltodextrin, or artificial thickeners."
    },
    {
      question: "Which Blovit malt is best suited for children and toddlers?",
      answer: "Blovit Nendran Banana Malt and Blovit ABC Malt are customer favorites for children. Nendran banana provides familiar, comforting taste, while ABC Malt provides apple, beetroot, and carrot goodness."
    },
    {
      question: "How do I prepare Blovit malt drinks?",
      answer: "Mix 2 heaped tablespoons (approx 15-20g) of Blovit malt into a cup (150-200ml) of warm milk or boiled water. Stir well until smooth. Since every mix is already naturally sweetened with unrefined country jaggery, you do not need to add any sugar."
    },
    {
      question: "What pack sizes are available and what is the shelf life?",
      answer: "Our products are available in convenient 200 g airtight resealable pouches. Store in a cool, dry place away from direct sunlight. Once opened, seal the pouch tightly or transfer to an airtight container. The shelf life is 6 months from the date of manufacture."
    },
    {
      question: "Do you ship Pan-India and what are the delivery charges?",
      answer: "Yes, we ship across India to all serviceable pincodes. Orders within Tamil Nadu enjoy free delivery on orders above ₹499. Orders across the Rest of India qualify for free shipping above ₹999. All packages are dispatched directly from our licensed facility in Kumbakonam."
    },
    {
      question: "Where are Amudhasurabiy Organics products manufactured?",
      answer: "Our products are manufactured in our licensed FSSAI facility in Kumbakonam, Thanjavur District, Tamil Nadu (FSSAI Lic No: 22421543000120), adhering to rigorous food safety, hygienic handling, and small-batch roasting protocols."
    }
  ];

  return (
    <>
      <JsonLd
        type="breadcrumb"
        data={{
          items: [
            { name: "Home", url: "/" },
            { name: "FAQ", url: "/faq/" },
          ],
        }}
      />
      <JsonLd
        type="faq"
        data={{
          faqs
        }}
      />
      <Header />

      <main className="flex-grow bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 font-heading text-xs font-bold text-walnut-brown/60 hover:text-moss-green uppercase tracking-wider mb-8"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Home
          </Link>

          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-2 flex items-center justify-center gap-1.5">
              <HelpCircle className="h-4 w-4" /> Frequently Asked Questions
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-walnut-brown mb-3">
              Help & Answers
            </h1>
            <p className="font-body text-xs sm:text-sm text-walnut-brown/70 leading-relaxed">
              Find answers to common questions about Blovit organic malts, ingredients, preparation, and shipping.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-walnut-brown/10 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 transition-colors hover:bg-cream/40"
                >
                  <h3 className="font-heading text-base font-bold text-walnut-brown">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 text-moss-green shrink-0 transition-transform duration-300 ${
                      activeFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 pt-1 font-body text-xs text-walnut-brown/80 leading-relaxed border-t border-walnut-brown/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-3xl p-8 border border-walnut-brown/10 text-center shadow-xs">
            <h3 className="font-heading text-lg font-bold text-walnut-brown mb-2">
              Have more questions?
            </h3>
            <p className="font-body text-xs text-walnut-brown/70 mb-4">
              Our Kumbakonam team is always available to assist you with order status, ingredients, or feedback.
            </p>
            <a
              href="https://wa.me/917010602115?text=Hello%20Amudhasurabiy%20Organics,%20I%20have%20a%20question%20about%20Blovit%20malts."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-moss-green hover:bg-walnut-brown text-white font-heading text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-colors shadow-sm"
            >
              Chat on WhatsApp (+91 70106 02115)
            </a>
          </div>
        </div>
      </main>

      <WhatsAppButton />
      <Footer />
    </>
  );
}

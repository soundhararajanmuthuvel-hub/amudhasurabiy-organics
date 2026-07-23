"use client";

import Link from "next/link";
import { CheckCircle2, ChevronLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";

export default function QualityStandardsPage() {
  const standards = [
    { title: "FSSAI License Compliance", desc: "Manufactured under strict License No: 22421543000120 adhering to Safety & Standards Regulations." },
    { title: "Zero Heavy Metal Contamination", desc: "Independent lab audits verify zero lead, mercury, or heavy metal residues." },
    { title: "Hygienic Cleanroom Packing", desc: "Sealed in cleanroom conditions using food-grade moisture barrier containers." },
    { title: "Microbiological Safety Audits", desc: "Regular testing to ensure complete absence of salmonella, e-coli, or mold spores." }
  ];

  return (
    <>
      <JsonLd
        type="breadcrumb"
        data={{
          items: [
            { name: "Home", url: "/" },
            { name: "Quality Standards", url: "/quality-standards/" },
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
              Uncompromising Safety
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-walnut-brown mb-4">
              Quality & Safety Standards
            </h1>
            <p className="font-body text-sm text-walnut-brown/70 leading-relaxed">
              Every jar of Blovit leaving our Kumbakonam plant undergoes stringent quality controls to guarantee 100% safety for your family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {standards.map((s, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 border border-walnut-brown/5 shadow-2xs flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-moss-green shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-lg font-bold text-walnut-brown mb-2">{s.title}</h3>
                  <p className="font-body text-xs text-walnut-brown/75 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 border border-walnut-brown/5 text-center">
            <h3 className="font-heading text-2xl font-bold text-walnut-brown mb-3">View Our Trust Center</h3>
            <p className="font-body text-xs text-walnut-brown/70 max-w-md mx-auto mb-6 leading-relaxed">
              Read complete government license, GST, and lab audit specifications.
            </p>
            <Link href="/trust/" className="bg-moss-green hover:bg-walnut-brown text-white px-8 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2">
              Go to Trust Center <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </main>

      <WhatsAppButton />
      <Footer />
    </>
  );
}

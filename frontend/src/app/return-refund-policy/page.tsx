import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "Return & Refund Policy | Blovit",
  description: "Understand Blovit policy on returns, refunds, damages, and product replacements.",
};

export default function ReturnRefundPolicy() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-cream py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-1 font-heading text-sm font-semibold text-walnut-brown/60 hover:text-moss-green transition-colors mb-8">
            <ChevronLeft className="h-4 w-4" /> Back to Home
          </Link>

          <article className="bg-white rounded-3xl p-8 md:p-12 border border-walnut-brown/5 shadow-sm font-body text-sm text-walnut-brown/85 leading-relaxed space-y-6">
            <h1 className="font-heading text-3xl font-bold text-walnut-brown mb-6">Return & Refund Policy</h1>
            <p>
              At Amudhasurabiy Organics, we stand behind the quality of our Blovit malt products. Since our products are consumable food items, we adhere to strict safety guidelines regarding returns and refunds.
            </p>

            <h2 className="font-heading text-xl font-bold text-walnut-brown mt-8">1. Returns & Replacements</h2>
            <p>
              Due to the perishable nature of malt health drink powders, we do not accept returns on opened or used products. We only offer replacements or refunds in the following specific circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Damage during transit: If the jar/packaging is broken or punctured upon arrival.</li>
              <li>Incorrect items: If the product delivered does not match your purchase invoice (e.g. ordered ABC Malt, received Beetroot Malt).</li>
              <li>Quality concerns: If there is an issue with the product integrity before the expiration date.</li>
            </ul>

            <h2 className="font-heading text-xl font-bold text-walnut-brown mt-8">2. Requesting a Refund/Replacement</h2>
            <p>
              To initiate a request:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Submit a request within 48 hours of delivery.</li>
              <li>Send details and photographic evidence of damage/issue to <strong>info@amudhasurabiy.com</strong> or WhatsApp us at <strong>+91 70106 02115</strong>.</li>
              <li>Once verified, we will arrange for a free replacement dispatch or process a full refund to your original payment method (via Razorpay) within 5-7 business days.</li>
            </ul>

            <p className="text-xs text-walnut-brown/50 pt-8 border-t">
              Last Updated: July 2026. For inquiries, email info@amudhasurabiy.com.
            </p>
          </article>
        </div>
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "Terms & Conditions | Blovit",
  description: "Review terms of service, billing terms, and shipping agreements with Amudhasurabiy Organics.",
};

export default function TermsConditions() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-cream py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-1 font-heading text-sm font-semibold text-walnut-brown/60 hover:text-moss-green transition-colors mb-8">
            <ChevronLeft className="h-4 w-4" /> Back to Home
          </Link>

          <article className="bg-white rounded-3xl p-8 md:p-12 border border-walnut-brown/5 shadow-sm font-body text-sm text-walnut-brown/85 leading-relaxed space-y-6">
            <h1 className="font-heading text-3xl font-bold text-walnut-brown mb-6">Terms & Conditions</h1>
            <p>
              Welcome to Blovit! These terms and conditions outline the rules and regulations for the use of Amudhasurabiy Organics&apos; Website, located at https://amudhasurabiy.com.
            </p>

            <h2 className="font-heading text-xl font-bold text-walnut-brown mt-8">1. License</h2>
            <p>
              Unless otherwise stated, Amudhasurabiy Organics owns the intellectual property rights for all material on Blovit. All intellectual property rights are reserved. You may access this from Blovit for your own personal use subjected to restrictions set in these terms and conditions.
            </p>

            <h2 className="font-heading text-xl font-bold text-walnut-brown mt-8">2. User Accounts</h2>
            <p>
              To purchase products or view order statistics on our platform, you will be required to authenticate using a secure mobile number and password or via guest checkout. You are responsible for ensuring the accuracy of your delivery details.
            </p>

            <h2 className="font-heading text-xl font-bold text-walnut-brown mt-8">3. Purchases & Payment</h2>
            <p>
              By placing an order, you agree to pay the specified price (including dynamic regional shipping charges and applicable taxes) using the checkout integrations powered by Razorpay. We reserve the right to decline or cancel orders in cases of incorrect price listings, out-of-stock products, or suspicious checkout actions.
            </p>

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

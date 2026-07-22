import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "Privacy Policy | Blovit",
  description: "Learn how Amudhasurabiy Organics handles your customer account and checkout details.",
};

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-cream py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-1 font-heading text-sm font-semibold text-walnut-brown/60 hover:text-moss-green transition-colors mb-8">
            <ChevronLeft className="h-4 w-4" /> Back to Home
          </Link>

          <article className="bg-white rounded-3xl p-8 md:p-12 border border-walnut-brown/5 shadow-sm font-body text-sm text-walnut-brown/85 leading-relaxed space-y-6">
            <h1 className="font-heading text-3xl font-bold text-walnut-brown mb-6">Privacy Policy</h1>
            <p>
              At Amudhasurabiy Organics, accessible from https://amudhasurabiy.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Blovit and how we use it.
            </p>

            <h2 className="font-heading text-xl font-bold text-walnut-brown mt-8">1. Information We Collect</h2>
            <p>
              When you visit Blovit, place an order, or register for an account, we collect standard customer identifiers:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Contact details: Name, phone number, email address, delivery and billing addresses.</li>
              <li>Transaction data: Purchase count, coupon codes, and shipping parameters.</li>
              <li>System logs: Pincodes, IP addresses, browser info, and local storage tokens.</li>
            </ul>

            <h2 className="font-heading text-xl font-bold text-walnut-brown mt-8">2. How We Use Your Information</h2>
            <p>
              We use the collected details to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Process and fulfill your orders, including calculating shipping fees and managing Razorpay payments.</li>
              <li>Provide secure account authentication services.</li>
              <li>Enhance and customize store functionalities, cart preservation, and user dashboard statistics.</li>
            </ul>

            <h2 className="font-heading text-xl font-bold text-walnut-brown mt-8">3. Razorpay and Payment Processing</h2>
            <p>
              All payment transactions are processed securely via our payments partner, Razorpay. The Blovit frontend does not store or process card details or UPI credentials locally. All details are encrypted and handled directly by Razorpay servers under their strict security standards.
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

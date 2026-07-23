import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "Shipping Policy | Blovit",
  description: "Review regional delivery fees, dispatch timelines, and free shipping eligibility thresholds.",
};

export default function ShippingPolicy() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-cream py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-1 font-heading text-sm font-semibold text-walnut-brown/60 hover:text-moss-green transition-colors mb-8">
            <ChevronLeft className="h-4 w-4" /> Back to Home
          </Link>

          <article className="bg-white rounded-3xl p-8 md:p-12 border border-walnut-brown/5 shadow-sm font-body text-sm text-walnut-brown/85 leading-relaxed space-y-6">
            <h1 className="font-heading text-3xl font-bold text-walnut-brown mb-6">Shipping Policy</h1>
            <p>
              Thank you for visiting and shopping at Blovit. The following terms and conditions constitute our Shipping Policy. All products are manufactured and dispatched directly from our facility in Kumbakonam, Tamil Nadu, India.
            </p>

            <h2 className="font-heading text-xl font-bold text-walnut-brown mt-8">1. Shipping Charges & Delivery Estimates</h2>
            <p>
              Shipping charges are calculated dynamically at checkout based on the delivery destination&apos;s pincode and subtotal:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs font-body text-walnut-brown/80 border border-walnut-brown/10 mb-4">
                <thead>
                  <tr className="bg-cream-dark border-b border-walnut-brown/10">
                    <th className="px-4 py-2 text-left font-bold uppercase tracking-wider">Region</th>
                    <th className="px-4 py-2 text-left font-bold uppercase tracking-wider">Shipping Charge</th>
                    <th className="px-4 py-2 text-left font-bold uppercase tracking-wider">Free Shipping Threshold</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-walnut-brown/10">
                  <tr>
                    <td className="px-4 py-2">Tamil Nadu</td>
                    <td className="px-4 py-2">₹60</td>
                    <td className="px-4 py-2">₹499 and above</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Kerala</td>
                    <td className="px-4 py-2">₹80</td>
                    <td className="px-4 py-2">₹799 and above</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Karnataka</td>
                    <td className="px-4 py-2">₹90</td>
                    <td className="px-4 py-2">₹799 and above</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Rest of India</td>
                    <td className="px-4 py-2">₹110</td>
                    <td className="px-4 py-2">₹999 and above</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-heading text-xl font-bold text-walnut-brown mt-8">2. Shipment Processing Time</h2>
            <p>
              All orders are processed and packed within 1-2 business days. Orders are not dispatched or delivered on Sundays or national public holidays.
            </p>
            <p>
              If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery. If there is a significant delay in the shipment of your order, we will contact you via phone or email.
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

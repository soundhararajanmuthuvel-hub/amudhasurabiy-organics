"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ChevronRight, ShoppingBag, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "BLV-DEMO-" + Math.floor(100000 + Math.random() * 900000);
  const total = searchParams.get("total") || "450";
  const paymentMethod = searchParams.get("paymentMethod") || "Prepaid via Razorpay";

  return (
    <div className="mx-auto max-w-lg px-6 py-12 bg-white rounded-3xl border border-walnut-brown/10 shadow-xl text-center">
      <div className="h-16 w-16 bg-moss-green/10 text-moss-green rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="h-10 w-10" />
      </div>
      <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-1">
        Simulated Demo Checkout
      </span>
      <h1 className="font-heading text-2xl sm:text-3xl font-bold text-walnut-brown mb-2">
        Order Confirmed!
      </h1>
      <p className="font-body text-xs text-walnut-brown/70 mb-6">
        Your simulated order has been registered in the prototype environment. No actual payment was processed.
      </p>

      <div className="bg-cream p-5 rounded-2xl w-full mb-6 font-body text-xs text-left flex flex-col gap-2.5 border border-walnut-brown/10 shadow-xs">
        <div className="flex justify-between items-center pb-2 border-b border-walnut-brown/10">
          <span className="text-walnut-brown/70">Order Number:</span>
          <span className="font-heading font-bold text-walnut-brown text-sm">#{orderNumber}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-walnut-brown/70">Payment Mode:</span>
          <span className="font-heading font-semibold text-moss-green bg-moss-green/10 px-2.5 py-0.5 rounded-full text-[11px]">
            {paymentMethod}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-walnut-brown/70">Total Amount:</span>
          <span className="font-heading font-bold text-walnut-brown text-base">₹{total}</span>
        </div>
        <div className="pt-2 border-t border-walnut-brown/10 flex items-center justify-between text-[11px] text-walnut-brown/80">
          <span>Dispatch: Kumbakonam facility</span>
          <span className="text-moss-green font-semibold">Ready for Packing</span>
        </div>
      </div>

      {/* Step-by-Step Order Tracking Timeline */}
      <div className="w-full bg-cream/50 p-5 rounded-2xl border border-walnut-brown/10 mb-6 text-left">
        <span className="font-heading text-xs font-bold uppercase tracking-wider text-walnut-brown block mb-4">
          Simulated Tracking Timeline
        </span>
        <div className="relative pl-6 space-y-4 border-l-2 border-moss-green ml-2">
          <div className="relative">
            <span className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-moss-green flex items-center justify-center text-white text-[10px] font-bold">
              ✓
            </span>
            <p className="font-heading text-xs font-bold text-walnut-brown">Order Confirmed</p>
            <p className="font-body text-[11px] text-walnut-brown/60">Simulated checkout complete</p>
          </div>
          <div className="relative">
            <span className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-moss-green/40 flex items-center justify-center text-white text-[10px]">
              ●
            </span>
            <p className="font-heading text-xs font-semibold text-walnut-brown">Small-Batch Packaging</p>
            <p className="font-body text-[11px] text-walnut-brown/60">Awaiting dispatch in Kumbakonam</p>
          </div>
          <div className="relative">
            <span className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-walnut-brown/20 flex items-center justify-center text-white text-[10px]">
              ○
            </span>
            <p className="font-heading text-xs font-semibold text-walnut-brown/50">Dispatched via Express Courier</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href={`/account/orders/${orderNumber}/`}
          className="flex items-center justify-center gap-2 bg-moss-green hover:bg-walnut-brown text-white px-6 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-md"
        >
          <span>View Order Timeline</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
        <Link
          href="/shop/"
          className="flex items-center justify-center gap-2 bg-cream hover:bg-cream-dark text-walnut-brown px-6 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all border border-walnut-brown/15"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-cream py-16 md:py-24">
        <Suspense fallback={<div className="text-center py-12">Loading confirmation...</div>}>
          <OrderConfirmationContent />
        </Suspense>
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}

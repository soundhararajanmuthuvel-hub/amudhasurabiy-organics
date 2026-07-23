"use client";

import { CreditCard, CheckCircle2 } from "lucide-react";

interface OrderSummaryProps {
  summary: {
    items: { name: string; qty: number; price: number }[];
    subtotal: number;
    shippingCharge: number;
    discount: number;
    grandTotal: number;
  };
  onProceedToPayment?: () => void;
}

export default function OrderSummaryCard({ summary }: OrderSummaryProps) {
  return (
    <div className="my-3 bg-white border border-moss-green/30 rounded-2xl p-4 shadow-md space-y-3 max-w-sm">
      <div className="flex items-center justify-between border-b border-walnut-brown/10 pb-2">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-moss-green" />
          <h4 className="font-heading text-xs font-bold text-walnut-brown">Order Summary</h4>
        </div>
        <span className="text-[10px] font-heading font-bold text-moss-green bg-moss-green/10 px-2 py-0.5 rounded-full uppercase">
          Ready for Payment
        </span>
      </div>

      <div className="space-y-1.5 text-xs font-body">
        {summary.items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-walnut-brown">
            <span>{item.name} (x{item.qty})</span>
            <span className="font-bold">₹{item.price * item.qty}</span>
          </div>
        ))}

        <div className="border-t border-walnut-brown/10 pt-2 space-y-1 text-[11px] text-walnut-brown/70">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{summary.subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{summary.shippingCharge === 0 ? "FREE" : `₹${summary.shippingCharge}`}</span>
          </div>

          {summary.discount > 0 && (
            <div className="flex justify-between text-moss-green font-semibold">
              <span>Discount</span>
              <span>-₹{summary.discount}</span>
            </div>
          )}

          <div className="border-t border-walnut-brown/10 pt-1.5 flex justify-between font-heading text-sm font-bold text-walnut-brown">
            <span>Grand Total</span>
            <span className="text-moss-green">₹{summary.grandTotal}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          window.location.href = `/checkout/?direct=true`;
        }}
        className="w-full flex items-center justify-center gap-2 bg-moss-green hover:bg-walnut-brown text-white py-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
      >
        <CreditCard className="h-4 w-4" />
        Proceed to Razorpay Payment
      </button>
    </div>
  );
}

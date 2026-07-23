"use client";

import { useAiChatStore } from "@/store/useAiChatStore";
import { MapPin, ArrowRight } from "lucide-react";

export default function AddressFormCard() {
  const { addressDraft, setAddressDraft, submitAddressAndCheckout, aiState } = useAiChatStore();

  const isSubmitting = aiState === "CreatingOrder" || aiState === "RedirectingToPayment";

  return (
    <div className="my-3 bg-white border border-walnut-brown/10 rounded-2xl p-4 shadow-sm space-y-3 max-w-sm">
      <div className="flex items-center gap-2 border-b border-walnut-brown/10 pb-2">
        <MapPin className="h-4 w-4 text-moss-green" />
        <h4 className="font-heading text-xs font-bold text-walnut-brown">Delivery Address Details</h4>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <label className="font-body text-[9px] font-bold uppercase text-walnut-brown/60 block mb-0.5">Full Name *</label>
          <input
            type="text"
            placeholder="Recipient Name"
            value={addressDraft.name}
            onChange={(e) => setAddressDraft({ name: e.target.value })}
            className="w-full rounded-lg px-2.5 py-1.5 bg-cream border border-walnut-brown/15 text-xs text-walnut-brown focus:outline-none focus:border-moss-green"
          />
        </div>

        <div>
          <label className="font-body text-[9px] font-bold uppercase text-walnut-brown/60 block mb-0.5">Phone Number *</label>
          <input
            type="tel"
            placeholder="10-digit mobile"
            value={addressDraft.phone}
            onChange={(e) => setAddressDraft({ phone: e.target.value.replace(/\D/g, "") })}
            className="w-full rounded-lg px-2.5 py-1.5 bg-cream border border-walnut-brown/15 text-xs text-walnut-brown focus:outline-none focus:border-moss-green"
          />
        </div>
      </div>

      <div>
        <label className="font-body text-[9px] font-bold uppercase text-walnut-brown/60 block mb-0.5">Door No., Building, Street *</label>
        <input
          type="text"
          placeholder="Address line 1"
          value={addressDraft.line1}
          onChange={(e) => setAddressDraft({ line1: e.target.value })}
          className="w-full rounded-lg px-2.5 py-1.5 bg-cream border border-walnut-brown/15 text-xs text-walnut-brown focus:outline-none focus:border-moss-green"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <label className="font-body text-[9px] font-bold uppercase text-walnut-brown/60 block mb-0.5">City / Town *</label>
          <input
            type="text"
            placeholder="City"
            value={addressDraft.city}
            onChange={(e) => setAddressDraft({ city: e.target.value })}
            className="w-full rounded-lg px-2.5 py-1.5 bg-cream border border-walnut-brown/15 text-xs text-walnut-brown focus:outline-none focus:border-moss-green"
          />
        </div>

        <div>
          <label className="font-body text-[9px] font-bold uppercase text-walnut-brown/60 block mb-0.5">Pincode *</label>
          <input
            type="text"
            placeholder="6-digit PIN"
            maxLength={6}
            value={addressDraft.pincode}
            onChange={(e) => setAddressDraft({ pincode: e.target.value.replace(/\D/g, "") })}
            className="w-full rounded-lg px-2.5 py-1.5 bg-cream border border-walnut-brown/15 text-xs text-walnut-brown focus:outline-none focus:border-moss-green"
          />
        </div>
      </div>

      <button
        onClick={submitAddressAndCheckout}
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-1.5 bg-moss-green hover:bg-walnut-brown text-white py-2.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-colors shadow-sm disabled:opacity-60"
      >
        {isSubmitting ? "Generating Order..." : "Calculate Shipping & Order Summary"}
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, Tag, X, ShieldCheck, Lock, Truck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { useCartStore } from "@/store/useCartStore";
import { validateCoupon } from "@/lib/api/coupons";
import { trackCustomerEvent } from "@/lib/api/events";

export default function Cart() {
  const { cart, updateQty, removeFromCart, coupon, setCoupon, shippingCharge, shippingPincode, shippingMessage, calculateShipping, hydrate, isHydrated } = useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [pincodeInput, setPincodeInput] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const subtotal = isHydrated ? cart.reduce((sum, item) => sum + item.price * item.qty, 0) : 0;
  
  let discount = 0;
  if (coupon && coupon.valid && subtotal >= 200) {
    discount = coupon.discount;
  }

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setIsValidating(true);
    setCouponError("");
    setCouponSuccess("");

    try {
      const res = await validateCoupon(couponCode, subtotal);
      if (res.valid) {
        setCoupon({
          valid: true,
          discount: res.discount,
          type: res.type,
          value: res.value,
          message: res.message
        });
        setCouponSuccess(res.message);
        setCouponCode("");
        trackCustomerEvent("coupon_applied", { metadata: { couponCode } });
      } else {
        setCouponError(res.message);
      }
    } catch (err: any) {
      setCouponError(err.message || "Failed to apply coupon.");
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCoupon(null);
    setCouponSuccess("");
  };

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateShipping(pincodeInput);
  };

  if (!isHydrated) return null;

  return (
    <>
      <JsonLd
        type="breadcrumb"
        data={{
          items: [
            { name: "Home", url: "/" },
            { name: "Cart", url: "/cart/" },
          ],
        }}
      />
      <Header />

      <main className="flex-grow bg-cream py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-walnut-brown mb-10">Shopping Basket</h1>

          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Cart Items List */}
              <div className="lg:col-span-8 bg-white border border-walnut-brown/5 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="flex flex-col sm:flex-row items-center gap-4 py-4 border-b border-walnut-brown/5 last:border-0 last:pb-0"
                  >
                    <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-cream-dark border border-walnut-brown/10 shrink-0">
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                    </div>

                    <div className="flex-grow text-center sm:text-left">
                      <h3 className="font-heading text-base font-bold text-walnut-brown">{item.name}</h3>
                      <span className="font-body text-xs font-semibold text-moss-green mt-1 block">₹{item.price}</span>
                    </div>

                    <div className="flex items-center justify-between border border-walnut-brown/10 rounded-full px-3 py-1.5 w-28 bg-cream">
                      <button
                        onClick={() => updateQty(item.productId, item.qty - 1)}
                        className="text-walnut-brown/60 hover:text-moss-green transition-colors"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="font-heading font-semibold text-xs text-walnut-brown">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.productId, item.qty + 1)}
                        className="text-walnut-brown/60 hover:text-moss-green transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-6 shrink-0">
                      <span className="font-heading text-base font-bold text-walnut-brown min-w-[60px] text-right">
                        ₹{item.price * item.qty}
                      </span>
                      <button
                        onClick={() => {
                          removeFromCart(item.productId);
                          trackCustomerEvent("remove_from_cart", { productId: item.productId });
                        }}
                        className="text-walnut-brown/40 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary and Coupons Sidebar */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                
                {/* Shipping Estimator Panel */}
                <div className="bg-white border border-walnut-brown/5 rounded-3xl p-6 shadow-sm">
                  <h3 className="font-heading text-base font-bold text-walnut-brown mb-3 flex items-center gap-2">
                    <Truck className="h-4.5 w-4.5 text-moss-green" /> Shipping Calculator
                  </h3>
                  <form onSubmit={handlePincodeSubmit} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter 6-digit PIN code"
                      maxLength={6}
                      value={pincodeInput}
                      onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ""))}
                      className="w-full bg-cream border border-walnut-brown/15 rounded-full px-4 py-2 text-xs text-walnut-brown focus:outline-none focus:border-moss-green font-heading"
                    />
                    <button type="submit" className="bg-walnut-brown text-white text-[10px] font-heading font-bold uppercase px-4 py-2 rounded-full">
                      Calc
                    </button>
                  </form>
                  {shippingMessage && (
                    <p className="font-body text-[11px] text-moss-green font-semibold mt-2.5 pl-1">{shippingMessage}</p>
                  )}
                </div>

                {/* Promo Code Panel */}
                <div className="bg-white border border-walnut-brown/5 rounded-3xl p-6 shadow-sm">
                  <h3 className="font-heading text-base font-bold text-walnut-brown mb-4 flex items-center gap-2">
                    <Tag className="h-4.5 w-4.5 text-moss-green" /> Apply Promo Code
                  </h3>
                  
                  {coupon ? (
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-moss-green/10 border border-moss-green/20 text-moss-green text-xs font-body">
                      <span>Promo Active: {coupon.message}</span>
                      <button onClick={handleRemoveCoupon} className="text-moss-green hover:text-walnut-brown transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Coupon code (FIRST10)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full bg-cream border border-walnut-brown/15 rounded-full px-4 py-2.5 text-xs text-walnut-brown focus:outline-none focus:border-moss-green font-heading"
                      />
                      <button
                        type="submit"
                        disabled={isValidating}
                        className="bg-walnut-brown hover:bg-moss-green text-white font-heading text-[10px] font-bold px-5 py-2.5 rounded-full uppercase tracking-wider transition-colors disabled:opacity-50"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {couponError && <p className="text-red-500 text-xs font-body mt-2 pl-2">{couponError}</p>}
                  {couponSuccess && <p className="text-moss-green text-xs font-body mt-2 pl-2">{couponSuccess}</p>}
                  
                  <span className="text-[10px] text-walnut-brown/50 mt-3 block pl-1">
                    Try <strong>FIRST10</strong> or <strong>BLOVI10</strong> for 10% discount.
                  </span>
                </div>

                {/* Summary Card */}
                <div className="bg-white border border-walnut-brown/5 rounded-3xl p-6 shadow-sm">
                  <h3 className="font-heading text-lg font-bold text-walnut-brown mb-6">Order Summary</h3>

                  <div className="flex flex-col gap-4 font-body text-xs border-b border-walnut-brown/5 pb-6">
                    <div className="flex justify-between text-walnut-brown/80">
                      <span>Subtotal</span>
                      <span className="font-semibold text-walnut-brown">₹{subtotal}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-moss-green">
                        <span>Discount</span>
                        <span className="font-semibold">-₹{discount}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-walnut-brown/80">
                      <span>Estimated Shipping</span>
                      <span className="font-semibold text-walnut-brown">{shippingCharge === 0 ? "FREE" : `₹${shippingCharge}`}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-6">
                    <span className="font-heading text-base font-bold text-walnut-brown">Total</span>
                    <span className="font-heading text-2xl font-bold text-moss-green">
                      ₹{Math.max(0, subtotal - discount + shippingCharge)}
                    </span>
                  </div>

                  <Link
                    href="/checkout/"
                    onClick={() => trackCustomerEvent("checkout_started")}
                    className="w-full flex items-center justify-center gap-2 bg-moss-green hover:bg-walnut-brown text-white py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md group hover:scale-[1.01]"
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <div className="mt-6 flex items-center justify-center gap-4 text-[10px] text-walnut-brown/60 font-body">
                    <span className="flex items-center gap-1"><Lock className="h-3 w-3 text-moss-green" /> 256-bit SSL</span>
                    <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-moss-green" /> FSSAI Certified</span>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-walnut-brown/5 shadow-sm max-w-lg mx-auto">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-dark text-walnut-brown/40 mx-auto mb-6">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h2 className="font-heading text-xl font-bold text-walnut-brown mb-2">Your Basket is Empty</h2>
              <p className="font-body text-xs text-walnut-brown/60 mb-8 max-w-sm mx-auto leading-relaxed">
                Add premium organic nutrition malts to your cart and experience the Blovit natural difference.
              </p>
              <Link
                href="/shop/"
                className="inline-flex items-center gap-2 bg-moss-green hover:bg-walnut-brown text-cream px-8 py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 group hover:scale-105"
              >
                Go to Shop
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}

        </div>
      </main>

      <WhatsAppButton />
      <Footer />
    </>
  );
}

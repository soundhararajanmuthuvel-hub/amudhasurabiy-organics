"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShoppingBag,
  Tag,
  X,
  ShieldCheck,
  Lock,
  Truck,
  Wallet,
  UserCheck,
  UserX,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { useCartStore } from "@/store/useCartStore";
import { validateCoupon } from "@/lib/api/coupons";
import { trackCustomerEvent } from "@/lib/api/events";

export default function Cart() {
  const router = useRouter();
  const {
    cart,
    updateQty,
    removeFromCart,
    coupon,
    setCoupon,
    shippingCharge,
    shippingMessage,
    calculateShipping,
    customer,
    walletBalance,
    useWallet,
    toggleUseWallet,
    hydrate,
    isHydrated,
    setCheckoutMode,
  } = useCartStore();

  const [pincodeInput, setPincodeInput] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [showAuthChoiceModal, setShowAuthChoiceModal] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Dynamic Coupon Discount Calculation
  let discount = 0;
  if (coupon) {
    if (coupon.type === "percentage") {
      discount = Math.round((subtotal * coupon.value) / 100);
    } else {
      discount = coupon.value;
    }
  }

  const walletDeduction = useWallet ? Math.min(walletBalance, subtotal - discount) : 0;
  const grandTotal = Math.max(0, subtotal - discount - walletDeduction + shippingCharge);

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
          message: res.message,
        });
        setCouponSuccess(res.message);
        setCouponCode("");
        trackCustomerEvent("coupon_applied", { metadata: { couponCode } });
      } else {
        setCouponError(res.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        setCouponError(err.message);
      } else {
        setCouponError("Failed to apply coupon.");
      }
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

  const handleProceedToCheckout = () => {
    if (customer) {
      setCheckoutMode("login");
      router.push("/checkout/");
    } else {
      setShowAuthChoiceModal(true);
    }
  };

  const handleChooseLogin = () => {
    setCheckoutMode("login");
    router.push("/login/?redirect=/checkout/");
  };

  const handleChooseGuest = () => {
    setCheckoutMode("guest");
    router.push("/checkout/");
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
                    <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-cream-dark border border-walnut-brown/10 shrink-0 flex items-center justify-center">
                      <Image src={item.imageUrl} alt={item.name} fill className="object-contain p-1.5" />
                    </div>

                    <div className="flex-grow text-center sm:text-left">
                      <h3 className="font-heading text-base font-bold text-walnut-brown">{item.name}</h3>
                      <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-heading font-semibold bg-[#E8F0E3] text-[#2E5A44]">
                          Pack: 200 g
                        </span>
                        <span className="font-body text-xs font-semibold text-moss-green">₹{item.price}</span>
                      </div>
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
                </div>

                {/* Reward Wallet Panel */}
                {customer && walletBalance > 0 && (
                  <div className="bg-moss-green/5 border border-moss-green/20 rounded-3xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Wallet className="h-5 w-5 text-moss-green" />
                        <div>
                          <h4 className="font-heading text-sm font-bold text-walnut-brown">Reward Wallet Balance</h4>
                          <span className="font-heading text-xs font-bold text-moss-green">₹{walletBalance} available</span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleUseWallet()}
                        className={`px-4 py-2 rounded-full font-heading text-[10px] font-bold uppercase transition-colors ${
                          useWallet
                            ? "bg-moss-green text-white"
                            : "bg-cream border border-walnut-brown/20 text-walnut-brown hover:border-moss-green"
                        }`}
                      >
                        {useWallet ? "Applied (-₹" + walletDeduction + ")" : "Apply Wallet"}
                      </button>
                    </div>
                  </div>
                )}

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
                        <span>Coupon Discount</span>
                        <span className="font-semibold">-₹{discount}</span>
                      </div>
                    )}

                    {walletDeduction > 0 && (
                      <div className="flex justify-between text-moss-green">
                        <span>Reward Wallet Deduction</span>
                        <span className="font-semibold">-₹{walletDeduction}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-walnut-brown/80">
                      <span>Estimated Shipping</span>
                      <span className="font-semibold text-walnut-brown">{shippingCharge === 0 ? "FREE" : `₹${shippingCharge}`}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-6">
                    <span className="font-heading text-base font-bold text-walnut-brown">Total to Pay</span>
                    <span className="font-heading text-2xl font-bold text-moss-green">₹{grandTotal}</span>
                  </div>

                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full flex items-center justify-center gap-2 bg-moss-green hover:bg-walnut-brown text-white py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md group hover:scale-[1.01]"
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>

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

      {/* Equal-Weight Guest vs Login Modal */}
      {showAuthChoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-walnut-brown/10 shadow-2xl flex flex-col relative animate-fade-in">
            <button
              onClick={() => setShowAuthChoiceModal(false)}
              className="absolute top-6 right-6 text-walnut-brown/40 hover:text-walnut-brown transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center mb-6">
              <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-moss-green block mb-2">
                Checkout Choice
              </span>
              <h3 className="font-heading text-xl font-bold text-walnut-brown">How would you like to proceed?</h3>
              <p className="font-body text-xs text-walnut-brown/70 mt-1">
                You can sign in to earn reward points or continue as a guest instantly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleChooseLogin}
                className="flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-moss-green bg-moss-green/5 hover:bg-moss-green hover:text-white text-moss-green transition-all group font-heading text-xs font-bold uppercase tracking-wider text-center"
              >
                <UserCheck className="h-6 w-6 mb-2 text-moss-green group-hover:text-white" />
                <span>Sign In to Account</span>
                <span className="text-[10px] normal-case font-body font-normal opacity-80 mt-1">
                  Earn points & use wallet
                </span>
              </button>

              <button
                onClick={handleChooseGuest}
                className="flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-walnut-brown/20 bg-cream-dark hover:bg-walnut-brown hover:text-white text-walnut-brown transition-all group font-heading text-xs font-bold uppercase tracking-wider text-center"
              >
                <UserX className="h-6 w-6 mb-2 text-walnut-brown group-hover:text-white" />
                <span>Continue as Guest</span>
                <span className="text-[10px] normal-case font-body font-normal opacity-80 mt-1">
                  Fast 1-step checkout
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      <WhatsAppButton />
      <Footer />
    </>
  );
}

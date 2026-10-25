"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CreditCard, MapPin, CheckCircle, ChevronLeft, UserPlus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import FormField from "@/components/auth/FormField";
import PasswordInput from "@/components/auth/PasswordInput";
import PasswordStrengthBar from "@/components/auth/PasswordStrengthBar";
import { useCartStore } from "@/store/useCartStore";
import { getAddresses, createAddress } from "@/lib/api/addresses";
import { createRazorpayOrder, verifyRazorpayPayment } from "@/lib/api/razorpay";
import { placeMockOrder } from "@/lib/api/orders";
import { convertGuestToAccount } from "@/lib/api/checkout";
import { trackCustomerEvent } from "@/lib/api/events";

interface SavedAddress {
  id: string;
  name: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email?: string;
}

interface CompletedOrder {
  orderNumber: string;
  total: number;
  isGuest: boolean;
  guestPhone?: string;
  paymentMethod?: string;
}

export default function Checkout() {
  const { cart, coupon, customer, walletBalance, useWallet, shippingCharge, calculateShipping, clearCart, setCustomer, hydrate, isHydrated } = useCartStore();

  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Address Form State
  const [newName, setNewName] = useState("");
  const [newLine1, setNewLine1] = useState("");
  const [newLine2, setNewLine2] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("Tamil Nadu");
  const [newPincode, setNewPincode] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMockPaymentModal, setShowMockPaymentModal] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState<CompletedOrder | null>(null);

  // Post-Checkout Guest Conversion State
  const [convertPassword, setConvertPassword] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [convertError, setConvertError] = useState("");
  const [convertSuccess, setConvertSuccess] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Load Saved Addresses if logged in
  useEffect(() => {
    if (isHydrated && customer) {
      getAddresses().then((data) => {
        setAddresses(data);
        if (data.length > 0) {
          setSelectedAddressId(data[0].id);
          calculateShipping(data[0].pincode);
        } else {
          setShowAddressForm(true);
        }
      });
    } else if (isHydrated && !customer) {
      Promise.resolve().then(() => setShowAddressForm(true));
    }
  }, [isHydrated, customer, calculateShipping]);

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);
    const selected = addresses.find((a) => a.id === id);
    if (selected) {
      calculateShipping(selected.pincode);
    }
  };

  const handleAddNewAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPincode || newPincode.length < 6) return;

    if (customer) {
      try {
        const added = await createAddress({
          name: newName,
          line1: newLine1,
          line2: newLine2,
          city: newCity,
          state: newState,
          pincode: newPincode,
          phone: newPhone,
        });

        setAddresses([...addresses, added]);
        setSelectedAddressId(added.id);
        setShowAddressForm(false);
        calculateShipping(added.pincode);
      } catch (e) {
        console.error(e);
      }
    } else {
      // Guest address submission
      calculateShipping(newPincode);
      setShowAddressForm(false);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = coupon ? coupon.discount : 0;
  const walletDeduction = customer && useWallet ? Math.min(walletBalance, Math.max(0, subtotal - discount)) : 0;
  const grandTotal = Math.max(0, subtotal - discount - walletDeduction + shippingCharge);

  const getActiveShippingAddress = () => {
    if (customer && selectedAddressId) {
      const selected = addresses.find((a) => a.id === selectedAddressId);
      if (selected) return selected;
    }
    return {
      id: "addr_guest_" + (newPhone || Date.now()),
      name: newName || "Guest",
      line1: newLine1,
      line2: newLine2,
      city: newCity,
      state: newState,
      pincode: newPincode,
      phone: newPhone,
      email: newEmail,
    };
  };

  const handlePlaceOrder = async () => {
    const activeAddr = getActiveShippingAddress();
    if (!activeAddr.line1 || !activeAddr.city || !activeAddr.pincode || !activeAddr.phone) {
      alert("Please provide a valid delivery address and 10-digit mobile number.");
      return;
    }

    const hasUnavailableSize = cart.some((item) => {
      const w = String(item.weight || "").toLowerCase().replace(/\s+/g, "");
      const n = String(item.name || "").toLowerCase();
      return w.includes("500") || w.includes("1kg") || w.includes("1000") || n.includes("500g") || n.includes("1kg");
    });

    if (hasUnavailableSize) {
      alert("Only 200 g packs are currently available for purchase. Please review your cart.");
      return;
    }

    setIsProcessing(true);
    const isMock = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

    // 1. CASH ON DELIVERY (COD) ORDER PATH
    if (paymentMethod === "cod") {
      try {
        const items = cart.map((c) => ({
          productId: c.productId,
          name: c.name,
          price: c.price,
          quantity: c.qty,
        }));
        const savedOrder = await placeMockOrder(
          items,
          grandTotal,
          shippingCharge,
          discount,
          activeAddr,
          "Cash on Delivery (COD)"
        );
        trackCustomerEvent("checkout_completed", { metadata: { orderNumber: savedOrder.orderNumber, paymentMethod: "COD" } });
        setOrderCompleted({
          orderNumber: savedOrder.orderNumber,
          total: grandTotal,
          guestPhone: activeAddr.phone,
          isGuest: !customer,
          paymentMethod: "Cash on Delivery (COD)",
        });
        clearCart();
        setIsProcessing(false);
        return;
      } catch (err) {
        console.error(err);
        alert("Failed to record COD order. Please try again or WhatsApp our Kumbakonam desk at +91 70106 02115.");
        setIsProcessing(false);
        return;
      }
    }

    // 2. PRE-PAID RAZORPAY ORDER PATH
    try {
      const items = cart.map((c) => ({ productId: c.productId, name: c.name, qty: c.qty, price: c.price }));
      const rzpOrder = await createRazorpayOrder(`cart_${Date.now()}`, items, {
        address: activeAddr,
        customerName: activeAddr.name,
        customerPhone: activeAddr.phone,
        customerEmail: activeAddr.email || newEmail || "",
        isGuest: !customer,
      });

      if (isMock) {
        setShowMockPaymentModal(true);
        setIsProcessing(false);
      } else {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
          const options = {
            key: rzpOrder.keyId,
            amount: grandTotal * 100,
            currency: "INR",
            name: "Blovit - Amudhasurabiy Organics",
            description: "Natural Malt Health Drinks Order",
            order_id: rzpOrder.razorpayOrderId,
            handler: async (response: { razorpay_payment_id: string; razorpay_signature: string }) => {
              try {
                const verify = await verifyRazorpayPayment(
                  rzpOrder.orderId,
                  response.razorpay_payment_id,
                  response.razorpay_signature
                );
                if (verify.success) {
                  trackCustomerEvent("payment_success", { metadata: { amount: grandTotal } });
                  trackCustomerEvent("checkout_completed", { metadata: { orderNumber: verify.orderNumber, paymentMethod: "Razorpay" } });
                  setOrderCompleted({
                    orderNumber: verify.orderNumber,
                    total: grandTotal,
                    isGuest: !customer,
                    guestPhone: activeAddr.phone,
                    paymentMethod: "Prepaid via Razorpay",
                  });
                  clearCart();
                } else {
                  alert("Payment verification failed. If your account was debited, please contact our Kumbakonam support team on WhatsApp.");
                }
              } catch (err) {
                console.error(err);
                alert("Payment verification encountered an issue. Please contact support.");
              } finally {
                setIsProcessing(false);
              }
            },
            modal: {
              ondismiss: () => {
                setIsProcessing(false);
              },
            },
            prefill: {
              name: activeAddr.name,
              contact: activeAddr.phone,
              email: activeAddr.email || "",
            },
            theme: { color: "#2E5A44" },
          };
          const rzp = new (window as unknown as { Razorpay: new (opts: unknown) => { open: () => void } }).Razorpay(options);
          rzp.open();
        };
        script.onerror = () => {
          alert("Failed to load Razorpay payment gateway. Please check your internet connection or choose Cash on Delivery (COD).");
          setIsProcessing(false);
        };
        document.body.appendChild(script);
      }
    } catch (err) {
      console.error(err);
      alert("Error initiating payment. Please try again or select Cash on Delivery (COD).");
      setIsProcessing(false);
    }
  };

  const handleVerifyMockPayment = async (success: boolean) => {
    setShowMockPaymentModal(false);
    setIsProcessing(true);

    if (success) {
      try {
        const items = cart.map((c) => ({
          productId: c.productId,
          name: c.name,
          price: c.price,
          quantity: c.qty,
        }));
        const savedOrder = await placeMockOrder(items, grandTotal, shippingCharge, discount);
        trackCustomerEvent("payment_success", { metadata: { orderNumber: savedOrder.orderNumber } });
        setOrderCompleted({
          orderNumber: savedOrder.orderNumber,
          total: grandTotal,
          isGuest: false,
        });
        clearCart();
      } catch (err) {
        console.error(err);
      } finally {
        setIsProcessing(false);
      }
    } else {
      alert("Simulated Payment Declined.");
      setIsProcessing(false);
    }
  };

  const handleConvertGuestAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderCompleted) return;
    if (convertPassword.length < 8) {
      setConvertError("Password must be at least 8 characters long.");
      return;
    }

    setIsConverting(true);
    setConvertError("");

    try {
      const res = await convertGuestToAccount({
        guestOrderNumber: orderCompleted.orderNumber,
        guestPhone: orderCompleted.guestPhone || newPhone,
        password: convertPassword,
      });

      setCustomer(res.customer, res.token);
      setConvertSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setConvertError(err.message);
      } else {
        setConvertError("Failed to create account.");
      }
    } finally {
      setIsConverting(false);
    }
  };

  if (!isHydrated) return null;

  if (orderCompleted) {
    return (
      <>
        <Header />
        <main className="flex-grow bg-cream py-16 text-center">
          <div className="mx-auto max-w-lg px-6 py-10 bg-white rounded-3xl border border-walnut-brown/5 shadow-xl flex flex-col items-center">
            <div className="h-16 w-16 bg-moss-green/10 text-moss-green rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-walnut-brown mb-2">Order Confirmed!</h1>
            <p className="font-body text-xs text-walnut-brown/70 mb-4">
              Thank you for your order! Your organic malts are being packed with care in Kumbakonam.
            </p>

            <div className="bg-cream-dark p-5 rounded-2xl w-full mb-6 font-body text-xs text-left flex flex-col gap-2.5 border border-walnut-brown/10 shadow-xs">
              <div className="flex justify-between items-center pb-2 border-b border-walnut-brown/10">
                <span className="text-walnut-brown/70">Order Number:</span>
                <span className="font-heading font-bold text-walnut-brown text-sm">{orderCompleted.orderNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-walnut-brown/70">Payment Mode:</span>
                <span className="font-heading font-semibold text-moss-green bg-moss-green/10 px-2.5 py-0.5 rounded-full text-[11px]">
                  {orderCompleted.paymentMethod || "Pre-paid"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-walnut-brown/70">Total Amount:</span>
                <span className="font-heading font-bold text-walnut-brown text-base">₹{orderCompleted.total}</span>
              </div>
              <div className="pt-2 border-t border-walnut-brown/10 flex items-center justify-between text-[11px] text-walnut-brown/80">
                <span>Dispatch: Kumbakonam facility</span>
                <a
                  href={`https://wa.me/917010602115?text=Hello%20Amudhasurabiy%20Organics,%20I%20have%20placed%20order%20${orderCompleted.orderNumber}%20and%20would%20like%20to%20confirm%20tracking.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading font-bold text-moss-green hover:underline flex items-center gap-1"
                >
                  WhatsApp Order Help →
                </a>
              </div>
            </div>

            {/* Step-by-Step Order Tracking Timeline */}
            <div className="w-full bg-cream-dark/50 p-5 rounded-2xl border border-walnut-brown/10 mb-6 text-left">
              <span className="font-heading text-xs font-bold uppercase tracking-wider text-walnut-brown block mb-4">
                Order Tracking Status
              </span>

              <div className="relative pl-6 space-y-4 border-l-2 border-moss-green ml-2">
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-moss-green flex items-center justify-center text-white text-[10px] font-bold">
                    ✓
                  </span>
                  <p className="font-heading text-xs font-bold text-walnut-brown">Order Confirmed</p>
                  <p className="font-body text-[11px] text-walnut-brown/60">Payment verified & order recorded</p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-moss-green/40 flex items-center justify-center text-white text-[10px]">
                    ●
                  </span>
                  <p className="font-heading text-xs font-semibold text-walnut-brown">Small-Batch Packaging</p>
                  <p className="font-body text-[11px] text-walnut-brown/60">Preparing fresh malt packs in Kumbakonam facility</p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-walnut-brown/20 flex items-center justify-center text-white text-[10px]">
                    ○
                  </span>
                  <p className="font-heading text-xs font-semibold text-walnut-brown/50">Dispatched via Express Courier</p>
                  <p className="font-body text-[11px] text-walnut-brown/40">Tracking details will be shared on SMS/WhatsApp</p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-walnut-brown/20 flex items-center justify-center text-white text-[10px]">
                    ○
                  </span>
                  <p className="font-heading text-xs font-semibold text-walnut-brown/50">Delivered</p>
                  <p className="font-body text-[11px] text-walnut-brown/40">Estimated within 2-4 business days</p>
                </div>
              </div>
            </div>

            {/* Post-Checkout Guest Conversion Card */}
            {orderCompleted.isGuest && !customer && (
              <div className="w-full bg-cream p-6 rounded-2xl border border-moss-green/30 text-left mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <UserPlus className="h-5 w-5 text-moss-green" />
                  <h3 className="font-heading text-sm font-bold text-walnut-brown">Create Account to Save Order</h3>
                </div>
                <p className="font-body text-xs text-walnut-brown/70 mb-4">
                  Set a password now to create your account. Order <strong>#{orderCompleted.orderNumber}</strong> will automatically be saved to your dashboard!
                </p>

                {convertSuccess ? (
                  <div className="p-4 bg-moss-green/15 text-moss-green font-body text-xs rounded-xl font-semibold text-center">
                    ✓ Account Created & Order Linked! Redirecting to dashboard...
                  </div>
                ) : (
                  <form onSubmit={handleConvertGuestAccount} className="space-y-3">
                    {convertError && (
                      <p className="text-red-500 text-xs font-body">{convertError}</p>
                    )}
                    <FormField id="convertPassword" label="Create Password" required>
                      <PasswordInput
                        id="convertPassword"
                        value={convertPassword}
                        onChange={setConvertPassword}
                        placeholder="Min. 8 characters"
                      />
                      <PasswordStrengthBar password={convertPassword} />
                    </FormField>
                    <button
                      type="submit"
                      disabled={isConverting}
                      className="w-full bg-moss-green hover:bg-walnut-brown text-white py-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-colors shadow-md disabled:opacity-60"
                    >
                      {isConverting ? "Creating Account..." : "Save Account & View Dashboard"}
                    </button>
                  </form>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              <Link
                href={`/account/orders/${orderCompleted.orderNumber}/`}
                className="w-full bg-moss-green hover:bg-walnut-brown text-white py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-md text-center"
              >
                Track Live Timeline
              </Link>
              <Link
                href={`/order-confirmation/?orderNumber=${orderCompleted.orderNumber}&total=${orderCompleted.total}&paymentMethod=${encodeURIComponent(orderCompleted.paymentMethod || "Pre-paid")}`}
                className="w-full bg-cream-dark hover:bg-walnut-brown hover:text-white text-walnut-brown py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-xs text-center border border-walnut-brown/15"
              >
                View Confirmation Page
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <JsonLd
        type="breadcrumb"
        data={{
          items: [
            { name: "Home", url: "/" },
            { name: "Cart", url: "/cart/" },
            { name: "Checkout", url: "/checkout/" },
          ],
        }}
      />
      <Header />

      <main className="flex-grow bg-cream py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/cart/" className="flex items-center gap-1 font-heading text-xs font-bold text-walnut-brown/60 hover:text-moss-green uppercase tracking-wider">
              <ChevronLeft className="h-4 w-4" /> Back to Cart
            </Link>
          </div>

          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-body flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold uppercase tracking-wider bg-amber-200/80 px-2.5 py-0.5 rounded-full text-[10px]">
                Review-Ready Prototype
              </span>
              <span>
                <strong>Simulated demo checkout</strong> — no real order is placed or charged. Free delivery above ₹499.
              </span>
            </div>
            <span className="font-heading text-[10px] text-amber-700 hidden sm:inline">
              AO Core ERP Mock Layer
            </span>
          </div>

          <div className="flex items-center justify-between mb-8">
            <h1 className="font-heading text-3xl font-bold text-walnut-brown">Checkout</h1>
            {!customer && (
              <span className="font-heading text-xs font-bold text-moss-green bg-moss-green/10 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                Guest Mode
              </span>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-walnut-brown/5 shadow-sm max-w-md mx-auto">
              <p className="font-body text-xs text-walnut-brown/60 mb-6">Your cart is empty.</p>
              <Link href="/shop/" className="bg-moss-green text-white px-6 py-2.5 rounded-full font-heading text-xs uppercase tracking-wider">
                Go to Shop
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Delivery Address Section */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="bg-white border border-walnut-brown/5 rounded-3xl p-6 shadow-sm">
                  <h3 className="font-heading text-base font-bold text-walnut-brown mb-4 flex items-center gap-2">
                    <MapPin className="h-4.5 w-4.5 text-moss-green" /> Delivery Address
                  </h3>

                  {customer && addresses.length > 0 && (
                    <div className="flex flex-col gap-3 mb-4">
                      {addresses.map((addr) => (
                        <label
                          key={addr.id}
                          className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                            selectedAddressId === addr.id
                              ? "border-moss-green bg-moss-green/5"
                              : "border-walnut-brown/10 hover:border-walnut-brown/20 bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name="address"
                            checked={selectedAddressId === addr.id}
                            onChange={() => handleSelectAddress(addr.id)}
                            className="mt-1 text-moss-green focus:ring-moss-green"
                          />
                          <div className="font-body text-xs text-walnut-brown/85">
                            <p className="font-bold text-walnut-brown">{addr.name}</p>
                            <p>{addr.line1}, {addr.line2}</p>
                            <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                            <p className="text-[11px] text-walnut-brown/60 mt-1">Phone: {addr.phone}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}

                  {(!customer || showAddressForm) && (
                    <form onSubmit={handleAddNewAddress} className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-body text-xs text-walnut-brown mt-2">
                      <div className="sm:col-span-2">
                        <label className="block font-bold uppercase tracking-wider text-walnut-brown/60 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder="As on delivery address"
                          className="w-full bg-cream border border-walnut-brown/15 rounded-full px-4 py-2.5 focus:outline-none focus:border-moss-green font-heading"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block font-bold uppercase tracking-wider text-walnut-brown/60 mb-1">Address Line 1 *</label>
                        <input
                          type="text"
                          required
                          value={newLine1}
                          onChange={(e) => setNewLine1(e.target.value)}
                          placeholder="House/Flat No., Building Name, Street"
                          className="w-full bg-cream border border-walnut-brown/15 rounded-full px-4 py-2.5 focus:outline-none focus:border-moss-green font-heading"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block font-bold uppercase tracking-wider text-walnut-brown/60 mb-1">Address Line 2 (Optional)</label>
                        <input
                          type="text"
                          value={newLine2}
                          onChange={(e) => setNewLine2(e.target.value)}
                          placeholder="Landmark, Area"
                          className="w-full bg-cream border border-walnut-brown/15 rounded-full px-4 py-2.5 focus:outline-none focus:border-moss-green font-heading"
                        />
                      </div>
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-walnut-brown/60 mb-1">City *</label>
                        <input
                          type="text"
                          required
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          placeholder="Kumbakonam"
                          className="w-full bg-cream border border-walnut-brown/15 rounded-full px-4 py-2.5 focus:outline-none focus:border-moss-green font-heading"
                        />
                      </div>
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-walnut-brown/60 mb-1">State *</label>
                        <input
                          type="text"
                          required
                          value={newState}
                          onChange={(e) => setNewState(e.target.value)}
                          className="w-full bg-cream border border-walnut-brown/15 rounded-full px-4 py-2.5 focus:outline-none focus:border-moss-green font-heading"
                        />
                      </div>
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-walnut-brown/60 mb-1">Pincode *</label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={newPincode}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setNewPincode(val);
                            if (val.length === 6) calculateShipping(val);
                          }}
                          placeholder="6-digit PIN code"
                          className="w-full bg-cream border border-walnut-brown/15 rounded-full px-4 py-2.5 focus:outline-none focus:border-moss-green font-heading"
                        />
                      </div>
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-walnut-brown/60 mb-1">Mobile Phone *</label>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value.replace(/\D/g, ""))}
                          placeholder="10-digit number"
                          className="w-full bg-cream border border-walnut-brown/15 rounded-full px-4 py-2.5 focus:outline-none focus:border-moss-green font-heading"
                        />
                      </div>
                      {!customer && (
                        <div className="sm:col-span-2">
                          <label className="block font-bold uppercase tracking-wider text-walnut-brown/60 mb-1">Email Address (Optional)</label>
                          <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder="For order tracking updates"
                            className="w-full bg-cream border border-walnut-brown/15 rounded-full px-4 py-2.5 focus:outline-none focus:border-moss-green font-heading"
                          />
                        </div>
                      )}
                    </form>
                  )}
                </div>
              </div>

              {/* Summary Sidebar */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="bg-white border border-walnut-brown/5 rounded-3xl p-6 shadow-sm">
                  <h3 className="font-heading text-base font-bold text-walnut-brown mb-4">Payment Summary</h3>
                  <div className="flex flex-col gap-3 font-body text-xs border-b border-walnut-brown/5 pb-4">
                    <div className="flex justify-between text-walnut-brown/70">
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

                    <div className="flex justify-between text-walnut-brown/70">
                      <span>Shipping Fee</span>
                      <span className="font-semibold text-walnut-brown">{shippingCharge === 0 ? "FREE" : `₹${shippingCharge}`}</span>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="mb-6 space-y-3">
                    <span className="font-heading text-xs font-bold text-walnut-brown uppercase tracking-wider block">
                      Select Payment Method:
                    </span>
                    
                    <label
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === "razorpay"
                          ? "border-moss-green bg-moss-green/5"
                          : "border-walnut-brown/10 hover:border-walnut-brown/20 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_choice"
                        checked={paymentMethod === "razorpay"}
                        onChange={() => setPaymentMethod("razorpay")}
                        className="mt-0.5 text-moss-green focus:ring-moss-green"
                      />
                      <div className="font-body text-xs">
                        <p className="font-heading font-bold text-walnut-brown flex items-center gap-1.5">
                          <span>Online Payment (UPI / Cards / NetBanking)</span>
                        </p>
                        <p className="text-[11px] text-walnut-brown/70 mt-0.5">
                          Secured by Razorpay • Instant confirmation
                        </p>
                      </div>
                    </label>

                    <label
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === "cod"
                          ? "border-moss-green bg-moss-green/5"
                          : "border-walnut-brown/10 hover:border-walnut-brown/20 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_choice"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="mt-0.5 text-moss-green focus:ring-moss-green"
                      />
                      <div className="font-body text-xs">
                        <p className="font-heading font-bold text-walnut-brown">
                          Cash on Delivery (COD)
                        </p>
                        <p className="text-[11px] text-walnut-brown/70 mt-0.5">
                          Pay in cash when package arrives at your address
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="flex justify-between items-center py-4 border-t border-walnut-brown/10 mb-4">
                    <span className="font-heading text-base font-bold text-walnut-brown">Total to Pay</span>
                    <span className="font-heading text-2xl font-bold text-moss-green">₹{grandTotal}</span>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-2 bg-moss-green hover:bg-walnut-brown text-white py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md disabled:opacity-50 group"
                  >
                    <CreditCard className="h-4.5 w-4.5" />
                    {isProcessing
                      ? "Processing Order..."
                      : paymentMethod === "cod"
                      ? `Confirm COD Order (₹${grandTotal})`
                      : `Pay ₹${grandTotal} via Razorpay`}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Razorpay Mock Simulator */}
      {showMockPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 border border-walnut-brown/10 shadow-2xl flex flex-col">
            <div className="text-center mb-6">
              <span className="bg-moss-green/10 text-moss-green text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 inline-block">
                Razorpay Simulator
              </span>
              <h3 className="font-heading text-lg font-bold text-walnut-brown">Confirm Payment</h3>
              <p className="font-body text-xs text-walnut-brown/60 mt-1">
                Amount to pay: <strong>₹{grandTotal}</strong>
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleVerifyMockPayment(true)}
                className="w-full bg-moss-green hover:bg-walnut-brown text-white py-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all"
              >
                Complete Payment
              </button>
              <button
                onClick={() => handleVerifyMockPayment(false)}
                className="w-full bg-cream-dark hover:bg-red-500 hover:text-white text-walnut-brown py-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all"
              >
                Cancel Transaction
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

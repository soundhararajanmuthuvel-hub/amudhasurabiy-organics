"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CreditCard, Truck, ShieldCheck, MapPin, Plus, CheckCircle, ChevronLeft, Lock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { useCartStore } from "@/store/useCartStore";
import { getAddresses, createAddress } from "@/lib/api/addresses";
import { createRazorpayOrder, verifyRazorpayPayment } from "@/lib/api/razorpay";
import { placeMockOrder } from "@/lib/api/orders";
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
}

export default function Checkout() {
  const router = useRouter();
  const { cart, coupon, shippingCharge, calculateShipping, clearCart, hydrate, isHydrated } = useCartStore();

  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);

  // New Address Form State
  const [newName, setNewName] = useState("");
  const [newLine1, setNewLine1] = useState("");
  const [newLine2, setNewLine2] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newPincode, setNewPincode] = useState("");
  const [newPhone, setNewPhone] = useState("");

  // Payment State
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMockPaymentModal, setShowMockPaymentModal] = useState(false);
  const [mockOrderId, setMockOrderId] = useState("");
  const [orderCompleted, setOrderCompleted] = useState<any>(null);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Load Saved Addresses
  useEffect(() => {
    if (isHydrated) {
      getAddresses().then((data) => {
        setAddresses(data);
        if (data.length > 0) {
          setSelectedAddressId(data[0].id);
          calculateShipping(data[0].pincode);
        } else {
          setShowAddressForm(true);
        }
      });
    }
  }, [isHydrated, calculateShipping]);

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

      setNewName("");
      setNewLine1("");
      setNewLine2("");
      setNewCity("");
      setNewState("");
      setNewPincode("");
      setNewPhone("");
    } catch (e) {
      console.error(e);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = coupon ? coupon.discount : 0;
  const grandTotal = Math.max(0, subtotal - discount + shippingCharge);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      alert("Please select or add a delivery address.");
      return;
    }
    
    setIsProcessing(true);
    const isMock = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

    try {
      const rzpOrder = await createRazorpayOrder(`cart_${Date.now()}`);

      if (isMock) {
        setMockOrderId(rzpOrder.id);
        setShowMockPaymentModal(true);
        setIsProcessing(false);
      } else {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
          const selectedAddr = addresses.find((a) => a.id === selectedAddressId);
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
            amount: grandTotal * 100,
            currency: "INR",
            name: "Blovit - Amudhasurabiy Organics",
            description: "Malt Health Drinks Order",
            order_id: rzpOrder.id,
            handler: async (response: any) => {
              try {
                const verify = await verifyRazorpayPayment(
                  rzpOrder.id,
                  response.razorpay_payment_id,
                  response.razorpay_signature
                );
                if (verify.success) {
                  trackCustomerEvent("payment_success", { metadata: { amount: grandTotal } });
                  setOrderCompleted({
                    orderNumber: verify.orderNumber,
                    total: grandTotal
                  });
                  clearCart();
                } else {
                  trackCustomerEvent("payment_failed");
                  alert("Payment verification failed.");
                }
              } catch (err) {
                console.error(err);
              }
            },
            prefill: {
              name: selectedAddr?.name || "",
              contact: selectedAddr?.phone || "",
            },
            theme: { color: "#2E5A44" },
          };
          const rzp = new (window as any).Razorpay(options);
          rzp.open();
          setIsProcessing(false);
        };
        document.body.appendChild(script);
      }
    } catch (err) {
      console.error(err);
      alert("Error initiating payment.");
      setIsProcessing(false);
    }
  };

  const handleVerifyMockPayment = async (success: boolean) => {
    setShowMockPaymentModal(false);
    setIsProcessing(true);

    if (success) {
      try {
        const items = cart.map(c => ({
          productId: c.productId,
          name: c.name,
          price: c.price,
          quantity: c.qty
        }));
        const savedOrder = await placeMockOrder(items, grandTotal, shippingCharge, discount);
        trackCustomerEvent("payment_success", { metadata: { orderNumber: savedOrder.orderNumber } });
        setOrderCompleted({
          orderNumber: savedOrder.orderNumber,
          total: grandTotal
        });
        clearCart();
      } catch (err) {
        console.error(err);
      } finally {
        setIsProcessing(false);
      }
    } else {
      trackCustomerEvent("payment_failed");
      alert("Simulated Payment Declined.");
      setIsProcessing(false);
    }
  };

  if (!isHydrated) return null;

  if (orderCompleted) {
    return (
      <>
        <Header />
        <main className="flex-grow bg-cream py-24 text-center">
          <div className="mx-auto max-w-md px-6 py-12 bg-white rounded-3xl border border-walnut-brown/5 shadow-xl flex flex-col items-center">
            <div className="h-16 w-16 bg-moss-green/10 text-moss-green rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-walnut-brown mb-2">Order Confirmed!</h1>
            <p className="font-body text-xs text-walnut-brown/70 mb-4">
              Thank you for your order! Your payment was processed securely.
            </p>
            <div className="bg-cream-dark p-4 rounded-2xl w-full mb-8 font-body text-xs text-left flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-walnut-brown/60">Order Number:</span>
                <span className="font-bold text-walnut-brown">{orderCompleted.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-walnut-brown/60">Total Paid:</span>
                <span className="font-bold text-moss-green">₹{orderCompleted.total}</span>
              </div>
            </div>
            <Link
              href="/my-account/"
              className="w-full bg-moss-green hover:bg-walnut-brown text-white py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              Go to Account Dashboard
            </Link>
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
          <div className="flex items-center gap-2 mb-8">
            <Link href="/cart/" className="flex items-center gap-1 font-heading text-xs font-bold text-walnut-brown/60 hover:text-moss-green uppercase tracking-wider">
              <ChevronLeft className="h-4 w-4" /> Back to Cart
            </Link>
          </div>

          <h1 className="font-heading text-3xl font-bold text-walnut-brown mb-10">Checkout</h1>

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
                  
                  {addresses.length > 0 && (
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

                  {!showAddressForm && (
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="flex items-center gap-2 font-heading text-xs font-bold text-moss-green hover:text-walnut-brown uppercase tracking-wider mt-2"
                    >
                      <Plus className="h-4 w-4" /> Add New Address
                    </button>
                  )}
                </div>

                {showAddressForm && (
                  <div className="bg-white border border-walnut-brown/5 rounded-3xl p-6 shadow-sm">
                    <h3 className="font-heading text-base font-bold text-walnut-brown mb-4">Add Delivery Address</h3>
                    <form onSubmit={handleAddNewAddress} className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-body text-xs text-walnut-brown">
                      <div className="sm:col-span-2">
                        <label className="block font-bold uppercase tracking-wider text-walnut-brown/60 mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="w-full bg-cream border border-walnut-brown/15 rounded-full px-4 py-2.5 focus:outline-none focus:border-moss-green"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block font-bold uppercase tracking-wider text-walnut-brown/60 mb-1">Address Line 1</label>
                        <input
                          type="text"
                          required
                          value={newLine1}
                          onChange={(e) => setNewLine1(e.target.value)}
                          className="w-full bg-cream border border-walnut-brown/15 rounded-full px-4 py-2.5 focus:outline-none focus:border-moss-green"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block font-bold uppercase tracking-wider text-walnut-brown/60 mb-1">Address Line 2 (Optional)</label>
                        <input
                          type="text"
                          value={newLine2}
                          onChange={(e) => setNewLine2(e.target.value)}
                          className="w-full bg-cream border border-walnut-brown/15 rounded-full px-4 py-2.5 focus:outline-none focus:border-moss-green"
                        />
                      </div>
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-walnut-brown/60 mb-1">City</label>
                        <input
                          type="text"
                          required
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          className="w-full bg-cream border border-walnut-brown/15 rounded-full px-4 py-2.5 focus:outline-none focus:border-moss-green"
                        />
                      </div>
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-walnut-brown/60 mb-1">State</label>
                        <input
                          type="text"
                          required
                          value={newState}
                          onChange={(e) => setNewState(e.target.value)}
                          className="w-full bg-cream border border-walnut-brown/15 rounded-full px-4 py-2.5 focus:outline-none focus:border-moss-green"
                        />
                      </div>
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-walnut-brown/60 mb-1">Pincode</label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={newPincode}
                          onChange={(e) => setNewPincode(e.target.value.replace(/\D/g, ""))}
                          className="w-full bg-cream border border-walnut-brown/15 rounded-full px-4 py-2.5 focus:outline-none focus:border-moss-green"
                        />
                      </div>
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-walnut-brown/60 mb-1">Contact Phone</label>
                        <input
                          type="tel"
                          required
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value.replace(/\D/g, ""))}
                          className="w-full bg-cream border border-walnut-brown/15 rounded-full px-4 py-2.5 focus:outline-none focus:border-moss-green"
                        />
                      </div>
                      <div className="sm:col-span-2 flex gap-3 mt-4">
                        <button
                          type="submit"
                          className="bg-moss-green hover:bg-walnut-brown text-white font-heading text-xs font-bold px-6 py-3 rounded-full uppercase tracking-wider transition-colors"
                        >
                          Save Address
                        </button>
                        {addresses.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setShowAddressForm(false)}
                            className="bg-cream-dark hover:bg-walnut-brown hover:text-white text-walnut-brown font-heading text-xs font-bold px-6 py-3 rounded-full uppercase tracking-wider transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                )}
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
                        <span>Discount</span>
                        <span className="font-semibold">-₹{discount}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-walnut-brown/70">
                      <span>Shipping Fee</span>
                      <span className="font-semibold text-walnut-brown">{shippingCharge === 0 ? "FREE" : `₹${shippingCharge}`}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-6">
                    <span className="font-heading text-base font-bold text-walnut-brown">Total to Pay</span>
                    <span className="font-heading text-2xl font-bold text-moss-green">₹{grandTotal}</span>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-2 bg-moss-green hover:bg-walnut-brown text-white py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md disabled:opacity-50 group"
                  >
                    <CreditCard className="h-4.5 w-4.5" />
                    {isProcessing ? "Processing..." : `Pay ₹${grandTotal} via Razorpay`}
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

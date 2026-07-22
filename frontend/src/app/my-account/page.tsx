"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  User, LogOut, Award, ShoppingBag, MapPin, Heart, ArrowRight, 
  Smartphone, KeyRound, Clock, Tag, FileText, Bell, LifeBuoy, RefreshCw, Sparkles 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { useCartStore } from "@/store/useCartStore";
import { requestOtp, verifyOtp } from "@/lib/api/auth";
import { getOrders } from "@/lib/api/orders";
import { getAddresses } from "@/lib/api/addresses";
import { getProducts } from "@/lib/api/products";
import { Product, MOCK_COUPONS } from "@/lib/api/mockData";
import { trackCustomerEvent } from "@/lib/api/events";

export default function MyAccount() {
  const { user, token, setUser, logout, wishlist, addToCart, toggleWishlist, hydrate, isHydrated } = useCartStore();

  const [phone, setPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [orders, setOrders] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (isHydrated && token) {
      getOrders().then(setOrders).catch(console.error);
      getAddresses().then(setAddresses).catch(console.error);
      getProducts().then(setAllProducts).catch(console.error);
    }
  }, [isHydrated, token]);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setAuthError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setIsRequesting(true);
    setAuthError("");

    try {
      const res = await requestOtp(phone);
      if (res.success) setIsOtpSent(true);
    } catch (err: any) {
      setAuthError(err.message || "Failed to request OTP.");
    } finally {
      setIsRequesting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 6) {
      setAuthError("Please enter 6-digit OTP code.");
      return;
    }
    setIsRequesting(true);
    setAuthError("");

    try {
      const res = await verifyOtp(phone, otpCode);
      setUser(res.user, res.token);
      trackCustomerEvent("login", { metadata: { phone } });
    } catch (err: any) {
      setAuthError("Invalid OTP code. Please try 123456.");
    } finally {
      setIsRequesting(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const ltv = orders.reduce((sum, order) => sum + order.total, 0);
  const wishlistedProducts = allProducts.filter((p) => wishlist.includes(p.id));

  if (!isHydrated) return null;

  return (
    <>
      <JsonLd
        type="breadcrumb"
        data={{
          items: [
            { name: "Home", url: "/" },
            { name: "My Account", url: "/my-account/" },
          ],
        }}
      />
      <Header />

      <main className="flex-grow bg-cream py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {!user ? (
            <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-walnut-brown/5 shadow-xl">
              <div className="text-center mb-8">
                <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-2">
                  Customer Portal
                </span>
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-walnut-brown">
                  Access Your Account
                </h1>
                <p className="font-body text-xs text-walnut-brown/60 mt-1">
                  Secure OTP Verification
                </p>
              </div>

              {authError && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-body border border-red-100">
                  {authError}
                </div>
              )}

              {!isOtpSent ? (
                <form onSubmit={handleRequestOtp} className="flex flex-col gap-4 font-body text-xs text-walnut-brown">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-walnut-brown/60 mb-2">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-walnut-brown/40" />
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        maxLength={10}
                        className="w-full pl-11 pr-4 py-3 bg-cream border border-walnut-brown/15 rounded-full focus:outline-none focus:border-moss-green font-heading"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isRequesting}
                    className="w-full flex items-center justify-center gap-2 bg-moss-green hover:bg-walnut-brown text-white py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                  >
                    Request OTP Code
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4 font-body text-xs text-walnut-brown">
                  <div>
                    <p className="text-xs text-walnut-brown/60 mb-4 pl-1 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> OTP code sent to <strong>{phone}</strong>.
                    </p>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-walnut-brown/60 mb-2">
                      Verification Code (OTP)
                    </label>
                    <div className="relative">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-walnut-brown/40" />
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="Enter code (123456)"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                        className="w-full pl-11 pr-4 py-3 bg-cream border border-walnut-brown/15 rounded-full focus:outline-none focus:border-moss-green tracking-widest text-center font-bold font-heading"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isRequesting}
                    className="w-full flex items-center justify-center gap-2 bg-moss-green hover:bg-walnut-brown text-white py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                  >
                    Verify & Log In
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Sidebar Nav */}
              <div className="lg:col-span-3 bg-white border border-walnut-brown/5 rounded-3xl p-6 shadow-sm flex flex-col gap-2">
                <div className="flex items-center gap-3 border-b border-walnut-brown/5 pb-6 mb-4">
                  <div className="h-10 w-10 bg-moss-green/10 text-moss-green rounded-full flex items-center justify-center font-heading font-bold">
                    {user.name ? user.name[0] : "C"}
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-walnut-brown">{user.name || "Valued Customer"}</h3>
                    <p className="font-body text-[11px] text-walnut-brown/50">{user.phone}</p>
                  </div>
                </div>

                {[
                  { id: "dashboard", label: "Dashboard", icon: User },
                  { id: "orders", label: "Order History", icon: ShoppingBag },
                  { id: "invoices", label: "Invoices", icon: FileText },
                  { id: "wishlist", label: "Wishlist", icon: Heart },
                  { id: "addresses", label: "Addresses", icon: MapPin },
                  { id: "coupons", label: "Coupons & Offers", icon: Tag },
                  { id: "rewards", label: "Reward Points", icon: Award },
                  { id: "support", label: "Support Tickets", icon: LifeBuoy },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-full font-heading text-xs font-semibold transition-all ${
                      activeTab === tab.id
                        ? "bg-moss-green text-white shadow-sm"
                        : "text-walnut-brown/80 hover:bg-cream-dark hover:text-moss-green"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}

                <button
                  onClick={() => {
                    trackCustomerEvent("logout");
                    logout();
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-full font-heading text-xs font-semibold text-red-500 hover:bg-red-50 transition-all mt-4 border-t border-walnut-brown/5 pt-6"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>

              {/* Viewport Content */}
              <div className="lg:col-span-9 bg-white border border-walnut-brown/5 rounded-3xl p-6 md:p-8 shadow-sm min-h-[450px]">
                
                {/* 1. Dashboard Overview */}
                {activeTab === "dashboard" && (
                  <div className="flex flex-col gap-8">
                    <div>
                      <h2 className="font-heading text-2xl font-bold text-walnut-brown mb-2">Welcome Back!</h2>
                      <p className="font-body text-xs text-walnut-brown/60">
                        View orders, rewards balance, and vouchers below.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="bg-cream-dark p-6 rounded-3xl border border-walnut-brown/5 flex flex-col justify-between">
                        <ShoppingBag className="h-8 w-8 text-moss-green mb-4" />
                        <div>
                          <span className="font-body text-[10px] uppercase font-bold text-walnut-brown/60 block mb-1">Total Orders</span>
                          <span className="font-heading text-3xl font-bold text-walnut-brown">{orders.length}</span>
                        </div>
                      </div>
                      <div className="bg-cream-dark p-6 rounded-3xl border border-walnut-brown/5 flex flex-col justify-between">
                        <Award className="h-8 w-8 text-moss-green mb-4" />
                        <div>
                          <span className="font-body text-[10px] uppercase font-bold text-walnut-brown/60 block mb-1">Reward Points</span>
                          <span className="font-heading text-3xl font-bold text-walnut-brown">{user.rewardPoints}</span>
                        </div>
                      </div>
                      <div className="bg-cream-dark p-6 rounded-3xl border border-walnut-brown/5 flex flex-col justify-between">
                        <span className="font-heading font-extrabold text-xl text-moss-green mb-4">LTV</span>
                        <div>
                          <span className="font-body text-[10px] uppercase font-bold text-walnut-brown/60 block mb-1">Lifetime Value</span>
                          <span className="font-heading text-3xl font-bold text-walnut-brown">₹{ltv}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Orders History */}
                {activeTab === "orders" && (
                  <div>
                    <h2 className="font-heading text-xl font-bold text-walnut-brown mb-6">Order History</h2>
                    {orders.length > 0 ? (
                      <div className="flex flex-col gap-6">
                        {orders.map((order) => (
                          <div key={order.id} className="border border-walnut-brown/10 rounded-3xl overflow-hidden bg-cream">
                            <div className="bg-cream-dark px-6 py-4 border-b border-walnut-brown/5 flex justify-between items-center text-xs font-body">
                              <div>
                                <p className="font-bold text-walnut-brown">Order #{order.orderNumber}</p>
                                <span className="text-walnut-brown/50">{new Date(order.createdAt).toLocaleDateString()}</span>
                              </div>
                              <span className="px-3 py-1 bg-moss-green/15 text-moss-green font-bold rounded-full uppercase text-[10px]">
                                {order.status}
                              </span>
                            </div>
                            <div className="p-6 flex flex-col gap-3">
                              {order.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex justify-between items-center text-xs font-body">
                                  <span className="font-semibold text-walnut-brown">{item.name} (x{item.quantity})</span>
                                  <span className="font-bold text-walnut-brown">₹{item.price * item.quantity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="font-body text-xs text-walnut-brown/50 italic">No orders found.</p>
                    )}
                  </div>
                )}

                {/* 3. Invoices */}
                {activeTab === "invoices" && (
                  <div>
                    <h2 className="font-heading text-xl font-bold text-walnut-brown mb-6">Tax Invoices</h2>
                    {orders.length > 0 ? (
                      <div className="flex flex-col gap-4">
                        {orders.map((order) => (
                          <div key={order.id} className="p-4 border border-walnut-brown/10 rounded-2xl flex justify-between items-center text-xs font-body">
                            <div>
                              <p className="font-bold text-walnut-brown">Invoice for #{order.orderNumber}</p>
                              <span className="text-walnut-brown/50">{new Date(order.createdAt).toLocaleDateString()} • Amount: ₹{order.total}</span>
                            </div>
                            <button onClick={() => alert(`Downloading GST Invoice PDF for order ${order.orderNumber}...`)} className="bg-moss-green text-white px-4 py-2 rounded-full font-heading text-[10px] font-bold uppercase">
                              Download PDF
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="font-body text-xs text-walnut-brown/50 italic">No invoices generated yet.</p>
                    )}
                  </div>
                )}

                {/* 4. Wishlist */}
                {activeTab === "wishlist" && (
                  <div>
                    <h2 className="font-heading text-xl font-bold text-walnut-brown mb-6">Wishlist Items</h2>
                    {wishlistedProducts.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {wishlistedProducts.map((p) => (
                          <div key={p.id} className="border border-walnut-brown/10 rounded-3xl p-4 flex flex-col h-full bg-cream">
                            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white mb-4">
                              <img src={p.imageUrl} alt={p.name} className="object-cover h-full w-full" />
                            </div>
                            <h3 className="font-heading text-sm font-bold text-walnut-brown line-clamp-1 mb-1">{p.name}</h3>
                            <span className="font-heading text-xs font-semibold text-moss-green mb-4">₹{p.price}</span>
                            <button onClick={() => addToCart(p, 1)} className="bg-moss-green text-white py-2.5 rounded-full font-heading text-[10px] font-bold uppercase">
                              Add to Basket
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="font-body text-xs text-walnut-brown/50 italic">Your wishlist is empty.</p>
                    )}
                  </div>
                )}

                {/* 5. Addresses */}
                {activeTab === "addresses" && (
                  <div>
                    <h2 className="font-heading text-xl font-bold text-walnut-brown mb-6">Delivery Addresses</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {addresses.map((addr) => (
                        <div key={addr.id} className="border border-walnut-brown/15 rounded-3xl p-5 bg-cream font-body text-xs text-walnut-brown">
                          <p className="font-bold text-walnut-brown mb-2">{addr.name}</p>
                          <p>{addr.line1}, {addr.line2}</p>
                          <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                          <p className="text-walnut-brown/50 mt-2">Phone: {addr.phone}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. Coupons */}
                {activeTab === "coupons" && (
                  <div>
                    <h2 className="font-heading text-xl font-bold text-walnut-brown mb-6">Available Coupons</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {MOCK_COUPONS.map((c) => (
                        <div key={c.code} className="p-4 border border-walnut-brown/10 rounded-2xl bg-cream flex justify-between items-center text-xs font-body">
                          <div>
                            <span className="font-heading font-bold text-moss-green block">{c.code}</span>
                            <span className="text-walnut-brown/60 text-[11px]">{c.message}</span>
                          </div>
                          <button onClick={() => handleCopyCode(c.code)} className="bg-walnut-brown text-white text-[10px] font-heading font-bold uppercase px-3 py-1.5 rounded-full">
                            {copiedCode === c.code ? "Copied!" : "Copy"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. Support Tickets */}
                {activeTab === "support" && (
                  <div>
                    <h2 className="font-heading text-xl font-bold text-walnut-brown mb-4">Customer Support</h2>
                    <p className="font-body text-xs text-walnut-brown/70 mb-6">Have an issue with your order? Connect directly with our Kumbakonam team.</p>
                    <a href="https://wa.me/917010602115" target="_blank" rel="noreferrer" className="inline-block bg-moss-green text-white px-6 py-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider">
                      Chat via WhatsApp Support
                    </a>
                  </div>
                )}

              </div>
            </div>
          )}

        </div>
      </main>

      <WhatsAppButton />
      <Footer />
    </>
  );
}

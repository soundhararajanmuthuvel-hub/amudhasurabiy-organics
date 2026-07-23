"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Wallet,
  Gift,
  Tag,
  Bell,
  Star,
  ShieldCheck,
  LogOut,
  Share2,
  Copy,
  CheckCircle2,
  Clock,
  Laptop,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import FormField from "@/components/auth/FormField";
import PasswordInput from "@/components/auth/PasswordInput";
import PasswordStrengthBar from "@/components/auth/PasswordStrengthBar";
import { useCartStore } from "@/store/useCartStore";
import { getOrders } from "@/lib/api/orders";
import { getAddresses } from "@/lib/api/addresses";
import { getProducts } from "@/lib/api/products";
import { getMyReferrals, getReferralMetrics, getWhatsAppShareUrl, getReferralShareUrl } from "@/lib/api/referrals";
import { getRewardWallet } from "@/lib/api/wallet";
import { changePassword } from "@/lib/api/auth";
import { Product, Order, Address, MOCK_COUPONS } from "@/lib/api/mockData";
import { ReferralRecord, ReferralMetrics, RewardWallet as WalletType } from "@/lib/types/customer";
import { mockGetSecuritySettings } from "@/lib/auth/mockAuthStore";

export default function MyAccount() {
  const router = useRouter();
  const { customer, logout, wishlist, addToCart, hydrate, isHydrated } = useCartStore();

  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [referrals, setReferrals] = useState<ReferralRecord[]>([]);
  const [metrics, setMetrics] = useState<ReferralMetrics>({
    invitedCount: 12,
    pendingCount: 3,
    approvedCount: 8,
    totalEarned: 800,
    availableBalance: 500,
    withdrawnBalance: 300,
  });
  const [wallet, setWallet] = useState<WalletType>({ balance: 500, transactions: [] });
  const [securitySettings, setSecuritySettings] = useState<ReturnType<typeof mockGetSecuritySettings> | null>(null);

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  // Change Password Form State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changePasswordMsg, setChangePasswordMsg] = useState("");
  const [changePasswordErr, setChangePasswordErr] = useState("");
  const [isChangingPass, setIsChangingPass] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (isHydrated && !customer) {
      router.replace("/login/?redirect=/my-account/");
    }
  }, [isHydrated, customer, router]);

  useEffect(() => {
    if (isHydrated && customer) {
      getOrders().then(setOrders).catch(console.error);
      getAddresses().then(setAddresses).catch(console.error);
      getProducts().then(setAllProducts).catch(console.error);
      getMyReferrals().then(setReferrals).catch(console.error);
      getReferralMetrics().then(setMetrics).catch(console.error);
      getRewardWallet().then(setWallet).catch(console.error);
      Promise.resolve().then(() => setSecuritySettings(mockGetSecuritySettings()));
    }
  }, [isHydrated, customer]);

  const handleCopyShareLink = () => {
    if (!customer) return;
    const url = getReferralShareUrl(customer.referralCode || "AMU-DINE01");
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) return;

    setIsChangingPass(true);
    setChangePasswordMsg("");
    setChangePasswordErr("");

    try {
      await changePassword(oldPassword, newPassword);
      setChangePasswordMsg("Password updated successfully.");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      if (err instanceof Error) {
        setChangePasswordErr(err.message);
      } else {
        setChangePasswordErr("Failed to update password.");
      }
    } finally {
      setIsChangingPass(false);
    }
  };

  const ltv = orders.reduce((sum, order) => sum + order.total, 0);
  const wishlistedProducts = allProducts.filter((p) => wishlist.includes(p.id));

  if (!isHydrated || !customer) return null;

  const referralCode = customer.referralCode || "AMU-DINE01";
  const whatsappUrl = getWhatsAppShareUrl(referralCode);

  const getStatusBadge = (status: ReferralRecord["status"]) => {
    switch (status) {
      case "APPROVED":
        return <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase">Approved — ₹100 Credit</span>;
      case "REWARDED":
        return <span className="px-3 py-1 rounded-full bg-moss-green text-white font-bold text-[10px] uppercase">Reward Paid</span>;
      case "PENDING":
        return <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px] uppercase">Pending Review</span>;
      case "FIRST_ORDER_PENDING":
        return <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px] uppercase">First Order Pending</span>;
      case "UNDER_REVIEW":
        return <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px] uppercase">Under ERP Review</span>;
      case "REJECTED":
      default:
        return <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-bold text-[10px] uppercase">Not Approved</span>;
    }
  };

  const navTabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "orders", label: "My Orders", icon: ShoppingBag },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Saved Addresses", icon: MapPin },
    { id: "wallet", label: "Reward Wallet", icon: Wallet },
    { id: "referrals", label: "Referral Program", icon: Gift },
    { id: "coupons", label: "Coupons & Offers", icon: Tag },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "reviews", label: "My Reviews", icon: Star },
    { id: "profile", label: "Profile & Security", icon: ShieldCheck },
  ];

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

      <main className="flex-grow bg-cream py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Sidebar Navigation */}
            <div className="lg:col-span-3 bg-white border border-walnut-brown/5 rounded-3xl p-5 shadow-sm flex flex-col gap-1.5 sticky top-24">
              <div className="flex items-center gap-3 border-b border-walnut-brown/5 pb-5 mb-3 px-2">
                <div className="h-11 w-11 bg-moss-green/15 text-moss-green rounded-full flex items-center justify-center font-heading font-bold text-base shadow-inner">
                  {customer.fullName ? customer.fullName[0].toUpperCase() : "C"}
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-heading text-sm font-bold text-walnut-brown truncate">{customer.fullName}</h3>
                  <p className="font-body text-[11px] text-walnut-brown/60 truncate">{customer.mobileNumber}</p>
                </div>
              </div>

              {navTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-full font-heading text-xs font-semibold transition-all ${
                    activeTab === tab.id
                      ? "bg-moss-green text-white shadow-sm"
                      : "text-walnut-brown/75 hover:bg-cream-dark hover:text-moss-green"
                  }`}
                >
                  <tab.icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              ))}

              <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-3 rounded-full font-heading text-xs font-semibold text-red-500 hover:bg-red-50 transition-all mt-4 border-t border-walnut-brown/5 pt-4"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9 bg-white border border-walnut-brown/5 rounded-3xl p-6 md:p-8 shadow-sm min-h-[550px]">
              
              {/* 1. OVERVIEW TAB */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <div>
                    <span className="font-heading text-[10px] font-bold text-moss-green uppercase tracking-widest block mb-1">
                      Customer Portal
                    </span>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-walnut-brown">
                      Welcome back, {customer.fullName}!
                    </h2>
                    <p className="font-body text-xs text-walnut-brown/60 mt-1">
                      Customer Code: <strong className="text-walnut-brown">{customer.customerCode}</strong>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-cream p-5 rounded-2xl border border-walnut-brown/10 flex flex-col justify-between">
                      <ShoppingBag className="h-6 w-6 text-moss-green mb-3" />
                      <div>
                        <span className="font-body text-[10px] font-bold text-walnut-brown/60 uppercase block">Orders</span>
                        <span className="font-heading text-2xl font-bold text-walnut-brown">{orders.length}</span>
                      </div>
                    </div>

                    <div className="bg-cream p-5 rounded-2xl border border-walnut-brown/10 flex flex-col justify-between">
                      <Wallet className="h-6 w-6 text-moss-green mb-3" />
                      <div>
                        <span className="font-body text-[10px] font-bold text-walnut-brown/60 uppercase block">Wallet Balance</span>
                        <span className="font-heading text-2xl font-bold text-moss-green">₹{wallet.balance}</span>
                      </div>
                    </div>

                    <div className="bg-cream p-5 rounded-2xl border border-walnut-brown/10 flex flex-col justify-between">
                      <Sparkles className="h-6 w-6 text-moss-green mb-3" />
                      <div>
                        <span className="font-body text-[10px] font-bold text-walnut-brown/60 uppercase block">Reward Points</span>
                        <span className="font-heading text-2xl font-bold text-walnut-brown">{customer.rewardPoints}</span>
                      </div>
                    </div>

                    <div className="bg-cream p-5 rounded-2xl border border-walnut-brown/10 flex flex-col justify-between">
                      <span className="font-heading font-extrabold text-sm text-moss-green mb-3">LTV</span>
                      <div>
                        <span className="font-body text-[10px] font-bold text-walnut-brown/60 uppercase block">Lifetime Value</span>
                        <span className="font-heading text-2xl font-bold text-walnut-brown">₹{ltv}</span>
                      </div>
                    </div>
                  </div>

                  {/* Referral Quick Share Card */}
                  <div className="bg-moss-green/10 border border-moss-green/20 rounded-3xl p-6 relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <span className="bg-moss-green text-white font-heading text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 inline-block">
                          Referral Rewards
                        </span>
                        <h3 className="font-heading text-lg font-bold text-walnut-brown">Share Pure Nutrition, Earn ₹100</h3>
                        <p className="font-body text-xs text-walnut-brown/75 mt-1 max-w-lg">
                          Your friends get ₹100 off their first order of Blovit organic malts, and you get ₹100 credited directly to your Reward Wallet once approved by our team.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab("referrals")}
                        className="bg-moss-green hover:bg-walnut-brown text-white font-heading text-xs font-bold px-6 py-3 rounded-full uppercase tracking-wider transition-colors shrink-0 shadow-sm"
                      >
                        View Referral Dashboard
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. ORDERS TAB */}
              {activeTab === "orders" && (
                <div className="space-y-6">
                  <h2 className="font-heading text-xl font-bold text-walnut-brown">Order History</h2>
                  {orders.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border border-walnut-brown/10 rounded-2xl overflow-hidden bg-cream">
                          <div className="bg-cream-dark px-6 py-3 border-b border-walnut-brown/5 flex justify-between items-center text-xs font-body">
                            <div>
                              <p className="font-bold text-walnut-brown">Order #{order.orderNumber}</p>
                              <span className="text-walnut-brown/60 text-[11px]">{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                            <span className="px-3 py-1 bg-moss-green/15 text-moss-green font-bold rounded-full uppercase text-[10px]">
                              {order.status}
                            </span>
                          </div>
                          <div className="p-5 flex flex-col gap-2.5">
                            {order.items.map((item, idx: number) => (
                              <div key={idx} className="flex justify-between items-center text-xs font-body">
                                <span className="font-semibold text-walnut-brown">{item.name} (x{item.quantity})</span>
                                <span className="font-bold text-walnut-brown">₹{item.price * item.quantity}</span>
                              </div>
                            ))}
                            <div className="border-t border-walnut-brown/10 pt-3 flex justify-between font-heading text-xs font-bold text-walnut-brown">
                              <span>Total Paid:</span>
                              <span className="text-moss-green">₹{order.total}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="font-body text-xs text-walnut-brown/50 italic">No orders found.</p>
                  )}
                </div>
              )}

              {/* 3. WISHLIST TAB */}
              {activeTab === "wishlist" && (
                <div className="space-y-6">
                  <h2 className="font-heading text-xl font-bold text-walnut-brown">Saved Wishlist Items</h2>
                  {wishlistedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {wishlistedProducts.map((p) => (
                        <div key={p.id} className="border border-walnut-brown/10 rounded-2xl p-4 flex flex-col h-full bg-cream">
                          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white mb-3 flex items-center justify-center">
                            <Image src={p.imageUrl} alt={p.name} width={150} height={150} className="object-contain max-h-full" />
                          </div>
                          <h3 className="font-heading text-sm font-bold text-walnut-brown line-clamp-1 mb-1">{p.name}</h3>
                          <span className="font-heading text-xs font-semibold text-moss-green mb-4">₹{p.price}</span>
                          <button
                            onClick={() => addToCart(p, 1)}
                            className="bg-moss-green text-white py-2.5 rounded-full font-heading text-[10px] font-bold uppercase transition-colors hover:bg-walnut-brown"
                          >
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

              {/* 4. SAVED ADDRESSES TAB */}
              {activeTab === "addresses" && (
                <div className="space-y-6">
                  <h2 className="font-heading text-xl font-bold text-walnut-brown">Delivery Addresses</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div key={addr.id} className="border border-walnut-brown/15 rounded-2xl p-5 bg-cream font-body text-xs text-walnut-brown">
                        <p className="font-bold text-walnut-brown mb-1.5">{addr.name}</p>
                        <p>{addr.line1}, {addr.line2}</p>
                        <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                        <p className="text-walnut-brown/60 mt-2">Phone: {addr.phone}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. REWARD WALLET TAB */}
              {activeTab === "wallet" && (
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-cream p-6 rounded-3xl border border-walnut-brown/10">
                    <div>
                      <span className="font-heading text-[10px] font-bold text-moss-green uppercase tracking-widest block mb-1">
                        Reward Wallet Ledger
                      </span>
                      <h2 className="font-heading text-3xl font-bold text-walnut-brown">₹{wallet.balance}</h2>
                      <p className="font-body text-xs text-walnut-brown/60 mt-1">
                        Available balance for checkout discounts
                      </p>
                    </div>
                    <Link
                      href="/shop/"
                      className="bg-moss-green hover:bg-walnut-brown text-white font-heading text-xs font-bold px-6 py-3 rounded-full uppercase tracking-wider transition-colors shadow-sm"
                    >
                      Shop & Apply Wallet
                    </Link>
                  </div>

                  <div>
                    <h3 className="font-heading text-base font-bold text-walnut-brown mb-4">Transaction History</h3>
                    <div className="space-y-3">
                      {wallet.transactions.length > 0 ? (
                        wallet.transactions.map((tx) => (
                          <div
                            key={tx.id}
                            className="p-4 rounded-2xl border border-walnut-brown/10 bg-cream flex justify-between items-center font-body text-xs"
                          >
                            <div>
                              <p className="font-bold text-walnut-brown">{tx.description}</p>
                              <span className="text-[11px] text-walnut-brown/50">{new Date(tx.createdAt).toLocaleDateString()}</span>
                            </div>
                            <span
                              className={`font-heading font-bold text-sm ${
                                tx.type === "credit" ? "text-moss-green" : "text-red-500"
                              }`}
                            >
                              {tx.type === "credit" ? `+₹${tx.amount}` : `-₹${tx.amount}`}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="font-body text-xs text-walnut-brown/50 italic">No transactions recorded yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 6. REFERRAL PROGRAM TAB */}
              {activeTab === "referrals" && (
                <div className="space-y-8">
                  <div>
                    <span className="font-heading text-[10px] font-bold text-moss-green uppercase tracking-widest block mb-1">
                      Brand Ambassador Program
                    </span>
                    <h2 className="font-heading text-2xl font-bold text-walnut-brown">Referral Dashboard</h2>
                    <p className="font-body text-xs text-walnut-brown/60 mt-1">
                      Earn ₹100 reward credit whenever a friend completes their first purchase using your code.
                    </p>
                  </div>

                  {/* Referral Code Share Card */}
                  <div className="bg-moss-green/10 border border-moss-green/20 rounded-3xl p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div>
                        <span className="font-body text-[10px] font-bold text-walnut-brown/60 uppercase block mb-1">Your Referral Code</span>
                        <div className="font-heading text-2xl font-bold text-moss-green tracking-wider">{referralCode}</div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={handleCopyShareLink}
                          className="flex items-center gap-2 bg-white border border-walnut-brown/15 hover:border-moss-green text-walnut-brown px-5 py-3 rounded-full font-heading text-xs font-bold uppercase transition-all shadow-sm"
                        >
                          {copiedLink ? <CheckCircle2 className="h-4 w-4 text-moss-green" /> : <Copy className="h-4 w-4" />}
                          {copiedLink ? "Link Copied!" : "Copy Link"}
                        </button>

                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-5 py-3 rounded-full font-heading text-xs font-bold uppercase transition-all shadow-sm"
                        >
                          <Share2 className="h-4 w-4" />
                          WhatsApp Share
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Summary Metrics Banner */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <div className="bg-cream p-4 rounded-2xl border border-walnut-brown/10 text-center">
                      <span className="font-body text-[10px] font-bold text-walnut-brown/60 uppercase block">Invited</span>
                      <span className="font-heading text-xl font-bold text-walnut-brown">{metrics.invitedCount}</span>
                    </div>

                    <div className="bg-cream p-4 rounded-2xl border border-walnut-brown/10 text-center">
                      <span className="font-body text-[10px] font-bold text-amber-600 uppercase block">Pending</span>
                      <span className="font-heading text-xl font-bold text-amber-600">{metrics.pendingCount}</span>
                    </div>

                    <div className="bg-cream p-4 rounded-2xl border border-walnut-brown/10 text-center">
                      <span className="font-body text-[10px] font-bold text-moss-green uppercase block">Approved</span>
                      <span className="font-heading text-xl font-bold text-moss-green">{metrics.approvedCount}</span>
                    </div>

                    <div className="bg-cream p-4 rounded-2xl border border-walnut-brown/10 text-center">
                      <span className="font-body text-[10px] font-bold text-walnut-brown/60 uppercase block">Total Earned</span>
                      <span className="font-heading text-xl font-bold text-walnut-brown">₹{metrics.totalEarned}</span>
                    </div>

                    <div className="bg-cream p-4 rounded-2xl border border-walnut-brown/10 text-center">
                      <span className="font-body text-[10px] font-bold text-moss-green uppercase block">Available</span>
                      <span className="font-heading text-xl font-bold text-moss-green">₹{metrics.availableBalance}</span>
                    </div>

                    <div className="bg-cream p-4 rounded-2xl border border-walnut-brown/10 text-center">
                      <span className="font-body text-[10px] font-bold text-walnut-brown/60 uppercase block">Applied</span>
                      <span className="font-heading text-xl font-bold text-walnut-brown">₹{metrics.withdrawnBalance}</span>
                    </div>
                  </div>

                  {/* Explainer Notice */}
                  <div className="p-4 bg-cream-dark/60 rounded-2xl border border-walnut-brown/10 flex items-center gap-3">
                    <Clock className="h-4 w-4 text-moss-green shrink-0" />
                    <p className="font-body text-xs text-walnut-brown/80 leading-relaxed">
                      Referral rewards are reviewed and credited by our AO ERP team, usually within 2-3 days of friend&apos;s first completed order.
                    </p>
                  </div>

                  {/* Referrals Lifecycle Table */}
                  <div>
                    <h3 className="font-heading text-base font-bold text-walnut-brown mb-4">Referrals Made</h3>
                    {referrals.length > 0 ? (
                      <div className="border border-walnut-brown/10 rounded-2xl overflow-hidden bg-cream">
                        <div className="divide-y divide-walnut-brown/10 font-body text-xs">
                          {referrals.map((ref) => (
                            <div key={ref.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                              <div>
                                <p className="font-bold text-walnut-brown">{ref.referredCustomerName}</p>
                                <span className="text-[11px] text-walnut-brown/50">Mobile: {ref.referredCustomerMobile}</span>
                                {ref.couponCode && (
                                  <div className="mt-1 flex items-center gap-2">
                                    <span className="font-heading text-[11px] font-bold text-moss-green bg-moss-green/10 px-2.5 py-1 rounded-full border border-moss-green/20">
                                      Coupon: {ref.couponCode}
                                    </span>
                                    <button
                                      onClick={() => handleCopyCoupon(ref.couponCode!)}
                                      className="text-[10px] font-heading font-bold text-walnut-brown underline hover:text-moss-green"
                                    >
                                      {copiedCoupon === ref.couponCode ? "Copied!" : "Copy Code"}
                                    </button>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-[11px] text-walnut-brown/50">{new Date(ref.createdAt).toLocaleDateString()}</span>
                                {getStatusBadge(ref.status)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="font-body text-xs text-walnut-brown/50 italic">No referrals recorded yet. Share your code to get started!</p>
                    )}
                  </div>
                </div>
              )}

              {/* 7. COUPONS TAB */}
              {activeTab === "coupons" && (
                <div className="space-y-6">
                  <h2 className="font-heading text-xl font-bold text-walnut-brown">Available Coupons & Offers</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {MOCK_COUPONS.map((c) => (
                      <div key={c.code} className="p-5 border border-walnut-brown/10 rounded-2xl bg-cream flex justify-between items-center text-xs font-body">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-heading font-bold text-moss-green text-sm">{c.code}</span>
                            <span className="px-2 py-0.5 rounded-full bg-moss-green/10 text-moss-green text-[9px] font-bold uppercase">
                              {c.category}
                            </span>
                          </div>
                          <span className="text-walnut-brown/70 text-[11px] block">{c.message}</span>
                          <span className="text-[10px] text-walnut-brown/40 block mt-1">Min Order: ₹{c.minSubtotal}</span>
                        </div>
                        <button
                          onClick={() => handleCopyCoupon(c.code)}
                          className="bg-walnut-brown hover:bg-moss-green text-white text-[10px] font-heading font-bold uppercase px-4 py-2 rounded-full transition-colors shrink-0"
                        >
                          {copiedCoupon === c.code ? "Copied!" : "Copy Code"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. NOTIFICATIONS TAB */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h2 className="font-heading text-xl font-bold text-walnut-brown">Notifications</h2>
                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-cream border border-walnut-brown/10 flex items-start gap-3 font-body text-xs">
                      <Sparkles className="h-4 w-4 text-moss-green shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-walnut-brown">Welcome to Blovit Family!</p>
                        <p className="text-walnut-brown/70 text-[11px]">Your account has been set up with 50 bonus reward points.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-cream border border-walnut-brown/10 flex items-start gap-3 font-body text-xs">
                      <Gift className="h-4 w-4 text-moss-green shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-walnut-brown">Referral Credit Approved</p>
                        <p className="text-walnut-brown/70 text-[11px]">₹100 reward credit from Priya Sharma&apos;s order has been credited to your wallet.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 9. REVIEWS TAB */}
              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <h2 className="font-heading text-xl font-bold text-walnut-brown">My Product Reviews</h2>
                  <div className="p-5 border border-walnut-brown/10 rounded-2xl bg-cream font-body text-xs text-walnut-brown">
                    <div className="flex items-center gap-1 text-amber-500 mb-2">
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500" />
                    </div>
                    <p className="font-bold text-walnut-brown mb-1">Blovit ABC Malt — 5/5</p>
                    <p className="text-walnut-brown/75">&ldquo;Excellent taste and genuine organic quality from Kumbakonam. Improved energy levels within 2 weeks!&rdquo;</p>
                  </div>
                </div>
              )}

              {/* 10. PROFILE & SECURITY TAB */}
              {activeTab === "profile" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-walnut-brown">Profile & Security Settings</h2>
                    <p className="font-body text-xs text-walnut-brown/60 mt-1">Manage personal details, security settings, and active sessions.</p>
                  </div>

                  {/* Profile Details Card */}
                  <div className="bg-cream p-6 rounded-3xl border border-walnut-brown/10 space-y-4">
                    <h3 className="font-heading text-base font-bold text-walnut-brown">Personal Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-body text-xs">
                      <div>
                        <span className="text-walnut-brown/60 block text-[10px] font-bold uppercase">Full Name</span>
                        <p className="font-bold text-walnut-brown">{customer.fullName}</p>
                      </div>
                      <div>
                        <span className="text-walnut-brown/60 block text-[10px] font-bold uppercase">Mobile Phone</span>
                        <p className="font-bold text-walnut-brown">{customer.mobileNumber}</p>
                      </div>
                      <div>
                        <span className="text-walnut-brown/60 block text-[10px] font-bold uppercase">Email Address</span>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-walnut-brown">{customer.email || "Not specified"}</p>
                          {customer.email && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" /> Verified
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="text-walnut-brown/60 block text-[10px] font-bold uppercase">Location</span>
                        <p className="font-bold text-walnut-brown">{customer.city}, {customer.state}</p>
                      </div>
                    </div>
                  </div>

                  {/* Change Password Card */}
                  <div className="bg-cream p-6 rounded-3xl border border-walnut-brown/10 space-y-4">
                    <h3 className="font-heading text-base font-bold text-walnut-brown">Change Password</h3>
                    {changePasswordMsg && <p className="text-moss-green text-xs font-body">{changePasswordMsg}</p>}
                    {changePasswordErr && <p className="text-red-500 text-xs font-body">{changePasswordErr}</p>}

                    <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                      <FormField id="oldPassword" label="Current Password" required>
                        <PasswordInput id="oldPassword" value={oldPassword} onChange={setOldPassword} placeholder="Enter current password" />
                      </FormField>

                      <FormField id="newPassword" label="New Password" required>
                        <PasswordInput id="newPassword" value={newPassword} onChange={setNewPassword} placeholder="Min. 8 characters" />
                        <PasswordStrengthBar password={newPassword} />
                      </FormField>

                      <button
                        type="submit"
                        disabled={isChangingPass}
                        className="bg-moss-green hover:bg-walnut-brown text-white font-heading text-xs font-bold px-6 py-3 rounded-full uppercase tracking-wider transition-colors"
                      >
                        {isChangingPass ? "Updating..." : "Update Password"}
                      </button>
                    </form>
                  </div>

                  {/* Active Devices & Security History */}
                  {securitySettings && (
                    <div className="bg-cream p-6 rounded-3xl border border-walnut-brown/10 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-heading text-base font-bold text-walnut-brown">Active Devices ({securitySettings.activeSessions})</h3>
                        <button
                          onClick={() => alert("Logged out of other devices successfully.")}
                          className="text-moss-green font-heading text-[10px] font-bold uppercase hover:underline"
                        >
                          Logout Other Devices
                        </button>
                      </div>

                      <div className="space-y-3 font-body text-xs">
                        {securitySettings.loginHistory.map((sess) => (
                          <div key={sess.id} className="p-3.5 rounded-2xl bg-white border border-walnut-brown/10 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <Laptop className="h-5 w-5 text-moss-green" />
                              <div>
                                <p className="font-bold text-walnut-brown">{sess.device}</p>
                                <span className="text-[11px] text-walnut-brown/50">{sess.location} • IP: {sess.ipAddress}</span>
                              </div>
                            </div>
                            <span className="text-[10px] text-moss-green font-bold uppercase">{sess.timestamp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      <WhatsAppButton />
      <Footer />
    </>
  );
}

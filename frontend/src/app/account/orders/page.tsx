"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, ChevronLeft, ArrowRight, Package, Truck, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCartStore } from "@/store/useCartStore";
import { getOrders } from "@/lib/api/orders";
import { Order } from "@/lib/api/mockData";

export default function AccountOrdersPage() {
  const router = useRouter();
  const { customer, isHydrated, hydrate } = useCartStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (isHydrated && !customer) {
      router.replace("/login/?redirect=/account/orders/");
    } else if (isHydrated && customer) {
      getOrders()
        .then((res) => {
          setOrders(res);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [isHydrated, customer, router]);

  if (!isHydrated) return null;

  return (
    <>
      <Header />
      <main className="flex-grow bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/my-account/"
            className="inline-flex items-center gap-1 font-heading text-xs font-bold text-walnut-brown/60 hover:text-moss-green uppercase tracking-wider mb-8"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Dashboard
          </Link>

          <div className="mb-8">
            <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-2">
              Purchase History
            </span>
            <h1 className="font-heading text-3xl font-bold text-walnut-brown">Your Orders</h1>
          </div>

          {loading ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-walnut-brown/10">
              <div className="inline-block w-8 h-8 border-4 border-moss-green border-t-transparent rounded-full animate-spin mb-3" />
              <p className="font-body text-xs text-walnut-brown/70">Loading order records...</p>
            </div>
          ) : orders.length > 0 ? (
            <div className="flex flex-col gap-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border border-walnut-brown/10 p-6 md:p-8 shadow-sm flex flex-col gap-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-walnut-brown/10">
                    <div>
                      <p className="font-heading text-base font-bold text-walnut-brown">
                        Order #{order.orderNumber}
                      </p>
                      <p className="font-body text-xs text-walnut-brown/60">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3.5 py-1 bg-moss-green/10 text-moss-green font-heading text-xs font-bold rounded-full uppercase">
                        {order.status}
                      </span>
                      <Link
                        href={`/account/orders/${order.orderNumber || order.id}/`}
                        className="bg-cream hover:bg-cream-dark text-walnut-brown border border-walnut-brown/20 px-4 py-2 rounded-full font-heading text-xs font-bold uppercase transition-colors"
                      >
                        Track Timeline →
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs font-body">
                        <span className="font-semibold text-walnut-brown">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-bold text-walnut-brown">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-walnut-brown/10 flex justify-between items-center font-heading text-sm font-bold text-walnut-brown">
                    <span>Total Amount:</span>
                    <span className="text-moss-green text-base">₹{order.total}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-walnut-brown/10 shadow-xs">
              <ShoppingBag className="h-12 w-12 text-walnut-brown/30 mx-auto mb-3" />
              <h3 className="font-heading text-lg font-bold text-walnut-brown mb-2">No orders placed yet</h3>
              <p className="font-body text-xs text-walnut-brown/60 mb-6">
                Start your journey to wholesome daily nutrition with Blovit natural malts.
              </p>
              <Link
                href="/shop/"
                className="inline-flex items-center gap-2 bg-moss-green hover:bg-walnut-brown text-white px-6 py-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>Shop Blovit Catalog</span>
                <ArrowRight className="h-4 w-4" />
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

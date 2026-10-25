"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, CheckCircle2, Package, Truck, Clock, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getOrders } from "@/lib/api/orders";
import { Order } from "@/lib/api/mockData";

export default function OrderTrackingTimelinePage() {
  const params = useParams();
  const orderId = (params?.id as string) || "";
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then((orders) => {
        const match = orders.find(
          (o) => o.orderNumber === orderId || o.id === orderId
        ) || orders[0] || null;
        setOrder(match);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [orderId]);

  return (
    <>
      <Header />
      <main className="flex-grow bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/account/orders/"
            className="inline-flex items-center gap-1 font-heading text-xs font-bold text-walnut-brown/60 hover:text-moss-green uppercase tracking-wider mb-8"
          >
            <ChevronLeft className="h-4 w-4" /> Back to My Orders
          </Link>

          {loading ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-walnut-brown/10">
              <div className="inline-block w-8 h-8 border-4 border-moss-green border-t-transparent rounded-full animate-spin mb-3" />
              <p className="font-body text-xs text-walnut-brown/70">Loading tracking information...</p>
            </div>
          ) : order ? (
            <div className="bg-white rounded-3xl border border-walnut-brown/10 p-6 md:p-10 shadow-sm space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-walnut-brown/10">
                <div>
                  <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-1">
                    Live Dispatch Timeline
                  </span>
                  <h1 className="font-heading text-2xl sm:text-3xl font-bold text-walnut-brown">
                    Order #{order.orderNumber}
                  </h1>
                </div>
                <div className="text-right">
                  <span className="px-3.5 py-1.5 bg-moss-green/10 text-moss-green font-heading text-xs font-bold rounded-full uppercase">
                    Status: {order.status}
                  </span>
                </div>
              </div>

              {/* Step-by-Step Tracking Timeline */}
              <div className="relative pl-8 space-y-8 border-l-2 border-moss-green ml-3">
                <div className="relative">
                  <span className="absolute -left-[41px] top-0 h-6 w-6 rounded-full bg-moss-green flex items-center justify-center text-white text-xs font-bold shadow-xs">
                    ✓
                  </span>
                  <div>
                    <p className="font-heading text-sm font-bold text-walnut-brown">Order Confirmed</p>
                    <p className="font-body text-xs text-walnut-brown/65 mt-0.5">
                      Order details received and entered into our Kumbakonam fulfillment queue.
                    </p>
                    <span className="font-body text-[11px] text-walnut-brown/45 block mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <span className={`absolute -left-[41px] top-0 h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xs ${order.status !== 'Pending' ? 'bg-moss-green' : 'bg-walnut-brown/20'}`}>
                    {order.status !== 'Pending' ? '✓' : '●'}
                  </span>
                  <div>
                    <p className="font-heading text-sm font-bold text-walnut-brown">Small-Batch Fresh Packaging</p>
                    <p className="font-body text-xs text-walnut-brown/65 mt-0.5">
                      200 g food-grade moisture barrier pack sealed in our FSSAI-licensed Kumbakonam facility.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <span className={`absolute -left-[41px] top-0 h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xs ${order.status === 'Shipped' || order.status === 'Delivered' ? 'bg-moss-green' : 'bg-walnut-brown/20'}`}>
                    {order.status === 'Shipped' || order.status === 'Delivered' ? '✓' : '○'}
                  </span>
                  <div>
                    <p className="font-heading text-sm font-bold text-walnut-brown">Dispatched via Express Courier</p>
                    <p className="font-body text-xs text-walnut-brown/65 mt-0.5">
                      Handed over to logistics partner for direct transit from Tamil Nadu to your pincode.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <span className={`absolute -left-[41px] top-0 h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xs ${order.status === 'Delivered' ? 'bg-moss-green' : 'bg-walnut-brown/20'}`}>
                    {order.status === 'Delivered' ? '✓' : '○'}
                  </span>
                  <div>
                    <p className="font-heading text-sm font-bold text-walnut-brown">Delivered</p>
                    <p className="font-body text-xs text-walnut-brown/65 mt-0.5">
                      Expected delivery within 2-4 business days.
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="bg-cream p-6 rounded-2xl border border-walnut-brown/10 space-y-4">
                <span className="font-heading text-xs font-bold uppercase tracking-wider text-walnut-brown/70 block">
                  Items in this shipment
                </span>
                <div className="divide-y divide-walnut-brown/10">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex justify-between items-center text-xs font-body">
                      <span className="font-semibold text-walnut-brown">{item.name} × {item.quantity}</span>
                      <span className="font-bold text-walnut-brown">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-walnut-brown/10 flex justify-between font-heading text-sm font-bold text-walnut-brown">
                  <span>Grand Total:</span>
                  <span className="text-moss-green text-base">₹{order.total}</span>
                </div>
              </div>

              {/* Need assistance contact */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-walnut-brown/70">
                <span>Need assistance with this order?</span>
                <a
                  href={`https://wa.me/917010602115?text=Hello%20Amudhasurabiy%20Organics,%20tracking%20inquiry%20for%20order%20${order.orderNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-moss-green hover:bg-walnut-brown text-white font-heading font-bold text-xs uppercase px-5 py-2.5 rounded-full transition-colors"
                >
                  WhatsApp Support →
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-walnut-brown/10">
              <h2 className="font-heading text-xl font-bold text-walnut-brown mb-2">Order Not Found</h2>
              <p className="font-body text-xs text-walnut-brown/60 mb-6">
                We could not locate this order in your session.
              </p>
              <Link
                href="/account/orders/"
                className="inline-block bg-moss-green text-white font-heading text-xs font-bold uppercase px-6 py-3 rounded-full"
              >
                Return to Orders
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

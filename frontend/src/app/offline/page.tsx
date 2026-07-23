import Link from "next/link";
import { WifiOff } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Offline | Blovit",
  description: "You are currently offline. Check your connection to place orders.",
};

export default function Offline() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-cream py-24 text-center">
        <div className="mx-auto max-w-md px-6 py-12 bg-white rounded-3xl border border-walnut-brown/5 shadow-xl flex flex-col items-center">
          <div className="h-16 w-16 bg-walnut-brown/10 text-walnut-brown rounded-full flex items-center justify-center mb-6 animate-pulse">
            <WifiOff className="h-10 w-10" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-walnut-brown mb-2">Connection Offline</h1>
          <p className="font-body text-sm text-walnut-brown/70 mb-6">
            You are browsing the offline shell of Blovit. Please restore your internet connection to access the checkout and complete orders.
          </p>
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-1.5 bg-moss-green hover:bg-walnut-brown text-white py-3.5 rounded-full font-heading text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md"
          >
            Go to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

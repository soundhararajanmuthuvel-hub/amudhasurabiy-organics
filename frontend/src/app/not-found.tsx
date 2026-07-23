import Link from "next/link";
import { Home, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-cream py-20 md:py-32 flex items-center justify-center">
        <div className="mx-auto max-w-md px-6 text-center bg-white rounded-3xl p-8 border border-walnut-brown/5 shadow-xl">
          <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-2">
            404 Error
          </span>
          <h1 className="font-heading text-3xl font-bold text-walnut-brown mb-2">Page Not Found</h1>
          <p className="font-body text-xs text-walnut-brown/70 mb-8 leading-relaxed">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-moss-green hover:bg-walnut-brown text-white px-6 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <Home className="h-4 w-4" /> Return Home
            </Link>
            <Link
              href="/shop/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-cream-dark hover:bg-walnut-brown hover:text-white text-walnut-brown px-6 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all"
            >
              <ShoppingBag className="h-4 w-4" /> Go to Shop
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

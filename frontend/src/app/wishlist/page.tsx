"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { useCartStore } from "@/store/useCartStore";
import { getProducts } from "@/lib/api/products";
import { Product, MOCK_PRODUCTS } from "@/lib/api/mockData";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart, hydrate, isHydrated } = useCartStore();
  const [allProducts, setAllProducts] = useState<Product[]>(MOCK_PRODUCTS);

  useEffect(() => {
    hydrate();
    getProducts().then(setAllProducts).catch(() => setAllProducts(MOCK_PRODUCTS));
  }, [hydrate]);

  const wishlistedProducts = allProducts.filter((p) => wishlist.includes(p.id));

  return (
    <>
      <JsonLd
        type="breadcrumb"
        data={{
          items: [
            { name: "Home", url: "/" },
            { name: "Wishlist", url: "/wishlist/" },
          ],
        }}
      />
      <Header />

      <main className="flex-grow bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest block mb-2 flex items-center justify-center gap-1.5">
              <Heart className="h-4 w-4 fill-moss-green text-moss-green" /> Saved Favorites
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-walnut-brown mb-3">
              Your Wishlist
            </h1>
            <p className="font-body text-xs sm:text-sm text-walnut-brown/70 leading-relaxed">
              Keep track of your favorite Blovit organic malts and add them to your cart whenever you are ready.
            </p>
          </div>

          {isHydrated && wishlistedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistedProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl p-6 border border-walnut-brown/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-cream mb-4 flex items-center justify-center p-4">
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        width={200}
                        height={200}
                        className="object-contain max-h-full"
                      />
                    </div>
                    <span className="font-body text-[10px] font-bold uppercase tracking-wider text-moss-green bg-moss-green/10 px-3 py-1 rounded-full mb-2 inline-block">
                      {p.category} • 200 g
                    </span>
                    <h3 className="font-heading text-base font-bold text-walnut-brown mb-1.5 line-clamp-1">
                      {p.name}
                    </h3>
                    <p className="font-body text-xs text-walnut-brown/70 line-clamp-2 mb-4">
                      {p.description}
                    </p>
                    <div className="flex items-center gap-2 mb-6">
                      <span className="font-heading text-lg font-bold text-moss-green">₹{p.price}</span>
                      {p.originalPrice > p.price && (
                        <s className="font-body text-xs text-walnut-brown/40">₹{p.originalPrice}</s>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-walnut-brown/10">
                    <button
                      onClick={() => addToCart(p, 1)}
                      className="flex-1 bg-moss-green hover:bg-walnut-brown text-white py-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs"
                    >
                      <ShoppingBag className="h-4 w-4" /> Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="p-3 text-walnut-brown/40 hover:text-red-500 rounded-full hover:bg-cream border border-walnut-brown/10 transition-colors"
                      title="Remove from wishlist"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto border border-walnut-brown/10 shadow-xs">
              <div className="h-16 w-16 rounded-full bg-cream mx-auto flex items-center justify-center text-walnut-brown/40 mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-xl font-bold text-walnut-brown mb-2">Your wishlist is empty</h3>
              <p className="font-body text-xs text-walnut-brown/70 mb-6">
                Explore our collection of 100% natural fruit and millet malts and save your favorites here.
              </p>
              <Link
                href="/shop/"
                className="inline-flex items-center gap-2 bg-moss-green hover:bg-walnut-brown text-white px-6 py-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>Browse Products</span>
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

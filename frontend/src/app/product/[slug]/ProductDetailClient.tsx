"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, Star, Heart, Minus, Plus, 
  ShoppingCart, UserCheck 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { useCartStore } from "@/store/useCartStore";
import { Product, MOCK_RECIPES, MOCK_PRODUCTS } from "@/lib/api/mockData";
import { trackCustomerEvent } from "@/lib/api/events";

interface ClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ClientProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<string | null>("benefits");
  const [bundleAdded, setBundleAdded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { addToCart, toggleWishlist, wishlist, hydrate } = useCartStore();

  useEffect(() => {
    hydrate();
    trackCustomerEvent("product_view", { productId: product.id, source: "product_detail" });
  }, [hydrate, product.id]);

  const galleryImages = (product.images && product.images.length > 0)
    ? product.images
    : [product.imageUrl];

  const activeImage = selectedImage || product.imageUrl || (galleryImages.length > 0 ? galleryImages[0] : "");

  const isFavorite = wishlist.includes(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
    trackCustomerEvent("add_to_cart", { productId: product.id, quantity: qty });
  };

  // Find complementary product for bundle offer
  const bundleProduct = relatedProducts[0] || MOCK_PRODUCTS.find(p => p.id !== product.id) || MOCK_PRODUCTS[0];
  const bundleTotalPrice = product.price + bundleProduct.price - 40; // ₹40 discount

  const handleAddBundle = () => {
    addToCart(product, 1);
    addToCart(bundleProduct, 1);
    setBundleAdded(true);
  };

  // Related recipes for this product
  const productRecipes = MOCK_RECIPES.filter(r => r.recommendedProductId === product.id);

  const mockReviews = [
    { name: "Suresh R.", rating: 5, date: "July 18, 2026", text: "Exceptional natural quality. Dissolves smoothly in warm milk. Knowing there are zero preservatives makes it my top choice." },
    { name: "Priya Sundar", rating: 5, date: "July 12, 2026", text: "Noticeable improvement in digestion and stamina within two weeks. Highly recommended!" }
  ];

  return (
    <>
      <JsonLd type="breadcrumb" data={{ items: [{ name: "Home", url: "/" }, { name: "Shop", url: "/shop/" }, { name: product.name, url: `/product/${product.slug}/` }] }} />
      <JsonLd type="product" data={product} />

      <Header />

      <main className="flex-grow bg-cream py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="mb-8 text-xs font-body text-walnut-brown/60 flex items-center gap-2">
            <Link href="/" className="hover:text-moss-green transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop/" className="hover:text-moss-green transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-walnut-brown font-semibold">{product.name}</span>
          </div>

          {/* Product Hero Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20 items-start">
            
            {/* Gallery with Zoom Lens */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
                className="relative aspect-square w-full rounded-3xl overflow-hidden border border-walnut-brown/5 bg-white shadow-sm cursor-zoom-in"
              >
                <Image
                  src={activeImage || product.imageUrl}
                  alt={`Blovit ${product.name} by Amudhasurabiy Organics`}
                  fill
                  priority
                  className="object-cover transition-transform duration-200"
                  style={isZoomed ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%`, transform: "scale(1.8)" } : {}}
                />
              </div>

              {galleryImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {galleryImages.map((thumb, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(thumb)}
                      className={`relative h-20 w-20 shrink-0 rounded-2xl overflow-hidden border-2 bg-white shadow-sm transition-all ${
                        activeImage === thumb ? "border-moss-green scale-105" : "border-transparent opacity-75 hover:opacity-100"
                      }`}
                    >
                      <Image src={thumb} alt={`Blovit ${product.name} image ${idx + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Meta & Controls */}
            <div className="lg:col-span-6 flex flex-col justify-start">
              
              <div className="flex justify-between items-start mb-3">
                <div>
                  {product.isBestseller && (
                    <span className="bg-moss-green text-cream text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 inline-block">
                      Best Seller
                    </span>
                  )}
                  <h1 className="font-heading text-3xl sm:text-4xl font-bold text-walnut-brown">
                    {product.name}
                  </h1>
                </div>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-3 rounded-full bg-white text-walnut-brown hover:text-red-500 shadow-sm border border-walnut-brown/5 transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </button>
              </div>

              {/* Price & Rating */}
              <div className="flex items-center gap-6 mb-4">
                <span className="font-heading text-3xl font-bold text-moss-green">
                  ₹{product.price}
                </span>
                <div className="flex items-center gap-1.5 text-amber-500 font-body text-xs">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500 stroke-none" />
                    ))}
                  </div>
                  <span className="text-walnut-brown/70 font-semibold">({product.rating || 4.9}/5.0)</span>
                </div>
              </div>

              {/* "Who Is It For?" Target Audience Matrix */}
              {product.whoIsItFor && product.whoIsItFor.length > 0 && (
                <div className="mb-6 bg-white p-4 rounded-2xl border border-walnut-brown/10">
                  <span className="font-heading text-[10px] font-bold uppercase tracking-wider text-moss-green block mb-2 flex items-center gap-1">
                    <UserCheck className="h-3.5 w-3.5" /> Target Audience Matrix
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.whoIsItFor.map((aud, idx) => (
                      <span key={idx} className="font-body text-xs font-semibold text-walnut-brown bg-cream-dark px-3 py-1 rounded-full">
                        ✓ {aud}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="font-body text-xs sm:text-sm text-walnut-brown/85 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Quantity Selector & Add Button */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center justify-between border border-walnut-brown/20 rounded-full px-4 py-2 w-full sm:w-32 bg-white">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-1 text-walnut-brown/70 hover:text-moss-green transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-heading font-semibold text-walnut-brown text-sm">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="p-1 text-walnut-brown/70 hover:text-moss-green transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-grow flex items-center justify-center gap-2 bg-moss-green hover:bg-walnut-brown text-white py-4 px-8 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-[1.01]"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
              </div>

              {/* Frequently Bought Together Bundle */}
              <div className="bg-white border border-walnut-brown/10 rounded-3xl p-5 mb-8">
                <span className="font-heading text-xs font-bold uppercase tracking-wider text-moss-green block mb-3">
                  Frequently Bought Together
                </span>
                <div className="flex items-center justify-between gap-4 font-body text-xs">
                  <div className="flex items-center gap-2">
                    <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-cream border">
                      <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                    </div>
                    <span className="font-bold text-walnut-brown">+</span>
                    <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-cream border">
                      <Image src={bundleProduct.imageUrl} alt={bundleProduct.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-walnut-brown line-clamp-1">{product.name} + {bundleProduct.name}</p>
                      <span className="text-moss-green font-bold">Bundle Price: ₹{bundleTotalPrice} <s className="text-walnut-brown/40 text-[10px]">₹{product.price + bundleProduct.price}</s></span>
                    </div>
                  </div>
                  <button
                    onClick={handleAddBundle}
                    disabled={bundleAdded}
                    className="bg-walnut-brown hover:bg-moss-green text-white px-4 py-2.5 rounded-full font-heading text-[10px] font-bold uppercase tracking-wider transition-colors shrink-0 disabled:opacity-50"
                  >
                    {bundleAdded ? "Bundle Added!" : "Add Bundle"}
                  </button>
                </div>
              </div>

              {/* About the Brand Entity Block */}
              <div className="my-6 p-4 rounded-2xl bg-cream-dark border border-walnut-brown/10 font-body text-xs text-walnut-brown/85 space-y-1">
                <span className="font-heading font-bold text-moss-green text-[11px] uppercase tracking-wider block">About the Brand</span>
                <p>
                  Amudhasurabiy Organics — sometimes searched as Amudhasurabi or Amuthasurabi — is the maker of Blovit natural malt powders.
                </p>
              </div>

              {/* Accordions */}
              <div className="border-t border-walnut-brown/10 pt-4 flex flex-col gap-2">
                
                {/* Benefits Accordion */}
                <div className="border-b border-walnut-brown/5 py-3">
                  <button
                    onClick={() => setActiveTab(activeTab === "benefits" ? null : "benefits")}
                    className="w-full flex items-center justify-between font-heading text-base font-bold text-walnut-brown hover:text-moss-green transition-colors"
                  >
                    <span>Health Benefits</span>
                    <ChevronDown className={`h-5 w-5 transition-transform ${activeTab === "benefits" ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {activeTab === "benefits" && (
                      <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="list-disc pl-5 font-body text-xs text-walnut-brown/85 space-y-2 mt-3 pb-2">
                        {Array.isArray(product.benefits) && product.benefits.length > 0 ? (
                          product.benefits.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))
                        ) : (
                          <li>100% Pure & Natural Organic Ingredients</li>
                        )}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>

                {/* Ingredients Accordion */}
                <div className="border-b border-walnut-brown/5 py-3">
                  <button
                    onClick={() => setActiveTab(activeTab === "ingredients" ? null : "ingredients")}
                    className="w-full flex items-center justify-between font-heading text-base font-bold text-walnut-brown hover:text-moss-green transition-colors"
                  >
                    <span>Ingredients & Nutrition Facts</span>
                    <ChevronDown className={`h-5 w-5 transition-transform ${activeTab === "ingredients" ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {activeTab === "ingredients" && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-3 pb-2 flex flex-col gap-4">
                        <div>
                          <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-moss-green mb-1.5">Ingredients:</h4>
                          {Array.isArray(product.ingredients) && product.ingredients.length > 0 ? (
                            <ul className="list-disc pl-5 font-body text-xs text-walnut-brown/85 space-y-1">
                              {product.ingredients.map((ing, idx) => (
                                <li key={idx}>{ing}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="font-body text-xs text-walnut-brown/85">Sprouted grains, natural nuts, and Cardamom.</p>
                          )}
                        </div>
                        {product.nutritionFacts && Object.keys(product.nutritionFacts).length > 0 && (
                          <div>
                            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-moss-green mb-1.5">Nutrition Facts (Per 100g):</h4>
                            <div className="grid grid-cols-2 gap-2 max-w-sm">
                              {Object.entries(product.nutritionFacts).map(([key, val]) => (
                                <div key={key} className="flex justify-between text-xs font-body text-walnut-brown/80 border-b border-walnut-brown/5 py-1">
                                  <span className="font-medium">{key}</span>
                                  <span>{val}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Preparation Accordion */}
                <div className="border-b border-walnut-brown/5 py-3">
                  <button
                    onClick={() => setActiveTab(activeTab === "usage" ? null : "usage")}
                    className="w-full flex items-center justify-between font-heading text-base font-bold text-walnut-brown hover:text-moss-green transition-colors"
                  >
                    <span>How to Prepare</span>
                    <ChevronDown className={`h-5 w-5 transition-transform ${activeTab === "usage" ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {activeTab === "usage" && (
                      <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="font-body text-xs text-walnut-brown/85 mt-3 pb-2 leading-relaxed">
                        {product.usageInstructions}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

              </div>

            </div>
          </div>

          {/* Deep Recipe Interlinking Section */}
          {productRecipes.length > 0 && (
            <section className="border-t border-walnut-brown/10 pt-16 mb-20">
              <h2 className="font-heading text-2xl font-bold text-walnut-brown mb-8">Recipes Made with {product.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {productRecipes.map((r) => (
                  <div key={r.id} className="bg-white border border-walnut-brown/5 rounded-3xl p-6 shadow-sm flex items-center gap-4">
                    <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-cream shrink-0">
                      <Image src={r.imageUrl} alt={r.title} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-heading text-base font-bold text-walnut-brown">{r.title}</h4>
                      <p className="font-body text-xs text-walnut-brown/70 line-clamp-2 mt-1">{r.description}</p>
                      <Link href={`/recipes/${r.slug}/`} className="font-heading text-xs font-bold text-moss-green uppercase tracking-wider hover:underline mt-2 block">
                        View Recipe ➔
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Customer Reviews */}
          <section className="border-t border-walnut-brown/10 pt-16 mb-20">
            <h2 className="font-heading text-2xl font-bold text-walnut-brown mb-8">Customer Reviews ({product.reviewCount || 100})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mockReviews.map((rev, idx) => (
                <div key={idx} className="bg-white border border-walnut-brown/5 rounded-3xl p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-heading text-sm font-bold text-walnut-brown">{rev.name}</h4>
                      <span className="font-body text-xs text-walnut-brown/50">{rev.date} • Verified Buyer</span>
                    </div>
                    <div className="flex text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-500 stroke-none" />
                      ))}
                    </div>
                  </div>
                  <p className="font-body text-xs text-walnut-brown/80 leading-relaxed italic">
                    &quot;{rev.text}&quot;
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      {/* Sticky Mobile Bottom Buy Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-walnut-brown/10 p-4 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-cream border">
            <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
          </div>
          <div>
            <h4 className="font-heading text-xs font-bold text-walnut-brown line-clamp-1">{product.name}</h4>
            <span className="font-heading text-xs font-semibold text-moss-green">₹{product.price}</span>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-moss-green hover:bg-walnut-brown text-white text-xs font-heading font-semibold uppercase tracking-wider py-3 px-5 rounded-full flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          Add to Cart
        </button>
      </div>

      <WhatsAppButton />
      <Footer />
    </>
  );
}

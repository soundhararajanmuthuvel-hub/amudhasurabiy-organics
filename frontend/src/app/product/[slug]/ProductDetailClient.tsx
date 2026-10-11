"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, Star, Heart, Minus, Plus, 
  ShoppingCart, Zap, ShieldCheck, Truck, Check 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { useCartStore } from "@/store/useCartStore";
import { Product, ProductVariant, MOCK_RECIPES, MOCK_PRODUCTS } from "@/lib/api/mockData";
import { calculateShipping, ShippingCalculation } from "@/lib/api/shipping";
import { trackCustomerEvent } from "@/lib/api/events";
import { cleanProductText } from "@/lib/utils/cleanText";

interface ClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ClientProps) {
  const router = useRouter();
  const variants: ProductVariant[] = product.variants && product.variants.length > 0
    ? product.variants
    : [
        { weight: product.weight || "200 g", price: product.price, originalPrice: product.originalPrice, sku: product.sku || `${product.id}-200g`, inStock: true },
      ];

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(variants[0]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<string | null>("benefits");
  const [bundleAdded, setBundleAdded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Pan-India Pincode Delivery Checker State
  const [pincodeInput, setPincodeInput] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<ShippingCalculation | null>(null);
  const [isCheckingPincode, setIsCheckingPincode] = useState(false);

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

  const discountPercent = selectedVariant.originalPrice > selectedVariant.price
    ? Math.round(((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100)
    : 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: selectedVariant.price,
        imageUrl: product.imageUrl,
        weight: selectedVariant.weight,
        sku: selectedVariant.sku,
      },
      qty
    );
    trackCustomerEvent("add_to_cart", { productId: product.id, quantity: qty });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  const handleBuyNow = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: selectedVariant.price,
        imageUrl: product.imageUrl,
        weight: selectedVariant.weight,
        sku: selectedVariant.sku,
      },
      qty
    );
    router.push("/checkout/");
  };

  // Pincode Verification Handler
  const handlePincodeCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincodeInput.trim().replace(/\D/g, "");
    if (cleanPin.length !== 6) {
      alert("Please enter a valid 6-digit Indian PIN code.");
      return;
    }
    setIsCheckingPincode(true);
    try {
      const res = await calculateShipping(cleanPin, selectedVariant.price * qty);
      setPincodeStatus(res);
    } catch {
      // Graceful fallback
      setPincodeStatus({
        shippingCharge: 110,
        freeShippingThreshold: 999,
        isFreeShippingEligible: false,
        message: "Delivery available across India.",
        stateName: "India",
        isServiceable: true,
        estimatedDelivery: "3 - 5 business days",
        dispatchTime: "Dispatched in 24 hours from Kumbakonam",
      });
    } finally {
      setIsCheckingPincode(false);
    }
  };

  // Find complementary product for bundle offer
  const bundleProduct = relatedProducts[0] || MOCK_PRODUCTS.find(p => p.id !== product.id) || MOCK_PRODUCTS[0];
  const bundleTotalPrice = selectedVariant.price + bundleProduct.price - 40;

  const handleAddBundle = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: selectedVariant.price,
        imageUrl: product.imageUrl,
        weight: selectedVariant.weight,
        sku: selectedVariant.sku,
      },
      1
    );
    addToCart(bundleProduct, 1);
    setBundleAdded(true);
  };

  const productRecipes = MOCK_RECIPES.filter(r => r.recommendedProductId === product.id);

  const mockReviews = [
    { name: "Suresh R.", rating: 5, date: "July 18, 2026", text: "Exceptional natural quality. Dissolves smoothly in warm milk. Knowing there are zero preservatives and sweetened with palm jaggery makes it my top choice." },
    { name: "Priya Sundar", rating: 5, date: "July 12, 2026", text: "Noticeable improvement in digestion and daily stamina within two weeks. Shipped safely from Kumbakonam to Chennai!" }
  ];

  return (
    <>
      <JsonLd type="breadcrumb" data={{ items: [{ name: "Home", url: "/" }, { name: "Shop", url: "/shop/" }, { name: product.name, url: `/product/${product.slug}/` }] }} />
      <JsonLd type="product" data={{ ...product, price: selectedVariant.price, originalPrice: selectedVariant.originalPrice, sku: selectedVariant.sku }} />

      <Header />

      <main className="flex-grow bg-cream py-8 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="mb-6 text-xs font-body text-walnut-brown/60 flex items-center gap-2">
            <Link href="/" className="hover:text-moss-green transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop/" className="hover:text-moss-green transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-walnut-brown font-semibold">{product.name}</span>
          </div>

          {/* Amazon/Flipkart Dual Column Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-start">
            
            {/* Left Column: Image Gallery with Interactive Zoom */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
                className="relative aspect-square w-full rounded-3xl overflow-hidden border border-[#5A3B28]/10 bg-[#FDFBF7] shadow-xs cursor-zoom-in"
              >
                <Image
                  src={activeImage || product.imageUrl}
                  alt={`Blovit ${product.name} genuine packaging - Amudhasurabiy Organics`}
                  fill
                  priority
                  className="object-contain p-6 transition-transform duration-200"
                  style={isZoomed ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%`, transform: "scale(1.8)" } : {}}
                />

                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-white/90 backdrop-blur-xs text-[#5A3B28] text-[10px] font-heading font-semibold px-2.5 py-1 rounded-full border border-[#5A3B28]/10 shadow-2xs">
                    Original Farm Pouch
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
                  <span className="bg-white/80 backdrop-blur-xs text-[#5A3B28]/70 text-[9px] font-body px-2 py-0.5 rounded-full border border-[#5A3B28]/10">
                    Hover to zoom
                  </span>
                </div>
              </div>

              {galleryImages.length > 0 && (
                <div className="flex gap-3 overflow-x-auto pb-1 items-center">
                  {galleryImages.map((thumb, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(thumb)}
                      className={`relative h-20 w-20 shrink-0 rounded-2xl overflow-hidden border-2 bg-white shadow-xs transition-all ${
                        activeImage === thumb ? "border-[#2E5A44] scale-105" : "border-transparent opacity-75 hover:opacity-100"
                      }`}
                      title={`View photo ${idx + 1}`}
                    >
                      <Image src={thumb} alt={`Blovit ${product.name} view ${idx + 1}`} fill className="object-contain p-1.5" />
                    </button>
                  ))}
                  {galleryImages.length === 1 && (
                    <div className="text-[11px] font-body text-[#5A3B28]/60 pl-2">
                      Front packaging pouch view • Genuine photo
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Meta, Variants, Pincode & Purchasing */}
            <div className="lg:col-span-6 flex flex-col justify-start">
              
              <div className="flex justify-between items-start mb-3">
                <div className="w-full">
                  <div className="flex items-center flex-wrap gap-2 mb-2.5">
                    {product.isBestseller && (
                      <span className="bg-moss-green text-cream text-[10px] font-heading font-bold uppercase tracking-wider px-3 py-0.5 rounded-full inline-block shadow-2xs">
                        Best Seller
                      </span>
                    )}
                    {selectedVariant.inStock !== false ? (
                      <span className="inline-flex items-center gap-1.5 bg-[#2E5A44]/10 text-[#2E5A44] text-[10px] font-heading font-semibold px-2.5 py-0.5 rounded-full border border-[#2E5A44]/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#2E5A44] animate-pulse"></span>
                        In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 text-[10px] font-heading font-semibold px-2.5 py-0.5 rounded-full border border-red-200">
                        Out of Stock
                      </span>
                    )}
                    <span className="bg-cream-dark text-walnut-brown/70 text-[10px] font-heading font-semibold px-2.5 py-0.5 rounded-full uppercase">
                      SKU: {selectedVariant.sku}
                    </span>
                  </div>

                  <h1 className="font-heading text-3xl sm:text-4xl font-bold text-walnut-brown leading-tight">
                    {product.name}
                  </h1>
                </div>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-3 rounded-full bg-white text-walnut-brown hover:text-red-500 shadow-xs border border-walnut-brown/10 transition-transform active:scale-95"
                  aria-label="Wishlist"
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </button>
              </div>

              {/* Price, MRP & Rating Block */}
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-heading text-3xl font-bold text-walnut-brown">
                  ₹{selectedVariant.price}
                </span>
                {selectedVariant.originalPrice > selectedVariant.price && (
                  <>
                    <span className="font-body text-base text-walnut-brown/40 line-through">
                      ₹{selectedVariant.originalPrice}
                    </span>
                    <span className="font-heading text-xs font-bold text-moss-green bg-moss-green/10 px-2.5 py-1 rounded-full">
                      {discountPercent}% OFF (Incl. of all taxes)
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 text-amber-500 font-body text-xs mb-6">
                <div className="flex items-center gap-0.5">
                  <Star className="h-4 w-4 fill-amber-400 stroke-none" />
                  <span className="text-walnut-brown font-heading font-bold text-xs">
                    {product.rating ? product.rating.toFixed(1) : "4.9"}
                  </span>
                </div>
                <span className="text-walnut-brown/50">({product.reviewCount || 42} ratings • 100% Genuine)</span>
              </div>

              {/* Short Tagline & Clean Description near Product Name and Price */}
              <div className="mb-6 space-y-1.5 p-4 rounded-2xl bg-[#FDFBF7] border border-[#5A3B28]/10">
                {product.tagline && (
                  <p className="font-heading text-xs sm:text-sm font-semibold text-[#2E5A44] italic">
                    &ldquo;{cleanProductText(product.tagline)}&rdquo;
                  </p>
                )}
                <p className="font-body text-xs sm:text-sm text-[#5A3B28]/85 leading-relaxed">
                  {cleanProductText(product.description)}
                </p>
              </div>

              {/* Pack Size / Weight Display */}
              <div className="mb-6 p-4 rounded-2xl bg-white border border-[#5A3B28]/10 shadow-xs">
                {variants.length > 1 ? (
                  <>
                    <span className="font-heading text-xs font-bold uppercase tracking-wider text-[#5A3B28]/70 block mb-2">
                      Select Pack Size / Weight:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {variants.map((v) => (
                        <button
                          key={v.weight}
                          onClick={() => setSelectedVariant(v)}
                          className={`px-4 py-2 rounded-xl text-xs font-heading font-semibold transition-all ${
                            selectedVariant.weight === v.weight
                              ? "bg-[#2E5A44] text-white shadow-xs scale-102"
                              : "bg-[#FDFBF7] text-[#5A3B28] hover:bg-[#E8F0E3]"
                          }`}
                        >
                          {v.weight} — ₹{v.price}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-xs font-bold uppercase tracking-wider text-[#5A3B28]/70">
                      Pack Size:
                    </span>
                    <span className="px-4 py-1.5 rounded-xl text-xs font-heading font-bold bg-[#2E5A44] text-white shadow-xs">
                      {selectedVariant.weight || "200 g"} — ₹{selectedVariant.price}
                    </span>
                  </div>
                )}
              </div>

              {/* Pan-India Pincode Delivery Checker */}
              <div className="mb-6 p-4 rounded-2xl bg-white border border-walnut-brown/10 shadow-xs">
                <div className="flex items-center gap-2 mb-2 font-heading text-xs font-bold text-walnut-brown uppercase tracking-wider">
                  <Truck className="h-4 w-4 text-moss-green" />
                  <span>Pan-India Delivery Availability</span>
                </div>
                <p className="font-body text-[11px] text-walnut-brown/60 mb-3">
                  Enter your 6-digit Indian PIN code to view delivery timeline & shipping charge.
                </p>
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ""))}
                    placeholder="e.g. 612001 or 110001"
                    className="flex-1 px-4 py-2 rounded-xl bg-cream border border-walnut-brown/15 text-xs text-walnut-brown font-heading font-medium focus:outline-none focus:border-moss-green"
                  />
                  <button
                    type="submit"
                    disabled={isCheckingPincode}
                    className="px-5 py-2 rounded-xl bg-walnut-brown hover:bg-moss-green text-white font-heading text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-60"
                  >
                    {isCheckingPincode ? "Checking..." : "Check"}
                  </button>
                </form>

                {pincodeStatus && (
                  <div className="mt-3 p-3 rounded-xl bg-moss-green/10 border border-moss-green/20 text-xs font-body text-walnut-brown">
                    <p className="font-bold text-moss-green flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-moss-green" /> Delivery Available to {pincodeStatus.stateName}
                    </p>
                    <p className="text-[11px] text-walnut-brown/80 mt-1">
                      {pincodeStatus.message}
                    </p>
                    <p className="text-[10px] text-walnut-brown/60 mt-0.5">
                      Estimated delivery: <strong>{pincodeStatus.estimatedDelivery}</strong> • {pincodeStatus.dispatchTime}
                    </p>
                  </div>
                )}
              </div>

              {/* Quantity + Dual Conversion CTAs (Add to Cart + Buy Now) */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                {/* Quantity */}
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

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm border border-moss-green ${
                    addedAnimation
                      ? "bg-moss-green text-white"
                      : "bg-white text-moss-green hover:bg-moss-green hover:text-white"
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Added to Basket!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add to Basket</span>
                    </>
                  )}
                </button>

                {/* Buy Now (Direct to Checkout) */}
                <button
                  onClick={handleBuyNow}
                  className="flex-1 flex items-center justify-center gap-2 bg-moss-green hover:bg-walnut-brown text-white py-3.5 px-6 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-[1.01]"
                >
                  <Zap className="h-4 w-4 fill-current" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Frequently Bought Together Bundle */}
              <div className="bg-white border border-walnut-brown/10 rounded-3xl p-5 mb-8">
                <span className="font-heading text-xs font-bold uppercase tracking-wider text-moss-green block mb-3">
                  Frequently Bought Together
                </span>
                <div className="flex items-center justify-between gap-4 font-body text-xs">
                  <div className="flex items-center gap-2">
                    <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-cream border flex items-center justify-center">
                      <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-1" />
                    </div>
                    <span className="font-bold text-walnut-brown">+</span>
                    <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-cream border flex items-center justify-center">
                      <Image src={bundleProduct.imageUrl} alt={bundleProduct.name} fill className="object-contain p-1" />
                    </div>
                    <div>
                      <p className="font-semibold text-walnut-brown line-clamp-1">{product.name} + {bundleProduct.name}</p>
                      <span className="text-moss-green font-bold">Bundle Price: ₹{bundleTotalPrice} <s className="text-walnut-brown/40 text-[10px]">₹{selectedVariant.price + bundleProduct.price}</s></span>
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

              {/* FSSAI Verified Brand Trust Box */}
              <div className="my-4 p-4 rounded-2xl bg-cream-dark/60 border border-walnut-brown/10 font-body text-xs text-walnut-brown/85 space-y-1">
                <span className="font-heading font-bold text-moss-green text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-moss-green" /> FSSAI Licensed Facility • Kumbakonam
                </span>
                <p className="text-[11px] text-walnut-brown/70">
                  FSSAI Lic. No: <strong>22421543000120</strong> | GSTIN: <strong>33AAFFA9012K1Z9</strong>. 100% natural organic ingredients with zero chemicals or artificial thickeners.
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
                    <span>How to Prepare & Storage</span>
                    <ChevronDown className={`h-5 w-5 transition-transform ${activeTab === "usage" ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {activeTab === "usage" && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="font-body text-xs text-walnut-brown/85 mt-3 pb-2 space-y-2">
                        <p>{product.usageInstructions}</p>
                        <p className="text-walnut-brown/70 italic">Store in an airtight container in a cool, dry place after opening.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

            </div>
          </div>

          {/* Deep Recipe Interlinking Section */}
          {productRecipes.length > 0 && (
            <section className="border-t border-walnut-brown/10 pt-12 mb-16">
              <h2 className="font-heading text-2xl font-bold text-walnut-brown mb-6">Recipes Made with {product.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {productRecipes.map((r) => (
                  <div key={r.id} className="bg-white border border-walnut-brown/10 rounded-3xl p-6 shadow-xs flex items-center gap-4">
                    <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-cream shrink-0">
                      <Image src={r.imageUrl} alt={r.title} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-heading text-base font-bold text-walnut-brown">{r.title}</h4>
                      <p className="font-body text-xs text-walnut-brown/70 line-clamp-2 mt-1">{r.description}</p>
                      <Link href={`/recipes/${r.slug}/`} className="font-heading text-xs font-bold text-moss-green uppercase tracking-wider hover:underline mt-2 block">
                        View Recipe →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Customer Reviews Section */}
          <section className="border-t border-walnut-brown/10 pt-12 mb-16">
            <h2 className="font-heading text-2xl font-bold text-walnut-brown mb-6">Customer Reviews ({product.reviewCount || 100})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockReviews.map((rev, idx) => (
                <div key={idx} className="bg-white border border-walnut-brown/10 rounded-3xl p-6 shadow-xs">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="font-heading text-sm font-bold text-walnut-brown">{rev.name}</h4>
                      <span className="font-body text-[11px] text-walnut-brown/50">{rev.date} • Verified Buyer</span>
                    </div>
                    <div className="flex text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
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

      {/* Sticky Mobile Bottom Buy Dock */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-walnut-brown/10 p-3 shadow-lg flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-cream border border-walnut-brown/10 shrink-0">
            <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-1" />
          </div>
          <div className="min-w-0">
            <p className="font-heading text-xs font-bold text-walnut-brown truncate">{product.name}</p>
            <p className="font-heading text-xs font-bold text-moss-green">₹{selectedVariant.price} ({selectedVariant.weight})</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleAddToCart}
            className="py-2.5 px-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider bg-white border border-moss-green text-moss-green hover:bg-moss-green hover:text-white transition-all shadow-xs"
          >
            Add
          </button>
          <button
            onClick={handleBuyNow}
            className="py-2.5 px-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider bg-moss-green hover:bg-walnut-brown text-white transition-all shadow-xs flex items-center gap-1"
          >
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>

      <WhatsAppButton />
      <Footer />
    </>
  );
}

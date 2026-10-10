"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart, Zap, Star, Check } from "lucide-react";
import { Product, ProductVariant } from "@/lib/api/mockData";
import { useCartStore } from "@/store/useCartStore";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  onBuyNow?: (product: Product) => void;
}

export default function ProductCard({
  product,
  priority = false,
  onBuyNow,
}: ProductCardProps) {
  const router = useRouter();
  const { addToCart, toggleWishlist, wishlist } = useCartStore();

  const variants = product.variants && product.variants.length > 0
    ? product.variants
    : [
        { weight: product.weight || "200g", price: product.price, originalPrice: product.originalPrice, sku: product.sku || `${product.id}-200g`, inStock: product.inStock !== false },
        { weight: "500g", price: Math.round(product.price * 2.3), originalPrice: Math.round(product.originalPrice * 2.3), sku: `${product.id}-500g`, inStock: true },
        { weight: "1kg", price: Math.round(product.price * 4.4), originalPrice: Math.round(product.originalPrice * 4.5), sku: `${product.id}-1kg`, inStock: true },
      ];

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(variants[0]);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFavorite = wishlist.includes(product.id);
  const discountPercent = selectedVariant.originalPrice > selectedVariant.price
    ? Math.round(((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    if (onBuyNow) {
      onBuyNow(product);
    } else {
      router.push("/checkout/");
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-3xl bg-white border border-[#5A3B28]/12 p-4 sm:p-5 shadow-xs hover:shadow-xl transition-all duration-300 h-full">
      <div className="flex flex-col">
        {/* 1. PRODUCT IMAGE AREA */}
        <div className="relative h-52 sm:h-56 w-full rounded-2xl bg-[#FDFBF7] border border-[#5A3B28]/8 mb-3.5 overflow-hidden flex items-center justify-center p-3">
          <Link
            href={`/product/${product.slug}/`}
            className="relative h-full w-full flex items-center justify-center"
            title={`View ${product.name}`}
          >
            <Image
              src={product.imageUrl}
              alt={`Blovit ${product.name} packaging - Amudhasurabiy Organics`}
              width={240}
              height={240}
              priority={priority}
              className="h-44 sm:h-48 w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Quick Wishlist Toggle */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/95 text-[#5A3B28] hover:text-red-500 shadow-xs border border-[#5A3B28]/10 transition-transform hover:scale-110 active:scale-95 z-10"
            aria-label="Add to Wishlist"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isFavorite ? "fill-red-500 text-red-500" : "text-[#5A3B28]/70"
              }`}
            />
          </button>
        </div>

        {/* 2. BADGES ROW (Neatly separated from image and product title) */}
        <div className="flex items-center flex-wrap gap-2 mb-2">
          {product.isBestseller && (
            <span className="inline-flex items-center bg-[#2E5A44] text-white text-[10px] font-heading font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
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

          <span className="text-[10px] font-body text-[#5A3B28]/60 ml-auto hidden xs:inline-block">
            Cauvery Delta
          </span>
        </div>

        {/* 3. PRODUCT TITLE */}
        <h3 className="font-heading text-base sm:text-lg font-bold text-[#5A3B28] leading-snug mb-1 group-hover:text-[#2E5A44] transition-colors line-clamp-1">
          <Link href={`/product/${product.slug}/`}>{product.name}</Link>
        </h3>

        {/* 4. RATING & REVIEWS */}
        <div className="flex items-center gap-1.5 text-xs mb-2">
          <div className="flex items-center gap-0.5 text-amber-500">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-heading font-bold text-[#5A3B28] text-xs">
              {product.rating ? product.rating.toFixed(1) : "4.9"}
            </span>
          </div>
          <span className="text-[#5A3B28]/50 font-body text-[11px]">
            ({product.reviewCount || 148} reviews)
          </span>
        </div>

        {/* Short Product Description */}
        <p className="font-body text-xs text-[#5A3B28]/70 leading-relaxed mb-3 line-clamp-2 min-h-[2rem]">
          {product.description}
        </p>

        {/* 5. PACK-SIZE SELECTORS */}
        <div className="mb-3">
          <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#5A3B28]/60 block mb-1.5">
            Select Pack Size:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {variants.map((v) => (
              <button
                key={v.weight}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedVariant(v);
                }}
                className={`px-3 py-1 rounded-full text-xs font-heading font-semibold transition-all ${
                  selectedVariant.weight === v.weight
                    ? "bg-[#2E5A44] text-white shadow-xs scale-102"
                    : "bg-[#FDFBF7] text-[#5A3B28]/80 hover:bg-[#F4EFEA] border border-[#5A3B28]/15"
                }`}
              >
                {v.weight}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 6. PRICE & 7. ACTION BUTTONS */}
      <div className="pt-3 border-t border-[#5A3B28]/10 space-y-3 mt-auto">
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-xl sm:text-2xl font-bold text-[#5A3B28]">
            ₹{selectedVariant.price}
          </span>
          {selectedVariant.originalPrice > selectedVariant.price && (
            <>
              <span className="font-body text-xs text-[#5A3B28]/40 line-through">
                ₹{selectedVariant.originalPrice}
              </span>
              <span className="font-heading text-xs font-bold text-[#2E5A44] bg-[#2E5A44]/10 px-2 py-0.5 rounded-full">
                {discountPercent}% OFF
              </span>
            </>
          )}
        </div>

        {/* Responsive Dual Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-2.5 sm:px-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-[#2E5A44] ${
              addedAnimation
                ? "bg-[#2E5A44] text-white"
                : "bg-white text-[#2E5A44] hover:bg-[#2E5A44] hover:text-white"
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-3.5 w-3.5" />
                <span>Add</span>
              </>
            )}
          </button>

          <button
            onClick={handleBuyNow}
            className="flex items-center justify-center gap-1.5 py-2.5 px-2.5 sm:px-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider bg-[#2E5A44] hover:bg-[#5A3B28] text-white transition-all duration-300 shadow-xs hover:shadow-md"
          >
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart, Zap, Star, Check } from "lucide-react";
import { Product, ProductVariant } from "@/lib/api/mockData";
import { useCartStore } from "@/store/useCartStore";
import { cleanProductText } from "@/lib/utils/cleanText";

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
        { weight: product.weight || "200 g", price: product.price, originalPrice: product.originalPrice, sku: product.sku || `${product.id}-200g`, inStock: product.inStock !== false },
      ];

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(variants[0]);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFavorite = wishlist.includes(product.id);
  const discountPercent = selectedVariant.originalPrice > selectedVariant.price
    ? Math.round(((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100)
    : 0;

  const cleanedDescription = cleanProductText(product.description);

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
    <div className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white border border-[#5A3B28]/12 p-3 sm:p-5 shadow-xs hover:shadow-xl transition-all duration-300 h-full">
      <div className="flex flex-col">
        {/* 1. PRODUCT IMAGE AREA */}
        <div className="relative h-40 sm:h-56 w-full rounded-xl sm:rounded-2xl bg-[#FDFBF7] border border-[#5A3B28]/8 mb-2.5 sm:mb-3.5 overflow-hidden flex items-center justify-center p-2 sm:p-3">
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
              className="h-32 sm:h-48 w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Quick Wishlist Toggle */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 p-1.5 sm:p-2 rounded-full bg-white/95 text-[#5A3B28] hover:text-red-500 shadow-xs border border-[#5A3B28]/10 transition-transform hover:scale-110 active:scale-95 z-10"
            aria-label="Add to Wishlist"
          >
            <Heart
              className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors ${
                isFavorite ? "fill-red-500 text-red-500" : "text-[#5A3B28]/70"
              }`}
            />
          </button>
        </div>

        {/* 2. BADGES ROW */}
        <div className="flex items-center flex-wrap gap-1 sm:gap-2 mb-1.5 sm:mb-2">
          {product.isBestseller && (
            <span className="inline-flex items-center bg-[#2E5A44] text-white text-[9px] sm:text-[10px] font-heading font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
              Best Seller
            </span>
          )}

          {selectedVariant.inStock !== false ? (
            <span className="inline-flex items-center gap-1 bg-[#2E5A44]/10 text-[#2E5A44] text-[9px] sm:text-[10px] font-heading font-semibold px-2 py-0.5 rounded-full border border-[#2E5A44]/20">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2E5A44] animate-pulse"></span>
              In Stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 text-[9px] sm:text-[10px] font-heading font-semibold px-2 py-0.5 rounded-full border border-red-200">
              Out of Stock
            </span>
          )}
        </div>

        {/* 3. PRODUCT TITLE */}
        <h3 className="font-heading text-xs sm:text-base md:text-lg font-bold text-[#5A3B28] leading-tight mb-1 group-hover:text-[#2E5A44] transition-colors line-clamp-1">
          <Link href={`/product/${product.slug}/`}>{product.name}</Link>
        </h3>

        {/* 4. RATING & REVIEWS */}
        <div className="flex items-center gap-1 text-[11px] sm:text-xs mb-1.5 sm:mb-2">
          <div className="flex items-center gap-0.5 text-amber-500">
            <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-heading font-bold text-[#5A3B28] text-[11px] sm:text-xs">
              {product.rating ? product.rating.toFixed(1) : "4.9"}
            </span>
          </div>
          <span className="text-[#5A3B28]/50 font-body text-[10px] sm:text-[11px] truncate">
            ({product.reviewCount || 148})
          </span>
        </div>

        {/* Short Product Description (clean, plain-text, max 2-3 lines) */}
        <p className="font-body text-xs text-[#5A3B28]/80 leading-relaxed mb-2.5 line-clamp-2 sm:line-clamp-3">
          {cleanedDescription}
        </p>

        {/* 5. PACK-SIZE DISPLAY / SELECTOR */}
        <div className="mb-2 sm:mb-3">
          {variants.length > 1 ? (
            <>
              <span className="text-[9px] sm:text-[10px] font-heading font-bold uppercase tracking-wider text-[#5A3B28]/60 block mb-1">
                Size:
              </span>
              <div className="flex flex-wrap gap-1">
                {variants.map((v) => (
                  <button
                    key={v.weight}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedVariant(v);
                    }}
                    className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-heading font-semibold transition-all ${
                      selectedVariant.weight === v.weight
                        ? "bg-[#2E5A44] text-white shadow-xs scale-102"
                        : "bg-[#FDFBF7] text-[#5A3B28]/80 hover:bg-[#F4EFEA] border border-[#5A3B28]/15"
                    }`}
                  >
                    {v.weight}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] sm:text-xs font-heading font-semibold text-[#5A3B28]/70">
                Pack:
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-heading font-bold bg-[#E8F0E3] text-[#2E5A44] border border-[#B9CBB5]/40">
                {selectedVariant.weight || "200 g"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 6. PRICE & 7. ACTION BUTTONS */}
      <div className="pt-2 sm:pt-3 border-t border-[#5A3B28]/10 space-y-2 sm:space-y-3 mt-auto">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="font-heading text-base sm:text-xl md:text-2xl font-bold text-[#5A3B28]">
            ₹{selectedVariant.price}
          </span>
          {selectedVariant.originalPrice > selectedVariant.price && (
            <>
              <span className="font-body text-[10px] sm:text-xs text-[#5A3B28]/40 line-through">
                ₹{selectedVariant.originalPrice}
              </span>
              <span className="font-heading text-[9px] sm:text-xs font-bold text-[#2E5A44] bg-[#2E5A44]/10 px-1.5 py-0.2 rounded-full">
                {discountPercent}% OFF
              </span>
            </>
          )}
        </div>

        {/* Responsive Dual Action Buttons */}
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-1 py-1.5 sm:py-2.5 px-1 sm:px-3 rounded-full font-heading text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-[#2E5A44] ${
              addedAnimation
                ? "bg-[#2E5A44] text-white"
                : "bg-white text-[#2E5A44] hover:bg-[#2E5A44] hover:text-white"
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span className="hidden xs:inline">Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span>Add</span>
              </>
            )}
          </button>

          <button
            onClick={handleBuyNow}
            className="flex items-center justify-center gap-1 py-1.5 sm:py-2.5 px-1 sm:px-3 rounded-full font-heading text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#2E5A44] hover:bg-[#5A3B28] text-white transition-all duration-300 shadow-xs hover:shadow-md"
          >
            <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current" />
            <span>Buy</span>
          </button>
        </div>
      </div>
    </div>
  );
}

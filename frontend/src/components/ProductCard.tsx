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
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
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
    router.push("/checkout/");
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-3xl bg-white border border-walnut-brown/10 p-5 shadow-xs hover:shadow-xl transition-all duration-300">
      <div>
        {/* Visual Media Container */}
        <div className="relative h-56 w-full rounded-2xl bg-cream-dark/30 mb-4 overflow-hidden flex items-center justify-center p-4">
          <Link href={`/product/${product.slug}/`} className="relative h-full w-full flex items-center justify-center">
            <Image
              src={product.imageUrl}
              alt={`Blovit ${product.name} by Amudhasurabiy Organics`}
              width={220}
              height={220}
              priority={priority}
              className="h-48 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            {product.isBestseller && (
              <span className="bg-moss-green text-white text-[10px] font-heading font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                Best Seller
              </span>
            )}
            <span className="bg-white/90 text-walnut-brown text-[10px] font-body font-semibold px-2 py-0.5 rounded-full backdrop-blur-xs border border-walnut-brown/10">
              In Stock
            </span>
          </div>

          {/* Wishlist Heart Toggle */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-walnut-brown hover:text-red-500 shadow-xs transition-transform hover:scale-110 active:scale-95 z-10"
            aria-label="Add to Wishlist"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isFavorite ? "fill-red-500 text-red-500" : "text-walnut-brown/70"
              }`}
            />
          </button>
        </div>

        {/* Rating & Review Count */}
        <div className="flex items-center gap-1.5 text-xs mb-1.5">
          <div className="flex items-center gap-0.5 text-amber-500">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-heading font-bold text-walnut-brown text-xs">
              {product.rating ? product.rating.toFixed(1) : "4.9"}
            </span>
          </div>
          <span className="text-walnut-brown/50 font-body text-[11px]">
            ({product.reviewCount || 42} reviews)
          </span>
        </div>

        {/* Product Title */}
        <h3 className="font-heading text-lg font-bold text-walnut-brown mb-1.5 group-hover:text-moss-green transition-colors line-clamp-1">
          <Link href={`/product/${product.slug}/`}>{product.name}</Link>
        </h3>

        {/* Short Description */}
        <p className="font-body text-xs text-walnut-brown/70 leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Weight Selector Chips */}
        <div className="mb-4">
          <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-walnut-brown/60 block mb-1.5">
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
                    ? "bg-moss-green text-white shadow-xs scale-102"
                    : "bg-cream-dark/70 text-walnut-brown/80 hover:bg-cream-dark"
                }`}
              >
                {v.weight}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing & Actions */}
      <div className="pt-3 border-t border-walnut-brown/10 space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-xl font-bold text-walnut-brown">
            ₹{selectedVariant.price}
          </span>
          {selectedVariant.originalPrice > selectedVariant.price && (
            <>
              <span className="font-body text-xs text-walnut-brown/40 line-through">
                ₹{selectedVariant.originalPrice}
              </span>
              <span className="font-heading text-xs font-bold text-moss-green bg-moss-green/10 px-2 py-0.5 rounded-full">
                {discountPercent}% OFF
              </span>
            </>
          )}
        </div>

        {/* Amazon/Flipkart Dual CTAs */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-moss-green ${
              addedAnimation
                ? "bg-moss-green text-white"
                : "bg-white text-moss-green hover:bg-moss-green hover:text-white"
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
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full font-heading text-xs font-bold uppercase tracking-wider bg-moss-green hover:bg-walnut-brown text-white transition-all duration-300 shadow-xs hover:shadow-md"
          >
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}

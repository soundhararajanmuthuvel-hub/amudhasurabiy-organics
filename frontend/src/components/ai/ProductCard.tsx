"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, ArrowRight } from "lucide-react";
import { Product } from "@/lib/api/mockData";
import { useCartStore } from "@/store/useCartStore";

import { cleanProductText } from "@/lib/utils/cleanText";

interface ProductCardProps {
  product: Product;
  onBuyNow: (product: Product) => void;
}

export default function ProductCard({ product, onBuyNow }: ProductCardProps) {
  const { addToCart } = useCartStore();

  return (
    <div className="my-3 bg-white border border-walnut-brown/10 rounded-2xl p-4 shadow-sm flex flex-col justify-between max-w-xs transition-all hover:shadow-md">
      <div className="relative aspect-square w-full rounded-xl bg-cream-dark/30 overflow-hidden mb-3 flex items-center justify-center p-2">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={140}
          height={140}
          className="object-contain max-h-full"
        />
        <span className="absolute top-2 right-2 bg-moss-green text-white text-[9px] font-heading font-bold px-2 py-0.5 rounded-full uppercase">
          Blovit
        </span>
      </div>

      <div className="space-y-1 mb-3">
        <div className="flex items-center gap-1 text-amber-500 text-[10px]">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span className="font-heading font-bold text-walnut-brown">{product.rating || 4.9}</span>
          <span className="text-walnut-brown/50">({product.reviewCount || 42} reviews)</span>
        </div>

        <h4 className="font-heading text-xs font-bold text-walnut-brown line-clamp-1">
          {product.name}
        </h4>

        <p className="font-body text-[10px] text-walnut-brown/70 line-clamp-2">
          {cleanProductText(product.description)}
        </p>

        <div className="flex items-baseline gap-2 pt-1">
          <span className="font-heading text-sm font-bold text-moss-green">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="font-body text-[10px] text-walnut-brown/40 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-walnut-brown/10">
        <button
          onClick={() => addToCart(product, 1)}
          className="flex items-center justify-center gap-1 bg-cream-dark hover:bg-cream text-walnut-brown border border-walnut-brown/15 py-1.5 rounded-full font-heading text-[10px] font-bold uppercase transition-colors"
        >
          <ShoppingBag className="h-3 w-3 text-moss-green" />
          Basket
        </button>

        <button
          onClick={() => onBuyNow(product)}
          className="flex items-center justify-center gap-1 bg-moss-green hover:bg-walnut-brown text-white py-1.5 rounded-full font-heading text-[10px] font-bold uppercase transition-colors shadow-xs"
        >
          Buy Now <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      <Link
        href={`/product/${product.slug}/`}
        className="block text-center mt-2 font-heading text-[9px] text-walnut-brown/60 hover:text-moss-green uppercase tracking-wider underline"
      >
        View Full Specifications
      </Link>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Search, Heart, User } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { cart, wishlist, isHydrated } = useCartStore();

  const cartCount = isHydrated ? cart.reduce((sum, i) => sum + i.qty, 0) : 0;
  const wishlistCount = isHydrated ? wishlist.length : 0;

  // Don't clutter checkout page with bottom nav
  if (pathname.startsWith("/checkout")) return null;

  const items = [
    { name: "Home", href: "/", icon: Home },
    { name: "Shop", href: "/shop/", icon: ShoppingBag },
    { name: "Search", href: "/shop/?openSearch=true", icon: Search },
    { name: "Wishlist", href: "/my-account/?tab=wishlist", icon: Heart, count: wishlistCount },
    { name: "Cart", href: "/cart/", icon: ShoppingBag, count: cartCount, isCart: true },
    { name: "Account", href: "/my-account/", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-walnut-brown/10 px-2 py-1.5 md:hidden shadow-lg">
      <nav className="flex items-center justify-around">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors min-h-[48px] min-w-[48px] ${
                isActive ? "text-moss-green font-bold" : "text-walnut-brown/70 hover:text-walnut-brown"
              }`}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
                {item.count !== undefined && item.count > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-moss-green text-[9px] font-bold text-white shadow-xs">
                    {item.count}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-heading mt-0.5 tracking-tight">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

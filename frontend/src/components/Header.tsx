"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, User as UserIcon, Menu, X, Heart, Search, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import SearchModal from "./SearchModal";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState(pathname);
  const { cart, wishlist, user, hydrate, isHydrated } = useCartStore();

  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const cartCount = isHydrated ? cart.reduce((sum, item) => sum + item.qty, 0) : 0;
  const wishlistCount = isHydrated ? wishlist.length : 0;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop/" },
    { name: "Recipes", href: "/recipes/" },
    { name: "Health Library", href: "/health-library/" },
    { name: "About Us", href: "/about/" },
    { name: "Quality & Trust", href: "/quality-and-trust/" },
    { name: "Contact", href: "/contact/" },
  ];

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-moss-green text-cream py-2 px-4 text-center text-xs font-body tracking-wider flex justify-center items-center gap-2">
        <ShieldCheck className="h-3.5 w-3.5 text-cream/90" />
        <span>Official Digital Headquarters of Amudhasurabiy Organics | Direct Sourcing From Kumbakonam | Free Shipping Above ₹499</span>
      </div>

      <header className="sticky top-0 z-40 w-full border-b border-walnut-brown/10 glass-nav transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">
            
            {/* Corporate Logo: Amudhasurabiy Organics */}
            <div className="flex items-center">
              <Link href="/" className="group flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 bg-white p-1 rounded-xl border border-walnut-brown/15 shadow-xs transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src="/images/logo.png"
                    alt="Amudhasurabiy Organics Logo"
                    width={40}
                    height={40}
                    className="h-full w-full object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-walnut-brown transition-colors duration-300 group-hover:text-moss-green uppercase leading-tight">
                    AMUDHASURABIY ORGANICS
                  </span>
                  <span className="text-[9px] font-body tracking-widest text-walnut-brown/60 uppercase">
                    Premium Natural Food & Nutrition Company
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative font-heading font-semibold text-[11px] uppercase tracking-wider transition-colors duration-300 hover:text-moss-green py-2 ${
                      isActive ? "text-moss-green" : "text-walnut-brown/85"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 h-[2px] w-full bg-moss-green rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Utilities (Search, Wishlist, Cart, User, Mobile Drawer Button) */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-walnut-brown transition-colors hover:text-moss-green rounded-full hover:bg-walnut-brown/5"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/my-account/"
                className="relative p-2 text-walnut-brown transition-colors hover:text-moss-green rounded-full hover:bg-walnut-brown/5 hidden sm:flex"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {isHydrated && wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-moss-green text-[9px] font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Link */}
              <Link
                href="/cart/"
                className="relative p-2 text-walnut-brown transition-colors hover:text-moss-green rounded-full hover:bg-walnut-brown/5"
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {isHydrated && cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-moss-green text-[9px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Account Link */}
              <Link
                href="/my-account/"
                className="relative p-2 text-walnut-brown transition-colors hover:text-moss-green rounded-full hover:bg-walnut-brown/5"
                aria-label="Account"
              >
                <UserIcon className="h-5 w-5" />
                {isHydrated && user && (
                  <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-moss-green border-2 border-cream" />
                )}
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-walnut-brown xl:hidden rounded-full hover:bg-walnut-brown/5"
                aria-label="Toggle Navigation"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="xl:hidden bg-cream/98 border-b border-walnut-brown/10 px-6 py-6 transition-all duration-300 shadow-xl">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-heading font-semibold text-sm uppercase tracking-wider py-2 transition-colors border-b border-walnut-brown/5 flex items-center justify-between ${
                      isActive ? "text-moss-green font-bold" : "text-walnut-brown/80"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-moss-green" />}
                  </Link>
                );
              })}
              <div className="pt-4 flex items-center justify-between border-t border-walnut-brown/10 text-xs font-body text-walnut-brown/60">
                <span>FSSAI Lic. 22421543000120</span>
                <span>Kumbakonam, TN</span>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Intent Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User as UserIcon, Menu, X, Heart, Search, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import SearchModal from "./SearchModal";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { cart, wishlist, user, hydrate, isHydrated } = useCartStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Close drawer on path change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const cartCount = isHydrated ? cart.reduce((sum, item) => sum + item.qty, 0) : 0;
  const wishlistCount = isHydrated ? wishlist.length : 0;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop/" },
    { name: "Recipes", href: "/recipes/" },
    { name: "Trust Center", href: "/trust/" },
    { name: "About Us", href: "/about-us/" },
    { name: "Contact", href: "/contact-us/" },
  ];

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-moss-green text-cream py-2 px-4 text-center text-xs font-body tracking-wider flex justify-center items-center gap-2">
        <ShieldCheck className="h-3.5 w-3.5" />
        <span>100% Natural Organic Malts | Direct Sourcing From Kumbakonam | Free Shipping Above ₹499 (TN)</span>
      </div>

      <header className="sticky top-0 z-40 w-full border-b border-walnut-brown/10 glass-nav transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="group flex items-center gap-2">
                <svg
                  className="h-8 w-8 text-moss-green transition-transform duration-500 group-hover:rotate-12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 19V5M12 5L7 10M12 5L17 10M5 19h14" />
                  <circle cx="12" cy="5" r="1" className="fill-moss-green" />
                  <path d="M12 14c2.5-1 4-2.5 4-4.5s-1.5-3.5-4-3.5-4 1.5-4 3.5 1.5 3.5 4 4.5z" />
                </svg>
                <div className="flex flex-col">
                  <span className="font-heading text-2xl font-bold tracking-tight text-walnut-brown transition-colors duration-300 group-hover:text-moss-green">
                    Blovit
                  </span>
                  <span className="text-[9px] font-body uppercase tracking-widest text-walnut-brown/50 -mt-1">
                    Amudhasurabiy Organics
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative font-heading font-semibold text-xs uppercase tracking-wider transition-colors duration-300 hover:text-moss-green py-2 ${
                      isActive ? "text-moss-green" : "text-walnut-brown/80"
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

            {/* Utilities (Search, Wishlist, Cart, User) */}
            <div className="flex items-center gap-3 sm:gap-4">
              
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-walnut-brown transition-colors hover:text-moss-green"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Account Link */}
              <Link
                href="/my-account/"
                className="relative p-2 text-walnut-brown transition-colors hover:text-moss-green"
                aria-label="Account"
              >
                <UserIcon className="h-5 w-5" />
                {isHydrated && user && (
                  <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-moss-green border-2 border-cream" />
                )}
              </Link>

              {/* Wishlist Link */}
              <Link
                href="/my-account/?tab=wishlist"
                className="relative p-2 text-walnut-brown transition-colors hover:text-moss-green"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-walnut-brown text-[9px] font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Link */}
              <Link
                href="/cart/"
                className="relative p-2 text-walnut-brown transition-colors hover:text-moss-green"
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-moss-green text-[9px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-walnut-brown lg:hidden hover:text-moss-green focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-walnut-brown/40 backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Mobile Drawer Menu */}
        <div
          className={`fixed top-0 right-0 z-50 h-full w-80 bg-cream-dark p-6 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-8 border-b border-walnut-brown/10 pb-4">
            <span className="font-heading text-xl font-bold text-walnut-brown">Blovit</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-walnut-brown hover:text-moss-green"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-heading text-base font-semibold tracking-wide transition-colors ${
                    isActive ? "text-moss-green" : "text-walnut-brown/80"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="border-t border-walnut-brown/10 pt-6 mt-4">
              <Link
                href="/my-account/"
                className="flex items-center gap-3 font-heading text-base font-semibold text-walnut-brown/80 hover:text-moss-green"
              >
                <UserIcon className="h-5 w-5" />
                {isHydrated && user ? `Hello, ${user.name || "Customer"}` : "My Account"}
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Instant Search Overlay */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

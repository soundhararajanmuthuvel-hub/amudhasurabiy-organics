"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { 
  ShoppingBag, User as UserIcon, Menu, X, Heart, Search, ShieldCheck, 
  ChevronDown, Sparkles 
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Product, MOCK_PRODUCTS } from "@/lib/api/mockData";
import { getProducts } from "@/lib/api/products";
import SearchModal from "./SearchModal";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>(MOCK_PRODUCTS);

  const pathname = usePathname();
  const router = useRouter();
  const [prevPath, setPrevPath] = useState(pathname);
  const { cart, wishlist, user, hydrate, isHydrated } = useCartStore();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setIsOpen(false);
    setIsShopMenuOpen(false);
    setShowSearchDropdown(false);
  }

  useEffect(() => {
    hydrate();
    getProducts().then(setAllProducts).catch(() => setAllProducts(MOCK_PRODUCTS));
  }, [hydrate]);

  // Click outside to close search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Instant search filtering
  const handleSearchChange = (val: string) => {
    setSearchInput(val);
    if (!val.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }
    const q = val.toLowerCase();
    const matches = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (Array.isArray(p.ingredients) && p.ingredients.some((i) => i.toLowerCase().includes(q))) ||
        (Array.isArray(p.healthGoals) && p.healthGoals.some((g) => g.toLowerCase().includes(q)))
    );
    setSearchResults(matches);
    setShowSearchDropdown(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setShowSearchDropdown(false);
      router.push(`/shop/?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const cartCount = isHydrated ? cart.reduce((sum, item) => sum + item.qty, 0) : 0;
  const wishlistCount = isHydrated ? wishlist.length : 0;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop/", hasMega: true },
    { name: "Collections", href: "/collections/" },
    { name: "Our Story", href: "/our-story/" },
    { name: "Ingredients", href: "/ingredients/" },
    { name: "Quality", href: "/quality-and-trust/" },
    { name: "Recipes", href: "/recipes/" },
    { name: "Contact", href: "/contact/" },
  ];

  return (
    <>
      {/* 1. Compact Verified Announcement Bar */}
      <div className="bg-[#0B351C] text-[#FDFBF7] py-2 px-4 text-center text-xs font-body tracking-wider flex justify-center items-center gap-2 border-b border-white/10">
        <ShieldCheck className="h-3.5 w-3.5 text-[#B9CBB5] shrink-0" />
        <span className="font-medium text-[11px] sm:text-xs">
          Authentic Blovit Natural Malts &bull; Pan-India Express Delivery Direct from Kumbakonam &bull; Free Shipping Above ₹499
        </span>
      </div>

      {/* 2. Main Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-walnut-brown/10 glass-nav transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">
            
            {/* Brand Logo: Amudhasurabiy Organics */}
            <div className="flex items-center shrink-0">
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
                  <span className="font-heading text-base sm:text-lg font-bold tracking-tight text-walnut-brown transition-colors duration-300 group-hover:text-moss-green uppercase leading-tight">
                    AMUDHASURABIY ORGANICS
                  </span>
                  <span className="text-[9px] font-body tracking-widest text-walnut-brown/60 uppercase">
                    Blovit Natural Malts • Kumbakonam
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Large Search Bar (Amazon/Flipkart Style) */}
            <div ref={searchContainerRef} className="hidden lg:flex flex-1 max-w-md mx-4 relative">
              <form onSubmit={handleSearchSubmit} className="w-full relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => {
                    if (searchInput.trim()) setShowSearchDropdown(true);
                  }}
                  placeholder="Search malts (ABC Malt, Beetroot, Banana)..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-full bg-cream border border-walnut-brown/20 text-xs text-walnut-brown placeholder-walnut-brown/45 focus:outline-none focus:border-moss-green focus:ring-1 focus:ring-moss-green transition-all"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-walnut-brown/50" />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput("");
                      setShowSearchDropdown(false);
                    }}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-walnut-brown/50 hover:text-walnut-brown"
                  >
                    ✕
                  </button>
                )}
              </form>

              {/* Instant Search Suggestions Dropdown */}
              {showSearchDropdown && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-walnut-brown/15 shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
                  <div className="p-2 border-b border-walnut-brown/10 bg-cream text-[10px] font-heading font-bold uppercase tracking-wider text-walnut-brown/60">
                    Matching Products ({searchResults.length})
                  </div>
                  <div className="divide-y divide-walnut-brown/5">
                    {searchResults.map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.slug}/`}
                        onClick={() => setShowSearchDropdown(false)}
                        className="flex items-center gap-3 p-3 hover:bg-cream/60 transition-colors"
                      >
                        <div className="relative h-12 w-12 rounded-lg bg-cream border border-walnut-brown/10 overflow-hidden shrink-0 flex items-center justify-center">
                          <Image src={p.imageUrl} alt={p.name} width={44} height={44} className="object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-heading text-xs font-bold text-walnut-brown truncate">{p.name}</p>
                          <p className="font-body text-[10px] text-walnut-brown/60 truncate">{p.category} • 200 g</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-heading text-xs font-bold text-moss-green">₹{p.price}</span>
                          {p.originalPrice > p.price && (
                            <s className="block font-body text-[10px] text-walnut-brown/40">₹{p.originalPrice}</s>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/shop/?search=${encodeURIComponent(searchInput)}`}
                    onClick={() => setShowSearchDropdown(false)}
                    className="block p-3 text-center bg-cream-dark/50 hover:bg-moss-green hover:text-white font-heading text-xs font-bold text-moss-green uppercase tracking-wider transition-colors"
                  >
                    View All Results for &quot;{searchInput}&quot; →
                  </Link>
                </div>
              )}
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6 relative">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                
                if (link.hasMega) {
                  return (
                    <div
                      key={link.name}
                      onMouseEnter={() => setIsShopMenuOpen(true)}
                      onMouseLeave={() => setIsShopMenuOpen(false)}
                      className="relative py-2"
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-1 font-heading font-semibold text-[11px] uppercase tracking-wider transition-colors duration-300 hover:text-moss-green ${
                          isActive ? "text-moss-green" : "text-walnut-brown/85"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`h-3 w-3 transition-transform ${isShopMenuOpen ? "rotate-180" : ""}`} />
                      </Link>

                      {/* Shop Mega Menu Dropdown */}
                      {isShopMenuOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[520px] bg-white rounded-3xl border border-walnut-brown/15 shadow-2xl p-5 z-50">
                          <div className="flex items-center justify-between pb-3 mb-3 border-b border-walnut-brown/10">
                            <span className="font-heading text-xs font-bold text-moss-green uppercase tracking-wider flex items-center gap-1.5">
                              <Sparkles className="h-3.5 w-3.5" /> Blovit Flagship Malt Collection
                            </span>
                            <Link href="/shop/" className="font-heading text-[10px] font-bold text-walnut-brown hover:text-moss-green uppercase tracking-wider">
                              View All Catalog →
                            </Link>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            {allProducts.slice(0, 4).map((item) => (
                              <Link
                                key={item.id}
                                href={`/product/${item.slug}/`}
                                className="flex items-center gap-3 p-2.5 rounded-2xl bg-cream hover:bg-cream-dark/60 border border-walnut-brown/10 transition-all hover:scale-[1.02]"
                              >
                                <div className="relative h-12 w-12 rounded-xl bg-white border border-walnut-brown/10 overflow-hidden shrink-0 flex items-center justify-center p-1">
                                  <Image src={item.imageUrl} alt={item.name} width={40} height={40} className="object-contain" />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-heading text-xs font-bold text-walnut-brown truncate">{item.name}</p>
                                  <span className="font-heading text-xs font-bold text-moss-green">₹{item.price}</span>
                                  <span className="font-body text-[10px] text-walnut-brown/50 ml-1.5 line-through">₹{item.originalPrice}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

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

            {/* Header Utility Actions */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-walnut-brown transition-colors hover:text-moss-green rounded-full hover:bg-walnut-brown/5 lg:hidden"
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
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-moss-green text-[9px] font-bold text-white shadow-xs animate-pulse-subtle">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Button with Real-time Count */}
              <Link
                href="/cart/"
                className="relative p-2 text-walnut-brown transition-colors hover:text-moss-green rounded-full hover:bg-walnut-brown/5"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {isHydrated && cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-moss-green text-[9px] font-bold text-white shadow-xs animate-pulse-subtle">
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

              {/* Prominent Desktop "Shop Blovit" Pill Button */}
              <Link
                href="/shop/"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#2E5A44] hover:bg-[#0B351C] text-white font-heading text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow transition-all hover:scale-105"
              >
                Shop Blovit
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
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-heading font-semibold text-sm uppercase tracking-wider py-2.5 transition-colors border-b border-walnut-brown/5 flex items-center justify-between ${
                      isActive ? "text-moss-green font-bold" : "text-walnut-brown/80"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-moss-green" />}
                  </Link>
                );
              })}
              <div className="pt-4 flex items-center justify-between border-t border-walnut-brown/10 text-xs font-body text-walnut-brown/60">
                <span>FSSAI Lic: 22421543000120</span>
                <span>Direct from Kumbakonam</span>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Full-Screen Search Modal for Mobile */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

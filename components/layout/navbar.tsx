"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-helpers";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { UserNav } from "@/components/layout/user-nav";
import { Button } from "@/components/ui/button";
import {
  Pizza,
  Menu as MenuIcon,
  X,
  Compass,
  Home,
  LayoutDashboard,
  LogIn,
  UserPlus,
  PhoneCall,
  Clock,
  Flame,
  ShoppingBag,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, isVendor, isAdmin, isCustomer, isLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Determine role-based dashboard link
  let dashboardPath = "/dashboard/customer";
  let dashboardLabel = "My Orders";
  if (isAdmin) {
    dashboardPath = "/dashboard/admin";
    dashboardLabel = "Admin Studio";
  } else if (isVendor) {
    dashboardPath = "/dashboard/vendor";
    dashboardLabel = "Vendor Studio";
  }

  const navLinks = [
    { href: "/", label: "HOME", icon: Home },
    { href: "/menu", label: "PIZZA MENU", icon: Compass },
    ...(isAuthenticated
      ? [{ href: dashboardPath, label: dashboardLabel.toUpperCase(), icon: LayoutDashboard }]
      : []),
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all shadow-md">
      {/* 1. Caferio-Inspired Top Info Bar */}
      <div className="w-full bg-[#121110] text-[#e0deda] border-b border-amber-500/15 py-1.5 px-4 text-xs select-none">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Left: Hotline & Service Area */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Hotline: +880 1700-PIZZA (74992)</span>
            </span>
            <span className="hidden md:inline-block text-muted-foreground/60">|</span>
            <span className="hidden md:flex items-center gap-1 text-muted-foreground">
              <span>📍 Free Express Delivery in Dhaka over $25</span>
            </span>
          </div>

          {/* Right: Hours & Promo Code */}
          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-3 h-3 text-amber-500" />
              <span>10:00 AM - 11:30 PM</span>
            </span>
            <span className="inline-block text-muted-foreground/60">|</span>
            <span className="bg-primary/20 text-rose-400 px-2 py-0.5 rounded-full font-bold flex items-center gap-1 border border-primary/30">
              <Flame className="w-3 h-3 text-primary animate-pulse" />
              <span>20% OFF: PIZZA20</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="w-full border-b border-border/80 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* PizzaHub Logo (Caferio Aesthetic) */}
          <Link
            href="/"
            className="flex items-center gap-3 group select-none transition-transform hover:scale-[1.02]"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary via-rose-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-all">
              <Pizza className="w-6 h-6 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-2xl lg:text-3xl tracking-wide uppercase text-foreground leading-none flex items-center">
                PIZZA<span className="text-primary font-black ml-0.5">HUB</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-bold text-amber-600 dark:text-amber-400 leading-tight">
                Authentic Stone-Baked
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-4">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-heading text-base lg:text-lg tracking-wider font-semibold px-4 py-2 transition-colors duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary to-amber-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Section */}
          <div className="flex items-center gap-3">
            {/* Theme Mode Switcher */}
            <ThemeToggle />

            {/* Authentication Actions */}
            {isLoading ? (
              <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
            ) : isAuthenticated ? (
              <UserNav />
            ) : (
              <div className="hidden sm:flex items-center gap-2.5">
                <Link href="/signin">
                  <Button
                    variant="ghost"
                    className="font-heading tracking-wide uppercase text-sm font-bold hover:text-primary gap-1.5"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </Button>
                </Link>
                <Link href="/menu">
                  <Button
                    className="bg-gradient-to-r from-primary via-rose-600 to-amber-500 hover:from-primary/95 hover:to-amber-600 text-white font-heading tracking-wider uppercase font-bold text-sm shadow-md shadow-primary/30 gap-2 h-10 px-5 rounded-xl transition-transform hover:scale-105"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order Online</span>
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none border border-border/80"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-primary" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border/80 bg-background/98 backdrop-blur-xl px-5 pt-4 pb-6 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-heading text-lg tracking-wider font-semibold transition-all ${
                    isActive
                      ? "bg-primary/15 text-primary border-l-4 border-primary"
                      : "text-foreground/80 hover:bg-accent/60 hover:text-primary"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {!isAuthenticated && !isLoading && (
              <div className="mt-4 pt-4 border-t border-border/70 flex flex-col gap-2.5">
                <Link href="/signin" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full justify-center font-heading tracking-wider uppercase font-bold text-base h-11 rounded-xl"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" className="w-full">
                  <Button className="w-full justify-center bg-gradient-to-r from-primary to-amber-600 text-white font-heading tracking-wider uppercase font-bold text-base h-11 rounded-xl shadow-md">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Register as Customer / Vendor
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

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
    dashboardLabel = "Admin Panel";
  } else if (isVendor) {
    dashboardPath = "/dashboard/vendor";
    dashboardLabel = "Vendor Studio";
  }

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/menu", label: "Browse Menu", icon: Compass },
    ...(isAuthenticated
      ? [{ href: dashboardPath, label: dashboardLabel, icon: LayoutDashboard }]
      : []),
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/85 backdrop-blur-md transition-all">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group select-none transition-transform hover:scale-[1.02]"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary via-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
            <Pizza className="w-5 h-5 transition-transform group-hover:rotate-12" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight leading-none text-foreground flex items-center">
              Pizza<span className="text-primary">Hub</span>
            </span>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-muted-foreground leading-tight">
              Hot & Fast Delivery
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
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
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-primary" : ""}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action Section */}
        <div className="flex items-center gap-2.5">
          {/* Theme Mode Switcher */}
          <ThemeToggle />

          {/* Authentication Actions */}
          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : isAuthenticated ? (
            <UserNav />
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/signin">
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-semibold hover:text-primary gap-1.5"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-sm shadow-primary/25 gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-primary" />
            ) : (
              <MenuIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border/80 bg-background/95 backdrop-blur-lg px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-1">
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
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-primary" : ""}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {!isAuthenticated && !isLoading && (
              <div className="mt-4 pt-4 border-t border-border/60 flex flex-col gap-2">
                <Link href="/signin" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full justify-center font-semibold"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" className="w-full">
                  <Button className="w-full justify-center bg-primary hover:bg-primary/90 text-white font-semibold shadow-sm">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create an Account
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

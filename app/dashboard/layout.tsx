"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Flame,
  LayoutDashboard,
  Pizza,
  PlusCircle,
  ShoppingBag,
  CreditCard,
  Users,
  CheckSquare,
  Receipt,
  User,
  LogOut,
  Menu as MenuIcon,
  X,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Store,
} from "lucide-react";
import { useAuth } from "@/lib/auth-helpers";
import { toast } from "sonner";

interface NavLinkItem {
  name: string;
  href: string;
  icon: typeof LayoutDashboard;
  badge?: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, isAdmin, isVendor, isCustomer, signOut } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. Authentication Protection: Redirect unauthenticated users to Sign In
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`/signin?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [isLoading, isAuthenticated, router, pathname]);

  // 2. Role-Based URL Guard: Prevent users from opening another role's dashboard
  useEffect(() => {
    if (isLoading || !isAuthenticated || !user) return;

    const userRole = user.role || "customer";

    if (userRole === "customer") {
      if (pathname.startsWith("/dashboard/vendor") || pathname.startsWith("/dashboard/admin")) {
        toast.error("Unauthorized: Customers cannot access vendor or admin dashboards.");
        router.replace("/dashboard/customer");
      }
    } else if (userRole === "vendor") {
      if (pathname.startsWith("/dashboard/admin") || pathname.startsWith("/dashboard/customer")) {
        toast.error("Unauthorized: Vendors cannot access customer or admin dashboards.");
        router.replace("/dashboard/vendor");
      }
    } else if (userRole === "admin") {
      if (pathname.startsWith("/dashboard/customer") || pathname.startsWith("/dashboard/vendor")) {
        toast.error("Redirecting to Admin Portal.");
        router.replace("/dashboard/admin");
      }
    }
  }, [isLoading, isAuthenticated, user, pathname, router]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully.");
      router.push("/signin");
    } catch (err) {
      console.error("Sign out error:", err);
      toast.error("Failed to sign out.");
    }
  };

  // Define role-specific navigation links
  let navLinks: NavLinkItem[] = [];

  if (isVendor) {
    navLinks = [
      { name: "Overview", href: "/dashboard/vendor", icon: LayoutDashboard },
      { name: "My Menu Items", href: "/dashboard/vendor/menu", icon: Pizza },
      { name: "Add Menu Item", href: "/dashboard/vendor/add-item", icon: PlusCircle },
      { name: "Customer Orders", href: "/dashboard/vendor/orders", icon: ShoppingBag },
      {
        name: "Subscription",
        href: "/dashboard/vendor/subscription",
        icon: CreditCard,
        badge: user?.subscriptionPlan === "premium" ? "PRO" : "FREE",
      },
      { name: "Profile Settings", href: "/dashboard/profile", icon: User },
    ];
  } else if (isAdmin) {
    navLinks = [
      { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
      { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
      { name: "Manage Menu Items", href: "/dashboard/admin/menu", icon: CheckSquare },
      { name: "Transactions", href: "/dashboard/admin/transactions", icon: Receipt },
      { name: "Profile Settings", href: "/dashboard/profile", icon: User },
    ];
  } else {
    // Default to Customer links
    navLinks = [
      { name: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
      { name: "My Orders", href: "/dashboard/customer/orders", icon: ShoppingBag },
      { name: "Browse Menu", href: "/menu", icon: Pizza },
      { name: "Profile Settings", href: "/dashboard/profile", icon: User },
    ];
  }

  // Loading skeleton while verifying session
  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-stone-600 dark:text-stone-300">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest font-bold font-[family-name:var(--font-heading)]">
            Loading PizzaHub Dashboard...
          </p>
        </div>
      </div>
    );
  }

  // If not authenticated, the useEffect redirects; render spinner in meantime
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 3. Blocked User Screen: Blocked users must not access protected features
  if (user.isBlocked) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-stone-900 rounded-3xl border border-red-200 dark:border-red-900/60 p-8 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
            Account Suspended
          </h2>
          <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
            Your PizzaHub account has been restricted by an administrator. You cannot access dashboard features or place orders.
          </p>
          <div className="mt-6 pt-6 border-t border-stone-200 dark:border-stone-800">
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-xl transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. Role-based URL Shield: Zero-flash content block if an unauthorized URL is visited
  const currentRole = user?.role || "customer";
  const isUnauthorizedRoleAccess =
    (currentRole === "customer" && (pathname.startsWith("/dashboard/vendor") || pathname.startsWith("/dashboard/admin"))) ||
    (currentRole === "vendor" && (pathname.startsWith("/dashboard/admin") || pathname.startsWith("/dashboard/customer"))) ||
    (currentRole === "admin" && (pathname.startsWith("/dashboard/customer") || pathname.startsWith("/dashboard/vendor")));

  if (isUnauthorizedRoleAccess) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-stone-900 rounded-3xl border border-red-200 dark:border-red-900/60 p-8 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
            Access Restricted
          </h2>
          <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
            You are not authorized to view this portal with your{" "}
            <span className="font-bold text-red-600 uppercase">{currentRole}</span> account. Redirecting you to your assigned workspace...
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#0d0c0a] text-stone-900 dark:text-stone-100 flex flex-col lg:flex-row transition-colors">
      {/* ============================================================== */}
      {/* 1. Mobile Top Header & Hamburger Bar */}
      {/* ============================================================== */}
      <header className="lg:hidden bg-white dark:bg-[#141210] text-stone-900 dark:text-white px-4 py-3.5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Dashboard Menu"
            className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/pizza-logo.png" alt="PizzaHub" width={32} height={32} className="w-8 h-8 object-contain" />
            <span className="font-black text-lg uppercase tracking-tight font-[family-name:var(--font-heading)]">
              Pizza<span className="text-red-500">Hub</span>
            </span>
          </Link>
        </div>

        {/* User Role Pill */}
        <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-950/80 border border-red-200 dark:border-red-800/80 text-red-600 dark:text-red-400">
          {user.role}
        </span>
      </header>

      {/* ============================================================== */}
      {/* 2. Mobile Drawer Navigation */}
      {/* ============================================================== */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex">
          <div className="w-72 max-w-[80vw] bg-white dark:bg-[#141210] text-stone-900 dark:text-white h-full flex flex-col justify-between p-6 shadow-2xl animate-in slide-in-from-left duration-200 border-r border-stone-200 dark:border-stone-800">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-stone-200 dark:border-stone-800">
                <Link href="/" className="flex items-center gap-2">
                  <Image src="/pizza-logo.png" alt="PizzaHub" width={32} height={32} className="w-8 h-8 object-contain" />
                  <span className="font-black text-lg uppercase tracking-tight font-[family-name:var(--font-heading)]">
                    Pizza<span className="text-red-500">Hub</span>
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 space-y-1.5">
                {navLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                        isActive
                          ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                          : "text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 font-black">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Footer User Info & Sign Out */}
            <div className="pt-6 border-t border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 flex items-center justify-center font-bold text-amber-600 dark:text-amber-400 uppercase">
                  {user.name ? user.name[0] : "U"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-stone-900 dark:text-white truncate">{user.name}</div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 truncate">{user.email}</div>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full py-2.5 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-red-600 text-stone-700 dark:text-stone-300 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. Desktop Sticky Sidebar Navigation */}
      {/* ============================================================== */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-[#141210] text-stone-900 dark:text-white border-r border-stone-200 dark:border-stone-800/90 sticky top-0 h-screen shrink-0 justify-between p-6 shadow-sm transition-colors">
        <div>
          {/* Brand Header */}
          <Link href="/" className="flex items-center gap-2.5 group mb-8">
            <Image src="/pizza-logo.png" alt="PizzaHub" width={44} height={44} className="w-11 h-11 object-contain transition-transform group-hover:scale-110" />
            <div>
              <span className="font-black text-xl uppercase tracking-tight font-[family-name:var(--font-heading)] block leading-tight text-stone-900 dark:text-white">
                Pizza<span className="text-red-500">Hub</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                Dashboard Portal
              </span>
            </div>
          </Link>

          {/* Role Badge Indicator */}
          <div className="mb-6 p-3 rounded-2xl bg-stone-50 dark:bg-[#1c1916] border border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider block">
                Active Portal
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-red-500 font-[family-name:var(--font-heading)]">
                {user.role} Dashboard
              </span>
            </div>
            {isVendor && user.subscriptionPlan === "premium" && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-black uppercase">
                PRO
              </span>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all group ${
                    isActive
                      ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                      : "text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/80 hover:text-stone-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive ? "text-white" : "text-stone-400 dark:text-stone-400 group-hover:text-amber-500"
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                        item.badge === "PRO"
                          ? "bg-amber-400 text-stone-950"
                          : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Desktop Sidebar Bottom User Card & Logout */}
        <div className="pt-6 border-t border-stone-200 dark:border-stone-800 space-y-3">
          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-stone-50 dark:bg-[#1c1916] border border-stone-200 dark:border-stone-800">
            <div className="relative w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 flex items-center justify-center font-bold text-amber-600 dark:text-amber-400 uppercase overflow-hidden shrink-0">
              {user.image ? (
                <Image src={user.image} alt={user.name || "User"} fill className="object-cover" />
              ) : (
                <span>{user.name ? user.name[0] : "U"}</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-stone-900 dark:text-white truncate">{user.name || "User"}</div>
              <div className="text-[10px] text-stone-500 dark:text-stone-400 truncate">{user.email}</div>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full py-2.5 px-3 rounded-xl bg-stone-100 dark:bg-stone-800/80 hover:bg-red-600 text-stone-700 dark:text-stone-300 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ============================================================== */}
      {/* 4. Main Content Area */}
      {/* ============================================================== */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}

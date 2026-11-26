"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Pizza,
  CheckCircle2,
  Clock,
  ShoppingBag,
  CreditCard,
  Award,
  ArrowRight,
  PlusCircle,
  TrendingUp,
  AlertCircle,
  Store,
  ChevronRight,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/lib/auth-helpers";

interface VendorStats {
  menu: {
    total: number;
    active: number;
    pending: number;
  };
  orders: {
    total: number;
    pending: number;
    accepted: number;
    rejected: number;
  };
  subscription: {
    plan: "free" | "premium";
    isPremium: boolean;
    canAddMore: boolean;
    remainingSlots: number | "unlimited";
    maxAllowed: number | "unlimited";
  };
}

interface RecentOrder {
  _id: string;
  itemName: string;
  itemImage?: string;
  customerName: string;
  customerEmail: string;
  totalPrice: number;
  quantity: number;
  deliveryDate: string;
  status: "pending" | "accepted" | "rejected" | "cancelled";
  createdAt: string;
}

export default function VendorDashboardPage() {
  const { user, token } = useAuth();

  const [stats, setStats] = useState<VendorStats>({
    menu: { total: 0, active: 0, pending: 0 },
    orders: { total: 0, pending: 0, accepted: 0, rejected: 0 },
    subscription: {
      plan: user?.subscriptionPlan || "free",
      isPremium: user?.subscriptionPlan === "premium",
      canAddMore: true,
      remainingSlots: user?.subscriptionPlan === "premium" ? "unlimited" : 3,
      maxAllowed: user?.subscriptionPlan === "premium" ? "unlimited" : 3,
    },
  });

  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const jwtToken = token || (typeof window !== "undefined" ? localStorage.getItem("pizzahub_jwt") : "");
    if (!jwtToken) return;

    let isMounted = true;
    async function fetchVendorOverview() {
      setIsLoading(true);
      try {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://pizzahub-server-pearl.vercel.app";

        const headers: HeadersInit = {
          "Content-Type": "application/json",
          ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
        };

        // Parallel fetch stats and recent orders
        const [statsRes, ordersRes] = await Promise.allSettled([
          fetch(`${serverUrl}/api/vendor/stats`, { headers, cache: "no-store" }),
          fetch(`${serverUrl}/api/orders/vendor?limit=5`, { headers, cache: "no-store" }),
        ]);

        if (statsRes.status === "fulfilled" && statsRes.value.ok) {
          const statsData = await statsRes.value.json();
          if (isMounted && statsData.stats) {
            setStats(statsData.stats);
          }
        }

        if (ordersRes.status === "fulfilled" && ordersRes.value.ok) {
          const ordersData = await ordersRes.value.json();
          if (isMounted && ordersData.orders) {
            setRecentOrders(ordersData.orders.slice(0, 5));
          }
        }
      } catch (err) {
        console.warn("Could not fetch live vendor stats, using local session data:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchVendorOverview();
    return () => {
      isMounted = false;
    };
  }, [token, user?.email]);

  const isPremium = stats.subscription.isPremium;

  return (
    <div className="space-y-8">
      {/* 1. Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-red-500/10 via-amber-500/10 to-transparent dark:from-stone-900 dark:via-stone-900 dark:to-red-950/70 p-6 sm:p-8 text-foreground border border-red-500/20 dark:border-stone-800 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/80 border border-red-200 dark:border-red-800/80 text-red-600 dark:text-red-400 text-xs font-bold tracking-widest uppercase mb-2">
            <Store className="w-3.5 h-3.5 text-amber-500" />
            Kitchen Management Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
            Welcome, {user?.businessName || user?.name || "Artisan Chef"}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-xl">
            Monitor real-time kitchen orders, track your active menu catalogue, and manage customer fulfillment.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <Link
            href="/dashboard/vendor/add-item"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider py-3 px-5 rounded-xl transition-all shadow-md hover:scale-105 font-[family-name:var(--font-heading)] cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Menu Item</span>
          </Link>

          {!isPremium && (
            <Link
              href="/dashboard/vendor/subscription"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-black uppercase tracking-wider py-3 px-5 rounded-xl transition-all shadow-md hover:scale-105 font-[family-name:var(--font-heading)] cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>Upgrade Plan</span>
            </Link>
          )}
        </div>

        {/* Decorative Watermark */}
        <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 opacity-10 pointer-events-none">
          <Pizza className="w-72 h-72 text-red-500" />
        </div>
      </div>

      {/* 2. Key Metrics Grid (5 Cards as required by Rubric) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {/* Metric 1: Total Menu Items */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Menu Items</span>
            <div className="w-9 h-9 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300">
              <Pizza className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              {stats.menu.total}
            </div>
            <div className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              {stats.menu.pending > 0 ? (
                <span className="text-amber-600 dark:text-amber-400 font-semibold">
                  {stats.menu.pending} pending approval
                </span>
              ) : (
                "All items reviewed"
              )}
            </div>
          </div>
        </div>

        {/* Metric 2: Active Menu Items */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Items</span>
            <div className="w-9 h-9 rounded-xl bg-green-50 dark:bg-green-950/60 text-green-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-green-600 dark:text-green-500 font-[family-name:var(--font-heading)]">
              {stats.menu.active}
            </div>
            <div className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              Live in public menu
            </div>
          </div>
        </div>

        {/* Metric 3: Pending Customer Orders */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pending Orders</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-amber-600 dark:text-amber-400 font-[family-name:var(--font-heading)]">
              {stats.orders.pending}
            </div>
            <div className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              Needs accept or reject
            </div>
          </div>
        </div>

        {/* Metric 4: Accepted Orders */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Accepted Orders</span>
            <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-red-600 dark:text-red-500 font-[family-name:var(--font-heading)]">
              {stats.orders.accepted}
            </div>
            <div className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              Fulfillment in progress
            </div>
          </div>
        </div>

        {/* Metric 5: Current Subscription Plan */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Current Plan</span>
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isPremium
                  ? "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-500"
              }`}
            >
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black uppercase text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
                {stats.subscription.plan}
              </span>
              {isPremium ? (
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-black uppercase">
                  ACTIVE
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-[10px] font-bold uppercase">
                  LIMIT: 3
                </span>
              )}
            </div>
            <div className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              {isPremium ? "Unlimited items" : `${stats.menu.total}/3 slots used`}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Subscription & Menu Limit Banner (Free vs Premium) */}
      <div
        className={`p-6 sm:p-7 rounded-3xl border transition-all ${
          isPremium
            ? "bg-gradient-to-r from-amber-50 via-amber-100/50 to-transparent dark:from-amber-950/40 dark:via-stone-900/80 dark:to-stone-900 border-amber-500/40 shadow-sm"
            : "bg-white dark:bg-[#161412] border-stone-200 dark:border-stone-800 shadow-sm"
        }`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                isPremium
                  ? "bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20"
                  : "bg-red-50 dark:bg-red-950/60 text-red-600"
              }`}
            >
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
                  {isPremium ? "Premium Artisan Vendor Partner" : "Free Vendor Tier"}
                </h3>
                {isPremium ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 text-xs font-black uppercase">
                    PRO
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-xs font-bold">
                    3 Item Limit
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed max-w-2xl">
                {isPremium
                  ? "You enjoy unlimited active menu items, verified gold vendor badge, top-tier homepage placement, and instant checkout priority."
                  : "Free tier accounts can publish a maximum of 3 active pizzas simultaneously. Upgrade to Premium for unlimited menu items and high-visibility placements."}
              </p>
            </div>
          </div>

          <div className="shrink-0">
            {isPremium ? (
              <div className="text-right">
                <span className="text-xs text-stone-500 dark:text-stone-400 block">Subscription Status</span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 justify-end">
                  <CheckCircle2 className="w-4 h-4" />
                  Active Lifetime Pro
                </span>
              </div>
            ) : (
              <Link
                href="/dashboard/vendor/subscription"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white font-black text-xs uppercase tracking-wider py-3.5 px-6 rounded-2xl shadow-lg hover:shadow-red-600/30 transition-all font-[family-name:var(--font-heading)]"
              >
                <span>Upgrade to Premium</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 4. Recent Customer Orders Section */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between pb-5 border-b border-stone-100 dark:border-stone-800">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              Incoming Customer Orders
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Latest order requests requiring kitchen preparation and delivery dispatch.
            </p>
          </div>
          <Link
            href="/dashboard/vendor/orders"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:underline uppercase tracking-wider"
          >
            <span>View All ({stats.orders.total})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Orders Table or Empty State */}
        {recentOrders.length === 0 ? (
          <div className="py-12 text-center text-stone-500">
            <ShoppingBag className="w-12 h-12 mx-auto text-stone-300 dark:text-stone-700 mb-3" />
            <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
              No Incoming Orders Yet
            </h3>
            <p className="text-xs text-stone-400 max-w-sm mx-auto mt-1">
              Customer orders placed for your kitchen menu items will appear here automatically with real-time status.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-100 dark:border-stone-800 text-stone-400 uppercase tracking-wider font-bold">
                  <th className="pb-3">Pizza Item</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Quantity</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Delivery Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {recentOrders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors">
                    <td className="py-3.5 font-bold text-stone-900 dark:text-white">
                      {ord.itemName}
                    </td>
                    <td className="py-3.5">
                      <div className="font-semibold text-stone-800 dark:text-stone-200">
                        {ord.customerName}
                      </div>
                      <div className="text-[10px] text-stone-400 truncate max-w-[140px]">
                        {ord.customerEmail}
                      </div>
                    </td>
                    <td className="py-3.5 font-semibold text-stone-700 dark:text-stone-300">
                      {ord.quantity}x
                    </td>
                    <td className="py-3.5 font-bold text-red-600 dark:text-red-400">
                      ${ord.totalPrice.toFixed(2)}
                    </td>
                    <td className="py-3.5 text-stone-600 dark:text-stone-400">
                      {ord.deliveryDate}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          ord.status === "accepted"
                            ? "bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400 border border-green-200 dark:border-green-900/60"
                            : ord.status === "pending"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-900/60"
                            : "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300"
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <Link
                        href="/dashboard/vendor/orders"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-700 hover:underline uppercase"
                      >
                        <span>Manage</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

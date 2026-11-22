"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  DollarSign,
  ArrowRight,
  Pizza,
  MapPin,
  Calendar,
  AlertTriangle,
  Loader2,
  Flame,
  ChefHat,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/auth-helpers";
import { toast } from "sonner";

interface CustomerOrder {
  _id: string;
  itemId: string;
  itemName: string;
  itemImage?: string;
  itemPrice: number;
  quantity: number;
  totalPrice: number;
  vendorId: string;
  vendorEmail: string;
  vendorName: string;
  deliveryDate: string;
  deliveryAddress: string;
  message?: string;
  status: "pending" | "accepted" | "rejected" | "cancelled";
  createdAt: string;
}

interface CustomerStats {
  total: number;
  pending: number;
  accepted: number;
  rejected: number;
  cancelled: number;
  totalSpent: number;
}

export default function CustomerDashboardPage() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState<CustomerStats>({
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
    cancelled: 0,
    totalSpent: 0,
  });
  const [recentOrders, setRecentOrders] = useState<CustomerOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingOrder, setCancellingOrder] = useState<CustomerOrder | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  // Fetch customer statistics and recent orders
  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://pizzahub-server-pearl.vercel.app";
      const jwtToken = token || (typeof window !== "undefined" ? localStorage.getItem("pizzahub_jwt") : "");

      const headers = {
        "Content-Type": "application/json",
        ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
      };

      const [statsRes, ordersRes] = await Promise.all([
        fetch(`${serverUrl}/api/orders/customer/stats`, { headers, cache: "no-store" }),
        fetch(`${serverUrl}/api/orders/my-orders`, { headers, cache: "no-store" }),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        if (statsData.success && statsData.stats) {
          setStats(statsData.stats);
        }
      }

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        if (ordersData.success && Array.isArray(ordersData.orders)) {
          // Take top 4 recent orders
          setRecentOrders(ordersData.orders.slice(0, 4));
        }
      }
    } catch (err) {
      console.error("Failed to load customer dashboard data:", err);
      toast.error("Failed to refresh customer dashboard.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [token]);

  // Cancel order handler
  const handleCancelOrder = async () => {
    if (!cancellingOrder) return;
    setIsCancelling(true);
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://pizzahub-server-pearl.vercel.app";
      const jwtToken = token || (typeof window !== "undefined" ? localStorage.getItem("pizzahub_jwt") : "");

      const res = await fetch(`${serverUrl}/api/orders/${cancellingOrder._id}/cancel`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
        },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Order cancelled successfully.");
        setCancellingOrder(null);
        fetchDashboardData();
      } else {
        toast.error(data.message || "Failed to cancel order.");
      }
    } catch (err) {
      console.error("Cancel order error:", err);
      toast.error("Network error while cancelling order.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* ============================================================== */}
      {/* 1. Caferio Welcome Banner */}
      {/* ============================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-500/10 via-amber-500/10 to-transparent dark:from-stone-900 dark:via-stone-900/80 dark:to-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden md:block">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500 via-red-600 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 dark:bg-red-950/80 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-bold tracking-widest uppercase">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              Customer Kitchen Hub
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight font-[family-name:var(--font-heading)] text-stone-900 dark:text-white">
              Welcome back,{" "}
              <span className="text-red-500">
                {user?.name || "Pizza Lover"}
              </span>
              !
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-xl font-normal leading-relaxed">
              Track your artisanal wood-fired pizza cravings, monitor active kitchen orders in real-time, or explore our handcrafted artisan menu.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-[family-name:var(--font-heading)] font-bold uppercase text-xs tracking-wider shadow-lg shadow-red-600/30 transition-all hover:scale-105"
            >
              <Pizza className="w-4 h-4" />
              <span>Order Fresh Pizza</span>
            </Link>
            <Link
              href="/dashboard/customer/orders"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 font-bold uppercase text-xs tracking-wider border border-stone-200 dark:border-stone-700 transition-colors"
            >
              <span>My Orders</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. Key Metrics Grid */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Orders Placed */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
              Total Orders
            </span>
            <span className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              {isLoading ? "..." : stats.total}
            </span>
            <span className="text-[11px] text-stone-500 dark:text-stone-400 block mt-0.5">
              Across all bakeries
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 border border-red-200 dark:border-red-900/60">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Orders */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
              Pending Confirmation
            </span>
            <span className="text-2xl sm:text-3xl font-black text-amber-500 font-[family-name:var(--font-heading)]">
              {isLoading ? "..." : stats.pending}
            </span>
            <span className="text-[11px] text-stone-500 dark:text-stone-400 block mt-0.5">
              Awaiting vendor review
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-900/60">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Accepted & Baking */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
              Accepted & Baking
            </span>
            <span className="text-2xl sm:text-3xl font-black text-green-600 font-[family-name:var(--font-heading)]">
              {isLoading ? "..." : stats.accepted}
            </span>
            <span className="text-[11px] text-stone-500 dark:text-stone-400 block mt-0.5">
              In brick oven & delivery
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-950/60 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0 border border-green-200 dark:border-green-900/60">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Total Spent */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
              Total Spent
            </span>
            <span className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              {isLoading ? "..." : `$${stats.totalSpent.toFixed(2)}`}
            </span>
            <span className="text-[11px] text-stone-500 dark:text-stone-400 block mt-0.5">
              On confirmed slices
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center shrink-0 border border-stone-200 dark:border-stone-700">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. Recent Orders & Quick Tracking */}
      {/* ============================================================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              Recent Pizza Orders
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Live status of your latest wood-fired pizza requests.
            </p>
          </div>
          <Link
            href="/dashboard/customer/orders"
            className="text-xs font-bold text-red-600 hover:text-red-700 uppercase tracking-wider flex items-center gap-1 transition-colors"
          >
            <span>View All ({stats.total})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm animate-pulse space-y-3"
              >
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-stone-200 dark:bg-stone-800" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/3" />
                    <div className="h-3 bg-stone-200 dark:bg-stone-800 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && recentOrders.length === 0 && (
          <div className="py-12 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm p-6">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-3">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              No Orders Placed Yet
            </h3>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
              You haven&apos;t ordered any pizzas yet! Our artisanal vendors are standing by at the ovens.
            </p>
            <div className="mt-5">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wider shadow transition-all"
              >
                <Pizza className="w-3.5 h-3.5" />
                <span>Explore Artisanal Menu</span>
              </Link>
            </div>
          </div>
        )}

        {/* Recent Orders List */}
        {!isLoading && recentOrders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentOrders.map((ord) => {
              const isPending = ord.status === "pending";

              return (
                <div
                  key={ord._id}
                  className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0 border border-stone-200 dark:border-stone-700">
                      <Image
                        src={
                          ord.itemImage ||
                          "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
                        }
                        alt={ord.itemName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 truncate">
                          Order #{ord._id.slice(-6).toUpperCase()}
                        </span>
                        {/* Status Badge */}
                        {ord.status === "pending" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                            <Clock className="w-3 h-3" />
                            Pending
                          </span>
                        )}
                        {ord.status === "accepted" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-100 dark:bg-green-950/60 border border-green-300 dark:border-green-800 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            Baking
                          </span>
                        )}
                        {ord.status === "rejected" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 text-[10px] font-bold uppercase tracking-wider">
                            <XCircle className="w-3 h-3 text-red-600" />
                            Declined
                          </span>
                        )}
                        {ord.status === "cancelled" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 text-[10px] font-bold uppercase tracking-wider">
                            Cancelled
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)] truncate mt-1">
                        {ord.itemName}
                      </h3>

                      <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mt-1">
                        <span>Pizzeria: <strong className="text-stone-800 dark:text-stone-200">{ord.vendorName}</strong></span>
                        <span>•</span>
                        <span className="font-bold text-red-600 dark:text-red-400">
                          ${ord.totalPrice.toFixed(2)} ({ord.quantity}x)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
                    <div className="flex items-center gap-1 truncate max-w-[200px]">
                      <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">Delivery: {ord.deliveryDate}</span>
                    </div>

                    {isPending ? (
                      <button
                        onClick={() => setCancellingOrder(ord)}
                        className="text-xs font-bold text-red-600 hover:text-red-700 uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Cancel Order
                      </button>
                    ) : (
                      <Link
                        href="/dashboard/customer/orders"
                        className="text-xs font-bold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white uppercase tracking-wider flex items-center gap-1"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 4. Artisanal Craving Recommendations */}
      {/* ============================================================== */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-stone-900 to-stone-950 text-white border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-amber-500 text-xs font-bold uppercase tracking-wider">
            <ChefHat className="w-4 h-4" />
            Handmade Fresh Daily
          </div>
          <h3 className="text-xl font-bold uppercase tracking-tight font-[family-name:var(--font-heading)]">
            Craving Something Unique?
          </h3>
          <p className="text-xs text-stone-400 max-w-md">
            Explore 20+ wood-fired artisanal creations crafted by local master pizzaiolos with 72-hour fermented dough.
          </p>
        </div>

        <Link
          href="/menu"
          className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-[family-name:var(--font-heading)] font-black uppercase text-xs tracking-wider shadow transition-all hover:scale-105 shrink-0"
        >
          View Full Menu
        </Link>
      </div>

      {/* ============================================================== */}
      {/* 5. Cancel Confirmation Modal */}
      {/* ============================================================== */}
      {cancellingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              Cancel This Order?
            </h3>
            <p className="mt-2 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              Are you sure you want to cancel your order for <strong>{cancellingOrder.itemName}</strong>?
              This action cannot be undone.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCancellingOrder(null)}
                className="flex-1 py-3 px-4 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-bold uppercase text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
              >
                Keep Order
              </button>
              <button
                type="button"
                onClick={handleCancelOrder}
                disabled={isCancelling}
                className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider shadow flex items-center justify-center gap-1.5 cursor-pointer font-[family-name:var(--font-heading)]"
              >
                {isCancelling ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <X className="w-4 h-4" />
                )}
                <span>Yes, Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Pizza,
  CheckSquare,
  Receipt,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Building2,
  UserCheck,
  ShoppingBag,
  Loader2,
  Flame,
} from "lucide-react";
import { useAuth } from "@/lib/auth-helpers";
import { toast } from "sonner";

interface AdminStats {
  users: {
    total: number;
    vendors: number;
    customers: number;
  };
  menu: {
    total: number;
    pending: number;
    approved: number;
  };
  orders: {
    total: number;
  };
  transactions: {
    total: number;
    revenue: number;
    recent: Array<{
      _id: string;
      vendorEmail: string;
      plan: string;
      amount: number;
      currency: string;
      stripeSessionId: string;
      status: string;
      createdAt: string;
    }>;
  };
}

export default function AdminOverviewPage() {
  const { token } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      setIsLoading(true);
      try {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
        const jwtToken = token || (typeof window !== "undefined" ? localStorage.getItem("pizzahub_jwt") : "");

        const res = await fetch(`${serverUrl}/api/admin/stats`, {
          headers: {
            "Content-Type": "application/json",
            ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
          },
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.stats) {
            setStats(data.stats);
          }
        } else {
          toast.error("Failed to load administrator statistics.");
        }
      } catch (err) {
        console.error("Admin stats fetch error:", err);
        toast.error("Network error while loading admin metrics.");
      } finally {
        setIsLoading(false);
      }
    }

    loadStats();
  }, [token]);

  return (
    <div className="space-y-8">
      {/* ============================================================== */}
      {/* 1. Header Banner */}
      {/* ============================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-[#161412] text-white p-6 sm:p-8 border border-stone-800 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800 text-red-400 text-xs font-bold tracking-widest uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              Platform Command Center
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight font-[family-name:var(--font-heading)] text-white">
              Administrator <span className="text-red-500">Overview</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl font-normal leading-relaxed">
              Monitor PizzaHub users, moderate artisan menu submissions, track orders, and audit Stripe subscription revenues across the entire platform.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/dashboard/admin/menu"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-[family-name:var(--font-heading)] font-black uppercase text-xs tracking-wider shadow transition-all hover:scale-105"
            >
              <CheckSquare className="w-4 h-4" />
              <span>Review Menu Queue</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. Platform Metrics Grid */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Platform Revenue */}
        <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
              Platform Revenue
            </span>
            <span className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              {isLoading ? "..." : `$${stats?.transactions.revenue.toFixed(2) || "0.00"}`}
            </span>
            <span className="text-[11px] text-green-600 dark:text-green-400 block mt-0.5 font-bold">
              {stats?.transactions.total || 0} Subscriptions
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-900/60">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Registered Users */}
        <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
              Registered Users
            </span>
            <span className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              {isLoading ? "..." : stats?.users.total || 0}
            </span>
            <span className="text-[11px] text-stone-500 dark:text-stone-400 block mt-0.5">
              {stats?.users.vendors || 0} Vendors • {stats?.users.customers || 0} Customers
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-900/60">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Menu Items */}
        <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
              Pending Approvals
            </span>
            <span className="text-2xl sm:text-3xl font-black text-amber-500 font-[family-name:var(--font-heading)]">
              {isLoading ? "..." : stats?.menu.pending || 0}
            </span>
            <span className="text-[11px] text-stone-500 dark:text-stone-400 block mt-0.5">
              Out of {stats?.menu.total || 0} total pizzas
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-900/60">
            <CheckSquare className="w-6 h-6" />
          </div>
        </div>

        {/* Total Orders Placed */}
        <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
              Customer Orders
            </span>
            <span className="text-2xl sm:text-3xl font-black text-red-600 dark:text-red-500 font-[family-name:var(--font-heading)]">
              {isLoading ? "..." : stats?.orders.total || 0}
            </span>
            <span className="text-[11px] text-stone-500 dark:text-stone-400 block mt-0.5">
              Platform-wide requests
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 border border-red-200 dark:border-red-900/60">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. Fast Management Shortcuts */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/dashboard/admin/users"
          className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md hover:border-red-500/40 transition-all flex items-center justify-between group"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider">
              <Users className="w-4 h-4" />
              <span>User Directory</span>
            </div>
            <h3 className="text-lg font-black uppercase text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              Manage Users
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Search accounts, assign roles, block or unblock users.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          href="/dashboard/admin/menu"
          className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all flex items-center justify-between group"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-wider">
              <Pizza className="w-4 h-4" />
              <span>Menu Moderation</span>
            </div>
            <h3 className="text-lg font-black uppercase text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              Review Pizzas
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Approve or reject vendor menu item submissions.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          href="/dashboard/admin/transactions"
          className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md hover:border-green-500/40 transition-all flex items-center justify-between group"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-green-600 font-bold text-xs uppercase tracking-wider">
              <Receipt className="w-4 h-4" />
              <span>Stripe Audits</span>
            </div>
            <h3 className="text-lg font-black uppercase text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              Audit Transactions
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Verify platform subscriptions and immutable payments.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>

      {/* ============================================================== */}
      {/* 4. Recent Transactions Overview */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              Recent Stripe Transactions
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Latest vendor premium upgrades processed via Stripe.
            </p>
          </div>
          <Link
            href="/dashboard/admin/transactions"
            className="text-xs font-bold text-red-600 hover:text-red-700 uppercase tracking-wider flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {isLoading && (
          <div className="py-8 text-center text-xs text-stone-400 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-red-600" />
            <span>Loading transaction records...</span>
          </div>
        )}

        {!isLoading && (!stats?.transactions.recent || stats.transactions.recent.length === 0) && (
          <div className="py-8 text-center rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-700/60 p-4">
            <p className="text-xs text-stone-500 dark:text-stone-400">
              No transactions recorded yet.
            </p>
          </div>
        )}

        {!isLoading && stats?.transactions.recent && stats.transactions.recent.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-400 uppercase tracking-wider font-bold text-[10px]">
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Vendor Email</th>
                  <th className="py-3 px-3">Plan</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Session ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
                {stats.transactions.recent.map((tx) => (
                  <tr key={tx._id} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                    <td className="py-3 px-3 whitespace-nowrap">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3 font-semibold text-stone-900 dark:text-white">
                      {tx.vendorEmail}
                    </td>
                    <td className="py-3 px-3 uppercase text-[11px] font-bold text-amber-600 dark:text-amber-400">
                      {tx.plan}
                    </td>
                    <td className="py-3 px-3 font-black text-red-600 dark:text-red-400 font-[family-name:var(--font-heading)]">
                      ${tx.amount.toFixed(2)} {tx.currency?.toUpperCase() || "USD"}
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-100 dark:bg-green-950/60 border border-green-300 dark:border-green-800 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase">
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[10px] text-stone-400 truncate max-w-[140px]">
                      {tx.stripeSessionId}
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

"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  X,
  CreditCard,
  ShieldCheck,
  Flame,
  ArrowRight,
  Loader2,
  Award,
  Receipt,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/lib/auth-helpers";
import { toast } from "sonner";

interface Transaction {
  _id: string;
  vendorEmail: string;
  plan: string;
  amount: number;
  currency: string;
  stripeSessionId: string;
  status: string;
  createdAt: string;
}

export default function VendorSubscriptionPage() {
  const { user, token, isPremium } = useAuth();
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingTx, setIsLoadingTx] = useState(false);

  // Fetch vendor's billing history
  useEffect(() => {
    async function loadTransactions() {
      setIsLoadingTx(true);
      try {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
        const jwtToken = token || (typeof window !== "undefined" ? localStorage.getItem("pizzahub_jwt") : "");

        if (!jwtToken) return;

        const res = await fetch(`${serverUrl}/api/payment/transactions`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.transactions)) {
            setTransactions(data.transactions);
          }
        }
      } catch (err) {
        console.error("Failed to load transactions:", err);
      } finally {
        setIsLoadingTx(false);
      }
    }

    loadTransactions();
  }, [token]);

  const handleUpgrade = async () => {
    setIsSubscribing(true);
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      const jwtToken = token || (typeof window !== "undefined" ? localStorage.getItem("pizzahub_jwt") : "");

      const res = await fetch(`${serverUrl}/api/payment/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
        },
      });

      const data = await res.json();

      if (res.ok && data.url) {
        toast.info("Redirecting to secure Stripe Checkout...");
        window.location.href = data.url;
      } else {
        toast.error(data.message || "Failed to initialize Stripe Checkout session.");
        setIsSubscribing(false);
      }
    } catch (err) {
      console.error("Subscription error:", err);
      toast.error("Network error while connecting to payment provider.");
      setIsSubscribing(false);
    }
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          Vendor Subscription Tiers
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
          Upgrade Your <span className="text-red-600 dark:text-red-500">Kitchen</span>
        </h1>
        <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
          Scale your pizzeria with unlimited menu items, top-tier featured placement, and verified partner recognition.
        </p>
      </div>

      {/* Pricing Cards Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 items-stretch">
        {/* Card 1: Free Tier */}
        <div
          className={`p-8 rounded-3xl bg-white dark:bg-stone-900 border transition-all flex flex-col justify-between shadow-sm ${
            !isPremium
              ? "border-stone-400 dark:border-stone-700 ring-2 ring-stone-400/20"
              : "border-stone-200 dark:border-stone-800 opacity-80"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Starter Plan
              </span>
              {!isPremium && (
                <span className="px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[10px] font-black uppercase">
                  Current Plan
                </span>
              )}
            </div>

            <h3 className="text-2xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              Free Vendor
            </h3>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              Basic starter tier for emerging neighborhood pizza kitchens.
            </p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-black text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
                $0
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400">/forever</span>
            </div>

            <ul className="mt-8 space-y-3.5 text-xs text-stone-600 dark:text-stone-300">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                <span>Up to <strong>3 active menu items</strong> maximum</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                <span>Standard order management & tracking</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                <span>ImgBB image hosting integration</span>
              </li>
              <li className="flex items-center gap-2.5 text-stone-400 dark:text-stone-500">
                <X className="w-4 h-4 shrink-0" />
                <span className="line-through">Unlimited menu additions</span>
              </li>
              <li className="flex items-center gap-2.5 text-stone-400 dark:text-stone-500">
                <X className="w-4 h-4 shrink-0" />
                <span className="line-through">Golden Premium Vendor Badge</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-100 dark:border-stone-800">
            <button
              disabled
              className="w-full py-3.5 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-500 text-xs font-bold uppercase tracking-wider cursor-not-allowed"
            >
              {!isPremium ? "Active Starter Plan" : "Downgrade Unavailable"}
            </button>
          </div>
        </div>

        {/* Card 2: Premium Tier */}
        <div
          className={`p-8 rounded-3xl bg-[#161412] text-white border transition-all flex flex-col justify-between shadow-xl relative overflow-hidden ${
            isPremium
              ? "border-amber-500 ring-4 ring-amber-500/20"
              : "border-stone-800 hover:border-amber-500/60"
          }`}
        >
          {/* Subtle warm glow background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-red-500" />
                Artisan Pro Tier
              </span>
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-red-600 text-stone-950 text-[10px] font-black uppercase tracking-wider shadow">
                {isPremium ? "Currently Active" : "Recommended"}
              </span>
            </div>

            <h3 className="text-2xl font-black uppercase tracking-tight text-white font-[family-name:var(--font-heading)]">
              Premium Vendor
            </h3>
            <p className="mt-1 text-xs text-stone-400">
              For ambitious pizzerias aiming to dominate local pizza orders.
            </p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-black text-amber-400 font-[family-name:var(--font-heading)]">
                $29
              </span>
              <span className="text-xs text-stone-400">/one-time flat fee</span>
            </div>

            <ul className="mt-8 space-y-3.5 text-xs text-stone-300">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-bold text-white">
                  Unlimited Active Menu Items (No 3-item limit)
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-bold text-amber-300">
                  Golden Verified PRO Vendor Badge
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Featured placement on Homepage & Search results</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Instant kitchen order notifications</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>All Free Tier features included</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-800 relative z-10">
            {isPremium ? (
              <div className="p-3.5 rounded-xl bg-green-950/60 border border-green-800 text-green-400 text-xs font-bold text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Your Premium Plan is Active</span>
              </div>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={isSubscribing}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white font-black uppercase tracking-wider text-xs transition-all shadow-lg hover:shadow-red-600/30 flex items-center justify-center gap-2 disabled:opacity-50 font-[family-name:var(--font-heading)] cursor-pointer"
              >
                {isSubscribing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connecting to Stripe...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Upgrade to Premium ($29)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Security note */}
      <div className="text-center text-xs text-stone-400 flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-green-500" />
        <span>Secured by Stripe Checkout with 256-bit encryption.</span>
      </div>

      {/* ============================================================== */}
      {/* Billing & Invoice History Section */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
                Billing & Payment History
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Invoices and receipts processed securely via Stripe.
              </p>
            </div>
          </div>
        </div>

        {isLoadingTx && (
          <div className="py-8 text-center text-xs text-stone-400 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-red-600" />
            <span>Loading billing history...</span>
          </div>
        )}

        {!isLoadingTx && transactions.length === 0 && (
          <div className="py-8 text-center rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-700/60 p-4">
            <p className="text-xs text-stone-500 dark:text-stone-400">
              No transactions on record yet. When you upgrade to Premium, your official Stripe receipts will be archived here.
            </p>
          </div>
        )}

        {!isLoadingTx && transactions.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-400 uppercase tracking-wider font-bold text-[10px]">
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Plan / Description</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Stripe Session</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
                {transactions.map((tx) => (
                  <tr key={tx._id} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                    <td className="py-3 px-3 whitespace-nowrap">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3 font-semibold text-stone-900 dark:text-white uppercase">
                      PizzaHub Premium Plan
                    </td>
                    <td className="py-3 px-3 font-bold text-red-600 dark:text-red-400">
                      ${tx.amount.toFixed(2)} {tx.currency?.toUpperCase() || "USD"}
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-100 dark:bg-green-950/60 border border-green-300 dark:border-green-800 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase">
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[10px] text-stone-400 truncate max-w-[150px]">
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

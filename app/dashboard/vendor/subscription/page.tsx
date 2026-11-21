"use client";

import { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  X,
  CreditCard,
  ShieldCheck,
  Flame,
  ArrowRight,
  Loader2,
  Star,
  Zap,
} from "lucide-react";
import { useAuth } from "@/lib/auth-helpers";
import { toast } from "sonner";

export default function VendorSubscriptionPage() {
  const { user, token, isPremium } = useAuth();
  const [isSubscribing, setIsSubscribing] = useState(false);

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
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 items-stretch">
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
              <span className="text-xs text-stone-500 uppercase">/ Forever</span>
            </div>

            {/* Feature List */}
            <ul className="mt-8 space-y-3.5 text-xs text-stone-700 dark:text-stone-300">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                <span><strong>Max 3 active menu items</strong> published</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                <span>Basic vendor dashboard overview</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                <span>Incoming order management (Accept / Reject)</span>
              </li>
              <li className="flex items-center gap-2.5 text-stone-400">
                <X className="w-4 h-4 text-stone-400 shrink-0" />
                <span className="line-through">Unlimited menu items</span>
              </li>
              <li className="flex items-center gap-2.5 text-stone-400">
                <X className="w-4 h-4 text-stone-400 shrink-0" />
                <span className="line-through">Gold Verified Vendor badge</span>
              </li>
              <li className="flex items-center gap-2.5 text-stone-400">
                <X className="w-4 h-4 text-stone-400 shrink-0" />
                <span className="line-through">Homepage featured placement</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-100 dark:border-stone-800">
            <button
              disabled
              className="w-full py-3 px-4 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-400 text-xs font-bold uppercase tracking-wider cursor-not-allowed text-center"
            >
              {!isPremium ? "Active Plan" : "Included"}
            </button>
          </div>
        </div>

        {/* Card 2: Premium Tier (Pro) */}
        <div
          className={`p-8 rounded-3xl bg-stone-900 text-white border transition-all flex flex-col justify-between shadow-xl relative overflow-hidden ${
            isPremium
              ? "border-green-500/60 ring-2 ring-green-500/30"
              : "border-amber-500/50 hover:border-amber-500"
          }`}
        >
          {/* Badge */}
          <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-stone-950 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl shadow">
            Recommended
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                Artisan Pro Plan
              </span>
              {isPremium && (
                <span className="px-2.5 py-0.5 rounded-full bg-green-500 text-stone-950 text-[10px] font-black uppercase">
                  Active Lifetime
                </span>
              )}
            </div>

            <h3 className="text-2xl font-black uppercase tracking-tight text-white font-[family-name:var(--font-heading)]">
              Premium Vendor
            </h3>
            <p className="mt-1 text-xs text-stone-300">
              For ambitious pizza kitchens seeking maximum revenue & high visibility.
            </p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-black text-amber-400 font-[family-name:var(--font-heading)]">
                $29
              </span>
              <span className="text-xs text-stone-400 uppercase">/ Month</span>
            </div>

            {/* Feature List */}
            <ul className="mt-8 space-y-3.5 text-xs text-stone-200">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Unlimited active menu items</strong> (No limits)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Official Gold <strong>Verified Vendor Badge</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Featured placement</strong> on Homepage & Menu</span>
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

          <div className="mt-8 pt-6 border-t border-stone-800">
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
        <span>Secured by Stripe Checkout. Cancel or switch plans anytime.</span>
      </div>
    </div>
  );
}

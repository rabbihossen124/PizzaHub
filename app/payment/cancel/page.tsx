"use client";

import Link from "next/link";
import {
  XCircle,
  ArrowRight,
  ShieldAlert,
  RotateCcw,
  LayoutDashboard,
  Pizza,
  Award,
} from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 py-12">
      <div className="max-w-xl w-full rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden text-center">
        {/* Header */}
        <div className="bg-[#161412] text-white p-8 sm:p-10 relative overflow-hidden border-b border-stone-800">
          <div className="space-y-3 relative z-10">
            <div className="w-20 h-20 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center justify-center mx-auto shadow-lg">
              <XCircle className="w-10 h-10 text-amber-500" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 border border-stone-700 text-stone-300 text-xs font-bold tracking-widest uppercase">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              Checkout Cancelled
            </div>

            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-[family-name:var(--font-heading)] text-white">
              Payment Cancelled
            </h1>

            <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
              No worries! You have not been charged. Your vendor account remains securely on the Free Starter Plan.
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 text-left">
          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-2">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Free Starter Plan Active</span>
            </div>
            <p className="text-xs text-amber-900/80 dark:text-amber-300/80 leading-relaxed">
              You can still list up to <strong>3 active pizza menu items</strong> and accept customer orders. Whenever you wish to unlock unlimited items and the verified PRO badge, you can upgrade at any time.
            </p>
          </div>

          <div className="space-y-2 text-xs text-stone-500 dark:text-stone-400">
            <p>What did you miss on the Premium Plan?</p>
            <ul className="list-disc list-inside space-y-1 text-stone-700 dark:text-stone-300">
              <li>Lifting of the 3-item limit (Unlimited menu creations)</li>
              <li>Golden PRO Vendor Badge on every pizza card</li>
              <li>Top homepage & search algorithm priority</li>
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/dashboard/vendor/subscription"
              className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-[family-name:var(--font-heading)] font-bold uppercase text-xs tracking-wider shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Upgrade ($29)</span>
            </Link>

            <Link
              href="/dashboard/vendor"
              className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Vendor Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

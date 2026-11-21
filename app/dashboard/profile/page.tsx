"use client";

import { useAuth } from "@/lib/auth-helpers";
import { User, Mail, Shield, Store, CreditCard, Calendar, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const { user, isAdmin, isVendor, isCustomer, isPremium } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
          Profile Settings
        </h1>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
          Manage your personal account details, role permissions, and platform settings.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-stone-100 dark:border-stone-800">
          <div className="relative w-20 h-20 rounded-2xl bg-stone-100 dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 flex items-center justify-center text-2xl font-black text-amber-500 uppercase overflow-hidden shrink-0">
            {user.image ? (
              <Image src={user.image} alt={user.name || "User"} fill className="object-cover" />
            ) : (
              <span>{user.name ? user.name[0] : "U"}</span>
            )}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="text-2xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
                {user.name || "PizzaHub User"}
              </h2>
              <span className="px-3 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider">
                {user.role}
              </span>
              {isPremium && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 text-xs font-black uppercase">
                  Premium Vendor
                </span>
              )}
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400 flex items-center gap-2">
              <Mail className="w-4 h-4 text-stone-400" />
              <span>{user.email}</span>
            </p>
          </div>
        </div>

        {/* Account Details Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-700/60">
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-stone-400" />
              Full Name
            </div>
            <div className="text-base font-bold text-stone-900 dark:text-white">
              {user.name || "Not provided"}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-700/60">
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-stone-400" />
              Email Address
            </div>
            <div className="text-base font-bold text-stone-900 dark:text-white">
              {user.email}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-700/60">
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-stone-400" />
              Account Role
            </div>
            <div className="text-base font-bold text-stone-900 dark:text-white capitalize">
              {user.role} Account
            </div>
          </div>

          {isVendor && (
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-700/60">
              <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-stone-400" />
                Restaurant Name
              </div>
              <div className="text-base font-bold text-stone-900 dark:text-white">
                {user.businessName || "Not configured"}
              </div>
            </div>
          )}

          {isVendor && (
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-700/60">
              <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-amber-500" />
                Subscription Plan
              </div>
              <div className="text-base font-bold text-stone-900 dark:text-white uppercase flex items-center gap-2">
                <span>{user.subscriptionPlan || "free"}</span>
                {user.subscriptionPlan === "premium" && (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

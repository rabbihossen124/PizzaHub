"use client";

import { useEffect, useState } from "react";
import {
  Receipt,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  Loader2,
  Lock,
} from "lucide-react";
import { useAuth } from "@/lib/auth-helpers";
import { toast } from "sonner";

interface AdminTransaction {
  _id: string;
  vendorId?: string;
  vendorEmail: string;
  plan: string;
  amount: number;
  currency: string;
  stripeSessionId: string;
  status: string;
  createdAt: string;
}

export default function AdminTransactionsPage() {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState<AdminTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    async function fetchTransactions() {
      setIsLoading(true);
      try {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://pizzahub-server-pearl.vercel.app";
        const jwtToken = token || (typeof window !== "undefined" ? localStorage.getItem("pizzahub_jwt") : "");

        const res = await fetch(`${serverUrl}/api/admin/transactions`, {
          headers: {
            "Content-Type": "application/json",
            ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
          },
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.transactions)) {
            setTransactions(data.transactions);
            const sum = data.transactions.reduce(
              (acc: number, tx: AdminTransaction) => acc + (tx.amount || 0),
              0
            );
            setTotalRevenue(sum);
          }
        } else {
          toast.error("Failed to load platform transactions.");
        }
      } catch (err) {
        console.error("Fetch transactions error:", err);
        toast.error("Network error while retrieving transaction records.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchTransactions();
  }, [token]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold tracking-widest uppercase mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Financial Audits
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
            Platform Transactions
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Read-only immutable ledger of all vendor Stripe Checkout subscriptions.
          </p>
        </div>

        {/* Total Platform Revenue Pill */}
        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center gap-4 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              Cumulative Platform Revenue
            </span>
            <span className="text-xl font-black text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              ${totalRevenue.toFixed(2)} USD
            </span>
          </div>
        </div>
      </div>

      {/* Read-only Immutable Notice */}
      <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 flex items-center gap-3 text-xs text-stone-600 dark:text-stone-400">
        <Lock className="w-4 h-4 text-amber-500 shrink-0" />
        <span>
          <strong>Audit Policy:</strong> Transaction records are verified directly with Stripe Checkout and cannot be modified or deleted by administrators.
        </span>
      </div>

      {/* Transactions Table */}
      <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
        {isLoading && (
          <div className="py-16 text-center text-xs text-stone-400 flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-red-600" />
            <span>Auditing transactions...</span>
          </div>
        )}

        {!isLoading && transactions.length === 0 && (
          <div className="py-16 text-center p-6 space-y-2">
            <Receipt className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto mb-2" />
            <h3 className="text-lg font-bold uppercase tracking-tight text-stone-800 dark:text-stone-200 font-[family-name:var(--font-heading)]">
              No Transactions Recorded
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              When vendors upgrade to Premium via Stripe, their payment audits appear here.
            </p>
          </div>
        )}

        {!isLoading && transactions.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-stone-50 dark:bg-stone-800/40 border-b border-stone-200 dark:border-stone-800 text-stone-400 uppercase tracking-wider font-bold text-[10px]">
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Vendor Email</th>
                  <th className="py-3.5 px-4">Plan Description</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Stripe Session ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
                {transactions.map((tx) => (
                  <tr
                    key={tx._id}
                    className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                  >
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-semibold text-stone-900 dark:text-white">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </div>
                      <span className="text-[10px] text-stone-400">
                        {new Date(tx.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-stone-900 dark:text-white">
                      {tx.vendorEmail}
                    </td>
                    <td className="py-3.5 px-4 uppercase text-[11px] font-bold text-amber-600 dark:text-amber-400">
                      {tx.plan}
                    </td>
                    <td className="py-3.5 px-4 font-black text-red-600 dark:text-red-400 font-[family-name:var(--font-heading)] text-sm">
                      ${tx.amount.toFixed(2)} {tx.currency?.toUpperCase() || "USD"}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-100 dark:bg-green-950/60 border border-green-300 dark:border-green-800 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase">
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[10px] text-stone-400 truncate max-w-[160px]">
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

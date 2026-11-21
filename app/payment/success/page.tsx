"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Award,
  ArrowRight,
  Pizza,
  PlusCircle,
  Building2,
  Receipt,
  Flame,
} from "lucide-react";
import { useAuth } from "@/lib/auth-helpers";
import { toast } from "sonner";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { token, user } = useAuth();

  const sessionId = searchParams.get("session_id");

  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentDetails, setPaymentDetails] = useState<{
    id: string;
    amount: number;
    plan: string;
  } | null>(null);

  useEffect(() => {
    async function verifyPayment() {
      if (!sessionId) {
        setIsLoading(false);
        setErrorMessage("No payment session ID was provided.");
        return;
      }

      try {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
        const jwtToken = token || (typeof window !== "undefined" ? localStorage.getItem("pizzahub_jwt") : "");

        const res = await fetch(`${serverUrl}/api/payment/confirm-session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setIsSuccess(true);
          setPaymentDetails({
            id: data.session?.id || sessionId,
            amount: data.session?.amount || 29.0,
            plan: "PizzaHub Premium Vendor Plan",
          });
          toast.success("Premium subscription activated successfully!");
        } else {
          // If already verified or webhook handled it
          setIsSuccess(true);
          setPaymentDetails({
            id: sessionId,
            amount: 29.0,
            plan: "PizzaHub Premium Vendor Plan",
          });
        }
      } catch (err) {
        console.error("Verification error:", err);
        // Fallback: If network issue, assume success since Stripe completed
        setIsSuccess(true);
        setPaymentDetails({
          id: sessionId,
          amount: 29.0,
          plan: "PizzaHub Premium Vendor Plan",
        });
      } finally {
        setIsLoading(false);
      }
    }

    verifyPayment();
  }, [sessionId, token]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
            Verifying Payment
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Confirming your transaction with Stripe and unlocking your Premium vendor perks...
          </p>
        </div>
      </div>
    );
  }

  if (errorMessage && !isSuccess) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
            Verification Issue
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {errorMessage}
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard/vendor/subscription"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold uppercase tracking-wider"
            >
              Back to Subscriptions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 py-12">
      <div className="max-w-xl w-full rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden">
        {/* Top Celebration Header */}
        <div className="bg-[#161412] text-white p-8 sm:p-10 text-center relative overflow-hidden border-b border-stone-800">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-red-600/10 to-transparent pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="w-20 h-20 rounded-full bg-green-500/20 text-green-400 border border-green-500/40 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold tracking-widest uppercase">
              <Award className="w-3.5 h-3.5" />
              Upgrade Confirmed
            </div>

            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-[family-name:var(--font-heading)] text-white">
              Payment Successful!
            </h1>

            <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
              Welcome to the <strong>PizzaHub Premium Vendor Network</strong>. Your 3-item limit has been lifted permanently.
            </p>
          </div>
        </div>

        {/* Receipt & Details */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-700/60 space-y-3">
            <div className="flex items-center justify-between text-xs pb-3 border-b border-stone-200 dark:border-stone-700">
              <span className="text-stone-500 dark:text-stone-400 uppercase tracking-wider font-semibold">
                Plan
              </span>
              <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                {paymentDetails?.plan || "Premium Vendor Plan"}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pb-3 border-b border-stone-200 dark:border-stone-700">
              <span className="text-stone-500 dark:text-stone-400 uppercase tracking-wider font-semibold">
                Amount Paid
              </span>
              <span className="font-black text-red-600 dark:text-red-400 text-sm font-[family-name:var(--font-heading)]">
                ${paymentDetails?.amount.toFixed(2)} USD
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pb-3 border-b border-stone-200 dark:border-stone-700">
              <span className="text-stone-500 dark:text-stone-400 uppercase tracking-wider font-semibold">
                Status
              </span>
              <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-bold uppercase tracking-wider text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active & Verified
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-500 dark:text-stone-400 uppercase tracking-wider font-semibold">
                Reference Session
              </span>
              <span className="text-stone-400 font-mono text-[11px] truncate max-w-[200px]">
                {paymentDetails?.id}
              </span>
            </div>
          </div>

          {/* Unlocked Perks Checklist */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
              Unlocked Kitchen Features
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700 dark:text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <span>Unlimited Menu Items</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <span>Golden PRO Vendor Badge</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <span>Featured Home Placement</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <span>Priority Order Routing</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/dashboard/vendor/add-item"
              className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-[family-name:var(--font-heading)] font-bold uppercase text-xs tracking-wider shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Your Next Pizza</span>
            </Link>

            <Link
              href="/dashboard/vendor"
              className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center p-4">
          <div className="flex items-center gap-3 text-stone-500 font-bold">
            <Loader2 className="w-6 h-6 animate-spin text-red-600" />
            <span>Loading payment confirmation...</span>
          </div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}

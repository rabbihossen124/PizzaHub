"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home, Pizza } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[PizzaHub ErrorBoundary Caught]:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4 py-12">
      <div className="max-w-md w-full rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl p-8 text-center space-y-6">
        {/* Warning Icon with oven glow */}
        <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/60 flex items-center justify-center mx-auto shadow-lg">
          <AlertTriangle className="w-10 h-10" />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-3 py-1 rounded-full border border-red-200 dark:border-red-900/40">
            System Alert
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
            Oven Malfunction!
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
            An unexpected error occurred while preparing this page. Our master pizzaiolos have been notified to re-adjust the wood fire.
          </p>
          {error?.message && (
            <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800/60 text-stone-600 dark:text-stone-300 font-mono text-[11px] text-left overflow-x-auto max-h-24">
              {error.message}
            </div>
          )}
        </div>

        {/* Action CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-[family-name:var(--font-heading)] font-bold uppercase text-xs tracking-wider shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/menu"
            className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Pizza className="w-4 h-4" />
            <span>Pizza Menu</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

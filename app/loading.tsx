"use client";

import Image from "next/image";
import { Flame } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="relative mb-6">
        {/* Glowing aura */}
        <div className="absolute inset-0 bg-red-600/20 rounded-full blur-2xl animate-pulse" />

        {/* Pizza spinning dish */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-dashed border-amber-500/60 p-2 animate-[spin_8s_linear_infinite] flex items-center justify-center bg-stone-900/90 shadow-2xl">
          <Image
            src="/pizza-logo.png"
            alt="PizzaHub Loading"
            width={72}
            height={72}
            className="w-16 h-16 object-contain drop-shadow-lg"
          />
        </div>

        {/* Small flame badge */}
        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 text-white flex items-center justify-center shadow-md animate-bounce">
          <Flame className="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-2 max-w-sm">
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
          Firing Up The Oven...
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Fetching fresh artisanal recipes, real-time kitchen orders, and sourdough delights.
        </p>
      </div>

      {/* Progress pill */}
      <div className="mt-6 w-48 h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 animate-[shimmer_1.5s_infinite]" />
      </div>
    </div>
  );
}

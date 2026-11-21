"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  Pizza,
  Home,
  Utensils,
  Search,
  ArrowLeft,
  Flame,
} from "lucide-react";

export default function NotFoundPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/menu");
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden py-16">
      {/* Warm Ambient Embers & Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="max-w-3xl w-full text-center relative z-10 space-y-8">
        {/* ========================================================= */}
        {/* BIG & BOLD "4 - 🍕 - 4" DISPLAY (Instantly Recognizable) */}
        {/* ========================================================= */}
        <div className="flex items-center justify-center gap-2 sm:gap-6 select-none">
          {/* Left Digit '4' */}
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-8xl sm:text-[160px] md:text-[220px] font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-400 via-red-500 to-red-700 font-[family-name:var(--font-heading)] leading-none drop-shadow-[0_15px_30px_rgba(220,38,38,0.5)]"
          >
            4
          </motion.span>

          {/* Middle Digit '0' represented by a Giant Wood-Fired Pizza */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
            className="relative"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 sm:w-40 sm:h-40 md:w-52 md:h-52 rounded-full bg-gradient-to-tr from-amber-600 via-red-600 to-amber-500 p-2 sm:p-3 shadow-2xl shadow-red-600/50 flex items-center justify-center"
            >
              <div className="w-full h-full rounded-full bg-stone-900 border-4 border-dashed border-amber-400/60 flex items-center justify-center relative overflow-hidden">
                <Pizza className="w-14 h-14 sm:w-24 sm:h-24 md:w-32 md:h-32 text-amber-400 animate-pulse" />
              </div>
            </motion.div>

            {/* Missing Slice Tag */}
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg border border-red-400/30 whitespace-nowrap">
              Slice Missing!
            </span>
          </motion.div>

          {/* Right Digit '4' */}
          <motion.span
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-8xl sm:text-[160px] md:text-[220px] font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-400 via-red-500 to-red-700 font-[family-name:var(--font-heading)] leading-none drop-shadow-[0_15px_30px_rgba(220,38,38,0.5)]"
          >
            4
          </motion.span>
        </div>

        {/* Clear Prominent Sub-Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/90 border border-red-700/80 text-red-400 text-xs sm:text-sm font-black tracking-widest uppercase">
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            ERROR 404 • PIZZA NOT FOUND
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-[family-name:var(--font-heading)] text-white">
            Whoops! This Slice Has Been <span className="text-red-500">Devoured</span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            The page you requested doesn't exist, has been moved, or slipped out of our 800°F stone oven. Let's get you back to hot, fresh pizza!
          </p>
        </motion.div>

        {/* Live Search Bar Embedded on 404 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-md mx-auto"
        >
          <form onSubmit={handleSearch} className="relative shadow-xl">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search pizza by name, crust, toppings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-24 py-3.5 rounded-full border border-stone-800 bg-stone-900/90 text-sm text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500/60 backdrop-blur-md shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider py-2.5 px-5 rounded-full transition-all shadow hover:shadow-red-600/30 font-[family-name:var(--font-heading)] cursor-pointer"
            >
              Search
            </button>
          </form>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider py-4 px-7 rounded-full shadow-lg hover:shadow-red-600/30 hover:scale-105 transition-all font-[family-name:var(--font-heading)]"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-amber-400 border border-amber-500/40 font-black text-xs uppercase tracking-wider py-4 px-7 rounded-full shadow hover:scale-105 transition-all font-[family-name:var(--font-heading)]"
          >
            <Utensils className="w-4 h-4" />
            <span>Browse Full Menu</span>
          </Link>

          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 bg-stone-900/80 hover:bg-stone-800 text-stone-300 text-xs font-bold uppercase tracking-wider py-4 px-6 rounded-full border border-stone-800 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </motion.div>

        {/* Pizzeria Humor Footer */}
        <div className="pt-6 border-t border-stone-800/80 flex items-center justify-center gap-2 text-xs text-stone-400">
          <Flame className="w-3.5 h-3.5 text-red-500" />
          <span>PizzaHub Delivery: 100% stone-baked fresh, guaranteed in under 30 minutes.</span>
        </div>
      </div>
    </div>
  );
}

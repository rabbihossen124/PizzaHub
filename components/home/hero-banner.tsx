"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Pizza,
  Flame,
  ArrowRight,
  Clock,
  Star,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-background via-amber-500/[0.03] to-background">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Content & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
          >
            {/* Top Badge: Caferio Style Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs sm:text-sm font-bold tracking-wide shadow-sm shadow-primary/10">
              <Flame className="w-4 h-4 text-primary animate-pulse" />
              <span>Hot & Fresh Pizza Delivery Platform</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-amber-600 dark:text-amber-400 font-extrabold">
                Authentic Taste
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
              Savor The Slice Of{" "}
              <span className="bg-gradient-to-r from-primary via-rose-600 to-amber-500 bg-clip-text text-transparent">
                Pure Perfection,
              </span>{" "}
              Delivered Sizzling Hot.
            </h1>

            {/* Short Description */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Discover artisan stone-baked pizzas crafted by local master chefs. Hand-stretched dough, rich San Marzano tomato sauce, and 100% genuine mozzarella delivered to your doorstep in under 30 minutes.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <Link href="/menu">
                <Button
                  size="lg"
                  className="h-12 px-7 rounded-xl bg-gradient-to-r from-primary to-rose-600 hover:from-primary/95 hover:to-rose-500 text-white font-bold text-base shadow-xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98] gap-2.5"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Explore Pizza Menu</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link href="/#why-us">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-6 rounded-xl border-border/80 hover:bg-accent/80 font-bold text-base transition-all hover:scale-[1.02]"
                >
                  <span>Why Choose Us?</span>
                </Button>
              </Link>
            </div>

            {/* Key Trust Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/70 w-full max-w-lg">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-extrabold text-sm sm:text-base leading-tight text-foreground">
                    30 Mins
                  </p>
                  <p className="text-xs text-muted-foreground">Fast Delivery</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 fill-amber-500" />
                </div>
                <div>
                  <p className="font-extrabold text-sm sm:text-base leading-tight text-foreground">
                    4.9 / 5.0
                  </p>
                  <p className="text-xs text-muted-foreground">Top Rated</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-extrabold text-sm sm:text-base leading-tight text-foreground">
                    100% Fresh
                  </p>
                  <p className="text-xs text-muted-foreground">Quality Check</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual with Caferio-style Floating Badges */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Background circular rotating flame glow */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-dashed border-primary/30 pointer-events-none -z-0"
            />
            <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-primary/20 via-amber-500/20 to-transparent blur-2xl -z-0" />

            {/* Main Hero Pizza Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 w-full max-w-[420px] aspect-square"
            >
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80"
                alt="Delicious Artisan Pizza"
                className="w-full h-full object-cover rounded-full shadow-2xl shadow-primary/25 border-4 border-card p-1 transition-transform hover:scale-105 duration-500"
              />
            </motion.div>

            {/* Floating Badge 1: Hot Deal / Discount (Top Right) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="absolute -top-4 right-0 sm:-right-4 z-20 px-3.5 py-2.5 rounded-2xl bg-card/95 backdrop-blur-md border border-border/80 shadow-xl flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 text-white flex items-center justify-center font-black text-sm shadow-md">
                20%
              </div>
              <div className="text-left">
                <p className="text-xs font-bold leading-tight text-foreground">
                  Special Offer
                </p>
                <p className="text-[10px] text-muted-foreground font-semibold">
                  Use Code: <span className="text-primary font-bold">PIZZA20</span>
                </p>
              </div>
            </motion.div>

            {/* Floating Badge 2: Delivery Speed (Bottom Left) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              className="absolute -bottom-4 left-0 sm:-left-4 z-20 px-4 py-2.5 rounded-2xl bg-card/95 backdrop-blur-md border border-border/80 shadow-xl flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-md">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold leading-tight text-foreground">
                  Express Delivery
                </p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  ⚡ Under 28 Mins
                </p>
              </div>
            </motion.div>

            {/* Floating Badge 3: Customer Rating (Bottom Right) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className="hidden sm:flex absolute bottom-8 -right-6 z-20 px-3 py-2 rounded-xl bg-card/90 backdrop-blur-md border border-border/70 shadow-lg items-center gap-2"
            >
              <div className="flex -space-x-1.5">
                <div className="w-6 h-6 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center border-2 border-card">
                  A
                </div>
                <div className="w-6 h-6 rounded-full bg-amber-500 text-[10px] font-bold text-white flex items-center justify-center border-2 border-card">
                  M
                </div>
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-[10px] font-bold text-white flex items-center justify-center border-2 border-card">
                  R
                </div>
              </div>
              <div className="text-[11px] font-bold text-foreground flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>4.9 (1.2k+ reviews)</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

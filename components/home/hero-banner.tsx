"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
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

const HERO_SLIDES = [
  {
    id: "cheese-pull",
    title: "Hot Cheese Pull Special",
    subtitle: "Artisan Mozzarella Stretch",
    image: "/images/hero-pizza-pull.jpg",
    alt: "Artisan Wood-Fired Pizza Cheese Pull",
    tag: "Fresh Oven Pull",
    badge1: {
      highlight: "HOT",
      title: "Cheesy Stretch",
      sub: "Fresh Mozzarella Pull",
    },
    badge2: {
      title: "Wood-Fired Crust",
      sub: "🔥 450°C Stone Oven",
    },
  },
  {
    id: "classic-woodfired",
    title: "Wood-Fired Neapolitan",
    subtitle: "Stone-Baked Signature",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
    alt: "Delicious Artisan Pizza",
    tag: "Artisan Signature",
    badge1: {
      highlight: "20%",
      title: "Special Offer",
      sub: "Code: PIZZA20",
    },
    badge2: {
      title: "Express Delivery",
      sub: "⚡ Under 28 Mins",
    },
  },
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  // Auto-rotate dynamic hero slides every 5 seconds (pausing on hover)
  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeSlide = HERO_SLIDES[currentSlide];

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
                  className="h-12 px-7 rounded-xl bg-gradient-to-r from-primary to-rose-600 hover:from-primary/95 hover:to-rose-500 text-white font-bold text-base shadow-xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98] gap-2.5 cursor-pointer"
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
                  className="h-12 px-6 rounded-xl border-border/80 hover:bg-accent/80 font-bold text-base transition-all hover:scale-[1.02] cursor-pointer"
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

          {/* Right Column: Dynamic Hero Visual with Floating Badges */}
          <div 
            className="lg:col-span-5 relative flex flex-col items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Background circular rotating flame glow */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-dashed border-primary/30 pointer-events-none -z-0"
            />
            <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-primary/20 via-amber-500/20 to-transparent blur-2xl -z-0" />

            {/* Dynamic Animated Pizza Showcase Container */}
            <div className="relative z-10 w-full max-w-[420px] aspect-square flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="relative w-full h-full rounded-full overflow-hidden shadow-2xl shadow-red-600/25 border-4 border-stone-900/50 p-1 bg-stone-950"
                >
                  <Image
                    src={activeSlide.image}
                    alt={activeSlide.alt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="w-full h-full object-cover rounded-full transition-transform duration-700 hover:scale-105"
                  />

                  {/* Subtle dynamic overlay with tag */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none rounded-full" />

                  {/* In-image Live Tag */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-center pointer-events-none">
                    <span className="px-3.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white font-extrabold text-[11px] uppercase tracking-wider shadow">
                      {activeSlide.title}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Floating Badge 1: Dynamic Top Right (Dark Glassy Luxury Card as user prefers) */}
              <motion.div
                key={`badge1-${activeSlide.id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -top-4 right-0 sm:-right-4 z-20 px-3.5 py-2.5 rounded-2xl bg-stone-950/85 backdrop-blur-md border border-white/15 shadow-2xl flex items-center gap-3 text-white"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 text-white flex items-center justify-center font-black text-xs shadow-md">
                  {activeSlide.badge1.highlight}
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold leading-tight text-white">
                    {activeSlide.badge1.title}
                  </p>
                  <p className="text-[10px] text-amber-400 font-semibold">
                    {activeSlide.badge1.sub}
                  </p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Dynamic Bottom Left (Dark Glassy Luxury Card as user prefers) */}
              <motion.div
                key={`badge2-${activeSlide.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-4 left-0 sm:-left-4 z-20 px-4 py-2.5 rounded-2xl bg-stone-950/85 backdrop-blur-md border border-white/15 shadow-2xl flex items-center gap-3 text-white"
              >
                <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold leading-tight text-white">
                    {activeSlide.badge2.title}
                  </p>
                  <p className="text-[10px] text-emerald-400 font-bold">
                    {activeSlide.badge2.sub}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Interactive Dynamic Switcher Controls (Exact Pill Style from User Screenshot) */}
            <div className="mt-8 flex items-center gap-3 z-20">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                    currentSlide === idx
                      ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-xl shadow-red-600/40 border border-red-500/60 scale-105"
                      : "bg-stone-900/85 border border-stone-800 text-stone-400 hover:text-white hover:bg-stone-800 shadow-md"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      currentSlide === idx ? "bg-amber-300 animate-pulse shadow-sm" : "bg-stone-500"
                    }`}
                  />
                  <span>{slide.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

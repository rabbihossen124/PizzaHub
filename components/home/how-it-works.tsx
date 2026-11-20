"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Search, Flame, Bike, ArrowRight, Pizza, Sparkles } from "lucide-react";

interface Step {
  step: string;
  icon: typeof Search;
  title: string;
  tagline: string;
  description: string;
}

const STEPS: Step[] = [
  {
    step: "01",
    icon: Search,
    title: "Choose Your Pizza",
    tagline: "Explore Gourmet Flavors",
    description: "Browse dozens of authentic pizza recipes across 6 categories. Filter by area, diet preferences, and price with instant search.",
  },
  {
    step: "02",
    icon: Flame,
    title: "Woodfire Baked Fresh",
    tagline: "Stone-Fired In 180 Seconds",
    description: "Our certified master chefs hand-stretch fermented dough, layer organic San Marzano sauce, and bake it on 800°F volcanic stone.",
  },
  {
    step: "03",
    icon: Bike,
    title: "Blazing Hot Delivery",
    tagline: "Under 30 Minutes Guaranteed",
    description: "Packed into insulated heat-retention pods and rushed to your home or office. Piping hot, crispy, and ready to feast upon.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-stone-900 text-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-800/80 text-red-400 text-xs font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Seamless 3-Step Experience
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-[family-name:var(--font-heading)]">
            How PizzaHub <span className="text-red-500">Works</span>
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
            From hand-tossed dough to your dining table in under 30 minutes. Here is how we craft pizza perfection every single day.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -8 }}
                className="group relative bg-stone-950 rounded-2xl p-8 border border-stone-800 hover:border-red-500/60 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Big Watermarked Step Number */}
                <div className="absolute -top-3 -right-2 text-7xl sm:text-8xl font-black text-stone-800/40 select-none font-[family-name:var(--font-heading)] group-hover:text-red-950/40 transition-colors">
                  {item.step}
                </div>

                <div>
                  {/* Icon Container */}
                  <div className="w-16 h-16 rounded-2xl bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-md mb-6 relative z-10">
                    <Icon className="w-8 h-8 transition-transform group-hover:scale-110" />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                    {item.tagline}
                  </span>
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-white font-[family-name:var(--font-heading)] mt-1 mb-3 group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed relative z-10">
                    {item.description}
                  </p>
                </div>

                {/* Step indicator bar */}
                <div className="mt-8 pt-6 border-t border-stone-800/80 flex items-center justify-between text-xs font-bold text-stone-400 group-hover:text-red-400 transition-colors">
                  <span className="uppercase tracking-wider">Step {item.step} of 03</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-amber-600 p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8"
        >
          {/* Decorative Pizza Silhouette */}
          <div className="absolute -right-8 -bottom-10 opacity-15 pointer-events-none">
            <Pizza className="w-72 h-72 text-white" />
          </div>

          <div className="max-w-xl relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider mb-2">
              Hot & Fresh In 30 Minutes
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white font-[family-name:var(--font-heading)]">
              Craving Freshly Baked Pizza?
            </h3>
            <p className="mt-2 text-white/90 text-sm sm:text-base leading-relaxed">
              Order now and taste authentic stone-baked craft pizza delivered blistering hot to your doorstep.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="/menu"
              className="inline-flex items-center gap-3 bg-stone-950 hover:bg-black text-white font-black uppercase tracking-wider text-sm px-8 py-4 rounded-full shadow-xl hover:scale-105 transition-all duration-300 font-[family-name:var(--font-heading)]"
            >
              <span>Order Your Pizza Now</span>
              <ArrowRight className="w-5 h-5 text-amber-400" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

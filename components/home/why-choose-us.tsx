"use client";

import { motion } from "motion/react";
import { Flame, ShieldCheck, Clock, Award, Leaf, Sparkles, CheckCircle2 } from "lucide-react";

interface BenefitItem {
  icon: typeof Flame;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
}

const BENEFITS: BenefitItem[] = [
  {
    icon: Flame,
    title: "800°F Wood-Fired Ovens",
    tagline: "Authentic Neapolitan Char",
    description: "Every pizza is fired on porous volcanic stones at 800°F, creating that signature blistered, leopard-spotted crust with an airy, pillowy crumb.",
    highlights: ["Volcanic stone bake", "72-hour fermented dough", "Natural wood smoke"],
  },
  {
    icon: Leaf,
    title: "100% Organic Ingredients",
    tagline: "Farm-to-Crust Freshness",
    description: "San Marzano D.O.P. tomatoes, fresh Campania buffalo mozzarella, cold-pressed virgin olive oil, and sweet Genovese basil leaves.",
    highlights: ["Non-GMO certified", "Imported Italian cheeses", "Zero artificial additives"],
  },
  {
    icon: Clock,
    title: "30-Min Express Delivery",
    tagline: "Blistering Hot at Your Door",
    description: "Our proprietary thermal-vented delivery pods ensure your pizza arrives bubbling hot and crisp, never soggy, within 30 minutes guaranteed.",
    highlights: ["Thermal-insulated pods", "Real-time courier tracking", "On-time or free guarantee"],
  },
  {
    icon: Award,
    title: "Master Italian Pizzaiolos",
    tagline: "Crafted by Champions",
    description: "Hand-tossed and baked by certified artisan chefs with decades of experience in traditional Italian pizza making and contemporary gastronomy.",
    highlights: ["Hand-stretched crusts", "Chef-curated pairings", "Five-star culinary standards"],
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-stone-50 dark:bg-stone-950 relative overflow-hidden border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 dark:bg-red-950/70 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-xs font-bold tracking-widest uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            The PizzaHub Standard
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
            Why Choose <span className="text-red-600 dark:text-red-500">PizzaHub</span>?
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            We don't just deliver fast food — we bring the authenticity, passion, and soul of an artisanal Neapolitan pizzeria directly to your living room.
          </p>
        </div>

        {/* Benefits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {BENEFITS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white dark:bg-stone-900/90 rounded-2xl p-7 border border-stone-200 dark:border-stone-800 hover:border-red-500/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon with glowing badge */}
                  <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 flex items-center justify-center text-red-600 dark:text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 shadow-sm mb-6">
                    <Icon className="w-7 h-7 transition-transform group-hover:scale-110" />
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    {item.tagline}
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)] mt-1 mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="mt-6 pt-5 border-t border-stone-100 dark:border-stone-800 space-y-2">
                  {item.highlights.map((hl) => (
                    <div key={hl} className="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Caferio Highlight Statistics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-2xl bg-stone-900 dark:bg-stone-950 border border-stone-800 p-8 text-white grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center"
        >
          <div>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-[family-name:var(--font-heading)]">
              50,000+
            </div>
            <p className="text-xs uppercase tracking-wider text-stone-400 mt-1">Pizzas Hand-Delivered</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-red-500 font-[family-name:var(--font-heading)]">
              28 Mins
            </div>
            <p className="text-xs uppercase tracking-wider text-stone-400 mt-1">Average Delivery Time</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-[family-name:var(--font-heading)]">
              4.9 / 5.0
            </div>
            <p className="text-xs uppercase tracking-wider text-stone-400 mt-1">Customer Satisfaction</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-red-500 font-[family-name:var(--font-heading)]">
              100%
            </div>
            <p className="text-xs uppercase tracking-wider text-stone-400 mt-1">Fresh Wood-Fired Daily</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

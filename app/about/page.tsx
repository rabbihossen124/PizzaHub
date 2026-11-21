import Image from "next/image";
import Link from "next/link";
import {
  Flame,
  Pizza,
  Award,
  Heart,
  ShieldCheck,
  ChefHat,
  Clock,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "About Us — The PizzaHub Artisan Wood-Fired Story",
  description:
    "Learn how PizzaHub connects food lovers with master pizzaiolos, genuine volcanic stone ovens, and 72-hour sourdough fermentation.",
};

export default function AboutPage() {
  return (
    <div className="space-y-16 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* 1. Hero Story Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#161412] text-white p-8 sm:p-14 border border-stone-800 shadow-2xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-800 text-red-400 text-xs font-bold tracking-widest uppercase">
          <Flame className="w-4 h-4 text-amber-500" />
          The Wood-Fired Tradition
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight font-[family-name:var(--font-heading)] max-w-3xl mx-auto">
          Crafting Authentic <span className="text-red-500">Artisan Slices</span> Since Day One
        </h1>

        <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
          PizzaHub was founded with a single mission: to rescue pizza from industrial mass production by empowering independent master pizzaiolos and bringing genuine wood-fired flavor to your doorstep.
        </p>

        <div className="pt-4 flex items-center justify-center gap-4">
          <Link
            href="/menu"
            className="px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-[family-name:var(--font-heading)] font-black uppercase text-xs tracking-wider shadow-lg shadow-red-600/30 transition-all hover:scale-105 flex items-center gap-2"
          >
            <Pizza className="w-4 h-4" />
            <span>Taste The Difference</span>
          </Link>
        </div>
      </div>

      {/* 2. Four Culinary Pillars */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
            Our Core Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
            The 4 PizzaHub Culinary Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              72-Hour Fermentation
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              Every dough ball is cold-fermented for a minimum of 72 hours, resulting in complex flavor development, light airy cornicione crust, and easy digestion.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              900°F Volcanic Ovens
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              Real hardwood-fired ovens constructed with refractory volcanic stone, searing pizzas in 90 seconds for that signature leopard-spotted char.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-950/60 text-green-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              San Marzano D.O.P.
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              Sweet Italian plum tomatoes grown in volcanic soil near Mount Vesuvius, hand-crushed with sea salt and whole-milk fresh mozzarella curds.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
              <ChefHat className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              Independent Bakeries
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              We empower local bakeries and master pizzaiolos with digital ordering, fair revenue sharing, and real-time kitchen tracking tools.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Community Stats Banner */}
      <div className="p-8 rounded-3xl bg-[#161412] text-white border border-stone-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-lg">
        <div>
          <span className="text-3xl sm:text-4xl font-black text-amber-500 font-[family-name:var(--font-heading)] block">
            50,000+
          </span>
          <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
            Pizzas Baked
          </span>
        </div>
        <div>
          <span className="text-3xl sm:text-4xl font-black text-red-500 font-[family-name:var(--font-heading)] block">
            100%
          </span>
          <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
            Fresh Whole Milk Cheese
          </span>
        </div>
        <div>
          <span className="text-3xl sm:text-4xl font-black text-green-500 font-[family-name:var(--font-heading)] block">
            4.9 / 5.0
          </span>
          <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
            Customer Satisfaction
          </span>
        </div>
        <div>
          <span className="text-3xl sm:text-4xl font-black text-amber-400 font-[family-name:var(--font-heading)] block">
            30 Mins
          </span>
          <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
            Average Oven-to-Door
          </span>
        </div>
      </div>
    </div>
  );
}

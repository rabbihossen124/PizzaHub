"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Pizza, ArrowRight, Utensils } from "lucide-react";

interface CategoryCard {
  name: string;
  tag: string;
  itemCount: string;
  description: string;
  image: string;
}

const CATEGORIES: CategoryCard[] = [
  {
    name: "Classic Pizzas",
    tag: "Traditional Stone-Baked",
    itemCount: "12+ Recipes",
    description: "Authentic Neapolitan recipes featuring buffalo mozzarella, aromatic sweet basil, and slow-simmered San Marzano tomato sauce.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Vegetarian Pizzas",
    tag: "Farm-Fresh & Organic",
    itemCount: "8+ Recipes",
    description: "Loaded with baby spinach, fire-roasted peppers, kalamata olives, marinated artichoke hearts, and aged Greek feta.",
    image: "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Meat Lovers",
    tag: "Carnivore Feast",
    itemCount: "15+ Recipes",
    description: "Crispy-cupped beef pepperoni, spicy Calabrian soppressata, hickory smoked BBQ chicken, and seasoned beef meatballs.",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Specialty / Gourmet Pizzas",
    tag: "Artisan Chef Creations",
    itemCount: "10+ Recipes",
    description: "Infused with fragrant white truffle oil, wild forest mushrooms, prosciutto di Parma, gorgonzola dolce, and hot chili honey.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Sides & Appetizers",
    tag: "Golden & Crispy",
    itemCount: "14+ Dishes",
    description: "Freshly twisted herb garlic dough knots, loaded potato wedges, melted mozzarella sticks, and crisp Caesar salads.",
    image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Beverages & Desserts",
    tag: "Decadent Sweets & Sips",
    itemCount: "9+ Drinks & Sweets",
    description: "Layered espresso tiramisu, Sicilian ricotta cannoli, artisan gelato cups, San Pellegrino sodas, and craft Italian drinks.",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80",
  },
];

export function PizzaCategories() {
  return (
    <section className="py-20 bg-stone-900 text-white relative overflow-hidden border-b border-stone-800">
      {/* Decorative Warm Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-800/80 text-red-400 text-xs font-bold tracking-widest uppercase mb-3">
            <Pizza className="w-3.5 h-3.5 text-amber-400" />
            Flavors For Every Palate
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-[family-name:var(--font-heading)]">
            Explore By <span className="text-red-500">Category</span>
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
            Choose from our 6 official artisanal menu categories. Every single item is handcrafted to order and baked fresh upon your request.
          </p>
        </div>

        {/* Categories Grid (6 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative bg-stone-950 rounded-2xl overflow-hidden border border-stone-800 hover:border-red-500/60 shadow-lg hover:shadow-2xl hover:shadow-red-950/50 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Category Image Header */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                {/* Tag pill */}
                <span className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-sm border border-stone-700/60 text-amber-400 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow">
                  {cat.tag}
                </span>

                {/* Recipe count pill */}
                <span className="absolute top-3 right-3 bg-red-600/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                  {cat.itemCount}
                </span>

                {/* Category Name Overlaid on Image Bottom */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-red-600 text-white shrink-0">
                    {idx < 4 ? (
                      <Pizza className="w-4 h-4" />
                    ) : (
                      <Utensils className="w-4 h-4" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white font-[family-name:var(--font-heading)] group-hover:text-red-400 transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Description & Action Link */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mb-5">
                  {cat.description}
                </p>

                <Link
                  href={`/menu?category=${encodeURIComponent(cat.name)}`}
                  className="inline-flex items-center justify-between w-full py-2.5 px-4 rounded-xl bg-stone-900 group-hover:bg-red-600 text-stone-200 group-hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300"
                >
                  <span>Explore {cat.name}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quick Search Navigation Bar */}
        <div className="mt-14 p-6 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <Pizza className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-[family-name:var(--font-heading)]">
                Looking for something specific?
              </h4>
              <p className="text-xs text-stone-400">
                Filter by dietary choices, custom crust styles, or search by your nearest restaurant location.
              </p>
            </div>
          </div>

          <Link
            href="/menu"
            className="shrink-0 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black uppercase text-xs tracking-wider px-6 py-3 rounded-xl transition-all shadow hover:shadow-amber-500/20 font-[family-name:var(--font-heading)]"
          >
            <span>Open Menu Filters</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

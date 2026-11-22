"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Pizza, ArrowRight, Utensils, Flame } from "lucide-react";

interface CategoryCard {
  name: string;
  tag: string;
  itemCount: string;
  description: string;
  image: string;
  status: string;
  highlight: string;
}

const CATEGORIES: CategoryCard[] = [
  {
    name: "Classic Pizzas",
    tag: "Traditional Stone-Baked",
    itemCount: "12+ Recipes",
    status: "90s Wood-Fired",
    highlight: "Top Rated",
    description: "Authentic Neapolitan recipes featuring buffalo mozzarella, aromatic sweet basil, and slow-simmered San Marzano tomato sauce.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Vegetarian Pizzas",
    tag: "Farm-Fresh & Organic",
    itemCount: "8+ Recipes",
    status: "100% Plant & Dairy",
    highlight: "Health Choice",
    description: "Loaded with baby spinach, fire-roasted peppers, kalamata olives, marinated artichoke hearts, and aged Greek feta.",
    image: "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Meat Lovers",
    tag: "Carnivore Feast",
    itemCount: "15+ Recipes",
    status: "Crisp-Cupped Pepperoni",
    highlight: "Hearty Feast",
    description: "Crispy-cupped beef pepperoni, spicy Calabrian soppressata, hickory smoked BBQ chicken, and seasoned beef meatballs.",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Specialty / Gourmet Pizzas",
    tag: "Artisan Chef Creations",
    itemCount: "10+ Recipes",
    status: "White Truffle Glaze",
    highlight: "Chef Reserve",
    description: "Infused with fragrant white truffle oil, wild forest mushrooms, prosciutto di Parma, gorgonzola dolce, and hot chili honey.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Sides & Appetizers",
    tag: "Golden & Crispy",
    itemCount: "14+ Dishes",
    status: "Garlic Herb Butter",
    highlight: "Crunchy Sides",
    description: "Freshly twisted herb garlic dough knots, loaded potato wedges, melted mozzarella sticks, and crisp Caesar salads.",
    image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Beverages & Desserts",
    tag: "Decadent Sweets & Sips",
    itemCount: "9+ Drinks & Sweets",
    status: "Fresh Italian Gelato",
    highlight: "Sweet Sips",
    description: "Layered espresso tiramisu, Sicilian ricotta cannoli, artisan gelato cups, San Pellegrino sodas, and craft Italian drinks.",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80",
  },
];

export function PizzaCategories() {
  return (
    <section className="py-20 bg-muted/40 dark:bg-muted/10 text-foreground relative overflow-hidden border-b border-border">
      {/* Subtle ambient warm lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(220,38,38,0.06),rgba(245,158,11,0.04),transparent_75%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black tracking-widest uppercase mb-4 shadow-sm">
            <Flame className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>Flavors For Every Palate</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-foreground font-[family-name:var(--font-heading)] leading-tight">
            Explore By <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-rose-600 to-amber-500">Category</span>
          </h2>

          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Choose from our 6 official artisanal menu categories. Every single recipe is stone-baked to order with hand-stretched dough and slow-simmered San Marzano sauce.
          </p>
        </div>

        {/* Categories Grid (6 Adaptive Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative bg-card text-card-foreground rounded-3xl overflow-hidden border border-border/80 hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Category Image Header */}
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                
                {/* Vignette Overlay for photo readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

                {/* Top-Left Tag Pill */}
                <div className="absolute top-3.5 left-3.5 backdrop-blur-md bg-black/60 border border-white/20 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>{cat.tag}</span>
                </div>

                {/* Top-Right Recipe Count Pill */}
                <div className="absolute top-3.5 right-3.5 bg-primary text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm">
                  {cat.itemCount}
                </div>

                {/* Category Name Overlaid on Image Bottom */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-rose-600 text-white flex items-center justify-center shrink-0 shadow-md">
                    {idx < 4 ? (
                      <Pizza className="w-4 h-4 text-white" />
                    ) : (
                      <Utensils className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block leading-tight">
                      {cat.highlight}
                    </span>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white font-[family-name:var(--font-heading)] drop-shadow-sm">
                      {cat.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Description & Status Footer */}
              <div className="p-5 flex flex-col flex-1 justify-between space-y-4 bg-card">
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  {cat.description}
                </p>

                {/* Live Culinary Status Chip */}
                <div className="flex items-center justify-between pt-2 border-t border-border/70 text-[11px]">
                  <span className="flex items-center gap-1.5 text-muted-foreground font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{cat.status}</span>
                  </span>
                  <span className="text-primary font-bold uppercase tracking-wider text-[10px]">
                    Available Today
                  </span>
                </div>

                {/* Action Link Button */}
                <Link
                  href={`/menu?category=${encodeURIComponent(cat.name)}`}
                  className="inline-flex items-center justify-between w-full py-2.5 px-4 rounded-xl bg-muted hover:bg-primary text-foreground hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm group/btn cursor-pointer"
                >
                  <span>Explore {cat.name}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quick Search Navigation Bar */}
        <div className="mt-14 p-6 sm:p-7 rounded-3xl bg-card border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Pizza className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="text-base font-bold text-foreground uppercase tracking-wider font-[family-name:var(--font-heading)]">
                Looking for something specific?
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Filter by dietary choices, custom crust styles, or search by your nearest restaurant location.
              </p>
            </div>
          </div>

          <Link
            href="/menu"
            className="shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-primary to-rose-600 hover:from-primary/95 hover:to-rose-500 text-white font-black uppercase text-xs tracking-wider px-7 py-3.5 rounded-xl transition-all shadow-md hover:scale-105 font-[family-name:var(--font-heading)] cursor-pointer"
          >
            <span>Open Menu Filters</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

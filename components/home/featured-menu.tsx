"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Flame, MapPin, Store, ArrowRight, Star } from "lucide-react";
import { MenuItem } from "@/lib/types";

// Curated fallback approved items ensuring immediate visual excellence
const FALLBACK_FEATURED_ITEMS: MenuItem[] = [
  {
    _id: "655000000000000000000011",
    vendorId: "655000000000000000000001",
    vendorEmail: "bellanapoli@pizzahub.com",
    vendorName: "Bella Napoli Kitchen",
    itemName: "Classic Margherita Rustica",
    category: "Classic Pizzas",
    description: "San Marzano tomato sauce, fresh buffalo mozzarella, aromatic sweet basil leaves, and cold-pressed olive oil baked in an 800°F stone oven.",
    price: 14.99,
    location: "Downtown Manhattan, NY",
    images: ["https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80"],
    status: "approved",
  },
  {
    _id: "655000000000000000000012",
    vendorId: "655000000000000000000001",
    vendorEmail: "bellanapoli@pizzahub.com",
    vendorName: "Bella Napoli Kitchen",
    itemName: "Double Pepperoni Inferno",
    category: "Meat Lovers",
    description: "Loaded with crispy-cupped spicy Italian beef pepperoni, aged Wisconsin mozzarella, smoked provolone, and signature slow-simmered marinara.",
    price: 18.50,
    location: "Downtown Manhattan, NY",
    images: ["https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80"],
    status: "approved",
  },
  {
    _id: "655000000000000000000013",
    vendorId: "655000000000000000000002",
    vendorEmail: "woodfire@pizzahub.com",
    vendorName: "Artisan Woodfire Pizzeria",
    itemName: "Smoked Truffle & Wild Mushroom",
    category: "Specialty / Gourmet Pizzas",
    description: "Roasted cremini, shiitake and oyster mushrooms infused with white truffle olive oil, creamy taleggio cheese, and roasted garlic cream.",
    price: 21.99,
    location: "Brooklyn Heights, NY",
    images: ["https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"],
    status: "approved",
  },
  {
    _id: "655000000000000000000014",
    vendorId: "655000000000000000000002",
    vendorEmail: "woodfire@pizzahub.com",
    vendorName: "Artisan Woodfire Pizzeria",
    itemName: "Smoky BBQ Pulled Chicken",
    category: "Meat Lovers",
    description: "Tender hickory smoked barbecue pulled chicken, sweet caramelized red onions, sharp aged cheddar blend, and smoky bourbon BBQ drizzle.",
    price: 19.25,
    location: "Brooklyn Heights, NY",
    images: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80"],
    status: "approved",
  },
  {
    _id: "655000000000000000000015",
    vendorId: "655000000000000000000001",
    vendorEmail: "bellanapoli@pizzahub.com",
    vendorName: "Bella Napoli Kitchen",
    itemName: "Mediterranean Garden Feast",
    category: "Vegetarian Pizzas",
    description: "Baby spinach, kalamata olives, fire-roasted sweet bell peppers, marinated artichoke hearts, sundried tomatoes, and crumbled Greek feta.",
    price: 16.75,
    location: "Downtown Manhattan, NY",
    images: ["https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80"],
    status: "approved",
  },
  {
    _id: "655000000000000000000016",
    vendorId: "655000000000000000000002",
    vendorEmail: "woodfire@pizzahub.com",
    vendorName: "Artisan Woodfire Pizzeria",
    itemName: "Fiery Calabrian Salami",
    category: "Meat Lovers",
    description: "Spicy Calabrian soppressata, crushed red hot chili flakes, roasted red peppers, creamy ricotta dollops, hot honey drizzle, and fresh mozzarella.",
    price: 20.50,
    location: "Brooklyn Heights, NY",
    images: ["https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80"],
    status: "approved",
  },
];

export function FeaturedMenu() {
  const [items, setItems] = useState<MenuItem[]>(FALLBACK_FEATURED_ITEMS);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchFeatured() {
      try {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://pizzahub-server-pearl.vercel.app";
        const res = await fetch(`${serverUrl}/api/menu/featured`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            if (data.items && data.items.length >= 4) {
              setItems(data.items);
            } else {
              setItems(FALLBACK_FEATURED_ITEMS);
            }
          }
        } else {
          if (isMounted) setItems(FALLBACK_FEATURED_ITEMS);
        }
      } catch (err) {
        console.warn("Could not reach backend /api/menu/featured, using curated fallback:", err);
        if (isMounted) setItems(FALLBACK_FEATURED_ITEMS);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-stone-50 via-white to-stone-100/60 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 border-b border-stone-200/80 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-xs font-bold tracking-widest uppercase mb-3">
            <Flame className="w-3.5 h-3.5 animate-pulse text-amber-500 fill-amber-500" />
            Fresh From Our Brick Ovens
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
            Featured <span className="text-red-600 dark:text-red-500">Craft Pizzas</span>
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Every pizza is hand-stretched, loaded with artisanal local toppings, and baked on volcanic stone for that signature bubbly, blistered crust.
          </p>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-sm animate-pulse"
              >
                <div className="h-56 bg-stone-200 dark:bg-stone-800" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/3" />
                  <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded w-3/4" />
                  <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-full" />
                  <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-2/3" />
                  <div className="h-10 bg-stone-200 dark:bg-stone-800 rounded-xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Menu Cards Grid */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {items.slice(0, 6).map((item, index) => (
              <motion.div
                key={item._id || index}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="group flex flex-col bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200/90 dark:border-stone-800/90 hover:border-red-500/40 dark:hover:border-red-500/40 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image Container with Badges */}
                <div className="relative h-60 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <Image
                    src={
                      item.images && item.images[0]
                        ? item.images[0]
                        : "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80"
                    }
                    alt={item.itemName}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    {item.category}
                  </span>

                  {/* Price Tag Pill */}
                  <span className="absolute top-3 right-3 bg-stone-900/90 backdrop-blur-sm text-amber-400 border border-amber-500/30 font-black text-sm px-3 py-1 rounded-full shadow-md font-[family-name:var(--font-heading)]">
                    ${item.price.toFixed(2)}
                  </span>

                  {/* Rating / Quality Badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-stone-800 dark:text-stone-200 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>4.9</span>
                    <span className="text-stone-400 text-[10px]">(120+)</span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Item Name */}
                    <h3 className="text-xl font-bold uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)] group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {item.itemName}
                    </h3>

                    {/* Short Description */}
                    <p className="mt-2 text-stone-600 dark:text-stone-300 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Location & Vendor Meta */}
                    <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800/80 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
                        <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-stone-700 dark:text-stone-300">
                        <Store className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">Kitchen: {item.vendorName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button: View Details */}
                  <div className="mt-6 pt-2">
                    <Link
                      href={`/menu/${item._id}`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-stone-900 dark:bg-stone-800 hover:bg-red-600 dark:hover:bg-red-600 text-white font-bold uppercase tracking-wider text-xs py-3 px-4 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md group-hover:bg-red-600"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View All Menu CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-wider text-sm sm:text-base px-8 py-4 rounded-full shadow-lg hover:shadow-red-600/30 hover:scale-105 transition-all duration-300 font-[family-name:var(--font-heading)]"
          >
            <span>Explore Full Pizza Menu</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
            Over 40+ handcrafted recipes with custom crusts, dips, and sides.
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { MapPin, Store, ArrowRight, Star } from "lucide-react";
import { MenuItem } from "@/lib/types";
import { useAuth } from "@/lib/auth-helpers";
import { toast } from "sonner";

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.info("Please sign in to view pizza details and place an order.");
      router.push(`/signin?callbackUrl=/menu/${item._id}`);
    } else {
      router.push(`/menu/${item._id}`);
    }
  };

  const imageUrl =
    item.images && item.images.length > 0 && item.images[0]
      ? item.images[0]
      : "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group flex flex-col bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200/90 dark:border-stone-800/90 hover:border-red-500/50 dark:hover:border-red-500/50 shadow-sm hover:shadow-xl transition-all duration-300 h-full"
    >
      {/* Image Area */}
      <div className="relative h-56 w-full overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0">
        <Image
          src={imageUrl}
          alt={item.itemName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Category Pill */}
        <span className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md z-10">
          {item.category}
        </span>

        {/* Price Tag */}
        <span className="absolute top-3 right-3 bg-stone-900/90 backdrop-blur-sm text-amber-400 border border-amber-500/30 font-black text-sm px-3 py-1 rounded-full shadow-md font-[family-name:var(--font-heading)] z-10">
          ${item.price.toFixed(2)}
        </span>

        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-stone-800 dark:text-stone-200 shadow-sm z-10">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>4.9</span>
          <span className="text-stone-400 text-[10px]">(90+)</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Item Name */}
          <h3
            onClick={handleAction}
            className="text-xl font-bold uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)] group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors cursor-pointer line-clamp-1"
          >
            {item.itemName}
          </h3>

          {/* Description */}
          <p className="mt-2 text-stone-600 dark:text-stone-300 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Location & Kitchen Meta */}
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

        {/* View Details Button */}
        <div className="mt-6 pt-2">
          <button
            onClick={handleAction}
            className="w-full inline-flex items-center justify-center gap-2 bg-stone-900 dark:bg-stone-800 hover:bg-red-600 dark:hover:bg-red-600 text-white font-bold uppercase tracking-wider text-xs py-3 px-4 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md group-hover:bg-red-600 cursor-pointer"
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

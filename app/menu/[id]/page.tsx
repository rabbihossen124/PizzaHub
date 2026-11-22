"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Flame,
  MapPin,
  Store,
  ArrowLeft,
  Star,
  ShieldCheck,
  Clock,
  AlertTriangle,
  ShieldAlert,
  Pizza,
  CheckCircle2,
} from "lucide-react";
import { MenuItem } from "@/lib/types";
import { useAuth } from "@/lib/auth-helpers";
import { OrderModal } from "@/components/menu/order-modal";

// Fallback items in case server is cold-starting
const FALLBACK_ITEMS: MenuItem[] = [
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
    images: [
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    ],
    status: "approved",
  },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ItemDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const itemId = resolvedParams.id;
  const router = useRouter();

  const { user, isAuthenticated, isLoading: authLoading, isAdmin } = useAuth();

  const [item, setItem] = useState<MenuItem | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Authentication Guard: Redirect logged-out users to Sign In
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push(`/signin?callbackUrl=/menu/${itemId}`);
    }
  }, [authLoading, isAuthenticated, itemId, router]);

  // Fetch item details
  useEffect(() => {
    let isMounted = true;
    async function fetchItem() {
      setIsLoading(true);
      setError(null);

      try {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://pizzahub-server-pearl.vercel.app";
        const res = await fetch(`${serverUrl}/api/menu/${itemId}`);

        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.item) {
            setItem(data.item);
            const initialImg =
              Array.isArray(data.item.images) && data.item.images.length > 0
                ? data.item.images[0]
                : typeof data.item.images === "string"
                ? data.item.images
                : "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80";
            setSelectedImage(initialImg);
          }
        } else {
          // Check fallback list if server is offline or mock ID
          const fallback = FALLBACK_ITEMS.find((f) => f._id === itemId) || FALLBACK_ITEMS[0];
          if (fallback && isMounted) {
            setItem(fallback);
            setSelectedImage(fallback.images[0]);
          } else if (isMounted) {
            setError("Invalid menu item ID or the item is no longer available.");
          }
        }
      } catch (err) {
        console.warn("Could not reach server, checking fallback items:", err);
        const fallback = FALLBACK_ITEMS.find((f) => f._id === itemId) || FALLBACK_ITEMS[0];
        if (fallback && isMounted) {
          setItem(fallback);
          setSelectedImage(fallback.images[0]);
        } else if (isMounted) {
          setError("Failed to load pizza details. Please check your connection.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    if (itemId) {
      fetchItem();
    }

    return () => {
      isMounted = false;
    };
  }, [itemId]);

  // Loading State
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3 text-stone-600 dark:text-stone-300">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold uppercase tracking-wider font-[family-name:var(--font-heading)]">
            Loading Artisan Pizza Details...
          </p>
        </div>
      </div>
    );
  }

  // Error / Not Found State
  if (error || !item) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 text-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-4">
            <Pizza className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
            Item Not Found
          </h2>
          <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
            {error || "The pizza you are looking for does not exist or has been removed."}
          </p>
          <div className="mt-6">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-full transition-all shadow hover:shadow-red-600/30"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Browse Menu</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Role validation flags
  const isVendorOwner =
    Boolean(user?.id && item.vendorId && String(user.id) === String(item.vendorId)) ||
    Boolean(user?.email && item.vendorEmail && user.email.toLowerCase() === item.vendorEmail.toLowerCase());
  const isApproved = item.status === "approved";

  const allImages =
    Array.isArray(item.images) && item.images.length > 0
      ? item.images
      : [selectedImage || "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80"];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <Link href="/" className="hover:text-red-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/menu" className="hover:text-red-600 transition-colors">
            Browse Menu
          </Link>
          <span>/</span>
          <span className="text-stone-900 dark:text-white font-semibold truncate max-w-[200px]">
            {item.itemName}
          </span>
        </div>

        {/* Back Button */}
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 hover:text-red-600 dark:hover:text-red-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Pizzas</span>
        </Link>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Image Gallery (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Main Image */}
            <div className="relative h-96 sm:h-[450px] w-full rounded-3xl overflow-hidden bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-lg">
              <Image
                src={selectedImage || allImages[0]}
                alt={item.itemName}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Category Pill */}
              <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg">
                {item.category}
              </span>

              {/* Status Pill */}
              <span className="absolute top-4 right-4 bg-stone-950/90 text-green-400 border border-green-500/30 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {item.status.toUpperCase()}
              </span>
            </div>

            {/* Thumbnail Carousel / Grid */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {allImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImage === imgUrl
                        ? "border-red-600 ring-2 ring-red-600/30 scale-105"
                        : "border-stone-200 dark:border-stone-800 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`${item.itemName} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Item Information & Ordering Actions (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  Authentic Neapolitan Recipe
                </span>
                <span className="text-stone-300 dark:text-stone-700">•</span>
                <div className="flex items-center gap-1 text-xs text-stone-700 dark:text-stone-300 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9 (120+ reviews)</span>
                </div>
              </div>

              {/* Item Name */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
                {item.itemName}
              </h1>

              {/* Price Tag */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-red-600 dark:text-red-500 font-[family-name:var(--font-heading)]">
                  ${item.price.toFixed(2)}
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  Tax included • Free 30-min delivery
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Recipe & Ingredients
              </h3>
              <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Kitchen & Location Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    Kitchen Location
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200 truncate">
                    {item.location}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center shrink-0">
                  <Store className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    Artisan Vendor
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200 truncate">
                    {item.vendorName}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Action Card & Role Safeguards */}
            <div className="p-6 rounded-3xl bg-stone-900 text-white border border-stone-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight font-[family-name:var(--font-heading)]">
                    Ready to Enjoy?
                  </h3>
                  <p className="text-xs text-stone-400">
                    Direct order dispatched to kitchen upon confirmation.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs uppercase text-amber-400 font-bold block">
                    Fast Delivery
                  </span>
                  <span className="text-xs text-stone-300">Within 30 Mins</span>
                </div>
              </div>

              {/* Safeguard 1: Administrator cannot place food orders */}
              {isAdmin && (
                <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-800/80 text-amber-300 text-xs flex items-center gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <strong>Administrator Notice:</strong> Platform administrators cannot place customer food orders.
                  </div>
                </div>
              )}

              {/* Safeguard 2: Vendor cannot order their own item */}
              {!isAdmin && isVendorOwner && (
                <div className="p-4 rounded-2xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                  <div>
                    <strong>Vendor Restriction:</strong> You cannot place an order for your own menu item.
                  </div>
                </div>
              )}

              {/* Safeguard 3: Only approved items can be ordered */}
              {!isApproved && (
                <div className="p-4 rounded-2xl bg-stone-800 text-stone-300 text-xs flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    This menu item is currently pending approval or inactive and cannot be ordered.
                  </div>
                </div>
              )}

              {/* Valid Customer Order Action Button */}
              {!isAdmin && !isVendorOwner && isApproved && (
                <button
                  onClick={() => setIsOrderModalOpen(true)}
                  className="w-full py-4 px-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-wider text-sm sm:text-base transition-all shadow-xl hover:shadow-red-600/30 hover:scale-[1.02] flex items-center justify-center gap-2 font-[family-name:var(--font-heading)] cursor-pointer"
                >
                  <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
                  <span>Order This Pizza Now (${item.price.toFixed(2)})</span>
                </button>
              )}
            </div>

            {/* Quality Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs text-stone-600 dark:text-stone-400">
              <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <Flame className="w-4 h-4 text-red-600 mx-auto mb-1" />
                <span className="font-semibold block">800°F Stone Oven</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <Clock className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                <span className="font-semibold block">30-Min Guarantee</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <ShieldCheck className="w-4 h-4 text-green-500 mx-auto mb-1" />
                <span className="font-semibold block">100% Organic D.O.P.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Order Placement Modal (Part 12) */}
      <OrderModal
        item={item}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </div>
  );
}

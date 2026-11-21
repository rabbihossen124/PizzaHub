"use client";

import { useEffect, useState, useTransition, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Filter,
  RotateCcw,
  Pizza,
  Flame,
  ArrowUpDown,
  ArrowUpNarrowWide,
  ArrowDownWideNarrow,
  Sparkles,
} from "lucide-react";
import { MenuItem, MENU_CATEGORIES } from "@/lib/types";
import { MenuCard } from "@/components/menu/menu-card";

// Curated approved items fallback to guarantee robustness if server is cold-starting
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
  {
    _id: "655000000000000000000017",
    vendorId: "655000000000000000000001",
    vendorEmail: "bellanapoli@pizzahub.com",
    vendorName: "Bella Napoli Kitchen",
    itemName: "Parmesan Herb Garlic Knots",
    category: "Sides & Appetizers",
    description: "Freshly baked golden dough knots tossed in rich garlic butter, toasted Italian herbs, grated aged Parmigiano-Reggiano, with warm marinara.",
    price: 8.99,
    location: "Downtown Manhattan, NY",
    images: ["https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80"],
    status: "approved",
  },
  {
    _id: "655000000000000000000018",
    vendorId: "655000000000000000000002",
    vendorEmail: "woodfire@pizzahub.com",
    vendorName: "Artisan Woodfire Pizzeria",
    itemName: "Classic Espresso Tiramisu",
    category: "Beverages & Desserts",
    description: "Traditional layered Italian dessert featuring delicate ladyfinger biscuits soaked in rich espresso, sweet mascarpone cream, and dark cocoa.",
    price: 7.50,
    location: "Brooklyn Heights, NY",
    images: ["https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80"],
    status: "approved",
  },
];

const DEFAULT_LOCATIONS = [
  "Downtown Manhattan, NY",
  "Brooklyn Heights, NY",
  "Queens Astoria, NY",
  "Jersey City, NJ",
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest Arrivals", short: "Newest" },
  { value: "price_asc", label: "Price: Low to High", short: "$ Low → High" },
  { value: "price_desc", label: "Price: High to Low", short: "$ High → Low" },
  { value: "name_asc", label: "Alphabetical (A - Z)", short: "A → Z" },
];

function BrowseMenuContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";
  const initialLocation = searchParams.get("location") || "All";
  const initialSort = searchParams.get("sort") || "newest";

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState(initialLocation);
  const [sort, setSort] = useState(initialSort);

  const [items, setItems] = useState<MenuItem[]>([]);
  const [locationsList, setLocationsList] = useState<string[]>(DEFAULT_LOCATIONS);
  const [isLoading, setIsLoading] = useState(true);

  // Sync state with URL search params changes
  useEffect(() => {
    const cat = searchParams.get("category") || "All";
    const q = searchParams.get("search") || "";
    const loc = searchParams.get("location") || "All";
    const s = searchParams.get("sort") || "newest";

    setCategory(cat);
    setSearch(q);
    setLocation(loc);
    setSort(s);
  }, [searchParams]);

  // Fetch locations metadata once
  useEffect(() => {
    async function fetchMeta() {
      try {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
        const res = await fetch(`${serverUrl}/api/menu/meta`);
        if (res.ok) {
          const data = await res.json();
          if (data.locations && data.locations.length > 0) {
            setLocationsList(data.locations);
          }
        }
      } catch (err) {
        console.warn("Could not fetch locations meta, using defaults:", err);
      }
    }
    fetchMeta();
  }, []);

  // Fetch filtered & sorted items through backend API query parameters
  useEffect(() => {
    let isMounted = true;
    async function loadMenu() {
      setIsLoading(true);
      try {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
        const queryParts: string[] = [];

        if (search.trim()) queryParts.push(`search=${encodeURIComponent(search.trim())}`);
        if (category !== "All") queryParts.push(`category=${encodeURIComponent(category)}`);
        if (location !== "All") queryParts.push(`location=${encodeURIComponent(location)}`);
        if (sort) queryParts.push(`sort=${encodeURIComponent(sort)}`);

        const qs = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
        const res = await fetch(`${serverUrl}/api/menu${qs}`, {
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            if (data.items) {
              setItems(data.items);
            } else {
              setItems([]);
            }
          }
        } else {
          // Filter & sort fallback items client-side if server is unavailable
          filterFallback();
        }
      } catch (err) {
        console.warn("Server unavailable, using filtered fallback:", err);
        filterFallback();
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    function filterFallback() {
      if (!isMounted) return;
      let filtered = [...FALLBACK_ITEMS];

      if (category !== "All") {
        filtered = filtered.filter((i) => i.category === category);
      }
      if (location !== "All") {
        filtered = filtered.filter((i) =>
          i.location.toLowerCase().includes(location.toLowerCase())
        );
      }
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        filtered = filtered.filter(
          (i) =>
            i.itemName.toLowerCase().includes(q) ||
            i.description.toLowerCase().includes(q) ||
            i.location.toLowerCase().includes(q)
        );
      }

      // Apply client-side sorting fallback matching backend logic
      if (sort === "price_asc") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sort === "price_desc") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sort === "name_asc") {
        filtered.sort((a, b) => a.itemName.localeCompare(b.itemName));
      }

      setItems(filtered);
    }

    loadMenu();
    return () => {
      isMounted = false;
    };
  }, [search, category, location, sort]);

  // Update query params in URL when user changes filters or sorting, preserving other parameters
  const updateUrl = (newCat: string, newLoc: string, newSearch: string, newSort: string) => {
    startTransition(() => {
      const params = new URLSearchParams();
      if (newCat !== "All") params.set("category", newCat);
      if (newLoc !== "All") params.set("location", newLoc);
      if (newSearch.trim()) params.set("search", newSearch.trim());
      if (newSort !== "newest") params.set("sort", newSort);

      const queryString = params.toString();
      router.push(`/menu${queryString ? `?${queryString}` : ""}`, { scroll: false });
    });
  };

  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    updateUrl(newCat, location, search, sort);
  };

  const handleLocationChange = (newLoc: string) => {
    setLocation(newLoc);
    updateUrl(category, newLoc, search, sort);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    updateUrl(category, location, val, sort);
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    updateUrl(category, location, search, newSort);
  };

  const handleResetFilters = () => {
    setSearch("");
    setCategory("All");
    setLocation("All");
    setSort("newest");
    startTransition(() => {
      router.push("/menu", { scroll: false });
    });
  };

  const hasActiveFilters =
    search.trim() !== "" || category !== "All" || location !== "All" || sort !== "newest";

  const currentSortLabel =
    SORT_OPTIONS.find((s) => s.value === sort)?.label || "Newest Arrivals";

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col">
      {/* 1. Caferio-Styled Hero Header */}
      <section className="bg-stone-900 text-white py-14 sm:py-16 relative overflow-hidden border-b border-stone-800">
        <div className="absolute inset-0 bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-800/80 text-red-400 text-xs font-bold tracking-widest uppercase mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Wood-Fired Pizza Kitchen
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-[family-name:var(--font-heading)]">
            Explore Our <span className="text-red-500">Handcrafted Menu</span>
          </h1>
          <p className="mt-3 text-stone-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Fresh fermented dough, San Marzano sauce, and volcanic stone baking. Filter by your favorite category, nearest location, or sort by price.
          </p>
        </div>
      </section>

      {/* 2. Search & Filter Bar with Challenge 1: Advanced Price Sorting */}
      <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 sticky top-16 sm:top-20 z-20 shadow-sm backdrop-blur-md bg-white/95 dark:bg-stone-900/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-center">
            {/* Search Input (5 Cols on LG) */}
            <div className="lg:col-span-4 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search pizza by name, crust, ingredients..."
                value={search}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
              />
              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    updateUrl(category, location, "", sort);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Dropdown (3 Cols on LG) */}
            <div className="lg:col-span-3 relative">
              <div className="relative">
                <Filter className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  aria-label="Filter by Pizza Category"
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all cursor-pointer appearance-none"
                >
                  <option value="All">All Categories</option>
                  {MENU_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Location Selector (2.5 Cols on LG) */}
            <div className="lg:col-span-2.5 relative">
              <div className="relative">
                <MapPin className="w-4 h-4 text-red-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  aria-label="Filter by Restaurant Location"
                  value={location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all cursor-pointer appearance-none"
                >
                  <option value="All">All Locations</option>
                  {locationsList.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Challenge 1: Price Sorting Dropdown (2.5 Cols on LG) */}
            <div className="lg:col-span-2.5 relative">
              <div className="relative">
                <ArrowUpDown className="w-4 h-4 text-amber-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  aria-label="Sort Pizzas by Price or Newest"
                  value={sort}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-amber-500/40 dark:border-amber-500/40 bg-amber-500/5 dark:bg-amber-950/20 text-sm font-semibold text-stone-900 dark:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all cursor-pointer appearance-none"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="text-stone-900 dark:text-white bg-white dark:bg-stone-900 font-normal">
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-amber-500 text-xs">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* Quick Price Sort Buttons & Category Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {/* Category Pills (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              <button
                onClick={() => handleCategoryChange("All")}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                  category === "All"
                    ? "bg-red-600 text-white shadow-sm"
                    : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
                }`}
              >
                All
              </button>
              {MENU_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                    category === cat
                      ? "bg-red-600 text-white shadow-sm"
                      : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick Price Sort Toggle Buttons (Challenge Requirement 1) */}
            <div className="flex items-center gap-1.5 shrink-0 bg-stone-100 dark:bg-stone-800/80 p-1 rounded-xl text-xs font-bold">
              <span className="text-stone-400 px-2 uppercase text-[10px] tracking-wider">Sort:</span>
              <button
                onClick={() => handleSortChange("price_asc")}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  sort === "price_asc"
                    ? "bg-amber-500 text-stone-950 font-black shadow-sm"
                    : "text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white"
                }`}
              >
                <ArrowUpNarrowWide className="w-3 h-3" />
                <span>Price: Low → High</span>
              </button>
              <button
                onClick={() => handleSortChange("price_desc")}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  sort === "price_desc"
                    ? "bg-amber-500 text-stone-950 font-black shadow-sm"
                    : "text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white"
                }`}
              >
                <ArrowDownWideNarrow className="w-3 h-3" />
                <span>Price: High → Low</span>
              </button>
            </div>
          </div>

          {/* Active Filter Indicators & Visible Sort Badge (Challenge Requirement 1) */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs border-t border-stone-100 dark:border-stone-800/60">
            <div className="flex flex-wrap items-center gap-2 text-stone-500 dark:text-stone-400">
              <span>
                Showing{" "}
                <strong className="text-stone-900 dark:text-white">
                  {items.length}
                </strong>{" "}
                approved items
              </span>

              {/* Clearly Visible Active Sort Badge */}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 font-bold">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Sorted by: {currentSortLabel}
              </span>

              {category !== "All" && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/60 font-semibold">
                  Category: {category}
                </span>
              )}
              {location !== "All" && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold">
                  Location: {location}
                </span>
              )}
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-red-600 dark:text-red-400 hover:underline font-bold text-xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset All Filters & Sort
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Items Results Grid / Loading / Empty State */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-sm animate-pulse"
              >
                <div className="h-56 bg-stone-200 dark:bg-stone-800" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/3" />
                  <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded w-3/4" />
                  <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-full" />
                  <div className="h-10 bg-stone-200 dark:bg-stone-800 rounded-xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && items.length === 0 && (
          <div className="text-center py-20 px-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-4">
              <Pizza className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              No Pizzas Found
            </h3>
            <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
              We couldn't find any approved menu items matching your search and sort criteria. Try adjusting your search term, category, or location filter.
            </p>
            <div className="mt-6">
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-full transition-all shadow hover:shadow-red-600/30 font-[family-name:var(--font-heading)] cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset All Filters</span>
              </button>
            </div>
          </div>
        )}

        {/* Items Grid */}
        {!isLoading && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {items.map((item) => (
              <MenuCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function BrowseMenuPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold text-stone-600 dark:text-stone-400">
              Loading PizzaHub Menu...
            </p>
          </div>
        </div>
      }
    >
      <BrowseMenuContent />
    </Suspense>
  );
}

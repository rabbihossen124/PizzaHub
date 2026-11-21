"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Pizza,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Check,
  X,
  MapPin,
  Building2,
  Loader2,
  AlertTriangle,
  Flame,
} from "lucide-react";
import { useAuth } from "@/lib/auth-helpers";
import { toast } from "sonner";

interface AdminMenuItem {
  _id: string;
  itemName: string;
  category: string;
  price: number;
  image: string;
  description: string;
  location: string;
  status: "approved" | "pending" | "rejected" | "inactive";
  vendorId: string;
  vendorName: string;
  vendorEmail: string;
  createdAt: string;
}

const CATEGORIES = [
  "All",
  "Neapolitan Pizza",
  "New York-Style Pizza",
  "Sicilian Pizza",
  "Chicago Deep-Dish",
  "Detroit-Style Pizza",
  "Artisan Flatbreads",
];

export default function AdminMenuPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<AdminMenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [deletingItem, setDeletingItem] = useState<AdminMenuItem | null>(null);

  const fetchMenuItems = async () => {
    setIsLoading(true);
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      const jwtToken = token || (typeof window !== "undefined" ? localStorage.getItem("pizzahub_jwt") : "");

      const params = new URLSearchParams();
      if (searchTerm.trim()) params.append("search", searchTerm.trim());
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (categoryFilter !== "All") params.append("category", categoryFilter);

      const qs = params.toString() ? `?${params.toString()}` : "";

      const res = await fetch(`${serverUrl}/api/admin/menu${qs}`, {
        headers: {
          "Content-Type": "application/json",
          ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
        },
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.items)) {
          setItems(data.items);
        }
      } else {
        toast.error("Failed to load menu queue.");
      }
    } catch (err) {
      console.error("Fetch menu items error:", err);
      toast.error("Network error while retrieving menu items.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [searchTerm, statusFilter, categoryFilter, token]);

  // Handle status update (approve / reject)
  const handleUpdateStatus = async (id: string, newStatus: "approved" | "rejected") => {
    setProcessingId(id);
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      const jwtToken = token || (typeof window !== "undefined" ? localStorage.getItem("pizzahub_jwt") : "");

      const res = await fetch(`${serverUrl}/api/admin/menu/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`Pizza status updated to ${newStatus}.`);
        fetchMenuItems();
      } else {
        toast.error(data.message || `Failed to ${newStatus} item.`);
      }
    } catch (err) {
      console.error("Update status error:", err);
      toast.error("Network error while updating menu item.");
    } finally {
      setProcessingId(null);
    }
  };

  // Handle delete item
  const handleDeleteItem = async () => {
    if (!deletingItem) return;
    setProcessingId(deletingItem._id);
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      const jwtToken = token || (typeof window !== "undefined" ? localStorage.getItem("pizzahub_jwt") : "");

      const res = await fetch(`${serverUrl}/api/admin/menu/${deletingItem._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
        },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Menu item removed successfully.");
        setDeletingItem(null);
        fetchMenuItems();
      } else {
        toast.error(data.message || "Failed to delete item.");
      }
    } catch (err) {
      console.error("Delete menu item error:", err);
      toast.error("Network error while deleting item.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-xs font-bold tracking-widest uppercase mb-2">
          <Flame className="w-3.5 h-3.5 text-amber-500" />
          Menu Quality Control
        </div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
          Manage Menu Items
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Review, approve, or reject vendor pizza submissions to maintain high culinary standards.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {["all", "pending", "approved", "rejected"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === st
                  ? "bg-red-600 text-white shadow"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
              }`}
            >
              {st === "all" ? "All Submissions" : st}
            </button>
          ))}
        </div>

        {/* Controls Bar */}
        <div className="p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by pizza name, vendor, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider whitespace-nowrap">
              Category:
            </span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full md:w-auto px-3.5 py-2 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-800 dark:text-stone-200 font-semibold focus:outline-none focus:ring-2 focus:ring-red-500/50 cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 animate-pulse space-y-4"
            >
              <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded w-1/4" />
              <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && items.length === 0 && (
        <div className="py-16 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 space-y-2">
          <Pizza className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto mb-2" />
          <h3 className="text-lg font-bold uppercase tracking-tight text-stone-800 dark:text-stone-200 font-[family-name:var(--font-heading)]">
            No Menu Items Found
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            No items matching the selected filters.
          </p>
        </div>
      )}

      {!isLoading && items.length > 0 && (
        <div className="space-y-4">
          {items.map((it) => {
            const isProcessing = processingId === it._id;

            return (
              <div
                key={it._id}
                className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0 border border-stone-200 dark:border-stone-700">
                      <Image
                        src={
                          it.image ||
                          "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
                        }
                        alt={it.itemName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        {it.category}
                      </span>
                      <h3 className="text-lg font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
                        {it.itemName}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                        <span className="font-bold text-red-600 dark:text-red-500 font-[family-name:var(--font-heading)] text-sm">
                          ${it.price.toFixed(2)}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-stone-400" />
                          {it.vendorName}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-red-500" />
                          {it.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {it.status === "pending" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5" />
                        Pending Review
                      </span>
                    )}
                    {it.status === "approved" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 dark:bg-green-950/60 border border-green-300 dark:border-green-800 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                        Live on Menu
                      </span>
                    )}
                    {it.status === "rejected" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 text-xs font-bold uppercase tracking-wider">
                        <XCircle className="w-3.5 h-3.5 text-red-600" />
                        Rejected
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
                  {it.description}
                </p>

                {/* Actions Bar */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="text-[11px] text-stone-400">
                    Vendor Email: <strong>{it.vendorEmail}</strong>
                  </span>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {/* Approve Button */}
                    {it.status !== "approved" && (
                      <button
                        onClick={() => handleUpdateStatus(it._id, "approved")}
                        disabled={isProcessing}
                        className="flex-1 sm:flex-initial py-2 px-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                    )}

                    {/* Reject Button */}
                    {it.status !== "rejected" && (
                      <button
                        onClick={() => handleUpdateStatus(it._id, "rejected")}
                        disabled={isProcessing}
                        className="flex-1 sm:flex-initial py-2 px-3.5 rounded-xl border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    )}

                    {/* Delete Item Button */}
                    <button
                      onClick={() => setDeletingItem(it)}
                      disabled={isProcessing}
                      className="py-2 px-3 rounded-xl border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-bold transition-colors cursor-pointer"
                      title="Permanently Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Item Confirmation Modal */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              Delete Menu Item?
            </h3>
            <p className="mt-2 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              Are you sure you want to permanently delete <strong>{deletingItem.itemName}</strong> by {deletingItem.vendorName}? This action cannot be reversed.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
                className="flex-1 py-3 px-4 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-bold uppercase text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteItem}
                disabled={Boolean(processingId)}
                className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider shadow flex items-center justify-center gap-1.5 cursor-pointer font-[family-name:var(--font-heading)]"
              >
                {processingId ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

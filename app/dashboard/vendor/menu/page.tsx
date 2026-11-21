"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Pizza,
  PlusCircle,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  MapPin,
  Eye,
  AlertCircle,
  Loader2,
  X,
  DollarSign,
  Tag,
  FileText,
} from "lucide-react";
import { MenuItem, MENU_CATEGORIES } from "@/lib/types";
import { useAuth } from "@/lib/auth-helpers";
import { toast } from "sonner";

export default function VendorMenuItemsPage() {
  const { user, token } = useAuth();

  const [items, setItems] = useState<MenuItem[]>([]);
  const [filterStatus, setFilterStatus] = useState<"all" | "approved" | "pending" | "rejected">("all");
  const [isLoading, setIsLoading] = useState(true);

  // Edit Modal State
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editForm, setEditForm] = useState({
    itemName: "",
    category: "",
    price: "",
    description: "",
    location: "",
  });

  // Delete Modal State
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMyItems = async () => {
    setIsLoading(true);
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      const jwtToken = token || (typeof window !== "undefined" ? localStorage.getItem("pizzahub_jwt") : "");

      const res = await fetch(`${serverUrl}/api/menu/vendor/my-items`, {
        headers: {
          "Content-Type": "application/json",
          ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
        },
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch (err) {
      console.warn("Could not fetch vendor items:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyItems();
  }, [token]);

  // Open Edit Modal
  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setEditForm({
      itemName: item.itemName,
      category: item.category,
      price: item.price.toString(),
      description: item.description,
      location: item.location,
    });
  };

  // Submit Edit Form
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const parsedPrice = parseFloat(editForm.price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    setIsUpdating(true);
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      const jwtToken = token || (typeof window !== "undefined" ? localStorage.getItem("pizzahub_jwt") : "");

      const res = await fetch(`${serverUrl}/api/menu/${editingItem._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
        },
        body: JSON.stringify({
          itemName: editForm.itemName.trim(),
          category: editForm.category,
          price: parsedPrice,
          description: editForm.description.trim(),
          location: editForm.location.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Menu item updated successfully!");
        setEditingItem(null);
        fetchMyItems();
      } else {
        toast.error(data.message || "Failed to update item.");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Network error while updating item.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Confirm Delete Item
  const handleDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);

    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      const jwtToken = token || (typeof window !== "undefined" ? localStorage.getItem("pizzahub_jwt") : "");

      const res = await fetch(`${serverUrl}/api/menu/${deletingId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Menu item deleted.");
        setDeletingId(null);
        fetchMyItems();
      } else {
        toast.error(data.message || "Failed to delete item.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Network error while deleting item.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    if (filterStatus === "all") return true;
    return item.status === filterStatus;
  });

  const countApproved = items.filter((i) => i.status === "approved").length;
  const countPending = items.filter((i) => i.status === "pending").length;
  const countRejected = items.filter((i) => i.status === "rejected").length;

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
            My Menu Items
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Manage your kitchen catalogue, update recipes, monitor approval status, or remove items.
          </p>
        </div>

        <Link
          href="/dashboard/vendor/add-item"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider py-3 px-5 rounded-xl transition-all shadow hover:shadow-red-600/30 font-[family-name:var(--font-heading)] shrink-0 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Pizza</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-stone-200 dark:border-stone-800">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            filterStatus === "all"
              ? "border-red-600 text-red-600 dark:text-red-400"
              : "border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
          }`}
        >
          All Items ({items.length})
        </button>
        <button
          onClick={() => setFilterStatus("approved")}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            filterStatus === "approved"
              ? "border-green-600 text-green-600"
              : "border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
          }`}
        >
          Approved & Active ({countApproved})
        </button>
        <button
          onClick={() => setFilterStatus("pending")}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            filterStatus === "pending"
              ? "border-amber-600 text-amber-600"
              : "border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
          }`}
        >
          Pending Review ({countPending})
        </button>
        <button
          onClick={() => setFilterStatus("rejected")}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            filterStatus === "rejected"
              ? "border-red-600 text-red-600"
              : "border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
          }`}
        >
          Rejected ({countRejected})
        </button>
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-sm animate-pulse"
            >
              <div className="h-48 bg-stone-200 dark:bg-stone-800" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/3" />
                <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded w-2/3" />
                <div className="h-10 bg-stone-200 dark:bg-stone-800 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredItems.length === 0 && (
        <div className="py-16 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm p-6">
          <Pizza className="w-16 h-16 text-stone-300 dark:text-stone-700 mx-auto mb-3" />
          <h3 className="text-xl font-bold uppercase tracking-tight text-stone-800 dark:text-stone-200 font-[family-name:var(--font-heading)]">
            No Menu Items Found
          </h3>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
            {filterStatus === "all"
              ? "You haven't added any pizzas to your kitchen menu yet. Create your first recipe to start accepting customer orders!"
              : `No menu items currently in the '${filterStatus}' status category.`}
          </p>
          <div className="mt-6">
            <Link
              href="/dashboard/vendor/add-item"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-full transition-all shadow"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Your First Pizza</span>
            </Link>
          </div>
        </div>
      )}

      {/* Items Grid */}
      {!isLoading && filteredItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              {/* Image & Badges */}
              <div className="relative h-48 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                <Image
                  src={
                    item.images && item.images[0]
                      ? item.images[0]
                      : "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={item.itemName}
                  fill
                  className="object-cover"
                />

                {/* Category Pill */}
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                  {item.category}
                </span>

                {/* Price Pill */}
                <span className="absolute top-3 right-3 bg-stone-900/90 text-amber-400 border border-amber-500/30 text-xs font-black px-2.5 py-1 rounded-full shadow">
                  ${item.price.toFixed(2)}
                </span>

                {/* Status Pill on Image Bottom */}
                <div className="absolute bottom-3 left-3">
                  {item.status === "approved" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-950/90 text-green-400 border border-green-700/60 text-[10px] font-bold uppercase tracking-wider shadow">
                      <CheckCircle2 className="w-3 h-3 text-green-400" />
                      Approved & Active
                    </span>
                  )}
                  {item.status === "pending" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-950/90 text-amber-400 border border-amber-700/60 text-[10px] font-bold uppercase tracking-wider shadow">
                      <Clock className="w-3 h-3 text-amber-400" />
                      Pending Admin Review
                    </span>
                  )}
                  {item.status === "rejected" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-950/90 text-red-400 border border-red-700/60 text-[10px] font-bold uppercase tracking-wider shadow">
                      <XCircle className="w-3 h-3 text-red-400" />
                      Rejected (Hidden)
                    </span>
                  )}
                </div>
              </div>

              {/* Item Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
                    {item.itemName}
                  </h3>
                  <p className="mt-1.5 text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-stone-400">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>

                {/* Action Buttons: Edit & Delete */}
                <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="flex-1 py-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => setDeletingId(item._id)}
                    className="p-2 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                    title="Delete item"
                    aria-label={`Delete ${item.itemName}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ============================================================== */}
      {/* Edit Item Modal */}
      {/* ============================================================== */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
              <h2 className="text-xl font-black uppercase tracking-tight font-[family-name:var(--font-heading)]">
                Update Menu Item
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                aria-label="Close Edit Modal"
                className="p-1 rounded-lg bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  value={editForm.itemName}
                  onChange={(e) => setEditForm({ ...editForm, itemName: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm text-stone-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Category
                  </label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm text-stone-900 dark:text-white"
                  >
                    {MENU_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.5"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Kitchen Location
                </label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm text-stone-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm text-stone-900 dark:text-white resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="py-2.5 px-4 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-bold uppercase text-stone-600 dark:text-stone-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="py-2.5 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider shadow transition-all flex items-center gap-2"
                >
                  {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* Delete Confirmation Modal */}
      {/* ============================================================== */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              Delete Menu Item?
            </h3>
            <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
              Are you sure you want to permanently remove this pizza from your kitchen catalogue? This action cannot be undone.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="flex-1 py-3 px-4 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-bold uppercase text-stone-600 dark:text-stone-300 hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider shadow flex items-center justify-center gap-1.5"
              >
                {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  MapPin,
  Calendar,
  MessageSquare,
  Search,
  X,
  AlertTriangle,
  Loader2,
  DollarSign,
  Pizza,
  ArrowRight,
  Flame,
  ChefHat,
  Truck,
  Building2,
  Mail,
} from "lucide-react";
import { useAuth } from "@/lib/auth-helpers";
import { toast } from "sonner";

interface CustomerOrder {
  _id: string;
  itemId: string;
  itemName: string;
  itemImage?: string;
  itemPrice: number;
  quantity: number;
  totalPrice: number;
  vendorId: string;
  vendorEmail: string;
  vendorName: string;
  customerId: string;
  customerEmail: string;
  customerName: string;
  deliveryDate: string;
  deliveryAddress: string;
  message?: string;
  status: "pending" | "accepted" | "rejected" | "cancelled";
  createdAt: string;
  updatedAt?: string;
}

interface OrderSummary {
  total: number;
  pending: number;
  accepted: number;
  rejected: number;
  cancelled: number;
}

export default function CustomerOrdersPage() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [summary, setSummary] = useState<OrderSummary>({
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
    cancelled: 0,
  });
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingOrder, setCancellingOrder] = useState<CustomerOrder | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  // Fetch orders from backend
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      const jwtToken = token || (typeof window !== "undefined" ? localStorage.getItem("pizzahub_jwt") : "");

      const queryParts: string[] = [];
      if (filterStatus !== "all") queryParts.push(`status=${filterStatus}`);
      if (searchTerm.trim()) queryParts.push(`search=${encodeURIComponent(searchTerm.trim())}`);

      const qs = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

      const res = await fetch(`${serverUrl}/api/orders/my-orders${qs}`, {
        headers: {
          "Content-Type": "application/json",
          ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
        },
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders || []);
          if (data.summary) {
            setSummary(data.summary);
          }
        }
      } else {
        toast.error("Failed to load your orders.");
      }
    } catch (err) {
      console.error("Fetch orders error:", err);
      toast.error("Network error while retrieving orders.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filterStatus, searchTerm, token]);

  // Cancel order handler
  const handleCancelOrder = async () => {
    if (!cancellingOrder) return;
    setIsCancelling(true);
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      const jwtToken = token || (typeof window !== "undefined" ? localStorage.getItem("pizzahub_jwt") : "");

      const res = await fetch(`${serverUrl}/api/orders/${cancellingOrder._id}/cancel`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
        },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Order cancelled successfully.");
        setCancellingOrder(null);
        fetchOrders();
      } else {
        toast.error(data.message || "Failed to cancel order.");
      }
    } catch (err) {
      console.error("Cancel order error:", err);
      toast.error("Network error while cancelling order.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* ============================================================== */}
      {/* 1. Header Banner */}
      {/* ============================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-xs font-bold tracking-widest uppercase mb-2">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            Kitchen Order Tracker
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
            My Pizza Orders
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Real-time oven updates, delivery dates, and comprehensive order history.
          </p>
        </div>

        <Link
          href="/menu"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-[family-name:var(--font-heading)] font-bold uppercase text-xs tracking-wider shadow-lg shadow-red-600/30 transition-all hover:scale-105 shrink-0"
        >
          <Pizza className="w-4 h-4" />
          <span>Order More Pizza</span>
        </Link>
      </div>

      {/* ============================================================== */}
      {/* 2. Filter Tabs & Search Controls */}
      {/* ============================================================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              filterStatus === "all"
                ? "bg-red-600 text-white shadow"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
            }`}
          >
            All ({summary.total})
          </button>
          <button
            onClick={() => setFilterStatus("pending")}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              filterStatus === "pending"
                ? "bg-amber-500 text-stone-950 font-black shadow"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
            }`}
          >
            Pending ({summary.pending})
          </button>
          <button
            onClick={() => setFilterStatus("accepted")}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              filterStatus === "accepted"
                ? "bg-green-600 text-white shadow"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
            }`}
          >
            Accepted ({summary.accepted})
          </button>
          <button
            onClick={() => setFilterStatus("rejected")}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              filterStatus === "rejected"
                ? "bg-red-700 text-white shadow"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
            }`}
          >
            Rejected ({summary.rejected})
          </button>
          <button
            onClick={() => setFilterStatus("cancelled")}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              filterStatus === "cancelled"
                ? "bg-stone-900 text-white shadow"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
            }`}
          >
            Cancelled ({summary.cancelled})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search pizza or pizzeria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
          />
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. Loading State */}
      {/* ============================================================== */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm animate-pulse space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className="h-5 bg-stone-200 dark:bg-stone-800 rounded w-1/4" />
                <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded-full w-20" />
              </div>
              <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. Empty State */}
      {/* ============================================================== */}
      {!isLoading && orders.length === 0 && (
        <div className="py-16 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm p-6">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-3">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold uppercase tracking-tight text-stone-800 dark:text-stone-200 font-[family-name:var(--font-heading)]">
            No Pizza Orders Found
          </h3>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
            {filterStatus === "all"
              ? "You haven't ordered any pizzas yet! Our wood-fired ovens are standing by for your next feast."
              : `No orders found matching the '${filterStatus}' status filter.`}
          </p>
          <div className="mt-6">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wider shadow-md transition-all hover:scale-105"
            >
              <Pizza className="w-4 h-4" />
              <span>Browse Artisanal Menu</span>
            </Link>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. Orders List & Live Timeline Tracker */}
      {/* ============================================================== */}
      {!isLoading && orders.length > 0 && (
        <div className="space-y-6">
          {orders.map((ord) => {
            const isPending = ord.status === "pending";
            const isAccepted = ord.status === "accepted";
            const isRejected = ord.status === "rejected";
            const isCancelled = ord.status === "cancelled";

            return (
              <div
                key={ord._id}
                className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-all space-y-6"
              >
                {/* Header: Item thumbnail, Order ID, Price, and Status Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0 border border-stone-200 dark:border-stone-700">
                      <Image
                        src={
                          ord.itemImage ||
                          "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
                        }
                        alt={ord.itemName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                        Order #{ord._id.slice(-6).toUpperCase()}
                      </span>
                      <h3 className="text-lg font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
                        {ord.itemName}
                      </h3>
                      <div className="flex items-center gap-3 text-xs mt-0.5">
                        <span className="font-bold text-stone-700 dark:text-stone-300">
                          Qty: {ord.quantity}x
                        </span>
                        <span className="text-stone-300 dark:text-stone-700">•</span>
                        <span className="font-black text-red-600 dark:text-red-500 font-[family-name:var(--font-heading)] text-sm">
                          Total: ${ord.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {isPending && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5" />
                        Pending Confirmation
                      </span>
                    )}
                    {isAccepted && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 dark:bg-green-950/60 border border-green-300 dark:border-green-800 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                        Accepted & Baking
                      </span>
                    )}
                    {isRejected && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 text-xs font-bold uppercase tracking-wider">
                        <XCircle className="w-3.5 h-3.5 text-red-600" />
                        Order Declined
                      </span>
                    )}
                    {isCancelled && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 text-xs font-bold uppercase tracking-wider">
                        Cancelled by You
                      </span>
                    )}
                  </div>
                </div>

                {/* Live Pizza Tracker Timeline */}
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-700/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-3">
                    Kitchen Progress Timeline
                  </span>

                  {isCancelled ? (
                    <div className="flex items-center gap-2 text-stone-500 text-xs">
                      <X className="w-4 h-4 text-stone-400" />
                      <span>This order was cancelled and will not be prepared or delivered.</span>
                    </div>
                  ) : isRejected ? (
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-xs">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>The vendor was unable to fulfill this order on the requested date. No charges apply.</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-2 text-center relative">
                      {/* Step 1: Placed */}
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold shadow mb-1">
                          ✓
                        </div>
                        <span className="text-[11px] font-bold text-stone-900 dark:text-white uppercase tracking-tight">
                          Placed
                        </span>
                        <span className="text-[9px] text-stone-400 hidden sm:block">Request sent</span>
                      </div>

                      {/* Step 2: Vendor Review */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow mb-1 ${
                            isAccepted
                              ? "bg-green-500 text-white"
                              : "bg-amber-500 text-stone-950 animate-pulse"
                          }`}
                        >
                          {isAccepted ? "✓" : "2"}
                        </div>
                        <span className="text-[11px] font-bold text-stone-900 dark:text-white uppercase tracking-tight">
                          Review
                        </span>
                        <span className="text-[9px] text-stone-400 hidden sm:block">
                          {isAccepted ? "Confirmed" : "In review"}
                        </span>
                      </div>

                      {/* Step 3: Baking */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow mb-1 ${
                            isAccepted
                              ? "bg-amber-500 text-stone-950 animate-pulse"
                              : "bg-stone-200 dark:bg-stone-700 text-stone-400"
                          }`}
                        >
                          <Flame className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-bold text-stone-900 dark:text-white uppercase tracking-tight">
                          Baking
                        </span>
                        <span className="text-[9px] text-stone-400 hidden sm:block">
                          {isAccepted ? "In oven" : "Pending"}
                        </span>
                      </div>

                      {/* Step 4: Delivery */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow mb-1 ${
                            isAccepted
                              ? "bg-stone-800 text-white dark:bg-stone-700"
                              : "bg-stone-200 dark:bg-stone-700 text-stone-400"
                          }`}
                        >
                          <Truck className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-bold text-stone-900 dark:text-white uppercase tracking-tight">
                          Delivery
                        </span>
                        <span className="text-[9px] text-stone-400 hidden sm:block">
                          {ord.deliveryDate}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Body Details: Vendor Info & Delivery Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  {/* Pizzeria Vendor Info */}
                  <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-700/60 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                      Pizzeria Vendor
                    </span>
                    <div className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-stone-400" />
                      <span>{ord.vendorName}</span>
                    </div>
                    <div className="text-stone-500 dark:text-stone-400 flex items-center gap-1.5 truncate">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <span className="truncate">{ord.vendorEmail}</span>
                    </div>
                  </div>

                  {/* Delivery Schedule & Address */}
                  <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-700/60 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                      Delivery Schedule
                    </span>
                    <div className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      <span>Date: {ord.deliveryDate}</span>
                    </div>
                    <div className="text-stone-600 dark:text-stone-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="line-clamp-1">{ord.deliveryAddress}</span>
                    </div>
                  </div>

                  {/* Customer Instructions / Note */}
                  <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-700/60 space-y-1 sm:col-span-2 lg:col-span-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                      Special Request Note
                    </span>
                    <div className="flex items-start gap-1.5 text-stone-700 dark:text-stone-300">
                      <MessageSquare className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                      <p className="line-clamp-2 italic">
                        {ord.message ? `"${ord.message}"` : "No special instructions provided."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-stone-100 dark:border-stone-800">
                  <div className="text-[11px] text-stone-400">
                    Ordered on: {new Date(ord.createdAt).toLocaleDateString()} at{" "}
                    {new Date(ord.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>

                  {/* Actions */}
                  {isPending && (
                    <button
                      onClick={() => setCancellingOrder(ord)}
                      className="py-2 px-4 rounded-xl border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Cancel Order</span>
                    </button>
                  )}

                  {isRejected && (
                    <Link
                      href="/menu"
                      className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow"
                    >
                      <Pizza className="w-3.5 h-3.5" />
                      <span>Order Alternative Pizza</span>
                    </Link>
                  )}

                  {isAccepted && (
                    <div className="text-xs font-bold text-green-600 dark:text-green-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Order confirmed & scheduled for {ord.deliveryDate}</span>
                    </div>
                  )}

                  {isCancelled && (
                    <div className="text-xs font-semibold text-stone-400">
                      Cancelled by Customer
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================== */}
      {/* 6. Cancel Order Confirmation Dialog */}
      {/* ============================================================== */}
      {cancellingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              Cancel This Order?
            </h3>
            <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
              Are you sure you want to cancel your order for <strong>{cancellingOrder.itemName}</strong>?
              This action cannot be undone.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCancellingOrder(null)}
                className="flex-1 py-3 px-4 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-bold uppercase text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
              >
                Keep Order
              </button>
              <button
                type="button"
                onClick={handleCancelOrder}
                disabled={isCancelling}
                className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider shadow flex items-center justify-center gap-1.5 cursor-pointer font-[family-name:var(--font-heading)]"
              >
                {isCancelling ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <X className="w-4 h-4" />
                )}
                <span>Confirm Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

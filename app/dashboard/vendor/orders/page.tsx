"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  MapPin,
  Calendar,
  User,
  Mail,
  MessageSquare,
  Search,
  Check,
  X,
  AlertTriangle,
  Loader2,
  DollarSign,
  Pizza,
  ArrowRight,
  Flame,
} from "lucide-react";
import { useAuth } from "@/lib/auth-helpers";
import { toast } from "sonner";

interface VendorOrder {
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
}

interface OrderSummary {
  total: number;
  pending: number;
  accepted: number;
  rejected: number;
  cancelled: number;
}

export default function VendorOrdersPage() {
  const { user, token } = useAuth();

  const [orders, setOrders] = useState<VendorOrder[]>([]);
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

  // Action in progress state
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Reject Confirmation Dialog state
  const [rejectingOrder, setRejectingOrder] = useState<VendorOrder | null>(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://pizzahub-server-pearl.vercel.app";
      const jwtToken = token || (typeof window !== "undefined" ? localStorage.getItem("pizzahub_jwt") : "");

      const queryParts: string[] = [];
      if (filterStatus !== "all") queryParts.push(`status=${filterStatus}`);
      if (searchTerm.trim()) queryParts.push(`search=${encodeURIComponent(searchTerm.trim())}`);

      const qs = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

      const res = await fetch(`${serverUrl}/api/orders/vendor${qs}`, {
        headers: {
          "Content-Type": "application/json",
          ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
        },
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
        if (data.summary) {
          setSummary(data.summary);
        }
      }
    } catch (err) {
      console.warn("Could not fetch vendor orders:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filterStatus, searchTerm, token]);

  // Handle Accept or Reject order
  const handleUpdateStatus = async (orderId: string, newStatus: "accepted" | "rejected") => {
    setProcessingId(orderId);
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://pizzahub-server-pearl.vercel.app";
      const jwtToken = token || (typeof window !== "undefined" ? localStorage.getItem("pizzahub_jwt") : "");

      const res = await fetch(`${serverUrl}/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (newStatus === "accepted") {
          toast.success("Order accepted! Kitchen preparation initiated.");
        } else {
          toast.info("Order rejected.");
        }
        setRejectingOrder(null);
        fetchOrders();
      } else {
        toast.error(data.message || `Failed to ${newStatus} order.`);
      }
    } catch (err) {
      console.error("Order status update error:", err);
      toast.error("Network error while updating order status.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-xs font-bold tracking-widest uppercase mb-2">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            Kitchen Order Management
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
            Customer Orders
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Review incoming orders, verify customer delivery details, and accept or reject pending requests.
          </p>
        </div>

        {/* Live Metrics Summary */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center min-w-[80px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
              Pending
            </span>
            <span className="text-xl font-black text-amber-600 dark:text-amber-400 font-[family-name:var(--font-heading)]">
              {summary.pending}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-center min-w-[80px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 dark:text-green-400 block">
              Accepted
            </span>
            <span className="text-xl font-black text-green-600 dark:text-green-400 font-[family-name:var(--font-heading)]">
              {summary.accepted}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-2 border-b border-stone-200 dark:border-stone-800">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              filterStatus === "all"
                ? "bg-red-600 text-white shadow"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
            }`}
          >
            All ({summary.total})
          </button>
          <button
            onClick={() => setFilterStatus("pending")}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              filterStatus === "pending"
                ? "bg-amber-500 text-stone-950 font-black shadow"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
            }`}
          >
            Pending ({summary.pending})
          </button>
          <button
            onClick={() => setFilterStatus("accepted")}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              filterStatus === "accepted"
                ? "bg-green-600 text-white shadow"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
            }`}
          >
            Accepted ({summary.accepted})
          </button>
          <button
            onClick={() => setFilterStatus("rejected")}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              filterStatus === "rejected"
                ? "bg-stone-900 text-white shadow"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
            }`}
          >
            Rejected ({summary.rejected})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by customer, item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
          />
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm animate-pulse space-y-4"
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

      {/* Empty State */}
      {!isLoading && orders.length === 0 && (
        <div className="py-16 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm p-6">
          <ShoppingBag className="w-16 h-16 text-stone-300 dark:text-stone-700 mx-auto mb-3" />
          <h3 className="text-xl font-bold uppercase tracking-tight text-stone-800 dark:text-stone-200 font-[family-name:var(--font-heading)]">
            No Orders Found
          </h3>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
            {filterStatus === "all"
              ? "You do not have any customer orders placed yet."
              : `No orders found matching the '${filterStatus}' status criteria.`}
          </p>
        </div>
      )}

      {/* Orders List (Cards) */}
      {!isLoading && orders.length > 0 && (
        <div className="space-y-5">
          {orders.map((ord) => {
            const isPending = ord.status === "pending";
            const isProcessing = processingId === ord._id;

            return (
              <div
                key={ord._id}
                className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-all space-y-5"
              >
                {/* Header: Item & Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0 border border-stone-200 dark:border-stone-700">
                      <Image
                        src={
                          ord.itemImage ||
                          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80"
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
                    {ord.status === "pending" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5" />
                        Pending Confirmation
                      </span>
                    )}
                    {ord.status === "accepted" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 dark:bg-green-950/60 border border-green-300 dark:border-green-800 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                        Accepted & Baking
                      </span>
                    )}
                    {ord.status === "rejected" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 text-xs font-bold uppercase tracking-wider">
                        <XCircle className="w-3.5 h-3.5 text-red-600" />
                        Order Rejected
                      </span>
                    )}
                    {ord.status === "cancelled" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 text-xs font-bold uppercase tracking-wider">
                        Cancelled by Customer
                      </span>
                    )}
                  </div>
                </div>

                {/* Body Details: Customer Info & Delivery Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  {/* Customer Information */}
                  <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-700/60 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                      Customer Details
                    </span>
                    <div className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-stone-400" />
                      <span>{ord.customerName}</span>
                    </div>
                    <div className="text-stone-500 dark:text-stone-400 flex items-center gap-1.5 truncate">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <span className="truncate">{ord.customerEmail}</span>
                    </div>
                  </div>

                  {/* Delivery Schedule & Address */}
                  <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-700/60 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                      Delivery Information
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

                  {/* Customer Message / Notes */}
                  <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-700/60 space-y-1 sm:col-span-2 lg:col-span-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                      Customer Instructions
                    </span>
                    <div className="flex items-start gap-1.5 text-stone-700 dark:text-stone-300">
                      <MessageSquare className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                      <p className="line-clamp-2 italic">
                        {ord.message ? `"${ord.message}"` : "No special instructions provided."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions Bar: Accept / Reject (Only for pending orders, only once) */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="text-[11px] text-stone-400">
                    Requested on: {new Date(ord.createdAt).toLocaleDateString()} at{" "}
                    {new Date(ord.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>

                  {/* Active Action Buttons */}
                  {isPending ? (
                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                      {/* Reject Button (Opens confirm dialog) */}
                      <button
                        onClick={() => setRejectingOrder(ord)}
                        disabled={isProcessing}
                        className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>

                      {/* Accept Button */}
                      <button
                        onClick={() => handleUpdateStatus(ord._id, "accepted")}
                        disabled={isProcessing}
                        className="flex-1 sm:flex-initial py-2.5 px-5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold uppercase tracking-wider shadow hover:shadow-green-600/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer font-[family-name:var(--font-heading)]"
                      >
                        {isProcessing ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Check className="w-3.5 h-3.5" />
                        )}
                        <span>Accept & Bake</span>
                      </button>
                    </div>
                  ) : (
                    <div className="text-xs font-semibold text-stone-500">
                      Action Completed: Order {ord.status}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================== */}
      {/* Reject Order Confirmation Dialog */}
      {/* ============================================================== */}
      {rejectingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              Reject This Order?
            </h3>
            <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
              Are you sure you want to decline the order for <strong>{rejectingOrder.itemName}</strong> from {rejectingOrder.customerName}?
              This decision is final and cannot be undone.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setRejectingOrder(null)}
                className="flex-1 py-3 px-4 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-bold uppercase text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus(rejectingOrder._id, "rejected")}
                disabled={processingId === rejectingOrder._id}
                className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider shadow flex items-center justify-center gap-1.5"
              >
                {processingId === rejectingOrder._id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <X className="w-4 h-4" />
                )}
                <span>Confirm Reject</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

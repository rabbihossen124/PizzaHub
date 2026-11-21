"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MenuItem } from "@/lib/types";
import { useAuth } from "@/lib/auth-helpers";
import {
  X,
  Plus,
  Minus,
  Calendar,
  MapPin,
  MessageSquare,
  Clock,
  Flame,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface OrderModalProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderModal({ item, isOpen, onClose }: OrderModalProps) {
  const router = useRouter();
  const { user, token } = useAuth();

  // Tomorrow's or today's date formatted as YYYY-MM-DD
  const todayStr = new Date().toISOString().split("T")[0];

  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState(todayStr);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const unitPrice = item.price;
  const totalPrice = (unitPrice * quantity).toFixed(2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!deliveryAddress.trim()) {
      setErrorMessage("Please enter your delivery address.");
      return;
    }

    if (!deliveryDate) {
      setErrorMessage("Please select a delivery date.");
      return;
    }

    const selected = new Date(deliveryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      setErrorMessage("Delivery date cannot be in the past.");
      return;
    }

    setIsSubmitting(true);

    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      const jwtToken = token || (typeof window !== "undefined" ? localStorage.getItem("pizzahub_jwt") : "");

      const res = await fetch(`${serverUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
        },
        body: JSON.stringify({
          itemId: item._id,
          deliveryDate,
          deliveryAddress: deliveryAddress.trim(),
          message: message.trim(),
          quantity,
          customerEmail: user?.email,
          customerName: user?.name,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Order placed successfully! Awaiting kitchen confirmation.");
        onClose();
        router.push("/dashboard/customer");
      } else {
        const errorMsg = data.message || "Failed to place order. Please try again.";
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err) {
      console.error("Order submit error:", err);
      setErrorMessage("Network error occurred while connecting to server. Please try again.");
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="relative p-6 bg-stone-900 text-white border-b border-stone-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Direct Kitchen Order
            </span>
            <h2 className="text-xl font-black uppercase tracking-tight font-[family-name:var(--font-heading)] mt-0.5">
              Confirm Your Pizza Order
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Item Preview Card */}
          <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-stone-200 dark:bg-stone-700">
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
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                {item.category}
              </span>
              <h3 className="text-base font-bold text-stone-900 dark:text-white truncate font-[family-name:var(--font-heading)] uppercase">
                {item.itemName}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                From: {item.vendorName}
              </p>
              <div className="mt-1 font-black text-amber-600 dark:text-amber-400 text-sm">
                ${unitPrice.toFixed(2)} each
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
              Select Quantity
            </label>
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-9 h-9 rounded-lg bg-white dark:bg-stone-700 text-stone-700 dark:text-stone-200 disabled:opacity-40 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-600 transition-colors shadow-sm"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-black text-base text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                  className="w-9 h-9 rounded-lg bg-white dark:bg-stone-700 text-stone-700 dark:text-stone-200 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-600 transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-right flex-1">
                <div className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">
                  Order Total
                </div>
                <div className="text-2xl font-black text-red-600 dark:text-red-500 font-[family-name:var(--font-heading)]">
                  ${totalPrice}
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Date */}
          <div>
            <label
              htmlFor="delivery-date-input"
              className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5"
            >
              Delivery Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="delivery-date-input"
                type="date"
                min={todayStr}
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
              />
            </div>
            <p className="text-[11px] text-stone-400 mt-1">
              Freshly baked and dispatched on this date.
            </p>
          </div>

          {/* Delivery Address */}
          <div>
            <label
              htmlFor="delivery-address-input"
              className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5"
            >
              Delivery Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-red-500 absolute left-3.5 top-3 pointer-events-none" />
              <textarea
                id="delivery-address-input"
                rows={2}
                placeholder="Street address, apartment/suite number, area/city..."
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none"
              />
            </div>
          </div>

          {/* Special Instructions Message */}
          <div>
            <label
              htmlFor="special-instructions-input"
              className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5"
            >
              Kitchen Notes & Instructions (Optional)
            </label>
            <div className="relative">
              <MessageSquare className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
              <textarea
                id="special-instructions-input"
                rows={2}
                placeholder="e.g. Extra napkins, please leave at apartment door, ring bell..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none"
              />
            </div>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Guarantees */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              30-Min Delivery
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
              Hot Thermal Seal
            </span>
            <span>No Prepayment Required</span>
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-bold uppercase tracking-wider text-xs hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-[2] py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-wider text-xs transition-all shadow-lg hover:shadow-red-600/30 flex items-center justify-center gap-2 disabled:opacity-50 font-[family-name:var(--font-heading)] cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Placing Order...</span>
                </>
              ) : (
                <span>Confirm Order (${totalPrice})</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Building2,
  CheckCircle2,
  Flame,
} from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Order Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    // Simulate contact form dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      toast.success("Thank you! Your message has been routed to our concierge team.");
    }, 700);
  };

  return (
    <div className="space-y-12 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-xs font-bold tracking-widest uppercase">
          <Flame className="w-3.5 h-3.5 text-amber-500" />
          Customer & Kitchen Care
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
          Get In Touch With <span className="text-red-600 dark:text-red-500">PizzaHub</span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
          Have a question about your order, want to partner your pizzeria with PizzaHub, or need technical assistance? We are here 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              Customer Hotline
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Immediate order assistance & kitchen routing.
            </p>
            <p className="text-sm font-bold text-red-600 dark:text-red-400 pt-1">
              +1 (800) 749-9248 (PIZZA-HUB)
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              Direct Support Email
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              General inquiries, billing receipts, and partnership questions.
            </p>
            <p className="text-sm font-bold text-amber-600 dark:text-amber-400 pt-1">
              support@pizzahub.com
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              Headquarters
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Wood-Fire Culinary Lab & Operational Hub
            </p>
            <p className="text-xs font-medium text-stone-700 dark:text-stone-300 pt-1">
              100 Wood-Fired Avenue, Brooklyn, NY 11201
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 p-8 sm:p-10 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
          {isSent ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/60 text-green-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
                Message Dispatched!
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto">
                Thank you for reaching out to PizzaHub. One of our culinary concierges will respond to your inquiry within 2 to 4 hours.
              </p>
              <button
                onClick={() => {
                  setIsSent(false);
                  setFormData({ name: "", email: "", subject: "Order Inquiry", message: "" });
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 cursor-pointer"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-xl font-bold uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
                Send A Direct Note
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Topic / Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 cursor-pointer"
                >
                  <option value="Order Inquiry">Order Inquiry / Delivery Status</option>
                  <option value="Pizzeria Partnership">Restaurant / Pizzeria Partnership</option>
                  <option value="Stripe Subscription">Stripe Subscription & Billing</option>
                  <option value="Feedback">Culinary Feedback & Compliments</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Message Details *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist your pizza journey today?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-[family-name:var(--font-heading)] font-black uppercase text-xs tracking-wider shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Dispatching..." : "Transmit Message"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

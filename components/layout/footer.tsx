"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Pizza,
  Phone,
  Mail,
  Heart,
  Send,
  Flame,
  ShieldCheck,
  CreditCard,
  ArrowRight,
} from "lucide-react";

/**
 * Modern X (formerly Twitter) Icon SVG Component
 */
function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full bg-stone-100/90 dark:bg-[#141210] text-foreground border-t border-border transition-colors relative overflow-hidden"
    >
      {/* Decorative ambient warm light */}
      <div className="absolute top-0 right-1/3 w-80 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Compact Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Column 1: Brand & Socials (4 Cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <Link href="/" className="inline-flex items-center gap-2.5 group select-none">
              <Image
                src="/pizza-logo.png"
                alt="PizzaHub Logo"
                width={38}
                height={38}
                className="w-9 h-9 object-contain transition-transform group-hover:scale-110 duration-300"
              />
              <div className="flex flex-col">
                <span className="font-heading font-black text-xl tracking-wide uppercase text-foreground leading-none">
                  PIZZA<span className="text-primary font-black ml-0.5">HUB</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                  Artisan Pizza Delivery
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              Hand-stretched sourdough, San Marzano tomatoes, and 100% whole-milk mozzarella stone-baked fresh and delivered in under 30 minutes.
            </p>

            {/* Social Media Links with Framer Motion Micro-Interactions */}
            <div className="flex items-center gap-2 pt-1">
              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow PizzaHub on X"
                className="w-8 h-8 rounded-lg border border-border bg-card hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center transition-colors text-muted-foreground shadow-xs cursor-pointer"
              >
                <XIcon className="w-3.5 h-3.5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow PizzaHub on Facebook"
                className="w-8 h-8 rounded-lg border border-border bg-card hover:bg-blue-600 hover:text-white hover:border-blue-600 flex items-center justify-center transition-colors text-muted-foreground shadow-xs cursor-pointer"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow PizzaHub on Instagram"
                className="w-8 h-8 rounded-lg border border-border bg-card hover:bg-pink-600 hover:text-white hover:border-pink-600 flex items-center justify-center transition-colors text-muted-foreground shadow-xs cursor-pointer"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Watch PizzaHub on YouTube"
                className="w-8 h-8 rounded-lg border border-border bg-card hover:bg-red-600 hover:text-white hover:border-red-600 flex items-center justify-center transition-colors text-muted-foreground shadow-xs cursor-pointer"
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
              </motion.a>
            </div>
          </div>

          {/* Column 2: Quick Artisan Menu (2.5 Cols) */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-foreground">
              Artisan Menu
            </h4>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li>
                <Link href="/menu?category=Classic+Pizzas" className="hover:text-primary transition-colors">
                  Classic Pizzas
                </Link>
              </li>
              <li>
                <Link href="/menu?category=Meat+Lovers" className="hover:text-primary transition-colors">
                  Meat Lovers
                </Link>
              </li>
              <li>
                <Link href="/menu?category=Vegetarian+Pizzas" className="hover:text-primary transition-colors">
                  Vegetarian Pizzas
                </Link>
              </li>
              <li>
                <Link href="/menu?category=Specialty+%2F+Gourmet+Pizzas" className="hover:text-primary transition-colors">
                  Specialty Gourmet
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-primary font-bold hover:underline">
                  Browse All Pizzas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Portals & Help (2.5 Cols) */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-foreground">
              Portals & Orders
            </h4>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li>
                <Link href="/dashboard/customer" className="hover:text-primary transition-colors">
                  Customer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/vendor" className="hover:text-primary transition-colors">
                  Vendor Kitchen Studio
                </Link>
              </li>
              <li>
                <Link href="/signin" className="hover:text-primary transition-colors">
                  Sign In to Account
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-primary transition-colors">
                  Register as Restaurant
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Help & Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Hotline & 20% OFF Deal (3 Cols) */}
          <div className="lg:col-span-4 space-y-3 p-4 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-foreground uppercase tracking-wide flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Express Hotline</span>
              </span>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase">
                10 AM - 11:30 PM
              </span>
            </div>

            <a
              href="tel:+880170074992"
              className="text-lg font-black text-primary font-[family-name:var(--font-heading)] tracking-wider hover:opacity-85 transition-opacity block"
            >
              +880 1700-PIZZA (74992)
            </a>

            {/* Compact Newsletter Input */}
            <div className="pt-1">
              <p className="text-[11px] text-muted-foreground mb-1.5 font-medium">
                Get secret 20% OFF voucher:
              </p>
              <div className="flex items-center gap-1.5">
                <input
                  type="email"
                  placeholder="Your email address..."
                  className="h-9 w-full rounded-lg bg-background border border-border px-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  className="h-9 px-3.5 rounded-lg bg-primary hover:bg-primary/95 text-white font-heading text-xs font-bold tracking-wider uppercase shrink-0 flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <span>Join</span>
                  <Send className="w-3 h-3" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Single-Line Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© {currentYear} PizzaHub.</span>
            <span>Handcrafted with</span>
            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500 inline animate-pulse" />
            <span>for pizza lovers.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
            <Link href="/about" className="hover:text-primary transition-colors">
              About Us
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Support
            </Link>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
              100% Halal Verified
            </span>
            <span>•</span>
            <span className="font-semibold text-foreground">
              Stripe Secure Pay
            </span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Pizza,
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  Send,
  Flame,
} from "lucide-react";

/**
 * Modern X (formerly Twitter) Icon SVG Component
 * Requirement: Use the new X logo instead of the old Twitter bird
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
    <footer className="w-full bg-[#0d0c0b] text-[#eae7e2] border-t-2 border-amber-500/20 transition-colors">
      {/* 1. Caferio-Style Newsletter Strip */}
      <div className="border-b border-[#242220] py-8 bg-[#141312]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center lg:text-left">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-amber-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                <Flame className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="font-heading text-xl sm:text-2xl font-bold tracking-wide uppercase text-white">
                  Join The PizzaHub VIP Club
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Get secret discounts, 20% OFF vouchers, and weekly artisan chef specials directly to your inbox.
                </p>
              </div>
            </div>

            {/* Newsletter Input */}
            <div className="flex w-full lg:w-auto max-w-md items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="h-12 w-full lg:w-72 rounded-xl bg-[#201e1c] border border-border/60 px-4 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
              <button
                type="button"
                className="h-12 px-6 rounded-xl bg-gradient-to-r from-primary to-rose-600 hover:from-primary/90 hover:to-rose-500 font-heading tracking-wider uppercase font-bold text-white text-sm shrink-0 flex items-center gap-2 shadow-lg shadow-primary/20 transition-transform active:scale-95"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 select-none group">
              <Image
                src="/pizza-logo.png"
                alt="PizzaHub Logo"
                width={48}
                height={48}
                className="w-11 h-11 object-contain transition-transform group-hover:scale-110"
              />
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-2xl tracking-wide uppercase text-white">
                  PIZZA<span className="text-primary font-black ml-0.5">HUB</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-bold text-amber-500 leading-tight">
                  Artisan Pizza Platform
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#a39f99] leading-relaxed max-w-sm">
              PizzaHub is a complete role-based pizza ordering and restaurant delivery network connecting pizza lovers with genuine local kitchens, hand-stretched sourdough, and 100% whole-milk mozzarella.
            </p>

            {/* Social Media Links with Official New X Logo */}
            <div className="pt-2">
              <p className="font-heading text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
                Follow PizzaHub Kitchens
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow PizzaHub on X"
                  className="w-10 h-10 rounded-xl border border-amber-500/20 bg-[#1c1a18] hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center transition-all duration-200 text-[#d4cfc7] shadow-sm hover:scale-105"
                >
                  <XIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow PizzaHub on Facebook"
                  className="w-10 h-10 rounded-xl border border-amber-500/20 bg-[#1c1a18] hover:bg-blue-600 hover:text-white hover:border-blue-600 flex items-center justify-center transition-all duration-200 text-[#d4cfc7] shadow-sm hover:scale-105"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow PizzaHub on Instagram"
                  className="w-10 h-10 rounded-xl border border-amber-500/20 bg-[#1c1a18] hover:bg-pink-600 hover:text-white hover:border-pink-600 flex items-center justify-center transition-all duration-200 text-[#d4cfc7] shadow-sm hover:scale-105"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Watch PizzaHub on YouTube"
                  className="w-10 h-10 rounded-xl border border-amber-500/20 bg-[#1c1a18] hover:bg-red-600 hover:text-white hover:border-red-600 flex items-center justify-center transition-all duration-200 text-[#d4cfc7] shadow-sm hover:scale-105"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-heading text-base font-bold uppercase tracking-wider text-amber-400">
              EXPLORE MENU
            </h3>
            <ul className="space-y-2.5 text-sm text-[#b8b3ab]">
              <li>
                <Link href="/menu" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>Browse Full Menu</span>
                </Link>
              </li>
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
            </ul>
          </div>

          {/* Restaurant Partners */}
          <div className="space-y-4">
            <h3 className="font-heading text-base font-bold uppercase tracking-wider text-amber-400">
              RESTAURANT PARTNERS
            </h3>
            <ul className="space-y-2.5 text-sm text-[#b8b3ab]">
              <li>
                <Link href="/signup" className="hover:text-primary transition-colors">
                  Register Restaurant (Vendor)
                </Link>
              </li>
              <li>
                <Link href="/dashboard/vendor" className="hover:text-primary transition-colors">
                  Vendor Studio & Orders
                </Link>
              </li>
              <li>
                <Link href="/signin" className="hover:text-primary transition-colors">
                  Restaurant Sign In
                </Link>
              </li>
              <li>
                <Link href="/dashboard/vendor" className="hover:text-primary transition-colors">
                  Premium Subscription Upgrade
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-heading text-base font-bold uppercase tracking-wider text-amber-400">
              RESTAURANT CONTACT
            </h3>
            <ul className="space-y-3.5 text-sm text-[#b8b3ab]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>124 Pizza Avenue, Food District, Dhaka 1212</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span className="font-bold text-white">+880 1700-PIZZA (74992)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>support@pizzahub.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Daily: 10:00 AM - 11:30 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Bottom Legal Bar */}
      <div className="border-t border-[#201e1c] py-6 bg-[#080707]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8c8882]">
          <p className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© {currentYear} PizzaHub Platform. Artisan stone-baked with</span>
            <Heart className="w-3.5 h-3.5 text-primary fill-primary inline-block" />
            <span>in Dhaka, Bangladesh.</span>
          </p>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              Food Hygiene Certified
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import * as React from "react";
import Link from "next/link";
import {
  Pizza,
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
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

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/80 bg-card/60 backdrop-blur-md transition-colors">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group select-none">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary via-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-primary/20">
                <Pizza className="w-5 h-5 transition-transform group-hover:rotate-12" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight leading-none text-foreground flex items-center">
                  Pizza<span className="text-primary">Hub</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-muted-foreground leading-tight">
                  Hot & Fast Delivery
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              PizzaHub is your ultimate pizza ordering platform connecting food lovers with local artisan pizzerias. Hot, fresh, and stone-baked right to your doorstep.
            </p>

            {/* Social Media Links with Official New X Logo */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                Follow Our Kitchen
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow PizzaHub on X"
                  className="w-9 h-9 rounded-xl border border-border bg-background hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center transition-all duration-200 text-muted-foreground shadow-sm"
                >
                  <XIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow PizzaHub on Facebook"
                  className="w-9 h-9 rounded-xl border border-border bg-background hover:bg-blue-600 hover:text-white hover:border-blue-600 flex items-center justify-center transition-all duration-200 text-muted-foreground shadow-sm"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow PizzaHub on Instagram"
                  className="w-9 h-9 rounded-xl border border-border bg-background hover:bg-pink-600 hover:text-white hover:border-pink-600 flex items-center justify-center transition-all duration-200 text-muted-foreground shadow-sm"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Watch PizzaHub on YouTube"
                  className="w-9 h-9 rounded-xl border border-border bg-background hover:bg-red-600 hover:text-white hover:border-red-600 flex items-center justify-center transition-all duration-200 text-muted-foreground shadow-sm"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View on GitHub"
                  className="w-9 h-9 rounded-xl border border-border bg-background hover:bg-foreground hover:text-background hover:border-foreground flex items-center justify-center transition-all duration-200 text-muted-foreground shadow-sm"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Explore Menu
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/menu"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Browse Full Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/menu?category=Classic+Pizzas"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Classic Pizzas
                </Link>
              </li>
              <li>
                <Link
                  href="/menu?category=Meat+Lovers"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Meat Lovers
                </Link>
              </li>
              <li>
                <Link
                  href="/menu?category=Vegetarian+Pizzas"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Vegetarian Pizzas
                </Link>
              </li>
              <li>
                <Link
                  href="/menu?category=Beverages+%26+Desserts"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Sides & Beverages
                </Link>
              </li>
            </ul>
          </div>

          {/* Business & Partners Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              For Restaurants
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/signup"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Register as a Vendor
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/vendor"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Vendor Studio
                </Link>
              </li>
              <li>
                <Link
                  href="/signin"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Restaurant Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Vendor Subscription Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>124 Pizza Avenue, Food District, Dhaka 1212</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+880 1700-PIZZA (74992)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>support@pizzahub.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>Mon - Sun: 10:00 AM - 11:30 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-border/60 py-6 bg-background/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p className="flex items-center gap-1 text-center sm:text-left">
            <span>© {currentYear} PizzaHub Platform. Baked with</span>
            <Heart className="w-3.5 h-3.5 text-primary fill-primary inline-block" />
            <span>for pizza lovers worldwide.</span>
          </p>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

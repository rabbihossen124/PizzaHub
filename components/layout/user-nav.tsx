"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-helpers";
import { Badge } from "@/components/ui/badge";
import {
  User,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronDown,
  Award,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";

export function UserNav() {
  const { user, isVendor, isAdmin, isCustomer, isPremium, signOut } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!user) return null;

  // Role based dashboard URL
  let dashboardUrl = "/dashboard/customer";
  if (isAdmin) dashboardUrl = "/dashboard/admin";
  else if (isVendor) dashboardUrl = "/dashboard/vendor";

  const handleLogout = async () => {
    try {
      setIsOpen(false);
      await signOut();
      toast.success("Logged out successfully. See you again soon!");
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  const initials = (user.name || user.email || "P")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full border border-border/80 bg-background/80 hover:bg-accent hover:border-primary/40 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
        aria-expanded={isOpen}
      >
        {/* Avatar */}
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "Profile"}
            className="w-8 h-8 rounded-full object-cover border border-primary/20 shadow-sm"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            {initials}
          </div>
        )}

        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-semibold leading-tight line-clamp-1 max-w-[110px]">
            {user.name || user.email?.split("@")[0]}
          </span>
          <span className="text-[10px] text-muted-foreground capitalize">
            {user.role}
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border/60">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold text-sm line-clamp-1">{user.name}</p>
              {isPremium && (
                <Badge variant="premium" className="text-[10px] px-1.5 py-0 h-4">
                  <Award className="w-2.5 h-2.5 mr-0.5" /> Premium
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {user.email}
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              <Badge
                variant={isAdmin ? "destructive" : isVendor ? "secondary" : "default"}
                className="text-[10px] capitalize"
              >
                {user.role} Account
              </Badge>
              {user.isBlocked && (
                <Badge variant="destructive" className="text-[10px]">
                  <ShieldAlert className="w-3 h-3 mr-0.5" /> Suspended
                </Badge>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="py-1">
            <Link
              href={dashboardUrl}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-accent/80 hover:text-primary transition-colors font-medium"
            >
              <LayoutDashboard className="w-4 h-4 text-primary" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/dashboard/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-accent/80 hover:text-primary transition-colors font-medium"
            >
              <Settings className="w-4 h-4 text-muted-foreground" />
              <span>Profile Settings</span>
            </Link>
          </div>

          {/* Logout Button */}
          <div className="pt-1 mt-1 border-t border-border/60">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors font-medium text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

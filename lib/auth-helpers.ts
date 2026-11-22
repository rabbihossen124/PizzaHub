"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export interface PizzaHubUser {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  role?: "customer" | "vendor" | "admin";
  isBlocked?: boolean;
  businessName?: string;
  subscriptionPlan?: "free" | "premium";
  subscriptionExpiresAt?: string | Date | null;
}

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://pizzahub-server-pearl.vercel.app";

/**
 * Custom hook to get active user details, roles, and JWT token for server requests
 */
export function useAuth() {
  const { data: session, isPending } = useSession();
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("pizzahub_jwt");
    }
    return null;
  });

  const rawUser = session?.user as Record<string, unknown> | undefined;

  const user: PizzaHubUser | null = rawUser
    ? {
        id: String(rawUser.id || ""),
        name: String(rawUser.name || ""),
        email: String(rawUser.email || ""),
        image: typeof rawUser.image === "string" ? rawUser.image : "",
        role: (rawUser.role as "customer" | "vendor" | "admin") || "customer",
        isBlocked: Boolean(rawUser.isBlocked),
        businessName: typeof rawUser.businessName === "string" ? rawUser.businessName : "",
        subscriptionPlan: (rawUser.subscriptionPlan as "free" | "premium") || "free",
        subscriptionExpiresAt: (rawUser.subscriptionExpiresAt as string | Date) || null,
      }
    : null;

  // Sync session with backend to obtain/verify JWT token
  useEffect(() => {
    async function syncToken() {
      if (user?.email) {
        try {
          const res = await fetch(`${SERVER_URL}/api/auth/token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              role: user.role,
              image: user.image,
            }),
          });
          const data = await res.json();
          if (data.success && data.token) {
            setToken(data.token);
            if (typeof window !== "undefined") {
              localStorage.setItem("pizzahub_jwt", data.token);
            }
          }
        } catch (err) {
          console.error("[Auth Sync] Failed to sync token with backend:", err);
        }
      } else {
        setToken(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("pizzahub_jwt");
        }
      }
    }

    syncToken();
  }, [user?.email, user?.role, user?.name, user?.image]);

  return {
    session,
    user,
    token,
    isLoading: isPending,
    isAuthenticated: Boolean(session?.user),
    isCustomer: user?.role === "customer",
    isVendor: user?.role === "vendor",
    isAdmin: user?.role === "admin",
    isPremium: user?.subscriptionPlan === "premium",
    signOut,
  };
}

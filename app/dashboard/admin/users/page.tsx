"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Users,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserX,
  UserCheck,
  Loader2,
  AlertTriangle,
  Building2,
  User,
  Shield,
  Award,
} from "lucide-react";
import { useAuth } from "@/lib/auth-helpers";
import { toast } from "sonner";

interface AdminUser {
  _id: string;
  name?: string;
  email: string;
  role: "customer" | "vendor" | "admin";
  image?: string;
  isBlocked?: boolean;
  businessName?: string;
  subscriptionPlan?: "free" | "premium";
  createdAt?: string;
}

export default function AdminUsersPage() {
  const { user: currentUser, token } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [blockedFilter, setBlockedFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [confirmingUser, setConfirmingUser] = useState<{
    user: AdminUser;
    action: "block" | "unblock";
  } | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      const jwtToken = token || (typeof window !== "undefined" ? localStorage.getItem("pizzahub_jwt") : "");

      const params = new URLSearchParams();
      if (searchTerm.trim()) params.append("search", searchTerm.trim());
      if (roleFilter !== "all") params.append("role", roleFilter);
      if (blockedFilter !== "all") params.append("isBlocked", blockedFilter);

      const qs = params.toString() ? `?${params.toString()}` : "";

      const res = await fetch(`${serverUrl}/api/admin/users${qs}`, {
        headers: {
          "Content-Type": "application/json",
          ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
        },
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.users)) {
          setUsers(data.users);
        }
      } else {
        toast.error("Failed to load user directory.");
      }
    } catch (err) {
      console.error("Fetch users error:", err);
      toast.error("Network error while retrieving users.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, roleFilter, blockedFilter, token]);

  // Handle block/unblock action
  const handleToggleBlock = async () => {
    if (!confirmingUser) return;
    const { user: targetUser, action } = confirmingUser;
    const shouldBlock = action === "block";

    setProcessingId(targetUser._id);
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      const jwtToken = token || (typeof window !== "undefined" ? localStorage.getItem("pizzahub_jwt") : "");

      const res = await fetch(`${serverUrl}/api/admin/users/${targetUser._id}/block`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
        },
        body: JSON.stringify({ isBlocked: shouldBlock }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(
          `User ${targetUser.name || targetUser.email} has been ${
            shouldBlock ? "blocked" : "unblocked"
          }.`
        );
        setConfirmingUser(null);
        fetchUsers();
      } else {
        toast.error(data.message || "Failed to update user status.");
      }
    } catch (err) {
      console.error("Block toggle error:", err);
      toast.error("Network error while updating user.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-xs font-bold tracking-widest uppercase mb-2">
          <Shield className="w-3.5 h-3.5 text-amber-500" />
          Access Control
        </div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
          Manage Users
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Search registered accounts, manage platform roles, and suspend or reinstate access.
        </p>
      </div>

      {/* Filters and Search Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row items-center gap-4">
        {/* Search Input */}
        <div className="relative w-full md:flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
          />
        </div>

        {/* Role Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider whitespace-nowrap">
            Role:
          </span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full md:w-auto px-3.5 py-2 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-800 dark:text-stone-200 font-semibold focus:outline-none focus:ring-2 focus:ring-red-500/50 cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="customer">Customers</option>
            <option value="vendor">Vendors</option>
            <option value="admin">Administrators</option>
          </select>
        </div>

        {/* Blocked Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider whitespace-nowrap">
            Status:
          </span>
          <select
            value={blockedFilter}
            onChange={(e) => setBlockedFilter(e.target.value)}
            className="w-full md:w-auto px-3.5 py-2 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-800 dark:text-stone-200 font-semibold focus:outline-none focus:ring-2 focus:ring-red-500/50 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="false">Active Only</option>
            <option value="true">Suspended Only</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
        {isLoading && (
          <div className="py-16 text-center text-xs text-stone-400 flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-red-600" />
            <span>Loading user directory...</span>
          </div>
        )}

        {!isLoading && users.length === 0 && (
          <div className="py-16 text-center p-6 space-y-2">
            <Users className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto mb-2" />
            <h3 className="text-lg font-bold uppercase tracking-tight text-stone-800 dark:text-stone-200 font-[family-name:var(--font-heading)]">
              No Users Found
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Try adjusting your search criteria or role filters.
            </p>
          </div>
        )}

        {!isLoading && users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-stone-50 dark:bg-stone-800/40 border-b border-stone-200 dark:border-stone-800 text-stone-400 uppercase tracking-wider font-bold text-[10px]">
                  <th className="py-3.5 px-4">User</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Plan / Business</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
                {users.map((u) => {
                  const isCurrentAdmin = u.email === currentUser?.email;
                  const isBlocked = Boolean(u.isBlocked);

                  return (
                    <tr
                      key={u._id}
                      className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                    >
                      {/* User Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-600 to-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                            {(u.name || u.email || "P")[0].toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <span className="font-bold text-stone-900 dark:text-white block truncate">
                              {u.name || "Anonymous User"}
                            </span>
                            <span className="text-stone-400 text-[11px] block truncate">
                              {u.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-3.5 px-4">
                        {u.role === "admin" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 text-[10px] font-bold uppercase tracking-wider">
                            <Shield className="w-3 h-3 text-red-600" />
                            Admin
                          </span>
                        )}
                        {u.role === "vendor" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                            <Building2 className="w-3 h-3 text-amber-600" />
                            Vendor
                          </span>
                        )}
                        {u.role === "customer" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-[10px] font-bold uppercase tracking-wider">
                            <User className="w-3 h-3 text-stone-400" />
                            Customer
                          </span>
                        )}
                      </td>

                      {/* Plan / Business Info */}
                      <td className="py-3.5 px-4">
                        {u.role === "vendor" ? (
                          <div className="space-y-0.5">
                            {u.subscriptionPlan === "premium" ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 font-bold text-[10px] uppercase">
                                <Award className="w-3 h-3" />
                                Premium
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-stone-400 uppercase">
                                Free Tier
                              </span>
                            )}
                            {u.businessName && (
                              <span className="text-[11px] text-stone-500 block truncate max-w-[150px]">
                                {u.businessName}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-stone-400 text-[11px]">—</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {isBlocked ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 text-[10px] font-bold uppercase">
                            <ShieldAlert className="w-3 h-3 text-red-600" />
                            Suspended
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-100 dark:bg-green-950/60 border border-green-300 dark:border-green-800 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase">
                            <ShieldCheck className="w-3 h-3 text-green-600" />
                            Active
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        {isCurrentAdmin ? (
                          <span className="text-[10px] font-bold uppercase text-stone-400">
                            Current Admin
                          </span>
                        ) : isBlocked ? (
                          <button
                            onClick={() => setConfirmingUser({ user: u, action: "unblock" })}
                            disabled={processingId === u._id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>Unblock</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => setConfirmingUser({ user: u, action: "block" })}
                            disabled={processingId === u._id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            <UserX className="w-3.5 h-3.5" />
                            <span>Block</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 text-center">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${
                confirmingUser.action === "block"
                  ? "bg-red-100 dark:bg-red-950/60 text-red-600"
                  : "bg-green-100 dark:bg-green-950/60 text-green-600"
              }`}
            >
              {confirmingUser.action === "block" ? (
                <AlertTriangle className="w-7 h-7" />
              ) : (
                <ShieldCheck className="w-7 h-7" />
              )}
            </div>

            <h3 className="text-xl font-bold uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              {confirmingUser.action === "block" ? "Suspend User?" : "Reinstate User?"}
            </h3>

            <p className="mt-2 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              {confirmingUser.action === "block" ? (
                <>
                  Are you sure you want to block{" "}
                  <strong>{confirmingUser.user.name || confirmingUser.user.email}</strong>? They will be prevented from placing orders or creating menu items.
                </>
              ) : (
                <>
                  Reinstate access for{" "}
                  <strong>{confirmingUser.user.name || confirmingUser.user.email}</strong>?
                  Their platform privileges will be restored immediately.
                </>
              )}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setConfirmingUser(null)}
                className="flex-1 py-3 px-4 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-bold uppercase text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleToggleBlock}
                disabled={Boolean(processingId)}
                className={`flex-1 py-3 px-4 rounded-xl text-white text-xs font-bold uppercase tracking-wider shadow flex items-center justify-center gap-1.5 cursor-pointer font-[family-name:var(--font-heading)] ${
                  confirmingUser.action === "block"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {processingId ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : confirmingUser.action === "block" ? (
                  <UserX className="w-4 h-4" />
                ) : (
                  <UserCheck className="w-4 h-4" />
                )}
                <span>Confirm {confirmingUser.action}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  User,
  Mail,
  Shield,
  Store,
  CreditCard,
  CheckCircle2,
  Camera,
  Upload,
  Loader2,
  Save,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/lib/auth-helpers";
import { updateUser } from "@/lib/auth-client";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, token, isVendor, isPremium } = useAuth();

  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize fields once when user data is first available
  useEffect(() => {
    if (user && !isInitialized) {
      setName(user.name || "");
      setBusinessName(user.businessName || "");
      setImageUrl(user.image || "");
      setIsInitialized(true);
    }
  }, [user?.email, isInitialized, user]);

  if (!user) return null;

  // Open device/phone file picker
  const handleTriggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle Photo Upload from Phone or Computer (via ImgBB)
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type & size (< 10MB)
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose a valid image file (JPG, PNG, WEBP).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image file must be under 10MB.");
      return;
    }

    // Instant local preview for immediate visual feedback on the avatar
    const localPreviewUrl = URL.createObjectURL(file);
    setImageUrl(localPreviewUrl);

    setIsUploading(true);
    try {
      const imgbbKey =
        process.env.NEXT_PUBLIC_IMGBB_API_KEY || "5f3cbbefddfa37f8e36209d997bb7615";
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success && data.data?.url) {
        setImageUrl(data.data.url);
        toast.success("Photo uploaded! Click 'Save Changes' to update your profile.");
      } else {
        toast.error("Failed to upload photo to cloud. Please try again.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Network error while uploading photo.");
    } finally {
      setIsUploading(false);
      // Reset input value so re-selecting same file works
      if (e.target) e.target.value = "";
    }
  };

  // Handle Profile Update Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    setIsSaving(true);
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://pizzahub-server-pearl.vercel.app";
      const jwtToken =
        token || (typeof window !== "undefined" ? localStorage.getItem("pizzahub_jwt") : "");

      // 1. Update backend MongoDB database
      const res = await fetch(`${serverUrl}/api/auth/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
        },
        body: JSON.stringify({
          name: name.trim(),
          image: imageUrl.trim(),
          businessName: isVendor ? businessName.trim() : undefined,
        }),
      });

      // 2. Update client Better Auth session
      try {
        await updateUser({
          name: name.trim(),
          image: imageUrl.trim() || undefined,
        });
      } catch (authErr) {
        console.warn("Client session update error (non-fatal):", authErr);
      }

      // 3. Re-issue JWT token with updated name & image
      if (user.email) {
        const syncRes = await fetch(`${serverUrl}/api/auth/token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            name: name.trim(),
            role: user.role,
            image: imageUrl.trim(),
          }),
        });
        const syncData = await syncRes.json();
        if (syncData.success && syncData.token && typeof window !== "undefined") {
          localStorage.setItem("pizzahub_jwt", syncData.token);
        }
      }

      toast.success("Profile updated successfully!");

      // Refresh page after a brief moment to update sidebar and navbar avatars
      setTimeout(() => {
        window.location.reload();
      }, 700);
    } catch (err) {
      console.error("Save profile error:", err);
      toast.error("Failed to save profile changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Hidden file input for mobile/device photo upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
          Profile Settings
        </h1>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
          Manage your personal account details, upload a profile photo from your device, and update your information.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Main Profile Avatar & Quick Info Card */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-stone-100 dark:border-stone-800">
            {/* Avatar with Camera Button */}
            <div className="relative group shrink-0">
              <div
                onClick={handleTriggerUpload}
                className="relative w-24 h-24 rounded-3xl bg-stone-100 dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 flex items-center justify-center text-3xl font-black text-amber-500 uppercase overflow-hidden shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
              >
                {imageUrl ? (
                  <Image src={imageUrl} alt={name || "User"} fill unoptimized className="object-cover" />
                ) : (
                  <span>{name ? name[0] : "U"}</span>
                )}

                {/* Uploading Spinner Overlay */}
                {isUploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                )}
              </div>

              {/* Photo Upload Trigger Button */}
              <button
                type="button"
                onClick={handleTriggerUpload}
                disabled={isUploading}
                className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-110"
                title="Upload photo from phone or computer"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Intro */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h2 className="text-2xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
                  {name || "PizzaHub User"}
                </h2>
                <span className="px-3 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider">
                  {user.role}
                </span>
                {isPremium && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 text-xs font-black uppercase">
                    PRO Vendor
                  </span>
                )}
              </div>
              <p className="text-sm text-stone-500 dark:text-stone-400 flex items-center justify-center sm:justify-start gap-2">
                <Mail className="w-4 h-4 text-stone-400" />
                <span>{user.email}</span>
              </p>

              {/* Upload action button */}
              <div className="mt-3">
                <button
                  type="button"
                  onClick={handleTriggerUpload}
                  disabled={isUploading}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose new photo from phone or computer</span>
                </button>
              </div>
            </div>
          </div>

          {/* Edit Form Fields Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name Input (Editable & clearable) */}
            <div>
              <label
                htmlFor="profile-name-input"
                className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="profile-name-input"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                />
              </div>
            </div>

            {/* Email Address (Read-only for security) */}
            <div>
              <label
                htmlFor="profile-email-input"
                className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5"
              >
                Email Address <span className="text-stone-400 font-normal">(Primary Auth)</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="profile-email-input"
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800/50 text-sm text-stone-500 dark:text-stone-400 cursor-not-allowed"
                />
              </div>
            </div>

            {/* If Vendor: Restaurant / Kitchen Name Input */}
            {isVendor && (
              <div>
                <label
                  htmlFor="profile-business-input"
                  className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5"
                >
                  Restaurant / Kitchen Name
                </label>
                <div className="relative">
                  <Store className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="profile-business-input"
                    type="text"
                    placeholder="Your restaurant or kitchen name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  />
                </div>
              </div>
            )}

            {/* Photo URL (or manual URL input) */}
            <div>
              <label
                htmlFor="profile-image-url-input"
                className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5"
              >
                Profile Photo URL <span className="text-stone-400 font-normal">(Auto-updated on upload)</span>
              </label>
              <div className="relative">
                <Camera className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="profile-image-url-input"
                  type="url"
                  placeholder="Your profile image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                />
              </div>
            </div>

            {/* Account Role Read-Only Card */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                Account Role
              </label>
              <div className="p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 flex items-center justify-between text-sm">
                <span className="font-bold text-stone-800 dark:text-stone-200 capitalize">
                  {user.role} Account
                </span>
                <ShieldCheck className="w-4 h-4 text-green-500" />
              </div>
            </div>

            {/* Vendor Subscription Plan Card */}
            {isVendor && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                  Subscription Tier
                </label>
                <div className="p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 flex items-center justify-between text-sm">
                  <span className="font-black text-stone-800 dark:text-stone-200 uppercase">
                    {user.subscriptionPlan || "free"}
                  </span>
                  {isPremium ? (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-black uppercase">
                      PRO ACTIVE
                    </span>
                  ) : (
                    <span className="text-xs text-stone-500">Max 3 Items</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Submit Action Button */}
          <div className="mt-8 pt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-end">
            <button
              type="submit"
              disabled={isSaving || isUploading}
              className="py-3 px-6 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-red-600/30 flex items-center gap-2 cursor-pointer font-[family-name:var(--font-heading)]"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Profile Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

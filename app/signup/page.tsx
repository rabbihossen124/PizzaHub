"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Flame,
  User,
  Mail,
  Lock,
  Store,
  Pizza,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Loader2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { signUp, signIn } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [role, setRole] = useState<"customer" | "vendor">("customer");
  const [businessName, setBusinessName] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Password rules validation
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasLowercase;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!isPasswordValid) {
      setErrorMessage(
        "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter."
      );
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await signUp.email({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        image: imageUrl.trim() || undefined,
        role,
        businessName: role === "vendor" ? businessName.trim() : undefined,
      } as Parameters<typeof signUp.email>[0]);

      if (error) {
        setErrorMessage(error.message || "Failed to create account. Please try again.");
        toast.error(error.message || "Sign up failed.");
      } else {
        toast.success(`Welcome to PizzaHub, ${name.trim()}! Account created.`);
        // Redirect according to chosen role
        if (role === "vendor") {
          router.push("/dashboard/vendor");
        } else {
          router.push("/dashboard/customer");
        }
      }
    } catch (err: unknown) {
      console.error("Sign up error:", err);
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: role === "vendor" ? "/dashboard/vendor" : "/dashboard/customer",
      });
    } catch (err: unknown) {
      console.error("Google sign in error:", err);
      const msg = err instanceof Error ? err.message : "Google sign in failed.";
      toast.error(msg);
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Warm Elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Header Branding */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 text-amber-300" />
            </div>
            <span className="text-2xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
              Pizza<span className="text-red-600">Hub</span>
            </span>
          </Link>
          <h2 className="mt-4 text-2xl sm:text-3xl font-black uppercase tracking-tight text-stone-900 dark:text-white font-[family-name:var(--font-heading)]">
            Create Your Account
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            Join the community for wood-fired artisan pizza delivery and chef kitchens.
          </p>
        </div>

        {/* Card Form */}
        <div className="mt-8 bg-white dark:bg-stone-900 py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-stone-200 dark:border-stone-800">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Account Role Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                I want to register as <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* Customer Role Option */}
                <button
                  type="button"
                  onClick={() => setRole("customer")}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                    role === "customer"
                      ? "border-red-600 bg-red-50/60 dark:bg-red-950/40 text-red-900 dark:text-red-200 ring-2 ring-red-600/20"
                      : "border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40 text-stone-600 dark:text-stone-400 hover:border-stone-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Pizza className={`w-5 h-5 ${role === "customer" ? "text-red-600" : "text-stone-400"}`} />
                    {role === "customer" && (
                      <CheckCircle2 className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider">
                      Customer
                    </div>
                    <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">
                      Order handcrafted pizzas
                    </p>
                  </div>
                </button>

                {/* Vendor Role Option */}
                <button
                  type="button"
                  onClick={() => setRole("vendor")}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                    role === "vendor"
                      ? "border-red-600 bg-red-50/60 dark:bg-red-950/40 text-red-900 dark:text-red-200 ring-2 ring-red-600/20"
                      : "border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40 text-stone-600 dark:text-stone-400 hover:border-stone-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Store className={`w-5 h-5 ${role === "vendor" ? "text-red-600" : "text-stone-400"}`} />
                    {role === "vendor" && (
                      <CheckCircle2 className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider">
                      Vendor (Kitchen)
                    </div>
                    <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">
                      Sell & manage menu items
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* If Vendor: Business / Restaurant Name */}
            {role === "vendor" && (
              <div>
                <label
                  htmlFor="business-name-input"
                  className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1"
                >
                  Restaurant / Kitchen Name
                </label>
                <div className="relative">
                  <Store className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="business-name-input"
                    type="text"
                    placeholder="Your restaurant or kitchen name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  />
                </div>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label
                htmlFor="full-name-input"
                className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="full-name-input"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email-address-input"
                className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="email-address-input"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                />
              </div>
            </div>

            {/* Password with rules indicator */}
            <div>
              <label
                htmlFor="password-input"
                className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Rules Checklist (Rubric Requirement) */}
              <div className="mt-2.5 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-700/60 space-y-1.5 text-[11px]">
                <div
                  className={`flex items-center gap-1.5 ${
                    hasMinLength ? "text-green-600 dark:text-green-400 font-semibold" : "text-stone-400"
                  }`}
                >
                  {hasMinLength ? (
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span>Minimum 6 characters</span>
                </div>
                <div
                  className={`flex items-center gap-1.5 ${
                    hasUppercase ? "text-green-600 dark:text-green-400 font-semibold" : "text-stone-400"
                  }`}
                >
                  {hasUppercase ? (
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span>At least one uppercase letter (A-Z)</span>
                </div>
                <div
                  className={`flex items-center gap-1.5 ${
                    hasLowercase ? "text-green-600 dark:text-green-400 font-semibold" : "text-stone-400"
                  }`}
                >
                  {hasLowercase ? (
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span>At least one lowercase letter (a-z)</span>
                </div>
              </div>
            </div>

            {/* Profile Image (Optional, can be skipped) */}
            <div>
              <label
                htmlFor="profile-image-input"
                className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1"
              >
                Profile Image URL <span className="text-stone-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <ImageIcon className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="profile-image-input"
                  type="url"
                  placeholder="Your profile image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                />
              </div>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-xs">
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading || !isPasswordValid}
                className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black uppercase tracking-wider text-xs sm:text-sm transition-all shadow-lg hover:shadow-red-600/30 flex items-center justify-center gap-2 font-[family-name:var(--font-heading)] cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create PizzaHub Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200 dark:border-stone-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-stone-900 px-3 text-stone-400 font-semibold tracking-wider">
                Or Continue With
              </span>
            </div>
          </div>

          {/* Google Sign In Button */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={isGoogleLoading}
              className="w-full py-3 px-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              {isGoogleLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Sign In Link */}
          <div className="mt-6 text-center text-xs text-stone-500 dark:text-stone-400">
            Already have a PizzaHub account?{" "}
            <Link
              href="/signin"
              className="text-red-600 dark:text-red-400 font-bold hover:underline"
            >
              Sign In here
            </Link>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center text-[11px] text-stone-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
          <span>Admin accounts cannot be created publicly. Assigned securely.</span>
        </div>
      </div>
    </div>
  );
}

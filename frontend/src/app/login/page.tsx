"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Smartphone, LogIn, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthShell from "@/components/auth/AuthShell";
import FormField, { TextInput } from "@/components/auth/FormField";
import PasswordInput from "@/components/auth/PasswordInput";
import { login, AuthApiError } from "@/lib/api/auth";
import { useCartStore } from "@/store/useCartStore";
import { trackCustomerEvent } from "@/lib/api/events";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/my-account/";
  const { setCustomer, hydrate, isHydrated, customer } = useCartStore();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ mobile?: string; password?: string }>({});

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (isHydrated && customer) {
      router.replace(redirect);
    }
  }, [isHydrated, customer, router, redirect]);

  const validate = () => {
    const errs: typeof fieldErrors = {};
    const cleaned = mobile.replace(/\D/g, "");
    if (cleaned.length !== 10) errs.mobile = "Enter a valid 10-digit mobile number.";
    if (!password) errs.password = "Password is required.";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setError("");

    try {
      const res = await login({ mobile: mobile.replace(/\D/g, ""), password });
      setCustomer(res.customer, res.token);
      trackCustomerEvent("login", { metadata: { mobile: res.customer.mobileNumber } });
      router.push(redirect);
    } catch (err) {
      if (err instanceof AuthApiError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to sign in. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isHydrated) return null;

  return (
    <>
      <Header />
      <AuthShell
        badge="Welcome Back"
        title="Sign In to Your Account"
        subtitle="Access your orders, saved addresses, rewards, and referral credits securely."
        footer={
          <p className="text-center font-body text-xs text-walnut-brown/70">
            Don&apos;t have an account?{" "}
            <Link href="/create-account/" className="font-heading font-bold text-moss-green hover:text-walnut-brown transition-colors uppercase tracking-wider">
              Create Account
            </Link>
          </p>
        }
      >
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-body border border-red-100"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormField id="mobile" label="Mobile Number" required error={fieldErrors.mobile}>
            <div className="relative">
              <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-walnut-brown/35 pointer-events-none" />
              <TextInput
                id="mobile"
                type="tel"
                value={mobile}
                onChange={(v) => setMobile(v.replace(/\D/g, ""))}
                placeholder="10-digit mobile number"
                maxLength={10}
                inputMode="tel"
                autoComplete="tel"
                error={!!fieldErrors.mobile}
              />
            </div>
          </FormField>

          <FormField id="password" label="Password" required error={fieldErrors.password}>
            <PasswordInput
              id="password"
              value={password}
              onChange={setPassword}
              placeholder="Your account password"
              autoComplete="current-password"
              error={fieldErrors.password}
            />
          </FormField>

          <div className="flex justify-end">
            <Link
              href="/forgot-password/"
              className="font-heading text-[11px] font-bold text-moss-green hover:text-walnut-brown uppercase tracking-wider transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
            className="w-full flex items-center justify-center gap-2 bg-moss-green hover:bg-walnut-brown text-white py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-md disabled:opacity-60"
          >
            <LogIn className="h-4 w-4" />
            {isSubmitting ? "Signing In..." : "Sign In"}
          </motion.button>
        </form>

        <div className="mt-6 p-4 rounded-2xl bg-cream-dark/60 border border-walnut-brown/8">
          <p className="font-body text-[11px] text-walnut-brown/60 leading-relaxed">
            Prefer to shop without an account?{" "}
            <Link href="/cart/" className="text-moss-green font-semibold hover:underline inline-flex items-center gap-0.5">
              Continue as guest at checkout <ArrowRight className="h-3 w-3" />
            </Link>
          </p>
        </div>
      </AuthShell>
      <Footer />
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

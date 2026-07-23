"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { KeyRound, CheckCircle2, ShieldAlert } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthShell from "@/components/auth/AuthShell";
import FormField from "@/components/auth/FormField";
import PasswordInput from "@/components/auth/PasswordInput";
import PasswordStrengthBar from "@/components/auth/PasswordStrengthBar";
import { resetPassword, AuthApiError } from "@/lib/api/auth";
import { passwordsMatch } from "@/lib/auth/passwordStrength";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "mock-reset-token";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch(password, confirmPassword)) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await resetPassword(token, password);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof AuthApiError || err instanceof Error ? err.message : "Failed to reset password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <AuthShell
        badge="Account Recovery"
        title="Set New Password"
        subtitle="Choose a strong, unique password for your Blovit account."
        footer={
          <p className="text-center font-body text-xs text-walnut-brown/70">
            Remembered your password?{" "}
            <Link href="/login/" className="font-heading font-bold text-moss-green hover:text-walnut-brown uppercase tracking-wider">
              Sign In
            </Link>
          </p>
        }
      >
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-body border border-red-100 flex items-start gap-2"
          >
            <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
            <div>{error}</div>
          </motion.div>
        )}

        {success ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6 space-y-4">
            <div className="h-14 w-14 bg-moss-green/10 text-moss-green rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="font-heading text-lg font-bold text-walnut-brown">Password Updated!</h3>
            <p className="font-body text-xs text-walnut-brown/70 max-w-sm mx-auto">
              Your password has been successfully reset. You can now sign in with your new credentials.
            </p>
            <Link
              href="/login/"
              className="inline-block bg-moss-green hover:bg-walnut-brown text-white px-8 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-md mt-4"
            >
              Sign In Now
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField id="password" label="New Password" required>
              <PasswordInput
                id="password"
                value={password}
                onChange={setPassword}
                placeholder="Min. 8 characters with numbers & symbols"
                autoComplete="new-password"
              />
              <PasswordStrengthBar password={password} />
            </FormField>

            <FormField id="confirmPassword" label="Confirm New Password" required>
              <PasswordInput
                id="confirmPassword"
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="Re-enter new password"
                autoComplete="new-password"
              />
              <AnimatePresence>
                {passwordsMatch(password, confirmPassword) && confirmPassword && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-1.5 pl-3 text-[11px] font-body text-moss-green flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Passwords match
                  </motion.p>
                )}
              </AnimatePresence>
            </FormField>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
              className="w-full flex items-center justify-center gap-2 bg-moss-green hover:bg-walnut-brown text-white py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-md disabled:opacity-60"
            >
              <KeyRound className="h-4 w-4" />
              {isSubmitting ? "Updating Password..." : "Reset Password"}
            </motion.button>
          </form>
        )}
      </AuthShell>
      <Footer />
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}

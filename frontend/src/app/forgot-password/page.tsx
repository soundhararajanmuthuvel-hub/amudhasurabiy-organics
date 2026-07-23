"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Mail, ArrowLeft, Send, CheckCircle2, ShieldAlert } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthShell from "@/components/auth/AuthShell";
import FormField, { TextInput } from "@/components/auth/FormField";
import { forgotPassword, verifyForgotPasswordEmail, AuthApiError } from "@/lib/api/auth";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [mobile, setMobile] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [emailHint, setEmailHint] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = mobile.replace(/\D/g, "");
    if (cleaned.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await forgotPassword(cleaned);
      if (!res.found) {
        setError(res.message || "No account found with this mobile number.");
        return;
      }

      if (res.hasEmail) {
        setEmailHint(res.emailHint || "");
        setStep(2);
      } else {
        setMessage(
          res.message ||
            "Your account does not have an email on file. Our admin team will verify your identity and send password reset instructions via SMS within 24 hours."
        );
        setStep(3);
      }
    } catch (err) {
      setError(err instanceof AuthApiError || err instanceof Error ? err.message : "Failed to process request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      setError("Please enter your registered email address.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await verifyForgotPasswordEmail(mobile.replace(/\D/g, ""), emailInput.trim());
      setMessage(res.message);
      setStep(3);
    } catch (err) {
      setError(err instanceof AuthApiError || err instanceof Error ? err.message : "Email verification failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <AuthShell
        badge="Account Recovery"
        title="Reset Your Password"
        subtitle="Follow the steps to recover access to your Blovit account."
        footer={
          <p className="text-center font-body text-xs text-walnut-brown/70">
            Remembered your password?{" "}
            <Link
              href="/login/"
              className="font-heading font-bold text-moss-green hover:text-walnut-brown transition-colors uppercase tracking-wider inline-flex items-center gap-1"
            >
              <ArrowLeft className="h-3 w-3" /> Back to Sign In
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

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form
              key="step1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onSubmit={handleMobileSubmit}
              className="space-y-5"
            >
              <FormField id="mobile" label="Registered Mobile Number" required>
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
                  />
                </div>
              </FormField>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                className="w-full flex items-center justify-center gap-2 bg-moss-green hover:bg-walnut-brown text-white py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-md disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Searching Account..." : "Continue"}
              </motion.button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form
              key="step2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onSubmit={handleEmailSubmit}
              className="space-y-5"
            >
              <div className="p-4 bg-moss-green/10 rounded-2xl border border-moss-green/20 text-xs font-body text-walnut-brown">
                <p className="font-semibold text-moss-green mb-1">Account Found!</p>
                <p>
                  An email is registered on this account ({emailHint}). Please enter your email address to receive the password reset link.
                </p>
              </div>

              <FormField id="emailInput" label="Confirm Email Address" required>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-walnut-brown/35 pointer-events-none" />
                  <TextInput
                    id="emailInput"
                    type="email"
                    value={emailInput}
                    onChange={setEmailInput}
                    placeholder="Enter your registered email"
                    autoComplete="email"
                  />
                </div>
              </FormField>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3.5 bg-cream-dark hover:bg-walnut-brown hover:text-white text-walnut-brown rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Back
                </button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                  className="w-2/3 flex items-center justify-center gap-2 bg-moss-green hover:bg-walnut-brown text-white py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-md disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Sending Link..." : "Send Reset Link"}
                </motion.button>
              </div>
            </motion.form>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4 space-y-4"
            >
              <div className="h-14 w-14 bg-moss-green/10 text-moss-green rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-lg font-bold text-walnut-brown">Request Submitted</h3>
              <p className="font-body text-xs text-walnut-brown/80 leading-relaxed max-w-sm mx-auto p-4 bg-cream-dark/60 rounded-2xl border border-walnut-brown/10">
                {message}
              </p>
              <Link
                href="/login/"
                className="inline-block bg-moss-green hover:bg-walnut-brown text-white px-8 py-3.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-md mt-4"
              >
                Return to Sign In
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </AuthShell>
      <Footer />
    </>
  );
}

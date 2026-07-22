"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Gift, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthShell from "@/components/auth/AuthShell";
import FormField, { TextInput } from "@/components/auth/FormField";
import PasswordInput from "@/components/auth/PasswordInput";
import PasswordStrengthBar from "@/components/auth/PasswordStrengthBar";
import { register, AuthApiError } from "@/lib/api/auth";
import { useCartStore } from "@/store/useCartStore";
import { trackCustomerEvent } from "@/lib/api/events";
import { passwordsMatch } from "@/lib/auth/passwordStrength";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh",
];

function CreateAccountForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refCode = searchParams.get("ref") || "";
  const { setCustomer, hydrate, isHydrated, customer } = useCartStore();

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Tamil Nadu");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState(refCode);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (refCode) setReferralCode(refCode);
  }, [refCode]);

  useEffect(() => {
    if (isHydrated && customer) router.replace("/my-account/");
  }, [isHydrated, customer, router]);

  const getFieldError = (field: string): string | undefined => {
    if (!touched[field]) return undefined;
    switch (field) {
      case "fullName":
        return fullName.trim().length < 2 ? "Please enter your full name." : undefined;
      case "mobile":
        return mobile.replace(/\D/g, "").length !== 10 ? "Enter a valid 10-digit mobile number." : undefined;
      case "city":
        return city.trim().length < 2 ? "City is required." : undefined;
      case "password":
        return password.length < 8 ? "Password must be at least 8 characters." : undefined;
      case "confirmPassword":
        return !passwordsMatch(password, confirmPassword) ? "Passwords do not match." : undefined;
      case "terms":
        return !acceptTerms ? "You must accept the Terms & Conditions." : undefined;
      default:
        return undefined;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true, mobile: true, city: true, password: true, confirmPassword: true, terms: true,
    });

    if (
      getFieldError("fullName") || getFieldError("mobile") || getFieldError("city") ||
      getFieldError("password") || getFieldError("confirmPassword") || getFieldError("terms")
    ) return;

    setIsSubmitting(true);
    setError("");

    try {
      const res = await register({
        fullName: fullName.trim(),
        mobile: mobile.replace(/\D/g, ""),
        email: email.trim() || undefined,
        city: city.trim(),
        state,
        password,
        referralCode: referralCode.trim() || undefined,
        acceptTerms,
      });
      setCustomer(res.customer, res.token);
      trackCustomerEvent("login", { metadata: { source: "registration" } });
      router.push("/my-account/");
    } catch (err) {
      setError(err instanceof AuthApiError || err instanceof Error ? err.message : "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isHydrated) return null;

  return (
    <>
      <Header />
      <AuthShell
        badge="Join Our Family"
        title="Create Your Account"
        subtitle="One account for orders, rewards, and sharing pure nutrition with friends."
        footer={
          <p className="text-center font-body text-xs text-walnut-brown/70">
            Already have an account?{" "}
            <Link href="/login/" className="font-heading font-bold text-moss-green hover:text-walnut-brown transition-colors uppercase tracking-wider">
              Sign In
            </Link>
          </p>
        }
      >
        {error && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-body border border-red-100">
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 scrollbar-thin">
          <FormField id="fullName" label="Full Name" required error={getFieldError("fullName")}>
            <TextInput id="fullName" value={fullName} onChange={setFullName}
              placeholder="As on your ID" autoComplete="name" error={!!getFieldError("fullName")}
              onBlur={() => setTouched((t) => ({ ...t, fullName: true }))} />
          </FormField>

          <FormField id="mobile" label="Mobile Number" required error={getFieldError("mobile")}>
            <TextInput id="mobile" type="tel" value={mobile}
              onChange={(v) => setMobile(v.replace(/\D/g, ""))} placeholder="10-digit number"
              maxLength={10} inputMode="tel" autoComplete="tel" error={!!getFieldError("mobile")}
              onBlur={() => setTouched((t) => ({ ...t, mobile: true }))} />
          </FormField>

          <FormField id="email" label="Email" hint="Optional — used for order updates and password recovery">
            <TextInput id="email" type="email" value={email} onChange={setEmail}
              placeholder="you@example.com" autoComplete="email" inputMode="email" />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField id="city" label="City" required error={getFieldError("city")}>
              <TextInput id="city" value={city} onChange={setCity} placeholder="Kumbakonam"
                autoComplete="address-level2" error={!!getFieldError("city")}
                onBlur={() => setTouched((t) => ({ ...t, city: true }))} />
            </FormField>
            <FormField id="state" label="State" required>
              <select id="state" value={state} onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-3.5 bg-cream border border-walnut-brown/15 rounded-full font-body text-sm text-walnut-brown focus:outline-none focus:border-moss-green focus:ring-2 focus:ring-moss-green/20">
                {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </FormField>
          </div>

          <FormField id="password" label="Password" required error={getFieldError("password")}>
            <PasswordInput id="password" value={password} onChange={setPassword}
              placeholder="Min. 8 characters" autoComplete="new-password"
              error={getFieldError("password")}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))} />
            <PasswordStrengthBar password={password} />
          </FormField>

          <FormField id="confirmPassword" label="Confirm Password" required error={getFieldError("confirmPassword")}>
            <PasswordInput id="confirmPassword" value={confirmPassword} onChange={setConfirmPassword}
              placeholder="Re-enter password" autoComplete="new-password"
              error={getFieldError("confirmPassword")}
              onBlur={() => setTouched((t) => ({ ...t, confirmPassword: true }))} />
            <AnimatePresence>
              {passwordsMatch(password, confirmPassword) && confirmPassword && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="mt-1.5 pl-3 text-[11px] font-body text-moss-green flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Passwords match
                </motion.p>
              )}
            </AnimatePresence>
          </FormField>

          <FormField id="referralCode" label="Referral Code" hint="Optional — enter a friend's code if you have one">
            <div className="relative">
              <Gift className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-walnut-brown/35 pointer-events-none" />
              <TextInput id="referralCode" value={referralCode} onChange={setReferralCode}
                placeholder="AMU-XXXXXX" />
            </div>
          </FormField>

          <label className="flex items-start gap-3 cursor-pointer group pt-1">
            <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)}
              onBlur={() => setTouched((t) => ({ ...t, terms: true }))}
              className="mt-0.5 h-4 w-4 rounded border-walnut-brown/20 text-moss-green focus:ring-moss-green" />
            <span className="font-body text-[11px] text-walnut-brown/70 leading-relaxed">
              I accept the{" "}
              <Link href="/terms-conditions/" className="text-moss-green font-semibold hover:underline">Terms & Conditions</Link>
              {" "}and{" "}
              <Link href="/privacy-policy-2/" className="text-moss-green font-semibold hover:underline">Privacy Policy</Link>
              <span className="text-moss-green ml-0.5">*</span>
            </span>
          </label>
          {getFieldError("terms") && (
            <p className="text-[11px] font-body text-red-500 pl-1">{getFieldError("terms")}</p>
          )}

          <motion.button type="submit" disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.01 }} whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
            className="w-full flex items-center justify-center gap-2 bg-moss-green hover:bg-walnut-brown text-white py-4 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all shadow-md disabled:opacity-60 sticky bottom-0">
            <UserPlus className="h-4 w-4" />
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </motion.button>
        </form>
      </AuthShell>
      <Footer />
    </>
  );
}

export default function CreateAccountPage() {
  return (
    <Suspense fallback={null}>
      <CreateAccountForm />
    </Suspense>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Sparkles } from "lucide-react";

interface AuthShellProps {
  title: string;
  subtitle: string;
  badge?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function AuthShell({ title, subtitle, badge, children, footer }: AuthShellProps) {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-cream flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Brand panel — desktop */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex flex-col justify-center space-y-8 pr-8"
        >
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-white border border-walnut-brown/10 shadow-lg flex items-center justify-center p-2">
              <Image src="/images/logo.png" alt="Amudhasurabiy Organics" width={48} height={48} className="object-contain" />
            </div>
            <div>
              <p className="font-heading text-xs font-bold text-moss-green uppercase tracking-widest">Secure Customer Portal</p>
              <p className="font-heading text-lg font-bold text-walnut-brown">Amudhasurabiy Organics</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl font-bold text-walnut-brown leading-tight">
              Pure Nutrition.<br />
              <span className="text-moss-green italic">Trusted by Families.</span>
            </h2>
            <p className="font-body text-sm text-walnut-brown/70 leading-relaxed max-w-md">
              Your account keeps orders, addresses, rewards, and referral credits in one secure place — crafted with the same care as our Blovit malts.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {[
              "256-bit encrypted sign-in",
              "FSSAI certified products",
              "Kumbakonam — direct from source",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-xs font-body text-walnut-brown/70">
                <ShieldCheck className="h-4 w-4 text-moss-green shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md mx-auto lg:max-w-none"
        >
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-walnut-brown/8 shadow-xl shadow-walnut-brown/5">
            {badge && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-moss-green/10 text-moss-green font-heading text-[10px] font-bold uppercase tracking-widest mb-5">
                <Sparkles className="h-3 w-3" />
                {badge}
              </div>
            )}

            <div className="mb-8">
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-walnut-brown tracking-tight">{title}</h1>
              <p className="font-body text-xs text-walnut-brown/60 mt-2 leading-relaxed">{subtitle}</p>
            </div>

            {children}

            {footer && <div className="mt-8 pt-6 border-t border-walnut-brown/8">{footer}</div>}
          </div>

          <p className="text-center mt-6 font-body text-[11px] text-walnut-brown/45">
            By continuing, you agree to our{" "}
            <Link href="/terms-conditions/" className="text-moss-green hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy-2/" className="text-moss-green hover:underline">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

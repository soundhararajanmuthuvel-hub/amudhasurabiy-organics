"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { evaluatePasswordStrength } from "@/lib/auth/passwordStrength";

interface PasswordStrengthBarProps {
  password: string;
  showHints?: boolean;
}

export default function PasswordStrengthBar({ password, showHints = true }: PasswordStrengthBarProps) {
  const strength = evaluatePasswordStrength(password);

  if (!password) return null;

  const reqList = [
    { label: "At least 8 characters", met: strength.requirements.minLength },
    { label: "Uppercase letter (A-Z)", met: strength.requirements.hasUppercase },
    { label: "Lowercase letter (a-z)", met: strength.requirements.hasLowercase },
    { label: "Number (0-9)", met: strength.requirements.hasNumber },
    { label: "Special character (!@#$)", met: strength.requirements.hasSpecial },
  ];

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center justify-between px-1">
        <div className="h-2 flex-1 bg-cream-dark rounded-full overflow-hidden mr-3 border border-walnut-brown/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${strength.percent}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full"
            style={{ backgroundColor: strength.color }}
          />
        </div>
        <span
          className="font-heading text-[10px] font-bold uppercase tracking-wider shrink-0 px-2.5 py-0.5 rounded-full"
          style={{ backgroundColor: `${strength.color}15`, color: strength.color }}
        >
          {strength.label}
        </span>
      </div>

      {showHints && (
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {reqList.map((req) => (
            <div key={req.label} className="flex items-center gap-1.5 text-[10px] font-body">
              {req.met ? (
                <Check className="h-3 w-3 text-moss-green shrink-0" />
              ) : (
                <X className="h-3 w-3 text-walnut-brown/30 shrink-0" />
              )}
              <span className={req.met ? "text-walnut-brown font-medium" : "text-walnut-brown/40"}>
                {req.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

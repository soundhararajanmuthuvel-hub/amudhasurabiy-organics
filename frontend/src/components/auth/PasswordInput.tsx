"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
  onBlur?: () => void;
}

export default function PasswordInput({
  id,
  value,
  onChange,
  placeholder = "Enter your password",
  required = true,
  autoComplete = "current-password",
  error,
  onBlur,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`w-full pr-12 pl-4 py-3.5 bg-cream border rounded-full font-body text-sm text-walnut-brown placeholder:text-walnut-brown/35 focus:outline-none focus:ring-2 focus:ring-moss-green/20 transition-all ${
            error ? "border-red-300 focus:border-red-400" : "border-walnut-brown/15 focus:border-moss-green"
          }`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-walnut-brown/40 hover:text-moss-green transition-colors p-0.5"
          aria-label={visible ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error && <p className="mt-1.5 pl-3 text-[11px] font-body text-red-500">{error}</p>}
    </div>
  );
}

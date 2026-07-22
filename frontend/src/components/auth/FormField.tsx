"use client";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export default function FormField({ id, label, required, error, hint, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-[10px] font-heading font-bold uppercase tracking-wider text-walnut-brown/60 mb-2 pl-1">
        {label}
        {required && <span className="text-moss-green ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 pl-3 text-[10px] font-body text-walnut-brown/45">{hint}</p>}
      {error && <p className="mt-1.5 pl-3 text-[11px] font-body text-red-500">{error}</p>}
    </div>
  );
}

export function TextInput({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  maxLength,
  autoComplete,
  error,
  onBlur,
  inputMode,
}: {
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  autoComplete?: string;
  error?: boolean;
  onBlur?: () => void;
  inputMode?: "text" | "tel" | "email" | "numeric";
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      required={required}
      maxLength={maxLength}
      autoComplete={autoComplete}
      inputMode={inputMode}
      placeholder={placeholder}
      className={`w-full px-4 py-3.5 bg-cream border rounded-full font-body text-sm text-walnut-brown placeholder:text-walnut-brown/35 focus:outline-none focus:ring-2 focus:ring-moss-green/20 transition-all ${
        error ? "border-red-300 focus:border-red-400" : "border-walnut-brown/15 focus:border-moss-green"
      }`}
    />
  );
}

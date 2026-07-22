export type PasswordStrengthTier = "Weak" | "Medium" | "Strong" | "Excellent";

export interface PasswordRequirements {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

export interface PasswordStrengthResult {
  score: number; // 0 to 5
  label: PasswordStrengthTier;
  percent: number; // 0 to 100
  color: string;
  requirements: PasswordRequirements;
  hints: string[];
}

export function evaluatePasswordStrength(password: string): PasswordStrengthResult {
  const requirements: PasswordRequirements = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[^a-zA-Z0-9]/.test(password),
  };

  if (!password) {
    return {
      score: 0,
      label: "Weak",
      percent: 0,
      color: "#E5E7EB",
      requirements,
      hints: ["Password is required"],
    };
  }

  let score = 0;
  const hints: string[] = [];

  if (requirements.minLength) score += 1;
  else hints.push("Use at least 8 characters");

  if (requirements.hasUppercase) score += 1;
  else hints.push("Add an uppercase letter");

  if (requirements.hasLowercase) score += 1;
  else hints.push("Add a lowercase letter");

  if (requirements.hasNumber) score += 1;
  else hints.push("Add a number");

  if (requirements.hasSpecial) score += 1;
  else hints.push("Add a special character (e.g. !@#$)");

  let label: PasswordStrengthTier = "Weak";
  let color = "#EF4444"; // red
  let percent = 25;

  if (score >= 5) {
    label = "Excellent";
    color = "#15803D"; // emerald green
    percent = 100;
  } else if (score >= 4) {
    label = "Strong";
    color = "#2E5A44"; // moss green
    percent = 75;
  } else if (score >= 3) {
    label = "Medium";
    color = "#D97706"; // amber
    percent = 50;
  } else {
    label = "Weak";
    color = "#EF4444";
    percent = 25;
  }

  return { score, label, percent, color, requirements, hints };
}

export function passwordsMatch(password: string, confirm: string): boolean {
  return password.length > 0 && password === confirm;
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

/** Formats "YYYY-MM" -> "Mon YYYY". Passes through free-text values like "Present". */
export function formatMonthYear(value: string): string {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return value;
  const [, year, month] = match;
  const idx = parseInt(month, 10) - 1;
  return `${MONTHS[idx] ?? month} ${year}`;
}

export function formatRange(start: string, end: string): string {
  return `${formatMonthYear(start)} — ${end === "Present" ? "Present" : formatMonthYear(end)}`;
}

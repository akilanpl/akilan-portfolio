"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-9 w-9" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-line dark:border-line-dark text-ink dark:text-ink-dark hover:border-ink/30 dark:hover:border-ink-dark/30 transition-colors"
    >
      {isDark ? <Sun className="h-4 w-4" strokeWidth={1.5} /> : <Moon className="h-4 w-4" strokeWidth={1.5} />}
    </button>
  );
}

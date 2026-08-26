"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="focus-ring inline-flex items-center gap-2 rounded-full border border-line dark:border-line-dark px-5 py-2.5 text-sm font-medium text-ink dark:text-ink-dark hover:border-ink/30 dark:hover:border-ink-dark/30"
    >
      <Printer className="h-3.5 w-3.5" strokeWidth={1.5} />
      Print / Save as PDF
    </button>
  );
}

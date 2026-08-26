"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { flatNav } from "@/lib/nav";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const results = useMemo(() => {
    if (!query) return flatNav;
    const q = query.toLowerCase();
    return flatNav.filter(
      (l) => l.label.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)
    );
  }, [query]);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      <button
        type="button"
        aria-label="Search"
        onClick={() => setOpen(true)}
        className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-line dark:border-line-dark text-ink dark:text-ink-dark hover:border-ink/30 dark:hover:border-ink-dark/30 transition-colors"
      >
        <Search className="h-4 w-4" strokeWidth={1.5} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center bg-ink/40 dark:bg-black/60 backdrop-blur-sm pt-[14vh] px-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-line dark:border-line-dark bg-surface dark:bg-surface-dark shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b border-line dark:border-line-dark px-4 py-3.5">
                <Search className="h-4 w-4 text-muted dark:text-muted-dark" strokeWidth={1.5} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pages…"
                  className="w-full bg-transparent text-[0.95rem] text-ink dark:text-ink-dark placeholder:text-muted dark:placeholder:text-muted-dark outline-none"
                />
                <kbd className="meta-label rounded border border-line dark:border-line-dark px-1.5 py-0.5">
                  esc
                </kbd>
              </div>
              <div className="max-h-80 overflow-y-auto p-2">
                {results.length === 0 && (
                  <p className="px-3 py-6 text-center text-sm text-muted dark:text-muted-dark">
                    No pages found.
                  </p>
                )}
                {results.map((l) => (
                  <button
                    key={l.href}
                    onClick={() => go(l.href)}
                    className="focus-ring group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left hover:bg-ink/[0.04] dark:hover:bg-ink-dark/[0.06]"
                  >
                    <span>
                      <span className="block text-sm font-medium text-ink dark:text-ink-dark">
                        {l.label}
                      </span>
                      <span className="block text-xs text-muted dark:text-muted-dark">
                        {l.description}
                      </span>
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted dark:text-muted-dark opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

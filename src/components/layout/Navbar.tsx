"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail, Download } from "lucide-react";
import { primaryNav, allNav } from "@/lib/nav";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { CommandPalette } from "@/components/layout/CommandPalette";
import profile from "@content/profile.json";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-line dark:border-line-dark bg-canvas/80 dark:bg-canvas-dark/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-content flex h-16 items-center justify-between">
          <Link href="/" className="focus-ring flex items-center gap-2 rounded-lg">
            <span className="font-display text-[1.05rem] tracking-tight text-ink dark:text-ink-dark">
              Akilan
            </span>
            <span className="font-mono text-[11px] text-muted dark:text-muted-dark">P L</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`focus-ring rounded text-sm transition-colors ${
                  pathname === link.href
                    ? "text-ink dark:text-ink-dark"
                    : "text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <CommandPalette />
            </div>
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <a
              href={profile.links.resume}
              download
              className="focus-ring hidden items-center gap-1.5 rounded-full border border-line dark:border-line-dark px-4 py-2 text-sm font-medium text-ink dark:text-ink-dark hover:border-ink/30 dark:hover:border-ink-dark/30 md:inline-flex"
            >
              <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
              Resume
            </a>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-line dark:border-line-dark text-ink dark:text-ink-dark"
            >
              {menuOpen ? (
                <X className="h-4 w-4" strokeWidth={1.5} />
              ) : (
                <Menu className="h-4 w-4" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-canvas dark:bg-canvas-dark pt-16"
          >
            <div className="container-content flex h-[calc(100%-4rem)] flex-col justify-between overflow-y-auto py-10">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {allNav.map((group, gi) => (
                  <motion.div
                    key={group.group}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: gi * 0.05 }}
                  >
                    <p className="meta-label mb-4">{group.group}</p>
                    <ul className="space-y-3">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="focus-ring group block rounded"
                          >
                            <span className="font-display text-lg tracking-tight text-ink dark:text-ink-dark transition-opacity group-hover:opacity-60">
                              {link.label}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <div className="mt-16 flex flex-wrap items-center justify-between gap-6 hairline pt-8">
                <div className="flex items-center gap-4">
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-line dark:border-line-dark hover:border-ink/30 dark:hover:border-ink-dark/30"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-line dark:border-line-dark hover:border-ink/30 dark:hover:border-ink-dark/30"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-line dark:border-line-dark hover:border-ink/30 dark:hover:border-ink-dark/30"
                    aria-label="Email"
                  >
                    <Mail className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                </div>
                <p className="font-mono text-xs text-muted dark:text-muted-dark">
                  {profile.location}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

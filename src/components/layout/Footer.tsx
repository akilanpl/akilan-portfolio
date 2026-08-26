"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { Container } from "@/components/ui/Card";
import { primaryNav } from "@/lib/nav";
import profile from "@content/profile.json";

export function Footer() {
  return (
    <footer className="hairline mt-32">
      <Container className="py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg tracking-tight text-ink dark:text-ink-dark">
              Akilan P L
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted dark:text-muted-dark">
              &ldquo;Retrieval quality is the real lever — most gains live upstream of the model.&rdquo;
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="focus-ring rounded text-sm text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-line dark:border-line-dark hover:border-ink/30 dark:hover:border-ink-dark/30"
            >
              <Github className="h-4 w-4" strokeWidth={1.5} />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-line dark:border-line-dark hover:border-ink/30 dark:hover:border-ink-dark/30"
            >
              <Linkedin className="h-4 w-4" strokeWidth={1.5} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-line dark:border-line-dark hover:border-ink/30 dark:hover:border-ink-dark/30"
            >
              <Mail className="h-4 w-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-6 hairline pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-muted dark:text-muted-dark">
            © {new Date().getFullYear()} Akilan P L. Built with Next.js.
          </p>
          <a
            href="#top"
            className="focus-ring flex items-center gap-1.5 rounded text-xs font-mono text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark"
          >
            Back to top <ArrowUp className="h-3 w-3" strokeWidth={1.5} />
          </a>
        </div>
      </Container>
    </footer>
  );
}

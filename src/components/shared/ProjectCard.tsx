"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Card";
import type { Project } from "@/lib/content";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="focus-ring group block rounded-2xl border border-line dark:border-line-dark bg-surface dark:bg-surface-dark p-7 transition-all duration-300 hover:border-ink/15 dark:hover:border-ink-dark/20 hover:shadow-[0_16px_40px_-24px_rgba(11,12,14,0.35)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="meta-label mb-2">{project.category}</p>
            <h3 className="font-display text-xl tracking-tight text-ink dark:text-ink-dark">
              {project.title}
            </h3>
          </div>
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted dark:text-muted-dark transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>

        {project.badge && (
          <Badge tone="accent" className="mt-4">
            {project.badge}
          </Badge>
        )}

        <p className="mt-4 text-[0.95rem] leading-relaxed text-muted dark:text-muted-dark">
          {project.oneLiner}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] text-muted dark:text-muted-dark border border-line dark:border-line-dark rounded-full px-2.5 py-1"
            >
              {t}
            </span>
          ))}
        </div>

        {project.metrics.length > 0 && (
          <div className="mt-6 hairline pt-5 grid grid-cols-2 gap-4">
            {project.metrics.slice(0, 2).map((m) => (
              <div key={m.label}>
                <p className="font-display text-lg tracking-tight text-ink dark:text-ink-dark">
                  {m.value}
                </p>
                <p className="text-xs text-muted dark:text-muted-dark mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  );
}

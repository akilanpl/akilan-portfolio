"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  date: string;
  title: string;
  subtitle?: string;
  category?: string;
  children?: React.ReactNode;
}

const categoryColor: Record<string, string> = {
  Education: "bg-accent-blue",
  Experience: "bg-accent-violet",
  Achievement: "bg-accent-cyan",
  "Open Source": "bg-ink dark:bg-ink-dark"
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line dark:bg-line-dark" />
      <ol className="space-y-10">
        {items.map((item, i) => (
          <motion.li
            key={`${item.title}-${i}`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="relative pl-8"
          >
            <span
              className={cn(
                "absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-canvas dark:ring-canvas-dark",
                categoryColor[item.category ?? ""] ?? "bg-muted"
              )}
            />
            <p className="meta-label mb-1.5">
              {item.date}
              {item.category ? ` · ${item.category}` : ""}
            </p>
            <h3 className="font-display text-lg tracking-tight text-ink dark:text-ink-dark">
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted dark:text-muted-dark max-w-xl">
                {item.subtitle}
              </p>
            )}
            {item.children}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

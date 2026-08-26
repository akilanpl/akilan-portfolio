"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { SkillCategory } from "@/lib/content";
import projects from "@content/projects.json";

const projectTitleBySlug = Object.fromEntries(
  (projects as { slug: string; title: string }[]).map((p) => [p.slug, p.title])
);

export function SkillsViz({ skills }: { skills: SkillCategory[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {skills.map((group, gi) => (
        <Card key={group.category} className="p-7">
          <p className="meta-label mb-6">{group.category}</p>
          <div className="space-y-5">
            {group.items.map((item, i) => (
              <div key={item.name}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-medium text-ink dark:text-ink-dark">{item.name}</p>
                  <span className="font-mono text-[11px] text-muted dark:text-muted-dark">
                    {item.level}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink/[0.06] dark:bg-ink-dark/[0.1]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: (gi * 4 + i) * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-accent-gradient"
                  />
                </div>
                {item.usedIn && item.usedIn.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.usedIn.map((slug) => (
                      <Link
                        key={slug}
                        href={`/projects/${slug}`}
                        className="focus-ring rounded font-mono text-[10px] text-muted dark:text-muted-dark hover:text-accent-blue"
                      >
                        used in: {projectTitleBySlug[slug] ?? slug}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

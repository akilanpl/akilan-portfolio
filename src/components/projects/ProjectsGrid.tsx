"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProjectCard } from "@/components/shared/ProjectCard";
import type { Project } from "@/lib/content";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.oneLiner.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [projects, category, query]);

  return (
    <>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`focus-ring rounded-full border px-4 py-1.5 text-sm transition-colors ${
                category === c
                  ? "border-ink dark:border-ink-dark bg-ink text-canvas dark:bg-ink-dark dark:text-canvas-dark"
                  : "border-line dark:border-line-dark text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted dark:text-muted-dark" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects or tech…"
            className="focus-ring w-full rounded-full border border-line dark:border-line-dark bg-transparent py-2 pl-9 pr-4 text-sm text-ink dark:text-ink-dark placeholder:text-muted dark:placeholder:text-muted-dark"
          />
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {filtered.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm text-muted dark:text-muted-dark">
          No projects match that search.
        </p>
      )}
    </>
  );
}

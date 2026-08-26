import type { Metadata } from "next";
import { Container, Card, Badge } from "@/components/ui/Card";
import { PageHeader } from "@/components/shared/PageHeader";
import { buildMetadata } from "@/lib/metadata";
import { getExperience } from "@/lib/content";
import { formatRange } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Experience",
  description: "Roles, internships, and the impact behind them.",
  path: "/experience"
});

export default function ExperiencePage() {
  const experience = getExperience();

  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Where the work has happened."
        description="Enterprise AI at KONE, and AI-literacy work with Perplexity — with the responsibilities, technologies, and measured impact behind each."
      />

      <Container className="pb-28">
        <div className="space-y-6">
          {experience.map((exp) => (
            <Card key={exp.id} className="p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="meta-label mb-2">{formatRange(exp.start, exp.end)}</p>
                  <h2 className="font-display text-2xl tracking-tight text-ink dark:text-ink-dark">
                    {exp.role}
                  </h2>
                  <p className="mt-1 text-muted dark:text-muted-dark">
                    {exp.org} · {exp.orgType}
                  </p>
                </div>
                <Badge>{exp.location}</Badge>
              </div>

              <p className="mt-6 max-w-2xl text-[0.95rem] leading-relaxed text-ink/90 dark:text-ink-dark/90">
                {exp.summary}
              </p>

              <div className="mt-8 hairline pt-6 space-y-6">
                {exp.highlights.map((h) => (
                  <div key={h.text} className="grid gap-3 sm:grid-cols-[1fr_auto]">
                    <p className="text-sm leading-relaxed text-ink/90 dark:text-ink-dark/90">
                      {h.text}
                    </p>
                    <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                      {h.metrics.map((m) => (
                        <span
                          key={m}
                          className="font-mono text-xs text-accent-blue whitespace-nowrap"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] text-muted dark:text-muted-dark border border-line dark:border-line-dark rounded-full px-2.5 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}

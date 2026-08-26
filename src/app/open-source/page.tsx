import type { Metadata } from "next";
import { Github, ArrowUpRight } from "lucide-react";
import { Container, Card, Badge } from "@/components/ui/Card";
import { PageHeader } from "@/components/shared/PageHeader";
import { buildMetadata } from "@/lib/metadata";
import { getOpenSource } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Open Source",
  description: "Contributions, GitHub activity, and merged pull requests.",
  path: "/open-source"
});

export default function OpenSourcePage() {
  const { githubUsername, contributions } = getOpenSource();

  return (
    <>
      <PageHeader
        eyebrow="Open Source"
        title="Contributing back to the tools I build with."
        description={`github.com/${githubUsername}`}
      />

      <Container className="pb-28">
        <div className="space-y-6">
          {contributions.map((c) => (
            <Card key={c.url} className="p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="meta-label mb-2">{c.type}</p>
                  <h2 className="font-display text-xl tracking-tight text-ink dark:text-ink-dark">
                    {c.project}
                  </h2>
                </div>
                <Badge tone="accent">{c.status}</Badge>
              </div>
              <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-ink/90 dark:text-ink-dark/90">
                {c.description}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted dark:text-muted-dark">
                {c.impact}
              </p>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring mt-6 inline-flex items-center gap-1.5 rounded font-mono text-xs text-accent-blue"
              >
                <Github className="h-3.5 w-3.5" /> View pull request
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </Card>
          ))}
        </div>

        {/* Live stats — architecture ready for GitHub API integration */}
        <Card className="mt-10 p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="meta-label mb-2">GitHub activity</p>
              <p className="text-sm text-muted dark:text-muted-dark">
                Live contribution graph, pinned repos, and language stats will render here once
                the GitHub API integration is connected.
              </p>
            </div>
            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring flex items-center gap-1.5 rounded-full border border-line dark:border-line-dark px-4 py-2 text-sm text-ink dark:text-ink-dark hover:border-ink/30 dark:hover:border-ink-dark/30"
            >
              <Github className="h-4 w-4" strokeWidth={1.5} /> View profile
            </a>
          </div>
        </Card>
      </Container>
    </>
  );
}

import type { Metadata } from "next";
import { Container, Card, Badge } from "@/components/ui/Card";
import { PageHeader } from "@/components/shared/PageHeader";
import { buildMetadata } from "@/lib/metadata";
import { getSpeaking } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Speaking",
  description: "Talks, workshops, and panels.",
  path: "/speaking"
});

export default function SpeakingPage() {
  const speaking = getSpeaking();

  return (
    <>
      <PageHeader
        eyebrow="Speaking"
        title="Workshops, talks & panels."
        description="Hands-on sessions teaching AI-assisted workflows, with more talks and panels to come."
      />

      <Container className="pb-28">
        <div className="space-y-6">
          {speaking.map((s) => (
            <Card key={s.title} className="p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="meta-label mb-2">{s.type}</p>
                  <h2 className="font-display text-xl tracking-tight text-ink dark:text-ink-dark">
                    {s.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted dark:text-muted-dark">
                    {s.org} · {s.date}
                  </p>
                </div>
                <Badge>{s.audience}</Badge>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink/90 dark:text-ink-dark/90">
                {s.description}
              </p>
              {!s.slides && !s.video && (
                <p className="mt-4 font-mono text-xs text-muted dark:text-muted-dark">
                  Slides & video: not yet available
                </p>
              )}
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}

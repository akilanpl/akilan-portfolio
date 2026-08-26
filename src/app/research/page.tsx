import type { Metadata } from "next";
import { Container, Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/shared/PageHeader";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { buildMetadata } from "@/lib/metadata";
import { getResearch, getProjects } from "@/lib/content";
import { FlaskConical } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Research",
  description: "Research interests, philosophy, and current directions.",
  path: "/research"
});

export default function ResearchPage() {
  const research = getResearch();
  const projects = getProjects();

  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Where the curiosity is pointed."
        description="Interests grounded in shipped work — each one links back to a project that tested it in practice."
      />

      <Container className="pb-28">
        <div className="grid gap-6 md:grid-cols-2">
          {research.interests.map((interest) => {
            const project = projects.find((p) => p.slug === interest.evidence);
            return (
              <Card key={interest.title} className="p-7">
                <h2 className="font-display text-lg tracking-tight text-ink dark:text-ink-dark">
                  {interest.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted dark:text-muted-dark">
                  {interest.description}
                </p>
                {project && (
                  <a
                    href={`/projects/${project.slug}`}
                    className="focus-ring mt-4 inline-block rounded font-mono text-xs text-accent-blue"
                  >
                    Evidence: {project.title} →
                  </a>
                )}
              </Card>
            );
          })}
        </div>

        <div className="mt-20">
          <ComingSoon
            icon={FlaskConical}
            title="Research philosophy, reading list & notes"
            description="A longer statement of research philosophy, current directions, collaborations, and an open reading list will live here as they take shape."
          />
        </div>
      </Container>
    </>
  );
}

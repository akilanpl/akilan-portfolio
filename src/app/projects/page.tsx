import type { Metadata } from "next";
import { Container } from "@/components/ui/Card";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { buildMetadata } from "@/lib/metadata";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description: "Case studies covering problem, architecture, trade-offs, and measured impact.",
  path: "/projects"
});

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Systems I've built, end to end."
        description="Each project page covers the problem, the architecture, the trade-offs, and what it actually moved."
      />
      <Container className="pb-28">
        <ProjectsGrid projects={projects} />
      </Container>
    </>
  );
}

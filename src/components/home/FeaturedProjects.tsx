import { SectionHeading, Container } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { getProjects } from "@/lib/content";

export function FeaturedProjects() {
  const featured = getProjects().filter((p) => p.featured);

  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected Work"
            title="Featured projects"
            description="A few systems I've built end to end — from constraint to architecture to measured impact."
          />
          <Button href="/projects" variant="outline" showArrow>
            All projects
          </Button>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Github, ArrowUpRight, ArrowLeft } from "lucide-react";
import { Container, Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/metadata";
import { getProjects, getProject } from "@/lib/content";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return buildMetadata({ title: "Project not found", description: "" });
  return buildMetadata({
    title: project.title,
    description: project.oneLiner,
    path: `/projects/${project.slug}`
  });
}

const sections: { key: keyof NonNullable<ReturnType<typeof getProject>>; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "background", label: "Background" },
  { key: "architecture", label: "Architecture" }
];

export default async function ProjectPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const allProjects = getProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const next = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <>
      <Container className="pt-14 pb-10">
        <Link
          href="/projects"
          className="focus-ring inline-flex items-center gap-1.5 rounded text-sm text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All projects
        </Link>

        <div className="mt-8 flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="meta-label mb-3">
              {project.category} · {project.period}
            </p>
            <h1 className="font-display text-display-2 tracking-tight text-ink dark:text-ink-dark max-w-3xl">
              {project.title}
            </h1>
            {project.badge && (
              <Badge tone="accent" className="mt-4">
                {project.badge}
              </Badge>
            )}
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-muted dark:text-muted-dark">
              {project.oneLiner}
            </p>
          </div>

          <div className="flex gap-3">
            {project.links.github && (
              <Button href={project.links.github} variant="outline" external>
                <Github className="h-4 w-4" strokeWidth={1.5} /> Code
              </Button>
            )}
            {project.links.demo && (
              <Button href={project.links.demo} external showArrow>
                Live demo
              </Button>
            )}
          </div>
        </div>
      </Container>

      {/* Metrics */}
      <div className="hairline">
        <Container className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <p className="font-display text-2xl tracking-tight text-ink dark:text-ink-dark">
                {m.value}
              </p>
              <p className="mt-1 text-sm text-muted dark:text-muted-dark">{m.label}</p>
              {m.detail && (
                <p className="mt-0.5 text-xs text-muted dark:text-muted-dark">{m.detail}</p>
              )}
            </div>
          ))}
        </Container>
      </div>

      <Container className="grid gap-14 py-20 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-12">
          {sections.map((s) => (
            <div key={s.key}>
              <p className="meta-label mb-3">{s.label}</p>
              <p className="text-[1.02rem] leading-relaxed text-ink/90 dark:text-ink-dark/90">
                {project[s.key] as string}
              </p>
            </div>
          ))}

          <div>
            <p className="meta-label mb-3">Challenges</p>
            <ul className="space-y-3">
              {project.challenges.map((c) => (
                <li
                  key={c}
                  className="text-[1.02rem] leading-relaxed text-ink/90 dark:text-ink-dark/90"
                >
                  — {c}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="meta-label mb-3">Lessons</p>
            <p className="text-[1.02rem] leading-relaxed text-ink/90 dark:text-ink-dark/90">
              {project.lessons}
            </p>
          </div>

          <div>
            <p className="meta-label mb-3">Future work</p>
            <p className="text-[1.02rem] leading-relaxed text-ink/90 dark:text-ink-dark/90">
              {project.futureWork}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <p className="meta-label mb-4">Tech stack</p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[11px] text-muted dark:text-muted-dark border border-line dark:border-line-dark rounded-full px-2.5 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <p className="meta-label mb-4">Gallery</p>
            <p className="text-sm text-muted dark:text-muted-dark">
              Screenshots and architecture diagrams for this project will go here.
            </p>
          </Card>

          <Card className="p-6">
            <p className="meta-label mb-4">Related writing</p>
            <p className="text-sm text-muted dark:text-muted-dark">
              No related blog post yet.
            </p>
          </Card>
        </div>
      </Container>

      <div className="hairline">
        <Container className="flex items-center justify-between py-10">
          <p className="meta-label">Next project</p>
          <Link
            href={`/projects/${next.slug}`}
            className="focus-ring group flex items-center gap-2 rounded text-lg font-display tracking-tight text-ink dark:text-ink-dark"
          >
            {next.title}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </Container>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Container, Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/shared/PageHeader";
import { PrintButton } from "@/components/shared/PrintButton";
import { buildMetadata } from "@/lib/metadata";
import { getExperience, getProjects, getEducation, getSkills, getCertificates } from "@/lib/content";
import { formatRange } from "@/lib/utils";
import profile from "@content/profile.json";

export const metadata: Metadata = buildMetadata({
  title: "Resume",
  description: "Interactive resume, downloadable as PDF.",
  path: "/resume"
});

export default function ResumePage() {
  const experience = getExperience();
  const projects = getProjects();
  const education = getEducation();
  const skills = getSkills();
  const certificates = getCertificates();

  return (
    <>
      <div className="print:hidden">
        <PageHeader eyebrow="Resume" title="Everything on one page." />
      </div>

      <Container className="pb-28 print:py-0">
        <div className="mb-8 flex flex-wrap gap-3 print:hidden">
          <a
            href={profile.links.resume}
            download
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas dark:bg-ink-dark dark:text-canvas-dark hover:opacity-85"
          >
            <Download className="h-3.5 w-3.5" strokeWidth={1.5} /> Download PDF
          </a>
          <PrintButton />
        </div>

        <Card className="p-8 print:border-0 print:p-0 sm:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4 hairline pb-6">
            <div>
              <h1 className="font-display text-2xl tracking-tight text-ink dark:text-ink-dark">
                {profile.name}
              </h1>
              <p className="mt-1 text-sm text-muted dark:text-muted-dark">{profile.roles[0]}</p>
            </div>
            <div className="text-right font-mono text-xs text-muted dark:text-muted-dark">
              <p>{profile.email}</p>
              <p>{profile.phone}</p>
              <p>{profile.location}</p>
            </div>
          </div>

          <section className="pt-8">
            <p className="meta-label mb-3">Profile</p>
            <p className="text-sm leading-relaxed text-ink/90 dark:text-ink-dark/90">
              {profile.profileSummary}
            </p>
          </section>

          <section className="pt-10">
            <p className="meta-label mb-4">Experience</p>
            <div className="space-y-6">
              {experience.map((e) => (
                <div key={e.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm font-medium text-ink dark:text-ink-dark">
                      {e.role} — {e.org}
                    </p>
                    <p className="font-mono text-xs text-muted dark:text-muted-dark">
                      {formatRange(e.start, e.end)}
                    </p>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {e.highlights.map((h) => (
                      <li
                        key={h.text}
                        className="text-sm leading-relaxed text-muted dark:text-muted-dark"
                      >
                        · {h.text} {h.metrics.length > 0 && `(${h.metrics.join(", ")})`}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="pt-10">
            <p className="meta-label mb-4">Projects</p>
            <div className="space-y-5">
              {projects.map((p) => (
                <div key={p.slug}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm font-medium text-ink dark:text-ink-dark">{p.title}</p>
                    <p className="font-mono text-xs text-muted dark:text-muted-dark">{p.period}</p>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted dark:text-muted-dark">
                    {p.oneLiner}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="pt-10">
            <p className="meta-label mb-4">Skills</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {skills.map((group) => (
                <p key={group.category} className="text-sm leading-relaxed">
                  <span className="font-medium text-ink dark:text-ink-dark">
                    {group.category}:{" "}
                  </span>
                  <span className="text-muted dark:text-muted-dark">
                    {group.items.map((i) => i.name).join(", ")}
                  </span>
                </p>
              ))}
            </div>
          </section>

          <section className="pt-10">
            <p className="meta-label mb-4">Education</p>
            {education.map((e) => (
              <div key={e.institution}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-medium text-ink dark:text-ink-dark">
                    {e.degree} — {e.institution}
                  </p>
                  <p className="font-mono text-xs text-muted dark:text-muted-dark">
                    {e.start} – {e.end}
                  </p>
                </div>
                <ul className="mt-2 space-y-1">
                  {e.highlights.map((h) => (
                    <li key={h} className="text-sm leading-relaxed text-muted dark:text-muted-dark">
                      · {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="pt-10 pb-2">
            <p className="meta-label mb-4">Certificates</p>
            <ul className="space-y-1">
              {certificates.map((c) => (
                <li key={c.title} className="text-sm text-muted dark:text-muted-dark">
                  · {c.title} — {c.issuer}
                </li>
              ))}
            </ul>
          </section>
        </Card>
      </Container>
    </>
  );
}

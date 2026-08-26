import type { Metadata } from "next";
import { Container, Card, Badge } from "@/components/ui/Card";
import { PageHeader } from "@/components/shared/PageHeader";
import { Timeline } from "@/components/shared/Timeline";
import { buildMetadata } from "@/lib/metadata";
import { getEducation, getTimeline } from "@/lib/content";
import profile from "@content/profile.json";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: "Background, values, and the journey behind the work.",
  path: "/about"
});

export default function AboutPage() {
  const education = getEducation();
  const timeline = getTimeline();

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="AI engineering, built on a systems foundation."
        description={profile.profileSummary}
      />

      <Container className="grid gap-14 pb-24 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-8">
          <Card className="p-7">
            <p className="meta-label mb-4">Currently</p>
            <p className="text-[0.95rem] leading-relaxed text-ink dark:text-ink-dark">
              Building production RAG and on-prem LLM systems, and looking for Software
              Engineering / ML Engineering internship opportunities.
            </p>
          </Card>

          <Card className="p-7">
            <p className="meta-label mb-4">Based in</p>
            <p className="text-[0.95rem] text-ink dark:text-ink-dark">{profile.location}</p>
          </Card>

          <Card className="p-7">
            <p className="meta-label mb-4">Education</p>
            {education.map((e) => (
              <div key={e.institution}>
                <p className="font-display text-lg tracking-tight text-ink dark:text-ink-dark">
                  {e.degree}
                </p>
                <p className="mt-1 text-sm text-muted dark:text-muted-dark">{e.institution}</p>
                <ul className="mt-4 space-y-2">
                  {e.highlights.map((h) => (
                    <li key={h} className="text-sm leading-relaxed text-ink/90 dark:text-ink-dark/90">
                      · {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Card>

          <Card className="p-7">
            <p className="meta-label mb-4">Interests</p>
            <p className="text-sm leading-relaxed text-muted dark:text-muted-dark">
              This section is reserved for interests, values, and personal facts beyond the
              resume — coming soon.
            </p>
            <Badge className="mt-4">Placeholder</Badge>
          </Card>
        </div>

        <div>
          <p className="meta-label mb-8">Journey so far</p>
          <Timeline items={timeline} />
        </div>
      </Container>
    </>
  );
}

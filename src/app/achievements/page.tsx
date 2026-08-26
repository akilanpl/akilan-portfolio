import type { Metadata } from "next";
import { Container, Card, Badge } from "@/components/ui/Card";
import { PageHeader } from "@/components/shared/PageHeader";
import { buildMetadata } from "@/lib/metadata";
import { getAchievements, getCertificates } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Achievements",
  description: "Awards, hackathons, and certificates.",
  path: "/achievements"
});

export default function AchievementsPage() {
  const achievements = getAchievements();
  const certificates = getCertificates();

  return (
    <>
      <PageHeader
        eyebrow="Achievements"
        title="Recognitions along the way."
        description="Hackathon results, open-source milestones, and published research — plus the certificates behind the skills."
      />

      <Container className="pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {achievements.map((a) => (
            <Card key={a.title} className="p-7">
              <Badge tone="accent">{a.category}</Badge>
              <h2 className="mt-4 font-display text-lg tracking-tight text-ink dark:text-ink-dark">
                {a.title}
              </h2>
              <p className="mt-2 text-sm text-muted dark:text-muted-dark">
                {a.org} · {a.date}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/90 dark:text-ink-dark/90">
                {a.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>

      <Container className="pb-28">
        <p className="meta-label mb-6">Certificates</p>
        <div className="grid gap-6 md:grid-cols-3">
          {certificates.map((c) => (
            <Card key={c.title} className="p-6">
              <h3 className="font-display text-base tracking-tight text-ink dark:text-ink-dark">
                {c.title}
              </h3>
              <p className="mt-1 text-sm text-muted dark:text-muted-dark">{c.issuer}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/90 dark:text-ink-dark/90">
                {c.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}

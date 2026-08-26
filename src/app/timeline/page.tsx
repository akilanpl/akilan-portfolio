import type { Metadata } from "next";
import { Container } from "@/components/ui/Card";
import { PageHeader } from "@/components/shared/PageHeader";
import { Timeline } from "@/components/shared/Timeline";
import { buildMetadata } from "@/lib/metadata";
import { getTimeline } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Timeline",
  description: "Education, experience, and milestones in one vertical view.",
  path: "/timeline"
});

export default function TimelinePage() {
  const timeline = getTimeline();

  return (
    <>
      <PageHeader
        eyebrow="Timeline"
        title="Everything, in order."
        description="School, internships, hackathons, research, and open-source work — merged into a single chronological view."
      />
      <Container className="max-w-3xl pb-28">
        <Timeline items={timeline} />
      </Container>
    </>
  );
}

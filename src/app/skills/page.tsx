import type { Metadata } from "next";
import { Container } from "@/components/ui/Card";
import { PageHeader } from "@/components/shared/PageHeader";
import { SkillsViz } from "@/components/skills/SkillsViz";
import { buildMetadata } from "@/lib/metadata";
import { getSkills } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Skills",
  description: "Languages, frameworks, cloud, and ML tooling.",
  path: "/skills"
});

export default function SkillsPage() {
  const skills = getSkills();

  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="The toolkit, and where it's been tested."
        description="Self-assessed proficiency, grounded in the projects and roles that actually used each skill."
      />
      <Container className="pb-28">
        <SkillsViz skills={skills} />
      </Container>
    </>
  );
}

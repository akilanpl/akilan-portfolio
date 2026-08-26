import type { Metadata } from "next";
import { Rocket } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Startup Ideas",
  description: "Founder vision, ideas, and roadmap.",
  path: "/startup"
});

export default function StartupPage() {
  return (
    <>
      <PageHeader
        eyebrow="Startup"
        title="Future founder — notes in progress."
        description="This page is reserved for founder vision, ideas, and a public roadmap once they're ready to share."
      />
      <ComingSoon
        icon={Rocket}
        title="Nothing public yet"
        description="Startup ideas, research, and a learning log will be published here over time."
      />
    </>
  );
}

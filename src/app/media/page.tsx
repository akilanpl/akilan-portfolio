import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Media",
  description: "Interviews, articles, podcasts, and press mentions.",
  path: "/media"
});

export default function MediaPage() {
  return (
    <>
      <PageHeader eyebrow="Media" title="Press & mentions." />
      <ComingSoon
        icon={Newspaper}
        title="No press coverage yet"
        description="Interviews, articles, and podcast appearances will be listed here as they happen."
      />
    </>
  );
}

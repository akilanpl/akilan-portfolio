import type { Metadata } from "next";
import { Images } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description: "Photos from hackathons, college, and professional life.",
  path: "/gallery"
});

export default function GalleryPage() {
  return (
    <>
      <PageHeader eyebrow="Gallery" title="A visual record." />
      <ComingSoon
        icon={Images}
        title="Photos are on the way"
        description="Hackathon, college, and professional photos will populate this masonry gallery — drop images into /content/gallery to fill it in."
      />
    </>
  );
}

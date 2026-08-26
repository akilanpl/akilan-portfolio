import type { Metadata } from "next";
import { Container, Card, Badge } from "@/components/ui/Card";
import { PageHeader } from "@/components/shared/PageHeader";
import { buildMetadata } from "@/lib/metadata";
import { getPublications } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Publications",
  description: "Journal papers, preprints, and citations.",
  path: "/publications"
});

export default function PublicationsPage() {
  const publications = getPublications();

  return (
    <>
      <PageHeader
        eyebrow="Publications"
        title="Published & in-progress research."
        description="Two co-authored papers at IJITRA during the CSE (AI & ML) program. DOIs and BibTeX entries will be added as they're confirmed."
      />

      <Container className="pb-28">
        <div className="space-y-6">
          {publications.map((pub) => (
            <Card key={pub.title} className="p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="meta-label mb-2">
                    {pub.venue} · {pub.year} · {pub.type}
                  </p>
                  <h2 className="font-display text-xl tracking-tight text-ink dark:text-ink-dark">
                    {pub.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted dark:text-muted-dark">{pub.role}</p>
                </div>
                {pub.placeholder && <Badge>Details pending</Badge>}
              </div>

              <p className="mt-5 text-sm leading-relaxed text-muted dark:text-muted-dark">
                {pub.abstract}
              </p>

              <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs text-muted dark:text-muted-dark">
                <span>DOI: {pub.doi ?? "—"}</span>
                <span>PDF: {pub.pdf ?? "—"}</span>
                <span>BibTeX: {pub.bibtex ?? "—"}</span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}

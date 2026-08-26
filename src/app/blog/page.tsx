import type { Metadata } from "next";
import Link from "next/link";
import { Container, Card, Badge } from "@/components/ui/Card";
import { PageHeader } from "@/components/shared/PageHeader";
import { buildMetadata } from "@/lib/metadata";
import { getBlogList } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Long-form notes on AI engineering, RAG, and systems.",
  path: "/blog"
});

export default function BlogPage() {
  const posts = getBlogList();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Writing, mostly for future me."
        description="Notes from building — retrieval systems, deployment lessons, and whatever else is worth writing down."
      />

      <Container className="pb-28">
        <div className="space-y-4">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="focus-ring block rounded-2xl">
              <Card className="p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="meta-label">
                    {post.category} · {post.date}
                  </p>
                  {post.draft && <Badge>Draft</Badge>}
                </div>
                <h2 className="mt-3 font-display text-xl tracking-tight text-ink dark:text-ink-dark">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted dark:text-muted-dark">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] text-muted dark:text-muted-dark border border-line dark:border-line-dark rounded-full px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}

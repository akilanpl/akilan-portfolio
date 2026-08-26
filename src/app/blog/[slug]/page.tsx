import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container, Badge } from "@/components/ui/Card";
import { buildMetadata } from "@/lib/metadata";
import { getBlogList, getBlogPost } from "@/lib/content";

export function generateStaticParams() {
  return getBlogList().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return buildMetadata({ title: "Post not found", description: "" });
  return buildMetadata({
    title: post.meta.title,
    description: post.meta.excerpt,
    path: `/blog/${slug}`
  });
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <Container className="max-w-2xl pt-14 pb-28">
      <Link
        href="/blog"
        className="focus-ring inline-flex items-center gap-1.5 rounded text-sm text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All writing
      </Link>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <p className="meta-label">
          {post.meta.category} · {post.meta.date} · {post.readingTime}
        </p>
        {post.meta.draft && <Badge>Draft</Badge>}
      </div>

      <h1 className="mt-4 font-display text-display-2 tracking-tight text-ink dark:text-ink-dark">
        {post.meta.title}
      </h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {post.meta.tags?.map((t: string) => (
          <span
            key={t}
            className="font-mono text-[11px] text-muted dark:text-muted-dark border border-line dark:border-line-dark rounded-full px-2.5 py-1"
          >
            {t}
          </span>
        ))}
      </div>

      <article className="prose-akilan mt-12">
        <MDXRemote source={post.content} />
      </article>
    </Container>
  );
}

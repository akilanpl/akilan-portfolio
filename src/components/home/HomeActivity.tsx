import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { Container, SectionHeading, Card, Badge } from "@/components/ui/Card";
import {
  getBlogList,
  getResearch,
  getOpenSource,
  getAchievements
} from "@/lib/content";

export function HomeActivity() {
  const [latestPost] = getBlogList();
  const research = getResearch().interests.slice(0, 2);
  const openSource = getOpenSource();
  const [latestAchievement] = getAchievements();

  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="Currently" title="What I'm working through" />

        <div className="mt-14 grid gap-6 lg:grid-cols-4">
          {/* Latest blog */}
          <Card className="p-6 lg:col-span-2">
            <p className="meta-label mb-4">Latest writing</p>
            {latestPost ? (
              <Link href={`/blog/${latestPost.slug}`} className="focus-ring group block rounded">
                <h3 className="font-display text-lg tracking-tight text-ink dark:text-ink-dark group-hover:opacity-70">
                  {latestPost.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted dark:text-muted-dark">
                  {latestPost.excerpt}
                </p>
                {latestPost.draft && (
                  <Badge className="mt-4">Draft — publishing soon</Badge>
                )}
              </Link>
            ) : (
              <p className="text-sm text-muted dark:text-muted-dark">Nothing published yet.</p>
            )}
          </Card>

          {/* Open source */}
          <Card className="p-6 lg:col-span-2">
            <p className="meta-label mb-4">Open-source activity</p>
            {openSource.contributions.map((c) => (
              <a
                key={c.url}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring group flex items-start justify-between gap-3 rounded"
              >
                <div>
                  <h3 className="font-display text-lg tracking-tight text-ink dark:text-ink-dark group-hover:opacity-70">
                    {c.project}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted dark:text-muted-dark">
                    {c.description}
                  </p>
                  <Badge tone="accent" className="mt-4">
                    {c.status}
                  </Badge>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted dark:text-muted-dark" />
              </a>
            ))}
          </Card>

          {/* Research interests */}
          <Card className="p-6 lg:col-span-2">
            <p className="meta-label mb-4">Research interests</p>
            <ul className="space-y-4">
              {research.map((r) => (
                <li key={r.title}>
                  <p className="font-medium text-sm text-ink dark:text-ink-dark">{r.title}</p>
                  <p className="mt-1 text-sm text-muted dark:text-muted-dark leading-relaxed">
                    {r.description}
                  </p>
                </li>
              ))}
            </ul>
            <Link
              href="/research"
              className="focus-ring mt-5 inline-flex items-center gap-1 rounded text-sm text-ink dark:text-ink-dark"
            >
              See all research <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Card>

          {/* Recent achievement */}
          <Card className="p-6 lg:col-span-2">
            <p className="meta-label mb-4">Recent recognition</p>
            {latestAchievement && (
              <>
                <h3 className="font-display text-lg tracking-tight text-ink dark:text-ink-dark">
                  {latestAchievement.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted dark:text-muted-dark">
                  {latestAchievement.description}
                </p>
              </>
            )}
            <Link
              href="/achievements"
              className="focus-ring mt-5 inline-flex items-center gap-1 rounded text-sm text-ink dark:text-ink-dark"
            >
              All achievements <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Card>
        </div>

        {/* Testimonials — future ready, intentionally empty */}
        <div className="mt-6">
          <Card className="flex flex-col items-start gap-3 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Quote className="h-5 w-5 shrink-0 text-muted dark:text-muted-dark" strokeWidth={1.5} />
              <p className="text-sm text-muted dark:text-muted-dark">
                Testimonials from collaborators and mentors will appear here.
              </p>
            </div>
            <Badge>Reserved for future content</Badge>
          </Card>
        </div>
      </Container>
    </section>
  );
}

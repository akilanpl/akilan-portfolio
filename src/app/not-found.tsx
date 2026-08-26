import Link from "next/link";
import { Compass } from "lucide-react";
import { Container } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center py-24">
      <Compass className="h-8 w-8 text-muted dark:text-muted-dark" strokeWidth={1.5} />
      <p className="meta-label mt-6">404</p>
      <h1 className="mt-3 font-display text-display-2 tracking-tight text-ink dark:text-ink-dark">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-md text-muted dark:text-muted-dark">
        The page you&apos;re looking for may have moved, or never existed. Let&apos;s get you back on
        track.
      </p>
      <div className="mt-8 flex gap-3">
        <Button href="/" showArrow>
          Back home
        </Button>
        <Link
          href="/contact"
          className="focus-ring flex items-center rounded-full border border-line dark:border-line-dark px-5 py-2.5 text-sm font-medium text-ink dark:text-ink-dark hover:border-ink/30 dark:hover:border-ink-dark/30"
        >
          Report a broken link
        </Link>
      </div>
    </Container>
  );
}

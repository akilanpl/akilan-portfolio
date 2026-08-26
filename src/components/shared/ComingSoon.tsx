import { Container } from "@/components/ui/Card";
import { LucideIcon } from "lucide-react";

export function ComingSoon({
  icon: Icon,
  title,
  description
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <Container className="py-28 md:py-36">
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-line dark:border-line-dark">
          <Icon className="h-6 w-6 text-muted dark:text-muted-dark" strokeWidth={1.5} />
        </div>
        <p className="meta-label mb-3">Section in progress</p>
        <h1 className="font-display text-2xl tracking-tight text-ink dark:text-ink-dark">
          {title}
        </h1>
        <p className="mt-3 text-muted dark:text-muted-dark leading-relaxed">{description}</p>
      </div>
    </Container>
  );
}

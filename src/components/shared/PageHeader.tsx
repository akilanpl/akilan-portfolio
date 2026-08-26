import { Container } from "@/components/ui/Card";

export function PageHeader({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Container className="pt-16 pb-14 md:pt-24 md:pb-20">
      <p className="meta-label mb-4">{eyebrow}</p>
      <h1 className="font-display text-display-2 tracking-tight text-ink dark:text-ink-dark max-w-3xl">
        {title}
      </h1>
      {description && (
        <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-muted dark:text-muted-dark">
          {description}
        </p>
      )}
    </Container>
  );
}

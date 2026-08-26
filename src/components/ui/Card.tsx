import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  hover = true
}: {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line dark:border-line-dark bg-surface dark:bg-surface-dark",
        hover && "transition-all duration-300 hover:border-ink/15 dark:hover:border-ink-dark/20 hover:shadow-[0_1px_0_rgba(11,12,14,0.02),0_16px_40px_-24px_rgba(11,12,14,0.35)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  className,
  tone = "neutral"
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em]",
        tone === "neutral" &&
          "border border-line dark:border-line-dark text-muted dark:text-muted-dark",
        tone === "accent" &&
          "bg-accent-blue/10 text-accent-blue dark:bg-accent-blue/15",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Container({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("container-content", className)}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && <p className="meta-label mb-3">{eyebrow}</p>}
      <h2 className="font-display text-display-3 tracking-tight text-ink dark:text-ink-dark">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[1.05rem] leading-relaxed text-muted dark:text-muted-dark">
          {description}
        </p>
      )}
    </div>
  );
}

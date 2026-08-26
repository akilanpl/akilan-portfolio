import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const button = cva(
  "focus-ring inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-canvas dark:bg-ink-dark dark:text-canvas-dark hover:opacity-85",
        outline:
          "border border-line dark:border-line-dark text-ink dark:text-ink-dark hover:border-ink/40 dark:hover:border-ink-dark/40",
        ghost:
          "text-ink dark:text-ink-dark hover:bg-ink/[0.05] dark:hover:bg-ink-dark/[0.08]"
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-5 py-2.5 text-[0.95rem]",
        lg: "px-6 py-3.5 text-base"
      }
    },
    defaultVariants: { variant: "primary", size: "md" }
  }
);

interface ButtonProps extends VariantProps<typeof button> {
  href?: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  showArrow?: boolean;
  onClick?: () => void;
}

export function Button({
  href,
  children,
  className,
  variant,
  size,
  external,
  showArrow,
  onClick
}: ButtonProps) {
  const classes = cn(button({ variant, size }), className);

  const content = (
    <>
      {children}
      {showArrow && <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} type="button">
      {content}
    </button>
  );
}

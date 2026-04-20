import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200";

  const styles = {
    primary:
      "bg-[color:var(--color-factorial-500)] text-white hover:bg-[color:var(--color-factorial-600)] shadow-sm hover:shadow-md",
    secondary:
      "bg-white text-[color:var(--color-factorial-500)] border border-[color:var(--color-factorial-500)] hover:bg-[color:var(--color-factorial-50)]",
    ghost:
      "text-[color:var(--color-ink)] hover:text-[color:var(--color-factorial-500)]",
  }[variant];

  const classes = `${base} ${styles} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

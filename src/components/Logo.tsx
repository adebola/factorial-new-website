import Image from "next/image";

type LogoProps = {
  variant?: "color" | "white";
  size?: number;
  showWordmark?: boolean;
  className?: string;
};

export default function Logo({
  variant = "color",
  size = 32,
  showWordmark = true,
  className = "",
}: LogoProps) {
  const src = variant === "white" ? "/logo-white.svg" : "/logo.svg";
  return (
    <a href="/" className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src={src}
        alt="Factorial Systems"
        width={size}
        height={size}
        priority
      />
      {showWordmark && (
        <span
          className={`font-display font-medium tracking-tight ${
            variant === "white" ? "text-white" : "text-[color:var(--color-ink)]"
          }`}
          style={{ fontSize: size * 0.58 }}
        >
          Factorial<span className="opacity-50">.</span>
        </span>
      )}
    </a>
  );
}

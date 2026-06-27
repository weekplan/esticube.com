import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
};

const sizes = {
  sm: { mark: 32, text: "text-lg" },
  md: { mark: 40, text: "text-xl" },
  lg: { mark: 56, text: "text-2xl sm:text-3xl" },
};

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cube-top" x1="24" y1="4" x2="24" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34d399" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="cube-left" x1="8" y1="18" x2="24" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#059669" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="cube-right" x1="40" y1="18" x2="24" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10b981" />
          <stop offset="1" stopColor="#065f46" />
        </linearGradient>
      </defs>
      <path d="M24 6L42 16V32L24 42L6 32V16L24 6Z" fill="url(#cube-left)" />
      <path d="M24 6L42 16L24 26L6 16L24 6Z" fill="url(#cube-top)" />
      <path d="M42 16V32L24 42V26L42 16Z" fill="url(#cube-right)" />
      <path d="M24 26V42L6 32V16L24 26Z" fill="#047857" opacity="0.85" />
      <path
        d="M16 20h16M16 24h10"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <circle cx="30" cy="24" r="2" fill="white" opacity="0.9" />
    </svg>
  );
}

export function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const s = sizes[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 font-bold tracking-tight text-foreground ${className}`}
    >
      <span className="relative flex shrink-0 items-center justify-center">
        <span
          className="absolute inset-0 rounded-xl bg-brand/20 blur-md"
          aria-hidden="true"
        />
        <span className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark p-1 shadow-md shadow-brand/25">
          <LogoMark size={s.mark - 8} />
        </span>
      </span>
      {showText && (
        <span className={`${s.text} leading-none`}>
          Esti<span className="text-brand">Cube</span>
        </span>
      )}
      <span className="sr-only">{SITE_NAME}</span>
    </Link>
  );
}

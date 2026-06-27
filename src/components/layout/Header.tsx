import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { IconArrowRight } from "@/components/icons";
import { CALCULATORS } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo size="sm" />

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {CALCULATORS.map((calc) => (
              <li key={calc.slug}>
                <Link
                  href={calc.href}
                  className="rounded-xl px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:bg-brand-light hover:text-brand"
                >
                  {calc.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/calculators/house"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand/25 transition-colors hover:bg-brand-dark"
          >
            Build Estimate
            <IconArrowRight size={16} />
          </Link>

          <nav aria-label="Mobile navigation" className="md:hidden">
            <details className="relative">
              <summary className="list-none cursor-pointer rounded-xl border border-border p-2.5 text-muted hover:bg-surface-2 [&::-webkit-details-marker]:hidden">
                <span className="sr-only">Open menu</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </summary>
              <ul className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-border bg-surface py-2 shadow-xl">
                {CALCULATORS.map((calc) => (
                  <li key={calc.slug}>
                    <Link
                      href={calc.href}
                      className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-brand-light hover:text-brand"
                    >
                      {calc.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </nav>
        </div>
      </div>
    </header>
  );
}

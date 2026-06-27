import type { ReactNode } from "react";
import type { CalculatorSlug } from "@/lib/constants";
import { IconTile } from "@/components/brand/IconTile";
import { Illustration, ILLUSTRATIONS } from "@/components/brand/Illustration";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

type CalculatorPageHeroProps = {
  slug: CalculatorSlug;
  title: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
  children?: ReactNode;
};

export function CalculatorPageHero({
  slug,
  title,
  description,
  breadcrumbs,
  children,
}: CalculatorPageHeroProps) {
  return (
    <div className="relative overflow-hidden border-b border-border bg-surface">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mt-4 grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted leading-relaxed sm:text-lg lg:mx-0 mx-auto">
              {description}
            </p>
            {children}
          </div>

          {slug in ILLUSTRATIONS ? (
            <Illustration
              name={slug}
              size="hero"
              priority
              className="mx-auto lg:mx-0 lg:order-last"
            />
          ) : (
            <div className="mx-auto lg:mx-0 lg:order-last">
              <IconTile name={slug} label={title} size="xl" variant="solid" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

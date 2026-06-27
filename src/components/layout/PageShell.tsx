import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  wide?: boolean;
  className?: string;
};

export function PageShell({ children, wide = false, className = "" }: PageShellProps) {
  return (
    <div
      className={`mx-auto px-4 sm:px-6 lg:px-8 ${
        wide ? "max-w-7xl" : "max-w-6xl"
      } ${className}`}
    >
      {children}
    </div>
  );
}

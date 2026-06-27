import type { ReactNode } from "react";
import type { IconName } from "@/lib/constants";
import { CalculatorIcon } from "@/components/icons";

type IconTileProps = {
  name: IconName;
  label: string;
  size?: "md" | "lg" | "xl";
  variant?: "soft" | "solid" | "ghost";
  className?: string;
  children?: ReactNode;
};

const sizeMap = {
  md: { box: "h-16 w-16", icon: 32, rounded: "rounded-2xl" },
  lg: { box: "h-24 w-24 sm:h-28 sm:w-28", icon: 48, rounded: "rounded-3xl" },
  xl: { box: "h-32 w-32 sm:h-36 sm:w-36", icon: 64, rounded: "rounded-[2rem]" },
};

const variantMap = {
  soft: "bg-brand-light text-brand ring-1 ring-brand/15",
  solid: "bg-gradient-to-br from-brand to-brand-dark text-white shadow-lg shadow-brand/30",
  ghost: "bg-surface/80 text-brand ring-1 ring-border backdrop-blur-sm",
};

export function IconTile({
  name,
  label,
  size = "lg",
  variant = "soft",
  className = "",
  children,
}: IconTileProps) {
  const s = sizeMap[size];

  return (
    <div
      className={`flex flex-col items-center gap-3 ${className}`}
      role="img"
      aria-label={label}
    >
      <div
        className={`flex ${s.box} ${s.rounded} items-center justify-center transition-transform ${variantMap[variant]}`}
      >
        <CalculatorIcon name={name} size={s.icon} strokeWidth={1.5} />
      </div>
      {children}
    </div>
  );
}

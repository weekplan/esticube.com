import type { SVGProps } from "react";
import type { IconName } from "@/lib/constants";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  strokeWidth?: number;
};

function IconBase({
  size = 24,
  strokeWidth = 1.75,
  children,
  ...props
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconFence(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M2 11h20" />
      <path d="M4 11V20" />
      <path d="M8 7V20" />
      <path d="M12 11V20" />
      <path d="M16 7V20" />
      <path d="M20 11V20" />
      <path d="M4 11h4" />
      <path d="M12 11h4" />
      <path d="M8 7h8" />
    </IconBase>
  );
}

export function IconDeck(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M2 9h20" />
      <path d="M2 15h20" />
      <path d="M4 9V18" />
      <path d="M8 9V18" />
      <path d="M12 9V18" />
      <path d="M16 9V18" />
      <path d="M20 9V18" />
      <rect x="2" y="18" width="20" height="3" rx="0.5" fill="currentColor" stroke="none" opacity="0.25" />
    </IconBase>
  );
}

export function IconIrrigation(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3v3" />
      <path d="M8.5 7.5C8.5 11 12 12.5 12 16" />
      <path d="M15.5 7.5c0 3.5-3.5 5-3.5 8.5" />
      <path d="M5 14h14" />
      <path d="M3 18c3 2.5 15 2.5 18 0" />
      <circle cx="12" cy="20" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="8" cy="18" r="0.75" fill="currentColor" stroke="none" opacity="0.6" />
      <circle cx="16" cy="18" r="0.75" fill="currentColor" stroke="none" opacity="0.6" />
    </IconBase>
  );
}

export function IconCalculator(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="2" width="16" height="20" rx="2.5" />
      <path d="M8 7h8" />
      <rect x="8" y="10" width="3" height="3" rx="0.5" fill="currentColor" stroke="none" opacity="0.3" />
      <rect x="13" y="10" width="3" height="3" rx="0.5" fill="currentColor" stroke="none" opacity="0.3" />
      <rect x="8" y="15" width="3" height="3" rx="0.5" fill="currentColor" stroke="none" opacity="0.3" />
      <rect x="13" y="15" width="8" height="3" rx="0.5" fill="currentColor" stroke="none" opacity="0.5" />
    </IconBase>
  );
}

export function IconSpeed(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </IconBase>
  );
}

export function IconShield(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </IconBase>
  );
}

export function IconMobile(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M10 18h4" />
    </IconBase>
  );
}

export function IconDollar(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v12" />
      <path d="M15 9.5a3 3 0 0 0-3-2.5 2.5 2.5 0 0 0 0 5h2a2.5 2.5 0 0 1 0 5 3 3 0 0 1-3-2.5" />
    </IconBase>
  );
}

export function IconRuler(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M2 12h20" />
      <path d="M6 12v3" />
      <path d="M10 12v2" />
      <path d="M14 12v3" />
      <path d="M18 12v2" />
    </IconBase>
  );
}

export function IconChevronRight(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M9 6l6 6-6 6" />
    </IconBase>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </IconBase>
  );
}

export function IconHouse(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 11l8-7 8 7" />
      <path d="M6 10v9h12v-9" />
      <path d="M10 19v-5h4v5" />
      <path d="M3 19h18" />
    </IconBase>
  );
}

export function IconFoundation(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="14" width="18" height="6" rx="1" />
      <path d="M6 14V8h12v6" />
      <path d="M8 8V5M12 8V4M16 8V5" />
    </IconBase>
  );
}

export function IconStructure(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 18V9l8-5 8 5v9" />
      <path d="M4 12h16" />
      <path d="M8 12v6M12 12v6M16 12v6" />
    </IconBase>
  );
}

export function IconInterior(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 10h16" />
      <path d="M10 4v16" />
    </IconBase>
  );
}

export function IconExtras(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="2" y="10" width="10" height="10" rx="1" />
      <path d="M16 8v12" />
      <path d="M13 11h6" />
      <path d="M13 15h6" />
    </IconBase>
  );
}

export function IconSize(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 8V4h4" />
      <path d="M4 4l5 5" />
      <rect x="9" y="9" width="11" height="11" rx="1" />
    </IconBase>
  );
}

const ICON_MAP: Record<IconName, React.ComponentType<IconProps>> = {
  house: IconHouse,
  fence: IconFence,
  deck: IconDeck,
  irrigation: IconIrrigation,
};

export function CalculatorIcon({
  name,
  ...props
}: IconProps & { name: IconName }) {
  const Icon = ICON_MAP[name];
  return <Icon {...props} />;
}

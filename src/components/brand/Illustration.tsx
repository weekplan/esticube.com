import Image from "next/image";
import type { CalculatorSlug } from "@/lib/constants";

export const ILLUSTRATIONS = {
  hero: {
    src: "/illustrations/hero-illustration.webp",
    alt: "EstiCube construction calculators — deck, fence, and sprinkler system estimates for US homeowners",
    width: 800,
    height: 800,
  },
  fence: {
    src: "/illustrations/fence-illustration.webp",
    alt: "Wooden privacy fence installation illustration for fence cost calculator",
    width: 800,
    height: 800,
  },
  deck: {
    src: "/illustrations/deck-illustration.webp",
    alt: "Wooden deck with railing illustration for deck cost calculator",
    width: 800,
    height: 800,
  },
  irrigation: {
    src: "/illustrations/irrigation-illustration.webp",
    alt: "Lawn sprinkler system illustration for irrigation calculator",
    width: 800,
    height: 800,
  },
  house: {
    src: "/illustrations/house-illustration.webp",
    alt: "House under construction illustration for home building cost calculator",
    width: 800,
    height: 800,
  },
} as const;

type IllustrationKey = keyof typeof ILLUSTRATIONS;

type IllustrationProps = {
  name: IllustrationKey | CalculatorSlug;
  size?: "hero" | "card" | "thumb";
  priority?: boolean;
  className?: string;
};

const sizeConfig = {
  hero: { dim: 512, sizes: "(max-width: 768px) 100vw, 512px", suffix: "" },
  card: { dim: 200, sizes: "200px", suffix: "-sm" },
  thumb: { dim: 96, sizes: "96px", suffix: "-sm" },
} as const;

export function Illustration({
  name,
  size = "hero",
  priority = false,
  className = "",
}: IllustrationProps) {
  const illust = ILLUSTRATIONS[name as IllustrationKey];
  if (!illust) return null;

  const config = sizeConfig[size];
  const src = illust.src.replace(".webp", `${config.suffix}.webp`);

  return (
    <div
      className={`relative overflow-hidden ${
        size === "hero"
          ? "w-full max-w-md lg:max-w-lg"
          : size === "card"
            ? "w-full max-w-[200px]"
            : "w-20 h-20 sm:w-24 sm:h-24"
      } ${className}`}
      style={{ aspectRatio: "1 / 1" }}
    >
      <Image
        src={src}
        alt={illust.alt}
        width={config.dim}
        height={config.dim}
        priority={priority}
        sizes={config.sizes}
        className="h-full w-full object-contain drop-shadow-sm"
      />
    </div>
  );
}

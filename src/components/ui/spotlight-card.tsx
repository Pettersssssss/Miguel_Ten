import React, { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children?: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "red" | "orange";
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 100 },
};

const sizeMap = { sm: "h-64 w-48", md: "h-80 w-64", lg: "h-96 w-80" };

type GlowStyles = CSSProperties & Record<`--${string}`, string | number>;

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className,
  glowColor = "orange",
  size = "md",
  width,
  height,
  customSize = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (event: PointerEvent) => {
      cardRef.current?.style.setProperty("--x", event.clientX.toFixed(2));
      cardRef.current?.style.setProperty("--xp", (event.clientX / window.innerWidth).toFixed(2));
      cardRef.current?.style.setProperty("--y", event.clientY.toFixed(2));
    };
    document.addEventListener("pointermove", syncPointer, { passive: true });
    return () => document.removeEventListener("pointermove", syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor];
  const styles: GlowStyles = {
    "--base": base,
    "--spread": spread,
    "--radius": "24",
    "--border": "1",
    "--size": "280",
    "--border-size": "calc(var(--border) * 1px)",
    "--spotlight-size": "calc(var(--size) * 1px)",
    "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread)))",
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    backgroundImage: "radial-gradient(var(--spotlight-size) var(--spotlight-size) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), hsl(var(--hue) 90% 60% / .12), transparent)",
    backgroundAttachment: "fixed",
  };

  return (
    <div
      ref={cardRef}
      data-glow
      style={styles}
      className={cn(
        "relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_1.5rem_4rem_-2rem_rgba(0,0,0,.8)] backdrop-blur-xl",
        !customSize && sizeMap[size],
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

export { GlowCard };

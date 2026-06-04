import type { CSSProperties } from "react";

type GhostPosition =
  | "left"
  | "right"
  | "center"
  | "bottom-left"
  | "bottom-right";

const POSITIONS: Record<GhostPosition, string> = {
  left: "left-[-3%] top-1/2 -translate-y-1/2",
  right: "right-[-3%] top-1/2 -translate-y-1/2",
  center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  "bottom-left": "left-[-3%] bottom-[-3%]",
  "bottom-right": "right-[-3%] bottom-[-3%]",
};

/**
 * Reusable section watermark. Static by design — purely decorative.
 * Parent must be `relative overflow-hidden`.
 */
export function GhostWatermark({
  text,
  position = "left",
  className = "",
  style,
}: {
  text: string;
  position?: GhostPosition;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      className={`ghost text-[22vw] leading-none ${POSITIONS[position]} ${className}`}
      style={style}
    >
      {text}
    </span>
  );
}

/** Shared ARIQ isotipo geometry — single source for SVG, favicon, and OG image.
 * Calibrated against public/brand/ariq-isotipo-reference.png (visual source of truth).
 */
export const BRAND_PRIMARY = "#0B0F19";
export const BRAND_ACCENT = "#10B981";
export const ISOTIPO_VIEWBOX = "0 0 120 120";
/** Circuit stroke matched to PNG ring/branch weight (~5 in 120 viewBox). */
export const ISOTIPO_STROKE_WIDTH = 5;

/** Mirrored hollow hooks with 45° bevels; central gap on x=60. */
export const ISOTIPO_T_LEFT =
  "M2.3 0.5h55.2v32L44.2 45.8V12.6H14.2V19.4L2.3 32.5V0.5z";
export const ISOTIPO_T_RIGHT =
  "M117.7 0.5H62.5v32L75.8 45.8V12.6H105.8V19.4L117.7 32.5V0.5z";

/** Thick upward chevron (45° arms, horizontal foot cuts), split at x=60. */
export const ISOTIPO_CHEVRON_LEFT = "M60 38.6L9.9 92.7H23.7L60 54.8Z";
export const ISOTIPO_CHEVRON_RIGHT = "M60 38.6L110.1 92.7H96.3L60 54.8Z";

/** Hollow circuit nodes (radius to stroke midline). */
export const ISOTIPO_HUB = { cx: 60, cy: 80.3, r: 7.2 };
export const ISOTIPO_LEAF_LEFT = { cx: 26.4, cy: 110.1, r: 5.9 };
export const ISOTIPO_LEAF_RIGHT = { cx: 93.6, cy: 110.1, r: 5.9 };

/** Branch lines (drawn before rings so caps sit under the strokes). */
export const ISOTIPO_BRANCH_LEFT = "M53 91L32 104";
export const ISOTIPO_BRANCH_CENTER = "M60 90V117";
export const ISOTIPO_BRANCH_RIGHT = "M67 91L88 104";

export type IsotipoSvgProps = {
  width?: number | string;
  height?: number | string;
  className?: string;
  /** Use strokeWidth for React/Satori; stroke-width for static SVG. */
  strokeWidthAttr?: "strokeWidth" | "stroke-width";
};

/** Renders the isotipo markup for React/Satori consumers. */
export function AriqIsotipoSvg({
  width = 120,
  height = 120,
  className,
  strokeWidthAttr = "strokeWidth",
}: IsotipoSvgProps) {
  const sw = { [strokeWidthAttr]: ISOTIPO_STROKE_WIDTH };
  const slc = { strokeLinecap: "round" as const };

  return (
    <svg
      width={width}
      height={height}
      viewBox={ISOTIPO_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path fill={BRAND_PRIMARY} d={ISOTIPO_T_LEFT} />
      <path fill={BRAND_PRIMARY} d={ISOTIPO_T_RIGHT} />
      <path fill={BRAND_PRIMARY} d={ISOTIPO_CHEVRON_LEFT} />
      <path fill={BRAND_ACCENT} d={ISOTIPO_CHEVRON_RIGHT} />
      <path
        stroke={BRAND_PRIMARY}
        {...sw}
        {...slc}
        d={ISOTIPO_BRANCH_LEFT}
      />
      <path
        stroke={BRAND_ACCENT}
        {...sw}
        {...slc}
        d={ISOTIPO_BRANCH_CENTER}
      />
      <path
        stroke={BRAND_ACCENT}
        {...sw}
        {...slc}
        d={ISOTIPO_BRANCH_RIGHT}
      />
      <circle
        cx={ISOTIPO_HUB.cx}
        cy={ISOTIPO_HUB.cy}
        r={ISOTIPO_HUB.r}
        fill="none"
        stroke={BRAND_ACCENT}
        {...sw}
      />
      <circle
        cx={ISOTIPO_LEAF_LEFT.cx}
        cy={ISOTIPO_LEAF_LEFT.cy}
        r={ISOTIPO_LEAF_LEFT.r}
        fill="none"
        stroke={BRAND_PRIMARY}
        {...sw}
      />
      <circle
        cx={ISOTIPO_LEAF_RIGHT.cx}
        cy={ISOTIPO_LEAF_RIGHT.cy}
        r={ISOTIPO_LEAF_RIGHT.r}
        fill="none"
        stroke={BRAND_ACCENT}
        {...sw}
      />
    </svg>
  );
}

/**
 * The HueForge layer stack, drawn rather than photographed.
 *
 * A finished HueForge photographed flat is indistinguishable from a poster,
 * which actively undersells it. The astonishing part is the mechanism: the
 * whole image is a couple of millimetres of stacked plastic, and the colour
 * comes from light passing THROUGH the layers rather than pigment sitting on
 * top of them. That is a diagram, not a photograph — which is lucky, because
 * a diagram costs nothing in photography.
 *
 * Every plane's separation is driven by a single `--progress` custom property
 * (0 = collapsed into one solid object, 1 = fully exploded). It defaults to 1,
 * so with no JavaScript, reduced motion, or a failed chunk the diagram renders
 * in its fully-explained state. The scroll layer only ever animates *between*
 * two states that are both valid on their own.
 */

const PLANE_COUNT = 21;
const CENTRE_X = 210;
const TOP_Y = 66;
const BOTTOM_Y = 300;
const HALF_W = 150;
const HALF_H = 46;

/**
 * Literal filament colours, not theme tokens. These represent actual spools of
 * plastic — abstracting them into the greyscale ramp would defeat the point of
 * a section about colour.
 */
const FILAMENTS = ["#1c1a19", "#8d2b22", "#c8412f", "#e8dcc4"];

function diamond(cy: number) {
  return [
    `${CENTRE_X - HALF_W},${cy}`,
    `${CENTRE_X},${cy - HALF_H}`,
    `${CENTRE_X + HALF_W},${cy}`,
    `${CENTRE_X},${cy + HALF_H}`,
  ].join(" ");
}

export function HueforgeStack({ className }: { className?: string }) {
  const step = (BOTTOM_Y - TOP_Y) / (PLANE_COUNT - 1);
  const collapsedY = BOTTOM_Y;

  return (
    <svg
      /* Extends left of the origin so the leader label is inside the canvas —
         the callouts sit outside the stack's own bounds by design. */
      viewBox="-76 0 512 400"
      className={className}
      role="img"
      aria-label="Diagram: a HueForge print exploded into its individual printed layers, each layer a single colour of filament, stacking into a full-colour image barely two millimetres thick."
    >
      <g>
        {Array.from({ length: PLANE_COUNT }, (_, index) => {
          const reversed = PLANE_COUNT - 1 - index;
          const explodedY = TOP_Y + reversed * step;
          const fill = FILAMENTS[reversed % FILAMENTS.length];
          // Drawn collapsed, then translated out to its exploded position by
          // --progress. Transform-only, so separating the stack costs nothing
          // but compositing.
          const travel = explodedY - collapsedY;
          return (
            <polygon
              key={index}
              points={diamond(collapsedY)}
              fill={fill}
              fillOpacity={0.9}
              stroke="currentColor"
              strokeOpacity={0.28}
              strokeWidth={0.75}
              style={{
                transform: `translateY(calc(${travel} * var(--progress, 1) * 1px))`,
              }}
            />
          );
        })}
      </g>

      {/* Callouts belong to the exploded state, so they fade in with it. */}
      <g style={{ opacity: "var(--progress, 1)" }}>
        <g stroke="currentColor" strokeOpacity={0.5} strokeWidth={0.75} fill="none">
          <line x1={CENTRE_X + HALF_W + 16} y1={TOP_Y} x2={CENTRE_X + HALF_W + 16} y2={BOTTOM_Y} />
          <line x1={CENTRE_X + HALF_W + 11} y1={TOP_Y} x2={CENTRE_X + HALF_W + 21} y2={TOP_Y} />
          <line
            x1={CENTRE_X + HALF_W + 11}
            y1={BOTTOM_Y}
            x2={CENTRE_X + HALF_W + 21}
            y2={BOTTOM_Y}
          />
          <line
            x1={CENTRE_X - HALF_W - 12}
            y1={TOP_Y + step}
            x2={CENTRE_X - HALF_W - 52}
            y2={TOP_Y + step}
          />
        </g>

        <text
          x={CENTRE_X + HALF_W + 26}
          y={(TOP_Y + BOTTOM_Y) / 2}
          fill="currentColor"
          fillOpacity={0.75}
          fontSize="10"
          fontFamily="var(--font-mono)"
          letterSpacing="1"
          dominantBaseline="middle"
        >
          TOTAL
        </text>
        <text
          x={CENTRE_X - HALF_W - 58}
          y={TOP_Y + step}
          fill="currentColor"
          fillOpacity={0.75}
          fontSize="10"
          fontFamily="var(--font-mono)"
          letterSpacing="1"
          textAnchor="end"
          dominantBaseline="middle"
        >
          ONE LAYER
        </text>
      </g>

      <text
        x={CENTRE_X}
        y={BOTTOM_Y + HALF_H + 30}
        fill="currentColor"
        fillOpacity={0.55}
        fontSize="10"
        fontFamily="var(--font-mono)"
        letterSpacing="1.2"
        textAnchor="middle"
      >
        LIGHT ENTERS HERE
      </text>
      <g stroke="currentColor" strokeOpacity={0.45} strokeWidth={0.75} fill="none">
        <line x1={CENTRE_X} y1={BOTTOM_Y + HALF_H + 18} x2={CENTRE_X} y2={BOTTOM_Y + 6} />
        <polyline
          points={`${CENTRE_X - 4},${BOTTOM_Y + 12} ${CENTRE_X},${BOTTOM_Y + 5} ${CENTRE_X + 4},${BOTTOM_Y + 12}`}
        />
      </g>
    </svg>
  );
}

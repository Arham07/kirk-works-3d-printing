import { media, type MediaSlug } from "@/generated/media";
import { cn } from "@/lib/cn";

/**
 * A Server Component — no JavaScript reaches the browser for images.
 *
 * Not next/image, for three reasons: its optimiser is disabled under static
 * export, its loaders differ per host (which would re-introduce the lock-in
 * `output: "export"` exists to avoid), and it cannot bake in a colour grade.
 * scripts/media.mjs handles all three at authoring time instead.
 *
 * width and height always come from the manifest, so every image reserves its
 * own space and layout shift is zero by construction.
 */

type Treatment = "card" | "bleed" | "crop" | "plain";

const srcSet = (slug: string, widths: readonly number[], ext: string) =>
  widths.map((w) => `/media/${slug}-${w}.${ext} ${w}w`).join(", ");

export function Photo({
  slug,
  alt,
  sizes = "100vw",
  priority = false,
  treatment = "plain",
  className,
  imgClassName,
}: {
  slug: MediaSlug;
  alt: string;
  sizes?: string;
  /** Only ever true for the LCP image, and only one per page. */
  priority?: boolean;
  treatment?: Treatment;
  className?: string;
  imgClassName?: string;
}) {
  const entry = media[slug];

  return (
    <picture className={cn("block", className)}>
      <source type="image/avif" srcSet={srcSet(slug, entry.widths, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(slug, entry.widths, "webp")} sizes={sizes} />
      <img
        src={`/media/${slug}-${entry.widths[entry.widths.length - 1]}.webp`}
        alt={alt}
        width={entry.width}
        height={entry.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        className={cn(
          "h-full w-full",
          treatment === "crop" ? "object-cover" : "object-contain",
          imgClassName,
        )}
      />
    </picture>
  );
}

/**
 * Contained portrait card — the portfolio default.
 *
 * object-contain on a raised surface, never cover into a landscape box. Eleven
 * of the twelve source photographs are portrait, and cropping them to
 * landscape throws away the subject. Containing them turns the orientation
 * from a problem into the card's format.
 *
 * The ambient plate behind is the manifest's inlined 24px LQIP, blurred and
 * scaled — colour-correct by construction, no second network request, and it
 * hides the beige room the photographs were all taken in.
 */
export function PhotoCard({
  slug,
  alt,
  sizes,
  caption,
  priority,
  className,
}: {
  slug: MediaSlug;
  alt: string;
  sizes?: string;
  caption?: React.ReactNode;
  priority?: boolean;
  className?: string;
}) {
  const entry = media[slug];

  return (
    <figure className={cn("hairline rounded-media overflow-hidden border", className)}>
      <div className="bg-surface-1 relative aspect-3/4 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 scale-125 opacity-55 blur-3xl saturate-150"
          style={{
            backgroundImage: `url("${entry.lqip}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Photo
          slug={slug}
          alt={alt}
          sizes={sizes}
          priority={priority}
          className="relative h-full"
          imgClassName="object-contain"
        />
      </div>
      {caption && (
        <figcaption className="hairline border-t p-5">{caption}</figcaption>
      )}
    </figure>
  );
}

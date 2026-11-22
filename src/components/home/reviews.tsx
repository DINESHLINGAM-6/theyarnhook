import { getFeaturedReviews } from "@/lib/commerce/provider";
import { products } from "@/lib/commerce/data";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/commerce/rating-stars";

export function Reviews() {
  const reviews = getFeaturedReviews(3);
  const total = products.reduce((sum, product) => sum + product.reviewCount, 0);
  const average =
    products.reduce((sum, product) => sum + product.rating * product.reviewCount, 0) / total;

  return (
    <section className="container-x py-16 sm:py-24" aria-labelledby="reviews-heading">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="kicker">From the people who make</p>
          <h2 id="reviews-heading" className="display mt-2 text-4xl sm:text-5xl">
            Soft words from makers.
          </h2>
        </div>
        <div className="text-left sm:text-right">
          <div className="flex items-center gap-2 sm:justify-end">
            <RatingStars rating={average} showCount={false} size={16} />
            <span className="font-display text-2xl leading-none">{average.toFixed(1)}</span>
          </div>
          <p className="mt-1 text-xs text-muted">
            from {total.toLocaleString("en-IN")}+ reviews
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <figure
            key={review.id}
            className="flex flex-col rounded-lg border border-line bg-paper p-6 shadow-[0_1px_0_rgba(26,22,19,.02)]"
          >
            <RatingStars rating={review.rating} showCount={false} size={14} />
            <blockquote className="mt-3 flex-1">
              <p className="font-display text-xl leading-snug text-ink">“{review.title}”</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{review.body}</p>
            </blockquote>
            <figcaption className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3 text-xs">
              <span className="text-ink-soft">
                {review.name} <span className="text-muted">/ {review.city}</span>
              </span>
              {review.verified ? <Badge variant="neutral">Verified</Badge> : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

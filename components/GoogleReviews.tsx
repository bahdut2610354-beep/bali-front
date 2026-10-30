import { getGoogleReviews, GOOGLE_WRITE_REVIEW_URL, type GoogleReview } from '@/lib/googleReviews';
import type { Locale } from '@/lib/i18n/dictionaries';
import { getRequestLocale } from '@/lib/i18n/requestLocale';

const COPY: Record<Locale, { eyebrow: string; title: string; reviews: string; write: string; all: string; source: string }> = {
  en: { eyebrow: 'Reviews', title: 'What riders say', reviews: 'reviews on Google', write: 'Leave a review', all: 'All reviews on Google', source: 'Reviews from Google Maps' },
  ru: { eyebrow: 'Отзывы', title: 'Что говорят клиенты', reviews: 'отзывов в Google', write: 'Оставить отзыв', all: 'Все отзывы в Google', source: 'Отзывы из Google Maps' },
  zh: { eyebrow: '评价', title: '骑手怎么说', reviews: '条 Google 评价', write: '写评价', all: '在 Google 上查看全部评价', source: '评价来自 Google Maps' },
  id: { eyebrow: 'Ulasan', title: 'Kata pelanggan kami', reviews: 'ulasan di Google', write: 'Tulis ulasan', all: 'Semua ulasan di Google', source: 'Ulasan dari Google Maps' },
  de: { eyebrow: 'Bewertungen', title: 'Was Fahrer sagen', reviews: 'Bewertungen auf Google', write: 'Bewertung schreiben', all: 'Alle Bewertungen auf Google', source: 'Bewertungen von Google Maps' },
  fr: { eyebrow: 'Avis', title: 'Ce que disent nos clients', reviews: 'avis sur Google', write: 'Laisser un avis', all: 'Tous les avis sur Google', source: 'Avis Google Maps' },
};

function Stars({ value, size = 16 }: { value: number; size?: number }) {
  const rounded = Math.round(value * 2) / 2;
  return (
    <span aria-hidden style={{ display: 'inline-flex', gap: 2, fontSize: size, lineHeight: 1 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: i <= rounded ? '#FBBC04' : i - 0.5 === rounded ? '#FBBC04' : 'rgba(0,0,0,0.15)', opacity: i - 0.5 === rounded ? 0.55 : 1 }}>★</span>
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const initial = review.author.trim().charAt(0).toUpperCase() || 'G';
  const name = review.authorUrl ? (
    <a href={review.authorUrl} target="_blank" rel="noopener noreferrer nofollow" style={{ color: '#0A0A0F', textDecoration: 'none' }}>{review.author}</a>
  ) : review.author;

  return (
    <article style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 20, padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {review.authorPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={review.authorPhoto} alt="" width={40} height={40} loading="lazy" decoding="async" referrerPolicy="no-referrer" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
        ) : (
          <span aria-hidden style={{ width: 40, height: 40, borderRadius: '50%', background: '#F4F2ED', display: 'grid', placeItems: 'center', fontWeight: 700, flexShrink: 0 }}>{initial}</span>
        )}
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 15, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <Stars value={review.rating} size={14} />
            <span className="br-visually-hidden" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{review.rating} / 5</span>
            {review.publishTime ? (
              <time dateTime={review.publishTime} style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)' }}>{review.relativeTime}</time>
            ) : (
              <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)' }}>{review.relativeTime}</span>
            )}
          </div>
        </div>
      </header>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'rgba(0,0,0,0.72)', display: '-webkit-box', WebkitLineClamp: 8, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{review.text}</p>
    </article>
  );
}

/** Server component: Google rating and latest reviews; renders nothing until the Places API is configured. */
export default async function GoogleReviews() {
  const locale = getRequestLocale();
  const data = await getGoogleReviews(locale);
  if (!data) return null;

  const copy = COPY[locale] || COPY.en;
  const ratingText = data.rating.toLocaleString(locale === 'zh' ? 'zh-CN' : locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const buttonBase = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: 46, padding: '0 22px', borderRadius: 999, fontWeight: 600, fontSize: 15, textDecoration: 'none' } as const;

  return (
    <section id="reviews" aria-labelledby="google-reviews-title" style={{ padding: 'clamp(52px, 7vw, 100px) clamp(16px, 5vw, 56px)', background: '#FAFAF5' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 36 }}>
          <div>
            <div style={{ fontFamily: 'var(--br-mono)', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.55)', marginBottom: 12 }}>{copy.eyebrow}</div>
            <h2 id="google-reviews-title" className="br-display" style={{ margin: 0, fontSize: 'clamp(28px, 5vw, 58px)', lineHeight: 0.97, letterSpacing: '-0.035em', color: '#0A0A0F' }}>{copy.title}</h2>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginTop: 18 }}>
              <span className="br-display" style={{ fontSize: 32, lineHeight: 1 }}>{ratingText}</span>
              <Stars value={data.rating} size={20} />
              <span style={{ fontSize: 15, color: 'rgba(0,0,0,0.6)' }}>{data.total.toLocaleString(locale === 'zh' ? 'zh-CN' : locale)} {copy.reviews}</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <a href={GOOGLE_WRITE_REVIEW_URL} target="_blank" rel="noopener noreferrer" style={{ ...buttonBase, background: '#FFD700', color: '#0A0A0F' }}>{copy.write}</a>
            {data.mapsUrl ? (
              <a href={data.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ ...buttonBase, background: 'transparent', color: '#0A0A0F', border: '1px solid rgba(0,0,0,0.15)' }}>{copy.all}</a>
            ) : null}
          </div>
        </div>

        {data.reviews.length ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 16 }}>
            {data.reviews.map((review, i) => <ReviewCard key={`${review.author}-${i}`} review={review} />)}
          </div>
        ) : null}

        <p style={{ margin: '20px 0 0', fontSize: 12, color: 'rgba(0,0,0,0.5)' }}>{copy.source}</p>
      </div>
    </section>
  );
}

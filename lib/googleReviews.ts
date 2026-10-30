import type { Locale } from '@/lib/i18n/dictionaries';

/** Public "write a review" link for the Google Business Profile. */
export const GOOGLE_WRITE_REVIEW_URL = 'https://g.page/r/CadHanmrgnPbEAE/review';

/** How long fetched reviews are reused before Google is asked again (seconds). */
const REVALIDATE_SECONDS = 60 * 60 * 24;

export type GoogleReview = {
  author: string;
  authorUrl?: string;
  authorPhoto?: string;
  rating: number;
  text: string;
  relativeTime: string;
  publishTime?: string;
};

export type GoogleReviewsData = {
  rating: number;
  total: number;
  mapsUrl?: string;
  reviews: GoogleReview[];
};

type PlacesReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  publishTime?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
};

const GOOGLE_LANGUAGE: Record<Locale, string> = {
  en: 'en',
  ru: 'ru',
  zh: 'zh-CN',
  id: 'id',
  de: 'de',
  fr: 'fr',
};

/**
 * Rating, review count and up to 5 reviews from the Google Places API (New).
 * Needs GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID; returns null when they are missing
 * or the request fails, so the page renders without the block.
 */
export async function getGoogleReviews(locale: Locale): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=${GOOGLE_LANGUAGE[locale] || 'en'}`;

  try {
    const response = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews',
      },
      next: { revalidate: REVALIDATE_SECONDS, tags: ['google-reviews'] },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) {
      console.error(`Google Places reviews: HTTP ${response.status}`);
      return null;
    }
    const data = (await response.json()) as PlacesResponse;
    const reviews = (data.reviews || [])
      .map((review): GoogleReview => ({
        author: review.authorAttribution?.displayName || 'Google user',
        authorUrl: review.authorAttribution?.uri,
        authorPhoto: review.authorAttribution?.photoUri,
        rating: review.rating || 0,
        text: review.text?.text || review.originalText?.text || '',
        relativeTime: review.relativePublishTimeDescription || '',
        publishTime: review.publishTime,
      }))
      .filter((review) => review.text.trim() && review.rating > 0);

    if (!data.rating || !data.userRatingCount) return null;
    return { rating: data.rating, total: data.userRatingCount, mapsUrl: data.googleMapsUri, reviews };
  } catch (error) {
    console.error('Google Places reviews: request failed', error);
    return null;
  }
}

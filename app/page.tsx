import GoogleReviews from '@/components/GoogleReviews';
import HomePage from '@/components/HomePage';
import PageSeo from '@/components/PageSeo';

export default function Page() {
  return (
    <PageSeo page="home">
      <HomePage reviews={<GoogleReviews />} />
    </PageSeo>
  );
}

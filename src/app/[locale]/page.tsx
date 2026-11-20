import { getMessages, setRequestLocale } from 'next-intl/server';
import { SITE_URL } from '@/lib/site';
import { MAPS_SHARE_URL } from '@/lib/geo';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import StorySection from '@/components/StorySection';
import WeatherSection from '@/components/WeatherSection';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import RouteSection from '@/components/RouteSection';
import NatureSection from '@/components/NatureSection';
import AmenitiesSection from '@/components/AmenitiesSection';
import PhotoSpotsSection from '@/components/PhotoSpotsSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import FAQSection from '@/components/FAQSection';
import MapEmbed from '@/components/MapEmbed';
import SourcesSection from '@/components/SourcesSection';
import TopicLinks from '@/components/TopicLinks';
import NearbyLinks from '@/components/NearbyLinks';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  const baseUrl = SITE_URL;
  const zhUrl = `${baseUrl}/zh`;
  const enUrl = `${baseUrl}/en`;
  const ruUrl = `${baseUrl}/ru`;
  const ukUrl = `${baseUrl}/uk`;
  const mapsShareUrl = MAPS_SHARE_URL;
  const officialTourismUrl = 'https://www.tourism.gov.ua/';

  let selfUrl = zhUrl;
  if (locale === 'en') selfUrl = enUrl;
  else if (locale === 'ru') selfUrl = ruUrl;
  else if (locale === 'uk') selfUrl = ukUrl;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': ['Park', 'TouristAttraction'],
    '@id': `${selfUrl}#attraction`,
    name: messages?.basicInfo?.officialNameValue || 'Dubovyy Hay (Дубовий Гай)',
    alternateName: ['Дубовий Гай', 'Дубовка', 'Дубовая роща', 'Dubovyy Hay', 'Dubovka'],
    url: selfUrl,
    description: messages?.meta?.description || '',
    image: [
      `${baseUrl}/gallery/dubovyy-hay%20(1).jpg`,
      `${baseUrl}/gallery/dubovyy-hay%20(2).jpg`,
      `${baseUrl}/gallery/dubovyy-hay%20(3).jpg`,
    ],
    telephone: String(messages?.basicInfo?.phoneValue || '').replace(/\s+/g, ''),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'вулиця Глісерна, 1',
      addressLocality: 'Zaporizhzhia',
      addressRegion: 'Zaporizhzhia Oblast',
      postalCode: '69000',
      addressCountry: 'UA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 47.8089693,
      longitude: 35.1657067,
    },
    hasMap: mapsShareUrl,
    sameAs: [mapsShareUrl, officialTourismUrl],
    isAccessibleForFree: true,
    publicAccess: true,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    ...(messages?.hero?.rating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: parseFloat(String(messages.hero.rating)),
            reviewCount: parseInt(String(messages.hero.reviewCount).replace(/[^\d]/g, ''), 10) || undefined,
          },
        }
      : {}),
  };

  const jsonLd = JSON.stringify(structuredData);

  const faqItems = (messages?.faq?.items as { q?: string; a?: string }[]) || [];
  const faqLd = faqItems.length
    ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${selfUrl}#faq`,
        mainEntity: faqItems
          .filter((i) => i?.q && i?.a)
          .map((i) => ({
            '@type': 'Question',
            name: i.q,
            acceptedAnswer: { '@type': 'Answer', text: i.a },
          })),
      })
    : null;


  return (
    <>
        <link rel="preload" as="image" href="/gallery/dubovyy-hay%20(1).jpg" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        {faqLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: faqLd }}
          />
        )}
      <Header />
      <main>
        <Hero />
        <Intro />
        <StorySection />
        <WeatherSection locale={locale} />
        <BasicInfo />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <RouteSection />
        <NatureSection />
        <AmenitiesSection />
        <PhotoSpotsSection />
        <Gallery />
        <Reviews />
        <FAQSection />
        <TopicLinks />
        <NearbyLinks locale={locale} />
        <MapEmbed />
      </main>
      <SourcesSection />
      <Footer />
    </>
  );
}

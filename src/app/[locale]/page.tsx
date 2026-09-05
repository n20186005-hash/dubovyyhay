import { setRequestLocale } from 'next-intl/server';
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
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
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
        <MapEmbed />
      </main>
      <SourcesSection />
      <Footer />
    </>
  );
}

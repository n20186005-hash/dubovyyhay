import { openGraphLocale } from '@/lib/site';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import TopicPage from '@/components/TopicPage';
import { topicCanonical, topicHreflangs } from '@/lib/topics';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default as any;
  const topic = messages?.topics?.['zaporizhzhia-2-station'];
  if (!topic) return {};
  return {
    title: topic.title,
    description: topic.intro,
    openGraph: { locale: openGraphLocale(locale), title: topic.title, description: topic.intro, url: topicCanonical(locale, 'zaporizhzhia-2-station') },
    twitter: { title: topic.title, description: topic.intro },
    alternates: {
      canonical: topicCanonical(locale, 'zaporizhzhia-2-station'),
      languages: topicHreflangs(locale, 'zaporizhzhia-2-station'),
    },
  };
}

export default async function NearbyPlacePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TopicPage topic="zaporizhzhia-2-station" />;
}

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
  const topic = messages?.topics?.['local-history-museum'];
  if (!topic) return {};
  return {
    title: topic.title,
    description: topic.intro,
    openGraph: { locale: openGraphLocale(locale), title: topic.title, description: topic.intro, url: topicCanonical(locale, 'local-history-museum') },
    twitter: { title: topic.title, description: topic.intro },
    alternates: {
      canonical: topicCanonical(locale, 'local-history-museum'),
      languages: topicHreflangs(locale, 'local-history-museum'),
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
  return <TopicPage topic="local-history-museum" />;
}

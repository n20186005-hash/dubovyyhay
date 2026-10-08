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
  const topic = messages?.topics?.photos;
  if (!topic) return {};
  return {
    title: topic.title,
    description: topic.intro,
    alternates: {
      canonical: topicCanonical(locale, 'photos'),
      languages: topicHreflangs(locale, 'photos'),
    },
  };
}

export default async function PhotosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TopicPage topic="photos" />;
}

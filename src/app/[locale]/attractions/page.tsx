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
  const topic = messages?.topics?.attractions;
  if (!topic) return {};
  return {
    title: topic.title,
    description: topic.intro,
    openGraph: { title: topic.title, description: topic.intro, url: topicCanonical(locale, 'attractions') },
    twitter: { title: topic.title, description: topic.intro },
    alternates: {
      canonical: topicCanonical(locale, 'attractions'),
      languages: topicHreflangs(locale, 'attractions'),
    },
  };
}

export default async function AttractionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TopicPage topic="attractions" />;
}

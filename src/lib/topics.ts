import { SITE_LOCALES, DEFAULT_LOCALE, localeUrl } from './site';

export const TOPIC_SLUGS = ['attractions', 'how-to-get', 'photos', 'history'] as const;
export type TopicSlug = (typeof TOPIC_SLUGS)[number];

export const TOPIC_PATH: Record<TopicSlug, string> = {
  attractions: '/attractions',
  'how-to-get': '/how-to-get',
  photos: '/photos',
  history: '/history',
};

export function topicCanonical(locale: string, slug: TopicSlug): string {
  return localeUrl(locale, TOPIC_PATH[slug]);
}

export function topicHreflangs(locale: string, slug: TopicSlug): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of SITE_LOCALES) languages[l] = localeUrl(l, TOPIC_PATH[slug]);
  languages['x-default'] = localeUrl(DEFAULT_LOCALE, TOPIC_PATH[slug]);
  return languages;
}

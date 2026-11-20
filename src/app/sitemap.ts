import { MetadataRoute } from 'next';
import { TOPIC_PATH } from '@/lib/topics';
import { SITE_LOCALES, DEFAULT_LOCALE, localeUrl } from '@/lib/site';

export const dynamic = 'force-static';

// 固定为内容最后更新日期，避免每次构建生成漂移
const LAST_MODIFIED = '2026-09-09';

export default function sitemap(): MetadataRoute.Sitemap {
  const topics = new Set<string>(Object.values(TOPIC_PATH));
  const routes = ['', ...topics, '/privacy-policy', '/terms-of-service', '/cookie-settings'];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of SITE_LOCALES) {
    for (const route of routes) {
      const languages: Record<string, string> = {};
      for (const l of SITE_LOCALES) languages[l] = localeUrl(l, route);
      languages['x-default'] = localeUrl(DEFAULT_LOCALE, route);

      entries.push({
        url: localeUrl(locale, route),
        lastModified: topics.has(route) || (route === '' && (locale === 'ru' || locale === 'uk'))
          ? '2026-11-20'
          : LAST_MODIFIED,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.5,
        alternates: { languages },
      });
    }
  }

  return entries;
}

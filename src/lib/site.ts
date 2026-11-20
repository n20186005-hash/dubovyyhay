/**
 * 站点级配置（唯一来源）。
 * 域名可通过部署环境变量 CURRENT_SITE_DOMAIN 覆盖，未设置时回退到 dubovyyhay.com。
 * 所有 canonical / hreflang / OG / sitemap / JSON-LD 一律从这里取值，避免散落硬编码。
 */
const rawDomain = (process.env.CURRENT_SITE_DOMAIN || 'www.dubovyyhay.com')
  .replace(/^https?:\/\//i, '')
  .replace(/\/+$/, '');

// 规范域名统一为 www（SEO P0：避免 www 与非 www 两套网址分散权重）。
// 非 www 流量需在 Cloudflare 控制台配置 301/308 重定向到对应 www URL + Always Use HTTPS。
export const SITE_URL = `https://${rawDomain}`;
export const SITE_NAME = 'Dubovyy Hay';
export const SITE_LOCALES = ['zh', 'en', 'ru', 'uk'] as const;
export const DEFAULT_LOCALE = 'zh';

const openGraphLocales: Record<string, string> = {
  zh: 'zh_CN',
  en: 'en_US',
  ru: 'ru_RU',
  uk: 'uk_UA',
};

export function openGraphLocale(locale: string): string {
  return openGraphLocales[locale] ?? openGraphLocales[DEFAULT_LOCALE];
}

/** 生成形如 https://域名/uk/privacy-policy 的带语言前缀 URL */
export function localeUrl(locale: string, route = ''): string {
  return `${SITE_URL}/${locale}${route}`;
}

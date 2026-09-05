import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CookieSettingsClient from './CookieSettingsClient';
import { SITE_LOCALES, DEFAULT_LOCALE, localeUrl } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const route = '/cookie-settings';
  const selfUrl = localeUrl(locale, route);
  const languages: Record<string, string> = {};
  for (const l of SITE_LOCALES) languages[l] = localeUrl(l, route);
  languages['x-default'] = localeUrl(DEFAULT_LOCALE, route);

  return {
    alternates: {
      canonical: selfUrl,
      languages,
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}

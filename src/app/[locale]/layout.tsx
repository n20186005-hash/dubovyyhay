import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const baseUrl = 'https://dubovyyhay.com';

  const zhUrl = `${baseUrl}/zh`;
  const enUrl = `${baseUrl}/en`;
  const ruUrl = `${baseUrl}/ru`;
  const ukUrl = `${baseUrl}/uk`;

  let selfUrl = zhUrl;
  if (locale === 'en') selfUrl = enUrl;
  else if (locale === 'ru') selfUrl = ruUrl;
  else if (locale === 'uk') selfUrl = ukUrl;

  const localeMap: Record<string, string> = {
    'zh': 'zh_CN',
    'en': 'en_US',
    'ru': 'ru_RU',
    'uk': 'uk_UA',
  };

  return {
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: selfUrl,
      languages: {
        'zh': zhUrl,
        'en': enUrl,
        'ru': ruUrl,
        'uk': ukUrl,
        'x-default': zhUrl,
      } as Record<string, string>,
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: "Dubovyy Hay",
      locale: localeMap[locale] || 'zh_CN',
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const langMap: Record<string, string> = {
    'zh': 'zh-CN',
    'en': 'en',
    'ru': 'ru',
    'uk': 'uk',
  };

  const baseUrl = 'https://dubovyyhay.com';
  const zhUrl = `${baseUrl}/zh`;
  const enUrl = `${baseUrl}/en`;
  const ruUrl = `${baseUrl}/ru`;
  const ukUrl = `${baseUrl}/uk`;

  let selfUrl = zhUrl;
  if (locale === 'en') selfUrl = enUrl;
  else if (locale === 'ru') selfUrl = ruUrl;
  else if (locale === 'uk') selfUrl = ukUrl;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Park',
    '@id': `${selfUrl}#park`,
    name: messages?.basicInfo?.officialNameValue || 'Dubovyy Hay (Дубовий Гай)',
    url: selfUrl,
    description: messages?.meta?.description || '',
    image: `${baseUrl}/gallery/dubovyy-hay%20(1).jpg`,
    telephone: String(messages?.basicInfo?.phoneValue || '').replace(/\s+/g, ''),
    address: {
      '@type': 'PostalAddress',
      streetAddress: String(messages?.basicInfo?.addressValue || '').split(',')[0]?.trim() || '',
      addressLocality: 'Zaporizhzhia',
      addressRegion: 'Zaporizhzhia Oblast',
      postalCode: '69000',
      addressCountry: 'UA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 47.8081,
      longitude: 35.169,
    },
    isAccessibleForFree: true,
    publicAccess: true,
    openingHours: 'Mo-Su 00:00-24:00',
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

  return (
    <html lang={langMap[locale] || 'zh-CN'} suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="/gallery/dubovyy-hay%20(1).jpg" fetchPriority="high" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXX" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

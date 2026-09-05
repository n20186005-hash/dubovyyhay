import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/site';

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
  const baseUrl = SITE_URL;
  const ogImage = `${baseUrl}/gallery/dubovyy-hay%20(1).jpg`;

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
      siteName: SITE_NAME,
      locale: localeMap[locale] || 'zh_CN',
      type: 'website',
      images: [
        {
          url: ogImage,
          alt: messages?.basicInfo?.officialNameValue || 'Dubovyy Hay',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      images: [ogImage],
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

  const baseUrl = SITE_URL;
  const zhUrl = `${baseUrl}/zh`;
  const enUrl = `${baseUrl}/en`;
  const ruUrl = `${baseUrl}/ru`;
  const ukUrl = `${baseUrl}/uk`;
  const mapsShareUrl = 'https://maps.app.goo.gl/WoyEp1gowNMDoEnNA';
  const officialTourismUrl = 'https://www.tourism.gov.ua/';

  let selfUrl = zhUrl;
  if (locale === 'en') selfUrl = enUrl;
  else if (locale === 'ru') selfUrl = ruUrl;
  else if (locale === 'uk') selfUrl = ukUrl;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': ['Park', 'TouristAttraction'],
    '@id': `${selfUrl}#attraction`,
    name: messages?.basicInfo?.officialNameValue || 'Dubovyy Hay (Дубовий Гай)',
    alternateName: ['Дубовий Гай', 'Дубовка', 'Дубовая роща', 'Dubovyy Hay', 'Dubovka'],
    url: selfUrl,
    description: messages?.meta?.description || '',
    image: [
      `${baseUrl}/gallery/dubovyy-hay%20(1).jpg`,
      `${baseUrl}/gallery/dubovyy-hay%20(2).jpg`,
      `${baseUrl}/gallery/dubovyy-hay%20(3).jpg`,
    ],
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
      latitude: 47.8089693,
      longitude: 35.1657067,
    },
    hasMap: mapsShareUrl,
    sameAs: [mapsShareUrl, officialTourismUrl],
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

  const faqItems = (messages?.faq?.items as { q?: string; a?: string }[]) || [];
  const faqLd = faqItems.length
    ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${selfUrl}#faq`,
        mainEntity: faqItems
          .filter((i) => i?.q && i?.a)
          .map((i) => ({
            '@type': 'Question',
            name: i.q,
            acceptedAnswer: { '@type': 'Answer', text: i.a },
          })),
      })
    : null;

  return (
    <html lang={langMap[locale] || 'zh-CN'} suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="/gallery/dubovyy-hay%20(1).jpg" fetchPriority="high" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXX" />
        {/* Google Analytics 4 + Consent Mode v2（默认拒绝；仅当 cookiePrefs.analytics 授权后放行） */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() { dataLayer.push(arguments); }
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied',
                functionality_storage: 'denied',
                wait_for_update: 500
              });
              try {
                var prefs = JSON.parse(localStorage.getItem('cookiePrefs') || 'null');
                if (prefs) {
                  gtag('consent', 'update', {
                    ad_storage: prefs.marketing ? 'granted' : 'denied',
                    ad_user_data: prefs.marketing ? 'granted' : 'denied',
                    ad_personalization: prefs.marketing ? 'granted' : 'denied',
                    analytics_storage: prefs.analytics ? 'granted' : 'denied',
                    functionality_storage: prefs.preferences ? 'granted' : 'denied'
                  });
                }
              } catch(e) {}
            `,
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HXM22WWPKP"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() { dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', 'G-HXM22WWPKP');
            `,
          }}
        />
        {/* PWA */}
        <meta name="theme-color" content="#234830" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Dubovyy Hay" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/icons/icon-1024.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        {faqLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: faqLd }}
          />
        )}
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if ('serviceWorker' in navigator) {
                  var ok = location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
                  if (ok) {
                    window.addEventListener('load', function() {
                      navigator.serviceWorker.register('/sw.js').catch(function() {});
                    });
                  }
                }
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

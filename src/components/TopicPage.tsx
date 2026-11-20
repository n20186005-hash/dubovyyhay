import { getTranslations, getLocale } from 'next-intl/server';
import { SITE_URL } from '@/lib/site';
import { TOPIC_SLUGS, TOPIC_PATH, type TopicSlug } from '@/lib/topics';
import Header from './Header';
import Footer from './Footer';
import Gallery from './Gallery';
import { MAPS_SHARE_URL } from '@/lib/geo';
import { getTopicPlace } from '@/lib/topic-places';

export default async function TopicPage({ topic }: { topic: TopicSlug }) {
  const locale = await getLocale();
  const t = await getTranslations('topics');
  const th = await getTranslations('header');
  const details = await getTranslations('placeDetails');
  const hero = await getTranslations('hero');
  const basic = await getTranslations('basicInfo');
  const place = getTopicPlace(topic);
  const photo = 'image' in place ? place : null;
  const manager = photo ? t(`${topic}.manager`) : details('parkManager');
  const transport = photo ? t(`${topic}.transport`) : details('parkTransport');

  const address = topic === 'local-history-museum'
    ? details('museumAddress')
    : topic === 'zaporizhzhia-2-station'
      ? details('stationAddress')
      : basic('addressValue');

  const title = t(`${topic}.title`);
  const subtitle = t(`${topic}.subtitle`);
  const intro = t(`${topic}.intro`);
  const updated = t(`${topic}.updated`);
  const sectionsTitle = t(`${topic}.sectionsTitle`);
  const faqTitle = t(`${topic}.faqTitle`);

  const sections = t.raw(`${topic}.sections`) as Array<{ title: string; text: string }>;
  const faq = t.raw(`${topic}.faq`) as Array<{ q: string; a: string }>;

  const selfUrl = `${SITE_URL}/${locale}${TOPIC_PATH[topic]}`;
  const homeUrl = `${SITE_URL}/${locale}`;
  const homeLabel = th('home');

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${selfUrl}#faq`,
    mainEntity: faq
      .filter((i) => i?.q && i?.a)
      .map((i) => ({
        '@type': 'Question',
        name: i.q,
        acceptedAnswer: { '@type': 'Answer', text: i.a },
      })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeLabel, item: homeUrl },
      { '@type': 'ListItem', position: 2, name: title, item: selfUrl },
    ],
  };

  const otherTopics = TOPIC_SLUGS.filter((s) => s !== topic);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <a
              href={homeUrl}
              className="inline-flex items-center gap-2 text-sm font-medium mb-6 transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              {homeLabel}
            </a>
            <h1 className="font-display text-3xl sm:text-5xl font-bold leading-tight mb-4" style={{ color: 'var(--text-primary)' }}>
              {title}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {subtitle}
            </p>
            <p className="mt-4 text-xs inline-block px-3 py-1 rounded-full" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
              {updated}
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="px-4 sm:px-6 py-10 sm:py-14">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {intro}
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-10 space-y-8">
          {photo && (
            <figure>
              <img src={photo.image} alt={title} className="w-full rounded-xl" width={1200}
                height={topic === 'local-history-museum' ? 900 : 797} decoding="async" />
              <figcaption className="mt-2 text-sm">
                <a className="underline" href={photo.photoSource}>{details('photo')} · {photo.photographer}</a>
                {' · '}
                <a className="underline" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>
              </figcaption>
            </figure>
          )}
          <div>
            <h2 className="font-display text-2xl font-semibold mb-3">{details('about')}</h2>
            <p className="leading-relaxed">
              <strong>{details('manager')} · </strong>{manager}{' '}
              <a className="underline" href={place.source}>{details('official')}</a>
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold mb-3">{details('basic')}</h2>
            <dl>
              <dt className="font-semibold">{details('address')}</dt>
              <dd>{address}</dd>
            </dl>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold mb-3">{details('transport')}</h2>
            <p className="mb-2 leading-relaxed">{transport}</p>
            <a className="underline" href={place.map}>{details('map')}</a>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold mb-3">{details('reviews')}</h2>
            {!photo && (
              <p className="mb-2">
                <strong>{hero('rating')} / 5 ({hero('reviewCount')})</strong> · {details('parkRating')}
              </p>
            )}
            <p className="leading-relaxed">{details('latest')}</p>
            <a className="underline" href={place.map}>{details('map')}</a>
          </div>
        </section>

        {/* Sections */}
        <section className="px-4 sm:px-6 pb-10 sm:pb-14">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-semibold mb-8" style={{ color: 'var(--text-primary)' }}>
              {sectionsTitle}
            </h2>
            <div className="space-y-8">
              {sections.map((s, i) => (
                <div key={i}>
                  <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {s.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {(topic === 'history' || topic === 'how-to-get') && (
          <nav aria-label={th('map')} className="max-w-3xl mx-auto px-4 sm:px-6 pb-10">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <li><a className="underline" href={MAPS_SHARE_URL}>{th('map')}</a></li>
              {topic === 'history' && <>
              <li><a className="underline" href="https://zp.gov.ua/news/377654-140-novix-dubiv-u-parku-dubovii-gai">{t('history.sources.0')}</a></li>
              <li><a className="underline" href="https://zp.gov.ua/news/308934-sotnia-dubkiv-dlia-dubovogo-gaiu">{t('history.sources.1')}</a></li>
              </>}
            </ul>
          </nav>
        )}

        {topic === 'photos' && <Gallery />}

        {/* FAQ */}
        <section className="px-4 sm:px-6 py-10 sm:py-14" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-semibold mb-8" style={{ color: 'var(--text-primary)' }}>
              {faqTitle}
            </h2>
            <div className="space-y-6">
              {faq.map((item, i) => (
                <div key={i} className="rounded-xl p-5" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{item.q}</h3>
                  <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Internal cross-links */}
        <section className="px-4 sm:px-6 py-10 sm:py-14">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
              {th('home')}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {otherTopics.map((s) => (
                <a
                  key={s}
                  href={`/${locale}${TOPIC_PATH[s]}`}
                  className="block rounded-xl p-5 transition-colors hover:opacity-90"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                >
                  <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>{t(`${s}.title`)}</span>
                </a>
              ))}
              <a
                key="home"
                href={homeUrl}
                className="block rounded-xl p-5 transition-colors hover:opacity-90"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              >
                <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>{homeLabel}</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    </>
  );
}

import { getTranslations, getLocale } from 'next-intl/server';
import { TOPIC_SLUGS, TOPIC_PATH } from '@/lib/topics';

export default async function TopicLinks() {
  const locale = await getLocale();
  const t = await getTranslations('topics');

  const cards = TOPIC_SLUGS.map((slug) => ({
    href: `/${locale}${TOPIC_PATH[slug]}`,
    title: t(`${slug}.title`),
    subtitle: t(`${slug}.subtitle`),
  }));

  return (
    <section className="px-4 sm:px-6 py-12 sm:py-16" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-2xl font-semibold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>
          {t('exploreMore')}
        </h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {cards.map((card) => (
            <a
              key={card.href}
              href={card.href}
              className="block rounded-2xl p-6 transition-transform hover:-translate-y-1"
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
            >
              <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {card.subtitle}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useTranslations, useMessages } from 'next-intl';

const ITEM_KEYS = ['toilet', 'parking', 'dining', 'hotel', 'shopping', 'fuel'] as const;

export default function AmenitiesSection() {
  const t = useTranslations('amenities');
  const messages = useMessages() as any;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-4" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
          {t('intro')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {ITEM_KEYS.map((key) => (
            <div
              key={key}
              className="rounded-xl p-6 flex flex-col"
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
            >
              <div
                className="flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                style={{ background: 'var(--bg-tertiary)', color: 'var(--accent)' }}
              >
                <AmenityIcon type={key} />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                {t(`items.${key}.text`)}
              </p>
            </div>
          ))}
        </div>

        <div
          className="flex items-start gap-4 rounded-xl p-6"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className="flex-shrink-0"
            style={{ marginTop: '0.15rem', color: 'var(--accent)' }}
          >
            <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 11v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="12" cy="7.6" r="1.1" fill="currentColor" />
          </svg>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('disclaimer')}
          </p>
        </div>
      </div>
    </section>
  );
}

function AmenityIcon({ type }: { type: string }) {
  const strokeProps = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (type) {
    case 'toilet':
      return (
        <svg {...strokeProps}>
          <ellipse cx="12" cy="7" rx="3.8" ry="2.8" />
          <path d="M8.2 9.8V20M15.8 9.8V20M9.2 20h5.6" />
        </svg>
      );
    case 'parking':
      return (
        <svg {...strokeProps}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
          <path d="M9 16V8h3.4a2.4 2.4 0 0 1 0 4.8H9" />
        </svg>
      );
    case 'dining':
      return (
        <svg {...strokeProps}>
          <path d="M6.5 3v6.3a1.8 1.8 0 0 0 3.6 0V3" />
          <path d="M8.3 9.5V21" />
          <path d="M17.5 3c-1.7 1.2-2.6 3.1-2.6 5.8 0 2.1.9 3.5 2.6 4.2V21" />
        </svg>
      );
    case 'hotel':
      return (
        <svg {...strokeProps}>
          <path d="M3 19v-5.4c0-1 .8-1.8 1.8-1.8h14.4c1 0 1.8.8 1.8 1.8V19" />
          <path d="M3 15.5h18" />
          <path d="M6 12.2V15M18 12.2V15" />
          <path d="M4.5 19v2.5M19.5 19v2.5" />
          <path d="M9.5 12.2v-1.4A1.3 1.3 0 0 1 10.8 9.5h3" />
        </svg>
      );
    case 'shopping':
      return (
        <svg {...strokeProps}>
          <path d="M5.5 8h13l-1 12.5a1 1 0 0 1-1 .9H7.5a1 1 0 0 1-1-.9L5.5 8z" />
          <path d="M9 10V6a3 3 0 0 1 6 0v4" />
        </svg>
      );
    case 'fuel':
      return (
        <svg {...strokeProps}>
          <path d="M4.5 21V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6" />
          <rect x="3.5" y="14.5" width="7" height="6.5" />
          <path d="M12.5 14.5l4 3.2V6M12.5 8l4-3" />
        </svg>
      );
    default:
      return (
        <svg {...strokeProps}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

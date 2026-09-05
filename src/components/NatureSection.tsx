'use client';

import { useTranslations, useMessages } from 'next-intl';

type Highlight = { title: string; text: string };

export default function NatureSection() {
  const t = useTranslations('nature');
  const messages = useMessages() as any;
  const highlights: Highlight[] = messages?.nature?.highlights || [];

  return (
    <section className="section-padding">
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
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <p
          className="rounded-xl p-6 sm:p-8 text-lg leading-relaxed mb-12"
          style={{
            background: 'var(--bg-tertiary)',
            borderLeft: '4px solid var(--accent)',
            color: 'var(--text-secondary)',
          }}
        >
          {t('intro')}
        </p>

        <h3 className="font-display text-xl sm:text-2xl font-semibold mb-8" style={{ color: 'var(--text-primary)' }}>
          {t('highlightsTitle')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-6"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
            >
              <div
                className="flex items-center justify-center w-11 h-11 rounded-full mb-4"
                style={{ background: 'var(--bg-tertiary)', color: 'var(--accent)' }}
              >
                <NatureIcon index={i} />
              </div>
              <h4 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {item.title}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div
          className="flex items-start gap-4 rounded-xl p-6"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--accent)' }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className="flex-shrink-0"
            style={{ marginTop: '0.15rem', color: 'var(--accent)' }}
          >
            <path
              d="M12 2l8 4v5c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V6l8-4z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('note')}
          </p>
        </div>
      </div>
    </section>
  );
}

function NatureIcon({ index }: { index: number }) {
  const strokeProps = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (index % 4) {
    case 0: // 古树
      return (
        <svg {...strokeProps}>
          <path d="M12 22v-8M12 14c0-3-2-5-5-5 0 3 2 5 5 5zM12 11c0-2.5 1.5-4.5 4-4.5 0 2.5-1.5 4.5-4 4.5z" />
          <path d="M12 22v-4" />
        </svg>
      );
    case 1: // 湖/水波
      return (
        <svg {...strokeProps}>
          <path d="M4 13c1.5-1.5 2.5-1.5 4 0s2.5 1.5 4 0 2.5-1.5 4 0 2.5 1.5 4 0" />
          <path d="M4 18c1.5-1.5 2.5-1.5 4 0s2.5 1.5 4 0 2.5-1.5 4 0 2.5 1.5 4 0" />
          <path d="M4 8c1.5-1.5 2.5-1.5 4 0s2.5 1.5 4 0 2.5-1.5 4 0 2.5 1.5 4 0" opacity="0.45" />
        </svg>
      );
    case 2: // 河流水滴
      return (
        <svg {...strokeProps}>
          <path d="M12 3.5c3 3.6 5.5 6.7 5.5 9.9a5.5 5.5 0 0 1-11 0C6.5 10.2 9 7.1 12 3.5z" />
        </svg>
      );
    default: // 水鸟
      return (
        <svg {...strokeProps}>
          <path d="M4 15c2-2.5 5-4 8-4s6 .8 8 3" />
          <path d="M4 19c2.5-1.5 5.5-2 9-1.5 3 .4 5.5 1.6 7 3.5" />
          <path d="M12 11l-1-5M11 6c1 .4 2 .4 3 0l-3 0zM17 9c1.8-.6 3.4-1.8 4.5-3.5M18.5 8l2.5.5-1.5-1" />
        </svg>
      );
  }
}

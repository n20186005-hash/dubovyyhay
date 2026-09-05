'use client';

import { useTranslations, useMessages } from 'next-intl';

type TimelineItem = { period: string; title: string; text: string };
type LegendItem = { title: string; text: string };

export default function StorySection() {
  const t = useTranslations('story');
  const messages = useMessages() as any;
  const timeline: TimelineItem[] = messages?.story?.timeline || [];
  const legends: LegendItem[] = messages?.story?.legends || [];
  const names = t.raw('names') as { title?: string; paragraph?: string } | undefined;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        {/* 标题 */}
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

        {/* 引言 */}
        <p className="text-base font-semibold mb-3 tracking-wide" style={{ color: 'var(--accent)' }}>
          {t('introTitle')}
        </p>
        <p
          className="text-xl sm:text-2xl leading-relaxed mb-10 font-display"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('introText')}
        </p>

        {/* 别名与常用叫法 */}
        {names?.paragraph ? (
          <div
            className="rounded-xl p-6 mb-12 flex items-start gap-4"
            style={{ background: 'var(--bg-tertiary)', borderLeft: '4px solid var(--accent)' }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              className="flex-shrink-0 mt-0.5"
              style={{ color: 'var(--accent)' }}
            >
              <path d="M4 20h16M5 20V9l7-5 7 5v11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.5 20v-6h5v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <p className="font-display text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {names.title}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {names.paragraph}
              </p>
            </div>
          </div>
        ) : null}

        {/* 时间线 */}
        <h3 className="font-display text-xl sm:text-2xl font-semibold mb-8" style={{ color: 'var(--text-primary)' }}>
          {t('timelineTitle')}
        </h3>
        <div className="relative mb-16">
          <div
            className="absolute left-2 top-2 bottom-2 w-0.5"
            style={{ background: 'var(--border-color)' }}
          />
          <div className="space-y-8">
            {timeline.map((item, i) => (
              <div key={i} className="relative pl-10">
                <span
                  className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2"
                  style={{ background: 'var(--bg-secondary)', borderColor: 'var(--accent)' }}
                />
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--accent)' }}>
                  {item.period}
                </p>
                <h4 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h4>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 民间传说 */}
        <h3 className="font-display text-xl sm:text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
          {t('legendsTitle')}
        </h3>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
          {t('legendsNote')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {legends.map((legend, i) => (
            <div
              key={i}
              className="rounded-xl p-6 flex flex-col"
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
            >
              <div className="mb-4 h-1 w-10 rounded-full" style={{ background: 'var(--accent)' }} />
              <h4 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                {legend.title}
              </h4>
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                {legend.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

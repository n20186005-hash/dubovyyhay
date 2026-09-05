import { useTranslations, useMessages } from 'next-intl';

type SourceLink = { name: string; url: string };

export default function SourcesSection() {
  const t = useTranslations('sources');
  const messages = useMessages() as any;
  const links: SourceLink[] = messages?.sources?.links || [];

  return (
    <section id="sources" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>{t('text')}</p>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl p-5 flex items-start gap-3 no-underline transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="flex-shrink-0 mt-0.5"
                style={{ color: 'var(--accent)' }}
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
              </svg>
              <span className="text-sm font-medium leading-snug" style={{ color: 'var(--text-primary)' }}>
                {link.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

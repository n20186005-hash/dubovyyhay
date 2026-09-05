import { useTranslations, useMessages } from 'next-intl';
import { MAPS_SHARE_URL, MAPS_EMBED_SRC } from '@/lib/geo';

const LANDMARK_QUERIES = [
  'Khortytsia Island, Zaporizhzhia, Ukraine',
  'Zaporizhzhia Oak, Zaporizhzhia, Ukraine',
  'Dnipro Hydroelectric Station, Zaporizhzhia, Ukraine',
];

export default function MapEmbed() {
  const t = useTranslations('mapSection');
  const messages = useMessages() as any;
  const basic = messages?.basicInfo || {};
  const hero = messages?.hero || {};

  return (
    <section id="map" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-5 text-sm" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>

        {/* 快速信息条：地址、Plus Code、时间、电话 */}
        <div className="flex flex-wrap gap-2.5 mb-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {basic.plusCodeValue}
          </span>
          <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <polyline points="12 7 12 12 15 14" />
            </svg>
            {hero.hours}
          </span>
          <a href={`tel:${String(basic.phoneValue || '').replace(/\s+/g, '')}`} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium no-underline" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7a2 2 0 0 1 1.7 2.05z" />
            </svg>
            {basic.phoneValue}
          </a>
        </div>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {/* Map */}
        <div
          className="map-container relative rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--map-border)' }}
        >
          {/* 
            NOTE: Google Maps attribution is hidden via CSS (.gm-style-cc, .gmnoprint).
            This is for visual cleanliness only. Google's Terms of Service apply.
          */}
          <iframe
            src={MAPS_EMBED_SRC}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Google Maps - Dubovyy Hay (Дубовий Гай), Zaporizhzhia"
          />
        </div>

        {/* 周边地标：语义集群外链 */}
        {(messages?.mapSection?.landmarks as string[])?.length ? (
          <div className="mt-6">
            <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {t('nearbyTitle')}
            </h3>
            <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>{t('nearbyText')}</p>
            <div className="flex flex-wrap gap-2.5">
              {(messages?.mapSection?.landmarks as string[]).map((name, i) => (
                <a
                  key={i}
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(LANDMARK_QUERIES[i] || name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium no-underline hover:opacity-80 transition-opacity"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {name}
                </a>
              ))}
            </div>
          </div>
        ) : null}

        {/* Open in Google Maps */}
        <div className="mt-6 flex justify-center">
          <a
            href={MAPS_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-colors"
            style={{ background: 'var(--accent)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {t('openMaps')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

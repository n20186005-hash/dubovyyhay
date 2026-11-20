import { nearby, nearbyGroups, nearbyLabels, nearbyLocale, nearbyPath } from '@/lib/nearby';

export default function NearbyLinks({ locale }: { locale: string }) {
  const language = nearbyLocale(locale);
  const labels = nearbyLabels[language];

  return (
    <section id="nearby" aria-labelledby="nearby-title" className="px-4 sm:px-6 py-12 sm:py-16" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 id="nearby-title" className="font-display text-2xl font-semibold mb-8 text-center">{labels.nearby}</h2>
        {nearbyGroups.map(group => (
          <div key={group} className="mb-8 last:mb-0">
            <h3 className="font-display text-lg font-semibold mb-4">{labels[group]}</h3>
            <ul className="grid sm:grid-cols-3 gap-4">
              {nearby.filter(place => place.group === group).map(place => (
                <li key={place.slug}>
                  <a
                    className="block h-full rounded-2xl p-5 transition-transform hover:-translate-y-1"
                    style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
                    href={`/${locale}${nearbyPath(place.slug)}`}
                  >
                    {place.text[language][0]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

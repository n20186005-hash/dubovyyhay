import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_LOCALES, DEFAULT_LOCALE, localeUrl, openGraphLocale } from '@/lib/site';
import { nearby, nearbyPath, nearbyLocale, nearbyLabels } from '@/lib/nearby';

const walkPairs = [
  ['memorial-derevo-pamiati', 'park-metalurgiv-imeni-vitalia-sackogo'],
  ['fontan-zhizni', 'alea-maakovskogo'],
  ['alea-maakovskogo', 'muzei-fenomenalnoyi-sili'],
  ['komunalnij-zaklad-kinokoncertnij-zal-im-o-dovzenka', 'zaporizhzhia-biruchiy-art-centre'],
  ['zaporizkij-akademicnij-oblasnij-teatr-lalok', 'muzej-arhitekturi-zaporizza1'],
  ['mogila-osipa-gladkogo', 'oleksandrivskii-skver'],
] as const;

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return nearby.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const place = nearby.find(item => item.slug === slug);
  if (!place) return {};
  const [title, history] = place.text[nearbyLocale(locale)];
  const path = nearbyPath(slug);
  const canonical = localeUrl(locale, path);
  const image = new URL(place.image, canonical).href;
  return {
    title,
    description: history,
    alternates: {
      canonical,
      languages: Object.fromEntries([
        ...SITE_LOCALES.map(language => [language, localeUrl(language, path)]),
        ['x-default', localeUrl(DEFAULT_LOCALE, path)],
      ]),
    },
    openGraph: { locale: openGraphLocale(locale), title, description: history, url: canonical, images: [{ url: image, alt: title }] },
    twitter: { card: 'summary_large_image', title, description: history, images: [image] },
  };
}

export default async function NearbyAttraction({ params }: Props) {
  const { locale, slug } = await params;
  const place = nearby.find(item => item.slug === slug);
  if (!place) notFound();
  setRequestLocale(locale);
  const language = nearbyLocale(locale);
  const labels = nearbyLabels[language];
  const [title, history, observation, manager] = place.text[language];
  const [question, answer] = place.faq[language];
  const query = encodeURIComponent(`${place.text.uk[0]}, ${place.address}, Запоріжжя`);
  const map = `https://www.google.com/maps/search/?api=1&query=${query}`;
  const destination = place.coordinates ? encodeURIComponent(place.coordinates) : query;
  const coordinateMap = `https://www.google.com/maps/search/?api=1&query=${destination}`;
  const directionsHere = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  const directions = `${directionsHere}&origin=47.8089693%2C35.1657067`;
  const home = `/${locale}#nearby`;
  const type = place.group === 'parks' ? labels.parks : place.group === 'culture' ? labels.culture : labels.art;
  const isMuseumOfTechnology = slug === 'muzey-retro-avtomobiley';
  const publishedVisitorInfo = isMuseumOfTechnology ? 'https://faeton.zp.ua/muzeh/vidviduvannya/' : null;
  const burlaiInfo = slug === 'muzey-galereya-prikladnoy-keramiki-i-zhivopisnogo-tvorchestva-ili-i-alekseya-burlay'
    ? 'https://museum-gallery.org/uk/contacts/'
    : null;
  const visitorInfo = publishedVisitorInfo ?? burlaiInfo ?? place.visitSource ?? place.managerSource ?? place.source;
  const hours = publishedVisitorInfo ? labels.phaetonHours
    : burlaiInfo ? labels.burlaiHours
    : slug === 'muzej-arhitekturi-zaporizza1' ? labels.architectureHours
    : place.bookingSource ? labels.bookHours
    : labels.checkHours;
  const fees = publishedVisitorInfo ? labels.phaetonFees
    : place.bookingSource ? labels.freeTours
    : place.group === 'culture' ? labels.venueTip
    : labels.publicTip;
  const pairSlugs = walkPairs.flatMap(([a, b]) => slug === a ? [b] : slug === b ? [a] : []);
  const pairs = nearby.filter(candidate => pairSlugs.some(pairedSlug => pairedSlug === candidate.slug));
  const tip = place.group === 'culture' ? labels.venueTip : labels.arrivalTip;
  const sectionHeading = 'font-display text-2xl font-semibold mb-3';
  return (
    <>
      <Header />
      <main>
        <section className="px-4 sm:px-6 pt-28 pb-10 sm:pt-36" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <a className="underline text-sm" href={home}>{labels.nearby}</a>
            <h1 className="font-display text-3xl sm:text-5xl font-bold mt-5 mb-4">{title}</h1>
            <p className="mb-2">{place.tagline[language]}</p>
            <p className="mb-4">{place.displayAddress[language]}</p>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
              <a className="underline" href="#opening-hours">{labels.hours} · {hours}</a>
              <a className="underline" href="#visitor-reviews">{labels.visitorReviews}</a>
              <a className="underline" href={map}>{labels.map}</a>
            </div>
          </div>
        </section>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-10">
          <section>
            <h2 className={sectionHeading}>{labels.discover}</h2>
            <p className="leading-relaxed">{history}</p>
            <h3 className="font-semibold mt-5 mb-2">{labels.tips}</h3>
            <p className="leading-relaxed">{tip}</p>
            <h3 className="font-semibold mt-5 mb-2">{labels.highlights}</h3>
            <p className="leading-relaxed">{observation}</p>
          </section>
          <section className="rounded-2xl p-5 sm:p-6" style={{ background: 'var(--bg-secondary)' }}>
            <h2 className={sectionHeading}>{labels.manager}</h2>
            <p className="leading-relaxed">{manager || labels.managerUnknown}</p>
            <a className="underline" href={place.managerSource ?? place.source}>{place.managerSource ? labels.managementSource : labels.source}</a>
            {place.managerSource && <>
              {' · '}<a className="underline" href={place.source}>{labels.source}</a>
            </>}
          </section>
          <figure>
            <img className="rounded-xl w-full h-auto" src={place.image} alt={title} width={place.width} height={place.height} decoding="async" />
            <figcaption className="mt-2 text-sm"><a className="underline" href={place.photoSource}>{labels.photo}</a></figcaption>
          </figure>
          <section>
            <h2 className={sectionHeading}>{labels.basic}</h2>
            <dl className="grid gap-2 sm:grid-cols-[auto_1fr]">
              <dt className="font-semibold">{labels.name}</dt><dd>{title}</dd>
              <dt className="font-semibold">{labels.type}</dt><dd>{type}</dd>
              <dt className="font-semibold">{labels.localName}</dt><dd>{language === 'uk' ? title : <a className="underline" href={map}>{labels.map}</a>}</dd>
              <dt className="font-semibold">{labels.city}</dt><dd>{labels.cityValue}</dd>
              <dt className="font-semibold">{labels.address}</dt><dd>{place.displayAddress[language]}</dd>
              {manager && <>
                <dt className="font-semibold">{labels.operator}</dt><dd>{manager}</dd>
              </>}
              {place.coordinates && <>
                <dt className="font-semibold">{labels.location}</dt><dd><a className="underline" href={coordinateMap}>{place.coordinates}</a></dd>
              </>}
            </dl>
          </section>
          <section id="opening-hours" className="scroll-mt-24">
            <h2 className={sectionHeading}>{labels.hours}</h2>
            <p>{hours}</p>
            <a className="underline" href={visitorInfo}>{labels.checkVisit}</a>
          </section>
          <section>
            <h2 className={sectionHeading}>{labels.fees}</h2>
            <p>{fees}</p>
            {place.bookingSource && <a className="underline" href={place.bookingSource}>{labels.bookTours}</a>}
            {publishedVisitorInfo && <a className="underline" href={publishedVisitorInfo}>{labels.operatorRates}</a>}
          </section>
          <section>
            <h2 className={sectionHeading}>{labels.transport}</h2>
            {publishedVisitorInfo && <p className="mb-3">{labels.phaetonTransit}</p>}
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <a className="underline" href={directionsHere}>{labels.directionsHere}</a>
              <a className="underline" href={`${directions}&travelmode=walking`}>{labels.walk}</a>
              <a className="underline" href={`${directions}&travelmode=transit`}>{labels.transit}</a>
            </div>
          </section>
          <section>
            <h2 className={sectionHeading}>{labels.charm}</h2>
            <h3 className="font-semibold mb-2">{question}</h3>
            <p>{answer}</p>
          </section>
          <section>
            <h2 className={sectionHeading}>{labels.route}</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>{labels.start}</li>
              <li>{labels.arrive}</li>
              <li>{labels.finish}</li>
              {pairs.map(pair => (
                <li key={pair.slug}>
                  {labels.pair}{' · '}
                  <a className="underline" href={`/${locale}${nearbyPath(pair.slug)}`}>{pair.text[language][0]}</a>
                  {' · '}
                  <a
                    className="underline"
                    href={`https://www.google.com/maps/dir/?api=1&origin=${destination}&destination=${encodeURIComponent(`${pair.text.uk[0]}, ${pair.address}`)}&travelmode=walking`}
                  >
                    {labels.pairWalk}
                  </a>
                </li>
              ))}
            </ol>
          </section>
          <section>
            <h2 className={sectionHeading}>{labels.notices}</h2>
            <p>{labels.notice}</p>
            <h3 className="font-semibold mt-4 mb-2">{labels.access}</h3>
            <p>{labels.accessAnswer} <a className="underline" href={visitorInfo}>{labels.source}</a></p>
          </section>
          <section>
            <h2 className={sectionHeading}>{labels.photography}</h2>
            <p className="leading-relaxed">{place.photography[language]}</p>
          </section>
          <section>
            <h2 className={sectionHeading}>{labels.stay}</h2>
            <p>{labels.stayText}</p>
          </section>
          <section id="visitor-reviews" className="scroll-mt-24">
            <h2 className={sectionHeading}>{labels.visitorReviews}</h2>
            <h3 className="font-semibold mb-2">{labels.reviews}</h3>
            <a className="underline" href={map}>{labels.readReviews}</a>
          </section>
          <section>
            <h2 className={sectionHeading}>{labels.addressMap}</h2>
            <p className="mb-2">{place.displayAddress[language]}</p>
            <a className="underline" href={map}>{labels.map}</a>
          </section>
          <a className="underline" href={home}>{labels.nearby}</a>
        </div>
      </main>
      <Footer />
    </>
  );
}

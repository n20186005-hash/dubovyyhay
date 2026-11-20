import { MAPS_SHARE_URL } from './geo';
import type { TopicSlug } from './topics';

const mapSearch = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const newPlace = (name: string, address: string, source: string, image: string, file: string, photographer: string) => ({
  address,
  source,
  map: mapSearch(`${name}, ${address}, Запоріжжя, Україна`),
  image: `/nearby/${image}.jpg`,
  photoSource: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replaceAll(' ', '_'))}`,
  photographer,
});

const places = {
  park: {
    address: 'вул. Глісерна, 1, Запоріжжя',
    source: 'https://zp.gov.ua/news/377654-140-novix-dubiv-u-parku-dubovii-gai',
    map: MAPS_SHARE_URL,
  },
  museum: newPlace('Запорізький обласний краєзнавчий музей', 'вул. Троїцька, 29', 'https://museum.zp.ua/vidviduvacham/', 'museum', 'Запорізький обласний краєзнавчий музей.jpg', 'Yanuschenko DV'),
  station: newPlace('Історичний вокзал Олександрівськ, Запоріжжя-2', 'вул. Костянтина Великого, 9', 'https://dp.uz.gov.ua/ukr/vok_zap2', 'station', 'Вокзал Запоріжжя-2 (Олександрівськ).jpg', 'Каїра Федір'),
};

export function getTopicPlace(topic: TopicSlug) {
  return places[topic === 'local-history-museum' ? 'museum' : topic === 'zaporizhzhia-2-station' ? 'station' : 'park'];
}

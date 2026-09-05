import { getTranslations } from 'next-intl/server';

// 杜博维盖公园（Дубовий Гай）坐标：47.8081, 35.169
const LAT = '47.8081';
const LON = '35.1690';
const FORECAST_DAYS = 5;
const REVALIDATE_SECONDS = 1800; // 数据缓存时间

type Current = {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  precipitation: number;
  weather_code: number;
  wind_speed_10m: number;
};

type Daily = {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: (number | null)[];
};

type ForecastPayload = {
  current: Current;
  daily: Daily;
};

type WeatherData = ForecastPayload | { error: true };

const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=${FORECAST_DAYS}`;

async function getWeather(): Promise<WeatherData> {
  try {
    const res = await fetch(API_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return { error: true };
    return (await res.json()) as ForecastPayload;
  } catch {
    return { error: true };
  }
}

// WMO 天气代码 → 显示类别
function codeToCondition(code: number): string {
  if (code === 0 || code === 1) return 'clear';
  if (code === 2) return 'partly';
  if (code === 3) return 'cloud';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if ((code >= 61 && code <= 67) || code === 80) return 'rain';
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snow';
  if (code === 81 || code === 82) return 'showers';
  if (code === 95 || code === 96 || code === 99) return 'thunderstorm';
  return 'cloud';
}

const RAINY = new Set(['drizzle', 'rain', 'showers', 'snow', 'snowShowers', 'thunderstorm']);
const SUNNY = new Set(['clear', 'partly']);

function pickAdviceKey(
  condition: string,
  maxToday: number | undefined,
  minToday: number | undefined,
): string {
  if (RAINY.has(condition)) return 'umbrella';
  if (typeof maxToday === 'number' && maxToday >= 28 && SUNNY.has(condition)) return 'warm';
  if (typeof minToday === 'number' && minToday <= 3) return 'cold';
  if (SUNNY.has(condition)) return 'clear';
  return 'mild';
}

export default async function WeatherSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'weather' });
  const data = await getWeather();
  const conditionText = (key: string) => t(`condition.${key}` as never);

  if ('error' in data) {
    return (
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeading title={t('title')} subtitle={t('subtitle')} />
          <div
            className="rounded-xl p-8 text-center"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
          >
            <p style={{ color: 'var(--text-secondary)' }}>{t('unavailable')}</p>
          </div>
        </div>
      </section>
    );
  }

  const { current, daily } = data;
  const currentCondition = codeToCondition(current.weather_code);
  const maxToday = daily.temperature_2m_max[0];
  const minToday = daily.temperature_2m_min[0];
  const adviceKey = pickAdviceKey(currentCondition, maxToday, minToday);

  const now = new Date();
  const currentTime = formatTime(locale, now);

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />

        {/* 当前天气 */}
        <div
          className="rounded-2xl p-6 sm:p-8 mb-10"
          style={{
            background: 'linear-gradient(135deg, var(--bg-tertiary), var(--card-bg))',
            border: '1px solid var(--border-color)',
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            {/* 温度主体 */}
            <div className="flex items-center gap-6">
              <div
                className="flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                <ConditionIcon type={currentCondition} color="#fff" size={40} />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-display text-6xl font-semibold leading-none"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {Math.round(current.temperature_2m)}°
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>{currentTime}</span>
                </div>
                <p className="mt-2 text-lg" style={{ color: 'var(--text-secondary)' }}>
                  {conditionText(currentCondition)} · {t('feels')} {Math.round(current.apparent_temperature)}°
                </p>
              </div>
            </div>

            {/* 即时数据 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:flex-1 lg:ml-auto">
              <Stat label={t('humidity')} value={`${Math.round(current.relative_humidity_2m)}%`} />
              <Stat
                label={t('wind')}
                value={`${Math.round(current.wind_speed_10m)} km/h`}
              />
              <Stat
                label={t('precipNow')}
                value={`${current.precipitation.toFixed(1)} mm`}
              />
              <Stat
                label={t('precipChance')}
                value={`${daily.precipitation_probability_max[0] ?? 0}%`}
              />
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3" style={{ borderTop: '1px solid var(--border-color)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginTop: '0.2rem' }}>
              <path
                d="M12 3l7 3v5c0 4.5-3 8.4-7 10-4-1.6-7-5.5-7-10V6l7-3z"
                stroke="var(--accent)"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path d="M9 12l2 2 4-4" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p style={{ color: 'var(--text-primary)' }}>{t(`advice.${adviceKey}` as never)}</p>
          </div>
        </div>

        {/* 多日预报 */}
        <h3 className="font-display text-xl sm:text-2xl font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>
          {t('forecastTitle')}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {daily.time.map((dateStr, i) => {
            const cond = codeToCondition(daily.weather_code[i]);
            const pop = daily.precipitation_probability_max[i];
            return (
              <div
                key={dateStr}
                className="rounded-xl p-4 text-center"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
              >
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {i === 0 ? t('today') : formatWeekday(locale, dateStr)}
                </p>
                <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                  {formatDate(locale, dateStr)}
                </p>
                <div className="flex justify-center mb-2">
                  <ConditionIcon type={cond} color="var(--accent)" size={26} />
                </div>
                <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  {conditionText(cond)}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {Math.round(daily.temperature_2m_max[i])}°
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>
                    {Math.round(daily.temperature_2m_min[i])}°
                  </span>
                </div>
                {typeof pop === 'number' && pop > 0 && (
                  <div
                    className="inline-block mt-3 px-2 py-0.5 rounded-full text-xs"
                    style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
                  >
                    {t('precipChance')} {pop}%
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-center" style={{ color: 'var(--text-muted)' }}>
          {t('note')}
        </p>
      </div>
    </section>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <>
      <h2
        className="font-display text-3xl sm:text-4xl font-semibold mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </h2>
      <p className="mb-4" style={{ color: 'var(--text-muted)' }}>
        {subtitle}
      </p>
      <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-lg p-3 text-center"
      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
    >
      <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
        {label}
      </p>
      <p className="font-semibold text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>
        {value}
      </p>
    </div>
  );
}

function formatWeekday(locale: string, dateStr: string) {
  return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(new Date(`${dateStr}T12:00:00`));
}

function formatDate(locale: string, dateStr: string) {
  return new Intl.DateTimeFormat(locale, { month: 'numeric', day: 'numeric' }).format(
    new Date(`${dateStr}T12:00:00`),
  );
}

function formatTime(locale: string, date: Date) {
  return new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' }).format(date);
}

function ConditionIcon({ type, color, size }: { type: string; color: string; size: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (type) {
    case 'clear':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      );
    case 'partly':
      return (
        <svg {...common}>
          <circle cx="8.5" cy="7.5" r="3" />
          <path d="M8.5 2.2V3.6M3.5 4.3l1 1M2.2 7.5H3.6M4.4 11.7l-1 1M13 4.4l-1 1" />
          <path d="M18 15.5h-6a3.4 3.4 0 0 1-.5-6.8A5 5 0 0 1 21.3 8.7a3.1 3.1 0 0 1-3.3 6.8z" />
        </svg>
      );
    case 'cloud':
      return (
        <svg {...common}>
          <path d="M7 18a4 4 0 0 1-.6-7.95 5.5 5.5 0 0 1 10.7 1.2A3.6 3.6 0 0 1 17 18H7z" />
        </svg>
      );
    case 'fog':
      return (
        <svg {...common}>
          <path d="M6 7a4 4 0 0 1 7.9-1.2A4.5 4.5 0 0 1 14 14" />
          <path d="M4 14h10M3 17h12M5 20h8" />
        </svg>
      );
    case 'drizzle':
      return (
        <svg {...common}>
          <path d="M7 15a4 4 0 0 1-.6-7.95 5.5 5.5 0 0 1 10.7 1.2A3.6 3.6 0 0 1 17 15H7z" />
          <path d="M8 18v1M12 18v1.6M16 18v1" />
        </svg>
      );
    case 'rain':
      return (
        <svg {...common}>
          <path d="M7 15a4 4 0 0 1-.6-7.95 5.5 5.5 0 0 1 10.7 1.2A3.6 3.6 0 0 1 17 15H7z" />
          <path d="M7.5 17.5v3M12 18v3M16.5 17.5v3" />
        </svg>
      );
    case 'snow':
      return (
        <svg {...common}>
          <path d="M7 15a4 4 0 0 1-.6-7.95 5.5 5.5 0 0 1 10.7 1.2A3.6 3.6 0 0 1 17 15H7z" />
          <path d="M8 20v-1.6M10 19.2l1.4.8M12 21v-1.6M12 21v-1.6M14 19.2l-1.4.8M15 20v-1.6M15.5 16.6l.8 1.4" />
        </svg>
      );
    case 'showers':
      return (
        <svg {...common}>
          <path d="M6 15a4 4 0 0 1-.6-7.95 5.5 5.5 0 0 1 10.7 1.2A3.6 3.6 0 0 1 16 15H6z" />
          <path d="M7 18v2.5M11 18v2.5M15 18v2.5" />
        </svg>
      );
    case 'thunderstorm':
      return (
        <svg {...common}>
          <path d="M6 15a4 4 0 0 1-.6-7.95 5.5 5.5 0 0 1 10.7 1.2A3.6 3.6 0 0 1 16 15H6z" />
          <path d="M11.5 16.5l-2.2 3.4h2.6L10 22.5M11.5 16.5l1 2" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M7 15a4 4 0 0 1-.6-7.95 5.5 5.5 0 0 1 10.7 1.2A3.6 3.6 0 0 1 17 15H7z" />
        </svg>
      );
  }
}

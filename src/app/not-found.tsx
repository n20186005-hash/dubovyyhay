import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      <div className="text-center max-w-xl">
        <p className="font-display text-7xl sm:text-8xl font-bold mb-4" style={{ color: 'var(--accent)' }}>
          404
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold mb-3">
          Page not found · Сторінку не знайдено
        </h1>
        <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
          The page you requested does not exist. / Запитану сторінку не знайдено.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-2.5 rounded-full text-sm font-medium text-white transition-colors no-underline"
            style={{ background: 'var(--accent)' }}
          >
            Dubovyy Hay — Home
          </Link>
          <Link
            href="/uk"
            className="px-6 py-2.5 rounded-full text-sm font-medium transition-colors no-underline"
            style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
          >
            Українською
          </Link>
          <Link
            href="/ru"
            className="px-6 py-2.5 rounded-full text-sm font-medium transition-colors no-underline"
            style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
          >
            По-русски
          </Link>
          <Link
            href="/zh"
            className="px-6 py-2.5 rounded-full text-sm font-medium transition-colors no-underline"
            style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
          >
            中文
          </Link>
          <Link
            href="/en"
            className="px-6 py-2.5 rounded-full text-sm font-medium transition-colors no-underline"
            style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
          >
            English
          </Link>
        </div>
      </div>
    </div>
  );
}

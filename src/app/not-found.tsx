'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import messages from '@/messages/system/not-found.json';
import { DEFAULT_LOCALE, SITE_LOCALES } from '@/lib/site';

export default function NotFound() {
  const [locale, setLocale] = useState<(typeof SITE_LOCALES)[number]>(DEFAULT_LOCALE);
  useEffect(() => {
    const segment = window.location.pathname.split('/')[1];
    setLocale(SITE_LOCALES.find(language => language === segment) ?? DEFAULT_LOCALE);
  }, []);
  const t = messages[locale];

  return (
    <div
      lang={locale === 'zh' ? 'zh-CN' : locale}
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      <div className="text-center max-w-xl">
        <p className="font-display text-7xl sm:text-8xl font-bold mb-4" style={{ color: 'var(--accent)' }}>
          404
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold mb-3">
          {t.title}
        </h1>
        <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
          {t.description}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href={`/${locale}`}
            className="px-6 py-2.5 rounded-full text-sm font-medium text-white transition-colors no-underline"
            style={{ background: 'var(--accent)' }}
          >
            {t.home}
          </Link>
          <Link
            href="/uk"
            lang="uk"
            className="px-6 py-2.5 rounded-full text-sm font-medium transition-colors no-underline"
            style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
          >
            Українською
          </Link>
          <Link
            href="/ru"
            lang="ru"
            className="px-6 py-2.5 rounded-full text-sm font-medium transition-colors no-underline"
            style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
          >
            По-русски
          </Link>
          <Link
            href="/zh"
            lang="zh"
            className="px-6 py-2.5 rounded-full text-sm font-medium transition-colors no-underline"
            style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
          >
            中文
          </Link>
          <Link
            href="/en"
            lang="en"
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

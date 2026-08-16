'use client';

import ContactSection from '@/components/sections/ContactSection';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function ContactoPage() {
  const { lang } = useLanguage();

  const backText = {
    es: '← Volver al inicio',
    en: '← Back to home',
    pt: '← Voltar ao início',
  }[lang] || '← Volver al inicio';

  return (
    <div style={{ minHeight: '100vh', paddingTop: 'calc(var(--header-height) + 20px)', paddingBottom: 60 }}>
      <div className="container" style={{ marginBottom: 20 }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            color: 'var(--color-primary)',
            fontWeight: 600,
            fontSize: '0.9rem',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
        >
          {backText}
        </Link>
      </div>
      <ContactSection />
    </div>
  );
}

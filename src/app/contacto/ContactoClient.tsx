'use client';

import ContactSection from '@/components/sections/ContactSection';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function ContactoClient() {
  const { lang } = useLanguage();

  const backText = {
    es: 'Inicio',
    en: 'Home',
    pt: 'Início',
  }[lang] || 'Inicio';

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Minimalist Floating Back Button */}
      <Link
        href="/"
        aria-label={backText}
        style={{
          position: 'fixed',
          top: 'calc(var(--header-height) + 16px)',
          left: 'max(16px, env(safe-area-inset-left))',
          zIndex: 40,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 14px',
          borderRadius: 30,
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid var(--border-color)',
          color: 'var(--text-primary)',
          fontWeight: 600,
          fontSize: '0.82rem',
          textDecoration: 'none',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-primary)';
          e.currentTarget.style.transform = 'translateX(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-color)';
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        <span style={{ fontSize: '1rem', lineHeight: 1 }}>←</span>
        <span>{backText}</span>
      </Link>

      <ContactSection />
    </div>
  );
}

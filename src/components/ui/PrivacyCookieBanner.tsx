'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

const CONSENT_STORAGE_KEY = 'underlife_privacy_consent';
const CONSENT_COOKIE_NAME = 'underlife_privacy_consent';

function hasUserConsented(): boolean {
  if (typeof window === 'undefined') return true;

  // 1. Check localStorage
  try {
    const val = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (val) {
      const parsed = JSON.parse(val);
      if (parsed && (parsed.accepted === true || parsed === true)) {
        return true;
      }
    }
  } catch (e) {
    // localStorage restricted or unavailable
  }

  // 2. Check document.cookie as robust cross-page fallback
  try {
    if (typeof document !== 'undefined' && document.cookie) {
      const cookies = document.cookie.split(';');
      for (const item of cookies) {
        const [k, v] = item.trim().split('=');
        if (k === CONSENT_COOKIE_NAME && (v === 'true' || v === '1')) {
          return true;
        }
      }
    }
  } catch (e) {}

  return false;
}

export default function PrivacyCookieBanner() {
  const { lang } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consented = hasUserConsented();
    setIsVisible(!consented);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_STORAGE_KEY || e.key === null) {
        setIsVisible(!hasUserConsented());
      }
    };

    const handleCustomEvent = () => {
      setIsVisible(!hasUserConsented());
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('underlife_privacy_consent_changed', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('underlife_privacy_consent_changed', handleCustomEvent);
    };
  }, []);

  const handleAccept = () => {
    // 1. Save to localStorage
    try {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({
          accepted: true,
          timestamp: Date.now(),
          date: new Date().toISOString(),
          version: '1.0',
        })
      );
    } catch (e) {}

    // 2. Save persistent cookie for 1 year (31,536,000 seconds)
    try {
      if (typeof document !== 'undefined') {
        const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
        document.cookie = `${CONSENT_COOKIE_NAME}=true; path=/; max-age=31536000; SameSite=Lax${secureFlag}`;
      }
    } catch (e) {}

    // 3. Notify in-memory listeners across any components or tabs
    try {
      window.dispatchEvent(new Event('underlife_privacy_consent_changed'));
    } catch (e) {}

    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!mounted || !isVisible) return null;

  const content = {
    es: {
      tagPrivacy: 'Privacidad & LOPDP',
      tagCookies: 'Cookies Técnicas',
      desc: 'En Fundación Underlife valoramos tu privacidad. Empleamos cookies técnicas estrictamente necesarias para garantizar una navegación segura, optimizar la experiencia en el sitio y salvaguardar la integridad de nuestra plataforma. Tus datos jamás son comercializados con terceros.',
      policyIntro: 'Consulta nuestra',
      privacy: 'Política de Privacidad',
      close: 'Cerrar',
      accept: 'Aceptar y Continuar',
    },
    en: {
      tagPrivacy: 'Privacy & Data Protection',
      tagCookies: 'Technical Cookies',
      desc: 'At Fundación Underlife, we value your privacy. We use strictly necessary technical cookies to ensure secure browsing, optimize site experience, and protect system integrity. Your data is never sold to third parties.',
      policyIntro: 'Read our',
      privacy: 'Privacy Policy',
      close: 'Close',
      accept: 'Accept & Continue',
    },
    pt: {
      tagPrivacy: 'Privacidade & Proteção de Dados',
      tagCookies: 'Cookies Técnicos',
      desc: 'Na Fundación Underlife, valorizamos sua privacidade. Utilizamos cookies técnicos estritamente necessários para garantir uma navegação segura, otimizar a experiência no site e proteger a integridade da plataforma. Seus dados nunca são comercializados com terceiros.',
      policyIntro: 'Consulte nossa',
      privacy: 'Política de Privacidade',
      close: 'Fechar',
      accept: 'Aceitar e Continuar',
    },
  };

  const currentText = content[lang as 'es' | 'en' | 'pt'] || content.es;

  return (
    <aside
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de Privacidad y Cookies — Fundación Underlife"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2147483647,
        pointerEvents: 'none',
        padding: 'clamp(12px, 3vw, 24px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}
    >
      <div
        style={{
          pointerEvents: 'auto',
          width: '100%',
          maxWidth: '840px',
          borderRadius: '20px',
          background: 'var(--bg-card)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--border-color-strong)',
          boxShadow: '0 24px 54px -10px rgba(0, 10, 40, 0.45)',
          padding: 'clamp(16px, 2.5vw, 22px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {/* Left: Icon & Description */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              flex: '1 1 340px',
              minWidth: 0,
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'rgba(0, 85, 255, 0.12)',
                border: '1px solid rgba(0, 85, 255, 0.25)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: '22px', height: '22px' }}
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>

            {/* Text & Tags */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap',
                  marginBottom: '6px',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: 'var(--color-primary)',
                    background: 'rgba(0, 85, 255, 0.12)',
                    padding: '2px 9px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(0, 85, 255, 0.25)',
                  }}
                >
                  🔒 {currentText.tagPrivacy}
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                  }}
                >
                  🍪 {currentText.tagCookies}
                </span>
              </div>

              <p
                style={{
                  fontSize: '0.86rem',
                  lineHeight: 1.55,
                  color: 'var(--text-secondary)',
                  margin: 0,
                }}
              >
                {currentText.desc}{' '}
                <span style={{ whiteSpace: 'nowrap' }}>
                  {currentText.policyIntro}{' '}
                  <Link
                    href="/privacidad"
                    style={{
                      color: 'var(--color-primary)',
                      fontWeight: 600,
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                    }}
                  >
                    {currentText.privacy}
                  </Link>
                  .
                </span>
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexShrink: 0,
              alignSelf: 'center',
              marginLeft: 'auto',
            }}
          >
            <button
              type="button"
              onClick={handleDismiss}
              style={{
                padding: '9px 16px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-color-strong)',
                background: 'transparent',
                color: 'var(--text-muted)',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              {currentText.close}
            </button>

            <button
              type="button"
              onClick={handleAccept}
              className="btn btn-primary"
              style={{
                padding: '9px 20px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.86rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0, 85, 255, 0.3)',
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: '15px', height: '15px' }}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{currentText.accept}</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

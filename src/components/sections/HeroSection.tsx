'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    // Simple fade-in on mount
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 1s ease, transform 1s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, []);

  const stats = [
    { value: t('stats.years'), label: t('stats.yearsLabel') },
    { value: t('stats.children'), label: t('stats.childrenLabel') },
    { value: t('stats.families'), label: t('stats.familiesLabel') },
    { value: t('stats.youth'), label: t('stats.youthLabel') },
  ];

  return (
    <section
      id="inicio"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'calc(var(--header-height) + 40px) var(--space-lg) var(--space-3xl)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Media */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 25% 30%, rgba(0,85,255,0.08), transparent 50%), radial-gradient(circle at 75% 70%, rgba(255,85,0,0.06), transparent 50%)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.12,
            filter: 'blur(10px)',
          }}
        >
          <source src="/recursos_opt/Videos/underlife-hero-bg.webm" type="video/webm" />
          <source src="/recursos_opt/Videos/underlife-hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto' }}>
        {/* Decorative cursive */}
        <p
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
            color: 'var(--color-teal)',
            marginBottom: 8,
          }}
        >
          Fundación Underlife
        </p>

        {/* Main Headline */}
        <h1
          style={{
            fontSize: 'clamp(2rem, 5.5vw, 3.6rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          {t('headline')}{' '}
          <span className="gradient-text">{t('headlineAccent')}</span>
        </h1>

        {/* Sub-headline */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
            color: 'var(--text-secondary)',
            maxWidth: 640,
            margin: '0 auto 32px',
            lineHeight: 1.7,
          }}
        >
          {t('subheadline')}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 56 }}>
          <a href="#donar" className="btn btn-primary">
            {t('ctaPrimary')}
          </a>
          <a href="#impacto" className="btn btn-outline">
            {t('ctaSecondary')}
          </a>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 16,
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card"
              style={{
                padding: '24px 16px',
                textAlign: 'center',
              }}
            >
              <span
                className="gradient-text-primary"
                style={{ fontSize: '1.8rem', fontWeight: 800, display: 'block' }}
              >
                {stat.value}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 4, display: 'block' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#adn"
        aria-label="Scroll"
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--text-muted)',
          fontSize: '1.5rem',
          animation: 'bounceDown 2s infinite',
        }}
      >
        ↓
      </a>

      <style>{`
        @keyframes bounceDown {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.4; }
          50% { transform: translateX(-50%) translateY(10px); opacity: 1; }
        }
      `}</style>
    </section>
  );
}

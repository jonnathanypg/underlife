'use client';

import { useTranslations } from 'next-intl';

const pillarIcons: Record<string, React.ReactNode> = {
  childhood: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  ),
  rights: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
      <path d="m16 16 3-8 3 8c-.87.44-1.92.72-3 .72s-2.13-.28-3-.72ZM2 16l3-8 3 8c-.87.44-1.92.72-3 .72s-2.13-.28-3-.72Z"></path>
      <line x1="7" y1="21" x2="17" y2="21"></line>
      <line x1="12" y1="3" x2="12" y2="21"></line>
    </svg>
  ),
  tech: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
      <path d="M9.663 17h4.674"></path>
      <path d="M10 20h4"></path>
      <path d="M12 2v1"></path>
      <path d="m4.929 4.929.707.707"></path>
      <path d="M2 12h1"></path>
      <path d="m5.636 18.364-.707.707"></path>
      <path d="m18.364 5.636.707-.707"></path>
      <path d="M21 12h1"></path>
      <path d="m19.071 19.071-.707-.707"></path>
      <path d="M12 22v-1"></path>
      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
    </svg>
  ),
  culture: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="22"></line>
      <line x1="8" y1="22" x2="16" y2="22"></line>
    </svg>
  ),
  climate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
      <path d="M2 6c.6.5 1.2 1 2.5 1C5.8 7 7 6 7 6s1.2-1 2.5-1C10.8 5 12 6 12 6s1.2 1 2.5 1c1.3 0 2.5-1 2.5-1s1.2-1 2.5-1c1.3 0 2.5 1 2.5 1"></path>
      <path d="M2 12c.6.5 1.2 1 2.5 1 1.3 0 2.5-1 2.5-1s1.2-1 2.5-1c1.3 0 2.5 1 2.5 1s1.2 1 2.5 1c1.3 0 2.5-1 2.5-1s1.2-1 2.5-1c1.3 0 2.5 1 2.5 1"></path>
      <path d="M2 18c.6.5 1.2 1 2.5 1 1.3 0 2.5-1 2.5-1s1.2-1 2.5-1c1.3 0 2.5 1 2.5 1s1.2 1 2.5 1c1.3 0 2.5-1 2.5-1s1.2-1 2.5-1c1.3 0 2.5 1 2.5 1"></path>
    </svg>
  ),
};

const pillarColors: Record<string, string> = {
  childhood: 'var(--color-primary)',
  rights: 'var(--color-teal)',
  tech: 'var(--color-accent)',
  culture: '#a855f7',
  climate: '#06b6d4',
};

export default function DNASection() {
  const t = useTranslations('dna');
  const pillars = ['childhood', 'rights', 'tech', 'culture', 'climate'] as const;

  return (
    <section
      id="adn"
      className="section section-dark"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            {t('headline')}{' '}
            <span className="gradient-text">{t('headlineAccent')}</span>
          </h2>
          <p className="section-subtitle">{t('intro')}</p>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 24,
          }}
        >
          {pillars.map((key) => (
            <div
              key={key}
              className="glass-card dna-card"
              style={{
                padding: 28,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                flex: '1 1 320px',
                maxWidth: '400px',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  background: `${pillarColors[key]}15`,
                }}
              >
                {pillarIcons[key]}
              </div>
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: pillarColors[key],
                }}
              >
                {t(`pillars.${key}.title`)}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                {t(`pillars.${key}.text`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

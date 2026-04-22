'use client';

import { useTranslations } from 'next-intl';

const pillarIcons: Record<string, string> = {
  childhood: '🧒',
  rights: '⚖️',
  tech: '💡',
  culture: '🎤',
  climate: '🌊',
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
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {pillars.map((key) => (
            <div
              key={key}
              className="glass-card"
              style={{
                padding: 28,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
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

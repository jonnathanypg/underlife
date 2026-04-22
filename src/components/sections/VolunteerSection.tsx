'use client';

import { useTranslations } from 'next-intl';

export default function VolunteerSection() {
  const t = useTranslations('volunteer');

  return (
    <section id="voluntariado" className="section section-dark" style={{ overflow: 'hidden', position: 'relative' }}>
      {/* Accent gradient orb */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,85,255,0.06), transparent 70%)',
          bottom: '-20%',
          right: '-10%',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title">
            {t('headline')}{' '}
            <span className="gradient-text">{t('headlineAccent')}</span>
          </h2>
          <p
            className="section-subtitle"
            style={{ marginBottom: 36 }}
          >
            {t('body')}
          </p>
          <a href="#contacto" className="btn btn-primary" style={{ fontSize: '1.05rem' }}>
            {t('cta')}
          </a>
        </div>
      </div>
    </section>
  );
}

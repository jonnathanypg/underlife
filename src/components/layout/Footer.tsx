'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer
      style={{
        background: 'var(--bg-section-alt)',
        borderTop: '1px solid var(--divider)',
        paddingTop: 60,
        paddingBottom: 24,
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 40,
            marginBottom: 40,
          }}
        >
          {/* Brand Column */}
          <div>
            <h4
              style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                marginBottom: 12,
              }}
            >
              <span className="gradient-text">Under</span>life
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
              {t('tagline')}
            </p>
            <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
              {['facebook', 'instagram', 'linkedin'].map((social) => (
                <a
                  key={social}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--border-color)',
                    color: 'var(--text-secondary)',
                    fontSize: '1rem',
                    transition: 'all var(--duration-fast) var(--ease-out)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-primary)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--border-color)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  {social === 'facebook' ? 'f' : social === 'instagram' ? '📷' : 'in'}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 style={{ fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>
              {t('quickLinks')}
            </h5>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['home', 'dna', 'projects', 'impact', 'volunteer'].map((key) => (
                <li key={key}>
                  <a
                    href={`#${key === 'home' ? 'inicio' : key === 'dna' ? 'adn' : key === 'projects' ? 'proyectos' : key}`}
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.9rem',
                      transition: 'color var(--duration-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {nav(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 style={{ fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>
              {t('contactTitle')}
            </h5>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                📍 {t('location')}
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                ✉️ hola@fundacionunderlife.org
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                📞 0960193518
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--divider)',
            paddingTop: 20,
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
          }}
        >
          <p>{t('copyright')}</p>
          <p style={{ marginTop: 4 }}>
            {t('developer')}{' '}
            <a
              href="https://weblifetech.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-accent)', fontWeight: 600 }}
            >
              WEBLIFETECH S.A.S.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

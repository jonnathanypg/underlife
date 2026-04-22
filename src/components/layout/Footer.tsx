'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from '@/components/ui/ThemeProvider';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const { theme } = useTheme();

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
            <img
              src={theme === 'dark'
                ? '/logos/logo-fundacionunderlife-dark.png'
                : '/logos/logo-fundacionunderlife-ligth.png'
              }
              alt={t('brand')}
              style={{
                height: 64,
                width: 'auto',
                marginBottom: 20,
                display: 'block'
              }}
            />
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
              {t('tagline')}
            </p>
            <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
              {['facebook', 'instagram', 'linkedin'].map((social) => (
                <a
                  key={social}
                  href={
                    social === 'facebook' 
                      ? 'https://www.facebook.com/underlife.ong/' 
                      : social === 'instagram'
                      ? 'https://www.instagram.com/underlife_ong/'
                      : 'https://www.linkedin.com/company/underlife-ong/'
                  }
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
                  {social === 'facebook' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  )}
                  {social === 'instagram' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  )}
                  {social === 'linkedin' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  )}
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
              <li style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18, color: 'var(--color-primary)' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                {t('location')}
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18, color: 'var(--color-primary)' }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                info@fundacionunderlife.org
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18, color: 'var(--color-primary)' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                +593986020391
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

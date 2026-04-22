'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from '@/components/ui/ThemeProvider';
import { Link, usePathname, useRouter } from '@/i18n/navigation';

export default function Header() {
  const t = useTranslations('nav');
  const tTheme = useTranslations('theme');
  const tLang = useTranslations('lang');
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const locale = useLocale();
  const isEn = locale === 'en';
  const nextLocale = isEn ? 'es' : 'en';

  const navItems = [
    { key: 'home', href: '#inicio' },
    { key: 'dna', href: '#adn' },
    { key: 'projects', href: '#proyectos' },
    { key: 'impact', href: '#impacto' },
    { key: 'volunteer', href: '#voluntariado' },
    { key: 'contact', href: '#contacto' },
  ];

  return (
    <header
      id="site-header"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 'var(--z-sticky)' as unknown as number,
        height: 'var(--header-height)',
        display: 'flex',
        alignItems: 'center',
        transition: 'all var(--duration-normal) var(--ease-out)',
        background: scrolled
          ? 'var(--glass-bg)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(var(--glass-blur))' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(var(--glass-blur))' : 'none',
        borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
        boxShadow: scrolled ? 'var(--glass-shadow)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={theme === 'dark'
              ? '/logos/logo-fundacionunderlife-dark.png'
              : '/logos/logo-fundacionunderlife-ligth.png'
            }
            alt="Fundación Underlife"
            className="site-logo"
            style={{
              height: 'var(--logo-height, 48px)',
              width: 'auto',
              transition: 'all var(--duration-normal) var(--ease-out)',
              display: 'block'
            }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'color var(--duration-fast) var(--ease-out)',
                position: 'relative',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {t(item.key)}
            </a>
          ))}

          <button
            onClick={() => {
              // Override next-intl cookie memory explicitly
              document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;
              window.location.href = `/${nextLocale}${pathname}`;
            }}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: `url(${isEn ? 'https://flagcdn.com/ec.svg' : 'https://flagcdn.com/us.svg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              border: theme === 'dark' ? 'solid 3px white' : 'solid 3px #1e1e38',
              transition: 'transform var(--duration-fast) var(--ease-out), filter var(--duration-fast)',
              cursor: 'pointer',
              padding: 0,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.filter = 'brightness(1.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(1)'; }}
            title={isEn ? 'Cambiar a Español' : 'Switch to English'}
            aria-label="Toggle Language"
          />

          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? tTheme('light') : tTheme('dark')}
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--border-color)',
              color: 'var(--text-primary)',
              transition: 'all var(--duration-fast) var(--ease-out)',
              cursor: 'pointer',
              border: 'none',
              padding: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.background = 'var(--divider)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'var(--border-color)'; }}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style={{ width: 18, height: 18 }}>
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style={{ width: 18, height: 18 }}>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {/* Donate CTA */}
          <a href="#donar" className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '10px 22px' }}>
            {t('donate')}
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          style={{
            display: 'none',
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            color: 'var(--text-primary)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div
          className="mobile-nav-overlay"
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: theme === 'dark' ? 'rgba(10, 10, 20, 0.98)' : 'rgba(248, 250, 252, 0.98)',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            padding: '40px 20px',
            zIndex: ('var(--z-sticky)' as unknown as number) - 1,
            height: '100vh',
            width: '100vw',
          }}
        >
          {/* Prevent click propagation on menu items so we can click overlay to close */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: 24,
              width: '100%' 
            }}
          >
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                color: 'var(--text-primary)',
                fontSize: '1.3rem',
                fontWeight: 700,
              }}
            >
              {t(item.key)}
            </a>
          ))}
          <a
            href="#donar"
            onClick={() => setMobileOpen(false)}
            className="btn btn-primary"
            style={{ marginTop: 16 }}
          >
            {t('donate')}
          </a>
          <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
            <button
              onClick={() => {
                setMobileOpen(false);
                document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;
                window.location.href = `/${nextLocale}${pathname}`;
              }}
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                background: `url(${isEn ? 'https://flagcdn.com/ec.svg' : 'https://flagcdn.com/us.svg'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                border: theme === 'dark' ? 'solid 3px white' : 'solid 3px #1e1e38',
                cursor: 'pointer',
                padding: 0,
                marginTop: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}
              title={isEn ? 'Cambiar a Español' : 'Switch to English'}
              aria-label="Toggle Language"
            />
            <button 
              onClick={toggleTheme} 
              style={{ 
                width: 44,
                height: 44,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer' 
              }}
            >
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style={{ width: 22, height: 22 }}>
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style={{ width: 22, height: 22 }}>
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
          </div>
          </div>
        </div>
      )}

      <style>{`
        :root {
          --logo-height: 48px;
        }

        @media (max-width: 900px) {
          :root {
            --logo-height: 42px;
          }
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }

        @media (max-width: 600px) {
          :root {
            --logo-height: 36px;
          }
        }
      `}</style>
    </header>
  );
}

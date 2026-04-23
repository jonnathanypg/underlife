'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
      if (mobileLangRef.current && !mobileLangRef.current.contains(event.target as Node)) {
        // We only close mobile lang dropdown if clicked outside its area
        // but mobileOpen state is handled by the main overlay
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const locale = useLocale();
  const languages = [
    { code: 'es', flag: 'https://flagcdn.com/ec.svg', label: tLang('switch') },
    { code: 'en', flag: 'https://flagcdn.com/us.svg', label: tLang('switchEn') },
    { code: 'pt', flag: 'https://flagcdn.com/br.svg', label: tLang('switchPt') },
  ];

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

          <div className="lang-selector-container" ref={langRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: `url(${languages.find(l => l.code === locale)?.flag})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: theme === 'dark' ? 'solid 2.5px white' : 'solid 2.5px #1e1e38',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: langOpen ? '0 0 12px var(--color-primary)' : '0 2px 6px rgba(0,0,0,0.1)',
                padding: 0,
              }}
              title={tLang('switch')}
            />
            
            {langOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 12px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  boxShadow: 'var(--glass-shadow)',
                  zIndex: 100,
                  minWidth: 120,
                }}
              >
                {languages.filter(l => l.code !== locale).map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      document.cookie = `NEXT_LOCALE=${lang.code}; path=/; max-age=31536000`;
                      // Defensive: ensure pathname doesn't contain current locale prefix
                      const cleanPath = pathname.replace(/^\/(es|en|pt)(\/|$)/, '/') || '/';
                      router.replace(cleanPath, { locale: lang.code, scroll: false });
                      setLangOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'background 0.2s ease',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: `url(${lang.flag})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }} />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                      {lang.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

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
          <div style={{ marginTop: 12, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div 
              style={{ 
                display: 'flex', 
                gap: 16, 
                padding: '10px 20px', 
                background: 'rgba(255,255,255,0.05)', 
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-color)'
              }}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setMobileOpen(false);
                    document.cookie = `NEXT_LOCALE=${lang.code}; path=/; max-age=31536000`;
                    const cleanPath = pathname.replace(/^\/(es|en|pt)(\/|$)/, '/') || '/';
                    router.replace(cleanPath, { locale: lang.code, scroll: false });
                  }}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: `url(${lang.flag})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: locale === lang.code
                      ? (theme === 'dark' ? 'solid 3px var(--color-accent)' : 'solid 3px var(--color-primary)')
                      : (theme === 'dark' ? 'solid 2px white' : 'solid 2px #1e1e38'),
                    cursor: 'pointer',
                    opacity: locale === lang.code ? 1 : 0.5,
                    transform: locale === lang.code ? 'scale(1.15)' : 'scale(1)',
                    transition: 'all 0.2s ease',
                    boxShadow: locale === lang.code ? '0 4px 10px var(--color-primary)' : 'none',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
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

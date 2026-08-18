'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from '@/lib/LanguageContext';
import { SponsorConversationalModal, SponsorRole } from '@/components/sections/SponsorConversationalModal';
import { ArtistPreRegistrationModal } from '@/components/sections/ArtistPreRegistrationModal';

export default function Primeros1000DiasPage() {
  const t = useTranslations('primeros1000');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRole, setModalRole] = useState<SponsorRole>('patrocinador');
  const [artistModalOpen, setArtistModalOpen] = useState(false);

  const handleOpenSponsorModal = (role: SponsorRole) => {
    setModalRole(role);
    setModalOpen(true);
  };

  return (
    <div style={{ paddingTop: 'var(--header-height, 72px)', minHeight: '100vh' }}>
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: 'relative',
          padding: '70px 0 60px',
          background: 'linear-gradient(180deg, rgba(0,85,255,0.06) 0%, rgba(255,85,0,0.04) 100%)',
          overflow: 'hidden',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb & Tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <Link
              href="/"
              style={{
                fontSize: '0.85rem',
                color: 'var(--color-primary)',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              {t('backHome')}
            </Link>
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            <span
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                background: 'rgba(255, 85, 0, 0.12)',
                color: 'var(--color-accent)',
                border: '1px solid rgba(255, 85, 0, 0.25)',
              }}
            >
              {t('heroTag')}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <h1
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                  fontWeight: 900,
                  lineHeight: 1.15,
                  marginBottom: '20px',
                  letterSpacing: '-0.02em',
                }}
              >
                {t('heroTitle')}{' '}
                <span className="gradient-text">{t('heroTitleAccent')}</span>
              </h1>
              <p
                style={{
                  fontSize: '1.08rem',
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  marginBottom: '16px',
                }}
              >
                {t('heroDesc1')}
              </p>
              <p
                style={{
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  color: 'var(--text-muted)',
                  marginBottom: '28px',
                }}
              >
                {t('heroDesc2')}
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '32px' }}>
                <button
                  onClick={() => handleOpenSponsorModal('patrocinador')}
                  className="btn btn-primary"
                  style={{
                    padding: '14px 28px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--gradient-primary)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    boxShadow: '0 8px 24px rgba(0, 85, 255, 0.3)',
                    cursor: 'pointer',
                    border: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span>{t('heroCtaSponsor')}</span>
                </button>

                <button
                  onClick={() => setArtistModalOpen(true)}
                  className="btn"
                  style={{
                    padding: '14px 22px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color-strong)',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span>{t('heroCtaArtist')}</span>
                </button>
              </div>

              {/* Quick stats / Highlights */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>11</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t('statsLocations')}</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-teal)' }}>2</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t('statsCities')}</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-accent)' }}>100%</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t('statsDestination')}</div>
                </div>
              </div>
            </div>

            {/* HERO OPTIMIZED IMAGE CONTAINER (No destructive cropping, responsive CSS frame) */}
            <div>
              <div
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color-strong)',
                  boxShadow: '0 20px 40px -15px rgba(0, 85, 255, 0.25)',
                  background: 'var(--bg-card)',
                  height: 'clamp(300px, 42vw, 440px)',
                  width: '100%',
                }}
              >
                <img
                  src="/artivismo-img/hero_festival_muralismo.webp"
                  alt="Festival de muralismo comunitario Primeros 1000 Días en Milagro y La Libertad - Fundación Underlife"
                  loading="eager"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 35%',
                    display: 'block',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                />

                {/* Ambient Bottom Badge Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '24px 20px 16px',
                    background: 'linear-gradient(180deg, transparent 0%, rgba(5, 5, 20, 0.88) 100%)',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        background: 'var(--color-accent)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        display: 'inline-block',
                        marginBottom: '4px',
                      }}
                    >
                      {t('imgHeroBadge')}
                    </span>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
                      Color & Vida Festival: Arte con Propósito Social
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EL PROPÓSITO: LA VENTANA CRÍTICA DE LOS PRIMEROS 1.000 DÍAS */}
      <section className="section" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 700,
                background: 'rgba(38, 180, 156, 0.1)',
                color: 'var(--color-teal)',
                border: '1px solid rgba(38, 180, 156, 0.2)',
                marginBottom: '12px',
              }}
            >
              {t('purposeTag')}
            </span>
            <h2 className="section-title">
              {t('purposeTitle')}{' '}
              <span className="gradient-text">{t('purposeTitleAccent')}</span>
            </h2>
            <p className="section-subtitle">
              {t('purposeSubtitle')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '50px' }}>
            {/* Card 1 */}
            <div className="glass-card" style={{ padding: '28px', borderRadius: '20px' }}>
              <div style={{ fontSize: '2.2rem', marginBottom: '14px' }}>🧠</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px', color: 'var(--color-primary)' }}>
                {t('cardNeuroTitle')}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {t('cardNeuroText')}
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass-card" style={{ padding: '28px', borderRadius: '20px' }}>
              <div style={{ fontSize: '2.2rem', marginBottom: '14px' }}>🥗</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px', color: 'var(--color-teal)' }}>
                {t('cardDciTitle')}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {t('cardDciText')}
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass-card" style={{ padding: '28px', borderRadius: '20px' }}>
              <div style={{ fontSize: '2.2rem', marginBottom: '14px' }}>🎨</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px', color: 'var(--color-accent)' }}>
                {t('cardMuralTitle')}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {t('cardMuralText')}
              </p>
            </div>
          </div>

          {/* Dual Optimized Images Gallery (Infancia & Arte Comunitario) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            <div
              className="glass-card"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <img
                  src="/artivismo-img/infancia_primeros_1000_dias.webp"
                  alt="Programas de apoyo a la primera infancia y nutrición integral - Fundación Underlife"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    background: 'rgba(5, 5, 20, 0.75)',
                    backdropFilter: 'blur(6px)',
                    color: 'var(--color-teal)',
                    border: '1px solid rgba(38, 180, 156, 0.3)',
                  }}
                >
                  {t('imgInfanciaBadge')}
                </span>
              </div>
              <div style={{ padding: '20px' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 6px' }}>
                  {t('imgInfanciaTitle')}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {t('imgInfanciaDesc')}
                </p>
              </div>
            </div>

            <div
              className="glass-card"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <img
                  src="/artivismo-img/arte_comunitario_murales.webp"
                  alt="Murales comunitarios pedagógicos y arte urbano con impacto social en barrios del Ecuador"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    background: 'rgba(5, 5, 20, 0.75)',
                    backdropFilter: 'blur(6px)',
                    color: 'var(--color-accent)',
                    border: '1px solid rgba(255, 85, 0, 0.3)',
                  }}
                >
                  🎨 Artivismo Comunitario
                </span>
              </div>
              <div style={{ padding: '20px' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 6px' }}>
                  {t('imgArteTitle')}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {t('imgArteDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MODELO PILOTO 2026: 11 LOCACIONES EN 2 CIUDADES & ESCALABILIDAD ANUAL */}
      <section className="section section-dark" style={{ padding: '80px 0', background: 'var(--bg-section-alt)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 40px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 700,
                background: 'rgba(255, 85, 0, 0.1)',
                color: 'var(--color-accent)',
                border: '1px solid rgba(255, 85, 0, 0.2)',
                marginBottom: '12px',
              }}
            >
              {t('tourTag')}
            </span>
            <h2 className="section-title">
              {t('tourTitle')}{' '}
              <span className="gradient-text">{t('tourTitleAccent')}</span>
            </h2>
            <p className="section-subtitle">
              {t('tourSubtitle')}
            </p>
          </div>

          {/* Locations Showcase & Full-Width WebP Map Card */}
          <div
            className="glass-card"
            style={{
              padding: 'clamp(24px, 4vw, 36px)',
              borderRadius: '24px',
              border: '1px solid var(--border-color-strong)',
              background: 'linear-gradient(135deg, rgba(0,85,255,0.06) 0%, rgba(255,85,0,0.05) 100%)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {/* Summary Top Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 14px', borderRadius: 'var(--radius-full)', background: 'rgba(0, 85, 255, 0.12)', color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '10px' }}>
                  <span>🗺️</span> {t('mapTitle')}
                </div>
                <h3 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)', fontWeight: 800, margin: '0 0 6px', lineHeight: 1.3 }}>
                  Eje Estratégico: Guayas — Santa Elena
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', margin: 0, maxWidth: '780px', lineHeight: 1.5 }}>
                  {t('tourLocationsSummary')}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ background: 'var(--bg-card)', padding: '10px 16px', borderRadius: '12px', border: '1px solid rgba(0, 85, 255, 0.25)', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-primary)' }}>4 Muros</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Cantón Milagro</div>
                </div>
                <div style={{ background: 'var(--bg-card)', padding: '10px 16px', borderRadius: '12px', border: '1px solid rgba(255, 85, 0, 0.25)', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-accent)' }}>7 Muros</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Cantón La Libertad</div>
                </div>
              </div>
            </div>

            {/* Full-Width Optimized Map WebP Image Frame */}
            <div
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                boxShadow: '0 16px 36px rgba(0,0,0,0.18)',
                background: 'var(--bg-card)',
                width: '100%',
                padding: 'clamp(12px, 2.5vw, 24px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="/artivismo-img/ubicaciones-artivismo-Underlife-Graffiti-muralismo-ecuador-santa-elena-la-libertad-guayas-milagro.webp"
                alt="Mapa de ubicaciones de muralismo y graffiti de Artivismo Fundación Underlife en Milagro Guayas y La Libertad Santa Elena Ecuador"
                loading="lazy"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '520px',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  display: 'block',
                  borderRadius: '12px',
                  transition: 'transform 0.4s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  right: '28px',
                  padding: '4px 14px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(5, 5, 20, 0.85)',
                  backdropFilter: 'blur(8px)',
                  color: '#fff',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                📍 11 Muros Piloto
              </div>
            </div>

            {/* Centered CTA Action */}
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '8px' }}>
              <button
                onClick={() => handleOpenSponsorModal('mecenas')}
                className="btn btn-primary"
                style={{
                  padding: '16px 36px',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-full)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 28px rgba(0, 85, 255, 0.35)',
                  cursor: 'pointer',
                }}
              >
                {t('sponsorMuralBtn')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BENEFICIO FISCAL & DEDUCCIÓN TRIBUTARIA ESTIMADA (RSE & EMPRESAS) */}
      <section className="section" style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <span
                style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  background: 'rgba(0, 85, 255, 0.1)',
                  color: 'var(--color-primary)',
                  border: '1px solid rgba(0, 85, 255, 0.2)',
                  marginBottom: '12px',
                }}
              >
                {t('taxTag')}
              </span>
              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                  fontWeight: 800,
                  lineHeight: 1.2,
                  marginBottom: '16px',
                }}
              >
                {t('taxTitle')}{' '}
                <span className="gradient-text">{t('taxTitleAccent')}</span>
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>
                {t('taxDesc')}
              </p>

              {/* Disclaimer Sutil & Transparente */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  background: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  marginBottom: '24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span>⚖️</span>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--color-warning)' }}>
                    {t('taxDisclaimerTitle')}
                  </strong>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {t('taxDisclaimerText')}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleOpenSponsorModal('patrocinador')}
                  className="btn btn-primary"
                  style={{
                    padding: '12px 24px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--gradient-primary)',
                    color: '#fff',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: 'none',
                  }}
                >
                  {t('taxCta')}
                </button>
              </div>
            </div>

            {/* Simulación Matemática de Ahorro */}
            <div>
              <div
                className="glass-card"
                style={{
                  padding: '30px',
                  borderRadius: '24px',
                  border: '1px solid var(--border-color-strong)',
                  background: 'var(--bg-card)',
                  boxShadow: 'var(--glass-shadow)',
                }}
              >
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>📊</span> {t('taxSimTitle')}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg-section-alt)', borderRadius: '10px', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{t('taxSimDonated')}</span>
                    <strong>USD $1.000,00</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg-section-alt)', borderRadius: '10px', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{t('taxSimBase')}</span>
                    <strong style={{ color: 'var(--color-primary)' }}>USD $2.500,00</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '10px', fontSize: '0.9rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{t('taxSimSaved')}</span>
                    <strong style={{ color: 'var(--color-success)' }}>USD $625,00 (62,5%)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg-section-alt)', borderRadius: '10px', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{t('taxSimNet')}</span>
                    <strong style={{ color: 'var(--color-accent)' }}>Solo USD $375,00 (37,5%)</strong>
                  </div>
                </div>

                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, textAlign: 'center' }}>
                  {t('taxSimNote')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LAS 3 VÍAS DE PARTICIPACIÓN: PATROCINADOR, AUSPICIANTE Y MECENAS */}
      <section className="section" style={{ padding: '80px 0', background: 'var(--bg-section-alt)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 700,
                background: 'rgba(0, 85, 255, 0.1)',
                color: 'var(--color-primary)',
                border: '1px solid rgba(0, 85, 255, 0.2)',
                marginBottom: '12px',
              }}
            >
              {t('tiersTag')}
            </span>
            <h2 className="section-title">
              {t('tiersTitle')}{' '}
              <span className="gradient-text">{t('tiersTitleAccent')}</span>
            </h2>
            <p className="section-subtitle">
              {t('tiersSubtitle')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
            {/* TIER 1: PATROCINADOR */}
            <div
              className="glass-card"
              style={{
                padding: '32px',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '2px solid var(--color-primary-light)',
                position: 'relative',
              }}
            >
              <div>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🏢</div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px', color: 'var(--color-primary)' }}>
                  {t('tier1Title')}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {t('tier1Desc')}
                </p>

                <ul style={{ paddingLeft: '18px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
                  <li>{t('tier1F1')}</li>
                  <li>{t('tier1F2')}</li>
                  <li>{t('tier1F3')}</li>
                  <li>{t('tier1F4')}</li>
                </ul>
              </div>

              <button
                onClick={() => handleOpenSponsorModal('patrocinador')}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--gradient-primary)',
                  color: '#fff',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {t('tier1Cta')}
              </button>
            </div>

            {/* TIER 2: AUSPICIANTE EN ESPECIE */}
            <div
              className="glass-card"
              style={{
                padding: '32px',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '2px solid var(--color-accent)',
                position: 'relative',
              }}
            >
              <div>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🤝</div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px', color: 'var(--color-accent)' }}>
                  {t('tier2Title')}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {t('tier2Desc')}
                </p>

                <ul style={{ paddingLeft: '18px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
                  <li>{t('tier2F1')}</li>
                  <li>{t('tier2F2')}</li>
                  <li>{t('tier2F3')}</li>
                  <li>{t('tier2F4')}</li>
                </ul>
              </div>

              <button
                onClick={() => handleOpenSponsorModal('auspiciante')}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--gradient-accent)',
                  color: '#fff',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {t('tier2Cta')}
              </button>
            </div>

            {/* TIER 3: MECENAS INDIVIDUAL (Apoyo voluntario y desinteresado) */}
            <div
              className="glass-card"
              style={{
                padding: '32px',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '2px solid var(--color-teal)',
                position: 'relative',
              }}
            >
              <div>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>❤️</div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px', color: 'var(--color-teal)' }}>
                  {t('tier3Title')}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {t('tier3Desc')}
                </p>

                <ul style={{ paddingLeft: '18px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
                  <li>{t('tier3F1')}</li>
                  <li>{t('tier3F2')}</li>
                  <li>{t('tier3F3')}</li>
                  <li>{t('tier3F4')}</li>
                </ul>
              </div>

              <button
                onClick={() => handleOpenSponsorModal('mecenas')}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, #26b49c 0%, #0055FF 100%)',
                  color: '#fff',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {t('tier3Cta')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONVOCATORIA ARTISTAS (OPTIMIZED IMAGE & PRE-REGISTRO) */}
      <section className="section" style={{ padding: '80px 0' }}>
        <div className="container">
          <div
            className="glass-card"
            style={{
              padding: '40px',
              borderRadius: '28px',
              border: '1px solid var(--border-color-strong)',
              background: 'linear-gradient(135deg, rgba(255,85,0,0.06) 0%, rgba(0,85,255,0.06) 100%)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '36px',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span
                  style={{
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: 'rgba(255, 85, 0, 0.15)',
                    color: 'var(--color-accent)',
                    border: '1px solid rgba(255, 85, 0, 0.3)',
                  }}
                >
                  {t('artistsTag')}
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, marginBottom: '14px', lineHeight: 1.25 }}>
                {t('artistsTitle')} <br />
                <span className="gradient-text">{t('artistsTitleAccent')}</span>
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>
                {t('artistsDesc')}
              </p>
              <button
                onClick={() => setArtistModalOpen(true)}
                className="btn btn-primary"
                style={{
                  padding: '12px 28px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--gradient-accent)',
                  color: '#fff',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>{t('artistsCta')}</span>
              </button>
            </div>

            {/* ARTIST & COMMUNITY OPTIMIZED IMAGE CONTAINER */}
            <div
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                height: '300px',
              }}
            >
              <img
                src="/artivismo-img/muralistas_strokes_together.webp"
                alt="Muralistas y grafiteros en alianza con Strokes Together y Fundación Underlife trabajando en muros comunitarios"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transition: 'transform 0.4s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '20px 16px 12px',
                  background: 'linear-gradient(180deg, transparent 0%, rgba(5, 5, 20, 0.85) 100%)',
                  color: '#fff',
                }}
              >
                <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>
                  {t('imgArtistasTitle')}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>
                  {t('imgArtistasDesc')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TRANSPARENCIA & GOBERNANZA */}
      <section className="section section-dark" style={{ padding: '60px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '36px', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '10px' }}>
                {t('govTitle')}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {t('govDesc')}
              </p>
            </div>

            {/* TRANSPARENCIA OPTIMIZED IMAGE */}
            <div
              style={{
                position: 'relative',
                borderRadius: '18px',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                boxShadow: '0 10px 24px rgba(0,0,0,0.1)',
                height: '220px',
              }}
            >
              <img
                src="/artivismo-img/transparencia_entrega_comunidad.webp"
                alt="Gobernanza y entrega comunitaria de kits nutricionales e insumos en el territorio"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transition: 'transform 0.4s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '16px 14px 10px',
                  background: 'linear-gradient(180deg, transparent 0%, rgba(5, 5, 20, 0.85) 100%)',
                  color: '#fff',
                }}
              >
                <div style={{ fontSize: '0.84rem', fontWeight: 700 }}>
                  {t('imgTransparenciaTitle')}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)' }}>
                  {t('imgTransparenciaDesc')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <SponsorConversationalModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialRole={modalRole}
      />

      <ArtistPreRegistrationModal
        isOpen={artistModalOpen}
        onClose={() => setArtistModalOpen(false)}
      />
    </div>
  );
}

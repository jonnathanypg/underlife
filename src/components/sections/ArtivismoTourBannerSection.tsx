'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from '@/lib/LanguageContext';
import { SponsorConversationalModal, SponsorRole } from '@/components/sections/SponsorConversationalModal';

export default function ArtivismoTourBannerSection() {
  const t = useTranslations('artivismoBanner');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRole, setModalRole] = useState<SponsorRole>('patrocinador');

  const handleOpenModal = (role: SponsorRole) => {
    setModalRole(role);
    setModalOpen(true);
  };

  return (
    <section
      id="artivismo-tour"
      className="section"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '70px 0',
        background: 'linear-gradient(135deg, rgba(0, 85, 255, 0.06) 0%, rgba(255, 85, 0, 0.05) 100%)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div className="container">
        <div
          className="glass-card"
          style={{
            padding: '44px 36px',
            borderRadius: '28px',
            border: '1px solid var(--border-color-strong)',
            position: 'relative',
            overflow: 'hidden',
            background: 'var(--bg-card)',
          }}
        >
          {/* Subtle Dynamic Ambient Lighting */}
          <div
            style={{
              position: 'absolute',
              top: '-30%',
              right: '-15%',
              width: '480px',
              height: '480px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 85, 0, 0.12) 0%, rgba(0, 85, 255, 0.08) 100%)',
              filter: 'blur(70px)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div>
              {/* Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 14px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    background: 'var(--gradient-accent)',
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(255, 85, 0, 0.3)',
                  }}
                >
                  <span>{t('tag')}</span>
                </span>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    background: 'rgba(0, 85, 255, 0.1)',
                    color: 'var(--color-primary)',
                    border: '1px solid rgba(0, 85, 255, 0.2)',
                  }}
                >
                  {t('subtag')}
                </span>
              </div>

              {/* Main Headline */}
              <h2
                style={{
                  fontSize: 'clamp(1.9rem, 3.6vw, 2.6rem)',
                  fontWeight: 900,
                  lineHeight: 1.18,
                  marginBottom: '16px',
                  letterSpacing: '-0.02em',
                }}
              >
                {t('headline')}{' '}
                <span className="gradient-text">{t('headlineAccent')}</span>
              </h2>

              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '24px',
                }}
              >
                {t('body')}
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                <Link
                  href="/primeros-1000-dias"
                  className="btn btn-primary"
                  style={{
                    padding: '14px 28px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--gradient-primary)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 6px 20px rgba(0, 85, 255, 0.28)',
                  }}
                >
                  <span>{t('ctaFestival')}</span>
                </Link>

                <button
                  onClick={() => handleOpenModal('patrocinador')}
                  className="btn"
                  style={{
                    padding: '14px 24px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--bg-section-alt)',
                    border: '1px solid var(--border-color-strong)',
                    color: 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>{t('ctaSponsor')}</span>
                </button>
              </div>
            </div>

            {/* Visual Value Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div
                style={{
                  background: 'var(--bg-section-alt)',
                  padding: '20px',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ fontSize: '1.9rem', fontWeight: 900, color: 'var(--color-accent)', marginBottom: '4px' }}>
                  {t('statMuralsNum')}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '4px' }}>
                  {t('statMuralsTitle')}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {t('statMuralsDesc')}
                </div>
              </div>

              <div
                style={{
                  background: 'var(--bg-section-alt)',
                  padding: '20px',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ fontSize: '1.9rem', fontWeight: 900, color: 'var(--color-primary)', marginBottom: '4px' }}>
                  Ecuador
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '4px' }}>
                  {t('statTourTitle')}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {t('statTourDesc')}
                </div>
              </div>

              <div
                style={{
                  background: 'var(--bg-section-alt)',
                  padding: '20px',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ fontSize: '1.9rem', fontWeight: 900, color: 'var(--color-teal)', marginBottom: '4px' }}>
                  100%
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '4px' }}>
                  {t('statSocialTitle')}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {t('statSocialDesc')}
                </div>
              </div>

              <div
                style={{
                  background: 'var(--bg-section-alt)',
                  padding: '20px',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#a855f7', marginBottom: '4px' }}>
                  150%
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '4px' }}>
                  {t('statTaxTitle')}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {t('statTaxDesc')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SponsorConversationalModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialRole={modalRole}
      />
    </section>
  );
}

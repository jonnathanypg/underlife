'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SponsorConversationalModal, SponsorRole } from '@/components/sections/SponsorConversationalModal';

export default function Primeros1000DiasBannerSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRole, setModalRole] = useState<SponsorRole>('patrocinador');

  const handleOpenModal = (role: SponsorRole) => {
    setModalRole(role);
    setModalOpen(true);
  };

  return (
    <section
      id="primeros-1000-dias"
      className="section"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '70px 0',
        background: 'linear-gradient(135deg, rgba(0, 85, 255, 0.05) 0%, rgba(255, 85, 0, 0.05) 100%)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div className="container">
        <div
          className="glass-card"
          style={{
            padding: '40px',
            borderRadius: '28px',
            border: '1px solid var(--border-color-strong)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Background Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-40%',
              right: '-20%',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0, 85, 255, 0.12) 0%, rgba(255, 85, 0, 0.06) 100%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px', alignItems: 'center', position: 'relative', zIndex: 2 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    background: 'rgba(0, 85, 255, 0.12)',
                    color: 'var(--color-primary)',
                    border: '1px solid rgba(0, 85, 255, 0.25)',
                  }}
                >
                  ⚡ INICIATIVA DE ACCIÓN SOCIAL 2026
                </span>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: 'rgba(16, 185, 129, 0.12)',
                    color: 'var(--color-success)',
                  }}
                >
                  11 Locaciones Piloto
                </span>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                  fontWeight: 900,
                  lineHeight: 1.2,
                  marginBottom: '16px',
                }}
              >
                Inversión Social & Muralismo: <br />
                <span className="gradient-text">Primeros 1.000 Días Underlife</span>
              </h2>

              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
                Transformamos 11 comunidades vulnerables en <strong>Milagro</strong> y <strong>La Libertad</strong> a través de arte urbano pedagógico y movilización de recursos 100% destinados a nutrición infantil y prevención de la DCI.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                <Link
                  href="/primeros-1000-dias"
                  className="btn btn-primary"
                  style={{
                    padding: '12px 26px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--gradient-primary)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span>Conocer Proyecto Completo & Muros →</span>
                </Link>

                <button
                  onClick={() => handleOpenModal('patrocinador')}
                  className="btn"
                  style={{
                    padding: '12px 22px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--bg-section-alt)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                  }}
                >
                  🏢 Sumarme como Sponsor
                </button>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div
                style={{
                  background: 'var(--bg-section-alt)',
                  padding: '20px',
                  borderRadius: '18px',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-primary)', marginBottom: '4px' }}>
                  11
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>
                  Muros Pedagógicos
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  En 2 ciudades costeras con jornadas de 2 a 3 días por sitio.
                </div>
              </div>

              <div
                style={{
                  background: 'var(--bg-section-alt)',
                  padding: '20px',
                  borderRadius: '18px',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-teal)', marginBottom: '4px' }}>
                  100%
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>
                  Autogestión Solidaria
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  El 100% de fondos y aportes se convierte en nutrición y estimulación.
                </div>
              </div>

              <div
                style={{
                  background: 'var(--bg-section-alt)',
                  padding: '20px',
                  borderRadius: '18px',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-accent)', marginBottom: '4px' }}>
                  150%
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>
                  Deducción Proyectada
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  Incentivo proyectado conforme a la LRTI (sujeto a código de resolución MDH).
                </div>
              </div>

              <div
                style={{
                  background: 'var(--bg-section-alt)',
                  padding: '20px',
                  borderRadius: '18px',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#a855f7', marginBottom: '4px' }}>
                  Anual
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>
                  Modelo Escalable
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  Proyección sostenida a múltiples ciudades del Ecuador.
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

'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from '@/lib/LanguageContext';

interface ArtistPreRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ArtistPreRegistrationModal({ isOpen, onClose }: ArtistPreRegistrationModalProps) {
  const t = useTranslations('artistModal');
  const [artistName, setArtistName] = useState('');
  const [tagArtistic, setTagArtistic] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [artStyle, setArtStyle] = useState('muralismo_realismo');
  const [crew, setCrew] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setIsSubmitting(false);
      setCountdown(4);
    }
  }, [isOpen]);

  // Auto-redirect timer after submission
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (submitted && isOpen) {
      if (countdown > 0) {
        timer = setTimeout(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
      } else {
        onClose();
        window.location.href = '/#donar';
      }
    }
    return () => clearTimeout(timer);
  }, [submitted, countdown, isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: artistName,
          email,
          phone: whatsapp,
          city: city || 'Ecuador',
          intention: 'volunteering',
          subject: `[Convocatoria Artistas 2026] Pre-registro: ${tagArtistic || artistName} (${city})`,
          subOption: `Estilo: ${artStyle} | Tag/Crew: ${tagArtistic} ${crew ? `(Crew: ${crew})` : ''}`,
          mode: 'Presencial (Festival 11 Locaciones)',
          availability: 'Tour Festival 2026',
          message: `
--- PRE-REGISTRO DE ARTISTA URBANO / GRAFFITI / MURALISMO ---
Nombre Real: ${artistName}
Tag / Nombre Artístico: ${tagArtistic}
Crew / Colectivo: ${crew || 'Independiente'}
Ciudad de Origen: ${city}
Estilo Principal: ${artStyle}
Portafolio / Instagram / Behance: ${portfolioLink || 'No provisto'}
WhatsApp: ${whatsapp}
Email: ${email}
          `.trim(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setCountdown(4);
      } else {
        alert('Hubo un error al registrar tu postulación previa. Intenta nuevamente.');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(5, 5, 20, 0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="glass-card"
        style={{
          background: 'var(--bg-body)',
          color: 'var(--text-primary)',
          borderRadius: 'var(--radius-lg, 24px)',
          border: '1px solid var(--border-color-strong, rgba(255,255,255,0.15))',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          width: '100%',
          maxWidth: '620px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'fadeInModal 0.25s ease-out',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-section-alt)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--color-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '1.1rem',
              }}
            >
              🎨
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>
                {t('title')}
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 600 }}>
                {t('subtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              lineHeight: 1,
              padding: '4px 8px',
              borderRadius: '8px',
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'rgba(255, 85, 0, 0.15)',
                  color: 'var(--color-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  margin: '0 auto 20px',
                }}
              >
                🔥
              </div>
              <h4 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px' }}>
                {t('thanksTitle')}
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 20px' }}>
                {t('thanksDesc')}
              </p>

              {/* Automatic Redirect Countdown Banner */}
              <div
                style={{
                  background: 'rgba(255, 85, 0, 0.08)',
                  border: '1px solid rgba(255, 85, 0, 0.25)',
                  borderRadius: '14px',
                  padding: '14px 20px',
                  marginBottom: '24px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.9rem',
                  color: 'var(--color-accent)',
                  fontWeight: 600,
                }}
              >
                <span>⏳</span>
                <span>{t('redirectCountdown').replace('{sec}', countdown.toString())}</span>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="/#donar"
                  onClick={() => onClose()}
                  className="btn btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 26px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--gradient-accent)',
                    color: '#fff',
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 6px 18px rgba(255, 85, 0, 0.3)',
                  }}
                >
                  <span>{t('donateNowBtn')}</span>
                </a>
              </div>
            </div>
          ) : (
            <div>
              {/* Notice Banner */}
              <div
                style={{
                  padding: '14px 16px',
                  borderRadius: '14px',
                  background: 'rgba(255, 85, 0, 0.08)',
                  border: '1px solid rgba(255, 85, 0, 0.2)',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '1.2rem' }}>⚠️</span>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--color-accent)' }}>
                    {t('noticeTitle')}
                  </strong>
                </div>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {t('noticeText')}
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                      {t('realNameLabel')}
                    </label>
                    <input
                      type="text"
                      required
                      value={artistName}
                      onChange={(e) => setArtistName(e.target.value)}
                      placeholder={t('realNamePlaceholder')}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-section-alt)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                      {t('tagLabel')}
                    </label>
                    <input
                      type="text"
                      required
                      value={tagArtistic}
                      onChange={(e) => setTagArtistic(e.target.value)}
                      placeholder={t('tagPlaceholder')}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-section-alt)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                      {t('crewLabel')}
                    </label>
                    <input
                      type="text"
                      value={crew}
                      onChange={(e) => setCrew(e.target.value)}
                      placeholder={t('crewPlaceholder')}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-section-alt)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                      {t('cityLabel')}
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder={t('cityPlaceholder')}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-section-alt)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                      {t('whatsappLabel')}
                    </label>
                    <input
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="+593 9..."
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-section-alt)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                      {t('emailLabel')}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="artista@ejemplo.com"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-section-alt)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                    {t('styleLabel')}
                  </label>
                  <select
                    value={artStyle}
                    onChange={(e) => setArtStyle(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-section-alt)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                    }}
                  >
                    <option value="muralismo_realismo">{t('styleRealism')}</option>
                    <option value="graffiti_wildstyle">{t('styleGraffiti')}</option>
                    <option value="ilustracion_popart">{t('styleIllustration')}</option>
                    <option value="abstracto_contemporaneo">{t('styleAbstract')}</option>
                    <option value="pedagogico_infantil">{t('stylePedagogical')}</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                    {t('portfolioLabel')}
                  </label>
                  <input
                    type="url"
                    required
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    placeholder={t('portfolioPlaceholder')}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-section-alt)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--gradient-accent)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    border: 'none',
                    marginTop: '8px',
                    boxShadow: '0 6px 18px rgba(255, 85, 0, 0.3)',
                  }}
                >
                  {isSubmitting ? t('submitting') : t('submitBtn')}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

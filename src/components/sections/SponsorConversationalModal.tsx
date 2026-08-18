'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from '@/lib/LanguageContext';

export type SponsorRole = 'patrocinador' | 'auspiciante' | 'mecenas';

interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: SponsorRole;
}

export function SponsorConversationalModal({ isOpen, onClose, initialRole = 'patrocinador' }: SponsorModalProps) {
  const t = useTranslations('sponsorModal');
  const [role, setRole] = useState<SponsorRole>(initialRole);
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(4);

  // Form State
  const [formData, setFormData] = useState({
    // General
    role: initialRole,
    name: '',
    organization: '',
    roleTitle: '',
    email: '',
    whatsapp: '',
    cityCountry: 'Ecuador',
    notes: '',

    // Patrocinador specific
    companySector: '',
    taxDeductionInterest: 'si',
    sponsorTier: 'muro_completo',
    estimatedBudget: '1000_2500',
    brandActivation: [] as string[],

    // Auspiciante specific
    supplyTypes: [] as string[],
    coverageLocation: 'ambas',
    supplyDetails: '',

    // Mecenas specific (defaults to voluntary & disinterested support)
    patronType: 'voluntario_desinteresado',
    paymentMethod: 'transferencia_ec',
    recurring: 'unico',
    patronAmount: '100',
  });

  useEffect(() => {
    if (isOpen) {
      setRole(initialRole);
      setFormData((prev) => ({
        ...prev,
        role: initialRole,
        patronType: initialRole === 'mecenas' ? 'voluntario_desinteresado' : prev.patronType,
      }));
      setStep(1);
      setSubmitted(false);
      setIsSubmitting(false);
      setCountdown(4);
    }
  }, [isOpen, initialRole]);

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

  const handleRoleSelect = (selectedRole: SponsorRole) => {
    setRole(selectedRole);
    setFormData((prev) => ({
      ...prev,
      role: selectedRole,
      patronType: selectedRole === 'mecenas' ? 'voluntario_desinteresado' : prev.patronType,
    }));
    setStep(2);
  };

  const handleCheckboxChange = (field: 'brandActivation' | 'supplyTypes', value: string) => {
    setFormData((prev) => {
      const current = prev[field];
      const exists = current.includes(value);
      return {
        ...prev,
        [field]: exists ? current.filter((item) => item !== value) : [...current, value],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send payload to contact API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.whatsapp,
          city: formData.cityCountry,
          intention: 'alliance',
          subject: `[Primeros 1.000 Días] Postulación como ${role.toUpperCase()} — ${formData.organization || formData.name}`,
          subOption: `Rol: ${role} | Presupuesto/Tipo: ${role === 'patrocinador' ? formData.estimatedBudget : role === 'auspiciante' ? formData.supplyTypes.join(', ') : formData.patronType + ' (' + formData.patronAmount + ' USD)'}`,
          mode: `Ubicación: ${formData.coverageLocation || 'Milagro/La Libertad'}`,
          availability: `Deducción Fiscal: ${formData.taxDeductionInterest}`,
          message: `
--- DETALLES DE LA POSTULACIÓN ---
Rol Seleccionado: ${role.toUpperCase()}
Organización/Empresa: ${formData.organization || 'Particular'}
Cargo del contacto: ${formData.roleTitle || 'N/A'}
Interés en Deducción 150% (MDH/SRI): ${formData.taxDeductionInterest}

${role === 'patrocinador' ? `
Sector: ${formData.companySector}
Rango Estimado: ${formData.estimatedBudget} USD
Activaciones deseadas: ${formData.brandActivation.join(', ') || 'General'}
` : ''}

${role === 'auspiciante' ? `
Insumos / Especies / Servicios: ${formData.supplyTypes.join(', ')}
Detalles de aporte: ${formData.supplyDetails}
Locación: ${formData.coverageLocation}
` : ''}

${role === 'mecenas' ? `
Modalidad de Mecenazgo: ${formData.patronType === 'voluntario_desinteresado' ? 'Apoyo voluntario y desinteresado' : formData.patronType}
Canal preferido: ${formData.paymentMethod}
Frecuencia: ${formData.recurring}
Aporte estimado: ${formData.patronAmount} USD
` : ''}

Comentarios adicionales:
${formData.notes || 'Ninguno'}
          `.trim(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setCountdown(4);
      } else {
        alert('Hubo un inconveniente al enviar la información. Por favor contáctanos directamente vía WhatsApp.');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión. Puedes contactarnos de inmediato por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `¡Hola Fundación Underlife! Me pongo en contacto desde la web del proyecto "Primeros 1.000 Días 2026". Quiero sumar apoyo como ${role.toUpperCase()} con ${formData.organization ? formData.organization : formData.name}. ¿Podemos agendar una reunión o coordinar detalles?`
  );

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
          maxWidth: '680px',
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
                background: 'var(--color-primary)',
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
                {submitted
                  ? t('thanksTitle')
                  : t('title')}
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {submitted
                  ? t('thanksDesc')
                  : `${t('step')} ${step} ${t('of')} 2 — ${role === 'patrocinador' ? t('roleSponsorLabel') : role === 'auspiciante' ? t('roleAuspicianteLabel') : t('roleMecenasLabel')}`}
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
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: 'var(--color-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  margin: '0 auto 20px',
                }}
              >
                ✓
              </div>
              <h4 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px' }}>
                {t('thanksTitle')}
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto 20px' }}>
                {t('thanksDesc')}
              </p>

              {/* Automatic Redirect Countdown Banner */}
              <div
                style={{
                  background: 'rgba(0, 85, 255, 0.08)',
                  border: '1px solid rgba(0, 85, 255, 0.25)',
                  borderRadius: '14px',
                  padding: '14px 20px',
                  marginBottom: '24px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.9rem',
                  color: 'var(--color-primary)',
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
                    padding: '12px 24px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--gradient-primary)',
                    color: '#fff',
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 6px 18px rgba(0, 85, 255, 0.3)',
                  }}
                >
                  <span>{t('donateNowBtn')}</span>
                </a>

                <a
                  href={`https://wa.me/593986020391?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 22px',
                    borderRadius: 'var(--radius-full)',
                    background: '#25D366',
                    color: '#fff',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  <span>{t('whatsappCta')}</span>
                </a>
              </div>
            </div>
          ) : step === 1 ? (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '6px' }}>
                  {t('step1RoleTitle')}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                  {t('step1RoleSubtitle')}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Option 1: Patrocinador */}
                <div
                  onClick={() => handleRoleSelect('patrocinador')}
                  style={{
                    padding: '18px 20px',
                    borderRadius: '16px',
                    border: role === 'patrocinador' ? '2px solid var(--color-primary)' : '1px solid var(--border-color)',
                    background: role === 'patrocinador' ? 'rgba(0, 85, 255, 0.06)' : 'var(--bg-section-alt)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ fontSize: '2rem' }}>🏢</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-primary)', marginBottom: '4px' }}>
                      {t('roleSponsorLabel')}
                    </div>
                    <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {t('roleSponsorDesc')}
                    </div>
                  </div>
                  <span style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>→</span>
                </div>

                {/* Option 2: Auspiciante */}
                <div
                  onClick={() => handleRoleSelect('auspiciante')}
                  style={{
                    padding: '18px 20px',
                    borderRadius: '16px',
                    border: role === 'auspiciante' ? '2px solid var(--color-accent)' : '1px solid var(--border-color)',
                    background: role === 'auspiciante' ? 'rgba(255, 85, 0, 0.06)' : 'var(--bg-section-alt)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ fontSize: '2rem' }}>🤝</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-accent)', marginBottom: '4px' }}>
                      {t('roleAuspicianteLabel')}
                    </div>
                    <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {t('roleAuspicianteDesc')}
                    </div>
                  </div>
                  <span style={{ fontSize: '1.2rem', color: 'var(--color-accent)' }}>→</span>
                </div>

                {/* Option 3: Mecenas */}
                <div
                  onClick={() => handleRoleSelect('mecenas')}
                  style={{
                    padding: '18px 20px',
                    borderRadius: '16px',
                    border: role === 'mecenas' ? '2px solid var(--color-teal)' : '1px solid var(--border-color)',
                    background: role === 'mecenas' ? 'rgba(38, 180, 156, 0.08)' : 'var(--bg-section-alt)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ fontSize: '2rem' }}>❤️</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-teal)', marginBottom: '4px' }}>
                      {t('roleMecenasLabel')}
                    </div>
                    <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {t('roleMecenasDesc')}
                    </div>
                  </div>
                  <span style={{ fontSize: '1.2rem', color: 'var(--color-teal)' }}>→</span>
                </div>
              </div>
            </div>
          ) : (
            /* STEP 2: DYNAMIC FORM BASED ON ROLE */
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: role === 'patrocinador' ? 'rgba(0,85,255,0.1)' : role === 'auspiciante' ? 'rgba(255,85,0,0.1)' : 'rgba(38,180,156,0.1)',
                    color: role === 'patrocinador' ? 'var(--color-primary)' : role === 'auspiciante' ? 'var(--color-accent)' : 'var(--color-teal)',
                  }}
                >
                  {role === 'patrocinador' ? t('roleSponsorLabel') : role === 'auspiciante' ? t('roleAuspicianteLabel') : t('roleMecenasLabel')}
                </span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  {t('backStep')}
                </button>
              </div>

              {/* General Contact Info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                    {t('nameLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('namePlaceholder')}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-section-alt)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                    {t('orgLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder={t('orgPlaceholder')}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
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
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                    {t('emailLabel')}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ejemplo@empresa.com"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-section-alt)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                    {t('whatsappLabel')}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="+593 9..."
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-section-alt)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
              </div>

              {/* SPECIFIC FIELDS FOR PATROCINADOR */}
              {role === 'patrocinador' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                        {t('budgetLabel')}
                      </label>
                      <select
                        value={formData.estimatedBudget}
                        onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: '1px solid var(--border-color)',
                          background: 'var(--bg-section-alt)',
                          color: 'var(--text-primary)',
                          fontSize: '0.9rem',
                        }}
                      >
                        <option value="500_1000">$500 - $1,000 USD (Co-patrocinio)</option>
                        <option value="1000_2500">$1,000 - $2,500 USD (Muro Completo)</option>
                        <option value="2500_5000">$2,500 - $5,000 USD (Circuito 2 Muros)</option>
                        <option value="mas_5000">Más de $5,000 USD (Sponsor Principal Tour)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                        {t('taxInterestLabel')}
                      </label>
                      <select
                        value={formData.taxDeductionInterest}
                        onChange={(e) => setFormData({ ...formData, taxDeductionInterest: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: '1px solid var(--border-color)',
                          background: 'var(--bg-section-alt)',
                          color: 'var(--text-primary)',
                          fontSize: '0.9rem',
                        }}
                      >
                        <option value="si">{t('taxYes')}</option>
                        <option value="no">{t('taxNo')}</option>
                      </select>
                    </div>
                  </div>

                  {formData.taxDeductionInterest === 'si' && (
                    <div
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        background: 'rgba(0, 85, 255, 0.08)',
                        border: '1px solid rgba(0, 85, 255, 0.2)',
                        fontSize: '0.8rem',
                        color: 'var(--color-primary)',
                        lineHeight: 1.4,
                      }}
                    >
                      {t('taxOptionDisclaimer')}
                    </div>
                  )}

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                      {t('brandActLabel')}
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.85rem' }}>
                      {[
                        { key: 'logo_mural', label: t('actMural') },
                        { key: 'streaming', label: t('actStreaming') },
                        { key: 'jornada', label: t('actCommunity') },
                        { key: 'informe_rse', label: t('actReport') },
                      ].map((item) => (
                        <label key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={formData.brandActivation.includes(item.key)}
                            onChange={() => handleCheckboxChange('brandActivation', item.key)}
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* SPECIFIC FIELDS FOR AUSPICIANTE */}
              {role === 'auspiciante' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                      {t('supplyLabel')}
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.85rem' }}>
                      {[
                        { key: 'pintura', label: t('supplyPaint') },
                        { key: 'andamios', label: t('supplyScaffold') },
                        { key: 'hospedaje', label: t('supplyLodging') },
                        { key: 'alimentacion', label: t('supplyFood') },
                        { key: 'transporte', label: t('supplyTransport') },
                        { key: 'otro', label: t('supplyOther') },
                      ].map((item) => (
                        <label key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={formData.supplyTypes.includes(item.key)}
                            onChange={() => handleCheckboxChange('supplyTypes', item.key)}
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                      {t('supplyDetailLabel')}
                    </label>
                    <textarea
                      rows={2}
                      value={formData.supplyDetails}
                      onChange={(e) => setFormData({ ...formData, supplyDetails: e.target.value })}
                      placeholder={t('supplyDetailPlaceholder')}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-section-alt)',
                        color: 'var(--text-primary)',
                        fontSize: '0.88rem',
                      }}
                    />
                  </div>
                </>
              )}

              {/* SPECIFIC FIELDS FOR MECENAS (Default: Apoyo voluntario y desinteresado) */}
              {role === 'mecenas' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                      {t('patronTypeLabel')}
                    </label>
                    <select
                      value={formData.patronType}
                      onChange={(e) => setFormData({ ...formData, patronType: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-section-alt)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                      }}
                    >
                      <option value="voluntario_desinteresado">
                        ✨ {t('patronTypeVoluntary')}
                      </option>
                      <option value="padrino_nutricional">
                        🍼 {t('patronTypeChild')}
                      </option>
                      <option value="padrino_muro">
                        🎨 {t('patronTypeWall')}
                      </option>
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                        {t('paymentPrefLabel')}
                      </label>
                      <select
                        value={formData.paymentMethod}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: '1px solid var(--border-color)',
                          background: 'var(--bg-section-alt)',
                          color: 'var(--text-primary)',
                          fontSize: '0.9rem',
                        }}
                      >
                        <option value="transferencia_ec">{t('payBank')}</option>
                        <option value="tarjeta">{t('payCard')}</option>
                        <option value="paypal">{t('payPaypal')}</option>
                        <option value="efectivo">{t('payCash')}</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                        {t('recurringLabel')}
                      </label>
                      <select
                        value={formData.recurring}
                        onChange={(e) => setFormData({ ...formData, recurring: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: '1px solid var(--border-color)',
                          background: 'var(--bg-section-alt)',
                          color: 'var(--text-primary)',
                          fontSize: '0.9rem',
                        }}
                      >
                        <option value="unico">{t('recOnce')}</option>
                        <option value="mensual">{t('recMonthly')}</option>
                      </select>
                    </div>
                  </div>

                  {formData.paymentMethod === 'efectivo' && (
                    <div
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        background: 'rgba(38, 180, 156, 0.1)',
                        border: '1px solid rgba(38, 180, 156, 0.25)',
                        fontSize: '0.82rem',
                        color: 'var(--color-teal)',
                        lineHeight: 1.4,
                      }}
                    >
                      {t('payCashNotice')}
                    </div>
                  )}
                </>
              )}

              {/* Notes / Message */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                  {t('notesLabel')}
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={t('notesPlaceholder')}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-section-alt)',
                    color: 'var(--text-primary)',
                    fontSize: '0.88rem',
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: 'var(--radius-full)',
                  background: role === 'patrocinador' ? 'var(--gradient-primary)' : role === 'auspiciante' ? 'var(--gradient-accent)' : 'linear-gradient(135deg, #26b49c 0%, #0055FF 100%)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  border: 'none',
                  marginTop: '8px',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
                }}
              >
                {isSubmitting ? t('submitting') : t('submitBtn')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

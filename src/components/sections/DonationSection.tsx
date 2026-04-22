'use client';

import { useTranslations } from 'next-intl';
import { useState, useRef, useCallback, useEffect } from 'react';

type DonorType = 'anonymous' | 'personal' | 'institutional';

export default function DonationSection() {
  const t = useTranslations('donation');
  const [amount, setAmount] = useState(20);
  const [donorType, setDonorType] = useState<DonorType>('personal');
  const [step, setStep] = useState<1 | 2>(1);
  const [paymentMethod, setPaymentMethod] = useState<'dlocal' | 'paypal'>('dlocal');
  const [country, setCountry] = useState<string | null>(null);
  const [showDLocal, setShowDLocal] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Map slider position to amount (1–9999 with eased distribution)
  const positionToAmount = useCallback((ratio: number) => {
    const min = 1;
    const max = 9999;
    // Exponential mapping so low values get more precision
    const value = min + (max - min) * Math.pow(ratio, 2.2);
    return Math.round(value);
  }, []);

  const amountToPosition = useCallback((amt: number) => {
    const min = 1;
    const max = 9999;
    return Math.pow((amt - min) / (max - min), 1 / 2.2);
  }, []);

  const updateFromPosition = useCallback(
    (clientX: number) => {
      const track = sliderRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      setAmount(positionToAmount(ratio));
    },
    [positionToAmount]
  );

  // Mouse / touch handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updateFromPosition(e.clientX);
    },
    [updateFromPosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      updateFromPosition(e.clientX);
    },
    [updateFromPosition]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Geolocation detection
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data.country_code) {
          const code = data.country_code;
          setCountry(code);
          
          // Official dLocal Go supported countries
          const supported = ['AR', 'BO', 'BR', 'CL', 'CO', 'CR', 'EC', 'GT', 'MX', 'PA', 'PE', 'UY', 'ID', 'MY', 'KE', 'NG'];
          const isSupported = supported.includes(code);
          
          setShowDLocal(isSupported);
          if (!isSupported) {
            setPaymentMethod('paypal');
          }
        }
      } catch (error) {
        console.error('Country detection failed:', error);
      }
    };
    detectCountry();
  }, []);

  const handleDonate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      amount,
      donorType,
      method: paymentMethod,
      email: formData.get('email'),
      phone: formData.get('phone'),
      firstName: formData.get('firstName') || 'Anónimo',
      lastName: formData.get('lastName'),
      documentId: formData.get('documentId'),
    };

    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Error al procesar donación');
      const result = await response.json();
      
      if (result.paymentUrl) {
        window.location.href = result.paymentUrl;
      }
    } catch (error) {
      alert('❌ Ocurrió un error. Verifica tus datos o intenta más tarde.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ratio = amountToPosition(amount);

  // Dynamic feedback message based on amount range
  const getSliderFeedback = () => {
    if (amount < 30) return t('slider.low');
    if (amount < 200) return t('slider.mid');
    return t('slider.high');
  };

  // Gradient color shifts from teal → accent as amount increases
  const gradientPosition = `${Math.round(ratio * 100)}%`;

  const donorTypes: { key: DonorType; icon: React.ReactNode }[] = [
    { 
      key: 'anonymous', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
      )
    },
    { 
      key: 'personal', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
    { 
      key: 'institutional', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
          <line x1="9" y1="22" x2="9" y2="18"></line>
          <line x1="15" y1="22" x2="15" y2="18"></line>
          <line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="4" y1="6" x2="20" y2="6"></line>
          <line x1="4" y1="10" x2="20" y2="10"></line>
        </svg>
      )
    },
  ];

  return (
    <section id="donar" className="section" style={{ overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: 740 }}>
        <div className="section-header">
          <h2 className="section-title">
            {t('headline')}{' '}
            <span className="gradient-text">{t('headlineAccent')}</span>
          </h2>
        </div>

        <div className="glass-card" style={{ padding: 'clamp(24px, 5vw, 48px)' }}>
          {step === 1 && (
            <>
              {/* === STEP 1: Amount + Donor Type === */}

              {/* Interactive Slider */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>$1</span>
                  <span
                    style={{
                      fontSize: 'clamp(2rem, 6vw, 3.2rem)',
                      fontWeight: 900,
                      background: `linear-gradient(90deg, var(--color-teal), var(--color-accent))`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    ${amount.toLocaleString()}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>$9,999</span>
                </div>

                {/* Slider Track */}
                <div
                  ref={sliderRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  style={{
                    position: 'relative',
                    height: 8,
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--border-color)',
                    cursor: 'pointer',
                    touchAction: 'none',
                    marginBottom: 8,
                  }}
                >
                  {/* Filled portion */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      height: '100%',
                      width: gradientPosition,
                      borderRadius: 'inherit',
                      background: 'linear-gradient(90deg, var(--color-teal), var(--color-accent))',
                      transition: isDragging.current ? 'none' : 'width 0.1s ease',
                    }}
                  />
                  {/* Thumb */}
                  <div
                    ref={thumbRef}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: gradientPosition,
                      transform: 'translate(-50%, -50%)',
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'var(--gradient-accent)',
                      boxShadow: '0 4px 16px var(--color-accent-glow)',
                      border: '3px solid #fff',
                      cursor: 'grab',
                      transition: isDragging.current ? 'none' : 'left 0.1s ease',
                    }}
                  />
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', marginTop: 8 }}>
                  {getSliderFeedback()}
                </p>
              </div>

              {/* Donor Type Selection */}
              <div style={{ marginBottom: 28 }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 10,
                  }}
                >
                  {donorTypes.map((dt) => (
                    <button
                      key={dt.key}
                      onClick={() => setDonorType(dt.key)}
                      style={{
                        padding: '16px 10px',
                        borderRadius: 'var(--radius-md)',
                        border: donorType === dt.key ? '2px solid var(--color-accent)' : '2px solid var(--border-color)',
                        background: donorType === dt.key ? 'rgba(255,85,0,0.08)' : 'transparent',
                        transition: 'all var(--duration-normal) var(--ease-out)',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '1.5rem', marginBottom: 6, color: donorType === dt.key ? 'var(--color-accent)' : 'var(--text-muted)' }}>
                        {dt.icon}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                        {t(`types.${dt.key}.label`)}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
                        {t(`types.${dt.key}.desc`)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => setStep(2)}
              >
                {t('next')}
              </button>
            </>
          )}

          {step === 2 && (
            <form onSubmit={handleDonate}>
              {/* === STEP 2: Form Fields + Payment === */}
              <button
                type="button"
                onClick={() => setStep(1)}
                style={{
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  marginBottom: 20,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {t('back')}
              </button>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 24,
                  padding: '12px 18px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,85,0,0.06)',
                  border: '1px solid rgba(255,85,0,0.15)',
                }}
              >
                <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>${amount.toLocaleString()}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  • {t(`types.${donorType}.label`)}
                </span>
              </div>

              {/* Dynamic Form Fields Based on Donor Type */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
                {/* Always: Contact Info */}
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="correo@ejemplo.com"
                  style={inputStyle}
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="+593 000 000 000"
                  style={inputStyle}
                />

                {/* Personal: Name + C.I. */}
                {donorType === 'personal' && (
                  <>
                    <input name="firstName" required type="text" placeholder="Nombre Completo" style={inputStyle} />
                    <input name="documentId" required type="text" placeholder="Cédula de Identidad (C.I.)" style={inputStyle} />
                  </>
                )}

                {/* Institutional: Company + RUC */}
                {donorType === 'institutional' && (
                  <>
                    <input name="firstName" required type="text" placeholder="Nombre de la Empresa" style={inputStyle} />
                    <input name="documentId" required type="text" placeholder="RUC / Tax ID" style={inputStyle} />
                  </>
                )}
              </div>

              {/* Payment Method */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: showDLocal ? '1fr 1fr' : '1fr', 
                gap: 10, 
                marginBottom: 20 
              }}>
                {showDLocal && (
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('dlocal')}
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      border: paymentMethod === 'dlocal' ? '2px solid var(--color-teal)' : '2px solid var(--border-color)',
                      background: paymentMethod === 'dlocal' ? 'rgba(38,180,156,0.08)' : 'transparent',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      color: 'var(--text-primary)',
                      transition: 'all var(--duration-fast)',
                    }}
                  >
                    💳 {country === 'EC' ? 'Tarjeta / Local (Ecuador)' : 'Tarjeta / Pago Local'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: paymentMethod === 'paypal' ? '2px solid #003087' : '2px solid var(--border-color)',
                    background: paymentMethod === 'paypal' ? 'rgba(0,48,135,0.06)' : 'transparent',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    color: 'var(--text-primary)',
                    transition: 'all var(--duration-fast)',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span>🅿️ PayPal</span>
                    <span style={{ fontSize: '0.65rem', opacity: 0.8, fontWeight: 400 }}>
                      Debito / Credito / Internacional
                    </span>
                  </div>
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1 }}
              >
                🔒 {isSubmitting ? 'Procesando...' : t('ctaPay')}
              </button>

              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                🛡️ {t('securityBadge')}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: 'var(--radius-md)',
  border: '2px solid var(--border-color)',
  background: 'transparent',
  fontFamily: 'var(--font-display)',
  fontSize: '0.95rem',
  color: 'var(--text-primary)',
  outline: 'none',
  transition: 'border-color var(--duration-fast)',
  boxSizing: 'border-box' as const,
};

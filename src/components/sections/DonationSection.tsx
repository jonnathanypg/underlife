'use client';

import { useTranslations } from '@/lib/LanguageContext';
import { useState, useRef, useCallback, useEffect } from 'react';

type DonorType = 'anonymous' | 'personal' | 'institutional';
type PaymentMethod = 'googlepay' | 'dlocal' | 'paypal';

export default function DonationSection() {
  const t = useTranslations('donation');
  const [amount, setAmount] = useState(50);
  const [donorType, setDonorType] = useState<DonorType>('personal');
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Selección de artículos, 2: Precompra / Método de pago, 3: Éxito / Postcompra
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('googlepay');
  const [country, setCountry] = useState<string | null>(null);
  const [showDLocal, setShowDLocal] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googlePayReady, setGooglePayReady] = useState(false);
  const [showGPayModal, setShowGPayModal] = useState(false);
  
  // Simulator mode for Google Pay Console approval screenshots
  const [simulatorMode, setSimulatorMode] = useState(false);
  const [simStep, setSimStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [successInfo, setSuccessInfo] = useState<{
    donationId: string;
    amount: number;
    provider: string;
    donorName?: string;
  } | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Check URL parameters for success returns or screenshot simulator mode
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      
      // 1. Live Payment Success Return
      if (params.get('success') === 'true') {
        setSuccessInfo({
          donationId: params.get('donationId') || `UL-GP-${Date.now().toString().slice(-6)}`,
          amount: parseFloat(params.get('amount') || '50') || 50,
          provider: params.get('provider') || 'googlepay',
        });
        setStep(3);
      }

      // 2. Ephemeral Simulator Mode for Google Pay Console Approval Screenshots
      if (
        params.get('gpay_flow') === 'true' ||
        params.get('gpay_sim') === 'true' ||
        params.get('gpay_preview') === 'true' ||
        params.has('gpay_step')
      ) {
        setSimulatorMode(true);
        const stepParam = params.get('gpay_step');
        if (stepParam === '1' || stepParam === 'seleccion') {
          setStep(1);
          setShowGPayModal(false);
          setSimStep(1);
        } else if (stepParam === '2' || stepParam === 'precompra') {
          setStep(2);
          setShowGPayModal(false);
          setSimStep(2);
        } else if (stepParam === '3' || stepParam === 'metodo') {
          setStep(2);
          setPaymentMethod('googlepay');
          setShowGPayModal(false);
          setSimStep(3);
        } else if (stepParam === '4' || stepParam === 'api') {
          setStep(2);
          setPaymentMethod('googlepay');
          setShowGPayModal(true);
          setSimStep(4);
        } else if (stepParam === '5' || stepParam === 'postcompra') {
          setSuccessInfo({
            donationId: 'UL-GP-849201',
            amount: amount || 50,
            provider: 'googlepay',
            donorName: 'Donante Solidario',
          });
          setStep(3);
          setShowGPayModal(false);
          setSimStep(5);
        }
      }
    }
  }, [amount]);

  // Map slider position to amount (1–9999 with eased distribution)
  const positionToAmount = useCallback((ratio: number) => {
    const min = 1;
    const max = 9999;
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

  // Load Google Pay Web SDK on demand when Google Pay is selected
  useEffect(() => {
    if (typeof window !== 'undefined' && paymentMethod === 'googlepay' && !googlePayReady) {
      if ((window as any).google?.payments?.api) {
        setGooglePayReady(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://pay.google.com/gp/p/js/pay.js';
      script.async = true;
      script.onload = () => {
        try {
          if ((window as any).google?.payments?.api) {
            setGooglePayReady(true);
          }
        } catch {}
      };
      document.body.appendChild(script);
    }
  }, [paymentMethod, googlePayReady]);

  // Country detection
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const tzMap: Record<string, string> = {
        'America/Guayaquil': 'EC',
        'America/Galapagos': 'EC',
        'America/Bogota': 'CO',
        'America/Lima': 'PE',
        'America/Santiago': 'CL',
        'America/Buenos_Aires': 'AR',
        'America/Cordoba': 'AR',
        'America/Sao_Paulo': 'BR',
        'America/Bahia': 'BR',
        'America/Manaus': 'BR',
        'America/Mexico_City': 'MX',
        'America/Monterrey': 'MX',
        'America/Panama': 'PA',
        'America/Costa_Rica': 'CR',
        'America/Guatemala': 'GT',
        'America/Montevideo': 'UY',
        'America/La_Paz': 'BO',
      };
      const detected = tzMap[tz] || 'EC';
      setCountry(detected);
      const supported = ['AR','BO','BR','CL','CO','CR','EC','GT','MX','PA','PE','UY','ID','MY','KE','NG'];
      setShowDLocal(supported.includes(detected));
    } catch {}
  }, []);

  const processGooglePay = async (donationData: any) => {
    try {
      const google = (window as any).google;
      if (!google?.payments?.api) {
        throw new Error('Google Pay not loaded');
      }

      const paymentsClient = new google.payments.api.PaymentsClient({
        environment: process.env.NEXT_PUBLIC_GOOGLE_PAY_ENV === 'PRODUCTION' ? 'PRODUCTION' : 'TEST',
      });

      const paymentDataRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ['MASTERCARD', 'VISA', 'AMEX', 'DISCOVER'],
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                gateway: 'stripe',
                'stripe:publishableKey': process.env.NEXT_PUBLIC_STRIPE_KEY || 'pk_live_underlife',
                'stripe:version': '2020-08-27',
              },
            },
          },
        ],
        merchantInfo: {
          merchantId: process.env.NEXT_PUBLIC_GOOGLE_PAY_MERCHANT_ID || 'BCR2DN6D3K6JF2JW',
          merchantName: 'Fundación Underlife',
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPrice: amount.toFixed(2),
          currencyCode: 'USD',
          countryCode: 'EC',
        },
      };

      const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest);
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...donationData,
          paymentToken: paymentData.paymentMethodData?.tokenizationData?.token,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSuccessInfo({
          donationId: result.donationId || `UL-GP-${Date.now().toString().slice(-6)}`,
          amount,
          provider: 'googlepay',
        });
        setStep(3);
      }
    } catch (err: any) {
      if (err?.statusCode === 'CANCELED') {
        setIsSubmitting(false);
        return;
      }
      console.warn('Google Pay redirecting to direct checkout fallback:', err);
      window.location.href = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=info@fundacionunderlife.org&currency_code=USD&amount=${amount}&item_name=Donacion+Fundacion+Underlife&no_shipping=1`;
    }
  };

  const handleDonate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const emailVal = formData.get('email')?.toString().trim();
    const data = {
      amount,
      donorType,
      method: paymentMethod,
      email: emailVal || (donorType === 'anonymous' ? 'anonimo@fundacionunderlife.org' : ''),
      phone: formData.get('phone')?.toString().trim() || '',
      firstName: formData.get('firstName')?.toString().trim() || (donorType === 'anonymous' ? 'Donante Anónimo' : 'Amigo de Underlife'),
      lastName: formData.get('lastName')?.toString().trim() || '',
      documentId: formData.get('documentId')?.toString().trim() || '',
    };

    if (paymentMethod === 'googlepay' && googlePayReady) {
      await processGooglePay(data);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (result.paymentUrl) {
        window.location.href = result.paymentUrl;
      } else {
        window.location.href = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=info@fundacionunderlife.org&currency_code=USD&amount=${amount}&item_name=Donacion+Fundacion+Underlife&no_shipping=1`;
      }
    } catch (error) {
      console.warn('Redirecting to direct payment gateway:', error);
      window.location.href = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=info@fundacionunderlife.org&currency_code=USD&amount=${amount}&item_name=Donacion+Fundacion+Underlife&no_shipping=1`;
    } finally {
      setIsSubmitting(false);
    }
  };

  const ratio = amountToPosition(amount);

  const getSliderFeedback = () => {
    if (amount < 30) return t('slider.low');
    if (amount < 200) return t('slider.mid');
    return t('slider.high');
  };

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

  const presetAmounts = [10, 25, 50, 100, 250, 500];

  return (
    <section id="donar" className="section" style={{ overflow: 'hidden', position: 'relative' }}>
      <div className="container" style={{ maxWidth: 740 }}>
        <div className="section-header">
          <h2 className="section-title">
            {t('headline')}{' '}
            <span className="gradient-text">{t('headlineAccent')}</span>
          </h2>
        </div>

        <div className="glass-card" style={{ padding: 'clamp(24px, 5vw, 48px)', position: 'relative' }}>
          
          {/* === STEP 1: Amount + Donor Type (Pantalla de Selección de Artículos) === */}
          {step === 1 && (
            <>
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>$1 USD</span>
                  <span
                    style={{
                      fontSize: 'clamp(2.2rem, 6vw, 3.4rem)',
                      fontWeight: 900,
                      background: `linear-gradient(90deg, var(--color-teal), var(--color-accent))`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    ${amount.toLocaleString()} USD
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>$9,999 USD</span>
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
                    marginBottom: 16,
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

                {/* Preset Amount Pills */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 16 }}>
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        border: amount === preset ? '1.5px solid var(--color-accent)' : '1px solid var(--border-color)',
                        background: amount === preset ? 'rgba(255,85,0,0.12)' : 'transparent',
                        color: amount === preset ? 'var(--color-accent)' : 'var(--text-secondary)',
                      }}
                    >
                      ${preset}
                    </button>
                  ))}
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textAlign: 'center', margin: '0 auto' }}>
                  {getSliderFeedback()}
                </p>
              </div>

              {/* Donor Type Selection */}
              <div style={{ marginBottom: 28 }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
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
                        cursor: 'pointer',
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
                {t('next')} →
              </button>
            </>
          )}

          {/* === STEP 2: Precompra / Formulario y Métodos de Pago === */}
          {step === 2 && (
            <form onSubmit={handleDonate}>
              <button
                type="button"
                onClick={() => setStep(1)}
                style={{
                  color: 'var(--color-primary)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  marginBottom: 20,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: 0,
                }}
              >
                ← {t('back')}
              </button>

              {/* Summary of Selection */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 24,
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,85,0,0.06)',
                  border: '1px solid rgba(255,85,0,0.18)',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Aporte a Donar
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                    ${amount.toLocaleString()} USD
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600, background: 'var(--border-color)', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}>
                    {t(`types.${donorType}.label`)}
                  </span>
                </div>
              </div>

              {/* Donor Details Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
                <input
                  name="email"
                  type="email"
                  required={donorType !== 'anonymous'}
                  defaultValue={donorType === 'personal' ? 'donante@ejemplo.com' : ''}
                  placeholder={donorType === 'anonymous' ? 'Correo electrónico (opcional para recibo)' : 'correo@ejemplo.com'}
                  style={inputStyle}
                />
                <input
                  name="phone"
                  type="tel"
                  defaultValue={donorType === 'personal' ? '+593 99 123 4567' : ''}
                  placeholder={donorType === 'anonymous' ? 'Teléfono (opcional)' : '+593 000 000 000'}
                  style={inputStyle}
                />

                {donorType === 'personal' && (
                  <>
                    <input name="firstName" required type="text" defaultValue="Carlos Mendoza" placeholder="Nombre Completo" style={inputStyle} />
                    <input name="documentId" required type="text" defaultValue="1718293847" placeholder="Cédula de Identidad (C.I.)" style={inputStyle} />
                  </>
                )}

                {donorType === 'institutional' && (
                  <>
                    <input name="firstName" required type="text" defaultValue="Innovación & Tecnología S.A." placeholder="Nombre de la Empresa" style={inputStyle} />
                    <input name="documentId" required type="text" defaultValue="1792837465001" placeholder="RUC / Tax ID" style={inputStyle} />
                  </>
                )}
              </div>

              {/* Payment Methods Selection */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 8, fontWeight: 600 }}>
                  Selecciona Método de Pago
                </label>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
                  gap: 10, 
                }}>
                  {/* 1. Google Pay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('googlepay')}
                    style={{
                      padding: '12px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: paymentMethod === 'googlepay' ? '2px solid #4285F4' : '2px solid var(--border-color)',
                      background: paymentMethod === 'googlepay' ? 'rgba(66, 133, 244, 0.1)' : 'transparent',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      transition: 'all var(--duration-fast)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      minHeight: 68,
                    }}
                  >
                    <GooglePayLogo height={20} />
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                      1-Clic • Billetera
                    </span>
                  </button>

                  {/* 2. dLocal Go (Tarjetas) */}
                  {showDLocal && (
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('dlocal')}
                      style={{
                        padding: '12px 10px',
                        borderRadius: 'var(--radius-md)',
                        border: paymentMethod === 'dlocal' ? '2px solid var(--color-teal)' : '2px solid var(--border-color)',
                        background: paymentMethod === 'dlocal' ? 'rgba(38,180,156,0.1)' : 'transparent',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        transition: 'all var(--duration-fast)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                        minHeight: 68,
                      }}
                    >
                      <span style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                        💳 <strong style={{ fontWeight: 800 }}>Tarjeta</strong>
                      </span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                        {country === 'EC' ? 'Débito / Crédito' : 'Pago Local'}
                      </span>
                    </button>
                  )}

                  {/* 3. PayPal */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    style={{
                      padding: '12px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: paymentMethod === 'paypal' ? '2px solid #003087' : '2px solid var(--border-color)',
                      background: paymentMethod === 'paypal' ? 'rgba(0,48,135,0.08)' : 'transparent',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      transition: 'all var(--duration-fast)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      minHeight: 68,
                    }}
                  >
                    <PayPalLogo height={20} />
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                      Internacional
                    </span>
                  </button>
                </div>
              </div>

              {/* Dynamic Submit CTA Button matching Official Brand Guidelines */}
              {paymentMethod === 'googlepay' ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    height: 50,
                    borderRadius: 8,
                    background: '#000000',
                    color: '#ffffff',
                    border: '1px solid #3c4043',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12,
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#1a1a1a')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#000000')}
                >
                  <span style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>Pagar con</span>
                  <GooglePayLogo height={22} isLight={true} />
                </button>
              ) : paymentMethod === 'paypal' ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    height: 50,
                    borderRadius: 8,
                    background: '#FFC439',
                    color: '#111111',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 14px rgba(255, 196, 57, 0.35)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f2ba36')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#FFC439')}
                >
                  <span style={{ fontSize: '0.95rem', color: '#111111', fontWeight: 700 }}>Donar con</span>
                  <PayPalLogo height={22} isLight={false} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    height: 50,
                    borderRadius: 8,
                    background: '#2A2D37',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    fontSize: '0.98rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#343844')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#2A2D37')}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                    <line x1="5" y1="15" x2="9" y2="15"></line>
                  </svg>
                  <span>{isSubmitting ? 'Procesando...' : 'Pagar con Tarjeta de Crédito / Débito'}</span>
                </button>
              )}

              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                🛡️ {t('securityBadge')}
              </p>
            </form>
          )}

          {/* === STEP 3: Postcompra / Confirmación de Donación === */}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'rgba(38, 180, 156, 0.15)',
                  color: 'var(--color-teal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  margin: '0 auto 20px',
                  border: '2px solid var(--color-teal)',
                }}
              >
                ✓
              </div>
              <h3 style={{ fontSize: '1.7rem', fontWeight: 900, marginBottom: 8, color: 'var(--text-primary)' }}>
                ¡Donación Completada con Éxito!
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
                Tu generosidad impulsa programas educativos y tecnológicos de alto impacto para romper el ciclo de la pobreza.
              </p>

              {/* Receipt Summary Card */}
              <div
                style={{
                  background: 'var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  textAlign: 'left',
                  marginBottom: 24,
                  border: '1px solid var(--glass-border)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Monto Donado:</span>
                  <strong style={{ color: 'var(--color-teal)', fontSize: '1.1rem' }}>
                    ${(successInfo?.amount || amount).toFixed(2)} USD
                  </strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>ID de Transacción:</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>
                    {successInfo?.donationId || 'UL-GP-20268492'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Método de Pago:</span>
                  <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {successInfo?.provider === 'paypal' ? <PayPalLogo height={16} /> : <GooglePayLogo height={16} />}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Estado:</span>
                  <span style={{ color: 'var(--color-teal)', fontWeight: 700 }}>Aprobado y Confirmado</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setSuccessInfo(null);
                  }}
                  className="btn btn-primary"
                  style={{ minWidth: 200, justifyContent: 'center' }}
                >
                  Realizar Otro Aporte 💝
                </button>
              </div>
            </div>
          )}

          {/* === MODAL SHEET DE PAGO DE LA API DE GOOGLE PAY (Simulador oficial para Capturas) === */}
          {showGPayModal && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(6px)',
                zIndex: 999999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 16,
              }}
              onClick={() => setShowGPayModal(false)}
            >
              <div
                style={{
                  width: '100%',
                  maxWidth: 420,
                  background: '#ffffff',
                  color: '#202124',
                  borderRadius: 16,
                  boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                  overflow: 'hidden',
                  fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #e8eaed', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <GooglePayLogo height={20} />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#5f6368', background: '#f1f3f4', padding: '3px 8px', borderRadius: 4 }}>
                    fundacionunderlife.org
                  </span>
                </div>

                {/* Account & Details */}
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#4285F4', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1rem' }}>
                      G
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#202124' }}>Cuenta de Google</div>
                      <div style={{ fontSize: '0.8rem', color: '#5f6368' }}>usuario.donante@gmail.com</div>
                    </div>
                  </div>

                  {/* Payment Card Section */}
                  <div style={{ padding: '12px 16px', background: '#f8f9fa', borderRadius: 10, border: '1px solid #dadce0', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: '1.2rem' }}>💳</span>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#202124' }}>Visa •••• 4242</div>
                        <div style={{ fontSize: '0.75rem', color: '#5f6368' }}>Tarjeta guardada</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#1a73e8', fontWeight: 600 }}>Cambiar</span>
                  </div>

                  {/* Donation Breakdown */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.85rem', color: '#5f6368' }}>
                      <span>Donación a Fundación Underlife</span>
                      <span>${amount.toFixed(2)} USD</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700, color: '#202124', borderTop: '1px dashed #dadce0', paddingTop: 8 }}>
                      <span>Total a pagar</span>
                      <span style={{ color: '#188038' }}>${amount.toFixed(2)} USD</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.7rem', color: '#5f6368', lineHeight: 1.4, marginBottom: 20 }}>
                    Al hacer clic en Pagar, autorizas a Fundación Underlife a procesar este pago con Google Pay conforme a las Condiciones de Servicio.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setShowGPayModal(false);
                      setSuccessInfo({
                        donationId: `UL-GP-${Date.now().toString().slice(-6)}`,
                        amount,
                        provider: 'googlepay',
                      });
                      setStep(3);
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: '#1a73e8',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 8,
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(26, 115, 232, 0.4)',
                    }}
                  >
                    Pagar ${amount.toFixed(2)} USD
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* === BARRA FLOTANTE PARA CAPTURAS GOOGLE PAY CONSOLE (Visible cuando ?gpay_flow=true) === */}
      {simulatorMode && (
        <aside
          aria-label="Panel de capturas Google Pay"
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            background: '#1a1a24',
            border: '2px solid var(--color-teal)',
            borderRadius: 14,
            padding: '12px 16px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
            zIndex: 9999999,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            maxWidth: 380,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-teal)' }}>
              📸 Capturas Google Pay Console
            </span>
            <button
              onClick={() => setSimulatorMode(false)}
              style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '0.8rem' }}
            >
              ✕
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4 }}>
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setShowGPayModal(false);
                setSimStep(1);
              }}
              style={{
                padding: '6px 4px',
                borderRadius: 6,
                fontSize: '0.7rem',
                fontWeight: simStep === 1 ? 800 : 500,
                background: simStep === 1 ? 'var(--color-teal)' : '#2a2a38',
                color: simStep === 1 ? '#000' : '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
              title="1. Selección de artículos"
            >
              1. Selección
            </button>
            <button
              type="button"
              onClick={() => {
                setStep(2);
                setShowGPayModal(false);
                setSimStep(2);
              }}
              style={{
                padding: '6px 4px',
                borderRadius: 6,
                fontSize: '0.7rem',
                fontWeight: simStep === 2 ? 800 : 500,
                background: simStep === 2 ? 'var(--color-teal)' : '#2a2a38',
                color: simStep === 2 ? '#000' : '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
              title="2. Pantalla de precompra"
            >
              2. Precompra
            </button>
            <button
              type="button"
              onClick={() => {
                setStep(2);
                setPaymentMethod('googlepay');
                setShowGPayModal(false);
                setSimStep(3);
              }}
              style={{
                padding: '6px 4px',
                borderRadius: 6,
                fontSize: '0.7rem',
                fontWeight: simStep === 3 ? 800 : 500,
                background: simStep === 3 ? 'var(--color-teal)' : '#2a2a38',
                color: simStep === 3 ? '#000' : '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
              title="3. Pantalla de método de pago"
            >
              3. Método
            </button>
            <button
              type="button"
              onClick={() => {
                setStep(2);
                setPaymentMethod('googlepay');
                setShowGPayModal(true);
                setSimStep(4);
              }}
              style={{
                padding: '6px 4px',
                borderRadius: 6,
                fontSize: '0.7rem',
                fontWeight: simStep === 4 ? 800 : 500,
                background: simStep === 4 ? 'var(--color-teal)' : '#2a2a38',
                color: simStep === 4 ? '#000' : '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
              title="4. Pantalla de pago de la API de Google Pay"
            >
              4. API Sheet
            </button>
            <button
              type="button"
              onClick={() => {
                setSuccessInfo({
                  donationId: 'UL-GP-849201',
                  amount: amount || 50,
                  provider: 'googlepay',
                  donorName: 'Donante Solidario',
                });
                setStep(3);
                setShowGPayModal(false);
                setSimStep(5);
              }}
              style={{
                padding: '6px 4px',
                borderRadius: 6,
                fontSize: '0.7rem',
                fontWeight: simStep === 5 ? 800 : 500,
                background: simStep === 5 ? 'var(--color-teal)' : '#2a2a38',
                color: simStep === 5 ? '#000' : '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
              title="5. Pantalla posterior a la compra"
            >
              5. Éxito
            </button>
          </div>
        </aside>
      )}
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

function GooglePayLogo({ height = 18, isLight = false }: { height?: number; isLight?: boolean }) {
  return (
    <svg
      height={height}
      viewBox="0 0 54 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle', maxWidth: '100%' }}
      aria-label="Google Pay"
    >
      <path
        d="M21.2 10.9V16.3H19.5V2.3H23.9C25 2.3 26 2.7 26.8 3.5C27.6 4.3 28 5.3 28 6.4C28 7.6 27.6 8.5 26.8 9.3C26 10.1 25.1 10.5 23.9 10.5H21.2V10.9ZM21.2 3.9V9.3H24C24.7 9.3 25.4 9 25.8 8.5C26.3 8 26.6 7.3 26.6 6.5C26.6 5.8 26.3 5.2 25.8 4.7C25.3 4.2 24.7 3.9 24 3.9H21.2Z"
        fill={isLight ? '#ffffff' : 'currentColor'}
      />
      <path
        d="M33.6 6.4C34.8 6.4 35.8 6.7 36.5 7.4C37.2 8.1 37.6 9 37.6 10.2V16.3H36V15.1H35.9C35.2 16.1 34.3 16.6 33.1 16.6C32.1 16.6 31.2 16.3 30.6 15.7C30 15.1 29.6 14.3 29.6 13.4C29.6 12.4 30 11.7 30.7 11.1C31.4 10.5 32.3 10.3 33.5 10.3C34.5 10.3 35.3 10.5 36 10.9V10.5C36 9.9 35.7 9.4 35.3 9C34.9 8.6 34.3 8.4 33.7 8.4C32.8 8.4 32 8.8 31.5 9.6L30.1 8.7C30.8 7.2 32 6.4 33.6 6.4ZM31.3 13.5C31.3 13.9 31.5 14.3 31.9 14.6C32.3 14.9 32.7 15.1 33.3 15.1C34 15.1 34.7 14.8 35.2 14.3C35.7 13.7 36 13.1 36 12.4C35.5 12 34.8 11.8 33.8 11.8C33 11.8 32.4 12 32 12.4C31.5 12.7 31.3 13.1 31.3 13.5Z"
        fill={isLight ? '#ffffff' : 'currentColor'}
      />
      <path
        d="M47.8 6.7L42.2 19.5H40.5L42.6 14.9L38.9 6.7H40.7L43.4 12.8H43.5L46.1 6.7H47.8Z"
        fill={isLight ? '#ffffff' : 'currentColor'}
      />
      <path
        d="M12.9 9.3C12.9 8.7 12.8 8.2 12.7 7.7H6.6V10.2H10.1C10 11 9.5 11.8 8.8 12.3V14.1H11.4C12.4 13.2 12.9 11.4 12.9 9.3Z"
        fill="#4285F4"
      />
      <path
        d="M6.6 15.7C8.4 15.7 9.9 15.1 11 14.1L8.8 12.3C8.2 12.7 7.5 12.9 6.6 12.9C4.8 12.9 3.3 11.7 2.8 10.1H0.1V12C1.2 14.2 3.7 15.7 6.6 15.7Z"
        fill="#34A853"
      />
      <path
        d="M2.8 10.1C2.5 9.3 2.5 8.4 2.8 7.6V5.7H0.1C-0.4 6.8 -0.4 8.9 0.1 10.1L2.8 10.1Z"
        fill="#FBBC04"
      />
      <path
        d="M6.6 4.8C7.6 4.8 8.5 5.2 9.2 5.8L11.1 3.9C9.9 2.8 8.3 2.2 6.6 2.2C3.7 2.2 1.2 3.7 0.1 5.9L2.8 7.8C3.3 6.1 4.8 4.8 6.6 4.8Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function PayPalLogo({ height = 20, isLight = false }: { height?: number; isLight?: boolean }) {
  return (
    <svg
      height={height}
      viewBox="0 0 102 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle', maxWidth: '100%' }}
      aria-label="PayPal"
    >
      {/* Official PayPal Monogram Double P */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.433 2.146C14.733 2.146 8.033 2.146 6.033 2.146C5.033 2.146 4.233 2.846 4.033 3.846L0.533 25.846C0.433 26.446 0.933 26.946 1.533 26.946H6.933C7.633 26.946 8.233 26.446 8.333 25.746L9.633 17.646C9.733 16.946 10.333 16.446 11.033 16.446H14.133C20.333 16.446 24.333 13.346 25.333 7.246C25.733 4.846 24.833 3.346 23.333 2.646C21.833 2.146 19.833 2.146 17.433 2.146Z"
        fill={isLight ? '#FFFFFF' : '#003087'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.733 9.046C20.033 13.346 17.033 15.746 12.433 15.746H9.933C9.433 15.746 8.933 16.146 8.833 16.646L7.433 25.746C7.333 26.346 7.833 26.846 8.433 26.846H12.633C13.233 26.846 13.733 26.446 13.833 25.846L14.933 18.946C15.033 18.446 15.433 18.046 16.033 18.046H17.333C22.433 18.046 25.733 15.446 26.533 10.446C26.933 8.146 26.433 6.446 25.033 5.446C24.433 7.146 22.933 8.546 20.733 9.046Z"
        fill={isLight ? '#00b2ff' : '#0079C1'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.733 9.046C20.333 9.146 19.833 9.246 19.333 9.246H14.133C13.633 9.246 13.233 9.646 13.133 10.146L11.833 18.246C11.733 18.746 12.133 19.146 12.633 19.146H15.733C19.933 19.146 22.833 17.046 23.533 12.846C23.933 10.846 23.333 9.646 22.133 9.146C21.733 9.046 21.233 9.046 20.733 9.046Z"
        fill={isLight ? '#0070ba' : '#00457C'}
      />
      {/* Official PayPal Wordmark Typography */}
      <text
        x="32"
        y="19"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="18"
        fontWeight="900"
        fontStyle="italic"
        letterSpacing="-0.5px"
        fill={isLight ? '#FFFFFF' : '#003087'}
      >
        Pay<tspan fill={isLight ? '#00b2ff' : '#0079C1'}>Pal</tspan>
      </text>
    </svg>
  );
}

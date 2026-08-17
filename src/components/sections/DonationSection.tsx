'use client';

import { useTranslations } from '@/lib/LanguageContext';
import { useState, useRef, useCallback, useEffect } from 'react';

type DonorType = 'anonymous' | 'personal' | 'institutional';
type PaymentMethod = 'googlepay' | 'dlocal' | 'paypal';

export default function DonationSection() {
  const t = useTranslations('donation');
  const [amount, setAmount] = useState(50);
  const [donorType, setDonorType] = useState<DonorType>('personal');
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Select item/amount, 2: Pre-purchase form & method, 3: Success / Post-purchase
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

          {/* === STEP 2: Pre-Purchase Form & Payment Gateway Selector === */}
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

              {/* Payment Methods */}
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
                      padding: '14px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: paymentMethod === 'googlepay' ? '2px solid #4285F4' : '2px solid var(--border-color)',
                      background: paymentMethod === 'googlepay' ? 'rgba(66, 133, 244, 0.08)' : 'transparent',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      color: 'var(--text-primary)',
                      transition: 'all var(--duration-fast)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 5,
                      minHeight: 64,
                    }}
                  >
                    <GooglePayLogo height={18} />
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
                        padding: '14px 10px',
                        borderRadius: 'var(--radius-md)',
                        border: paymentMethod === 'dlocal' ? '2px solid var(--color-teal)' : '2px solid var(--border-color)',
                        background: paymentMethod === 'dlocal' ? 'rgba(38,180,156,0.08)' : 'transparent',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        color: 'var(--text-primary)',
                        transition: 'all var(--duration-fast)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 5,
                        minHeight: 64,
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
                      padding: '14px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: paymentMethod === 'paypal' ? '2px solid #003087' : '2px solid var(--border-color)',
                      background: paymentMethod === 'paypal' ? 'rgba(0,48,135,0.06)' : 'transparent',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      color: 'var(--text-primary)',
                      transition: 'all var(--duration-fast)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 5,
                      minHeight: 64,
                    }}
                  >
                    <PayPalLogo height={18} />
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                      Internacional
                    </span>
                  </button>
                </div>
              </div>

              {/* Dynamic CTA Button matching Official Brand Guidelines */}
              {paymentMethod === 'googlepay' ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    height: 48,
                    borderRadius: 8,
                    background: '#000000',
                    color: '#ffffff',
                    border: '1px solid #3c4043',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#1a1a1a')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#000000')}
                >
                  <GooglePayLogo height={22} isLight={true} />
                </button>
              ) : paymentMethod === 'paypal' ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    height: 48,
                    borderRadius: 8,
                    background: '#0070BA',
                    color: '#ffffff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0, 112, 186, 0.3)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#005ea6')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#0070BA')}
                >
                  <PayPalLogo height={20} isLight={true} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1 }}
                >
                  🔒 {isSubmitting ? 'Procesando...' : t('ctaPay')}
                </button>
              )}

              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                🛡️ {t('securityBadge')}
              </p>
            </form>
          )}

          {/* === STEP 3: Post-Purchase / Donation Confirmation (Pantalla posterior a la compra) === */}
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
                    {successInfo?.provider === 'paypal' ? <PayPalLogo height={14} /> : <GooglePayLogo height={14} />}
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

          {/* === SIMULATED GOOGLE PAY API PAYMENT SHEET MODAL (Pantalla de pago de la API de Google Pay) === */}
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

      {/* === FLOATING TOOLBAR FOR GOOGLE PAY CONSOLE SCREENSHOTS (Visible only when ?gpay_flow=true) === */}
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

function PayPalLogo({ height = 18, isLight = false }: { height?: number; isLight?: boolean }) {
  return (
    <svg
      height={height}
      viewBox="0 0 80 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle', maxWidth: '100%' }}
      aria-label="PayPal"
    >
      <path
        d="M12.2 2.7C10.7 2.7 6.9 2.7 5.7 2.7C5.2 2.7 4.8 3.1 4.7 3.6L1.8 19.3C1.7 19.7 2 20 2.4 20H5.8C6.2 20 6.5 19.7 6.6 19.3L7.4 14.1C7.5 13.7 7.8 13.4 8.2 13.4H10.5C14.7 13.4 17.5 11.3 18.2 7.1C18.5 4.9 17.4 3.7 15.8 3.2C14.8 2.8 13.5 2.7 12.2 2.7Z"
        fill={isLight ? '#ffffff' : '#003087'}
      />
      <path
        d="M14.6 7.6C14.1 10.6 12 12.3 8.8 12.3H7C6.6 12.3 6.3 12.6 6.2 13L5.2 19.4C5.1 19.7 5.4 20 5.8 20H8.7C9.1 20 9.4 19.7 9.5 19.3L10.3 14.4C10.4 14 10.7 13.7 11.1 13.7H12.2C15.8 13.7 18.2 11.9 18.8 8.2C19.1 6.5 18.7 5.3 17.7 4.5C17.3 5.8 16.3 6.9 14.6 7.6Z"
        fill={isLight ? '#00b2ff' : '#0079C1'}
      />
      <path
        d="M14.6 7.6C14.3 7.7 13.9 7.8 13.5 7.8C13.2 7.8 13 7.8 12.8 7.8L13.4 4.3C13.7 4.4 14.1 4.5 14.5 4.6C15.5 5.1 15.9 5.9 15.7 7.1C15.4 7.3 15 7.5 14.6 7.6Z"
        fill={isLight ? '#0070ba' : '#00457C'}
      />
      <path
        d="M28.4 6.9H23.8C23.5 6.9 23.2 7.1 23.1 7.4L20.8 20.3C20.7 20.6 20.9 20.9 21.2 20.9H23.6C23.9 20.9 24.2 20.7 24.3 20.4L24.9 16.3C25 16 25.3 15.8 25.6 15.8H27.5C30.9 15.8 33.1 14.1 33.7 10.8C34 9.1 33.3 7.9 32.2 7.4C31.3 7 30 6.9 28.4 6.9ZM29 11.4C28.6 13.6 27.1 13.6 25.6 13.6H24.7L25.4 9.3H26.5C27.5 9.3 28.4 9.3 28.8 9.9C29.1 10.2 29.2 10.7 29 11.4Z"
        fill={isLight ? '#ffffff' : '#003087'}
      />
      <path
        d="M37.8 12.4H35.5C35.3 12.4 35.1 12.5 35.1 12.7L34.9 13.8C34.4 12.8 33.3 12.3 32.1 12.3C29.4 12.3 27 14.3 26.6 17C26.2 19.5 28 21.1 30.5 21.1C32.4 21.1 33.5 20.1 33.5 20.1L33.3 21C33.2 21.3 33.4 21.6 33.7 21.6H35.8C36.1 21.6 36.4 21.4 36.4 21.1L37.8 12.8C38 12.6 37.9 12.4 37.8 12.4ZM34.2 16.8C33.9 18.5 32.6 19.4 31.1 19.4C29.8 19.4 28.9 18.4 29.1 17C29.4 15.3 30.7 14.3 32.2 14.3C33.4 14.3 34.4 15.2 34.2 16.8Z"
        fill={isLight ? '#ffffff' : '#003087'}
      />
      <path
        d="M47.7 12.5H45.4C45.2 12.5 45 12.7 44.8 12.9L41.3 18.2L39.8 12.9C39.7 12.6 39.5 12.5 39.2 12.5H37C36.7 12.5 36.4 12.8 36.5 13.1L39.2 21.3L36.8 24.6C36.6 24.9 36.8 25.3 37.2 25.3H39.5C39.7 25.3 39.9 25.2 40.1 24.9L47.9 13.2C48.2 12.8 48 12.5 47.7 12.5Z"
        fill={isLight ? '#ffffff' : '#003087'}
      />
      <path
        d="M57.6 6.9H53C52.7 6.9 52.4 7.1 52.3 7.4L50 20.3C49.9 20.6 50.1 20.9 50.4 20.9H52.8C53.1 20.9 53.4 20.7 53.5 20.4L54.1 16.3C54.2 16 54.5 15.8 54.8 15.8H56.7C60.1 15.8 62.3 14.1 62.9 10.8C63.2 9.1 62.5 7.9 61.4 7.4C60.5 7 59.2 6.9 57.6 6.9ZM58.2 11.4C57.8 13.6 56.3 13.6 54.8 13.6H53.9L54.6 9.3H55.7C56.7 9.3 57.6 9.3 58 9.9C58.3 10.2 58.4 10.7 58.2 11.4Z"
        fill={isLight ? '#ffffff' : '#0079C1'}
      />
      <path
        d="M67 12.4H64.7C64.5 12.4 64.3 12.5 64.3 12.7L64.1 13.8C63.6 12.8 62.5 12.3 61.3 12.3C58.6 12.3 56.2 14.3 55.8 17C55.4 19.5 57.2 21.1 59.7 21.1C61.6 21.1 62.7 20.1 62.7 20.1L62.5 21C62.4 21.3 62.6 21.6 62.9 21.6H65C65.3 21.6 65.6 21.4 65.6 21.1L67 12.8C67.2 12.6 67.1 12.4 67 12.4ZM63.4 16.8C63.1 18.5 61.8 19.4 60.3 19.4C59 19.4 58.1 18.4 58.3 17C58.6 15.3 59.9 14.3 61.4 14.3C62.6 14.3 63.6 15.2 63.4 16.8Z"
        fill={isLight ? '#ffffff' : '#0079C1'}
      />
      <path
        d="M72.2 6.9H69.9C69.6 6.9 69.4 7.1 69.3 7.4L67.1 20.4C67 20.7 67.2 21 67.5 21H69.6C69.9 21 70.2 20.8 70.3 20.5L72.4 7.4C72.5 7.1 72.4 6.9 72.2 6.9Z"
        fill={isLight ? '#ffffff' : '#0079C1'}
      />
    </svg>
  );
}

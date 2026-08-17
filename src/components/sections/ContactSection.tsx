'use client';

import { useTranslations } from '@/lib/LanguageContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ContactSection() {
  const t = useTranslations('contact');
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [countdown, setCountdown] = useState(4);

  const subjects = ['info', 'donations', 'volunteering', 'alliances', 'other'] as const;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sentSuccess) {
      if (countdown > 0) {
        timer = setTimeout(() => {
          setCountdown((c) => c - 1);
        }, 1000);
      } else {
        router.push('/#donar');
      }
    }
    return () => clearTimeout(timer);
  }, [sentSuccess, countdown, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Error enviando el mensaje');
      
      setSentSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      alert('❌ Ocurrió un error. Por favor intenta de nuevo.');
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  const inputCSS: React.CSSProperties = {
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

  return (
    <section id="contacto" className="section section-dark">
      <div className="container" style={{ maxWidth: 640 }}>
        <div className="section-header">
          <h2 className="section-title">
            {t('headline')}{' '}
            <span className="gradient-text">{t('headlineAccent')}</span>
          </h2>
        </div>

        <div className="glass-card" style={{ padding: 'clamp(24px, 5vw, 40px)' }}>
          {sentSuccess ? (
            <div style={{ textAlign: 'center', padding: '20px 10px' }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  background: 'rgba(38, 180, 156, 0.15)',
                  color: 'var(--color-teal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  margin: '0 auto 20px',
                  border: '2px solid var(--color-teal)',
                }}
              >
                ✓
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 12 }}>
                ¡Mensaje recibido con éxito!
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 24 }}>
                Muchas gracias por ponerte en contacto con la Fundación Underlife. Nuestro equipo revisará tu mensaje y te responderá a la brevedad.
              </p>
              <div
                style={{
                  background: 'var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 16px',
                  marginBottom: 24,
                  fontSize: '0.85rem',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <span>⏳</span> Redirigiéndote a la sección de donaciones en{' '}
                <strong style={{ color: 'var(--color-accent)', fontSize: '1rem' }}>{countdown}</strong> segundos...
              </div>
              <Link
                href="/#donar"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Ir a Donar Ahora 💝
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input name="name" type="text" required placeholder={t('name')} style={inputCSS} />
              <input name="email" type="email" required placeholder={t('email')} style={inputCSS} />
              <label htmlFor="contact-subject" className="sr-only">
                {t('subject')}
              </label>
              <select id="contact-subject" name="subject" required style={{ ...inputCSS, cursor: 'pointer' }} defaultValue="" aria-label={t('subject')}>
                <option value="" disabled style={{ color: '#999' }}>
                  {t('subject')}...
                </option>
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {t(`subjects.${s}`)}
                  </option>
                ))}
              </select>
              <textarea
                name="message"
                required
                rows={4}
                placeholder={t('message')}
                style={{ ...inputCSS, resize: 'vertical' }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={sending}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  opacity: sending ? 0.7 : 1,
                }}
              >
                {sending ? (
                  <svg className="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18, marginRight: 8 }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18, marginRight: 8 }}>
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                )}
                {t('send')}
              </button>
              <style>{`
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                .spinner {
                  animation: spin 1s linear infinite;
                }
              `}</style>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

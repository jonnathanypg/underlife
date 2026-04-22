'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ContactSection() {
  const t = useTranslations('contact');
  const [sending, setSending] = useState(false);

  const subjects = ['info', 'donations', 'volunteering', 'alliances', 'other'] as const;

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
      
      alert('✅ Mensaje enviado exitosamente');
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
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <input name="name" type="text" required placeholder={t('name')} style={inputCSS} />
            <input name="email" type="email" required placeholder={t('email')} style={inputCSS} />
            <select name="subject" required style={{ ...inputCSS, cursor: 'pointer' }} defaultValue="">
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
            <style jsx>{`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              .spinner {
                animation: spin 1s linear infinite;
              }
            `}</style>
          </form>
        </div>
      </div>
    </section>
  );
}

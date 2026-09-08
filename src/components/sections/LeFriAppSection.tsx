'use client';

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function LeFriAppSection() {
  const { lang } = useLanguage();

  const content = {
    es: {
      tag: '⚖️ PROYECTO TECH & JUSTICIA DIGITAL',
      badge: 'IA & Acceso Universal',
      title: 'LeFriApp:',
      titleAccent: 'Justicia Constitucional y Defensa de Derechos al Alcance de Todos',
      description:
        'La principal causa por la cual se vulneran los derechos es no conocerlos. Como parte del ADN tecnológico de Fundación Underlife, desarrollamos LeFriApp: el ecosistema cívico con Inteligencia Artificial que traduce la Constitución y las leyes a un lenguaje humano, claro y libre de tecnicismos para empoderar a cada ciudadano.',
      feature1Title: 'Traducción Constitucional con IA',
      feature1Desc: 'Desglosa cada artículo y garantía legal en explicaciones cotidianas con ejemplos prácticos de la vida real.',
      feature2Title: 'Orientación Preventiva Gratuita',
      feature2Desc: 'Resuelve dudas laborales, familiares, de salud y derechos fundamentales sin barreras económicas ni burocracia.',
      feature3Title: 'Defensa y Acompañamiento',
      feature3Desc: 'Guías ciudadanas paso a paso para saber qué hacer ante vulneraciones de derechos y abuso de autoridad.',
      ctaPrimary: 'Explorar LeFriApp →',
      ctaSub: 'Plataforma oficial 100% gratuita y abierta al ciudadano',
      statUsers: '+400',
      statUsersLabel: 'Artículos Constitucionales Explicados',
      statFree: '100%',
      statFreeLabel: 'Lenguaje Ciudadano y Gratuito',
      domainLabel: 'lefri.fundacionunderlife.org',
    },
    en: {
      tag: '⚖️ TECH & DIGITAL JUSTICE INITIATIVE',
      badge: 'AI & Universal Access',
      title: 'LeFriApp:',
      titleAccent: 'Constitutional Justice and Rights Defense for Everyone',
      description:
        'The primary reason rights are violated is not knowing them. As part of Underlife Foundation’s technological DNA, we created LeFriApp: an AI-driven civic platform translating the Constitution and laws into plain, human-friendly language to empower every citizen.',
      feature1Title: 'Constitutional Translation with AI',
      feature1Desc: 'Breaks down every legal article and constitutional guarantee into practical, real-life examples.',
      feature2Title: 'Free Preventive Guidance',
      feature2Desc: 'Answers inquiries on labor, family, healthcare, and fundamental rights without financial or bureaucratic barriers.',
      feature3Title: 'Advocacy & Action Guides',
      feature3Desc: 'Step-by-step citizen guides providing clear direction when facing rights violations or abuse of authority.',
      ctaPrimary: 'Explore LeFriApp →',
      ctaSub: 'Official platform 100% free and open to all citizens',
      statUsers: '+400',
      statUsersLabel: 'Constitutional Articles Explained',
      statFree: '100%',
      statFreeLabel: 'Plain Language & Open Access',
      domainLabel: 'lefri.fundacionunderlife.org',
    },
    pt: {
      tag: '⚖️ PROJETO TECH & JUSTIÇA DIGITAL',
      badge: 'IA & Acesso Universal',
      title: 'LeFriApp:',
      titleAccent: 'Justiça Constitucional e Defesa de Direitos ao Alcance de Todos',
      description:
        'O principal motivo pelo qual direitos são violados é o desconhecimento. Como parte do DNA tecnológico da Fundação Underlife, desenvolvemos o LeFriApp: o ecossistema cívico com Inteligência Artificial que traduz a Constituição em linguagem simples, humana e clara.',
      feature1Title: 'Tradução Constitucional com IA',
      feature1Desc: 'Desdobra cada artigo e garantia legal em explicações práticas com exemplos cotidianos.',
      feature2Title: 'Orientação Preventiva Gratuita',
      feature2Desc: 'Esclarece dúvidas trabalhistas, familiares e de direitos fundamentais sem barreiras financeiras ou burocráticas.',
      feature3Title: 'Defesa e Guias Cívicos',
      feature3Desc: 'Instruções passo a passo para saber como agir diante de violações e abusos de autoridade.',
      ctaPrimary: 'Conhecer o LeFriApp →',
      ctaSub: 'Plataforma oficial 100% gratuita e aberta a todos',
      statUsers: '+400',
      statUsersLabel: 'Artigos Constitucionais Explicados',
      statFree: '100%',
      statFreeLabel: 'Linguagem Cidadã e Gratuita',
      domainLabel: 'lefri.fundacionunderlife.org',
    },
  };

  const t = content[lang] || content.es;

  return (
    <section
      id="lefriapp"
      className="section"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '90px 0',
        background: 'linear-gradient(180deg, var(--bg-section-alt) 0%, var(--bg-body) 100%)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      {/* Background Tech Glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 85, 255, 0.12) 0%, rgba(38, 180, 156, 0.08) 60%, transparent 80%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 85, 0, 0.08) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          className="glass-card"
          style={{
            padding: 'clamp(28px, 5vw, 56px)',
            borderRadius: '28px',
            border: '1px solid var(--border-color-strong)',
            background: 'var(--bg-card)',
            boxShadow: '0 20px 50px -15px rgba(0, 85, 255, 0.15)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            {/* Left Column: Details & Value Proposition */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    background: 'rgba(0, 85, 255, 0.12)',
                    color: 'var(--color-primary)',
                    border: '1px solid rgba(0, 85, 255, 0.25)',
                  }}
                >
                  {t.tag}
                </span>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: 'rgba(38, 180, 156, 0.15)',
                    color: 'var(--color-teal)',
                    border: '1px solid rgba(38, 180, 156, 0.3)',
                  }}
                >
                  {t.badge}
                </span>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
                  fontWeight: 900,
                  lineHeight: 1.18,
                  marginBottom: '20px',
                  letterSpacing: '-0.02em',
                }}
              >
                {t.title} <span className="gradient-text">{t.titleAccent}</span>
              </h2>

              <p
                style={{
                  fontSize: '1.02rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '32px',
                }}
              >
                {t.description}
              </p>

              {/* Feature Highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '36px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'rgba(0, 85, 255, 0.12)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      flexShrink: 0,
                    }}
                  >
                    🤖
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {t.feature1Title}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {t.feature1Desc}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'rgba(38, 180, 156, 0.15)',
                      color: 'var(--color-teal)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      flexShrink: 0,
                    }}
                  >
                    🛡️
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {t.feature2Title}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {t.feature2Desc}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'rgba(255, 85, 0, 0.12)',
                      color: 'var(--color-accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      flexShrink: 0,
                    }}
                  >
                    📖
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {t.feature3Title}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {t.feature3Desc}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Visual Interactive Mockup Card */}
            <div>
              <div
                style={{
                  borderRadius: '24px',
                  padding: 'clamp(20px, 3vw, 32px)',
                  background: 'linear-gradient(145deg, rgba(0, 85, 255, 0.08) 0%, rgba(38, 180, 156, 0.06) 100%)',
                  border: '1px solid var(--border-color-strong)',
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.15)',
                  position: 'relative',
                }}
              >
                {/* Mockup Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '16px',
                    borderBottom: '1px solid var(--border-color)',
                    marginBottom: '20px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
                  </div>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: 'var(--text-muted)',
                      fontFamily: 'monospace',
                    }}
                  >
                    https://lefri.fundacionunderlife.org
                  </span>
                </div>

                {/* Simulated LeFriApp Chat Query Card */}
                <div
                  style={{
                    background: 'var(--bg-card)',
                    borderRadius: '16px',
                    padding: '18px',
                    marginBottom: '16px',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.9rem' }}>👤</span>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      Consulta Ciudadana:
                    </strong>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)', fontStyle: 'italic' }}>
                    «¿Qué amparo tengo si en mi trabajo me exigen laborar horas extra sin previo aviso y sin pago?»
                  </p>
                </div>

                {/* Simulated LeFriApp AI Response Card */}
                <div
                  style={{
                    background: 'rgba(0, 85, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '20px',
                    marginBottom: '24px',
                    border: '1px solid rgba(0, 85, 255, 0.25)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: 'var(--color-primary)',
                        color: '#fff',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                      }}
                    >
                      LeFriApp AI
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-teal)', fontWeight: 600 }}>
                      ✓ Art. 33 & 326 Constitución del Ecuador
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                    El trabajo es un derecho y un deber social garantizado por el Estado. La jornada laboral extraordinaria debe ser de mutuo acuerdo y remunerada con los recargos de ley (50% o 100%). Nadie puede obligarte sin remuneración justa.
                  </p>
                </div>

                {/* Metrics inside card */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div
                    style={{
                      background: 'var(--bg-card)',
                      padding: '14px',
                      borderRadius: '14px',
                      border: '1px solid var(--border-color)',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--color-primary)' }}>
                      {t.statUsers}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      {t.statUsersLabel}
                    </div>
                  </div>

                  <div
                    style={{
                      background: 'var(--bg-card)',
                      padding: '14px',
                      borderRadius: '14px',
                      border: '1px solid var(--border-color)',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--color-teal)' }}>
                      {t.statFree}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      {t.statFreeLabel}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Link to subdominio moved below mac card */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '24px' }}>
                <a
                  href="https://lefri.fundacionunderlife.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{
                    padding: '16px 36px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--gradient-primary)',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '1.02rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 10px 30px rgba(0, 85, 255, 0.35)',
                    width: 'fit-content',
                  }}
                >
                  <span>{t.ctaPrimary}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: 18, height: 18 }}
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                  🌐 {t.ctaSub}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

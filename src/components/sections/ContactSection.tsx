'use client';

import { useLanguage, useTranslations } from '@/lib/LanguageContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Intention = 'volunteering' | 'donation' | 'alliance' | 'justice' | 'general';

interface FormDataState {
  intention: Intention;
  areaInterest: string;
  modality: string;
  organizationType: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  message: string;
}

export default function ContactSection() {
  const { lang } = useLanguage();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [sending, setSending] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const [formData, setFormData] = useState<FormDataState>({
    intention: 'volunteering',
    areaInterest: '',
    modality: '',
    organizationType: '',
    name: '',
    email: '',
    phone: '',
    city: '',
    message: '',
  });

  const texts = {
    es: {
      tag: 'CONVERSACIÓN DIRECTA',
      title: 'Conecta con',
      titleAccent: 'Underlife',
      subtitle: 'Selecciona cómo deseas interactuar y construyamos juntos un impacto real.',
      stepProgress: 'Paso',
      of: 'de 3',
      back: '← Anterior',
      continue: 'Continuar →',
      send: 'Enviar Mensaje',
      sending: 'Enviando información...',
      step1Title: '¿Cuál es el motivo principal de tu contacto?',
      step1Subtitle: 'Selecciona una opción para personalizar tu experiencia:',
      intentions: {
        volunteering: {
          title: 'Voluntariado & Talento Divergente',
          desc: 'Quiero sumar mis habilidades, tiempo, creatividad o mentoría técnica.',
          icon: '🤝',
        },
        donation: {
          title: 'Donaciones & Filantropía',
          desc: 'Quiero coordinar un aporte económico, recurrente o en especie.',
          icon: '💝',
        },
        alliance: {
          title: 'Alianzas Estratégicas & RSE',
          desc: 'Represento a una empresa, ONG o universidad para crear sinergias.',
          icon: '🏛️',
        },
        justice: {
          title: 'Justicia Digital & Apoyo Social',
          desc: 'Requiero orientación para un caso comunitario o vulnerabilidad infantil.',
          icon: '⚖️',
        },
        general: {
          title: 'Consulta General o Prensa',
          desc: 'Deseo conocer más sobre la fundación, proyectos o medios de difusión.',
          icon: '💬',
        },
      },
      step2Titles: {
        volunteering: '¿En qué área te gustaría colaborar principalmente?',
        donation: '¿Qué tipo de aporte deseas coordinar con la fundación?',
        alliance: '¿Qué tipo de institución representas?',
        justice: '¿Qué tipo de orientación o caso requieres?',
        general: '¿Sobre qué tema deseas comunicarte?',
      },
      volunteeringAreas: [
        { id: 'tech_ai', label: '💻 Tecnología, Programación o IA' },
        { id: 'art_hiphop', label: '🎨 Arte Urbano, Cultura Hip Hop y Música' },
        { id: 'childhood', label: '👶 Desarrollo Infantil & Centros CDI' },
        { id: 'mentorship', label: '📚 Mentoría y Talleres Comunitarios' },
        { id: 'media_comms', label: '📣 Fotografía, Redes y Comunicación' },
        { id: 'other_vol', label: '✨ Otras Habilidades / Apoyo Territorial' },
      ],
      modalities: [
        { id: 'in_person', label: 'Presencial (Milagro / Guayas)' },
        { id: 'remote', label: '100% Remoto / Digital' },
        { id: 'hybrid', label: 'Híbrido (Según proyecto)' },
      ],
      donationTypes: [
        { id: 'recurring', label: '💳 Donación Recurrente / Padrinazgo' },
        { id: 'corporate', label: '🏢 Aporte Empresarial / Proyecto Específico' },
        { id: 'equipment', label: '💻 Donación de Hardware o Equipos' },
        { id: 'nutrition', label: '🥣 Insumos para Centros Infantiles' },
        { id: 'other_don', label: '🎁 Otro tipo de Aporte Solidario' },
      ],
      allianceTypes: [
        { id: 'enterprise', label: '🏢 Empresa Privada / Corporativo' },
        { id: 'ngo_foundation', label: '🌐 Otra Fundación / ONG Internacional' },
        { id: 'academy', label: '🎓 Universidad / Institución Educativa' },
        { id: 'government', label: '🏛️ Sector Público o Cooperación' },
      ],
      step3Title: 'Tus datos de contacto',
      step3Subtitle: 'Para que nuestro equipo te responda de forma personalizada:',
      namePlaceholder: 'Nombre Completo *',
      emailPlaceholder: 'Correo Electrónico *',
      phonePlaceholder: 'Teléfono / WhatsApp (Ej: +593 98...)',
      cityPlaceholder: 'Ciudad / País (Ej: Milagro, Ecuador)',
      messagePlaceholder: 'Escribe tu mensaje, propuesta o detalles adicionales...',
      success: {
        received: '¡Mensaje recibido con éxito!',
        volunteeringMsg: '¡Bienvenido/a a la red de Talento Divergente! Nuestro equipo de coordinación revisará tu perfil y te contactará para sumarte a las iniciativas.',
        donationMsg: '¡Muchas gracias por tu compromiso con la infancia y la comunidad! Nos pondremos en contacto para coordinar los detalles de tu donación.',
        allianceMsg: '¡Gracias por apostar por la innovación social! Nuestro equipo de alianzas estratégicas revisará tu propuesta a la brevedad.',
        defaultMsg: 'Muchas gracias por ponerte en contacto con la Fundación Underlife. Responderemos a tu mensaje lo antes posible.',
        redirectNotice: 'Redirigiéndote a la sección de donaciones en',
        seconds: 'segundos...',
        btnDonate: 'Ir a Donar Ahora 💝',
        btnHome: 'Volver al Inicio',
      },
    },
    en: {
      tag: 'DIRECT CONVERSATION',
      title: 'Connect with',
      titleAccent: 'Underlife',
      subtitle: 'Select how you want to interact and let’s build real social impact together.',
      stepProgress: 'Step',
      of: 'of 3',
      back: '← Back',
      continue: 'Continue →',
      send: 'Send Message',
      sending: 'Sending information...',
      step1Title: 'What is the primary reason for your contact?',
      step1Subtitle: 'Choose an option to personalize your journey:',
      intentions: {
        volunteering: {
          title: 'Volunteering & Divergent Talent',
          desc: 'I want to contribute my skills, time, creativity, or tech mentorship.',
          icon: '🤝',
        },
        donation: {
          title: 'Donations & Philanthropy',
          desc: 'I want to coordinate a financial, recurring, or in-kind contribution.',
          icon: '💝',
        },
        alliance: {
          title: 'Strategic Alliances & CSR',
          desc: 'I represent a company, NGO, or university looking for synergy.',
          icon: '🏛️',
        },
        justice: {
          title: 'Digital Justice & Social Support',
          desc: 'I need guidance for a community case or child vulnerability issue.',
          icon: '⚖️',
        },
        general: {
          title: 'General Inquiry or Press',
          desc: 'I want to learn more about the foundation, projects, or press.',
          icon: '💬',
        },
      },
      step2Titles: {
        volunteering: 'Which area would you like to participate in primarily?',
        donation: 'What type of support would you like to coordinate?',
        alliance: 'What type of organization do you represent?',
        justice: 'What type of guidance or case do you require?',
        general: 'What topic would you like to discuss?',
      },
      volunteeringAreas: [
        { id: 'tech_ai', label: '💻 Technology, Software or AI' },
        { id: 'art_hiphop', label: '🎨 Urban Art, Hip Hop Culture & Music' },
        { id: 'childhood', label: '👶 Child Development & CDI Centers' },
        { id: 'mentorship', label: '📚 Community Mentorship & Workshops' },
        { id: 'media_comms', label: '📣 Media, Photography & Content' },
        { id: 'other_vol', label: '✨ Other Skills / Field Support' },
      ],
      modalities: [
        { id: 'in_person', label: 'On-site (Milagro / Guayas)' },
        { id: 'remote', label: '100% Remote / Digital' },
        { id: 'hybrid', label: 'Hybrid (Project based)' },
      ],
      donationTypes: [
        { id: 'recurring', label: '💳 Monthly / Recurring Donation' },
        { id: 'corporate', label: '🏢 Corporate CSR / Project Sponsorship' },
        { id: 'equipment', label: '💻 Hardware or Tech Equipment' },
        { id: 'nutrition', label: '🥣 Supplies for Childcare Centers' },
        { id: 'other_don', label: '🎁 Other Solidarity Contribution' },
      ],
      allianceTypes: [
        { id: 'enterprise', label: '🏢 Private Company / Corporate' },
        { id: 'ngo_foundation', label: '🌐 International NGO / Foundation' },
        { id: 'academy', label: '🎓 University / Academic Institution' },
        { id: 'government', label: '🏛️ Public Sector / Cooperation' },
      ],
      step3Title: 'Your Contact Details',
      step3Subtitle: 'So our team can get back to you with personalized attention:',
      namePlaceholder: 'Full Name *',
      emailPlaceholder: 'Email Address *',
      phonePlaceholder: 'Phone / WhatsApp (e.g. +593...)',
      cityPlaceholder: 'City / Country',
      messagePlaceholder: 'Write your message, proposal, or additional details...',
      success: {
        received: 'Message Received Successfully!',
        volunteeringMsg: 'Welcome to the Divergent Talent Network! Our coordination team will review your profile and connect you with active initiatives.',
        donationMsg: 'Thank you deeply for your commitment! We will get in touch to coordinate your donation.',
        allianceMsg: 'Thank you for believing in social innovation! Our strategic partnerships team will review your proposal promptly.',
        defaultMsg: 'Thank you for connecting with Underlife Foundation. We will respond as soon as possible.',
        redirectNotice: 'Redirecting to donations section in',
        seconds: 'seconds...',
        btnDonate: 'Donate Now 💝',
        btnHome: 'Back to Home',
      },
    },
    pt: {
      tag: 'CONVERSAÇÃO DIRETA',
      title: 'Conecte-se com a',
      titleAccent: 'Underlife',
      subtitle: 'Selecione como deseja interagir e vamos construir juntos um impacto real.',
      stepProgress: 'Passo',
      of: 'de 3',
      back: '← Anterior',
      continue: 'Continuar →',
      send: 'Enviar Mensagem',
      sending: 'Enviando informações...',
      step1Title: 'Qual é o principal motivo do seu contato?',
      step1Subtitle: 'Escolha uma opção para personalizar sua experiência:',
      intentions: {
        volunteering: {
          title: 'Voluntariado & Talento Divergente',
          desc: 'Quero somar minhas habilidades, tempo, criatividade ou mentoria.',
          icon: '🤝',
        },
        donation: {
          title: 'Doações & Filantropia',
          desc: 'Quero coordenar uma contribuição financeira, recorrente ou em espécie.',
          icon: '💝',
        },
        alliance: {
          title: 'Alianças Estratégicas & RSE',
          desc: 'Represento uma empresa, ONG ou universidade para criar sinergias.',
          icon: '🏛️',
        },
        justice: {
          title: 'Justiça Digital & Apoio Social',
          desc: 'Preciso de orientação para um caso comunitário ou vulnerabilidade infantil.',
          icon: '⚖️',
        },
        general: {
          title: 'Consulta Geral ou Imprensa',
          desc: 'Desejo saber mais sobre a fundação, projetos ou mídia.',
          icon: '💬',
        },
      },
      step2Titles: {
        volunteering: 'Em qual área você gostaria de atuar principalmente?',
        donation: 'Que tipo de apoio você deseja coordenar?',
        alliance: 'Que tipo de organização você representa?',
        justice: 'Que tipo de orientação ou caso você precisa?',
        general: 'Sobre qual assunto deseja conversar?',
      },
      volunteeringAreas: [
        { id: 'tech_ai', label: '💻 Tecnologia, Programação ou IA' },
        { id: 'art_hiphop', label: '🎨 Arte Urbana, Cultura Hip Hop e Música' },
        { id: 'childhood', label: '👶 Desenvolvimento Infantil & Centros CDI' },
        { id: 'mentorship', label: '📚 Mentoria e Oficinas Comunitárias' },
        { id: 'media_comms', label: '📣 Fotografia, Redes e Comunicação' },
        { id: 'other_vol', label: '✨ Outras Habilidades / Apoio Local' },
      ],
      modalities: [
        { id: 'in_person', label: 'Presencial (Milagro / Guayas)' },
        { id: 'remote', label: '100% Remoto / Digital' },
        { id: 'hybrid', label: 'Híbrido (Por projeto)' },
      ],
      donationTypes: [
        { id: 'recurring', label: '💳 Doação Mensal / Recorrente' },
        { id: 'corporate', label: '🏢 Aporte Empresarial / Patrocínio' },
        { id: 'equipment', label: '💻 Doação de Hardware ou Equipamentos' },
        { id: 'nutrition', label: '🥣 Insumos para Centros Infantis' },
        { id: 'other_don', label: '🎁 Outro tipo de Contribuição' },
      ],
      allianceTypes: [
        { id: 'enterprise', label: '🏢 Empresa Privada / Corporativo' },
        { id: 'ngo_foundation', label: '🌐 Outra Fundação / ONG Internacional' },
        { id: 'academy', label: '🎓 Universidade / Instituição de Ensino' },
        { id: 'government', label: '🏛️ Setor Público / Cooperação' },
      ],
      step3Title: 'Seus dados de contato',
      step3Subtitle: 'Para que nossa equipe responda de forma personalizada:',
      namePlaceholder: 'Nome Completo *',
      emailPlaceholder: 'E-mail *',
      phonePlaceholder: 'Telefone / WhatsApp (Ex: +593...)',
      cityPlaceholder: 'Cidade / País',
      messagePlaceholder: 'Escreva sua mensagem, proposta ou detalhes adicionais...',
      success: {
        received: 'Mensagem Recebida com Sucesso!',
        volunteeringMsg: 'Bem-vindo(a) à rede de Talento Divergente! Nossa equipe revisará seu perfil para integrá-lo(a) às iniciativas.',
        donationMsg: 'Muito obrigado pelo seu compromisso! Entraremos em contato para coordenar sua doação.',
        allianceMsg: 'Obrigado por acreditar na inovação social! Nossa equipe de parcerias analisará sua proposta em breve.',
        defaultMsg: 'Obrigado por se conectar com a Fundação Underlife. Responderemos o mais breve possível.',
        redirectNotice: 'Redirecionando para a seção de doações em',
        seconds: 'segundos...',
        btnDonate: 'Doar Agora 💝',
        btnHome: 'Voltar ao Início',
      },
    },
  }[lang] || {};

  // Auto redirect countdown on success step
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 4) {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      } else {
        router.push('/#donar');
      }
    }
    return () => clearTimeout(timer);
  }, [step, countdown, router]);

  const handleSelectIntention = (intention: Intention) => {
    setFormData((prev) => ({ ...prev, intention }));
    setStep(2);
  };

  const handleNextStep2 = (areaOrType: string) => {
    if (formData.intention === 'volunteering') {
      setFormData((prev) => ({ ...prev, areaInterest: areaOrType }));
    } else if (formData.intention === 'donation') {
      setFormData((prev) => ({ ...prev, areaInterest: areaOrType }));
    } else if (formData.intention === 'alliance') {
      setFormData((prev) => ({ ...prev, organizationType: areaOrType }));
    } else {
      setFormData((prev) => ({ ...prev, areaInterest: areaOrType }));
    }
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Por favor completa los campos requeridos (*)');
      return;
    }

    setSending(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          intention: formData.intention,
          subOption: formData.areaInterest || formData.organizationType,
          mode: formData.modality,
          message: formData.message,
        }),
      });

      if (!response.ok) throw new Error('Error al enviar mensaje');

      setStep(4);
    } catch (error) {
      console.error(error);
      alert('Hubo un problema al enviar tu información. Intenta de nuevo.');
    } finally {
      setSending(false);
    }
  };

  const progressPercentage = step === 1 ? 25 : step === 2 ? 60 : step === 3 ? 90 : 100;

  const cardStyle = (isSelected: boolean): React.CSSProperties => ({
    padding: '18px 20px',
    borderRadius: 'var(--radius-md)',
    border: isSelected ? '2px solid var(--color-primary)' : '2px solid var(--border-color)',
    background: isSelected ? 'rgba(0, 85, 255, 0.08)' : 'var(--bg-card)',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all var(--duration-fast) var(--ease-out)',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 16,
    width: '100%',
    boxSizing: 'border-box',
  });

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
    boxSizing: 'border-box',
    transition: 'border-color var(--duration-fast)',
  };

  return (
    <section id="contacto" className="section section-dark" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: 760 }}>
        
        {/* Section Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: 28 }}>
          <span className="section-tag">{texts.tag}</span>
          <h2 className="section-title">
            {texts.title} <span className="gradient-text">{texts.titleAccent}</span>
          </h2>
          <p className="section-subtitle" style={{ maxWidth: 580, margin: '8px auto 0' }}>
            {texts.subtitle}
          </p>
        </div>

        {/* Multi-step Conversational Card Container */}
        <div className="glass-card" style={{ padding: 'clamp(20px, 4vw, 40px)', position: 'relative' }}>
          
          {/* Progress Bar (Steps 1 to 3) */}
          {step < 4 && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                <span>{texts.stepProgress} {step} {texts.of}</span>
                <span>{progressPercentage}%</span>
              </div>
              <div style={{ width: '100%', height: 6, background: 'var(--border-color)', borderRadius: 10, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${progressPercentage}%`,
                    background: 'var(--gradient-primary)',
                    borderRadius: 10,
                    transition: 'width 0.35s ease',
                  }}
                />
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* PASO 1: Selección de Intención Principal                                  */}
          {/* ========================================================================= */}
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 6, color: 'var(--text-primary)' }}>
                {texts.step1Title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 20 }}>
                {texts.step1Subtitle}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {(['volunteering', 'donation', 'alliance', 'justice', 'general'] as const).map((key) => {
                  const item = texts.intentions[key];
                  const isSelected = formData.intention === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleSelectIntention(key)}
                      style={cardStyle(isSelected)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-primary)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = isSelected ? 'var(--color-primary)' : 'var(--border-color)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={{ fontSize: '1.8rem', lineHeight: 1, flexShrink: 0, marginTop: 2 }}>
                        {item.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '1.02rem', color: 'var(--text-primary)', marginBottom: 4 }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                          {item.desc}
                        </div>
                      </div>
                      <div style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '1.1rem', alignSelf: 'center' }}>
                        →
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* PASO 2: Preguntas de Descubrimiento & Precalificación Adaptativa         */}
          {/* ========================================================================= */}
          {step === 2 && (
            <div>
              <button
                type="button"
                onClick={() => setStep(1)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  marginBottom: 16,
                  padding: 0,
                }}
              >
                {texts.back}
              </button>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 8, color: 'var(--text-primary)' }}>
                {texts.step2Titles[formData.intention]}
              </h3>

              {/* Branch: Volunteering */}
              {formData.intention === 'volunteering' && (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10, marginBottom: 20 }}>
                    {texts.volunteeringAreas.map((area) => (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => handleNextStep2(area.label)}
                        style={{
                          ...cardStyle(formData.areaInterest === area.label),
                          padding: '14px 16px',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
                      >
                        <span style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                          {area.label}
                        </span>
                        <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>→</span>
                      </button>
                    ))}
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>
                      Modalidad de preferencia:
                    </label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {texts.modalities.map((mod) => (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, modality: mod.label }))}
                          style={{
                            padding: '8px 14px',
                            borderRadius: 'var(--radius-sm)',
                            border: formData.modality === mod.label ? '2px solid var(--color-teal)' : '1px solid var(--border-color)',
                            background: formData.modality === mod.label ? 'rgba(38,180,156,0.12)' : 'transparent',
                            color: 'var(--text-primary)',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {mod.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Branch: Donation */}
              {formData.intention === 'donation' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {texts.donationTypes.map((don) => (
                    <button
                      key={don.id}
                      type="button"
                      onClick={() => handleNextStep2(don.label)}
                      style={{
                        ...cardStyle(formData.areaInterest === don.label),
                        padding: '14px 16px',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
                    >
                      <span style={{ fontWeight: 600, fontSize: '0.94rem', color: 'var(--text-primary)' }}>
                        {don.label}
                      </span>
                      <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>→</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Branch: Alliance */}
              {formData.intention === 'alliance' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {texts.allianceTypes.map((org) => (
                    <button
                      key={org.id}
                      type="button"
                      onClick={() => handleNextStep2(org.label)}
                      style={{
                        ...cardStyle(formData.organizationType === org.label),
                        padding: '14px 16px',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
                    >
                      <span style={{ fontWeight: 600, fontSize: '0.94rem', color: 'var(--text-primary)' }}>
                        {org.label}
                      </span>
                      <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>→</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Branch: Justice or General */}
              {(formData.intention === 'justice' || formData.intention === 'general') && (
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                    {(formData.intention === 'justice'
                      ? [
                          '⚖️ Asesoría Legal Comunitaria / Derechos de la Infancia',
                          '🛡️ Protección ante Vulnerabilidad o Crisis Familiar',
                          '💻 Alfabetización & Acceso Tecnológico a la Justicia',
                          '🤝 Vinculación Territorial / Casos de Emergencia',
                        ]
                      : [
                          '🏫 Conocer Centros Infantiles CDI y Metodología',
                          '📊 Transparencia, Reportes y Rendición de Cuentas',
                          '🎤 Prensa, Medios de Difusión y Eventos',
                          '✨ Otra Consulta para la Dirección de la Fundación',
                        ]
                    ).map((topic, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleNextStep2(topic)}
                        style={{
                          ...cardStyle(formData.areaInterest === topic),
                          padding: '14px 16px',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
                      >
                        <span style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                          {topic}
                        </span>
                        <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>→</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* PASO 3: Datos de Contacto & Mensaje Detallado                             */}
          {/* ========================================================================= */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <button
                type="button"
                onClick={() => setStep(2)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  marginBottom: 16,
                  padding: 0,
                }}
              >
                {texts.back}
              </button>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 4, color: 'var(--text-primary)' }}>
                {texts.step3Title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 20 }}>
                {texts.step3Subtitle}
              </p>

              {/* Badge summarizing intention path */}
              <div
                style={{
                  background: 'rgba(0, 85, 255, 0.08)',
                  border: '1px solid rgba(0, 85, 255, 0.2)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 14px',
                  marginBottom: 20,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: 'var(--text-primary)',
                }}
              >
                <span>🎯</span>
                <span>
                  <strong>{texts.intentions[formData.intention]?.title}</strong>
                  {formData.areaInterest && ` • ${formData.areaInterest}`}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                  <input
                    type="text"
                    required
                    placeholder={texts.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    style={inputStyle}
                  />
                  <input
                    type="email"
                    required
                    placeholder={texts.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                  <input
                    type="tel"
                    placeholder={texts.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    placeholder={texts.cityPlaceholder}
                    value={formData.city}
                    onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
                    style={inputStyle}
                  />
                </div>

                <textarea
                  rows={4}
                  placeholder={texts.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />

                <button
                  type="submit"
                  disabled={sending}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    marginTop: 8,
                    opacity: sending ? 0.7 : 1,
                  }}
                >
                  {sending ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <svg
                        style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                      </svg>
                      {texts.sending}
                    </span>
                  ) : (
                    <span>{texts.send} 🚀</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ========================================================================= */}
          {/* PASO 4: Pantalla de Éxito & Redirección Inteligente                       */}
          {/* ========================================================================= */}
          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '16px 8px' }}>
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: '50%',
                  background: 'rgba(38, 180, 156, 0.15)',
                  color: 'var(--color-teal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.2rem',
                  margin: '0 auto 20px',
                  border: '2px solid var(--color-teal)',
                  boxShadow: '0 0 24px rgba(38, 180, 156, 0.25)',
                }}
              >
                ✓
              </div>

              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 12, color: 'var(--text-primary)' }}>
                {texts.success.received}
              </h3>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.6, maxWidth: 560, margin: '0 auto 24px' }}>
                {formData.intention === 'volunteering'
                  ? texts.success.volunteeringMsg
                  : formData.intention === 'donation'
                  ? texts.success.donationMsg
                  : formData.intention === 'alliance'
                  ? texts.success.allianceMsg
                  : texts.success.defaultMsg}
              </p>

              {/* Countdown badge */}
              <div
                style={{
                  background: 'var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 18px',
                  marginBottom: 24,
                  fontSize: '0.88rem',
                  color: 'var(--text-primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <span>⏳</span> {texts.success.redirectNotice}{' '}
                <strong style={{ color: 'var(--color-accent)', fontSize: '1.05rem' }}>{countdown}</strong> {texts.success.seconds}
              </div>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link
                  href="/#donar"
                  className="btn btn-primary"
                  style={{ minWidth: 200, justifyContent: 'center' }}
                >
                  {texts.success.btnDonate}
                </Link>
                <Link
                  href="/"
                  className="btn btn-outline"
                  style={{ minWidth: 160, justifyContent: 'center' }}
                >
                  {texts.success.btnHome}
                </Link>
              </div>
            </div>
          )}

        </div>

      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

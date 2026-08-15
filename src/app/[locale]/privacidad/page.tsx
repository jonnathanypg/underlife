import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = 'https://fundacionunderlife.org';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    es: 'Política de Privacidad — Fundación Underlife',
    en: 'Privacy Policy — Underlife Foundation',
    pt: 'Política de Privacidade — Fundação Underlife',
  };
  const descriptions: Record<string, string> = {
    es: 'Política de privacidad y tratamiento de datos personales de Fundación Underlife. Conoce cómo protegemos tu información.',
    en: 'Privacy policy and personal data processing of Underlife Foundation. Learn how we protect your information.',
    pt: 'Política de privacidade e tratamento de dados pessoais da Fundação Underlife. Saiba como protegemos suas informações.',
  };
  return {
    title: titles[locale] ?? titles.es,
    description: descriptions[locale] ?? descriptions.es,
    alternates: {
      canonical: `${siteUrl}/${locale}/privacidad`,
      languages: {
        es: `${siteUrl}/es/privacidad`,
        en: `${siteUrl}/en/privacidad`,
        pt: `${siteUrl}/pt/privacidad`,
      },
    },
  };
}

const content = {
  es: {
    title: 'Política de Privacidad',
    updated: 'Última actualización: agosto de 2026',
    back: '← Volver al inicio',
    sections: [
      {
        heading: '1. Responsable del Tratamiento',
        body: `Fundación Underlife, organización sin fines de lucro constituida bajo las leyes de la República del Ecuador, con domicilio en Milagro, provincia del Guayas, es responsable del tratamiento de los datos personales recabados a través del sitio web https://fundacionunderlife.org.

Contacto de privacidad: info@fundacionunderlife.org`,
      },
      {
        heading: '2. Datos que Recopilamos',
        body: `Recopilamos únicamente los datos que tú nos proporcionas voluntariamente:

• Formulario de contacto: nombre completo, dirección de correo electrónico, asunto y mensaje.
• Formulario de donación: monto de donación y tipo de donante (anónimo, personal o corporativo). Los datos de pago son procesados directamente por dLocal Go o PayPal y no son almacenados por nosotros.
• Datos técnicos: dirección IP (usada únicamente para determinar el método de pago disponible en tu país, mediante el servicio ipapi.co con solicitud única sin almacenamiento).`,
      },
      {
        heading: '3. Finalidad del Tratamiento',
        body: `Los datos recopilados son utilizados exclusivamente para:

• Responder a tus consultas enviadas a través del formulario de contacto.
• Procesar tu donación de manera segura.
• Mejorar la experiencia de usuario del sitio web.

No utilizamos tus datos para marketing directo sin tu consentimiento expreso, ni los vendemos o cedemos a terceros con fines comerciales.`,
      },
      {
        heading: '4. Base Legal del Tratamiento',
        body: `El tratamiento de tus datos se realiza sobre las siguientes bases legales conforme a la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP) y regulaciones aplicables:

• Ejecución de un contrato o solicitud: cuando nos contactas o realizas una donación.
• Interés legítimo: para la mejora continua de nuestros servicios sin fines de lucro.
• Consentimiento: para cualquier comunicación adicional que solicites.`,
      },
      {
        heading: '5. Conservación de Datos',
        body: `Los datos de contacto se conservan por un período máximo de 24 meses desde la última interacción. Los datos relacionados con donaciones se conservan conforme a las obligaciones contables y tributarias vigentes en Ecuador (hasta 7 años).`,
      },
      {
        heading: '6. Seguridad',
        body: `Implementamos medidas técnicas y organizativas adecuadas para proteger tus datos personales contra acceso no autorizado, pérdida o divulgación. Todo el sitio opera bajo HTTPS con certificado SSL vigente. Los pagos son procesados por procesadores certificados PCI-DSS (dLocal Go y PayPal).`,
      },
      {
        heading: '7. Tus Derechos',
        body: `De conformidad con la normativa aplicable, tienes derecho a:

• Acceder a tus datos personales en nuestro poder.
• Rectificar datos inexactos o incompletos.
• Solicitar la eliminación de tus datos.
• Oponerte al tratamiento de tus datos.
• Solicitar la portabilidad de tus datos.

Para ejercer estos derechos, escríbenos a: info@fundacionunderlife.org con el asunto "Derechos LOPDP".`,
      },
      {
        heading: '8. Cookies y Tecnologías de Seguimiento',
        body: `Este sitio web no utiliza cookies de seguimiento ni herramientas de análisis que identifiquen usuarios de forma individual. Únicamente se utilizan cookies técnicas estrictamente necesarias para el funcionamiento del sitio (preferencia de tema visual y de idioma).`,
      },
      {
        heading: '9. Contacto',
        body: `Para cualquier consulta relacionada con esta política de privacidad:

Fundación Underlife
Email: info@fundacionunderlife.org
Teléfono: +593 986 020 391
Dirección: Milagro, Guayas, Ecuador`,
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: August 2026',
    back: '← Back to home',
    sections: [
      {
        heading: '1. Data Controller',
        body: `Underlife Foundation, a non-profit organization incorporated under the laws of the Republic of Ecuador, headquartered in Milagro, Guayas province, is responsible for processing personal data collected through https://fundacionunderlife.org.

Privacy contact: info@fundacionunderlife.org`,
      },
      {
        heading: '2. Data We Collect',
        body: `We only collect data you voluntarily provide:

• Contact form: full name, email address, subject, and message.
• Donation form: donation amount and donor type (anonymous, personal, or corporate). Payment data is processed directly by dLocal Go or PayPal and is not stored by us.
• Technical data: IP address (used only to determine the available payment method in your country via ipapi.co with a single non-stored request).`,
      },
      {
        heading: '3. Purpose of Processing',
        body: `Collected data is used exclusively to:

• Respond to your inquiries submitted through the contact form.
• Process your donation securely.
• Improve the website user experience.

We do not use your data for direct marketing without your explicit consent, nor do we sell or share it with third parties for commercial purposes.`,
      },
      {
        heading: '4. Legal Basis',
        body: `Data processing is carried out on the following legal bases under Ecuador's Organic Law on Personal Data Protection (LOPDP) and applicable regulations:

• Contract execution or request: when you contact us or make a donation.
• Legitimate interest: for the continuous improvement of our non-profit services.
• Consent: for any additional communications you request.`,
      },
      {
        heading: '5. Data Retention',
        body: `Contact data is retained for a maximum of 24 months from the last interaction. Donation-related data is retained in accordance with current accounting and tax obligations in Ecuador (up to 7 years).`,
      },
      {
        heading: '6. Security',
        body: `We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or disclosure. The entire site operates under HTTPS with a valid SSL certificate. Payments are processed by PCI-DSS certified processors (dLocal Go and PayPal).`,
      },
      {
        heading: '7. Your Rights',
        body: `In accordance with applicable regulations, you have the right to:

• Access your personal data in our possession.
• Rectify inaccurate or incomplete data.
• Request deletion of your data.
• Object to the processing of your data.
• Request data portability.

To exercise these rights, write to us at: info@fundacionunderlife.org with the subject "Data Rights Request".`,
      },
      {
        heading: '8. Cookies and Tracking',
        body: `This website does not use tracking cookies or analytics tools that individually identify users. Only strictly necessary technical cookies are used for site operation (visual theme and language preferences).`,
      },
      {
        heading: '9. Contact',
        body: `For any questions related to this privacy policy:

Underlife Foundation
Email: info@fundacionunderlife.org
Phone: +593 986 020 391
Address: Milagro, Guayas, Ecuador`,
      },
    ],
  },
  pt: {
    title: 'Política de Privacidade',
    updated: 'Última atualização: agosto de 2026',
    back: '← Voltar ao início',
    sections: [
      {
        heading: '1. Responsável pelo Tratamento',
        body: `Fundação Underlife, organização sem fins lucrativos constituída sob as leis da República do Equador, sediada em Milagro, província de Guayas, é responsável pelo tratamento dos dados pessoais coletados por meio do site https://fundacionunderlife.org.

Contato de privacidade: info@fundacionunderlife.org`,
      },
      {
        heading: '2. Dados que Coletamos',
        body: `Coletamos apenas os dados que você nos fornece voluntariamente:

• Formulário de contato: nome completo, endereço de e-mail, assunto e mensagem.
• Formulário de doação: valor da doação e tipo de doador (anônimo, pessoal ou corporativo). Os dados de pagamento são processados diretamente pelo dLocal Go ou PayPal e não são armazenados por nós.
• Dados técnicos: endereço IP (usado apenas para determinar o método de pagamento disponível no seu país via ipapi.co com uma solicitação única sem armazenamento).`,
      },
      {
        heading: '3. Finalidade do Tratamento',
        body: `Os dados coletados são utilizados exclusivamente para:

• Responder às suas consultas enviadas pelo formulário de contato.
• Processar sua doação com segurança.
• Melhorar a experiência do usuário no site.

Não utilizamos seus dados para marketing direto sem seu consentimento expresso, nem os vendemos ou compartilhamos com terceiros para fins comerciais.`,
      },
      {
        heading: '4. Base Legal',
        body: `O tratamento dos seus dados é realizado com base nas seguintes bases legais de acordo com a Lei Orgânica de Proteção de Dados Pessoais do Equador (LOPDP):

• Execução de contrato ou solicitação: quando você nos contata ou faz uma doação.
• Interesse legítimo: para a melhoria contínua dos nossos serviços sem fins lucrativos.
• Consentimento: para qualquer comunicação adicional que você solicitar.`,
      },
      {
        heading: '5. Retenção de Dados',
        body: `Os dados de contato são retidos por no máximo 24 meses desde a última interação. Os dados relacionados a doações são retidos de acordo com as obrigações contábeis e fiscais vigentes no Equador (até 7 anos).`,
      },
      {
        heading: '6. Segurança',
        body: `Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado, perda ou divulgação. Todo o site opera sob HTTPS com certificado SSL válido. Os pagamentos são processados por processadores certificados PCI-DSS (dLocal Go e PayPal).`,
      },
      {
        heading: '7. Seus Direitos',
        body: `De acordo com a regulamentação aplicável, você tem direito a:

• Acessar seus dados pessoais em nosso poder.
• Retificar dados imprecisos ou incompletos.
• Solicitar a exclusão de seus dados.
• Opor-se ao tratamento de seus dados.
• Solicitar a portabilidade de seus dados.

Para exercer esses direitos, escreva-nos em: info@fundacionunderlife.org com o assunto "Solicitação de Direitos de Dados".`,
      },
      {
        heading: '8. Cookies e Rastreamento',
        body: `Este site não utiliza cookies de rastreamento nem ferramentas de análise que identifiquem usuários individualmente. Apenas cookies técnicos estritamente necessários para o funcionamento do site são utilizados (preferências de tema visual e idioma).`,
      },
      {
        heading: '9. Contato',
        body: `Para qualquer dúvida relacionada a esta política de privacidade:

Fundação Underlife
E-mail: info@fundacionunderlife.org
Telefone: +593 986 020 391
Endereço: Milagro, Guayas, Equador`,
      },
    ],
  },
};

export default async function PrivacidadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = content[locale as keyof typeof content] ?? content.es;

  return (
    <main style={{ minHeight: '100vh', paddingTop: 'calc(var(--header-height) + 40px)', paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            color: 'var(--color-primary)',
            fontWeight: 600,
            fontSize: '0.9rem',
            marginBottom: 32,
            textDecoration: 'none',
          }}
        >
          {c.back}
        </Link>

        <h1
          className="section-title"
          style={{ textAlign: 'left', marginBottom: 8 }}
        >
          {c.title}
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 48 }}>
          {c.updated}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {c.sections.map((section) => (
            <section key={section.heading}>
              <h2
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  marginBottom: 12,
                }}
              >
                {section.heading}
              </h2>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  fontSize: '0.95rem',
                  whiteSpace: 'pre-line',
                }}
              >
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

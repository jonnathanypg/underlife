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
    es: 'Transparencia e Información Legal — Fundación Underlife',
    en: 'Transparency & Legal Information — Underlife Foundation',
    pt: 'Transparência e Informações Legais — Fundação Underlife',
  };
  return {
    title: titles[locale] ?? titles.es,
    description:
      locale === 'en'
        ? 'Legal information, registration, mission, programs and annual impact of Underlife Foundation — Ecuador non-profit since 2018.'
        : locale === 'pt'
        ? 'Informações legais, registro, missão, programas e impacto anual da Fundação Underlife — ONG equatoriana desde 2018.'
        : 'Información legal, registro, misión, programas e impacto anual de Fundación Underlife — ONG ecuatoriana desde 2018.',
    alternates: {
      canonical: `${siteUrl}/${locale}/transparencia`,
      languages: {
        es: `${siteUrl}/es/transparencia`,
        en: `${siteUrl}/en/transparencia`,
        pt: `${siteUrl}/pt/transparencia`,
      },
    },
  };
}

const content = {
  es: {
    title: 'Transparencia e Información Legal',
    back: '← Volver al inicio',
    legalTitle: 'Datos de la Organización',
    legalItems: [
      { label: 'Razón Social', value: 'Fundación Underlife' },
      { label: 'RUC', value: '[INSERTAR RUC DE LA FUNDACIÓN]' },
      { label: 'Tipo de Entidad', value: 'Organización sin fines de lucro (ONG)' },
      { label: 'País de Constitución', value: 'Ecuador' },
      { label: 'Año de Fundación', value: '2018' },
      { label: 'Domicilio', value: 'Milagro, Guayas, Ecuador' },
      { label: 'Email', value: 'info@fundacionunderlife.org' },
      { label: 'Teléfono', value: '+593 986 020 391' },
      { label: 'Sitio Web', value: 'https://fundacionunderlife.org' },
    ],
    missionTitle: 'Misión',
    mission:
      'No solo asistimos a la vulnerabilidad; innovamos para erradicarla. Transformamos el futuro de Ecuador mediante la protección infantil, el acceso tecnológico a la justicia y el pensamiento divergente.',
    visionTitle: 'Visión',
    vision:
      'Ser el referente latinoamericano de innovación social: un laboratorio de pensamiento divergente que convierte las adversidades en plataformas de desarrollo humano integral y sostenible.',
    programsTitle: 'Programas Activos',
    programs: [
      {
        name: 'Desarrollo Infantil Integral',
        desc: 'Operamos centros de desarrollo infantil (CDI) aliados en zonas vulnerables de Milagro, garantizando nutrición, estimulación cognitiva y protección de derechos para niños y niñas de 0 a 5 años. Centros activos: CDI Caritas Alegres, CDI Pedacitos de Amor, CDI Gotitas del Saber, CDI Amiguitos a Jugar.',
      },
      {
        name: 'Protección de Derechos y Equidad',
        desc: 'Intervenimos en crisis familiares con enfoque técnico, garantizando entornos seguros y la restitución plena de derechos a través de trabajo social especializado.',
      },
      {
        name: 'Justicia y Democratización Digital',
        desc: 'Eliminamos barreras económicas al acceso jurídico mediante innovación tecnológica e inteligencia artificial, haciendo la defensa legal accesible para todos.',
      },
      {
        name: 'Liderazgo y Empoderamiento Juvenil',
        desc: 'Transformamos riesgos sociales en expresión artística, hip-hop, liderazgo comunitario y habilidades técnicas para jóvenes en situación de vulnerabilidad.',
      },
      {
        name: 'Innovación Social y Resiliencia Sistémica',
        desc: 'Laboratorio de respuesta técnica inmediata ante crisis sociales y naturales, escalando el impacto con solvencia administrativa y pensamiento divergente.',
      },
    ],
    impactTitle: 'Métricas de Impacto (2026)',
    impactItems: [
      { value: '+2,300', label: 'Días de operación ininterrumpida' },
      { value: '+395', label: 'Niñas y niños protegidos en CDI' },
      { value: '+100', label: 'Familias asistidas con intervención técnica' },
      { value: '+1,500', label: 'Jóvenes impactados a través de programas' },
    ],
    donationsTitle: 'Transparencia en el Uso de Donaciones',
    donations:
      'Las donaciones recibidas son destinadas íntegramente a nuestros programas sociales activos. Fundación Underlife no destina fondos de donaciones a sueldos de directivos ni a gastos administrativos discrecionales. Los estados financieros están disponibles mediante solicitud formal a info@fundacionunderlife.org.',
    privacyLink: 'Ver Política de Privacidad',
  },
  en: {
    title: 'Transparency & Legal Information',
    back: '← Back to home',
    legalTitle: 'Organization Data',
    legalItems: [
      { label: 'Legal Name', value: 'Fundación Underlife' },
      { label: 'Tax ID (RUC)', value: '[INSERT FOUNDATION RUC]' },
      { label: 'Entity Type', value: 'Non-profit organization (NGO)' },
      { label: 'Country of Incorporation', value: 'Ecuador' },
      { label: 'Year Founded', value: '2018' },
      { label: 'Address', value: 'Milagro, Guayas, Ecuador' },
      { label: 'Email', value: 'info@fundacionunderlife.org' },
      { label: 'Phone', value: '+593 986 020 391' },
      { label: 'Website', value: 'https://fundacionunderlife.org' },
    ],
    missionTitle: 'Mission',
    mission:
      "We don't just assist vulnerability; we innovate to eradicate it. We transform Ecuador's future through child protection, technological access to justice, and divergent thinking.",
    visionTitle: 'Vision',
    vision:
      'To be the Latin American benchmark of social innovation: a laboratory of divergent thinking that turns adversities into platforms for integral and sustainable human development.',
    programsTitle: 'Active Programs',
    programs: [
      {
        name: 'Comprehensive Child Development',
        desc: 'We operate allied child development centers (CDI) in vulnerable areas of Milagro, ensuring nutrition, cognitive stimulation, and rights protection for children aged 0-5. Active centers: CDI Caritas Alegres, CDI Pedacitos de Amor, CDI Gotitas del Saber, CDI Amiguitos a Jugar.',
      },
      {
        name: 'Rights Protection & Equity',
        desc: 'We intervene in family crises with a technical approach, ensuring safe environments and the full restitution of rights through specialized social work.',
      },
      {
        name: 'Digital Justice & Democratization',
        desc: 'We eliminate economic barriers to legal access through technological innovation and artificial intelligence, making legal defense accessible to all.',
      },
      {
        name: 'Youth Leadership & Empowerment',
        desc: 'We transform social risks into artistic expression, hip-hop, community leadership, and technical skills for young people in vulnerable situations.',
      },
      {
        name: 'Social Innovation & Systemic Resilience',
        desc: 'A laboratory for immediate technical response to social and natural crises, scaling impact with administrative solvency and divergent thinking.',
      },
    ],
    impactTitle: 'Impact Metrics (2026)',
    impactItems: [
      { value: '+2,300', label: 'Days of uninterrupted operation' },
      { value: '+395', label: 'Children protected in CDI centers' },
      { value: '+100', label: 'Families assisted with technical intervention' },
      { value: '+1,500', label: 'Youth impacted through programs' },
    ],
    donationsTitle: 'Donation Transparency',
    donations:
      'Donations received are fully allocated to our active social programs. Underlife Foundation does not allocate donation funds to executive salaries or discretionary administrative expenses. Financial statements are available upon formal request to info@fundacionunderlife.org.',
    privacyLink: 'View Privacy Policy',
  },
  pt: {
    title: 'Transparência e Informações Legais',
    back: '← Voltar ao início',
    legalTitle: 'Dados da Organização',
    legalItems: [
      { label: 'Razão Social', value: 'Fundación Underlife' },
      { label: 'CNPJ/RUC', value: '[INSERIR RUC DA FUNDAÇÃO]' },
      { label: 'Tipo de Entidade', value: 'Organização sem fins lucrativos (ONG)' },
      { label: 'País de Constituição', value: 'Equador' },
      { label: 'Ano de Fundação', value: '2018' },
      { label: 'Endereço', value: 'Milagro, Guayas, Equador' },
      { label: 'E-mail', value: 'info@fundacionunderlife.org' },
      { label: 'Telefone', value: '+593 986 020 391' },
      { label: 'Site', value: 'https://fundacionunderlife.org' },
    ],
    missionTitle: 'Missão',
    mission:
      'Não apenas assistimos à vulnerabilidade; inovamos para erradicá-la. Transformamos o futuro do Equador por meio da proteção infantil, acesso tecnológico à justiça e pensamento divergente.',
    visionTitle: 'Visão',
    vision:
      'Ser o referencial latino-americano de inovação social: um laboratório de pensamento divergente que transforma adversidades em plataformas de desenvolvimento humano integral e sustentável.',
    programsTitle: 'Programas Ativos',
    programs: [
      {
        name: 'Desenvolvimento Infantil Integral',
        desc: 'Operamos centros de desenvolvimento infantil (CDI) aliados em áreas vulneráveis de Milagro, garantindo nutrição, estimulação cognitiva e proteção de direitos para crianças de 0 a 5 anos.',
      },
      {
        name: 'Proteção de Direitos e Equidade',
        desc: 'Intervimos em crises familiares com abordagem técnica, garantindo ambientes seguros e a plena restituição de direitos por meio de trabalho social especializado.',
      },
      {
        name: 'Justiça e Democratização Digital',
        desc: 'Eliminamos barreiras econômicas ao acesso jurídico por meio de inovação tecnológica e inteligência artificial, tornando a defesa legal acessível a todos.',
      },
      {
        name: 'Liderança e Empoderamento Juvenil',
        desc: 'Transformamos riscos sociais em expressão artística, hip-hop, liderança comunitária e habilidades técnicas para jovens em situação de vulnerabilidade.',
      },
      {
        name: 'Inovação Social e Resiliência Sistêmica',
        desc: 'Laboratório de resposta técnica imediata a crises sociais e naturais, escalando o impacto com solvência administrativa e pensamento divergente.',
      },
    ],
    impactTitle: 'Métricas de Impacto (2026)',
    impactItems: [
      { value: '+2.300', label: 'Dias de operação ininterrupta' },
      { value: '+395', label: 'Crianças protegidas nos centros CDI' },
      { value: '+100', label: 'Famílias assistidas com intervenção técnica' },
      { value: '+1.500', label: 'Jovens impactados pelos programas' },
    ],
    donationsTitle: 'Transparência nas Doações',
    donations:
      'As doações recebidas são integralmente destinadas aos nossos programas sociais ativos. A Fundação Underlife não destina fundos de doações a salários de diretores nem a despesas administrativas discricionárias. Os demonstrativos financeiros estão disponíveis mediante solicitação formal para info@fundacionunderlife.org.',
    privacyLink: 'Ver Política de Privacidade',
  },
};

export default async function TransparenciaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = content[locale as keyof typeof content] ?? content.es;

  return (
    <main style={{ minHeight: '100vh', paddingTop: 'calc(var(--header-height) + 40px)', paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 800 }}>
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

        <h1 className="section-title" style={{ textAlign: 'left', marginBottom: 48 }}>
          {c.title}
        </h1>

        {/* Legal Data */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 20, color: 'var(--color-primary)' }}>
            {c.legalTitle}
          </h2>
          <div className="glass-card" style={{ padding: 'clamp(20px, 4vw, 36px)', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <tbody>
                {c.legalItems.map((item) => (
                  <tr key={item.label} style={{ borderBottom: '1px solid var(--divider)' }}>
                    <td style={{ padding: '10px 16px 10px 0', fontWeight: 700, color: 'var(--text-secondary)', whiteSpace: 'nowrap', width: '40%' }}>
                      {item.label}
                    </td>
                    <td style={{ padding: '10px 0', color: 'var(--text-primary)' }}>
                      {item.value.startsWith('[') ? (
                        <span style={{ color: 'var(--color-warning)', fontStyle: 'italic' }}>{item.value}</span>
                      ) : (
                        item.value
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Mission & Vision */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 16, color: 'var(--color-primary)' }}>
            {c.missionTitle}
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1rem', marginBottom: 32 }}>
            {c.mission}
          </p>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 16, color: 'var(--color-teal)' }}>
            {c.visionTitle}
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1rem' }}>
            {c.vision}
          </p>
        </section>

        {/* Programs */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 24, color: 'var(--color-primary)' }}>
            {c.programsTitle}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {c.programs.map((prog, i) => (
              <div key={i} className="glass-card" style={{ padding: '20px 24px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>
                  {prog.name}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {prog.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Impact */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 24, color: 'var(--color-primary)' }}>
            {c.impactTitle}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
            {c.impactItems.map((item) => (
              <div key={item.label} className="glass-card" style={{ padding: '24px 16px', textAlign: 'center' }}>
                <p className="gradient-text-primary" style={{ fontSize: '2rem', fontWeight: 900 }}>{item.value}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: 6, lineHeight: 1.4 }}>{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Donations Transparency */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 16, color: 'var(--color-primary)' }}>
            {c.donationsTitle}
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
            {c.donations}
          </p>
        </section>

        {/* Privacy Policy Link */}
        <div style={{ borderTop: '1px solid var(--divider)', paddingTop: 24 }}>
          <Link
            href={`/${locale}/privacidad`}
            style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'underline' }}
          >
            {c.privacyLink} →
          </Link>
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from 'next';
import TransparenciaClient from './TransparenciaClient';

const siteUrl = 'https://fundacionunderlife.org';

export const metadata: Metadata = {
  title: 'Transparencia y Rendición de Cuentas | Fundación Underlife',
  description:
    'Accede a nuestros estatutos legales, programas CDI, destino de fondos y gobierno institucional con máxima claridad y rigor.',
  keywords: [
    'transparencia fundacion underlife',
    'rendicion de cuentas',
    'estatutos ong ecuador',
    'centros cdi milagro',
    'impacto social',
    'donaciones seguras',
  ],
  alternates: {
    canonical: `${siteUrl}/transparencia`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/transparencia`,
    title: 'Transparencia y Rendición de Cuentas | Fundación Underlife',
    description:
      'Accede a nuestros estatutos legales, programas CDI, destino de fondos y gobierno institucional con máxima claridad y rigor.',
    siteName: 'Fundación Underlife',
    images: [
      {
        url: 'https://fundacionunderlife.org/logos/logo-fundacionunderlife-dark.png',
        width: 800,
        height: 800,
        alt: 'Transparencia y Rendición de Cuentas — Fundación Underlife',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transparencia y Rendición de Cuentas | Fundación Underlife',
    description:
      'Accede a nuestros estatutos legales, programas CDI, destino de fondos y gobierno institucional con máxima claridad y rigor.',
    images: ['https://fundacionunderlife.org/logos/logo-fundacionunderlife-dark.png'],
  },
};

export default function TransparenciaPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${siteUrl}/transparencia#webpage`,
        url: `${siteUrl}/transparencia`,
        name: 'Transparencia y Rendición de Cuentas | Fundación Underlife',
        description:
          'Información institucional, marco legal, programas CDI y gobierno corporativo de Fundación Underlife.',
        about: {
          '@type': 'NGO',
          name: 'Fundación Underlife',
          url: siteUrl,
        },
        breadcrumb: {
          '@id': `${siteUrl}/transparencia#breadcrumb`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/transparencia#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Transparencia',
            item: `${siteUrl}/transparencia`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TransparenciaClient />
    </>
  );
}

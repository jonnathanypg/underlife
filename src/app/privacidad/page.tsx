import type { Metadata } from 'next';
import PrivacidadClient from './PrivacidadClient';

const siteUrl = 'https://fundacionunderlife.org';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Fundación Underlife',
  description:
    'Conoce cómo protegemos tus datos personales conforme a la LOPDP y normativas internacionales de seguridad y confidencialidad.',
  keywords: [
    'privacidad fundacion underlife',
    'protección de datos ecuador',
    'seguridad lopdp',
    'terminos y privacidad ong',
  ],
  alternates: {
    canonical: `${siteUrl}/privacidad`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/privacidad`,
    title: 'Política de Privacidad | Fundación Underlife',
    description:
      'Conoce cómo protegemos tus datos personales conforme a la LOPDP y normativas internacionales de seguridad y confidencialidad.',
    siteName: 'Fundación Underlife',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Política de Privacidad — Fundación Underlife',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Política de Privacidad | Fundación Underlife',
    description:
      'Conoce cómo protegemos tus datos personales conforme a la LOPDP y normativas internacionales de seguridad y confidencialidad.',
    images: ['/twitter-image'],
  },
};

export default function PrivacidadPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/privacidad#webpage`,
        url: `${siteUrl}/privacidad`,
        name: 'Política de Privacidad | Fundación Underlife',
        description:
          'Política de tratamiento y protección de datos personales de Fundación Underlife según la legislación ecuatoriana.',
        breadcrumb: {
          '@id': `${siteUrl}/privacidad#breadcrumb`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/privacidad#breadcrumb`,
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
            name: 'Política de Privacidad',
            item: `${siteUrl}/privacidad`,
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
      <PrivacidadClient />
    </>
  );
}

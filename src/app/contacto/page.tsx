import type { Metadata } from 'next';
import ContactoClient from './ContactoClient';

const siteUrl = 'https://fundacionunderlife.org';

export const metadata: Metadata = {
  title: 'Contacto y Voluntariado | Fundación Underlife',
  description:
    '¿Quieres colaborar, donar o sumarte como voluntario? Escríbenos y transformemos juntos el futuro de la niñez en Ecuador.',
  keywords: [
    'contacto fundacion underlife',
    'voluntariado ecuador',
    'donaciones ong',
    'alianza empresarial',
    'milagro guayas',
    'protección infantil',
  ],
  alternates: {
    canonical: `${siteUrl}/contacto`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/contacto`,
    title: 'Contacto y Voluntariado | Fundación Underlife',
    description:
      '¿Quieres colaborar, donar o sumarte como voluntario? Escríbenos y transformemos juntos el futuro de la niñez en Ecuador.',
    siteName: 'Fundación Underlife',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Contacto y Voluntariado — Fundación Underlife',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto y Voluntariado | Fundación Underlife',
    description:
      '¿Quieres colaborar, donar o sumarte como voluntario? Escríbenos y transformemos juntos el futuro de la niñez en Ecuador.',
    images: ['/twitter-image'],
  },
};

export default function ContactoPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${siteUrl}/contacto#webpage`,
        url: `${siteUrl}/contacto`,
        name: 'Contacto y Voluntariado | Fundación Underlife',
        description:
          'Página oficial de contacto y coordinación de voluntariado de Fundación Underlife en Ecuador.',
        breadcrumb: {
          '@id': `${siteUrl}/contacto#breadcrumb`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/contacto#breadcrumb`,
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
            name: 'Contacto',
            item: `${siteUrl}/contacto`,
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
      <ContactoClient />
    </>
  );
}

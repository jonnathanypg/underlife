import type { Metadata } from 'next';
import Primeros1000DiasClient from './Primeros1000DiasClient';

const siteUrl = 'https://fundacionunderlife.org';

export const metadata: Metadata = {
  title: 'Tour Artivismo 1000 Días | Fundación Underlife',
  description:
    'Música, arte y tecnología para erradicar la desnutrición infantil en Ecuador. Conoce el tour, únete como artista o patrocina el futuro.',
  keywords: [
    'Tour Artivismo',
    'primeros 1000 dias',
    'desnutrición infantil Ecuador',
    'Underlife',
    'arte social',
    'hip hop con causa',
    'patrocinio ONG',
    'muralismo comunitario',
    'Milagro Guayas',
  ],
  alternates: {
    canonical: `${siteUrl}/primeros-1000-dias`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/primeros-1000-dias`,
    title: 'Tour Artivismo 1000 Días | Fundación Underlife',
    description:
      'Música, arte y tecnología para erradicar la desnutrición infantil en Ecuador. Conoce el tour, únete como artista o patrocina el futuro.',
    siteName: 'Fundación Underlife',
    images: [
      {
        url: 'https://fundacionunderlife.org/artivismo-img/hero_festival_muralismo.webp',
        width: 1200,
        height: 675,
        alt: 'Tour Artivismo Primeros 1000 Días — Fundación Underlife',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tour Artivismo 1000 Días | Fundación Underlife',
    description:
      'Música, arte y tecnología para erradicar la desnutrición infantil en Ecuador. Conoce el tour, únete como artista o patrocina el futuro.',
    images: ['https://fundacionunderlife.org/artivismo-img/hero_festival_muralismo.webp'],
  },
};

export default function Primeros1000DiasPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EventSeries',
        '@id': `${siteUrl}/primeros-1000-dias#event`,
        name: 'Tour Artivismo: Primeros 1000 Días de Vida',
        description:
          'Iniciativa de intervención sociocultural y recaudación para la erradicación de la desnutrición crónica infantil en Ecuador mediante música, arte urbano y tecnología.',
        url: `${siteUrl}/primeros-1000-dias`,
        organizer: {
          '@type': 'NGO',
          name: 'Fundación Underlife',
          url: siteUrl,
        },
        location: {
          '@type': 'Place',
          name: 'Ecuador (Milagro y La Libertad)',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'EC',
          },
        },
        image: 'https://fundacionunderlife.org/artivismo-img/hero_festival_muralismo.webp',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/primeros-1000-dias#breadcrumb`,
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
            name: 'Tour Artivismo 1000 Días',
            item: `${siteUrl}/primeros-1000-dias`,
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
      <Primeros1000DiasClient />
    </>
  );
}

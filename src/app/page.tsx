import type { Metadata } from 'next';
import HomeClient from './HomeClient';

const siteUrl = 'https://fundacionunderlife.org';

export const metadata: Metadata = {
  title: 'Fundación Underlife | Innovación Social y Protección Infantil en Ecuador',
  description:
    'Transformamos el futuro de la niñez en Ecuador mediante tecnología, pensamiento divergente y nutrición integral. ¡Conoce nuestro impacto y súmate!',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Fundación Underlife | Innovación Social y Protección Infantil',
    description:
      'Transformamos el futuro de la niñez en Ecuador mediante tecnología, pensamiento divergente y nutrición integral. ¡Conoce nuestro impacto y súmate!',
    siteName: 'Fundación Underlife',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Fundación Underlife — Innovación Social y Protección Infantil',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fundación Underlife | Innovación Social y Protección Infantil',
    description:
      'Transformamos el futuro de la niñez en Ecuador mediante tecnología, pensamiento divergente y nutrición integral. ¡Conoce nuestro impacto y súmate!',
    images: ['/twitter-image'],
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'NGO',
        '@id': `${siteUrl}/#organization`,
        name: 'Fundación Underlife',
        alternateName: 'Underlife Foundation',
        url: siteUrl,
        logo: `${siteUrl}/logos/logo-fundacionunderlife-dark.png`,
        image: `${siteUrl}/opengraph-image`,
        description:
          'Laboratorio integral de innovación social. Protección infantil, erradicación de la desnutrición crónica, justicia digital y desarrollo comunitario en Ecuador.',
        foundingDate: '2018',
        slogan: 'No solo asistimos a la vulnerabilidad; innovamos para erradicarla',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Milagro',
          addressRegion: 'Guayas',
          addressCountry: 'EC',
        },
        sameAs: [
          'https://www.facebook.com/underlife.ong/',
          'https://www.instagram.com/underlife_ong/',
          'https://www.linkedin.com/company/underlife-ong/',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Fundación Underlife',
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}

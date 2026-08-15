import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://fundacionunderlife.org';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Fundación Underlife — Pensamiento Divergente',
    template: '%s | Fundación Underlife',
  },
  description:
    'No solo asistimos a la vulnerabilidad; innovamos para erradicarla. Protección infantil, acceso tecnológico a la justicia y desarrollo comunitario en Ecuador. Fundada en 2018, Milagro, Ecuador.',
  keywords: [
    'Fundación Underlife',
    'ONG Ecuador',
    'desarrollo infantil',
    'innovación social',
    'donaciones Ecuador',
    'pensamiento divergente',
    'protección infantil',
    'justicia digital',
    'voluntariado Ecuador',
    'CDI Milagro',
    'organización sin fines de lucro',
    'nonprofit Ecuador',
  ],
  authors: [{ name: 'Fundación Underlife', url: siteUrl }],
  creator: 'Fundación Underlife',
  publisher: 'Fundación Underlife',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Fundación Underlife',
    title: 'Fundación Underlife — Pensamiento Divergente',
    description:
      'No solo asistimos a la vulnerabilidad; innovamos para erradicarla. ONG ecuatoriana dedicada a la protección infantil, acceso tecnológico a la justicia y desarrollo comunitario.',
    url: siteUrl,
    locale: 'es_EC',
    alternateLocale: ['en_US', 'pt_BR'],
    images: [
      {
        url: '/logos/logo-fundacionunderlife-dark.png',
        width: 786,
        height: 317,
        alt: 'Fundación Underlife',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fundación Underlife — Pensamiento Divergente',
    description:
      'Innovando para erradicar la vulnerabilidad. Protección infantil, acceso tecnológico a la justicia y desarrollo comunitario en Ecuador.',
    images: ['/logos/logo-fundacionunderlife-dark.png'],
  },
  alternates: {
    canonical: `${siteUrl}/es`,
    languages: {
      'es': `${siteUrl}/es`,
      'en': `${siteUrl}/en`,
      'pt': `${siteUrl}/pt`,
      'x-default': `${siteUrl}/en`,
    },
  },
  category: 'nonprofit',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

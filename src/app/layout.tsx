import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { LanguageProvider } from '@/lib/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollRestorer from '@/components/ui/ScrollRestorer';
import AikrofyWidget from '@/components/ui/AikrofyWidget';
import { Outfit, Caveat } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const caveat = Caveat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-caveat',
  weight: ['600', '700'],
});

const siteUrl = 'https://fundacionunderlife.org';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Fundación Underlife | Innovación Social y Protección Infantil en Ecuador',
    template: '%s | Fundación Underlife',
  },
  description:
    'Transformamos el futuro de la niñez en Ecuador mediante tecnología, pensamiento divergente y nutrición integral. ¡Conoce nuestro impacto y súmate!',
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
    'Tour Artivismo',
    'primeros 1000 dias',
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
    title: 'Fundación Underlife | Innovación Social y Protección Infantil',
    description:
      'Transformamos el futuro de la niñez en Ecuador mediante tecnología, pensamiento divergente y nutrición integral. ¡Conoce nuestro impacto y súmate!',
    url: siteUrl,
    locale: 'es_EC',
    alternateLocale: ['en_US', 'pt_BR'],
    images: [
      {
        url: 'https://fundacionunderlife.org/logos/logo-fundacionunderlife-dark.png',
        width: 800,
        height: 800,
        alt: 'Fundación Underlife — Innovación Social y Protección Infantil',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fundación Underlife | Innovación Social y Protección Infantil',
    description:
      'Transformamos el futuro de la niñez en Ecuador mediante tecnología, pensamiento divergente y nutrición integral. ¡Conoce nuestro impacto y súmate!',
    images: ['https://fundacionunderlife.org/logos/logo-fundacionunderlife-dark.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logos/isotipo-underlife.ico', sizes: 'any' },
      { url: '/logos/icono-isotipo-underlife.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/logos/icono-isotipo-underlife.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'nonprofit',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${outfit.variable} ${caveat.variable}`} data-theme="dark" suppressHydrationWarning>
      <head>
        {/* JSON-LD Schema for NGO, Organization and WebSite Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'NGO',
                  '@id': 'https://fundacionunderlife.org/#organization',
                  name: 'Fundación Underlife',
                  alternateName: 'Underlife Foundation',
                  url: 'https://fundacionunderlife.org',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://fundacionunderlife.org/logos/logo-fundacionunderlife-dark.png',
                    width: 512,
                    height: 512,
                  },
                  image: 'https://fundacionunderlife.org/logos/logo-fundacionunderlife-dark.png',
                  description:
                    'Laboratorio integral de innovación social. Protección infantil, erradicación de la desnutrición crónica, justicia digital y pensamiento divergente en Ecuador.',
                  foundingDate: '2018',
                  slogan: 'No solo asistimos a la vulnerabilidad; innovamos para erradicarla',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Milagro',
                    addressRegion: 'Guayas',
                    addressCountry: 'EC',
                  },
                  contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+593986020391',
                    contactType: 'customer support',
                    email: 'info@fundacionunderlife.org',
                    availableLanguage: ['es', 'en', 'pt'],
                  },
                  sameAs: [
                    'https://www.facebook.com/underlife.ong/',
                    'https://www.instagram.com/underlife_ong/',
                    'https://www.linkedin.com/company/underlife-ong/',
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://fundacionunderlife.org/#website',
                  url: 'https://fundacionunderlife.org',
                  name: 'Fundación Underlife',
                  publisher: {
                    '@id': 'https://fundacionunderlife.org/#organization',
                  },
                  inLanguage: ['es-EC', 'en-US', 'pt-BR'],
                },
              ],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('underlife-theme');
                  if (theme) {
                    document.documentElement.setAttribute('data-theme', theme);
                  } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <link
          rel="preload"
          as="image"
          href="/logos/logotipo-fundacionunderlife-dark.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/logos/logotipo-fundacionunderlife-ligth.webp"
          type="image/webp"
        />
        {/* Preconnect to AI Agent Server (saves ~460ms LCP) */}
        <link rel="preconnect" href="https://app.aikrofy.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://app.aikrofy.com" />
        {/* Preconnect to PayPal (loaded on-demand when donation section is visible) */}
        <link rel="preconnect" href="https://www.paypal.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.paypal.com" />
      </head>
      <body>
        <LanguageProvider>
          <ThemeProvider>
            <div className="animated-bg" aria-hidden="true" />
            <ScrollRestorer />
            <Header />
            <main style={{ minHeight: '100vh' }}>{children}</main>
            <Footer />
            <AikrofyWidget />
            {/* Aikrofy Conversational AI Webchat & Agentic Copilot */}
            <Script
              id="aikrofy-widget-script"
              src="https://app.aikrofy.com/widget.js"
              data-widget-id="3e502c00-45ae-4d6e-9bf6-5d60dab2ba46"
              strategy="afterInteractive"
            />
            <Script
              src="https://www.paypal.com/sdk/js?client-id=BAAHaUaKhWsWq0TTXodULxlOOiK6IkAH93rDl1FvxaCB4EiNVgnRyswgsmPFKUclEPgSRNzblvfHwHJNFA&currency=USD&disable-funding=credit"
              strategy="lazyOnload"
              id="paypal-sdk-script"
            />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

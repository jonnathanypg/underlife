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
        url: '/logos/logotipo-fundacionunderlife-dark.webp',
        width: 400,
        height: 139,
        alt: 'Fundación Underlife',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fundación Underlife — Pensamiento Divergente',
    description:
      'Innovando para erradicar la vulnerabilidad. Protección infantil, acceso tecnológico a la justicia y desarrollo comunitario en Ecuador.',
    images: ['/logos/logotipo-fundacionunderlife-dark.webp'],
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
        {/* JSON-LD Schema for NGO / Google Ad Grants Credibility */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'NGO',
              name: 'Fundación Underlife',
              alternateName: 'Underlife Foundation',
              url: 'https://fundacionunderlife.org',
              logo: 'https://fundacionunderlife.org/logos/logotipo-fundacionunderlife-dark.webp',
              description:
                'Laboratorio integral de innovación social. Protección infantil, justicia digital, pensamiento divergente y desarrollo comunitario en Ecuador.',
              foundingDate: '2018',
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
        {/* Preconnect to AI Agent Server (saves ~460ms LCP) */}
        <link rel="preconnect" href="https://app.aikrofy.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://app.aikrofy.com" />
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
            <Script
              src="https://www.paypal.com/sdk/js?client-id=BAAHaUaKhWsWq0TTXodULxlOOiK6IkAH93rDl1FvxaCB4EiNVgnRyswgsmPFKUclEPgSRNzblvfHwHJNFA&currency=USD&disable-funding=credit"
              strategy="afterInteractive"
              id="paypal-sdk-script"
            />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

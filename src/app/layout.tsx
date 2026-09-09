import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { LanguageProvider } from '@/lib/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollRestorer from '@/components/ui/ScrollRestorer';
import AikrofyWidget from '@/components/ui/AikrofyWidget';
import PrivacyCookieBanner from '@/components/ui/PrivacyCookieBanner';
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
                  legalName: 'Fundación Underlife',
                  taxID: '0993093904001',
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
        {/*
         * PERFORMANCE: Theme initialization — runs before first paint to avoid FOUC.
         * Uses try/catch to silently handle localStorage errors in private browsing mode.
         */}
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
        {/*
         * PERFORMANCE: LCP Critical Image — preload ONLY the dark logo (SSR default theme).
         *
         * The light logo is intentionally NOT preloaded here. The Header component
         * swaps to the light logo on the client after hydration. Preloading both logos
         * wastes 9 KiB on the critical path for zero user-visible benefit.
         *
         * This single preload hint (fetchPriority="high") tells the browser to begin
         * fetching the LCP element as early as possible, which directly reduces LCP time.
         */}
        <link
          rel="preload"
          as="image"
          href="/logos/logotipo-fundacionunderlife-dark.webp"
          type="image/webp"
          fetchPriority="high"
        />
        {/* Preconnect to AI Chat Server (saves ~460ms on first widget request) */}
        <link rel="preconnect" href="https://app.aikrofy.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://app.aikrofy.com" />
        {/* Preconnect to PayPal — SDK loads on-demand only when user reaches donation section */}
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
            <PrivacyCookieBanner />
            {/*
             * PERFORMANCE NOTE: PayPal SDK removed from global layout.
             *
             * Previously: sdk/js loaded globally → 100 KiB on EVERY page visit,
             * even for users who never scroll to the donation section.
             * This blocked FCP/LCP and was flagged as 66.6 KiB of unused JS.
             *
             * Now: PayPal SDK is loaded on-demand inside DonationSection.tsx using an
             * IntersectionObserver that fires only when the section enters the viewport.
             * This saves 100 KiB from the initial critical rendering path.
             */}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

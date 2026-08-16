import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollRestorer from '@/components/ui/ScrollRestorer';
import type { Metadata } from 'next';
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

const localeMetadata: Record<string, { title: string; description: string }> = {
  es: {
    title: 'Fundación Underlife — Pensamiento Divergente',
    description:
      'No solo asistimos a la vulnerabilidad; innovamos para erradicarla. Protección infantil, acceso tecnológico a la justicia y desarrollo comunitario en Ecuador. Fundada en 2018.',
  },
  en: {
    title: 'Underlife Foundation — Divergent Thinking',
    description:
      'We don\'t just assist vulnerability; we innovate to eradicate it. Child protection, technological access to justice, and community development in Ecuador since 2018.',
  },
  pt: {
    title: 'Fundação Underlife — Pensamento Divergente',
    description:
      'Não apenas assistimos à vulnerabilidade; inovamos para erradicá-la. Proteção infantil, acesso tecnológico à justiça e desenvolvimento comunitário no Equador desde 2018.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = localeMetadata[locale] ?? localeMetadata.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        es: `${siteUrl}/es`,
        en: `${siteUrl}/en`,
        pt: `${siteUrl}/pt`,
        'x-default': `${siteUrl}/en`,
      },
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
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${siteUrl}/${locale}`,
      locale: locale === 'es' ? 'es_EC' : locale === 'pt' ? 'pt_BR' : 'en_US',
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }, { locale: 'pt' }];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${outfit.variable} ${caveat.variable}`} data-theme="dark" suppressHydrationWarning>
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
              logo: 'https://fundacionunderlife.org/logos/logotipo-fundacionunderlife-dark.png',
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
      </head>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider>
            <div className="animated-bg" aria-hidden="true" />
            <ScrollRestorer />
            <Header />
            <main style={{ minHeight: '100vh' }}>{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}


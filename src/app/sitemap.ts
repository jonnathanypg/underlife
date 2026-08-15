import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fundacionunderlife.org';
  const locales = ['es', 'en', 'pt'];
  const routes = ['', '/privacidad', '/transparencia'];
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified,
        changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
        priority: route === '' ? 1.0 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${route}`])
          ),
        },
      });
    }
  }

  return entries;
}

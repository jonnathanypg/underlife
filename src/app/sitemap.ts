import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fundacionunderlife.org';
  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/primeros-1000-dias', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/transparencia', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contacto', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/privacidad', priority: 0.5, changeFrequency: 'monthly' as const },
  ];
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

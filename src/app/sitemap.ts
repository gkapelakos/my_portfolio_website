import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://kapelakos.dev';
  const locales = ['en', 'el'];

  const localSitemaps = locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 1.0,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    ...localSitemaps,
  ];
}

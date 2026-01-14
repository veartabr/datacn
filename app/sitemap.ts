import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://datacn.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/components/bar-chart',
    '/components/line-chart',
    '/components/area-chart',
    '/components/pie-chart',
    '/components/time-series-chart',
    '/components/legends',
    '/components/markers',
    '/components/pickers',
    '/examples',
    '/utilities',
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}

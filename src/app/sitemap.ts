import { MetadataRoute } from 'next';
import { TOOLS } from '@/data/tools';
import { GUIDES } from '@/data/guides';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://docuforge.app';
  const currentDate = new Date().toISOString();

  // Core static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5
    }
  ];

  // All 12 tool routes
  const toolRoutes: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${baseUrl}/${tool.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9
  }));

  // Guide article routes
  const guideRoutes: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  return [...staticRoutes, ...toolRoutes, ...guideRoutes];
}

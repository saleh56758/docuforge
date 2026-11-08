import { MetadataRoute } from 'next';
import { TOOLS } from '@/data/tools';
import { GUIDES } from '@/data/guides';
import { getSiteUrl } from '@/utils/siteConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  // Core static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/guides`,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: `${baseUrl}/terms`,
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: `${baseUrl}/disclaimer`,
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: `${baseUrl}/cookies`,
      changeFrequency: 'monthly',
      priority: 0.5
    }
  ];

  // All 12 tool routes
  const toolRoutes: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${baseUrl}/${tool.slug}`,
    changeFrequency: 'weekly',
    priority: 0.9
  }));

  // Guide article routes
  const guideRoutes: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  return [...staticRoutes, ...toolRoutes, ...guideRoutes];
}

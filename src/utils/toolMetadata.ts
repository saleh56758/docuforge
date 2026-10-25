import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import { getAbsoluteUrl, SITE_CONFIG } from '@/utils/siteConfig';

export function generateToolMetadata(slug: string): Metadata {
  const tool = getToolBySlug(slug);
  if (!tool) {
    return {
      title: 'Tool Not Found'
    };
  }

  const canonicalUrl = getAbsoluteUrl(tool.slug);

  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    keywords: tool.keywords,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      type: 'website',
      title: tool.seoTitle,
      description: tool.seoDescription,
      url: canonicalUrl,
      images: [
        {
          url: SITE_CONFIG.defaultOgImage,
          width: 1200,
          height: 630,
          alt: `${tool.title} — DocuForge Online Utilities`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.seoTitle,
      description: tool.seoDescription,
      images: [SITE_CONFIG.defaultOgImage]
    }
  };
}

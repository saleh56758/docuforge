/**
 * Unified Site Configuration & Canonical URL Resolution
 *
 * Ensures all canonical tags, sitemaps, robots.txt, OpenGraph tags,
 * and JSON-LD schemas use consistent, configurable absolute URLs.
 */

export function getSiteUrl(): string {
  let url = process.env.NEXT_PUBLIC_SITE_URL || 'https://docuforge.app';
  // Strip trailing slashes to prevent duplicate canonical variations
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  return url;
}

export function getAbsoluteUrl(path: string = ''): string {
  const baseUrl = getSiteUrl();
  if (!path || path === '/') {
    return baseUrl;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // Ensure no trailing slash unless root
  return `${baseUrl}${cleanPath.endsWith('/') && cleanPath !== '/' ? cleanPath.slice(0, -1) : cleanPath}`;
}

export const SITE_CONFIG = {
  name: 'DocuForge',
  tagline: 'Free, Fast & Private Online Image and PDF Utilities',
  description:
    'Free online image compressor, resizer, cropper, format converter, and PDF tools (merge, split, rotate, compress, image-to-pdf). 100% private client-side processing with zero server uploads.',
  defaultOgImage: '/og-image.jpg',
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || ''
};

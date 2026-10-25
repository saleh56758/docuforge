import type { Metadata } from 'next';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSiteUrl, SITE_CONFIG } from '@/utils/siteConfig';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'DocuForge — Free Online Image & PDF Tools (100% Private)',
    template: '%s | DocuForge'
  },
  description: SITE_CONFIG.description,
  keywords: [
    'image compressor',
    'pdf tools',
    'merge pdf',
    'image resizer',
    'image cropper',
    'jpg to webp',
    'split pdf',
    'rotate pdf',
    'compress pdf',
    'image to pdf',
    'client side pdf tools',
    'online image tools'
  ],
  authors: [{ name: 'DocuForge Team' }],
  creator: 'DocuForge',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' }
    ],
    apple: '/icon-192.png'
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'DocuForge',
    title: 'DocuForge — Free Online Image & PDF Tools',
    description:
      'Fast, secure file utilities that process documents directly in your browser. No file uploads, no tracking, 100% private.',
    images: [
      {
        url: SITE_CONFIG.defaultOgImage,
        width: 1200,
        height: 630,
        alt: 'DocuForge Free Online Image & PDF Tools'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DocuForge — Free Online Image & PDF Tools',
    description: 'Compress, resize, convert images and merge, split, rotate PDFs locally in your browser.',
    images: [SITE_CONFIG.defaultOgImage]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: SITE_CONFIG.googleVerification
    ? {
        google: SITE_CONFIG.googleVerification
      }
    : undefined
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DocuForge',
    url: siteUrl,
    description: SITE_CONFIG.description
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

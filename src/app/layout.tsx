import type { Metadata } from 'next';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSiteUrl, SITE_CONFIG } from '@/utils/siteConfig';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Free Image and PDF Tools Online | DocuForge',
    template: '%s | DocuForge'
  },
  description:
    'Free online image and PDF tools to compress, resize, crop, convert, merge, split and optimize files. Process files directly in your browser.',
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
    title: 'Free Image and PDF Tools Online | DocuForge',
    description:
      'Free online image and PDF tools to compress, resize, crop, convert, merge, split and optimize files. Process files directly in your browser.',
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
    title: 'Free Image and PDF Tools Online | DocuForge',
    description:
      'Free online image and PDF tools to compress, resize, crop, convert, merge, split and optimize files. Process files directly in your browser.',
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

        {/*
          ======================================================================
          GOOGLE-CERTIFIED CMP (CONSENT MANAGEMENT PLATFORM) INTEGRATION POINT
          ======================================================================
          To comply with Google AdSense regulations for the European Economic Area (EEA),
          United Kingdom, and Switzerland, a certified CMP (IAB TCF v2.2) must be active
          before personalized advertising cookies are read or set.

          OPTION 1 (Recommended & Easiest):
            Enable Google's built-in "Privacy & messaging" GDPR consent banner directly
            in the Google AdSense dashboard (AdSense > Privacy & messaging > GDPR > Create/Publish).
            When enabled in the dashboard, Google automatically serves and manages the
            certified consent dialog through the official AdSense script below. No extra code is needed.

          OPTION 2 (External Certified CMP):
            If you prefer an external IAB-certified CMP (e.g., Cookiebot, Didomi, Quantcast,
            Termly), place your provider's certified script tag directly BEFORE the AdSense tag:
            <!-- <script src="https://consent.your-cmp-provider.com/script.js" async></script> -->
        */}

        {SITE_CONFIG.adsEnabled && (
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

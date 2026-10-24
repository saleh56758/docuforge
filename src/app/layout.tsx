import type { Metadata } from 'next';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://docuforge.app'),
  title: {
    default: 'DocuForge — Free Online Image & PDF Tools (100% Private)',
    template: '%s | DocuForge'
  },
  description:
    'Free, fast, and secure browser-side image and PDF utilities. Compress, resize, crop, convert images, merge, split, rotate, and compress PDFs with zero server uploads.',
  keywords: [
    'image compressor',
    'pdf tools',
    'merge pdf',
    'image resizer',
    'jpg to webp',
    'pdf splitter',
    'client side pdf tools',
    'online image tools'
  ],
  authors: [{ name: 'DocuForge Team' }],
  creator: 'DocuForge',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://docuforge.app/',
    siteName: 'DocuForge',
    title: 'DocuForge — Free Online Image & PDF Tools',
    description:
      'Fast, secure file utilities that process documents directly in your browser. No file uploads, no tracking, 100% private.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DocuForge Image & PDF Utilities'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DocuForge — Free Online Image & PDF Tools',
    description: 'Compress, resize, convert images and merge, split, rotate PDFs locally in your browser.'
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
  }
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
    url: 'https://docuforge.app/',
    description: 'Free, private online image and PDF utilities.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://docuforge.app/?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

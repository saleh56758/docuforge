import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ShieldCheck, Cpu, Zap, Lock, Mail, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { getAbsoluteUrl, SITE_CONFIG } from '@/utils/siteConfig';

export const metadata: Metadata = {
  title: 'About DocuForge — Free Browser-Based Image & PDF Tools',
  description:
    'Learn about DocuForge and how its image and PDF tools process selected files in your browser using browser APIs and pdf-lib.',
  alternates: {
    canonical: getAbsoluteUrl('about')
  },
  openGraph: {
    title: 'About DocuForge — Free Browser-Based Image & PDF Tools',
    description:
      'Learn about DocuForge and how its image and PDF tools process selected files in your browser using browser APIs and pdf-lib.',
    url: getAbsoluteUrl('about'),
    images: [SITE_CONFIG.defaultOgImage]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About DocuForge — Free Browser-Based Image & PDF Tools',
    description:
      'Learn about DocuForge and how its image and PDF tools process selected files in your browser using browser APIs and pdf-lib.',
    images: [SITE_CONFIG.defaultOgImage]
  }
};

export default function AboutPage() {
  return (
    <div className="container article-page" style={{ maxWidth: 860, margin: '0 auto', paddingTop: '1.5rem', paddingBottom: '4rem' }}>
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      <header className="article-header" style={{ marginBottom: '2.5rem' }}>
        <div className="hero-badge" style={{ marginBottom: '0.75rem' }}>
          <Sparkles size={14} aria-hidden="true" /> Engineering Transparency
        </div>
        <h1 className="tool-page-title" style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>
          About DocuForge
        </h1>
        <p className="article-meta" style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          A suite of 12 free image and PDF utilities with browser-based file processing.
        </p>
      </header>

      <div className="prose">
        <h2>Our Mission</h2>
        <p>
          <strong>DocuForge</strong> (hosted at <code>docuforge.pages.dev</code>) provides image and PDF utilities that process selected files in the browser. The inspected tool-processing code does not send selected file contents to a DocuForge upload endpoint.
        </p>
        <p>
          This describes the file-processing code, not every request made by the website, hosting provider, or third-party services. Review the <Link href="/privacy">Privacy Policy</Link> and your organization&apos;s policies before processing sensitive documents.
        </p>
        <p>
          The tools use browser-based processing for the selected image or PDF. Browser and device behavior, as well as requests unrelated to file processing, remain outside this description.
        </p>

        <h2>How Browser-Based File Processing Works</h2>
        <p>
          The image and PDF tools use browser APIs and JavaScript libraries to process selected files in the browser. The reviewed tool-processing code does not send selected file contents to a DocuForge upload endpoint.
        </p>
        <p>
          This does not mean that no network requests occur while visiting the site. For example, page assets and contact-form submissions are separate from file processing.
        </p>
        <ul>
          <li>
            <strong>Image tools</strong>: Tools such as <Link href="/image-compressor">Image Compressor</Link>, <Link href="/image-resizer">Image Resizer</Link>, and <Link href="/image-cropper">Image Cropper</Link> use browser image and Canvas APIs to render and export images.
          </li>
          <li>
            <strong>PDF tools</strong>: Tools such as <Link href="/merge-pdf">Merge PDF</Link>, <Link href="/split-pdf">Split PDF</Link>, <Link href="/rotate-pdf">Rotate PDF</Link>, <Link href="/compress-pdf">Compress PDF</Link>, and <Link href="/image-to-pdf">Image to PDF</Link> use the JavaScript <code>pdf-lib</code> library in the browser.
          </li>
          <li>
            <strong>Scope of the review</strong>: The inspected tool-processing code does not send selected file contents to a DocuForge upload endpoint. This does not cover browser extensions, hosting logs, or unrelated third-party network requests.
          </li>
          <li>
            <strong>Browser memory</strong>: Selected files are read for processing in the browser. Closing a tab should not be treated as a guaranteed secure memory-erasure procedure.
          </li>
        </ul>

        <h2>The 12 Free Tools We Provide</h2>
        <p>
          DocuForge currently offers 12 specialized utilities categorized into Image and PDF suites:
        </p>
        <table>
          <thead>
            <tr>
              <th>Tool Suite</th>
              <th>Available Utilities</th>
              <th>Primary Use Cases</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>7 Image Utilities</strong></td>
              <td>
                <Link href="/image-compressor">Image Compressor</Link>,{' '}
                <Link href="/image-resizer">Image Resizer</Link>,{' '}
                <Link href="/image-cropper">Image Cropper</Link>,{' '}
                <Link href="/image-converter">Image Converter</Link>,{' '}
                <Link href="/png-to-jpg">PNG to JPG</Link>,{' '}
                <Link href="/jpg-to-webp">JPG to WebP</Link>,{' '}
                <Link href="/webp-to-jpg">WebP to JPG</Link>
              </td>
              <td>Reducing website image weight, preparing social media avatars, converting modern WebP formats for legacy desktop apps, and optimizing Core Web Vitals.</td>
            </tr>
            <tr>
              <td><strong>5 PDF Utilities</strong></td>
              <td>
                <Link href="/merge-pdf">Merge PDF</Link>,{' '}
                <Link href="/split-pdf">Split PDF</Link>,{' '}
                <Link href="/rotate-pdf">Rotate PDF</Link>,{' '}
                <Link href="/compress-pdf">Compress PDF</Link>,{' '}
                <Link href="/image-to-pdf">Image to PDF</Link>
              </td>
              <td>Combining PDF files, extracting or rotating pages, re-saving documents, and compiling images into PDFs.</td>
            </tr>
          </tbody>
        </table>

        <h2>Who DocuForge Is Built For</h2>
        <p>
          Our platform is designed for anyone who needs browser-based file utilities without creating an account:
        </p>
        <ul>
          <li>
            <strong>People who prefer browser-based processing</strong>: The tools process selected files in the browser, but this alone does not establish legal compliance or replace an organization&apos;s privacy requirements.
          </li>
          <li>
            <strong>Web Developers &amp; SEO Specialists</strong>: Developers preparing media assets for websites who prefer browser-based tools to a command-line workflow.
          </li>
          <li>
            <strong>Students &amp; Academics</strong>: College students preparing assignments, application packets, and research papers where strict file size and PDF format requirements apply.
          </li>
          <li>
            <strong>Remote Workers &amp; Everyday Users</strong>: Individuals who need to rotate a scanned document, resize a photo, or convert receipt images for their workflow.
          </li>
        </ul>

        <h2>Creator &amp; Publisher Background</h2>
        <p>
          DocuForge is created and maintained by <strong>Hassaan Saleh</strong>, a web software developer interested in open web standards and browser-based tools.
        </p>
        <p>
          The project is hosted as a static application on <strong>Cloudflare Pages</strong>. Availability and loading performance depend on hosting, network, and device conditions.
        </p>
        <p>
          The tools are currently available without an account or subscription. Usage is subject to the limits shown by each tool and the capabilities of your browser and device. Advertising placements are currently disabled.
        </p>

        <h2>Contact &amp; Feedback</h2>
        <p>
          We are committed to continuously improving DocuForge. If you have suggestions for new tools, feature requests, or run into an unsupported file format or browser quirk, please reach out directly:
        </p>
        <ul>
          <li>
            <strong>Contact Person</strong>: Hassaan Saleh
          </li>
          <li>
            <strong>Direct Email</strong>:{' '}
            <a href="mailto:hassaansaleh56@gmail.com" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
              hassaansaleh56@gmail.com
            </a>
          </li>
          <li>
            <strong>Interactive Form</strong>: Visit our <Link href="/contact">Contact Page</Link> to submit feedback online.
          </li>
        </ul>
      </div>
    </div>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Sparkles } from 'lucide-react';
import { getAbsoluteUrl, SITE_CONFIG } from '@/utils/siteConfig';
import ResponsiveImage from '@/components/ResponsiveImage';

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
        <figure className="article-featured-image">
          <ResponsiveImage
            imageBase="document-management-workflow"
            alt="Documents and paperwork organized on a desk"
            eager
            sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 860px) 820px, 820px"
          />
        </figure>
      </header>

      <div className="prose">
        <h2>Our Mission</h2>
        <p>
          <strong>DocuForge</strong> is a no-account collection of 12 image and PDF tools hosted at <code>docuforge.pages.dev</code>. Each tool is built for a specific file task; for example, the PDF size tool re-saves and compares a PDF but does not downsample its embedded images.
        </p>
        <p>
          Browse the <Link href="/guides">guides</Link> for format and file-handling context, or use the <Link href="/blog">practical workflows</Link> for task sequences.
        </p>

        <h2>How Browser-Based File Processing Works</h2>
        <p>
          Image tools use browser image and Canvas APIs; PDF tools use the JavaScript <code>pdf-lib</code> library. The inspected processing code does not send selected file contents to a DocuForge upload endpoint. This describes file processing only, not page requests, hosting logs, contact-form submissions, browser extensions, or other third-party services.
        </p>
        <ul>
          <li>
            <strong>Image tools</strong>: <Link href="/image-compressor">Image Compressor</Link>, <Link href="/image-resizer">Image Resizer</Link>, and <Link href="/image-cropper">Image Cropper</Link> render and export images. Re-encoding can change file size, quality, or image data; inspect the result.
          </li>
          <li>
            <strong>PDF tools</strong>: <Link href="/merge-pdf">Merge PDF</Link>, <Link href="/split-pdf">Split PDF</Link>, <Link href="/rotate-pdf">Rotate PDF</Link>, and <Link href="/image-to-pdf">Image to PDF</Link> create or update documents. Review the output for forms, signatures, bookmarks, and other features important to your workflow.
          </li>
          <li>
            <strong>PDF size check</strong>: <Link href="/compress-pdf">PDF Re-save &amp; Size Check</Link> does not downsample embedded images and may produce a larger file.
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
              <td>Resizing or cropping a selected image, converting between supported formats, and comparing an exported image with its source.</td>
            </tr>
            <tr>
              <td><strong>5 PDF Utilities</strong></td>
              <td>
                <Link href="/merge-pdf">Merge PDF</Link>,{' '}
                <Link href="/split-pdf">Split PDF</Link>,{' '}
                <Link href="/rotate-pdf">Rotate PDF</Link>,{' '}
                <Link href="/compress-pdf">PDF Re-save &amp; Size Check</Link>,{' '}
                <Link href="/image-to-pdf">Image to PDF</Link>
              </td>
              <td>Combining PDF files, extracting or rotating pages, re-saving documents, and compiling images into PDFs.</td>
            </tr>
          </tbody>
        </table>

        <h2>Example Tasks</h2>
        <p>
          Common workflows combine more than one tool. Check the linked instructions and inspect each output before replacing or sharing an original.
        </p>
        <ul>
          <li>
            Resize or crop an image to a target shape, then export it to a format accepted by the destination.
          </li>
          <li>
            Extract or rotate PDF pages, then open the saved document in the PDF reader you use.
          </li>
          <li>
            Arrange scanned images and create a PDF with the page size and margins your recipient requires.
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

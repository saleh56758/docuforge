import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FileImage, FileText, Layers, ListChecks } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAbsoluteUrl, SITE_CONFIG } from '@/utils/siteConfig';

export const metadata: Metadata = {
  title: 'Practical File Workflows — DocuForge',
  description:
    'Task-based examples for resizing images, assembling image PDFs, extracting PDF pages, and checking file-size results.',
  alternates: {
    canonical: getAbsoluteUrl('blog')
  },
  openGraph: {
    type: 'website',
    title: 'Practical File Workflows — DocuForge',
    description:
      'Task-based examples for resizing images, assembling image PDFs, extracting PDF pages, and checking file-size results.',
    url: getAbsoluteUrl('blog'),
    images: [SITE_CONFIG.defaultOgImage]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Practical File Workflows — DocuForge',
    description:
      'Task-based examples for resizing images, assembling image PDFs, extracting PDF pages, and checking file-size results.',
    images: [SITE_CONFIG.defaultOgImage]
  }
};

export default function BlogIndexPage() {
  const workflows = [
    {
      title: 'Prepare an image for a known display size',
      description:
        'Start with the target pixel dimensions. Resize the image, export a candidate format, then compare the downloaded dimensions, byte size, and visible detail with the original.',
      icon: <FileImage size={20} aria-hidden="true" />,
      steps: ['Choose target width and height', 'Keep proportions unless you intend to distort', 'Compare the export before publishing'],
      toolHref: '/image-resizer',
      toolLabel: 'Open Image Resizer',
      guideHref: '/guides/how-to-compress-images-without-losing-quality',
      guideLabel: 'Image sizing and file-size guide'
    },
    {
      title: 'Assemble several scans into one PDF',
      description:
        'Sort files before uploading, confirm the page order, select A4 or US Letter, and choose a margin. The tool places one image on each page; it does not run OCR or extract text.',
      icon: <Layers size={20} aria-hidden="true" />,
      steps: ['Name or order scans clearly', 'Set page size, orientation, and margin', 'Open the PDF and inspect every page'],
      toolHref: '/image-to-pdf',
      toolLabel: 'Open Image to PDF',
      guideHref: '/guides/how-to-convert-images-to-pdf',
      guideLabel: 'Image-to-PDF walkthrough'
    },
    {
      title: 'Extract a page range from a PDF',
      description:
        'Use comma-separated page numbers and ranges such as “2-4, 7” to create a single PDF containing those pages. Check the page count and inspect the result before sharing.',
      icon: <ListChecks size={20} aria-hidden="true" />,
      steps: ['Check the source page count', 'Enter pages using 1-based numbering', 'Review the extracted PDF and keep the original'],
      toolHref: '/split-pdf',
      toolLabel: 'Open Split PDF',
      guideHref: '/guides/how-to-split-and-extract-pdf-pages',
      guideLabel: 'Page-range examples'
    },
    {
      title: 'When re-saving a PDF does not reduce its size',
      description:
        'DocuForge’s PDF tool re-saves copied pages with object streams; it does not downsample embedded images. If the file contains large scans, resize or compress the source images and rebuild the PDF, then compare both outputs.',
      icon: <FileText size={20} aria-hidden="true" />,
      steps: ['Compare the source and re-saved file sizes', 'For image-heavy PDFs, reduce image dimensions before creating the PDF', 'Verify text, forms, and signatures in the chosen output'],
      toolHref: '/compress-pdf',
      toolLabel: 'Open PDF Size Check',
      guideHref: '/guides/how-to-reduce-pdf-file-size',
      guideLabel: 'PDF size troubleshooting'
    }
  ];

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3.5rem' }}>
      <Breadcrumbs items={[{ label: 'Practical Workflows' }]} />

      <header className="tool-header-section" style={{ borderBottom: 'none', paddingBottom: '1rem' }}>
        <div className="hero-badge" style={{ marginBottom: '0.75rem' }}>
          <ListChecks size={14} aria-hidden="true" /> Task-based walkthroughs
        </div>
        <h1 className="tool-page-title" style={{ fontSize: '2.25rem' }}>
          Practical File Workflows
        </h1>
        <p className="tool-page-subtitle">
          Short, specific workflows for the tools available here. Each one includes a check to perform before you rely on the output.
        </p>
      </header>

      <div className="tool-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', marginTop: '1.5rem' }}>
        {workflows.map((workflow) => (
          <article key={workflow.title} className="tool-card" style={{ padding: '1.5rem' }}>
            <div style={{ color: 'var(--color-primary)', marginBottom: '0.75rem' }}>{workflow.icon}</div>
            <h2 className="tool-card-title" style={{ fontSize: '1.1875rem', lineHeight: 1.35, marginBottom: '0.625rem' }}>
              {workflow.title}
            </h2>
            <p className="tool-card-desc" style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>
              {workflow.description}
            </p>
            <ol style={{ paddingLeft: '1.25rem', marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
              {workflow.steps.map((step) => <li key={step}>{step}</li>)}
            </ol>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.8125rem' }}>
              <Link href={workflow.toolHref}>{workflow.toolLabel} <ArrowRight size={13} aria-hidden="true" /></Link>
              <Link href={workflow.guideHref}>{workflow.guideLabel}</Link>
            </div>
          </article>
        ))}
      </div>

      <p className="section-subheading" style={{ marginTop: '2rem' }}>
        For format background and longer explanations, see the <Link href="/guides">Guides &amp; Tutorials</Link>.
      </p>
    </div>
  );
}

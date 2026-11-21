import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, BookOpen, ArrowRight, Image as ImageIcon, FileText } from 'lucide-react';
import { TOOLS } from '@/data/tools';
import { GUIDES } from '@/data/guides';
import HomeDiscovery from '@/components/HomeDiscovery';
import ToolCard from '@/components/ToolCard';
import FaqSection from '@/components/FaqSection';
import AdPlaceholder from '@/components/AdPlaceholder';
import ResponsiveImage from '@/components/ResponsiveImage';
import { IMAGE_CATALOG } from '@/data/imageCatalog';

const HOMEPAGE_FAQS = [
  {
    question: 'Where are selected files processed?',
    answer:
      'The image and PDF tool components read selected files in your browser and perform their transformations locally using browser APIs and pdf-lib. Their processing code does not send selected file contents to a DocuForge upload endpoint. This does not describe unrelated website or third-party network requests.'
  },
  {
    question: 'Are these tools completely free to use?',
    answer:
      'The tools are available without charge and do not require an account. Individual tools may have file-size limits or depend on your browser and device resources.'
  },
  {
    question: 'Which file types are supported?',
    answer:
      'Image tools accept JPG/JPEG, PNG, or WebP, depending on the tool. PDF tools accept PDF files. Check each tool page for its specific input and output formats.'
  },
  {
    question: 'Do DocuForge tools work on mobile phones and tablets?',
    answer:
      'The layout adapts to smaller screens. Tool behavior may vary by browser, device resources, and file, so check the tool with your setup.'
  }
];

export default function HomePage() {
  const imageTools = TOOLS.filter((t) => t.category === 'image');
  const pdfTools = TOOLS.filter((t) => t.category === 'pdf');

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-layout">
          <div className="hero-copy">
            <div className="hero-badge">
              <ShieldCheck size={14} aria-hidden="true" /> Browser-based file processing
            </div>
            <h1 id="hero-title" className="hero-title">
              Free Online Image and PDF Tools
            </h1>
            <p className="hero-subtitle">
              Image and PDF tools that process selected files in your browser. No account is required; website and third-party requests are separate from file processing.
            </p>
          </div>
          <figure className="hero-image">
            <ResponsiveImage
              imageBase={IMAGE_CATALOG.homepage.imageBase}
              alt={IMAGE_CATALOG.homepage.alt}
              eager
              sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1024px) 44vw, 560px"
              width={1200}
              height={800}
            />
          </figure>
        </div>

        <h2 className="hero-discovery-heading">Explore image and PDF tools</h2>

        {/* Live Search and Filter Component */}
        <HomeDiscovery tools={TOOLS} />
      </section>

      {/* File-processing scope */}
      <section className="privacy-banner" aria-label="File-processing scope">
        <div className="privacy-banner-icon">
          <Lock size={26} aria-hidden="true" />
        </div>
        <div className="privacy-banner-content">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            Selected files are processed in your browser
          </h2>
          <p>
            The inspected image and PDF tool code processes selected files in your browser and does not send their contents to a DocuForge upload endpoint. This does not describe page requests, hosting, or third-party services such as the contact form. Read the <Link href="/privacy">Privacy Policy</Link> for that distinction.
          </p>
        </div>
      </section>

      {/* Image Utilities Category Anchor Section */}
      <section id="image-tools" className="seo-content-section" style={{ scrollMarginTop: '80px' }}>
        <div className="section-heading-wrapper">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'var(--color-image-tool)', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
            <ImageIcon size={15} aria-hidden="true" /> Image Utilities
          </div>
          <h2 className="section-heading">Image Optimization & Format Utilities</h2>
          <p className="section-subheading">
            Image compression, cropping, resizing, and WebP conversion tools.
          </p>
        </div>

        <div className="tool-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {imageTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <AdPlaceholder slotId="home-top-banner" />

      {/* PDF Utilities Category Anchor Section */}
      <section id="pdf-tools" className="seo-content-section" style={{ scrollMarginTop: '80px' }}>
        <div className="section-heading-wrapper">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'var(--color-pdf-tool)', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
            <FileText size={15} aria-hidden="true" /> PDF Utilities
          </div>
          <h2 className="section-heading">PDF Assembly & Structural Utilities</h2>
          <p className="section-subheading">
            Combine documents, extract custom page ranges, rotate orientations, and re-save PDF files in your browser.
          </p>
        </div>

        <div className="tool-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {pdfTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Example workflows */}
      <section className="seo-content-section" style={{ marginTop: '2rem' }}>
        <div className="section-heading-wrapper" style={{ textAlign: 'center', maxWidth: 650, margin: '0 auto 2.5rem auto' }}>
          <h2 className="section-heading">Start with a task, then check the result</h2>
          <p className="section-subheading">
            These short workflows describe what the current tools can do; keep the original file and verify each output.
          </p>
        </div>

        <div className="steps-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <div className="step-card">
            <h3 className="step-title">Prepare an image for a page</h3>
            <p className="step-text">
              Resize to the pixel dimensions your layout needs, then compare a JPG or WebP export. A format change does not guarantee a smaller file.
            </p>
            <Link href="/image-resizer">Resize image</Link> · <Link href="/image-converter">Compare formats</Link>
          </div>

          <div className="step-card">
            <h3 className="step-title">Build a PDF from scans</h3>
            <p className="step-text">
              Add images in reading order, select A4 or US Letter, choose orientation and margins, then inspect the pages in a PDF reader.
            </p>
            <Link href="/image-to-pdf">Create an image PDF</Link> · <Link href="/guides/how-to-convert-images-to-pdf">Read the workflow</Link>
          </div>

          <div className="step-card">
            <h3 className="step-title">Extract and arrange PDF pages</h3>
            <p className="step-text">
              Enter page numbers or ranges to create one extracted PDF. Rotate pages if needed, and check forms or signatures in the downloaded copy.
            </p>
            <Link href="/split-pdf">Extract pages</Link> · <Link href="/rotate-pdf">Rotate pages</Link>
          </div>
        </div>
      </section>

      {/* Guides & Tutorials Highlight */}
      <section className="seo-content-section" style={{ marginTop: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 className="section-heading" style={{ marginBottom: '0.25rem' }}>
              Practical Guides & Tutorials
            </h2>
            <p className="section-subheading">
              Specific instructions, current tool controls, and checks for reviewing each output.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <Link href="/guides" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
              <BookOpen size={15} aria-hidden="true" /> View Guides <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link href="/blog" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
              View Practical Workflows <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="tool-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: '2rem' }}>
          {GUIDES.slice(0, 3).map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="tool-card"
              style={{ padding: '1.25rem' }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                {guide.readingTime} • {guide.tags[0]}
              </div>
              <h3 className="tool-card-title" style={{ fontSize: '1.0625rem', marginBottom: '0.5rem' }}>
                {guide.title}
              </h3>
              <p className="tool-card-desc" style={{ fontSize: '0.8125rem' }}>
                {guide.description}
              </p>
              <div className="tool-card-footer">
                <span>Read Tutorial</span>
                <ArrowRight size={14} aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Homepage FAQ */}
      <FaqSection faqs={HOMEPAGE_FAQS} />
    </div>
  );
}

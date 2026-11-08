import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, Lock, Cpu, BookOpen, ArrowRight, Image as ImageIcon, FileText } from 'lucide-react';
import { TOOLS } from '@/data/tools';
import { GUIDES } from '@/data/guides';
import HomeDiscovery from '@/components/HomeDiscovery';
import ToolCard from '@/components/ToolCard';
import FaqSection from '@/components/FaqSection';
import AdPlaceholder from '@/components/AdPlaceholder';

const HOMEPAGE_FAQS = [
  {
    question: 'How do DocuForge tools work without uploading files?',
    answer:
      'The image and PDF tool components read selected files in your browser and perform their transformations locally using browser APIs and pdf-lib. Their processing code does not send selected file contents to a DocuForge upload endpoint. This does not describe unrelated website or third-party network requests.'
  },
  {
    question: 'Are these tools completely free to use?',
    answer:
      'Yes, all tools on DocuForge are 100% free with no hidden paywalls, no trial limits, and no account registration required.'
  },
  {
    question: 'Is it safe to process confidential documents like tax forms or contracts?',
    answer:
      'The file-processing components operate in your browser and do not send selected files to a DocuForge upload endpoint. Consider your organization’s policies and review the privacy policy before processing sensitive documents; this is not a legal or compliance certification.'
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
        <div className="hero-badge">
          <ShieldCheck size={14} aria-hidden="true" /> Browser-based file processing
        </div>
        <h1 id="hero-title" className="hero-title">
          Free Online Image and PDF Tools
        </h1>
        <p className="hero-subtitle">
          Image and PDF tools that process selected files in your browser. No account is required; website and third-party requests are separate from file processing.
        </p>

        <h2 className="hero-discovery-heading">Explore image and PDF tools</h2>

        {/* Live Search and Filter Component */}
        <HomeDiscovery tools={TOOLS} />
      </section>

      {/* Privacy Guarantee Banner */}
      <section className="privacy-banner" aria-label="Privacy Guarantee">
        <div className="privacy-banner-icon">
          <Lock size={26} aria-hidden="true" />
        </div>
        <div className="privacy-banner-content">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            Files are processed in your browser
          </h2>
          <p>
            The image and PDF tools process selected files locally in your browser. Their file-processing code does not upload those files to a DocuForge endpoint. This statement does not cover ordinary website requests, hosting logs, or third-party services such as the contact form.
          </p>
        </div>
      </section>

      {/* Platform Introduction & Overview */}
      <section className="seo-content-section" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: '2.25rem', marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Browser-Based Image and PDF Tools
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
          <strong>DocuForge</strong> provides 12 browser-based tools: seven image utilities and five PDF tools for common file-processing tasks.
        </p>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
          DocuForge provides image and PDF utilities that process selected files in your browser using browser APIs and <code>pdf-lib</code>. The tool components inspected do not send selected file contents to a DocuForge upload endpoint. Website requests and contact-form submissions are separate; see the <Link href="/privacy">Privacy Policy</Link> for more information.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
          <Link href="/about" className="btn-ghost" style={{ fontSize: '0.875rem' }}>
            Learn more about our architecture →
          </Link>
          <Link href="/guides" className="btn-ghost" style={{ fontSize: '0.875rem' }}>
            Explore our technical tutorials →
          </Link>
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

      {/* Why Choose DocuForge Section */}
      <section className="seo-content-section" style={{ marginTop: '2rem' }}>
        <div className="section-heading-wrapper" style={{ textAlign: 'center', maxWidth: 650, margin: '0 auto 2.5rem auto' }}>
          <h2 className="section-heading">Engineered for Privacy, Speed & Precision</h2>
          <p className="section-subheading">
            Built around browser-based file processing and practical image and PDF workflows.
          </p>
        </div>

        <div className="steps-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <div className="step-card">
            <div className="step-number" style={{ background: 'var(--color-image-tool-light)', color: 'var(--color-image-tool)' }}>
              <Zap size={16} aria-hidden="true" />
            </div>
            <h3 className="step-title">Instant Performance</h3>
            <p className="step-text">
              Zero network upload delays. Large images and multi-page PDFs are processed with native browser acceleration, giving you immediate output.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number" style={{ background: 'var(--color-success-light)', color: 'var(--color-success)' }}>
              <ShieldCheck size={16} aria-hidden="true" />
            </div>
            <h3 className="step-title">Local File Processing</h3>
            <p className="step-text">
              The file-processing components do not send selected file contents to a DocuForge upload endpoint. Browser memory and object URL cleanup are managed by the browser and the individual tool interfaces.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number" style={{ background: 'var(--color-pdf-tool-light)', color: 'var(--color-pdf-tool)' }}>
              <Cpu size={16} aria-hidden="true" />
            </div>
            <h3 className="step-title">Full Document Fidelity</h3>
            <p className="step-text">
              Vector paths, crisp fonts, transparent PNG layers, and color profiles are preserved with mathematical precision.
            </p>
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
              Expert advice on image compression, PDF management, and web performance.
            </p>
          </div>
          <Link href="/guides" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
            <BookOpen size={15} aria-hidden="true" /> View All Guides <ArrowRight size={14} aria-hidden="true" />
          </Link>
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
